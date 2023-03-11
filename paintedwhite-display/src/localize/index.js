import Vue from 'vue'
import Localize from 'v-localize'

Vue.use(Localize)

export default Localize.config({
  debug: true,
  default: window.config ? window.config.locale : (navigator.language || navigator.userLanguage).toLowerCase(),
  available: ['en-us', 'zh-cn'],
  fallback: '?',
  localizations: window.localizations || {
    'en-us': {
      form: {}
    },
    'zh-cn': {
      form: {
        cancel: '',
        confirm: ''
      }
    }
  }
})
