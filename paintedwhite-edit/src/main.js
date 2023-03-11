import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import Vant from 'vant';
import ElementPlus from 'element-plus'
// import { TroisJSVuePlugin } from '@ergat3/troisjs'



process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
const app = createApp(App)
app.use(router).use(Vant).use(ElementPlus).mount('#app')
