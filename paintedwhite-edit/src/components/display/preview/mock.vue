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
      return 'c1ae3b8a-5db1-46c1-bb62-fd9bf2ce4cd0'
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
