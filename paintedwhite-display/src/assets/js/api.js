import logger from './logger'
import performance from './performance'
import lifecycle from './lifecycle'
import utils from './utils'
import graphql from './http/graphql'
import Vue from 'vue'
import pagelifecycle from 'page-lifecycle';
import { v4 as uuidv4 } from 'uuid'

export default {
  ROOT_URL: '',
  RESOURCE_URL: process.env.BASE_URL,
  HISTORY: [],
  UUID: '',
  start (level) {
    logger.LOG_LEVEL = level + (utils.isDebug('performance') ? '|PERFORMANCE' : '')
    logger.log(logger.FRAMEWORK_FUN, 'START')

    this.UUID = Math.random()

    let docEl = document.documentElement;
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    let recalc = () => {
      var clientWidth = docEl.clientWidth
      var scale = clientWidth / 375
      if (!clientWidth) return
      if (clientWidth >= 750) {
        utils.remUnit = 100 / scale
        docEl.style.fontSize = '100px'
      } else {
        utils.remUnit = (100 * (clientWidth / 750)) / scale
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
      }
    }
    if (!document.addEventListener) return
    window.addEventListener(resizeEvt, recalc, false)
    document.addEventListener('DOMContentLoaded', recalc, false)
    recalc()

    if (document.readyState === 'complete') {
      document.body.style.fontSize = (12 / utils.remUnit) + 'rem';
    } else {
      document.addEventListener('DOMContentLoaded', function(e) {
        document.body.style.fontSize = (12 / utils.remUnit) + 'rem';
      }, false);
    }

    window.onpopstate = () => {
      if (utils.getQueryString('state')) {
        window.location.href = '/'
      }
    }

    pagelifecycle.addEventListener('statechange', (evt) => {
      lifecycle.changeState(evt)
    });

    if (utils.isDebug()) {
      utils.loadScript(process.env.BASE_URL + 'js/vconsole.min.js', false, () => {
        new window.VConsole()
      }, 'vconsole')
      
      performance.loadObserve()
    }
  },
  ready () {
    logger.log(logger.FRAMEWORK_FUN, 'READY')

    let _id = Vue.$cookies.get('la')
    if (!_id) {
      _id = uuidv4()
      Vue.$cookies.set('la', _id, "1y")
    }

    graphql.all()
  },
  apis () {
    return {}
  }
}