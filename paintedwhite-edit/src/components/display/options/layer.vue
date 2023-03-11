<template>
  <OptionLayerConfig v-if="target.type" :target="target"></OptionLayerConfig>
  <OptionContainerStatus v-if="isContainer || !target.type" :target="target"></OptionContainerStatus>
  <OptionLayerInclude v-if="target.type" :target="target"></OptionLayerInclude>
  <OptionLayerAction v-if="target.type == 'GltfModel'" :target="target"></OptionLayerAction>
  <OptionLayerStyle :title="'样式'" :target="target"></OptionLayerStyle>
  <OptionLayerStyle v-if="target.type && isList" :title="'子样式'" :target="target"></OptionLayerStyle>
  <OptionLayerStyle v-if="target.type && isSelect" :title="'子样式 (选中)'" :target="target"></OptionLayerStyle>
  <OptionAnimation v-if="target.type" :target="target"></OptionAnimation>
</template>

<script setup>
import OptionContainerStatus from './status.vue'
import OptionLayerConfig from './layer/config.vue'
import OptionLayerInclude from './layer/include.vue'
import OptionLayerAction from './layer/action.vue'
import OptionLayerStyle from './style.vue'

import OptionAnimation from './layer/animation.vue'
import { checkContainer, checkList, checkSelect } from '../../../constant/components'
import { computed } from '@vue/reactivity'

const props = defineProps({
  target: Object
})

const isContainer = computed(() => props.target ? checkContainer(props.target.type) : false)
const isList = computed(() => props.target ? checkList(props.target.type) : false)
const isSelect = computed(() => props.target ? checkSelect(props.target.type) : false)
</script>