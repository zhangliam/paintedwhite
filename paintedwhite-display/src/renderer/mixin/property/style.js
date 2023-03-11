import utils from '@/assets/js/utils'

/**
 * @class style
 * style
 */
export default {
  name: 'style',
  data () {
    return {
      style: {}
    }
  },
  computed: {
    computedStyle () {
      let { style } = this.item
      let statusStyle
      if (style) {
        statusStyle = style[this.status]
      }
      let newStyle = Object.assign({}, this.computedNormalStyle, statusStyle)
      return utils.px2rem(Object.assign(newStyle, this.style))
    },
    computedNormalStyle () {
      let { style, status } = this.item
      if (style && style.normal) {
        return style.normal
      }
      let newStyle = Object.assign({}, style)
      if (status) {
        for (let key of status) {
          delete newStyle[key]
        }
      }
      return newStyle
    }
  },
  methods: {
    /**
     * 设置组件display
     *
     * @param {boolean} display
     * @public
     */
    setDisplay (display) {
      if (display) {
        delete this.style.display
      } else {
        this.insertOrUpdateData(this.style, { display: 'none' })
      }
    },
  }
}
