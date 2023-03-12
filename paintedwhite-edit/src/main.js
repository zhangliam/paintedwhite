import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import Vant from 'vant';
import ElementPlus from 'element-plus'
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


process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
const app = createApp(App)
app.use(router).use(Vant).use(ElementPlus).mount('#app')
