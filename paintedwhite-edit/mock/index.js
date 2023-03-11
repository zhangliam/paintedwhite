import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';
import ElementPlus from 'element-plus'
import { TroisJSVuePlugin } from '@ergat3/troisjs'

import { proxy as VantProxy } from '@ergat3/proxy-vant'
import { proxy as ElementPlusProxy } from '@ergat3/proxy-element-plus'
import { proxy as TroisjsProxy } from '@ergat3/proxy-troisjs'

import components, { installProxy } from '@ergat3/core'

import 'element-plus/dist/index.css'
import 'vant/lib/index.css';

let maps = {}
let emits = []
let proxies = [VantProxy, ElementPlusProxy, TroisjsProxy]
proxies.forEach((c) => {
  let {map, emit} = c
  Object.assign(maps, map)
  emits = emits.concat(emit)
})
let Proxy = installProxy(maps, emits)
const app = createApp(App)
components.install(app)
app.component(Proxy.name, Proxy)
app.use(Vant).use(ElementPlus).use(TroisJSVuePlugin).mount('#app')
