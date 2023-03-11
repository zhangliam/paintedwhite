// import regeneratorRuntime from './runtime'
import JSONWriter from './JSONPageWriter'
import sketch from 'sketch'
import fs from "@skpm/fs"

export default async function() {
  const absoluteString = context.document.fileURL().absoluteString().split('/')
  const rootString = '/' + absoluteString.slice(3, -1).join('/') + '/dist/vue/'
  const document = context.document
  const currentPage = document.currentPage()
  if (currentPage) {
    sketch.UI.message('Please Waiting')
    let jsonWriter = new JSONWriter(currentPage, rootString)
    let page = await jsonWriter.write()
    let pName = currentPage.name()
    writeApp(page, rootString + pName)
    sketch.UI.message('Export Complete')
  } else {
    sketch.UI.message('Please Select One Page')
  }
}

function writeApp(page, rootString) {
  if (!fs.existsSync(rootString)) {
    fs.mkdirSync(rootString)
  }
  let template = `<template>
  <div
    ref="element"
    bubble="true"
    :class="[page.class, 'wrapper']"
    :style="page.style"
    @viewappear="onAppear"
    @viewdisappear="onDisappear">`
  let script = `
<script>
import api from '@/assets/js/api.js'
import page from '@/components/display/page/index'`
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
import ${layer.name} from '@/page/${layer.name}.vue'`
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
  mixins: [page],
  components: {${components.join(`, `)}},
  data () {
    return {
      api,
      events: ${JSON.stringify(page.events)},
      animations: ${JSON.stringify(page.animations)}
    }
  }
}
</script>
`
style += `
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.hidden {
  width: 1px;
  height: 1px;
  position: absolute;
  top: 0;
  left: 0;
}

.app {`
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
  fs.writeFileSync(rootString + '/index.vue', template + script + style)
}

function writeVue(container, rootString, parentString) {
  if (!fs.existsSync(rootString + '/page/' + (parentString ? parentString + '/' : ''))) {
    fs.mkdirSync(rootString + '/page/' + (parentString ? parentString + '/' : ''))
  }
  let template = `<template>
  <div class="${container.name}">`
  let script = `
<script>
import api from '@/assets/js/api.js'
import container from '@/components/display/container.js'`
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
import ${layer.name} from '@/page/${(parentString ? parentString + '/' : '') + container.name}/${layer.name}.vue'`
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
  mixins: [container],
  components: {${components.join(`, `)}},
  data () {
    return {
      api,
      events: ${JSON.stringify(container.events)},
      animations: ${JSON.stringify(container.animations)}
    }
  }
}
</script>
`
  style += `
.${container.name} {`
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
  fs.writeFileSync(rootString + '/page/' + (parentString ? parentString + '/' : '') + container.name + '.vue', template + script + style)
}

function writeTag(layer, styles, index) {
  let style = `
.style${index} {`
  for (let key in layer.style) {
    style += `
  ${key}: ${layer.style[key]};`
  }
  style += `
}`
  styles.push(style)
  switch (layer.type) {
    case 'image':
      return `<img class="style${index}" :src="${layer.value.replace('{directory}', 'api.RESOURCE_URL + \'')}'" />`
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