<template>
  <div class="prop-group">
    <img @click="doCopy" class="option-icon" src="@/assets/images/copy.svg" />
    <div>
      <div class="property-item">
        <div class="animation-title">作用属性:</div>
        <div class="property-input"><input type="text" :value="item.property" @input="doUpdateProp($event.target.value, item, 'property')" /></div>
      </div>
      <div class="property-item">
        <div class="animation-title">表达式:</div>
        <div class="property-input"><input type="text" :value="item.expression" @input="doUpdateProp($event.target.value, item, 'expression')" /></div>
      </div>
    </div>
    <img @click="doRemove" class="option-icon" src="@/assets/images/remove.svg" />
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { doUpdateProp } from '@/utils/crud'

const props = defineProps({
  target: Object
})

const clipAnimationProp = inject('clip_animation_prop')
const doCopy = (AnimationProp) => { clipAnimationProp.value = AnimationProp }
const doPaste = () => {}
const doRemove = () => {}
</script>