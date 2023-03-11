import Vue from 'vue'
import toast from './toast.vue'
import localize from '@/localize'

const ToastConstructor = Vue.extend(toast)

const instance = new ToastConstructor({
  el: document.createElement('div'),
  localize
})

ToastConstructor.prototype.closeToast = function () {
  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)

  typeof instance.callback === 'function' && instance.callback()
}

const Toast = (options = {}) => {
  instance.text = options.text
  instance.icon = options.icon
  instance.timeout = ~~options.timeout || 2000
  instance.callback = options.callback

  document.body.appendChild(instance.$el)

  const timer = setTimeout(() => {
    clearTimeout(timer)
    instance.closeToast()
  }, instance.timeout + 100)
}

export default Toast