<template>
  <div class="options-item">
    <div class="options-property-header">
      <div class="options-property-header-title">{{title}}
        <!-- <img v-if="Object.keys(computedStyle).length" @click="doCopy" class="options-icon"
          src="@/assets/images/copy.svg" />
        <img v-if="clipStyle" @click="doPaste" class="options-icon"
          src="@/assets/images/paste.svg" /> -->
      </div>
      <!-- <img v-if="target.__id" @click="showCreate" class="options-icon"
        src="@/assets/images/plus.svg" /> -->
    </div>
    <div class="options-property-content">
      <div class="options-property-item" v-for="(value, key) in computedStyle"         
        :key="key">
        <div class="options-property-title">{{key}}:</div>
        <div class="options-property-input"><input type="text" :value="value" 
          @input="eventDoUpdateProp($event.target.value, target, `style.${key}`)" /></div>
        <img @click="doRemoveProp(target, `style.${key}`)" class="options-icon"
          src="@/assets/images/remove.svg" />
      </div>
    </div>
  </div>
</template>

<script setup>

import { computed, inject } from "@vue/runtime-core"
import { getExcuteList ,doCreateProp, doUpdateProp, doRemoveProp } from '@/utils/crud'
// import prompt from '../../prompt'

const props = defineProps({
  title: String,
  target: Object
})

const excuteList = inject('excuteList')

const computedStyle = computed(() => props.target.style || {})

const clipStyle = inject('clip_style')

const doCopy = (style) => { clipStyle.value = style }
const doPaste = () => {
  doUpdateProp(clipStyle.value, props.target, 'style')
}

const eventDoUpdateProp = (value, target, attr) => {
  doUpdateProp(value, target, attr)
  console.log('eventDoUpdateProp =>', getExcuteList())
  excuteList.value = getExcuteList()
}

const showCreate = () => {
  // prompt({
  //   title: '添加样式',
  //   label: '样式名称:',
  //   value: 'color',
  //   inputAttrs: {
  //     type: 'text'
  //   },
  //   type: 'input'
  // }).then(input => {
  //   if (!(input in props.target.style)) {
  //     doCreateProp('', props.target, `style.${input}`)
  //   }
  // }).catch(console.error)
}
</script>