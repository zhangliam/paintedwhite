<template>
  <select
    ref="element"
    :id="'select-'+id"
    :elementtiming="'select-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle"
    :multiple="computedConfig.multiple"
    @change="onChange">
    <template v-for="(row, i) in rows">
      <option :ref="'s_'+i" :key="'s_' + i "
        :selected="selectedIndex.indexOf(''+i) != -1"
        :style="computedItemStyle"
        :value="i">
        {{row.label||row.name||row}}
      </option>
      <option :ref="'s_' + i + '_i_' + k"
        :style="computedItemStyle"
        :selected="selectedIndex.indexOf((i + '_' + k)) != -1"
        v-for="(sub, k) in row.children"
        :key="'s_' + i + '_i_' + k"
        :value="i + '_' + k">
        - {{sub.label||sub.name||sub}}
      </option>
    </template>
  </select>
</template>

<script>
import utils from '@/assets/js/utils'
import layer from '@/renderer/layer'
import select from '@/renderer/mixin/type/select'
/**
 * The only true select.
 */
export default {
  name: 'basic-form-select',
  mixins: [layer, select],
  computed: {
    computedItemStyle () {
      let style = this.styleItem || {}
      if (Object.keys(style).length === 0) {
        style = this.item.itemStyle || {}
      }
      return utils.px2rem(style)
    }
  },
  methods: {
    onChange (e) {
      let index = []
      let value = []
      for (let option of e.target.selectedOptions) {
        let chain = option.value.split('_')
        let row = this.rows
        while (chain.length) {
          let key = chain.shift()
          if (key) {
            row = row[key]
          }
        }
        index.push(option.value)
        value.push(row)
      }
      this.setSelected(index, value)
    },
    executeCheck () {
      let events = this.page ? this.page.eventListeners : this.eventListeners
      if ((this.computedConfig.need || this.computedConfig.need === 'true') && !this.selectedIndex.length) {
        this.$dialog.alert({
          title: this.localize({i: 'form.error'}),
          text: this.localize({i: `form.${this.item.name}Empty`})
        })
        return false
      }
      if (events['checking_' + this.item.name]) {
        let result = events['checking_' + this.item.name](this.selectedIndex)
        if (result !== true) {
          this.error = result
          return false
        }
      }
      return {v : this.selectedValue}
    },
  }
}
</script>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
need: true // 必填
multiple: true // 多选
```

## Examples

```vue
  <template>
    <basic-form-select :item="{
      value,
      style,
      config,
      in: statusInclude,
      status
    }" @ready="onReady">
    </basic-form-select>
  </template>

  <script>
    export default {
      data() {
        return {
          value: '',
          config: {
          },
          style:{}, 
          statusInclude: ['normal'], 
          status: ['normal']
        };
      },
      methods: {
        onReady(c) {
          c.setRows([
            {
              label: 'a'
            },
            {
              label: 'b'
            }
          ])
        }
      }
    }
  </script>
```

</docs>