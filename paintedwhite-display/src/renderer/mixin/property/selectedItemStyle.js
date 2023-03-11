import utils from '@/assets/js/utils'

/**
 * @class selectedItemStyle
 * selectedItemStyle
 */
export default {
  name: 'selectedItemStyle',
  data () {
    return {
      selectedItemStyle: {}
    }
  },
  computed: {
    computedSelectedItemStyle () {
      let { selectedItemStyle } = this.item
      let statusStyle
      if (selectedItemStyle) {
        statusStyle = selectedItemStyle[this.status]
      }
      let newStyle = Object.assign({}, this.computedNormalSelectedItemStyle, statusStyle)
      return utils.px2rem(Object.assign(newStyle, this.selectedItemStyle))
    },
    computedNormalSelectedItemStyle () {
      let { selectedItemStyle, status } = this.item
      if (selectedItemStyle && selectedItemStyle.normal) {
        return selectedItemStyle.normal
      }
      let newStyle = Object.assign({}, selectedItemStyle)
      if (status) {
        for (let key of status) {
          delete newStyle[key]
        }
      }
      return newStyle
    }
  },
  methods: {}
}
