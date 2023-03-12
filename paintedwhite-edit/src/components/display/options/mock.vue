<template>
  <div class="options-item">
    <div class="options-property-header">
      <div class="options-property-header-title">模拟数据</div>
    </div>
    <div class="options-property-content">
      <div class="options-property-item">
        <div class="options-property-title">Origin:</div>
        <div class="options-property-input"><textarea class="value-content" :value="originObject" @input="setOrigin($event)"></textarea></div>
      </div>
      <div class="options-property-item" v-if="isList">
        <div class="options-property-title">Rows:</div>
        <div class="options-property-input"><textarea class="value-content" :value="rowsObject" @input="setRow($event, target, rowsObject)"></textarea></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { checkList } from "../../../constant/components"
import { doSetOrigin, doSetRow } from '@/utils/crud'
import { findOneById } from '@/utils/lowdb'
import { computed, ref } from "@vue/reactivity"
import { watch } from "@vue/runtime-core"

const props = defineProps({
  target: Object
})

const originObject = ref(null)
const rowsObject = ref(null)

// watch(() => props.target, (newValue) => {
//   originObject.value = findOneById('origin', newValue.__id)
//   rowsObject.value = findOneById('row', newValue.__id)
// })

const isList = computed(() => props.target ? checkList(props.target.type) : false)

const setOrigin = (evt) => {
  doSetOrigin(evt.target.value, props.target, originObject)
}

const setRow = (evt) => {
  doSetRow(evt.target.value, props.target, rowsObject)
}
</script>