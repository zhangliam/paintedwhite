<template>
  <div class="sider">
    <div class="sider-logo">
      <div class="sider-title">导出</div>
      <!-- <div class="sider-logo-title"><input type="file" id="fileInput"></div> -->
      <div class="sider-exportarea">
        <a @click="exportCodeMoudle('h5')" class="sider-exportbtn">H5模版</a>
        <a @click="exportCodeMoudle('miniprogram')" class="sider-exportbtn">小程序模版</a>
        <a @click="saveEditRequest" class="sider-exportbtn">保存修改</a>
      </div>
    </div>
    <div class="sider-content">
      <SiderPage></SiderPage>
      <SiderLayer></SiderLayer>
    </div>
  </div>
</template>

<script setup>

  import axios from 'axios';
  import { nextTick, onMounted, provide, inject, ref} from 'vue';
  import SiderPage from './sider/page.vue'
  import SiderLayer from './sider/layer.vue'
  import htmlformat from 'html-format'
  import { saveAs } from 'file-saver';
  import torem from '@/utils/torem'

  
  let wxss = ""
  let wxContent = ""
  let classIndex = 0
  let exportType
  // wxJson = getWxJson()
  // wxJs = this.getWxJS()

  axios.defaults.baseURL = 'http://192.168.60.237:9999';
  axios.defaults.headers.common['TENANT-ID'] = 4
  axios.defaults.headers.common['Authorization'] = 'Bearer 499dd6fc-3f82-4d3e-89f7-65026bf90c48';

  const exportOriginPageInfo = inject('page')

  const buildHTMLLayout = () => {
    return `
      <!DOCTYPE html>
      <html lang="">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no,maximum-scale=1.0,viewport-fit=cover">
          <title>${ exportOriginPageInfo.value.name }</title>
          <script type="text/javascript">
            let docEl = document.documentElement;
            let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
            let recalc = () => {
              var clientWidth = docEl.clientWidth;
              var scale = clientWidth / 375;
              docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            };
            if (!document.addEventListener) {
              ruturn;
            }
            window.addEventListener(resizeEvt, recalc, false);
            document.addEventListener('DOMContentLoaded', recalc, false);
            recalc();
          ${ "<" + "/script>" }
          <style>
            * {
              box-sizing: border-box;
              outline: 0;
            }
            ${ wxss }
          </style>
        </head>
        <body>
          ${ wxContent }
        </body>
      </html> 
    `
  }

  const json2wx = (node) => {
    if (!node) return;
    if (node.__id) {
      let style = ""
      node.style = torem.px2rem(node.style, exportType)
      for (const key in node.style) {
        style += `  ${key}:${node.style[key]};\n`
      }
      classIndex++
      switch (node.type) {
        case "basic-container-div":
          wxContent += ` <view class="view-${classIndex}">\n`
          if (node.components.length) {
            node.style["z-index"] = 1 
            style += "  z-index:1;"
          }
        
          wxss += `.view-${classIndex} { \n ${style} \n }\n\n`
          break;
        case "basic-layer-image":
          wxContent += `<image class="image-${classIndex}" src="${node.value}" />\n`
          wxss += `.image-${classIndex} { \n ${style} \n }\n\n`
          break;
        case "basic-layer-text":
          wxContent += `<text class="text-${classIndex}">${node.value}</text>`
          wxss += `.text-${classIndex} { \n ${style} \n }\n\n`
          break;
        default:
          wxContent += `<view class="page">\n`
          wxss += `.page { \n ${style} \n }\n\n`
          break;
      }

      const children = node.components
      if (children.length) {
        children.forEach(element => {
          json2wx(element)
        })
      }

      switch (node.type) {
        case "basic-container-div":
          wxContent += `</view>\n`
          break;
        case "basic-layer-image":
          wxContent += ``
          break;
        case "basic-layer-text":
          wxContent += `\n`
          break;
        default:
          wxContent += `</view>\n`
          break;
      }

    }
  }

  const resetExportContent = () => {
    wxss = ''
    wxContent = ''
    classIndex = 0
  }

  const exportCodeMoudle = (type) => {

    const temp_stringify = JSON.stringify(exportOriginPageInfo.value)
    const toObjectNode = Object.assign({}, JSON.parse(temp_stringify))

    exportType = type
    json2wx(toObjectNode)

    if(type === 'h5') {
      const resultBuildHTML = buildHTMLLayout()
      downloadDoc(
        `${ exportOriginPageInfo.value.name }`,
        { suffix: 'html', content: htmlformat(resultBuildHTML) }
      )
      resetExportContent()
      return
    }

    const multipleDocList = [
      { suffix: 'plain', namesuffix: '.wxml', content: htmlformat(wxContent) },
      { suffix: 'plain', namesuffix: '.wxss', content: htmlformat(wxss) },
    ]

    multipleDocList.map(item => {
      downloadDoc(`${ exportOriginPageInfo.value.name + item.namesuffix }`, item)
    })
    resetExportContent()

  }

  const downloadDoc = (filename, source) => {
    const exportBlob = new Blob([source.content], { type: `text/${ source.suffix };charset=utf-8` })
    saveAs(exportBlob, filename)
  }

  const saveEditRequest = async () => {
    try {
      const { status, data } = await axios.post(`/blank/paperjson`, {
        pageJson: JSON.stringify(exportOriginPageInfo.value),
        paperId: 18
      })
      // console.log(status, data)
      alert(data.msg)
    } catch (error) {
      console.error(error)
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

  &-title {
    padding-left: 10px;
    height: 36px;
    line-height: 36px;
  }

  &-exportarea {
    display: flex;
    align-items: center;
  }

  &-exportbtn {
    cursor: pointer;
    padding: 8px 10px;
    border-radius: 10px;
    margin-left: 10px;
    color: white;
    background-color: #aabdec;
  } 

  &-logo {
    height: 80px;
   
    box-shadow: 0 2px 1px 0px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 999;

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
    top: 82px;
    bottom: 0px;
    overflow: hidden;
  }
}
</style>