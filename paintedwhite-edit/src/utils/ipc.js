import { generate } from 'shortid'
import mitt from '@/utils/mitt'
const beautify = require('js-beautify').js
const { path, ipcRenderer } = window

const coverPath = (__dir) => {
  let paths = __dir.split('/')
  let dirPath = paths.slice(0, -1).join('/') + '/'
  let name = paths[paths.length - 1]
  let ext = path.extname(name)
  return { paths, dirPath, name, ext }
}

export const installIPC = (store, { pages, config, filePath, fileName }) => {
  ipcRenderer.on('CREATE_PROJECT', (e, m) => {
    store.dispatch('OPEN_PROJECT', m)
    store.dispatch('SAVE_PROJECT')
  })
  ipcRenderer.on('OPEN_PROJECT', (e, m) => {
    let { dirPath, name, ext } = coverPath(m)
    filePath.value = dirPath
    fileName.value = name
    if (ext === '.egt') {
      fileName.value = name.replace(ext, '')
    }
  })
  ipcRenderer.on('OPEN_PROJECT_DIRECTORY', (e, dirPath) => {
    config.value.path = dirPath
  })
  ipcRenderer.on('OPEN_CSS', (e, m) => {
    mitt.emit('load_css', m)
  })
  ipcRenderer.on('SAVE_PROJECT', (e, m) => {
    let files = []
    files.push({
      file: path.join(filePath.value, fileName.value + '.egt'),
      data: beautify(
        JSON.stringify(config.value),
        {
          indent_size: 2,
          space_in_empty_paren: true
        }
      )
    })
    pages.value.forEach((page) => {
      mitt.emit(page.__id, false)
      files.push({
        file: filePath.value + config.value.pages[page.__id].name,
        data: beautify(
          JSON.stringify(page),
          {
            indent_size: 2,
            space_in_empty_paren: true
          }
        )
      })
    })
    ipcRenderer.send('WRITE_FILE', files)
  })
  ipcRenderer.on('PAGE_SELECT', (e, {filename}) => {
    let files = filename.split('/')
    let filePath = files.slice(0, -1).join('/') + '/'
    let fileName = files[files.length - 1]
    let extName = path.extname(fileName)
    if (extName === '.json') {
      fileName = fileName.replace(extName, '')
    }
    store.dispatch('CREATE_PAGE', {fileName, filePath})
  })
  ipcRenderer.on('OPEN_PAGES', (e, options) => {
    options.forEach(({ name, data }) => {
      let page = JSON.parse(data)
      
      if (!page.__id) {
        page.__id = generate()
      }

      config.value.pages[page.__id] = {
        name
      }
      pages.value.push(page)
    })
  })
  ipcRenderer.on('ADD_PAGE', (e, { name, data }) => {
    let page = JSON.parse(data)
    
    if (!page.__id) {
      page.__id = generate()
    }

    config.value.pages[page.__id] = {
      name
    }
    pages.value.push(page)

    let files = []
    files.push({
      file: path.join(filePath.value, fileName.value + '.egt'),
      data: beautify(
        JSON.stringify(config.value),
        {
          indent_size: 2,
          space_in_empty_paren: true
        }
      )
    })
    ipcRenderer.send('WRITE_FILE', files)
  })
  ipcRenderer.on('OPEN_PAGE', (e, { file, data }) => {
    let page = JSON.parse(data)
    let { name, ext } = coverPath(file)

    if (ext === '.json') {
      name = name.replace(ext, '')
    }
    
    if (!page.__id) {
      page.__id = generate()
    }

    config.value.pages[page.__id] = {
      name: name + '.json'
    }
    pages.value.push(page)
  })
  ipcRenderer.on('COPY_PAGE', (e, {filename, page}) => {
    let files = filename.split('/')
    let fileName = files[files.length - 1]
    let extName = path.extname(fileName)
    if (extName === '.json') {
      fileName = fileName.replace(extName, '')
    }
    store.dispatch('COPY_PAGE', {fileName, page})
  })
  ipcRenderer.on('IMPORT_SKETCH', async (e, m) => {
    if (this.path) {
      store.dispatch('IMPORT_SKETCH', {
        root: this.path,
        file: m
      })
    }
  })
  ipcRenderer.on('IMPORT_PS', async (e, m) => {
    if (this.path) {
      store.dispatch('IMPORT_PS', {
        root: this.path,
        file: m
      })
    }
  })
  ipcRenderer.on('EXPORT_WEEX', (e, m) => {
    eWeex.build(this.pages, m)
  })
  ipcRenderer.on('EXPORT_VUE', (e, m) => {
    eVue.build(this.pages, m)
  })
  ipcRenderer.on('EXPORT_MINI', (e, m) => {
    eMiniApp.build(this.pages, m)
  })
}