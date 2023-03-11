<template>
  <div class="options-item">
    <div class="options-property-header">
      <div class="options-property-header-title">事件
        <img v-if="actions.length" @click="doCopyList" class="options-icon"
          src="@/assets/images/copy.svg" />
        <img v-if="clipAction" @click="doPaste" class="options-icon"
          src="@/assets/images/paste.svg" />
      </div>
      <img v-if="target.__id" @click="showCreate" class="options-icon"
        src="@/assets/images/plus.svg" />
    </div>
    <div class="options-property-content">
      <div class="action-input" v-for="(action, index) in target.actions" 
        :key="index" @click="doSelect(action)">
        {{action.name}}
        <div class="options-property-controller">
          <img @click.stop="doCopy(action)" class="options-icon"
            src="@/assets/images/copy.svg" />
          <img @click.stop="doPullProp(action, target, 'actions')" class="options-icon"
            src="@/assets/images/close.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "@vue/runtime-core"
import { doUpdateProp, doPullProp } from '@/utils/crud'
// import prompt from '../../prompt'

const props = defineProps({
  target: Object
})

const actions = computed(() => {
  return props.target.actions || []
})

const doSelect = () => {}

const clipAction = inject('clip_action')
const clipActionList = inject('clip_action_list')
const doCopy = (include) => {
  clipAction.value = include
  clipActionList.value = null
}
const doCopyList = () => {
  clipActionList.value = props.target.actions
  clipAction.value = null
}
const doPaste = () => {
  // if (clipIncludeList.value) {
  //   doUpdateProp(clipIncludeList.value, props.target, 'actions')
  // } else {
  //   doPushProp(clipInclude.value, props.target, 'actions')
  // }
}
const showCreate = () => {
  // prompt({
  //   title: '添加事件',
  //   label: '事件名称:',
  //   value: 'mounted',
  //   inputAttrs: {
  //     type: 'text'
  //   },
  //   type: 'input'
  // }).then(input => {
  //   doPushProp(input, props.target, 'actions')
  // }).catch(console.error)
}
</script>

<style lang="less">
.action-input {
  display: flex;
  justify-content: space-between;
  margin: 5px;
  border: 1px solid #C6CBEF;
  height: 30px;
  border-radius: 5px;
  align-items: center;
  padding: 0 5px;
}
</style>