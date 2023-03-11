// import regeneratorRuntime from './runtime'
import JSONWriter from './JSONArtBoardWriter'
import sketch from 'sketch'
import fs from "@skpm/fs"
import { makeDir } from './utils'
const js_beautify = require('js-beautify')

export default async function() {
  sketch.UI.getInputFromUser(
    "顶部偏移",
    {
      initialValue: '88',
    },
    (err, offsetY) => {
      if (err) {
        // most likely the user canceled the input
        return
      }

      const absoluteString = context.document.fileURL().absoluteString().split('/')
      let rootString = decodeURIComponent('/' + absoluteString.slice(3, -1).join('/') + '/dist/ergate/')
      const document = context.document
      const currentPage = document.currentPage()
      if (currentPage) {
        sketch.UI.message('Please Waiting')
        const artborads = document.selectedLayers()
        const pName = decodeURIComponent(currentPage.name())
        rootString += pName + '/'
        if (artborads.containedLayersCount()) {
          (artborads.layers ? artborads.layers() : artborads).forEach(async (nArtboard) => {
            let jsonWriter = new JSONWriter(nArtboard, rootString, offsetY)
            let page = await jsonWriter.write()
            let aName = decodeURIComponent(nArtboard.name())
            makeDir(rootString + aName)
            fs.writeFileSync(rootString + aName + '/page.json', js_beautify(JSON.stringify(page), { indent_size: 2, space_in_empty_paren: true }))
          })
          sketch.UI.message('Export Complete')
        } else {
          sketch.UI.message('Please Select One Artboard')
        }
      } else {
        sketch.UI.message('Please Select One Ppage')
      }
    }
  )
}