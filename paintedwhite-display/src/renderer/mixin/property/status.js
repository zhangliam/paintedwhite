/**
 * @class status
 * status
 */
 export default {
  name: 'status',
  props: {},
  data () {
    return {
      status: 'normal'
    }
  },
  computed: {},
  watch: {},
  mounted () {
    let { status } = this.item
    this.setStatus(status && status.length ? status[0] : 'normal')
  },
  methods: {
    /**
     * 切换容器组件的当前状态
     *
     * @param {string} status
     * @public
     */
    setStatus (status) {
      if (this.status !== status) {
        this.children = []
      }
      this.status = status
    },
  }
}
