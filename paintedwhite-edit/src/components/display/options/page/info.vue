<template>
  <div class="options-item">
    <div class="options-property-header">
      <div class="options-property-header-title">信息</div>
    </div>
    <div class="options-property-content">
      <div class="options-property-item">
        <div class="options-property-title">__id:</div>
        <div class="options-property-input"><input type="text" :value="target.__id"/></div>
      </div>
      <div class="options-property-item">
        <div class="options-property-title">Name:</div>
        <div class="options-property-input"><input type="text" :value="target.name" 
          @input="doUpdateProp($event.target.value, target, 'name')" /></div>
      </div>
      <div class="options-property-item">
        <div class="options-property-title">Path:</div>
        <div class="options-property-input"><input type="text" :value="target.path" 
          @input="doUpdateProp($event.target.value, target, 'path')" /></div>
      </div>
      <div class="options-property-item">
        <div class="options-property-title">Class:</div>
        <div class="options-property-input"><input type="text" :value="target.class" 
          @input="doUpdateProp($event.target.value, target, 'class')" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { doUpdateProp } from '@/utils/crud'

const props = defineProps({
  target: Object
})
</script>

