/**
 * 页面配置，请在 config.js 中加入pages
 * form
 */
var Form = {
  url: 'configs/form.json', // 视图数据地址
  path: '/form', // 用于router
  name: 'form', // 页面名称，用于函数调用
  meta: {
    title: 'Form', // 页面名称，用于浏览器名称
    depth: 2, // 页面层级
    tabbar: true // 显示tabbar
  },
  methods: {
    ready_Form (c) { // 页面已渲染完成
      this.$worker().dom('name').setItem({ value: 'aaaaaa' })
      this.$worker().dom('imagePopup').hide()
    },
    clicked_submit (c) {
      this.$worker().dom().querySelector('table').doCheck()
    },
    checked_form (c) {
      console.log(c)
    }
  }
}