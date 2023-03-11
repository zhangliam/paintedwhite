const { path, ipcRenderer } = window
const state = {
  directory: '',
  path: '',
  file: '',
  config: {},
  pages: [],
}

const getters = {}

const mutations = {
  OPEN_PROJECT (state, {filePath, fileName}) {
    if (!state.directory) {
      state.directory = 'file://' + filePath.replace('configs/', '')
    }
    state.path = filePath
    state.file = fileName
  },
  PUSH_PAGE (state, {key, name, page}) {
    state.config[key] = {
      name,
      edited: false
    }
    state.pages.push(page)
    // ipcRenderer.send('WRITE_FILE', {
    //   file: state.path + name,
    //   data: beautify(
    //     JSON.stringify(page),
    //     {
    //       indent_size: 2,
    //       space_in_empty_paren: true
    //     }
    //   )
    // })
  },
  SET_ID (state, __id) {
    state.__id = __id
  },
}

const actions = {
  OPEN_PROJECT ({commit}, m) {
    let files = m.split('/')
    let filePath = files.slice(0, -1).join('/') + '/'
    let fileName = files[files.length - 1]
    let extName = path.extname(fileName)
    if (extName === '.egt') {
      fileName = fileName.replace(extName, '')
    }
    commit('OPEN_PROJECT', {filePath, fileName})
  },
  SET_PAGE ({commit}, page) {
    commit('SET_PAGE', page)
    // commit('SET_LAYER', null)
    // commit('SET_ID', page.__id)
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
