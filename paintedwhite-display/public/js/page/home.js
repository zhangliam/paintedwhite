/**
 * 页面配置，请在 config.js 中加入pages
 * home
 */

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

      //logger.log(logger.APP, 'ready_Home')

    },

    itemClicked_table(c) {
      console.log(c)
    },

  }
}




