const state = {
  loaded: 0,
  loaders: [],
  loadeds: []
}

const getters = {
  ready: state => state.ready,
  loaded: state => state.loaded,
  total: state => state.loaders.length
}

const mutations = {
  CLEAR_LOADERS (state) {
    state.loaders = []
  },
  REGIST_LOADER (state, loader) {
    state.loaders.push(loader)
  },
  LOADER_COMPLETE (state, loader) {
    state.loaded += 1
    state.loadeds.push(loader)
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
