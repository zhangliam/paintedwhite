<template>
  <div ref="element"
    :id="'date-picker-'+id"
    :elementtiming="'date-picker-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle" @click.stop="open" class="datepicker-input">
    <template v-if="!!currentValue">{{currentValue}}</template>
    <template v-else><span class="datepicker-placeholder">{{computedConfig.placeholder}}</span></template>
    <svg width="16px" height="16px" viewBox="0 0 448 512">
      <path fill="currentColor" d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'
import utils from '@/assets/js/utils'
import layer from '@/renderer/layer'
import select from '@/renderer/mixin/type/select'
import date from './date'
import localize from '@/localize'
import PickerComponent from '../picker/index.vue'
/**
 * The only true date-picker.
 */
export default {
  name: 'extend-form-date-picker',
  mixins: [layer, select],
  data () {
    return {
      tmpNum: 0,
      picker: null,
      currentValue: '',
      mapping: {},
      config: {}
    }
  },
  props: {
    initEmit: {
      type: Boolean,
      default: true
    },
  },
  watch: {
    options: {
      deep: true,
      handler (val) {
        this.initialize()
      }
    }
  },
  methods: {
    executeCheck () {
      let events = this.page ? this.page.eventListeners : this.eventListeners
      if ((this.computedConfig.need || this.computedConfig.need === 'true') && !this.selectedValue.length) {
        this.$dialog.alert({
          title: this.localize({i: 'form.error'}),
          text: this.localize({i: `form.${this.item.name}empty`})
        })
        return false
      }
      if (events['checking_' + this.item.name]) {
        let result = events['checking_' + this.item.name](this.selectedValue)
        if (result !== true) {
          this.error = result
          return false
        }
      }
      return {v : this.selectedValue}
    },
    initializeConfig () {
      console.log('initializeConfig')
      let now = new Date()
      let y = now.getFullYear()
      now.setFullYear(y + 100)
      let config = {}
      config.format = 'YYYY-mm-dd HH:MM:00'
      config.readonly = false
      config.type = 'datetime'
      config.startDate = '1970-01-01 00:00:00'
      config.endDate = date.format(now, 'YYYY-MM-DD HH:mm:ss')
      config.startYear = 0
      config.endYear = 0
      config.startHour = 0
      config.endHour = 23
      config.yearFormat = 'Y年'
      config.monthFormat = 'm月'
      config.dayFormat = 'd日'
      config.hourFormat = 'H时'
      config.minuteFormat = 'M分'
      this.config = config
    },
    initialize () {
      this.initializeConfig()
      let currentValue = this.computedItem.value
      let now = new Date(currentValue)
      if (utils.getClassName(currentValue) === 'Date') {
        now = currentValue
      } else if (!date.isDateTimeString(currentValue)) {
        now = new Date()
      }
      this.rows = []
      this.selectedValue = []
      if (this.computedConfig.startDate && now.getTime() < new Date(this.computedConfig.startDate).getTime()) {
        currentValue = this.currentValue = this.computedConfig.startDate
      }
      if (this.computedConfig.endDate && now.getTime() > new Date(this.computedConfig.endDate).getTime()) {
        currentValue = this.currentValue = this.computedConfig.endDate
      }

      // const currentDate = now
      // this.config = {
      //   startDate: this.computedConfig.startDate,
      //   endDate: this.computedConfig.endDate,
      //   startYear: this.computedConfig.startYear,
      //   endYear: this.computedConfig.endYear,
      //   startHour: this.computedConfig.startHour,
      //   endHour: this.computedConfig.endHour,
      //   currentYear: now.getFullYear(),
      //   currentMonth: now.getMonth() + 1,
      //   currentDay: now.getDate(),
      //   currentHour: now.getHours(),
      //   currentMinute: now.getMinutes()
      // }

      this.config.currentYear = now.getFullYear()
      this.config.currentMonth = now.getMonth() + 1
      this.config.currentDay = now.getDate()
      this.config.currentHour = now.getHours()
      this.config.currentMinute = now.getMinutes()

      const opt = {
        'Y+': {
          format: this.computedConfig.yearFormat,
          handler: 'getYearItems',
          field: 'currentYear'
        },     // 年
        'm+': {
          format: this.computedConfig.monthFormat,
          handler: 'getMonthItems',
          field: 'currentMonth'
        },     // 月
        'd+': {
          format: this.computedConfig.dayFormat,
          handler: 'getDayItems',
          field: 'currentDay'
        },     // 日
        'H+': {
          format: this.computedConfig.hourFormat,
          handler: 'getHourItems',
          field: 'currentHour'
        },     // 时
        'M+': {
          format: this.computedConfig.minuteFormat,
          handler: 'getMinuteItems',
          field: 'currentMinute'
        },     // 分
        // 'S+': date.getYearItems      // 秒
      }
      for (let k in opt) {
        let ret = new RegExp("(" + k + ")").exec(this.computedConfig.format)
        if (ret) {
          this.config.format = opt[k].format
          let items = date[opt[k].handler](this.config)
          this.rows.push(items)
          if (!currentValue) {
            this.config[opt[k].field] = items[0].value
          }
          this.mapping[k] = this.selectedValue.length
          this.selectedValue.push(this.config[opt[k].field])
        }
      }
      this.currentValue = date.format(now, this.computedConfig.format)
    },
    open() {
      if (this.computedConfig.readonly) return
      this.picker && this.picker.open()
    },
    close() {
      this.picker.close()
    },
    inDatas(items, key) {
      let b = false
      items.forEach((item) => {
        if (item.value == key) b = true
      })
      return b
    },
    removeElement() {
      if (this.picker && this.picker.$el) document.body.removeChild(this.picker.$el)
    },
    render() {
      this.removeElement()
      const Picker = Vue.extend(PickerComponent)
      this.picker = new Picker({
        el: document.createElement('div'),
        localize,
        data: {
          rows: this.rows,
          selectedValue: this.selectedValue
        }
      })
      this.picker.item = {
        config: this.computedConfig
      }
      document.body.appendChild(this.picker.$el)
      this.picker.$on('changed', ({column, value}) => {
        this.selectedValue[column] = value
        for (let k in this.mapping) {
          if (this.mapping[k] == column && k == 'm+' && this.mapping['d+']) {
            this.config.format = this.computedConfig.dayFormat || 'YYYY-mm-dd'
            this.config.currentMonth = value
            this.picker.changeColumnDatas(this.mapping['d+'], date.getDayItems(this.config))
          }
        }

        /**
         * 当前组件数据发送变化
         *
         * @event changed
         * @property {object} obj {target, value}
         */
        this.$emit('changed', {target: this, value: this.selectedValue[column]})
      })
      this.picker.$on('confirmed', (value) => {
        if (this.tmpNum > 0 || this.initEmit) {
          this.selectedValue = value
          this.currentValue = this.serialize()
          this.$emit('confirmed', {target: this, value})
          this.fireEvent('confirmed', {target: this, value})
          this.updateProvidor('selectedValue', this.selectedValue)
        }
        this.tmpNum++
      })
    },
    serialize () {
      let ret
      let format = this.computedConfig.format || 'YYYY-mm-dd'
      const opt = {
        'Y+': this.mapping['Y+'] !== undefined ? this.selectedValue[this.mapping['Y+']] : 0,        // 年
        'm+': this.mapping['m+'] !== undefined ? this.selectedValue[this.mapping['m+']] : 0,     // 月
        'd+': this.mapping['d+'] !== undefined ? this.selectedValue[this.mapping['d+']] : 0,            // 日
        'H+': this.mapping['H+'] !== undefined ? this.selectedValue[this.mapping['H+']] : 0,           // 时
        'M+': this.mapping['M+'] !== undefined ? this.selectedValue[this.mapping['M+']] : 0,         // 分
        'S+': this.mapping['S+'] !== undefined ? this.selectedValue[this.mapping['S+']] : 0         // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(format)
        if (ret) {
          format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].toString().padStart(ret[1].length, '0')))
        }
      }
      return format
    },
  },
  mounted() {
    this.render()
  },
  beforeDestroy() {
    this.removeElement()
  }
}
</script>

<style>
.datepicker-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>