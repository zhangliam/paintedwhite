<template>
  <div v-if="isActive" ref="element" :style="computedStyle" class="app" :class="computedClass">
    <proxy v-for="item in computedComponents" :key="item.__id" :item="item" :parentOrigin="computedOrigin" :parentStatus="dataStatus"></proxy>
  </div>
</template>

<script>
import { Page } from "./class"

export default {
  name: 'page',
  props: {
    dataSource: Object
  },
  setup(props, ctx) {
    return new Page(props, ctx)
  },
}
</script>