import { DEFAULT_STATUS } from '../../constant/keys'

const state = {
  page: null,
  pageStatus: new Map(),
  layer: null,
  layerStatus: new Map(),
}

const getters = {
  page: state => state.page,
  statusOfPage: (state) => (page) => {
    return state.pageStatus.get(page)
  },
  layer: state => state.layer,
  statusOfLayer: (state) => (layer) => {
    if (!state.layerStatus.get(layer)) {
      state.layerStatus.set(layer, DEFAULT_STATUS)
    }
    return state.layerStatus.get(layer)
  },
}

const mutations = {
  SET_PAGE (state, page) {
    state.page = page
    // if (!state.pageStatus.get(page)) {
    //   state.pageStatus.set(page, DEFAULT_STATUS)
    // }
  },
  SET_PAGE_TITLE (_, {page, name}) {
    page.name = name
  },
  SET_LAYER (state, layer) {
    state.layer = layer
  },
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
