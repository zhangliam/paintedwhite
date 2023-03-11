const state = {
  fullScreen: false,
  offSet: {
    scrollLeft: 0,
    scrollTop: 0,
    width: 1280,
    height: 800
  }
}

const getters = {
  fullScreen: state => state.fullScreen,
  offSet: state => state.offSet
}

const mutations = {
  TRIGGER_FULLSCREEN (state) {
    state.fullScreen = !state.fullScreen
  },
  RESET_FULLSCREEN (state) {
    state.fullScreen = false
  },
  SET_OFFSET (state, {scrollLeft, scrollTop, width, height}) {
    if (scrollLeft) {
      state.offSet.scrollLeft = scrollLeft
    }
    if (scrollTop) {
      state.offSet.scrollTop = scrollTop
    }
    if (width) {
      state.offSet.width = width
    }
    if (height) {
      state.offSet.height = height
    }
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
