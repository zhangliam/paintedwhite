<template>
  <div class="sider">
    <div class="sider-logo">
      <!-- <div class="sider-logo-title"><input type="file" id="fileInput"></div> -->
      <a @click="exportCodeMoudle" class="sider-exportbtn">导出</a>
    </div>
    <div class="sider-content">
      <SiderPage></SiderPage>
      <SiderLayer></SiderLayer>
    </div>
  </div>
</template>

<script setup>

  import { nextTick, onMounted, provide, inject, ref} from 'vue';
  import SiderPage from './sider/page.vue'
  import SiderLayer from './sider/layer.vue'

  let wxContent = ""
  let wxss = ""
  let classIndex = 0
  // wxJson = getWxJson()
  // wxJs = this.getWxJS()
  

  const exportOriginPageInfo = inject('page')

  const exportCodeMoudle = () => {
    const temp_stringify = JSON.stringify(exportOriginPageInfo.value)
    console.log()
    const toObjectNode = Object.assign({}, JSON.parse(temp_stringify))
    json2wx(toObjectNode)
    console.log(wxContent, wxss, classIndex)
    // downloadDoc('hello word', JSON.stringify(exportOriginPageInfo.value))
  }

  const downloadDoc = (filename, text) => {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('\n\n\n' + text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

   // 判断元素是否在蒙版中
  const isInMask = (maskFrame, itemFrame) => {
    if ((parseFloat(itemFrame.top) + parseFloat(itemFrame.height) < parseFloat(maskFrame.top)) || (parseFloat(itemFrame.top) > parseFloat(maskFrame.top) + parseFloat(maskFrame.height)) || (parseFloat(itemFrame.left) + parseFloat(itemFrame.width) < parseFloat(maskFrame.left)) || (parseFloat(itemFrame.left) > parseFloat(maskFrame.left) + parseFloat(maskFrame.width))) {
      return false
    }
    else {
      return true
    }
  }

  const json2wx = (node, maskFrame = null) => {
    if (!node) return;
    if (node.__id) {
      let style = ""
      for (const key in node.style) {
        style += `${key}:${node.style[key]};`
      }
      classIndex++
      switch (node.type) {
        case "basic-container-div":
          wxContent += `  <view class="view-${classIndex}">\n`
          if (node.components.length) {
            node.style["z-index"] = 1 
            style += "z-index:1;"
          }
          wxss += `.view-${classIndex}{${style}}\n`
          break;
        case "basic-layer-image":
          wxContent += `  <image class="image-${classIndex}" src="${node.value}" />\n`
          // if (maskFrame) {
          //   let itemFrame = {
          //     width: node.style.width,
          //     height: node.style.height,
          //     top: node.style.top,
          //     left: node.style.left,
          //   }
          //   // console.log('%c [ maskFrame ]-445', maskFrame)
          //   // console.log('%c [ itemFrame ]-446', itemFrame)
          //   if (isInMask(maskFrame, itemFrame)) {
          //     if (parseFloat(itemFrame.width) > parseFloat(maskFrame.width)) {
          //       node.style.width = maskFrame.width
          //     }
          //     if (parseFloat(itemFrame.height) > parseFloat(maskFrame.height)) {
          //       node.style.height = maskFrame.height
          //     }
          //     if (parseFloat(itemFrame.top) < parseFloat(maskFrame.top)) {
          //       node.style.top = maskFrame.top
          //     }
          //     if (parseFloat(itemFrame.left) < parseFloat(maskFrame.left)) {
          //       node.style.left = maskFrame.left
          //     }
          //     node.style["z-index"] = 2
          //     style = ""
          //     for (const key in node.style) {
          //       style += `${key}:${node.style[key]};`
          //     }
          //   }
          // }
          wxss += `.image-${classIndex}{${style}}\n`
          break;
        case "basic-layer-text":
          wxContent += `  <text class="text-${classIndex}">${node.value}`
          wxss += `.text-${classIndex}{${style}}\n`
          break;
        default:
          wxContent += `<view class="page">\n`
          wxss += `.page{${style}}\n`
          break;
      }

      const children = node.components
      if (children.length) {
        maskFrame = null
        // if (node.hasMaskChild) {
        //   delete node.hasMaskChild
        //   //如果当前节点的字元素中有蒙版
        //   let child = children.find(i => i.isMask)
        //   if (child) {
        //     maskFrame = { top: child.style.top, left: child.style.left, width: child.style.width, height: child.style.height }
        //     child.isMask && delete child.isMask
        //   }
        // }
        children.forEach(element => {
          json2wx(element, maskFrame)
        })
      }

      switch (node.type) {
        case "basic-container-div":
          wxContent += `</view>\n`
          break;
        case "basic-layer-image":
          wxContent += `\n`
          break;
        case "basic-layer-text":
          wxContent += `</text>\n`
          break;
        default:
          wxContent += `</view>\n`
          break;
      }

    }
  }



  /*  
    本地读取文件能力
  */
  // onMounted( () => {
  //   const fileInput = document.getElementById('fileInput');
  //   fileInput.addEventListener('change', (event) => {
  //       const file = event.target.files[0]
  //       const reader = new FileReader()

  //       reader.onload = function () {
  //         console.log(JSON.parse(reader.result))
  //       }

  //       reader.onerror = function() {
  //         console.log(reader.error)
  //       };
  //       reader.readAsText(file)
  //   })
  // })
</script>

<style lang="less">
.sider {
  width: 20%;
  height: 100%;
  background-color: #FFFFFF;
  border-right: 1px solid #CCC;
  position: relative;

  &-exportbtn {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 10px;
    color: white;
    background-color: #aabdec;
  } 

  &-logo {
    height: 50px;
    /* display: flex; */
    box-shadow: 0 2px 1px 0px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;

    &-title {
      color: #494CA2;
      font-size: 32px;
      font-weight: bold;
      // padding: 26px 0px 12px 0px;
      // text-align: center;
      overflow: hidden;
    }
  }

  &-content {
    width: 100%;
    position: absolute;
    left: 0px;
    top: 50px;
    bottom: 0px;
    overflow: hidden;
  }
}
</style>