import Vue from 'vue'
import policy from './policy.vue'
import localize from '@/localize'

const PolicyConstructor = Vue.extend(policy)

const instance = new PolicyConstructor({
  el: document.createElement('div'),
  localize
})

const hashChange = function () {
  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)
}

PolicyConstructor.prototype.closePolicy = function () {
  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)

  window.removeEventListener("hashchange", hashChange)

  typeof instance.callback === 'function' && instance.callback()
}

const Policy = (options = {}) => {
  instance.title = options.title
  instance.text = options.text
  instance.callback = options.callback

  window.addEventListener("hashchange", hashChange)

  document.body.appendChild(instance.$el)
}

export default Policy
