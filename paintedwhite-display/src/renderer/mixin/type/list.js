/**
 * @class List
 * 列表
 */
export default {
  name: 'list',
  data () {
    return {
      rows: [],
      rowStatusField: 'status'
    }
  },
  methods: {
    initialize () {
      if (this.computedConfig.rowStatusField) {
        this.rowStatusField = this.computedConfig.rowStatusField
      }
    },
    /**
     * 设置组件列表
     *
     * @param {array} arr
     * @public
     */
    setRows (array) {
      this.rows = array
    },
    /**
     * 添加组件列表
     *
     * @param {array} arr
     * @public
     */
    appendRows (array) {
      this.rows = this.rows.concat(array)
    },
    /**
     * 添加列状态域
     *
     * @param {array} arr
     * @public
     */
    setRowStatusField (status) {
      this.rowStatusField = status
    }
  }
}
