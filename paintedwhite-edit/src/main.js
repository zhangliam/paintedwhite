import { createApp } from 'vue'
import App from './App.vue'
import { router, routes }  from './router'
import Vant from 'vant';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './public-path'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// import { TroisJSVuePlugin } from '@ergat3/troisjs'

/*
  tool工具中electron文件夹中copy暂未知作用
*/
// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync');
// const adapter = new FileSync('./db.json')
// const db = low(adapter)
// db.defaults({
//   origin: [],
//   row: [],
//   status: [],
//   editable: []
// }).write()
// window.db = db

// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
// const app = createApp(App)
// app.use(router).use(Vant).use(ElementPlus).mount('#app')


let routerForQk = null;
let instance = null;
function render(props = {}) {
  const { container, mode = 'history', routerBase } = props;

  console.log('当前子应用(v3)接受父应用数据：', props)

  routerForQk = createRouter({
    history: (mode === 'history' ? createWebHistory : createWebHashHistory)( process.env.VUE_APP_ENV === 'DEVELOP' ? '' : '/indep/tenant/wxtb-model/view/'),
    routes
  })

  instance = createApp(App)
  instance
    .use(routerForQk)
    .use(Vant)
    .use(ElementPlus)
    .mount(container ? container.querySelector("#app") : '#app');
    
  instance.provide("$super", {
    ...props,
    isQianKun: window.__POWERED_BY_QIANKUN__
  });
}

// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('bootstrap');
}
export async function mount(props) {
  console.log('mounted', props);
  render(props);
}
export async function unmount() {
  console.log('unmounted');
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  routerForQk = null;
}

