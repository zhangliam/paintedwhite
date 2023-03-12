<template>
  <div class="sider-layer">
    <div class="sider-layer-controller">
      元素
      <img v-if="clipLayer" @click="doPaste" class="options-icon" src="@/assets/images/paste.svg" />
    </div>
    <draggable tag="ul" class="list sider-page-list" :list="layers">
      <BoxLayer v-for="(item, index) in layers" :parent="page" :key="item.__id" :item="item" :red="90 + index * 5" :green="130"></BoxLayer>
    </draggable>
  </div>
</template>

<script setup>
import BoxLayer from './box/layer.vue'
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import { computed, ref } from '@vue/reactivity'
import { inject, watch } from '@vue/runtime-core'
import { doPushProp } from '@/utils/crud'
import { generate } from 'shortid'

const page = inject('page')
const layers = computed(() => page.value ? page.value.components : [])
const clipLayer = inject('clip_layer')

const doPaste = () => {
  let newLayer = Object.assign({}, clipLayer.value, { __id: generate() })
  flushObject(newLayer)
  doPushProp(newLayer, page.value, 'components')
}

const flushObject = (newLayer) => {
  newLayer.components && newLayer.components.forEach(comp => {
    Object.assign(comp, { __id: generate() })
    flushObject(comp)
  })
}

const compareLayer = (lyr) => {
  if (layerID.value == lyr.__id) {
    layer.value = lyr
    return
  }
  lyr.components && lyr.components.forEach(comp => {
    compareLayer(comp)
  })
}

const layer = inject('layer')
const layerID = inject('layerID')

watch(layerID, () => {
  layers.value.forEach(lyr => {
    compareLayer(lyr)
  })
})

</script>

<style lang="less">
.sider {
  &-layer {
    height: 50%;
    position: relative;

    &-controller {
      padding-left: 10px;
      height: 36px;
      display: flex;
      align-items: center;
      border-top: 1px solid #e7e7e7;
      border-bottom: 1px solid #e7e7e7;
    }

    &-list {
      width: 100%;
      padding: 0px;
      margin: 0px;
      position: absolute;
      top: 36px;
      bottom: 0px;
      overflow: scroll;
    }
  }
}
</style>