// import regeneratorRuntime from './runtime'
import JSONWriter from './JSONPageWriter'
import sketch from 'sketch'
import fs from "@skpm/fs"
import { makeDir } from './utils'
const js_beautify = require('js-beautify')

export default async function() {
  const absoluteString = context.document.fileURL().absoluteString().split('/')
  const rootString = decodeURIComponent('/' + absoluteString.slice(3, -1).join('/') + '/dist/ergate/')
  const document = context.document
  const currentPage = document.currentPage()
  if (currentPage) {
    sketch.UI.message('Please Waiting')
    let jsonWriter = new JSONWriter(currentPage, rootString)
    let page = await jsonWriter.write()
    let pName = decodeURIComponent(currentPage.name())
    makeDir(rootString + pName)
    fs.writeFileSync(rootString + pName + '/page.json', js_beautify(JSON.stringify(page), { indent_size: 2, space_in_empty_paren: true }))
    sketch.UI.message('Export Complete')
  } else {
    sketch.UI.message('Please Select One Page')
  }
}
