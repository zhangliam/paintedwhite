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
      let value = this.value || this.item.value
      if (this.item.content) {
        let {type} = this.item.content
        let tempContent = this.item.content.value
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
            value = this.item.content.value
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
