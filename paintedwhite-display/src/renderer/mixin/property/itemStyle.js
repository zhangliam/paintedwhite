import utils from '@/assets/js/utils'

/**
 * @class itemStyle
 * itemStyle
 */
export default {
  name: 'itemStyle',
  data () {
    return {
      itemStyle: {}
    }
  },
  computed: {
    computedItemStyle () {
      let { itemStyle } = this.item
      let statusitemStyle
      if (itemStyle) {
        statusitemStyle = itemStyle[this.status]
      }
      let newitemStyle = Object.assign({}, this.computedNormalItemStyle, statusitemStyle)
      return utils.px2rem(Object.assign(newitemStyle, this.itemStyle))
    },
    computedNormalItemStyle () {
      let { itemStyle, status } = this.item
      if (itemStyle && itemStyle.normal) {
        return itemStyle.normal
      }
      let newitemStyle = Object.assign({}, itemStyle)
      if (status) {
        for (let key of status) {
          delete newitemStyle[key]
        }
      }
      return newitemStyle
    }
  },
  methods: {}
}
