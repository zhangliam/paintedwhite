<template>
  <div class="options-item">
    <div class="options-property-header">
      <div class="options-property-header-title">状态
        <img v-if="computedStatus.length" @click="doCopyList" class="options-icon"
          src="@/assets/images/copy.svg" />
        <img v-if="clipStatus || clipStatusList" @click="doPaste" class="options-icon"
          src="@/assets/images/paste.svg" />
      </div>
      <img v-if="target.__id" @click="showCreate" class="options-icon"
        src="@/assets/images/plus.svg" />
    </div>
    <div class="options-property-content">
      <div :class="value == current ? ['status-input-active'] : ['status-input']" v-for="(value, key) in computedStatus" :key="key" @click="doSelect(value)">
        {{value}}
        <div class="options-property-controller">
          <img @click.stop="doCopy(value)" class="options-icon"
            src="@/assets/images/copy.svg" />
          <img @click.stop="doPullProp(value, target, 'status')" class="options-icon"
            src="@/assets/images/close.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'
import { doUpdateProp, doPushProp, doPullProp, doSetStatus } from '@/utils/crud'
// import prompt from '../../prompt'

const props = defineProps({
  target: Object
})

const current = ref('normal')

const computedStatus = computed(() => {
  if (props.target.status && props.target.status.indexOf(current.value) == -1) {
    current.value = props.target.status[0]
  }
  return props.target.status || []
})


const clipStatus = inject('clip_status')
const clipStatusList = inject('clip_status_list')
const doCopy = (status) => {
  clipStatus.value = status
  clipStatusList.value = null
}
const doCopyList = () => {
  clipStatusList.value = props.target.status
  clipStatus.value = null
}
const doPaste = () => {
  if (clipStatusList.value) {
    doUpdateProp(clipStatusList.value, props.target, 'status')
  } else {
    doPushProp(clipStatus.value, props.target, 'status')
  }
}

const doSelect = ( status ) => {
  doSetStatus(status, props.target, current)
}

const showCreate = () => {
  // prompt({
  //   title: '添加状态',
  //   label: '状态名称:',
  //   value: 'normal',
  //   inputAttrs: {
  //     type: 'text'
  //   },
  //   type: 'input'
  // }).then(input => {
  //   if (props.target.status.indexOf(input) == -1) {
  //     doPushProp(input, props.target, 'status')
  //   }
  // }).catch(console.error)
}
</script>

<style lang="less">
.status-input {
  display: flex;
  justify-content: space-between;
  margin: 5px;
  border: 1px solid #ecedf8;
  height: 30px;
  border-radius: 5px;
  align-items: center;
  padding: 0 5px;

  &-active {
    display: flex;
    justify-content: space-between;
    margin: 5px;
    border: 1px solid #C6CBEF;
    height: 30px;
    border-radius: 5px;
    align-items: center;
    padding: 0 5px;
  }
}
</style>