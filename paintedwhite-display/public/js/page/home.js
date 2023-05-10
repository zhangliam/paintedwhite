/**
 * 页面配置，请在 config.js 中加入pages
 * home
 */

let _self = null;
let _lastElements;

var Home = {
  url: 'configs/home.json', // 视图数据地址
  path: '/home', // 用于router
  name: 'home', // 页面名称，用于函数调用
  meta: {
    title: 'Home', // 页面名称，用于浏览器名称
    depth: 1, // 页面层级
    tabbar: true // 显示tabbar
  },
  methods: {
    ready_Home (c) { // 页面已渲染完成

      _self = this;
      
      // console.log(_self.elements)
      logger.log(logger.APP, 'ready_Home')

      window.addEventListener('message', (e) => {

        const data = e.data.data && JSON.parse(e.data.data)

        switch (e.data.command) {

          // case 'LOAD_CSS':
          //   loadCss(e.data.path, e.data.files)
          //   break;

          // case 'CHANGE_PAGE':
          //   console.time('mounted')
          //   isChanged = true
          //   layerID.value = ''
          //   Object.keys(elements.value).forEach(el => {
          //     delete elements.value[el]
          //   })
          //   dataSource.value = JSON.parse(e.data.page)
          //   break;

          case 'SELECT_LAYER':
          let { layer } = e.data;
          // console.log(_self.elements[layer].$el)
            if(_lastElements) {
              _lastElements.classList.remove('layer_selected');
              _lastElements = null;
            }
            _lastElements = _self.elements[layer].$el;
            _self.elements[layer].$el.classList.add('layer_selected');
            break;

          case 'UPDATE_PROP':
            if (data.prop.startsWith('style.')) {
              _self.elements[data.target].setStyle({
                [data.prop.replace('style.', '')]: data.newValue
              })
            } else if (data.prop.startsWith('config.')) {
              _self.elements[data.target].setConfig({
                [data.prop.replace('config.', '')]: data.newValue
              })
            } else {
             _self.elements[data.target].setItem({
                [data.prop]: data.newValue
              })
            }
            break;

          // case 'UPDATE_STATUS':
          //   elements.value[data.target].setStatus(JSON.parse(data.newValue))
          //   break;

          // case 'UPDATE_ORIGIN':
          //   elements.value[data.target].setOrigin(JSON.parse(data.newValue))
          //   break;

          // case 'UPDATE_ROWS':
          //   elements.value[data.target].setRows(JSON.parse(data.newValue))
          //   break;

          case 'UPDATE_VISIBLE':
            _self.elements[data.layer].setVisible(data.invisible)
            break;

          // case 'UPDATE_ACTION':
          //   changeAction(data.target, data.action)
          //   break;

        }

      })


    
    },

    itemClicked_table(c) {
      console.log(c)
    },

  }
}




