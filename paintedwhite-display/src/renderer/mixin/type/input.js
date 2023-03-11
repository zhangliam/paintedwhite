/**
 * @class Input
 * 输入框
 */
export default {
  name: 'input',
  data () {
    return {
      input: '',
      selectedValue: null
    }
  },
  computed: {
    computedInput () {
      return this.parseExpression(this.input)
    },
  },
  mounted () {
    if (this.computedInput) {
      this.onChange()
    }
  },
  methods: {
    onChange () {
      this.selectedValue = this.$refs.element.value
      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {target, value}
       */
       this.$emit('changing', {target: this, value: this.$refs.element.value})
       this.fireEvent('changing', {target: this, value: this.$refs.element.value})
       this.updateProvidor('input', this.$refs.element.value)
    },
    onFocus () {
      this.selectedValue = ''
    },
    onBlur () {
      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {target, value}
       */
       this.$emit('changed', {target: this, value: this.$refs.element.value})
       this.fireEvent('changed', {target: this, value: this.$refs.element.value})
       this.updateProvidor('input', this.$refs.element.value)
    },
    onKeyBoard (e) {
      if (e.keyCode == "13") {
        /**
         * 当前组件数据已确认
         *
         * @event confirmed
         * @property {object} obj {target, value}
         */
        this.$emit('confirmed', {target: this, value: this.$refs.element.value})
        this.fireEvent('confirmed', {target: this, value: this.$refs.element.value})
      }
    },
    optionsUpdated () {
      this.input = this.computedItem.value
    },
  }
}
