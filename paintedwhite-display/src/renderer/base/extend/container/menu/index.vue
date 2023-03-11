<template>
  <div 
    ref="element"
    :id="'menu-'+id"
    :elementtiming="'menu-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle">
    <div :ref="'child_'+index" :class="computedItem.class"
      :style="selectedIndex == index ? computedItemSelectedStyle : computedItemStyle" v-for="(row, index) in rows" :key="index"
      @click="setSelected(index, row)">
      <component v-for="(child, index) in computedComponents" :key="index" :is="child.type" :item="child" :originParent="row" 
      :statusParent="row[rowStatusField]"
      :styleItem="child.itemStyle"
      :styleItemSelected="child.itemSelectedStyle"
      @initialized="onInitialized"></component>
    </div>
  </div>
</template>

<script>
import container from '@/renderer/container'
import select from '@/renderer/mixin/type/select'
/**
 * The only true menu.
 */
export default {
  name: 'extend-container-menu',
  mixins: [container, select]
}
</script>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
```

## Examples

```vue
  <template>
    <extend-container-menu :item="{
      value,
      style,
      config,
      components,
      itemStyle,
      itemSelectedStyle,
      in: statusInclude,
      status
    }" @ready="onReady">
    </extend-container-menu>
  </template>

  <script>
    export default {
      data() {
        return {
          value: '',
          config: {
          },
          style:{
            display: 'flex'
          }, 
          itemStyle:{
            width: '100px',
            height: '30px',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center'
          }, 
          itemSelectedStyle:{
            background: 'black',
            width: '100px',
            height: '30px',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            color: 'white'
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