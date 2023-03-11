/**
 * @class include
 * include
 */
 export default {
  name: 'include',
  props: {
    /**
		 * 父组件当前状态
		 */
    statusParent: {
      type: String,
      default: 'normal'
    },
  },
  data () {
    return {}
  },
  computed: {
    computedActive () {
      let { include } = this.item
      let inNormal = include ? include.indexOf('normal') != -1 : false
      let ininclude = include ? include.indexOf(this.statusParent) !== -1 : false
      return !this.computedItem.hidden && (inNormal || ininclude)
    },
  },
  watch: {},
  methods: {
    /**
     * 设置组件visible
     *
     * @param {boolean} visible
     * @public
     */
    setVisible (visible) {
      this.insertOrUpdateData(this.options, { hidden: !visible })
    },
  }
}
