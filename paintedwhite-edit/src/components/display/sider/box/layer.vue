<template>
  <li :class="['box', isActive]" @click.stop="doClick"
    :style="'background-color: rgba(' + red + ',' + green + ',213,0.2)'">
    <div class="box-item">
      <div class="box-title">
        <img v-if="isContainer && !isExpend" @click.stop="triggerExpand" class="options-icon-left" src="@/assets/images/plus-o.svg" />
        <img v-if="isContainer && isExpend" @click.stop="triggerExpand" class="options-icon-left" src="@/assets/images/min-o.svg" />
        {{item.type.length > 10 ? (item.type.substr(0, 5) + `...` + item.type.substr(item.type.length-5, 5)) : item.type}} [ {{item.name && item.name.length > 6 ? (item.name.substr(0, 2) + `...` + item.name.substr(item.name.length-2, 2)) : item.name}} ]
      </div>
      <div class="box-controller">
        <img v-if="isContainer && clipLayer" @click="doPaste" class="options-icon" src="@/assets/images/paste.svg" />
        <img @click.stop="doCopy" class="options-icon" src="@/assets/images/copy.svg" />
        <img v-if="!item.invisible" @click.stop="triggerVisible" class="options-icon" src="@/assets/images/visible.svg" />
        <img v-else @click.stop="triggerVisible" class="options-icon" src="@/assets/images/invisible.svg" />
        <img @click.stop="doPullProp(item, parent, 'components')" class="options-icon" src="@/assets/images/remove.svg" />
      </div>
    </div>
    <draggable tag="ul" class="box-children" v-if="isContainer && isExpend" :list="layers">
      <BoxLayer v-for="(child, index) in layers" :parent="item" :key="child.__id" :item="child" :red="red" :green="green + index * 10"></BoxLayer>
    </draggable>
  </li>
</template>

<script>
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import { computed, ref } from '@vue/reactivity'
import { inject, watch } from '@vue/runtime-core'
import { checkContainer } from '../../../../constant/components'
import { doPullProp, doPushProp } from '@/utils/crud'
import { generate } from 'shortid'

export default {
  name: 'BoxLayer',
  props: {
    item: Object,
    parent: Object,
    red: Number,
    green: Number
  },
  components: {
    draggable
  },
  setup(props, ctx) {
    const layer = inject('layer')
    const isActive = computed(() => {
      return layerID.value == props.item.__id ? 'box-active' : ''
    })

    const layerID = inject('layerID')

    const layers = computed(() => props.item ? props.item.components : [])

    const clipLayer = inject('clip_layer')

    const doClick = () => {
      layer.value = props.item
      layerID.value = props.item.__id
    }

    const doPaste = () => {
      doPushProp(Object.assign({}, clipLayer.value, {__id: generate()}), props.item, 'components')
    }

    const doCopy = () => {
      clipLayer.value = props.item
    }

    const triggerVisible = () => {
      props.item.invisible = !props.item.invisible
    }

    const isExpend = ref(false)
    const triggerExpand = () => {
      isExpend.value = !isExpend.value
    }

    const isContainer = computed(() => checkContainer(props.item.type))

    return {
      isActive,
      isExpend,
      isContainer,
      layers,
      clipLayer,
      doClick,
      doPaste,
      doCopy,
      triggerVisible,
      triggerExpand,
      doPullProp
    }
  },
}
</script>

<style lang="less">
.box {
  padding-left: 10px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  &-title {
    display: flex;
    // justify-content: center;
    align-items: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  &-controller {
    display: flex;
    // justify-content: center;
    align-items: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 26px;
  }

  &-children {
    padding: 0px;
  }
}
</style>
