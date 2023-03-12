/**
 * 页面配置，请在 config.js 中加入pages
 * home
 */

let _self = null;

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
     

      this.$worker().dom('table').setRows([
        {
          label: 'Menu1'
        },
        {
          label: 'Menu2'
        },
        {
          label: 'Menu3'
        }
      ])
    },

    itemClicked_table(c) {
      console.log(c)
    },

  }
}


let lastElements

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
    //   dataSource.value = jsonParse(e.data.page)
    //   break;

    case 'SELECT_LAYER':
    let { layer } = e.data;
    console.log(_self.elements[layer].$el)
      if(lastElements) {
        lastElements.classList.remove('layer_selected');
        lastElements = null;
      }
      lastElements = _self.elements[layer].$el;
      _self.elements[layer].$el.classList.add('layer_selected');

      break;

    // case 'UPDATE_PROP':
    //   if (data.prop.startsWith('style.')) {
    //     elements.value[data.target].setStyle({
    //       [data.prop.replace('style.', '')]: jsonParse(data.newValue)
    //     })
    //   } else if (data.prop.startsWith('config.')) {
    //     elements.value[data.target].setConfig({
    //       [data.prop.replace('config.', '')]: jsonParse(data.newValue)
    //     })
    //   } else {
    //     console.log(data.newValue)
    //     elements.value[data.target].setItem({
    //       [data.prop]: jsonParse(data.newValue)
    //     })
    //   }
    //   break;

    // case 'UPDATE_STATUS':
    //   elements.value[data.target].setStatus(jsonParse(data.newValue))
    //   break;

    // case 'UPDATE_ORIGIN':
    //   elements.value[data.target].setOrigin(jsonParse(data.newValue))
    //   break;

    // case 'UPDATE_ROWS':
    //   elements.value[data.target].setRows(jsonParse(data.newValue))
    //   break;

    case 'UPDATE_VISIBLE':
      _self.elements[data.layer].setVisible(data.invisible)
      break;

    // case 'UPDATE_ACTION':
    //   changeAction(data.target, data.action)
    //   break;

  }

})