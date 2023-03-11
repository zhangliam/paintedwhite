/**
 * @class child
 * child
 */
export default {
  name: 'child',
  data () {
    return {
      children: []
    }
  },
  computed: {
    computedComponents () {
      return this.item.components
    },
  },
  watch: {
    computedActive () {
      this.children = []
    }
  },
  methods: {}
}
