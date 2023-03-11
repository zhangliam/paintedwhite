import Vue from 'vue'
import notify from './notify.vue'
import localize from '@/localize'

const NotifyConstructor = Vue.extend(notify)

const instance = new NotifyConstructor({
  el: document.createElement('div'),
  localize
})

let timer = null
let lock = false

NotifyConstructor.prototype.closeNotify = function () {
  instance.classes = 'notify-out'

  setTimeout(() => {
    const el = instance.$el
    el.parentNode && el.parentNode.removeChild(el)
    lock = false
  }, 150)

  typeof instance.callback === 'function' && instance.callback()
}

const Notify = (options = {}) => {
  instance.classes = ''
  instance.text = options.text
  instance.timeout = ~~options.timeout || 5000
  instance.callback = options.callback

  if (lock)return
  lock = true

  document.body.appendChild(instance.$el)

  instance.$el.addEventListener('click', () => {
    clearTimeout(timer)
    instance.closeNotify()
  })

  timer = setTimeout(() => {
    clearTimeout(timer)
    instance.closeNotify()
  }, instance.timeout)
}

export default Notify