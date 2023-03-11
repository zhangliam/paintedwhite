// import regeneratorRuntime from './runtime'
import WXWriter from './WXArtBoardWriter'
import sketch from 'sketch'
import fs from "@skpm/fs"
import { makeDir } from './utils'
const js_beautify = require('js-beautify')

export default async function () {
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
            let aName = decodeURIComponent(nArtboard.name())
            if (fs.existsSync(rootString + aName)) fs.rmdirSync(rootString + aName)
            makeDir(rootString + aName)
            makeDir(rootString + aName + "/wx")
            let wxWriter = new WXWriter(nArtboard, rootString, offsetY)
            let page = await wxWriter.write()
            console.log('%c [ ----------------解析结束-------------- ]')
            fs.writeFileSync(rootString + aName + '/page.json', js_beautify(JSON.stringify(page.json), { indent_size: 2, space_in_empty_paren: true }))
            fs.writeFileSync(rootString + aName + '/wx/index.wxml', page.wxContent)
            fs.writeFileSync(rootString + aName + '/wx/index.js', page.wxJs)
            fs.writeFileSync(rootString + aName + '/wx/index.json', page.wxJson)
            fs.writeFileSync(rootString + aName + '/wx/index.wxss', page.wxss)
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