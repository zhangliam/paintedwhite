<template>
  <div class="mock" :style="mockStyle">
    <div class="mock-bridge" ref="bridge" :style="bridgeStyle">
      <iframe v-show="!loading" ref="mock" @load="frameLoadCallback" :src="IFRAMEURL"></iframe>
    </div>
  </div>  
</template>

<script setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import { computed, inject, ref, watch, nextTick } from 'vue'
import mitt from '@/utils/mitt'
import { findOneById } from '../../../utils/lowdb'
import { getExcuteList } from "@/utils/crud"
import { requestInitial, requestGet } from "@/utils/request"


const orientation = inject('orientation')
const IFRAMEURL = process.env.VUE_APP_IFRAME_API

const mockStyle = computed(() => {
  return orientation.value ? {
    width: '375px',
    height: '812px'
  } : {
    width: '750px',
    height: '422px'
  }
})

const bridgeStyle = computed(() => {
  return orientation.value ? {
    width: `calc(${375 / 317 * 100}%)`,
    height: `calc(${375 / 317 * 100}%)`,
    transform: `scale(${317 / 375})`,
    'transform-origin': `top left`
  } : {
    width: '100%',
    height: '100%'
  }
})

const mock = ref(null)
const page = inject('page')
const pages = inject('pages')

const loading = ref(false)
const layerID = inject('layerID')
const config = inject('config')
const actions = inject('actions')

let $SUPER 
let $SUPER_PRO_INFO
const _APPENV = process.env.VUE_APP_ENV

if(_APPENV === 'DEVELOP') {
  $SUPER = {
    accessToken() {
      return 'd6a06531-debd-430a-9602-17f8335b8eb0'
    },
    getProInfo() {
      return {
        tenantId: 4,
        terminalType: 'to_c',
        paperId: 105,
      }
    } 
  }
}

if(_APPENV === 'RELEASE') {
  $SUPER = inject('$super')
}

if($SUPER) {
  $SUPER_PRO_INFO = $SUPER.getProInfo()
  requestInitial($SUPER)
  console.log('mockIframe Data ======>', $SUPER, $SUPER.getProInfo())
}

const getDesignMoudleInfo = async (callback) => {

  if(!$SUPER_PRO_INFO) {
    console.log('主应用信息获取失败')
    return
  }

  try {
    const { status, data } = await requestGet({
      path: `/blank/paper/getPaperJson/${ $SUPER_PRO_INFO['paperId'] }`,
      params: {
        'TERMINAL-TYPE': $SUPER_PRO_INFO['terminalType']
      }
    })
    if(status === 200) {
      pages.value = [].concat(data.data)
      page.value = data.data
      callback && callback()
    }
  } catch (error) {
    console.error(error)
  }

  // let mockJson = {
  //     "class": "",
  //     "style": {},
  //     "components": [{
  //       "__id": "580E4210-BAAF-4D2D-94E4-3EA36B2F8597",
  //       "style": {
  //         "width": "100%",
  //         "position": "absolute",
  //         "top": "0px",
  //         "left": "0px"
  //       },
  //       "value": "",
  //       "components": [{
  //         "__id": "E21017C7-351E-498D-A766-822306B91CBF",
  //         "style": {
  //           "width": "456px",
  //           "height": "244px",
  //           "position": "absolute",
  //           "top": "1040px",
  //           "left": "156px"
  //         },
  //         "value": "",
  //         "components": [{
  //           "__id": "A9DD1240-4F54-40D3-898B-8DED379EC6F3",
  //           "style": {
  //             "width": "128px",
  //             "height": "128px",
  //             "position": "absolute",
  //             "top": "0px",
  //             "left": "156px"
  //           },
  //           "value": "images/编组 6.png",
  //           "components": [{
  //             "__id": "BAE9E8F3-A8F8-4ECD-A088-535C5FD7A788",
  //             "style": {
  //               "width": "128px",
  //               "height": "128px",
  //               "position": "absolute",
  //               "top": "0px",
  //               "left": "0px"
  //             },
  //             "value": "images/WechatIMG1932.png",
  //             "components": [],
  //             "config": {},
  //             "include": ["normal"],
  //             "type": "basic-layer-image"
  //           }],
  //           "config": {},
  //           "include": ["normal"],
  //           "type": "basic-layer-image"
  //         }, {
  //           "__id": "AE88BA63-C9E8-4248-88B1-15F4C847F0DF",
  //           "style": {
  //             "width": "456px",
  //             "height": "84px",
  //             "position": "absolute",
  //             "top": "160px",
  //             "left": "0px",
  //             "color": "#A0A0A0",
  //             "font-size": "24px",
  //             "font-family": "PingFangSC-Regular",
  //             "font-weight": "5",
  //             "line-height": "42px",
  //             "text-align": "center"
  //           },
  //           "value": "每位会员限领一次，数量有限，领完即止。\n兑换二维码每5分钟自动刷新。",
  //           "components": [],
  //           "config": {},
  //           "include": ["normal"],
  //           "type": "basic-layer-text"
  //         }],
  //         "config": {},
  //         "include": ["normal"],
  //         "type": "basic-container-div"
  //       }, {
  //         "__id": "5B1C51F9-67C8-4D15-8074-31DEB4DE9C32",
  //         "style": {
  //           "width": "478px",
  //           "height": "232px",
  //           "position": "absolute",
  //           "top": "728px",
  //           "left": "145px"
  //         },
  //         "value": "",
  //         "components": [{
  //           "__id": "113A01A5-272F-49F8-9655-D7A493A8ACFA",
  //           "style": {
  //             "width": "216px",
  //             "height": "56px",
  //             "position": "absolute",
  //             "top": "0px",
  //             "left": "123px",
  //             "color": "#1D1D1D",
  //             "font-size": "36px",
  //             "font-family": "PingFangSC-Medium",
  //             "font-weight": "6",
  //             "line-height": "56px",
  //             "text-align": "center"
  //           },
  //           "value": "亲爱的吴珊迪",
  //           "components": [],
  //           "config": {},
  //           "include": ["normal"],
  //           "type": "basic-layer-text"
  //         }, {
  //           "__id": "76D151A9-CE85-4FA1-8071-404096ACD2F8",
  //           "style": {
  //             "width": "478px",
  //             "height": "144px",
  //             "position": "absolute",
  //             "top": "88px",
  //             "left": "0px",
  //             "color": "#1D1D1D",
  //             "font-size": "28px",
  //             "font-family": "PingFangSC-Regular",
  //             "font-weight": "5",
  //             "line-height": "48px",
  //             "text-align": "center"
  //           },
  //           "value": "感谢您来到香奈儿PREMIÈRE游乐场，\n有一份礼物等待您领取,\n请于入场当日凭此二维码兑换。",
  //           "components": [],
  //           "config": {},
  //           "include": ["normal"],
  //           "type": "basic-layer-text"
  //         }],
  //         "config": {},
  //         "include": ["normal"],
  //         "type": "basic-container-div"
  //       }, {
  //         "__id": "82388102-FA96-47A4-8B36-51F3F9D57066",
  //         "style": {
  //           "width": "100%",
  //           "position": "absolute",
  //           "top": "0px",
  //           "left": "0px"
  //         },
  //         "value": "images/ANIMzoltar.png",
  //         "components": [],
  //         "config": {
  //           "mode": "aspectFill"
  //         },
  //         "include": ["normal"],
  //         "type": "basic-layer-image"
  //       }],
  //       "config": {},
  //       "include": ["normal"],
  //       "type": "basic-container-div"
  //     }],
  //     "actions": [],
  //     "animations": [],
  //     "__id": "B85724D2-DE3A-452A-8539-89F08364B602"
  // }

  // pages.value = [].concat(mockJson)
  // page.value = mockJson
  // callback && callback()

}


const frameLoadCallback = () => {
  getDesignMoudleInfo(() => {
    setTimeout(() => {
      mock.value.contentWindow.postMessage({
        command: 'POST_DESIGNDRAFT_JSON',
        data: JSON.stringify(page.value)
      }, '*')
    }, 0)
  })
 
  // watch(page, () => {
  //   setTimeout(() => {
  //     mock.value.contentWindow.postMessage({
  //       command: 'POST_DESIGNDRAFT_JSON',
  //       data: JSON.stringify(page.value)
  //     }, '*')
  //   }, 1000)
  // })
}


// 页面切换backup
// watch(page, () => {
//   if (mock.value && mock.value.contentWindow) {
//     loading.value = true
//     mock.value.contentWindow.postMessage({
//       command: 'CHANGE_PAGE',
//       page: JSON.stringify(page.value)
//     }, '*')
//   }
// })

const initData = (layer) => {
  
  let o = findOneById('origin', layer.__id) 
  o && mock.value.contentWindow.postMessage({
    command: 'UPDATE_ORIGIN',
    data: JSON.stringify({
      target: layer.__id,
      newValue: o
    })
  }, '*')

  let r = findOneById('row', layer.__id)
  r && mock.value.contentWindow.postMessage({
    command: 'UPDATE_ROWS',
    data: JSON.stringify({
      target: layer.__id,
      newValue: r
    })
  }, '*')

  for (let comp of layer.components) {
    initData(comp)
  }


  mock.value.contentWindow.postMessage({
    command: 'UPDATE_ORIGIN',
    data: JSON.stringify({
      target: layer.__id,
      newValue: o
    })
  }, '*')
  
  mock.value.contentWindow.postMessage({
    command: 'UPDATE_ROWS',
    data: JSON.stringify({
      target: layer.__id,
      newValue: r
    })
  }, '*')

  for (let comp of layer.components) {
    initData(comp)
  }

}

window.addEventListener('message', (e) => {

  switch (e.data.command) {
    case 'LOAD_COMPLETE':
      loading.value = false
      
      // setTimeout(() => {
        initData(page.value)
      // }, 500)
      break
    case 'SELECT_LAYER':
      layerID.value = e.data.__id
      break
    case 'MODEL_ACTIONS':
      actions.value[e.data.data.target] = e.data.data.actions
      break
  }

})

const status = ref('normal')
watch(layerID, () => {
  mock.value.contentWindow.postMessage({
    command: 'SELECT_LAYER',
    layer: layerID.value
  }, '*')
})

mitt.on('update_visible', e => {
  mock.value.contentWindow.postMessage({
    command: 'UPDATE_VISIBLE',
    data: e
  }, '*')
})

mitt.on('update_action', e => {
  mock.value.contentWindow.postMessage({
    command: 'UPDATE_ACTION',
    data: e
  }, '*')
})

mitt.on('load_css', e => {
  mock.value.contentWindow.postMessage({
    command: 'LOAD_CSS',
    path: config.value.path,
    files: e
  }, '*')
})

mitt.on('update_prop', e => {
  mock.value.contentWindow.postMessage({
    command: 'UPDATE_PROP',
    data: JSON.stringify(e)
  }, '*')
})
mitt.on('update_status', e => {
  mock.value.contentWindow.postMessage({
    command: 'UPDATE_STATUS',
    data: JSON.stringify(e)
  }, '*')
})
mitt.on('update_origin', e => {
  mock.value.contentWindow.postMessage({
    command: 'UPDATE_ORIGIN',
    data: JSON.stringify(e)
  }, '*')
})
mitt.on('update_rows', e => {
  mock.value.contentWindow.postMessage({
    command: 'UPDATE_ROWS',
    data: JSON.stringify(e)
  }, '*')
})
</script>

<style lang="less">
.mock {
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid #CCCCCC;
  // overflow-x: hidden;
  // overflow-y: scroll;
  box-sizing: border-box;
  background-position: 0 0;
  //background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNrs3cFKAkEcwOFxN4MyCpE8dfTgpfd/oUAyRAotKRb6D9QLOMHQzvfB5Gl3HPjRKq7jpOu6h1TXTYxDalfV9V/kP8MwPJ17gr7vZ/FwjHOce/w8jt1XnH8Zx25bXX+XaJoABIAAEAACQAAIAAEgAASAABAAAmDEJl3XreJxU/E53MV4rTj/fYyXVtef7wc4xTgWnGNWePxl5flnLa/fJaBxv3cEnX2Cvu9TyTny8eavN7//AN4FIAAEgAAQAAJAAAgAASAABMC45fsB1vH4XHCOqxgfFddQOv8ixq7V9edPAw+F30//THW/H186/7Tl9bsEeA2AABAAAkAACAABIAAEgAAQAAJAAIzV5Of3AvYVn4P9ASrvD5DZH6DR9bsENM7+APYHwLsABIAAEAACQAAIAAEgAASAABixfD/AYyrbH+A6xnvB8bcx3irOX+pfrz9/GrgfhmF77glKf78+jv8q/H586fzLltfvEuA1AAJAAAgAASAABIAAEAACQAAIAAEwVvl+gFU8bio+B/sDVN4f4JTsD2B/ANpkfwD7A+BdAAJAAAgAASAABIAAEAACQACMWL4fYJ3K9gco+v36P1A6/yLGrtX1508DDzV/vz6On1eef9ry+l0CvAZAAAgAASAABIAAEAACQAAIAAEgAMbK/gD2B7A/QLI/AK2yP4D9AfAuAAEgAASAABAAAkAACAABIABG7FuAAQAKgDTTmTYqsQAAAABJRU5ErkJggg==);

  &-bridge {
    position: relatave;
    height: 100%;
    // overflow-x: hidden;
    // overflow-y: scroll;

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .image {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    img {
      width: auto;
      height: auto;
    }

    .aspectFit {
      max-width: 100%;
      max-height: 100%;
    }

    .aspectFill {
      width: 100%;
      height: 100%;
    }

    .scaleToFill {
      min-width: 100%;
      min-height: 100%;
    }
  }
}
</style>
