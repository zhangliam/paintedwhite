/**
 * @class Receiver
 * 
 */
export default {
  name: 'receiver',
  data () {
    return {
      tracker: 0
    }
  },
  computed: {
    computedValue () {
      let value = this.value || this.computedItem.value
      if (this.computedItem.content) {
        let {type} = this.computedItem.content
        let tempContent = this.computedItem.content.value
        switch (type) {
          case 'number':
            value = JSON.parse(tempContent)
            break
          case 'array':
            value = JSON.parse(
              (!tempContent.startsWith('[')?'[':'') + 
              tempContent + 
              (!tempContent.endsWith(']')?']':''))
            break
          case 'string':
            value = this.computedItem.content.value
            break
        }
      }
      return this.parseExpression(value, this.tracker)
    }
  },
  methods: {
    doRefresh () {
      this.tracker ++
    }
  }
}
