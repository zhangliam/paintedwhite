import Vue from 'vue'
import logger from './logger'
import api from './api'

export default {
  analytic: window.config ? window.config.analytic : false,
  uploadAnalytic: window.config ? window.config.uploadAnalytic : false,
  trigger (target, event, data) {
    if (typeof this.analytic == 'function') {
      this.analytic(target, event, data)
    }
    logger.log(logger.ANALYSIS, target, event, data)
    if (this.uploadAnalytic === true) {
      let _id = Vue.$cookies.get('la')
      Vue.http.get(`/analytics/api/${_id}?e=${target}/${event}${data ? ( '/' + data ) : ''}&t=${api.UUID}`).then().catch()
    }
    //TODO GA
  }
}