window.config = {
  appName: 'LEGO FE Vue',
  locale: 'zh-cn',
  openScale: false,
  /**
   * 页面列表
   * 变量来自 js/page/*.js, 并需要在 index.html 中加载引用
   */
  pages: [
    Home,
    Loading, 
    Form,
  ],
  /**
   * swiper 设置
   */
  // swiper: {
  //   direction : 'horizontal',
  //   // allowTouchMove: false,
  //   width: document.documentElement.clientWidth,
  //   height: document.documentElement.clientHeight,
  //   pagination: {
  //     el: '.swiper-pagination'
  //   },
  // },
  /**
   * router navi 设置
   */
  navis: [
    /**
     * 菜单配置
     * Home
     */
    {
      name: 'HOME',
      path: '/',
      icon: {
        "normal": "/images/home_normal.svg",
        "active": "/images/home_active.svg"
      }
    },
    /**
     * 菜单配置
     * Form
     */
    {
      name: 'FORM',
      path: '/form',
      icon: {
        "normal": "/images/form_normal.svg",
        "active": "/images/form_active.svg"
      }
    }
  ],
  /**
   * 内置数据收集
   */
  openAnalytic: false,
  /**
   * 内置性能数据收集
   */
  //  openPerformace: true,
  /**
   * 数据收集函数
   */
  analytic: (target, event, data) => {
    logger.log(logger.APP, 'ga', target, event, data)
  }
}


