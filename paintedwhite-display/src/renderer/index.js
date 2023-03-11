import Base from './base/index'
import Brand from './brand/index'
import Platform from './platform/index'

const components = {
  Base,
  Brand,
  Platform
}

function install (Vue) {
  Object.keys(components).forEach((key) => {
    Vue.use(components[key])
  })
}

const version = '__VERSION__'
if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export {
  version,
  Base,
  Brand,
  Platform,
  install
}

export default {
  version,
  install,
  ...components
}
