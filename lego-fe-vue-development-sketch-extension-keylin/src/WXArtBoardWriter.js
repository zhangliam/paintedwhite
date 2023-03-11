import sketch from 'sketch'
import fs from "@skpm/fs"
// import regeneratorRuntime from './runtime'

class WXArtBoardWriter {
  constructor(nArtboard, rootString, offsetY) {
    this.nArtboard = nArtboard
    this.offsetY = offsetY
    this.aName = ''
    this.rootString = rootString
    this.imageDir = ''
    this.layerNameList = []
    this.page = {
      version: '',
      name: 'Main',
      status: ["normal"],
      class: '',
      style: {},
      components: [],
      actions: [],
      animations: []
    }
    this.wxContent = ""
    this.wxss = ""
    this.wxJson = this.getWxJson()
    this.wxJs = this.getWxJS()
    this.classIndex = 0
  }

  getWxJson() {
    return `
    {
      "usingComponents": {}
    }
    `
  }

  getWxJS() {
    return `
    Page({
    
    /**
    
    * 页面的初始数据
    
    */
    
    data: {
    
    },
    
    /**
    
    * 生命周期函数--监听页面加载
    
    */
    
    onLoad: function (options) {
    
    },
    
    /**
    
    * 生命周期函数--监听页面初次渲染完成
    
    */
    
    onReady: function () {
    
    },
    
    /**
    
    * 生命周期函数--监听页面显示
    
    */
    
    onShow: function () {
    
    },
    
    /**
    
    * 生命周期函数--监听页面隐藏
    
    */
    
    onHide: function () {
    
    },
    
    /**
    
    * 生命周期函数--监听页面卸载
    
    */
    
    onUnload: function () {
    
    },
    
    /**
    
    * 页面相关事件处理函数--监听用户下拉动作
    
    */
    
    onPullDownRefresh: function () {
    
    },
    
    /**
    
    * 页面上拉触底事件的处理函数
    
    */
    
    onReachBottom: function () {
    
    },
    
    /**
    
    * 用户点击右上角分享
    
    */
    
    onShareAppMessage: function () {
    
    }
    
    })
    
    `
  }

  async write() {
    this.checkArtboard(this.nArtboard, 0, this.offsetY)
    this.transformWx(this.page)
    return {
      json: this.page,
      wxContent: this.wxContent,
      wxJson: this.wxJson,
      wxJs: this.wxJs,
      wxss: this.wxss
    }
  }

  checkArtboard(nArtboard, offsetX, offsetY) {
    let artboard = sketch.fromNative(nArtboard)
    console.log('%c [ artboard ]-157', artboard)
    if (nArtboard.class() === MSArtboardGroup) {
      let frame = artboard.frame
      let scale = 750 / frame.width
      this.aName = artboard.name
      this.imageDir = this.rootString + this.aName + '/images/'
      this.page.__id = artboard.id
      this.page.type = "page"
      let x = offsetX * scale
      let y = offsetY * scale
      const bgColor = artboard.background.color.slice(0, 7)
      if (bgColor != "#ffffff") {
        //如果背景色不是白色，设置面板背景色
        this.page.style = {
          height: Math.round(frame.height * scale - y) + "rpx",
          ['background-color']: bgColor
        }
      }
      this.writeLayer(artboard, { scale, x, y }, this.page)
    }
  }

  writeLayer(container, offset, parent) {
    let power = 0 // 权重
    let layers = container.layers;
    let { scale, x, y } = offset
    layers.forEach(layer => {
      let imageDir = this.imageDir
      let nlayer = layer.sketchObject
      // let layer = sketch.fromNative(nlayer)
      // 跳过蒙板和隐藏图层
      //console.log('%c [ nlayer.hasClippingMask() ]-188',  nlayer.hasClippingMask())
      if (layer.hidden) {
        return
      }
      let frame = layer.frame
      let width = Math.round(frame.width * scale)
      let height = Math.round(frame.height * scale)
      let top = Math.round(frame.y * scale - y)
      let left = Math.round(frame.x * scale - x)
      if(parent==this.page && top == -y) return
      // if (top >= 0) {
        let layerName = layer.name
        let renameDir = ''
        if (this.layerNameList.includes(layerName)) {
          renameDir = layer.id + '/'
          imageDir = imageDir + renameDir
        } else {
          this.layerNameList.push(layerName)
        }
        let item = {
          __id: layer.id,
          style: {
            width: width + 'rpx',
            height: height + 'rpx',
            position: 'absolute',
            top: top + 'rpx',
            left: left + 'rpx',
          },
          name: '',
          status: ["normal"],
          value: '',
          components: [],
          config: {},
          include: ["normal"],
          actions: [],
          animations: []
        }
        if (nlayer.hasClippingMask()) {
          parent.hasMaskChild = true;
          item.isMask = true
        }
        console.log('%c [ layer ]-71', layer)
        // console.log('%c [ nlayer.hasClippingMask() ]-181', nlayer.hasClippingMask())
        // console.log('%c [ nlayer.clippingMaskMode ]-191', nlayer.clippingMaskMode())
        // console.log('%c [ nlayer.layerListExpandedType ]-191', nlayer.layerListExpandedType())
        // console.log('%c [ nlayer.shouldBreakMaskChain ]-191', nlayer.shouldBreakMaskChain())
        switch (layer.type) {
          case 'Image':
            power += 1
            item.type = 'basic-layer-image'
            item.value = 'images/' + renameDir + (scale > 1 ? layer.name + '@' + scale + 'x' : layer.name) + '.png'
            sketch.export(layer, {
              scales: scale,
              formats: 'png',
              output: imageDir
            })
            break
          case 'Text':
            const alignment = { 0: 'left', 1: 'right', 2: 'center' }
            power += 2
            let attributes = layer.sketchObject.attributedString().treeAsDictionary().value.attributes
            if (attributes.length > 1) {
              item.type = 'basic-container-div'
              item.style['display'] = 'flex'
              item.style['flex-direction'] = 'row'
              item.style['flex-wrap'] = 'wrap'
              item.style['align-items'] = 'baseline'
              attributes.forEach(async el => {
                let sub = {
                  type: 'basic-layer-text',
                  value: el.text.trim() + '',
                  style: {},
                  components: [],
                  config: {},
                  include: ["normal"]
                }
                sub.style['color'] = el.MSAttributedStringColorAttribute.value + ''
                sub.style['font-size'] = Math.round(el.NSFont.attributes.NSFontSizeAttribute * scale) + 'rpx',
                  sub.style['font-family'] = el.NSFont.attributes.NSFontNameAttribute + ''
                sub.style['font-weight'] = layer.style.fontWeight + ''
                sub.style['line-height'] = Math.round(el.NSParagraphStyle.style.minimumLineHeight * scale) + 'rpx'
                sub.style['text-align'] = alignment[el.NSParagraphStyle.style.alignment + '']
                sub.style['text-align'] = sub.style['text-align'] == 'justified' ? 'justify' : sub.style['text-align']
                item.components.push(sub)
              })
            } else {
              item.type = 'basic-layer-text'
              item.value = layer.text.trim()
              console.log(attributes[0].MSAttributedStringColorAttribute.value)
              console.log(attributes[0].NSFont.attributes.NSFontNameAttribute)
              console.log(attributes[0].NSFont.attributes.NSFontSizeAttribute)
              item.style['color'] = attributes[0].MSAttributedStringColorAttribute.value + ''
              item.style['font-size'] = Math.round(attributes[0].NSFont.attributes.NSFontSizeAttribute * scale) + 'rpx'
              item.style['font-family'] = attributes[0].NSFont.attributes.NSFontNameAttribute + ''
              item.style['font-weight'] = layer.style.fontWeight + ''
              item.style['line-height'] = Math.round(layer.style.lineHeight * scale) + 'rpx'
              item.style['text-align'] = layer.style.alignment + ''
              item.style['text-align'] = item.style['text-align'] == 'justified' ? 'justify' : item.style['text-align']
            }
            break
          case 'ShapePath':
            switch (layer.shapeType) {
              case 'Rectangle', 'Custom':
                item.type = 'basic-container-div'
                item.style['border-radius'] = ''
                for (let point of layer.points) {
                  item.style['border-radius'] += Math.round(point.cornerRadius * scale) + 'rpx '
                }
                if (layer.style.fills.length && layer.style.fills[0].fillType === 'Color') {
                  item.style['background-color'] = layer.style.fills[0].color.slice(0, -2)
                }
                if (layer.style.borders.length) {
                  item.style['border'] = `${Math.round(layer.style.borders[0].thickness * scale)}rpx solid ${layer.style.borders[0].color.slice(0, -2)}`
                  item.style['box-sizing'] = 'border-box'
                }
                break
              case 'Oval':
                if (frame.width == frame.height) {
                  item.type = 'basic-container-div'
                  item.style['border-radius'] = Math.round(frame.width * scale / 2) + 'rpx'
                } else {
                  item.type = 'image'
                  item.value = 'images/' + renameDir + (scale > 1 ? layer.name + '@' + scale + 'x' : layer.name) + '.png'
                  sketch.export(layer, {
                    scales: scale,
                    formats: 'png',
                    output: imageDir
                  })
                }
                break
              default:
                item.type = 'basic-layer-image'
                item.value = 'images/' + renameDir + (scale > 1 ? layer.name + '@' + scale + 'x' : layer.name) + '.png'
                sketch.export(layer, {
                  scales: scale,
                  formats: 'png',
                  output: imageDir
                })
            }
            break
          case 'Group':
            power += 1
            item.type = 'basic-container-div'
            // if (layer.exportFormats?.length) {
            //   item.type = 'basic-layer-image'
            //   item.value = 'images/' + renameDir + (scale > 1 ? layer.name + '@' + scale + 'x' : layer.name) + '.png'
            //   sketch.export(layer, {
            //     scales: scale,
            //     formats: 'png',
            //     output: imageDir
            //   })
            // } else {
            if (layer.layers.length) {
              this.writeLayer(layer, { scale, x: 0, y: 0 }, item)
            } else {
              item.type = 'basic-layer-image'
              item.value = 'images/' + renameDir + (scale > 1 ? layer.name + '@' + scale + 'x' : layer.name) + '.png'
              sketch.export(layer, {
                scales: scale,
                formats: 'png',
                output: imageDir
              })
            }
            // }
            break
          case 'SymbolInstance':
            item.type = 'basic-container-div'
            //将SymbolInstance转换成group
            let group = layer.detach({
              recursively: true,
            })
            console.log('%c [ group ]-345', group)
            if (group.layers.length) {
              this.writeLayer(group, { scale, x: 0, y: 0 }, item)
            } else {
              power += 1
              item.type = 'basic-layer-image'
              item.value = 'images/' + renameDir + (scale > 1 ? layer.name + '@' + scale + 'x' : layer.name) + '.png'
              sketch.export(layer, {
                scales: scale,
                formats: 'png',
                output: imageDir
              })
            }
            break
          case 'Shape':
            power += 1
            item.type = 'basic-layer-image'
            item.value = 'images/' + renameDir + (scale > 1 ? layer.name + '@' + scale + 'x' : layer.name) + '.png'
            sketch.export(layer, {
              scales: scale,
              formats: 'png',
              output: imageDir
            })
            break
          default:
            return
        }
        // if(layer.type === '' && layer.layers.length && layer.frame.top == 0 && layer.frame.left == 0)){
        //   delete layer.style.position
        // }
        parent.components.push(item)
      // }
    })
    if (power < 1) {
      return null
    }
    return parent
  }

  // 判断元素是否在蒙版中
  isInMask(maskFrame, itemFrame) {
    if ((parseFloat(itemFrame.top) + parseFloat(itemFrame.height) < parseFloat(maskFrame.top)) || (parseFloat(itemFrame.top) > parseFloat(maskFrame.top) + parseFloat(maskFrame.height)) || (parseFloat(itemFrame.left) + parseFloat(itemFrame.width) < parseFloat(maskFrame.left)) || (parseFloat(itemFrame.left) > parseFloat(maskFrame.left) + parseFloat(maskFrame.width))) {
      return false
    }
    else {
      return true
    }
  }

  maxRect(layers) {
    let { x, y, width, height } = layers[0].frame
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

  transformWx(page) {
    this.wxContent = "<view>\n"
    this.json2wx(page)
    this.wxContent += "</view>"
  }

  json2wx(node, maskFrame = null) {
    if (!node) return;
    if (node.__id) {
      let style = ""
      for (const key in node.style) {
        style += `${key}:${node.style[key]};`
      }
      this.classIndex++
      switch (node.type) {
        case "basic-container-div":
          this.wxContent += `<view class="view-${this.classIndex}">`
          if (node.components.length) {
            node.style["z-index"] = 1
            style += "z-index:1;"
          }
          this.wxss += `.view-${this.classIndex}{${style}}\n`
          break;
        case "basic-layer-image":
          this.wxContent += `<image class="image-${this.classIndex}" src="${node.value}">`
          if (maskFrame) {
            let itemFrame = {
              width: node.style.width,
              height: node.style.height,
              top: node.style.top,
              left: node.style.left,
            }
            // console.log('%c [ maskFrame ]-445', maskFrame)
            // console.log('%c [ itemFrame ]-446', itemFrame)
            if (this.isInMask(maskFrame, itemFrame)) {
              if (parseFloat(itemFrame.width) > parseFloat(maskFrame.width)) {
                node.style.width = maskFrame.width
              }
              if (parseFloat(itemFrame.height) > parseFloat(maskFrame.height)) {
                node.style.height = maskFrame.height
              }
              if (parseFloat(itemFrame.top) < parseFloat(maskFrame.top)) {
                node.style.top = maskFrame.top
              }
              if (parseFloat(itemFrame.left) < parseFloat(maskFrame.left)) {
                node.style.left = maskFrame.left
              }
              node.style["z-index"] = 2
              style = ""
              for (const key in node.style) {
                style += `${key}:${node.style[key]};`
              }
            }
          }
          this.wxss += `.image-${this.classIndex}{${style}}\n`
          break;
        case "basic-layer-text":
          this.wxContent += `<text class="text-${this.classIndex}">${node.value}`
          this.wxss += `.text-${this.classIndex}{${style}}\n`
          break;
        default:
          this.wxContent += `<view class="page">\n`
          this.wxss += `.page{${style}}\n`
          break;
      }
      const children = node.components
      if (children.length) {
        maskFrame = null
        if (node.hasMaskChild) {
          delete node.hasMaskChild
          //如果当前节点的字元素中有蒙版
          let child = children.find(i => i.isMask)
          if (child) {
            maskFrame = { top: child.style.top, left: child.style.left, width: child.style.width, height: child.style.height }
            child.isMask && delete child.isMask
          }
        }
        children.forEach(element => {
          this.json2wx(element, maskFrame)
        })
      }
      switch (node.type) {
        case "basic-container-div":
          this.wxContent += `</view>\n`
          break;
        case "basic-layer-image":
          this.wxContent += `</image>\n`
          break;
        case "basic-layer-text":
          this.wxContent += `</text>\n`
          break;
        default:
          this.wxContent += `</view>\n`
          break;
      }
    }
  }
}

export default WXArtBoardWriter