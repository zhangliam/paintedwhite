import Vue from 'vue'
import loading from './loading.vue'
import localize from '@/localize'

const LoadingConstructor = Vue.extend(loading)

const instance = new LoadingConstructor({
  el: document.createElement('div'),
  localize
})

LoadingConstructor.prototype.open = (title) => {
  instance.title = title || '正在加载'
  document.body.appendChild(instance.$el)
}

LoadingConstructor.prototype.update = (title) => {
  instance.title = title || '正在加载'
}

LoadingConstructor.prototype.close = function () {
  const el = instance.$el
  el.parentNode && el.parentNode.removeChild(el)
}

export default {
  open: instance.open,
  update: instance.update,
  close: instance.close
}