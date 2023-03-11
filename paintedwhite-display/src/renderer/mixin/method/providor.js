import {mapGetters} from 'vuex'

/**
 * @class Providor
 * 组件未创建或者已销毁时，存储组件数据。
 * 避免重复赋值
 */
export default {
  name: 'providor',
  computed: {
    ...mapGetters({
      'ptracker': 'ptracker',
      'providors': 'providors'
    }),
    providor () {
      let name = this.item.name || this.item.__id
      return this.$store.getters.providor(name, this.ptracker)
    }
  },
  mounted () {
    this.initializeProvidor()
  },
  methods: {
    initializeProvidor () {
      if (this.$store && this.providor) {
        for (let key in this.$data) {
          this.getProvidor(key)
        }
      }
    },
    updateProvidor (field, value) {
      if (this.$store) {
        this.$store.commit('UPDATE_PROVIDOR', {
          selector: this.item.name || this.item.__id,
          field,
          value
        })
      }
      this.$data[field] = value
    },
    getProvidor (field) {
      if (this.providor[field]) {
        this[field] = this.providor[field]
      }
    }
  }
}
