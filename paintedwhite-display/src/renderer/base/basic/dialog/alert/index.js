import Vue from 'vue'
import alert from './alert.vue'
import localize from '@/localize'

const AlertConstructor = Vue.extend(alert)

const instance = new AlertConstructor({
  el: document.createElement('div'),
  localize
})

const hashChange = function () {
  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)
}

AlertConstructor.prototype.closeAlert = function () {
  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)

  window.removeEventListener("hashchange", hashChange)

  typeof instance.callback === 'function' && instance.callback()
}

const Alert = (options = {}) => {
  instance.title = options.title
  instance.text = options.text
  instance.callback = options.callback

  window.addEventListener("hashchange", hashChange)

  document.body.appendChild(instance.$el)
}

export default Alert
