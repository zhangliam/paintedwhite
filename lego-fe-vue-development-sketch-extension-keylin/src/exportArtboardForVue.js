// import regeneratorRuntime, { async } from './runtime'
import JSONWriter from './JSONArtBoardWriter'
import sketch from 'sketch'
import fs from "@skpm/fs"

export default async function() {
  const absoluteString = context.document.fileURL().absoluteString().split('/')
  let rootString = '/' + absoluteString.slice(3, -1).join('/') + '/dist/vue/'
  const document = context.document
  const currentPage = document.currentPage()
  if (currentPage) {
    sketch.UI.message('Please Waiting')
    const artborads = document.selectedLayers()
    const pName = currentPage.name()
    rootString += pName + '/'
    if (!fs.existsSync(rootString)) {
      fs.mkdirSync(rootString)
    }
    if (artborads.containedLayersCount()) {
      artborads.layers().forEach((nArtboard) => {
        let jsonWriter = new JSONWriter(nArtboard, rootString)
        let page = jsonWriter.write()
        let aName = nArtboard.name()
        if (!fs.existsSync(rootString + aName)) {
          fs.mkdirSync(rootString + aName)
        }
        writeApp(page, rootString + aName)
      })
      sketch.UI.message('Export Complete')
    } else {
      sketch.UI.message('Please Select One Artboard')
    }
  } else {
    sketch.UI.message('Please Select One Page')
  }
}

function writeApp(page, rootString) {
  let template = `<template>
  <div class="app">`
  let script = `
<script>`
  let style = `
<style scoped>`
  let index = 1
  let components = []
  let styles =[]
  page.layers.forEach(layer => {
    if (layer.name) {
      components.push(layer.name)
      writeVue(layer, rootString)
      template += `
    <${layer.name}></${layer.name}>`
      script += `
import ${layer.name} from './components/${layer.name}.vue'`
    } else {
      template += `${writeTag(layer, styles, index++)}
    `
    }
  })
  template += `
  </div>
</template>
`
  script += `

export default {
  name: 'App',
  components: {
    `
  script += components.join(`,
    `)
  script += `
  }
}
</script>
`
style += `
.app
{`
  for (let key in page.style) {
    style += `
  ${key}: ${page.style[key]};`
  }
  style += `
}`
  style += styles.join(`
`)
  style +=`
</style>
`
  fs.writeFileSync(rootString + '/App.vue', template + script + style)
}

function writeVue(container, rootString, parentString) {
  if (!fs.existsSync(rootString + '/components/' + (parentString ? parentString + '/' : ''))) {
    fs.mkdirSync(rootString + '/components/' + (parentString ? parentString + '/' : ''))
  }
  let template = `<template>
  <div class="${container.name}">`
  let script = `
<script>`
  let style = `
<style scoped>`
  let index = 1
  let components = []
  let styles = []
  container.value.forEach(layer => {
    if (layer.name) {
      components.push(layer.name)
      writeVue(layer, rootString, (parentString ? parentString + '/' : '') + container.name)
      template += `
    <${layer.name}></${layer.name}>`
      script += `
import ${layer.name} from '@/components/${(parentString ? parentString + '/' : '') + container.name}/${layer.name}.vue'`
    } else {
      template += `
    ${writeTag(layer, styles, index++)}`
    }
  })
  template += `
  </div>
</template>
`
  script += `

export default {
  name: '${container.name}',
  components: {
    `
  script += components.join(`,
    `)
  script += `
  }
}
</script>
`
  style += `
.${container.name}
{`
  for (let key in container.style) {
    style += `
  ${key}: ${container.style[key]};`
  }
  style += `
}`

  style += styles.join(`
`)
  style +=`
</style>
`
  fs.writeFileSync(rootString + '/components/' + (parentString ? parentString + '/' : '') + container.name + '.vue', template + script + style)
}

function writeTag(layer, styles, index) {
  let style = `
.style${index}
{`
  for (let key in layer.style) {
    style += `
  ${key}: ${layer.style[key]};`
  }
  style += `
}`
  styles.push(style)
  switch (layer.type) {
    case 'image':
      return `<img class="style${index}" src="${layer.value.replace('{directory}files', '@')}" />`
    case 'text':
      return `<div class="style${index}">${layer.value}</div>`
    case 'div':
      let result = `<${layer.type} class="style${index}">`
      let sIndex = 1
      if (layer.value) {
        layer.value.forEach(sub => {
          result += `
      ${writeTag(sub, styles, index + '_' + (sIndex++))}`
        })
      }
      result += `</${layer.type}>`
      return result
    default:
      return `<${layer.type} class="style${index}" value="${style.value}"></${layer.type}>`
  }
}