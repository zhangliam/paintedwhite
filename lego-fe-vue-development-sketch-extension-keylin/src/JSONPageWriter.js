import sketch from 'sketch'
import fs from "@skpm/fs"
// import regeneratorRuntime from './runtime'

class JSONPageWriter {
  constructor (nPage, rootString) {
    this.pName = nPage.name()
    this.artboards = nPage.artboards()
    this.aName = ''
    this.rootString = rootString + this.pName
    this.page = {
      class: '',
      style: {},
      components: [],
      actions: [],
      animations: []
    }
  }

  async write() {
    return new Promise((resolve, reject)=>{
      this.artboards.forEach(nArtboard => {
        this.checkArtboard(nArtboard)
      })
      resolve(this.page)
    })
  }
  
  checkArtboard(nArtboard) {
    let artboard = sketch.fromNative(nArtboard)
    if (nArtboard.class() === MSArtboardGroup) {
      console.log(artboard.name)
      let sName = artboard.name.split('_')
      let frame = artboard.frame
      let scale = 750 / frame.width
      this.aName = sName.shift()
      let layers = this.page.components.filter(el => (el.name === this.aName))
      let x = 0
      let y = 0
      let top
      let left
      let status
      if (layers.length) {
        status = layers[0]
      } else {
        status = {
          __id: artboard.id,
          type: 'basic-container-div',
          name: this.aName,
          value: '',
          style: {
            width: Math.round(frame.width * scale) + 'px',
            height: Math.round(frame.height * scale) + 'px'
          },
          components: []
        }
        this.page.components.push(status)
      }
      for (let name of sName) {
        let values = status.value.filter(el => (el.name === name))
        if (values.length) {
          status = values[0]
          top = (parseInt(status.style.top) || 0)
          left = (parseInt(status.style.left) || 0)
        } else {
          console.log('  ' + name)
          frame = this.maxRect(artboard.layers)
          let width = Math.round(frame.width * scale)
          let height = Math.round(frame.height * scale)
          top = Math.round(frame.y * scale - (parseInt(status.style.top) || 0))
          left = Math.round(frame.x * scale - (parseInt(status.style.left) || 0))
          
          let temp = {
            type: 'basic-container-div',
            name: name,
            value: '',
            style: {
              width: width + 'px',
              height: height + 'px',
              position: 'absolute',
              top: top + 'px',
              left: left + 'px',
            },
            config: {},
            include: ["normal"],
            components: []
          }
          status.components.push(temp)
          status = temp
        }
        x += left
        y += top
      }
      this.writeLayer(nArtboard, {scale, x, y}, status, sName)
    }
  }
  
  writeLayer(container, offset, parent, namespace) {
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
        config: {},
        include: ["normal"],
        value: '',
        components: []
      }
      switch (layer.type) {
        case 'Image':
          power += 1
          item.type = 'basic-layer-image'
          item.value = 'images/' + 
                        (namespace.length?(namespace.join('/') + '/'):'') + 
                        layer.name + '.png'
          sketch.export(layer, {
            scales: '1',
            formats: 'png',
            output: this.rootString + '/images/' + 
            (namespace.length?(namespace.join('/') + '/'):'')
          })
          break
        case 'Text':
          power += 2
          let attributes = nlayer.attributedString().treeAsDictionary().value.attributes
          if (attributes.length > 1) {
            item.type = 'basic-container-div'
            item.style['display'] = 'flex'
            item.style['flex-direction'] = 'row'
            item.style['flex-wrap'] = 'wrap'
            item.style['align-items'] = 'baseline'
            attributes.forEach(el => {
              console.log(el.NSFont)
              let sub = {
                type: 'basic-layer-text',
                value: el.text + '',
                style: {
                  'font-family': el.NSFont.attributes.NSFontAttributeName,
                  'font-size': Math.round(el.NSFont.attributes.NSFontSizeAttribute * scale) + 'px',
                  'color': el.MSAttributedStringColorAttribute.value + ''
                }
              }
              item.components.push(sub)
            })
          } else {
            item.type = 'basic-layer-text'
            console.log(layer.style)
            item.value = layer.text
            item.style.color = layer.style.textColor.slice(0, -2)
            item.style['font-size'] = Math.round(layer.style.fontSize * scale) + 'px'
            item.style['font-family'] = layer.style.fontFamily
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
                item.type = 'basic-layer-image'
                item.value = 'images/' + 
                              (namespace.length?(namespace.join('/') + '/'):'') + 
                              layer.name + '.png'
                sketch.export(layer, {
                  scales: '1',
                  formats: 'png',
                  output: this.rootString + '/images/' + 
                  (namespace.length?(namespace.join('/') + '/'):'')
                })
              }
              break
            default:
              item.type = 'basic-layer-image'
              item.value = 'images/' + 
                            (namespace.length?(namespace.join('/') + '/'):'') +
                            layer.name + '.png'
              sketch.export(layer, {
                scales: '1',
                formats: 'png',
                output: this.rootString + '/images/' + 
                (namespace.length?(namespace.join('/') + '/'):'')
              })
          }
          break
        case 'Group':
          item.type = 'basic-container-div'
          let children = this.writeLayer(nlayer, 
                            { scale, x: 0, y: 0}, 
                            item, 
                            namespace.concat([layer.name]))
          if (children) {
            power += 1
          } else {
            item.type = 'basic-layer-image'
            item.value = 'images/' + 
                          (namespace.length?(namespace.join('/') + '/'):'') +
                          layer.name + '.png'
            sketch.export(layer, {
              scales: '1',
              formats: 'png',
              output: this.rootString + '/images/' + 
              (namespace.length?(namespace.join('/') + '/'):'')
            })
            if (fs.existsSync(this.rootString + '/images/' + 
                              namespace.concat([layer.name]).join('/') + '/')) {
              fs.rmdirSync(this.rootString + '/images/' + 
                          namespace.concat([layer.name]).join('/') + '/')
            }
          }
          break
        case 'SymbolInstance':
          power += 1
          item.type = 'basic-layer-image'
          item.value = 'images/' + 
                        (namespace.length?(namespace.join('/') + '/'):'') +
                        layer.name + '.png'
          sketch.export(layer, {
            scales: '1',
            formats: 'png',
            output: this.rootString + '/images/' + 
            (namespace.length?(namespace.join('/') + '/'):'')
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

export default JSONPageWriter