import Vue from 'vue'
import Router from 'vue-router'
import api from '@/assets/js/api'
import lifecycle from '@/assets/js/lifecycle'
import logger from '@/assets/js/logger'
import RouterPage from '@/renderer/routerpage'
import cloneDeep from 'lodash/cloneDeep'

Vue.use(Router)

let routes = []
for (let page of window.config ? window.config.pages : {}) {
  let component = Vue.component('router-' + page.name, Vue.extend(cloneDeep(RouterPage)))
  routes.push({
    path: page.path,
    name: page.name,
    meta: page.meta,
    component,
    props: () => {
      return {
        url: page.url,
        methods: page.methods
      }
    }
  })
}

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  logger.log(logger.VUE_ROUTER, 'beforeEach', to.meta)
  // TODO 替换成history.replaceState() 和 history.pushState()
  let len = api.HISTORY.length
  if (to.path != from.path) {
    if (len) {
      if (api.HISTORY[len - 1].path != to.path) {
        api.HISTORY.push(to)
      }
    } else {
      api.HISTORY.push(to)
    }
  } else {
    if (len) {
      api.HISTORY[len - 1] = to
    }
  }

  if (from.name) {
    lifecycle.outerPage()
  }

  if (to.meta && to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  next()
  lifecycle.enterPage(to)
})

export default router
