<template>
  <div class="mock" :style="mockStyle">
    <div class="mock-bridge" ref="bridge" :style="bridgeStyle">
      <iframe v-show="!loading" ref="mock" src="http://localhost:8081/#/home"></iframe>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref, watch } from 'vue'
import mitt from '@/utils/mitt'
import { findOneById } from '../../../utils/lowdb'

const orientation = inject('orientation')

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
const loading = ref(false)
const layerID = inject('layerID')
const config = inject('config')
const actions = inject('actions')


// 切换页面后期Q2再支持多页面解析
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
  // let o = findOneById('origin', layer.__id) 
  // o && mock.value.contentWindow.postMessage({
  //   command: 'UPDATE_ORIGIN',
  //   data: JSON.stringify({
  //     target: layer.__id,
  //     newValue: o
  //   })
  // }, '*')
  // let r = findOneById('row', layer.__id)
  // r && mock.value.contentWindow.postMessage({
  //   command: 'UPDATE_ROWS',
  //   data: JSON.stringify({
  //     target: layer.__id,
  //     newValue: r
  //   })
  // }, '*')
  // for (let comp of layer.components) {
  //   initData(comp)
  // }


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
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #8186D5;
  // overflow-x: hidden;
  // overflow-y: scroll;
  box-sizing: border-box;
  background-position: 0 0;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNrs3cFKAkEcwOFxN4MyCpE8dfTgpfd/oUAyRAotKRb6D9QLOMHQzvfB5Gl3HPjRKq7jpOu6h1TXTYxDalfV9V/kP8MwPJ17gr7vZ/FwjHOce/w8jt1XnH8Zx25bXX+XaJoABIAAEAACQAAIAAEgAASAABAAAmDEJl3XreJxU/E53MV4rTj/fYyXVtef7wc4xTgWnGNWePxl5flnLa/fJaBxv3cEnX2Cvu9TyTny8eavN7//AN4FIAAEgAAQAAJAAAgAASAABMC45fsB1vH4XHCOqxgfFddQOv8ixq7V9edPAw+F30//THW/H186/7Tl9bsEeA2AABAAAkAACAABIAAEgAAQAAJAAIzV5Of3AvYVn4P9ASrvD5DZH6DR9bsENM7+APYHwLsABIAAEAACQAAIAAEgAASAABixfD/AYyrbH+A6xnvB8bcx3irOX+pfrz9/GrgfhmF77glKf78+jv8q/H586fzLltfvEuA1AAJAAAgAASAABIAAEAACQAAIAAEwVvl+gFU8bio+B/sDVN4f4JTsD2B/ANpkfwD7A+BdAAJAAAgAASAABIAAEAACQACMWL4fYJ3K9gco+v36P1A6/yLGrtX1508DDzV/vz6On1eef9ry+l0CvAZAAAgAASAABIAAEAACQAAIAAEgAMbK/gD2B7A/QLI/AK2yP4D9AfAuAAEgAASAABAAAkAACAABIABG7FuAAQAKgDTTmTYqsQAAAABJRU5ErkJggg==);

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
