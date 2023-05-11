import page from '@/renderer/mixin/type/page'

export default {
  name: 'router.page',
  mixins: [page],
  props: ['methods', 'url'],
  inject: ['htmlElement'],
  computed: {
    root () {
      return this.htmlElement()
    }
  },
  data () {
    return {
      eventListeners: this.methods,
      file: this.url
    }
  },
  watch: {
    url (val) {
      this.file = val
    }
  },
  beforeCreate () {
   
  },
  methods: {}
}