import Vue from 'vue'
import confirm from './confirm.vue'
import localize from '@/localize'

const ConfirmConstructor = Vue.extend(confirm)

const instance = new ConfirmConstructor({
  el: document.createElement('div'),
  localize
})

const hashChange = function () {
  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)
}

ConfirmConstructor.prototype.closeConfirm = function (stay, callback) {
  let stopClose = true
  if(typeof callback === 'function') {
      stopClose = callback()
      if(stopClose === undefined) stopClose = true
  }
  if(!stopClose || stay) return
  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)
  window.removeEventListener("hashchange", hashChange)
}

const Confirm = (options = {}) => {
  instance.text = options.text || ''
  instance.title = options.title || '提示'
  instance.opts = options.opts
  window.addEventListener("hashchange", hashChange)
  document.body.appendChild(instance.$el)
}

export default Confirm
