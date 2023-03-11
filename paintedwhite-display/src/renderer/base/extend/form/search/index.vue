<template>
  <div :id="'search-'+id"
    :elementtiming="'search-'+id">
    <textarea
      ref="element"
      v-if="computedActive"
      :class="computedItem.class"
      :style="computedStyle"
      :placeholder="computedConfig.placeholder"
      v-model="str"
      @input="onChange"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeyBoard"></textarea>
    <div class="select-panel" v-if="show">
      <div @click="onClick(item)" class="select-item" v-for="(item, i) in list"
        :key="'s_' + i ">{{item.label||item.name||item}}</div>
    </div>
  </div>
</template>

<script>
import layer from '@/renderer/layer'
/**
 * The only true textarea-auto.
 */
export default {
  name: 'extend-form-search',
  mixins: [layer],
  data () {
    return {
      str: '',
      show: false,
      edit: false,
      current: '',
      originList: [],
      itemStatusField: 'status'
    }
  },
  computed: {
    list () {
      return this.originList.filter((e) => {
        return e.label.toLowerCase().indexOf(this.current.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    executeCheck () {
      let value = this.$refs.element.value
      let events = this.page ? this.page.eventListeners : this.eventListeners
      if (events['checking_' + this.item.name]) {
        let result = events['checking_' + this.item.name](value)
        if (result !== true) {
          this.error = result
          return false
        }
      }
      return {v : true}
    },
    setList (list) {
      this.originList = list
    },
    onInput () {
      this.edit = true
      let word = this.$refs.element.value
      let words = word.split(';')
      this.current = words[words.length - 1]
      if (this.current) {
        this.show = true
      }
      /**
       * 当前组件正在进行输入操作
       *
       * @event inputing
       * @property {object} obj {target, value}
       */
      this.$emit('inputing', {target: this, value: word})
      this.fireEvent('inputing', {target: this, value: word})
    },
    onChange () {
      this.edit = true
      let word = this.$refs.element.value
      let words = word.split(';')
      this.current = words[words.length - 1]
      if (this.current) {
        this.show = true
      }
      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {target, value}
       */
      this.$emit('changed', {target: this, value: word})
      this.fireEvent('changed', {target: this, value: word})
    },
    onClick (item) {
      let word = this.$refs.element.value
      let words = word.split(';')
      this.str = ''
      for (let i = 0; i < words.length - 1; i++) {
        this.str += words[i] + ';'
      }
      this.str += (item.label||item.name||item)
      this.show = false
      // setTimeout(() => {this.current = ''}, 100)
    },
    onFocus () {},
    onBlur () {},
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
    renew () {
      let result
      if (this.computedItem) {
        result = this.parseExpression(this.computedItem.value)
      }
      if (!this.edit) {
        this.str = result
      }
    }
  }
}
</script>

<style>
.select-panel {
  position: absolute;
  max-height: 150px;
  overflow-y: scroll;
  background-color: white;
  width: 100%;
}

.select-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>