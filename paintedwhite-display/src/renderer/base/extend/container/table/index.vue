<template>
  <div
    ref="element"
    :id="'table-'+id"
    :elementtiming="'table-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle"
    @scroll="onScroll">
    <template v-if="computedConfig.section">
      <div v-for="(row, i) in rows" :key="'s_' + i ">
        <div :ref="'section_' + i" :class="section.class"
          :style="section.style" @click="onSectionClick(row)">
          <component v-for="(child, j) in section.components"
            :is="child.type" :item="child" :originParent="row"
            :key="'s_' + i + '_c_' + j" :parentStatus="row[rowStatusField]"
            @initialized="onInitialized"></component>
        </div>
        <div v-for="(item, k) in section.children" :key="'s_' + i + '_i_' + k"
          :class="computedItem.class" :style="computedItemStyle"
          :ref="'child_' + k" @click="onItemClick(item)">
          <component v-for="(child, index) in tableComponents"
            :key="'s_' + i + '_i_' + k + '_c_' + index"
            :is="child.type" :item="child"
            :originParent="item"
            :statusParent="item[rowStatusField]"
            @initialized="onInitialized"></component>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="(row, i) in rows" :key="'i_' + i"
        :class="computedItem.class" :style="computedItemStyle"
        :ref="'child_' + i" @click="onItemClick(row)">
        <component v-for="(child, index) in computedItem.components"
          :key="'i_' + i + '_c_' + index"
          :is="child.type" :item="child"
          :originParent="row"
          :statusParent="row[rowStatusField]"
          @initialized="onInitialized"></component>
      </div>
    </template>
  </div>
</template>

<script>
import container from '@/renderer/container'
import scroll from '@/renderer/mixin/type/scroll'
import list from '@/renderer/mixin/type/list'
/**
 * The only true table.
 */
export default {
  name: 'extend-container-table',
  mixins: [container, scroll, list],
  computed: {
    section () {
      return this.computedConfig.section ? this.computedComponents[0] : {}
    },
    table () {
      return this.computedConfig.section ? this.computedComponents[1] : this.computedItem
    }
  },
  methods: {
    onSectionClick (item) {
      /**
       * 当前组件的子表头被点击
       *
       * @event sectionClick
       * @property {object} obj {target}
       */
      this.$emit('sectionClicked', {target: this, item})
      this.fireEvent('sectionClicked', {target: this, item})
    },
    onItemClick (item) {
      /**
       * 当前组件的子原件被点击
       *
       * @event itemClicked
       * @property {object} obj {target, item}
       */
      this.$emit('itemClicked', {target: this, item})
      this.fireEvent('itemClicked', {target: this, item})
    }
  }
}
</script>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
section: true // 打开section
```

## Examples

```vue
  <template>
    <extend-container-table :item="{
      value,
      style,
      config,
      components,
      itemStyle,
      in: statusInclude,
      status
    }" @ready="onReady">
    </extend-container-table>
  </template>

  <script>
    export default {
      data() {
        return {
          value: '',
          config: {
            // section: true
          },
          style:{}, 
          itemStyle:{
            width: '100px',
            height: '30px',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center'
          }, 
          components:[
            {
              type: 'basic-layer-text',
              style:{},
              value: '{{label}}',
              components: [],
              in: ['normal'], 
              status: ['normal']
            }
          ], 
          statusInclude: ['normal'], 
          status: ['normal']
        };
      },
      methods: {
        onReady(c) {
          c.setRows([
            {
              label: 'menu1'
            },
            {
              label: 'menu2'
            }
          ])
        }
      }
    }
  </script>
```

</docs>