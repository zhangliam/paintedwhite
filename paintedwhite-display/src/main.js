import router from '@/router'
import store from './store'
import localize from './localize'
import api from '@/assets/js/api'

import Vue from 'vue'
import axios from '@/assets/js/http/axios'
import VueCookies from 'vue-cookies'
import Worker from './worker'

if (process.env.NODE_ENV === 'development') {
  require('../mock')
}

api.start('APP|ERROR')

Vue.use(VueCookies)

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.router = router
Vue.prototype.$worker = Worker

/* eslint-disable no-new */
switch (process.env.VUE_APP_TYPE) {
  case 'ROUTER':
    new Vue({
      components: {
        App: resolve => {require(['./routerApp.vue'], resolve)}
      },
      localize,
      router,
      store,
      template: '<App/>'
    }).$mount('#app')
    break
  case 'SWIPER':
    new Vue({
      components: {
        App: resolve => {require(['./swiperApp.vue'], resolve)}
      },
      localize,
      store,
      template: '<App/>'
    }).$mount('#app')
    break
}
