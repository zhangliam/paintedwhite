/**
 * 存放组件数据
 * 在v-if的场景中，组件可能还未创建或者已经销货，
 */
const state = {
  page: '',
  data: {},
  ptracker: 0
}

const getters = {
  providor: (state) => (name) => {
    return state.data[state.page][name]
  },
  providors: (state) => Object.keys(state.data),
  ptracker: state => state.ptracker
}

const mutations = {
  INIT_PROVIDOR (state, page) {
    state.page = page
    if (!state.data[page]) {
      state.data[page] = {}
    }
  },
  UPDATE_PROVIDOR(state, {selector, field, value}) {
    let providors = state.data[state.page]
    if (!providors[selector]) {
      providors[selector] = {}
    }
    providors[selector][field] = value
    state.ptracker++
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
