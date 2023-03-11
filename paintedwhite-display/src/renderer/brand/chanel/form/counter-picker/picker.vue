<template>
  <div>
    <basic-layer-mask v-model="show" @click.native="close" :opacity="maskerOpacity"></basic-layer-mask>
    <div class="counter-picker" :class="show ? 'picker-active' : ''">
      <div class="counter-picker-head">
        <svg @click.stop="close" width="16px" height="16px" viewBox="0 0 16 16">
          <polygon id="Page-1" fill="#999999" points="14.8572 0 8 6.8568 1.1428 0 0 1.1428 6.8568 8 0 14.8568 1.1428 16 8 9.1428 14.8572 16 16 14.8568 9.1428 8 16 1.1428"></polygon>
        </svg>
      </div>
      <div class="counter-picker-content">
        <div class="counter-picker-title">选择到场时间</div>
        <template v-if="Object.keys(dates).length > 1">
          <div class="counter-picker-dates">
            <div :class="key == type ? ['counter-picker-dates-item-active'] : []" class="counter-picker-dates-item" @click="setTimes(key)" v-for="(item, key) in dates"
              :key="key"
              v-html="key"></div>
          </div>
          <div class="counter-picker-times">
            <div :class="item == selectedValue ? ['counter-picker-times-item-active'] : (item.disabled ? ['counter-picker-times-item-disabled'] : [])" class="counter-picker-times-item" @click="setSelectValue(item)" v-for="(item, key) in times"
              :key="key"
              v-html="item.item.time"></div>
          </div>
        </template>
        <template v-else>
          <div class="counter-picker-item" v-for="(row, key) in rows" :key="key">
            <div class="counter-picker-item-box" :ref="'Component_' + key">
              <div @click="setSelectValue(item)" :class="item == selectedValue ? ['counter-picker-item-content-active'] : (item.disabled ? ['counter-picker-item-content-disabled'] : [])" class="counter-picker-item-content" :ref="'Content_' + key"
                v-for="(item, key) in row"
                v-html="item.label"
                :data-value="item.value"
                :key="key">
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="counter-picker-foot" @click.stop="setValue">
        <a href="javascript:" v-localize="{i: 'form.confirm'}"></a>
      </div>
    </div>
  </div>
</template>

<script>
import select from '@/renderer/mixin/type/select'
/**
 * TODO 选中项value问题
 */
export default {
  name: 'extend-form-picker',
  mixins: [select],
  data() {
    return {
      itemHeight: 38,
      reloadMonth: false,
      show: false,
      parentEL: null,
      type: '',
      dates: {},
      times: [],
      maskerOpacity: .5
    }
  },
  methods: {
    setSelectValue (value) {
      this.selectedValue = value
    },
    setTimes (key) {
      this.type = key
      this.times = this.dates[key]
    },
    init () {
      this.selectedValue = this.selectedValue || this.computedItem.value.split(',')
    },
    render() {
      this.dates = {}
      this.rows.forEach(row => {
        row.forEach(col => {
          if (!this.dates[col.item.date]) {
            this.dates[col.item.date] = [col]
          } else {
            this.dates[col.item.date].push(col)
          }
        })
      })
      let keys = Object.keys(this.dates)
      if (keys.length) {
        this.setTimes(keys[0])
      }
    },
    changeColumnDatas (index, rows) {
      this.$set(this.rows, index, rows)
      this.setColumnIndex(index)
    },
    setColumnIndex (index) {
      this.scrolloToPosition(index, () => {
        if (index + 1 < this.selectedValue.length) {
          this.setColumnIndex(index++)
        }
      })
    },
    scrolloToPosition(column, callback) {
      const scroller = this.scroller[column]
      if (!scroller) return
      let allDatas = this.rows[column]
      const len = allDatas.length
      scroller.setDimensions(7 * this.itemHeight, len * this.itemHeight, len)
      
      setTimeout(() => {
        const indatas = this.inDatas(allDatas, this.selectedValue[column])
        if (!this.scrolling[column]) {
          scroller.select(indatas ? this.selectedValue[column] : allDatas[0].value, false)
        }
        typeof callback === 'function' && callback()
      }, 0)
    },
    setValue() {
      this.$emit('confirmed', {value: this.selectedValue})
      this.close()
    },
    inDatas(items, key) {
      let b = false
      items.forEach((item) => {
        if (item.value == key) b = true
      })
      return b
    },
    open() {
      this.show = true
    },
    close() {
      this.show = false
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.$nextTick(this.render)
  },
  beforeDestroy() {
    this.columns.forEach((item) => {
      this.scroller[item] = null
    })
  }
}
</script>

<style>
.counter-picker {
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1502;
  background-color: #fff;
  transform: translateY(100%);
  transition: transform .25s;
  touch-action: none;
  will-change: transform;
}

.counter-picker-head {
  height: 50px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.counter-picker-foot {
  height: 44px;
  background-color: #000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  margin: 20px;
  width: calc(100% - 40px);
}

.counter-picker-foot a {
  color: #fff;
  font-size: 14px;
}

.counter-picker-title {
  font-size: 16px;
  text-align: center;
}

.counter-picker-item-box {
  margin: 20px;
}

.counter-picker-item-content {
  height: 44px;
  border: 1px solid #ACACAC;
  display: flex;
  padding: 0 16px;
  align-items: center;
  margin-top: 10px;
}

.counter-picker-item-content-active {
  border: 1px solid #1D1D1D;
}

.counter-picker-item-content-disabled {
  background-color: #F3F3F3;
  color: #ACACAC;
  pointer-events: none;
}

.counter-picker-dates {
  margin-top: 20px;
  display: flex;
  border-bottom: 1px solid #E6E6E6;
}

.counter-picker-dates-item {
  padding: 10px 0;
  margin: 0 10px;
}

.counter-picker-dates-item-active {
  border-bottom: 2px solid #1D1D1D;
}

.counter-picker-times {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.counter-picker-times-item {
  padding: 10px;
  border: 1px solid #ACACAC;
}

.counter-picker-times-item-active {
  border: 1px solid #1D1D1D;
}

.counter-picker-times-item-disabled {
  background-color: #F3F3F3;
  color: #ACACAC;
  pointer-events: none;
}
</style>