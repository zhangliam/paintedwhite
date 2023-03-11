<template>
  <div :id="'picker-'+_uid"
    :elementtiming="'picker-'+_uid">
    <basic-layer-mask v-model="show" @click.native="close" :opacity="maskerOpacity"></basic-layer-mask>
    <div class="picker" :class="show ? 'picker-active' : ''">
      <div class="picker-head">
        <a href="javascript:" @click.stop="close" v-localize="{i: 'form.cancel'}"></a>
        <a href="javascript:" @click.stop="setValue" v-localize="{i: 'form.confirm'}"></a>
      </div>
      <div class="picker-content">
        <div class="picker-item" v-for="(row, key) in rows" :key="key">
          <div class="picker-item-box" :ref="'Component_' + key">
            <div class="picker-item-content" :ref="'Content_' + key">
              <span v-for="(item, key) in row"
                :data-value="item.value"
                v-html="item.label"
                :key="key"
              ></span>
            </div>
          </div>
        </div>
        <div class="picker-shade"></div>
        <div class="picker-indicator"><span></span></div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroller from './scroller'
import select from '@/renderer/mixin/type/select'

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
      scroller: [],
      scrolling: [],
      maskerOpacity: .5
    }
  },
  methods: {
    init () {
      this.selectedValue = this.selectedValue || this.computedItem.value.split(',')
    },
    render() {
      this.rows.forEach((item, index) => {
        const component = this.$refs['Component_' + index][0]
        const content = this.$refs['Content_' + index][0]
        this.scroller[index] = new Scroller(component, content, {
          itemHeight: this.itemHeight,
          onSelect: (value) => {
            this.$emit('changed', {
              column: index,
              value
            })
            this.$set(this.selectedValue, index, value)
            this.scrolling[index] = false
          },
          callback: (top, isDragging) => {
            if (isDragging) {
              this.scrolling[index] = true
            }
            content.style.webkitTransform = 'translate3d(0, ' + (-top) + 'px, 0)'
          }
        })
        const len = this.rows[index].length
        this.scroller[index].setDimensions(7 * this.itemHeight, len * this.itemHeight, len)
        this.scroller[index].select(this.selectedValue[index], false)
        this.scrolling[index] = false
      })
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
.picker {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1502;
  background-color: #fff;
  transform: translateY(100%);
  transition: transform .25s;
  touch-action: none;
  will-change: transform;
}

.picker-active {
  transform: translateY(0) !important;
}

.picker-head {
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: #fbfbfb;
}

.picker-content {
  position: relative;
  width: 100%;
  height: 266px;
  overflow: hidden;
  display: flex;
}

.picker-head>a {
  height: 43px;
  padding: 0 30px;
  font-size: 15px;
  display: flex;
  align-items: center;
  color: #555;
}

.picker-item {
  font-size: 16px;
  height: 100%;
  position: relative;
  flex: 1;
}

.picker-item-box {
  height: 100%;
}

.picker-item-content>span {
  width: 100%;
  display: block;
  height: 38px;
  line-height: 38px;
  text-align: center;
}

.picker-shade {
  z-index: 3;
  transform: translateZ(0);
  background-image: linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
  background-position: top,bottom;
  background-size: 100% 114px;
  background-repeat: no-repeat;
}

.picker-indicator {
  z-index: 4;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.picker-indicator, .picker-shade {
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.picker-indicator>span {
  display: block;
  width: 100%;
  height: 38px;
  position: relative;
}

.picker-indicator>span:before {
  bottom: 0;
}

.picker-indicator>span:after {
  top: -1px;
}

.picker-indicator>span:after, .picker-indicator>span:before {
  content: "";
  position: absolute;
  z-index: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(0deg,#ececec 51%,transparent 0);
}
</style>