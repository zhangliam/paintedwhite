import { createStore, createLogger } from 'vuex'

const files = import.meta.globEager('./modules/*.js')
const modules = {}
for (const key in files) {
  if (key !== './index.js') modules[key.replace('modules/', '').replace(/(\.\/|\.js)/g, '')] = files[key].default
}

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []
// Plug in session storage based persistence
// plugins.push(createPersistedState({ storage: window.sessionStorage }))

export const store = createStore({
  plugins,
  modules
})
