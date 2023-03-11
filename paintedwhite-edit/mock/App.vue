<template>
  <page :dataSource="dataSource"></page>
</template>

<script setup>
import { nextTick, onUpdated, provide, ref } from 'vue';
import Page from './page/index.vue'
import { hook } from './utils/hook'
import { changeAction } from './utils/modelaction'
import { jsonParse } from './utils/json'

const dataSource = ref({})
let isChanged = false

window.addEventListener('message', (e) => {
  console.log(e.data)
  const data = e.data.data && JSON.parse(e.data.data)
  switch (e.data.command) {
    case 'LOAD_CSS':
      loadCss(e.data.path, e.data.files)
      break;
    case 'CHANGE_PAGE':
      console.time('mounted')
      isChanged = true
      layerID.value = ''
      Object.keys(elements.value).forEach(el => {
        delete elements.value[el]
      })
      dataSource.value = jsonParse(e.data.page)
      break;
    case 'SELECT_LAYER':
      if (elements.value[layerID.value] && elements.value[layerID.value].element.classList) elements.value[layerID.value].element.classList.remove('layer_selected')
      layerID.value = e.data.layer
      if (elements.value[layerID.value] && elements.value[layerID.value].element.classList) elements.value[layerID.value].element.classList.add('layer_selected')
      break;
    case 'UPDATE_PROP':
      if (data.prop.startsWith('style.')) {
        elements.value[data.target].setStyle({
          [data.prop.replace('style.', '')]: jsonParse(data.newValue)
        })
      } else if (data.prop.startsWith('config.')) {
        elements.value[data.target].setConfig({
          [data.prop.replace('config.', '')]: jsonParse(data.newValue)
        })
      } else {
        console.log(data.newValue)
        elements.value[data.target].setItem({
          [data.prop]: jsonParse(data.newValue)
        })
      }
      break;
    case 'UPDATE_STATUS':
      elements.value[data.target].setStatus(jsonParse(data.newValue))
      break;
    case 'UPDATE_ORIGIN':
      elements.value[data.target].setOrigin(jsonParse(data.newValue))
      break;
    case 'UPDATE_ROWS':
      elements.value[data.target].setRows(jsonParse(data.newValue))
      break;
    case 'UPDATE_VISIBLE':
      isRenderer.value = e.data.data
      break
    case 'UPDATE_ACTION':
      changeAction(data.target, data.action)
      break
  }
})

onUpdated(() => {
  nextTick(() => {
    if (isChanged) console.timeEnd('mounted')
    isChanged = false
    window.parent.postMessage({
      command: 'LOAD_COMPLETE'
    }, '*')
  })
})

const layerID = ref('')
provide('layerID', layerID)
const isRenderer = ref(false)
provide('renderer', isRenderer)
const elements = ref({})
provide('elements', elements.value)
provide('hooks', {
  before (evtName, params) {
    if (evtName.toLocaleLowerCase().indexOf(`click`) != -1) {
      throttle(window.parent.postMessage, 100)({
        command: 'SELECT_LAYER',
        __id: this.computedID.value
      }, '*')
    }
    hook(this, evtName, params, elements.value)
    return evtName.toLocaleLowerCase().indexOf(`click`) == -1
  }
})

let timer = null;
function throttle (fn, wait) {
  return function () {
    let context = this;
    let args = arguments;
    if (timer) {
      return
    }

    timer = setTimeout(function() {
      timer = null;
    }, wait)

    fn.apply(context, args);
  }
}

function loadCss(path, files){
  if(!path || path.length === 0){
    throw new Error('argument "path" is required !');
  }
  for (let file of files) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = 'file://' + path + '/public/css/' + file;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head.appendChild(link);
  }
}
</script>

<style>
html, body, .swiper-container {
  height: 100%;
  margin: 0
}

* {
  box-sizing: border-box;
  outline: 0;
}

#app {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}

.layer_selected {
  border: #ff0000 solid 1px!important;
}
</style>