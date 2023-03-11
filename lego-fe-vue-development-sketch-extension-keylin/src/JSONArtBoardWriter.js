import sketch from 'sketch'
import fs from "@skpm/fs"
// import regeneratorRuntime from './runtime'

class JSONArtBoardWriter {
  constructor (nArtboard, rootString, offsetY) {
    this.nArtboard = nArtboard
    this.offsetY = offsetY
    this.aName = ''
    this.rootString = rootString
    this.page = {
      class: '',
      style: {},
      components: [],
      actions: [],
      animations: []
    }
  }

  async write() {
    this.checkArtboard(this.nArtboard, 0, this.offsetY)
    return this.page
  }
  
  checkArtboard(nArtboard, offsetX, offsetY) {
    let artboard = sketch.fromNative(nArtboard)
    if (nArtboard.class() === MSArtboardGroup) {
      console.log(artboard.name)
      let frame = artboard.frame
      let scale = 750 / frame.width
      this.aName = artboard.name
      this.page.__id = artboard.id
      let x = offsetX * scale
      let y = offsetY * scale
      this.writeLayer(nArtboard, {scale, x, y}, this.page)
    }
  }
  
  writeLayer(container, offset, parent) {
    let power = 0 // 权重
    let layers  = container.layers()
    let { scale, x, y } = offset
    layers.forEach(nlayer => {
      let layer = sketch.fromNative(nlayer)
      // 跳过蒙板和隐藏图层
      if (nlayer.hasClippingMask() || layer.hidden) {
        return
      }
      let frame = layer.frame
      let width = Math.round(frame.width * scale)
      let height = Math.round(frame.height * scale)
      let top = Math.round(frame.y * scale - y)
      let left = Math.round(frame.x * scale - x)
      let item = {
        __id: layer.id,
        style: {
          width: width + 'px',
          height: height + 'px',
          position: 'absolute',
          top: top + 'px',
          left: left + 'px',
        },
        value: '',
        components: [],
        config: {},
        include: ["normal"]
      }
      switch (layer.type) {
        case 'Image':
          power += 1
          item.type = 'basic-layer-image'
          item.value = 'images/' + 
                        layer.name + '.png'
          sketch.export(layer, {
            scales: '1',
            formats: 'png',
            output: this.rootString + this.aName + '/images/'
          })
          break
        case 'Text':
          const alignment = {0: 'left', 1: 'right', 2: 'center'}
          power += 2
          let attributes = nlayer.attributedString().treeAsDictionary().value.attributes
          if (attributes.length > 1) {
            item.type = 'basic-container-div'
            item.style['display'] = 'flex'
            item.style['flex-direction'] = 'row'
            item.style['flex-wrap'] = 'wrap'
            item.style['align-items'] = 'baseline'
            attributes.forEach(async el => {
              let sub = {
                type: 'basic-layer-text',
                value: el.text + '',
                style: {},
                components: [],
                config: {},
                include: ["normal"]
              }
              console.log(el.MSAttributedStringColorAttribute.value)
              console.log(el.NSFont.attributes.NSFontNameAttribute)
              console.log(el.NSFont.attributes.NSFontSizeAttribute)
              sub.style['color'] = el.MSAttributedStringColorAttribute.value + ''
              sub.style['font-size'] = Math.round(el.NSFont.attributes.NSFontSizeAttribute * scale) + 'px',
              sub.style['font-family'] = el.NSFont.attributes.NSFontNameAttribute + ''
              sub.style['font-weight'] = layer.style.fontWeight + ''
              sub.style['line-height'] = Math.round(el.NSParagraphStyle.style.minimumLineHeight * scale) + 'px'
              sub.style['text-align'] = alignment[el.NSParagraphStyle.style.alignment + '']
              item.components.push(sub)
            })
          } else {
            item.type = 'basic-layer-text'
            item.value = layer.text
            console.log(attributes[0].MSAttributedStringColorAttribute.value)
            console.log(attributes[0].NSFont.attributes.NSFontNameAttribute)
            console.log(attributes[0].NSFont.attributes.NSFontSizeAttribute)
            item.style['color'] = attributes[0].MSAttributedStringColorAttribute.value + ''
            item.style['font-size'] = Math.round(attributes[0].NSFont.attributes.NSFontSizeAttribute * scale) + 'px'
            item.style['font-family'] = attributes[0].NSFont.attributes.NSFontNameAttribute + ''
            item.style['font-weight'] = layer.style.fontWeight + ''
            item.style['line-height'] = Math.round(layer.style.lineHeight * scale) + 'px'
            item.style['text-align'] = layer.style.alignment + ''
          }
          break
        case 'ShapePath':
          switch(layer.shapeType) {
            case 'Rectangle':
              item.type = 'basic-container-div'
              item.style['border-radius'] = ''
              for (let point of layer.points) {
                item.style['border-radius'] += Math.round(point.cornerRadius * scale) + 'px '
              }
              if (layer.style.fills.length > 1) {

              } else {
                if (layer.style.fills[0].fillType === 'Color') {
                  item.style['background-color'] = layer.style.fills[0].color.slice(0,-2)
                }
              }
              break
            case 'Oval':
              if (frame.width == frame.height) {
                item.type = 'basic-container-div'
                item.style['border-radius'] = Math.round(frame.width * scale / 2) + 'px'
              } else {
                item.type = 'image'
                item.value = 'images/' +
                              layer.name + '.png'
                sketch.export(layer, {
                  scales: '1',
                  formats: 'png',
                  output: this.rootString + this.aName + '/images/'
                })
              }
              break
            default:
              item.type = 'basic-layer-image'
              item.value = 'images/' +
                            layer.name + '.png'
              sketch.export(layer, {
                scales: '1',
                formats: 'png',
                output: this.rootString + this.aName + '/images/'
              })
          }
          break
        case 'Group':
          item.type = 'basic-container-div'
          let children = this.writeLayer(nlayer, 
                            { scale, x: 0, y: 0}, 
                            item)
          if (children) {
            power += 1
          } else {
            item.type = 'basic-layer-image'
            item.value = 'images/' +
                          layer.name + '.png'
            sketch.export(layer, {
              scales: '1',
              formats: 'png',
              output: this.rootString + this.aName + '/images/'
            })
            if (fs.existsSync(this.rootString + this.aName + '/images/')) {
              fs.rmdirSync(this.rootString + this.aName + '/images/')
            }
          }
          break
        case 'SymbolInstance':
          power += 1
          item.type = 'basic-layer-image'
          item.value = 'images/' +
                        layer.name + '.png'
          sketch.export(layer, {
            scales: '1',
            formats: 'png',
            output: this.rootString + this.aName + '/images/'
          })
          break
        default:
          return
      }
      parent.components.push(item)
    })
    if (power < 2) {
      return null
    }
    return parent
  }
  
  maxRect (layers) {
    let {x, y, width, height} = layers[0].frame
    width += x
    height += y
    for (let layer of layers) {
      x = Math.min(x, layer.frame.x)
      y = Math.min(y, layer.frame.y)
      width = Math.max(width, layer.frame.x + layer.frame.width)
      height = Math.max(height, layer.frame.y + layer.frame.height)
    }
    width -= x
    height -= y
    return {
      x, y, width, height
    }
  }
}

export default JSONArtBoardWriter