/**
 * 页面配置，请在 config.js 中加入pages
 * Loading
 */
var Loading = {
  url: "configs/loading.json", // 视图数据地址
  path: "/", // 用于router
  name: "Loading", // 页面名称，用于函数调用
  meta: {
    title: "Loading", // 页面名称，用于浏览器名称
    depth: 0, // 页面层级
  },
  methods: {
    ready_Loading() { 

      // 页面已渲染完成
      logger.log(logger.APP, 'ready_Loading')
      // 隐藏元素
      this.$worker().dom('loading').hide()

      this.$router.push('/home')

      // this.$worker().wx().config()
      // this.$worker().dialog().confirm({
      //   text: this.$locale({i: `oauth.wechat`}),
      //   opts: [
      //     {
      //       txt: this.$locale({i: `oauth.next`}),
      //       color: 'red',
      //       stay: false,
      //       callback: () => {
      //         this.$router.push('/home')
      //       }
      //     },
      //     {
      //       txt: this.$locale({i: `oauth.stay`}),
      //       stay: false,
      //       callback: () => {
      //         // console.log(this.$locale({i: `oauth.stay`}))
      //       }
      //     }
      //   ]
      // })

    }
  }
}