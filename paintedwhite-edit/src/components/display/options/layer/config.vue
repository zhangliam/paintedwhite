<template>
  <div class="options-item">
    <div class="options-property-header">
      <div class="options-property-header-title">组件属性 
        <!-- <img @click="doCopy" class="options-icon" src="@/assets/images/copy.svg" />
        <img v-if="clipConfig" @click="doPaste" class="options-icon" src="@/assets/images/paste.svg" /> -->
      </div>
      <!-- <img @click="showCreate" class="options-icon" src="@/assets/images/plus.svg" /> -->
    </div>
    <div class="options-property-content">
      <div class="options-property-item">
        <div class="options-property-title">__id:</div>
        <div class="options-property-input"><input type="text" :value="target.__id"/></div>
      </div>
      <div class="options-property-item">
        <div class="options-property-title">组件类型:</div>
        <div class="options-property-input"><input type="text" :value="target.type" @input="doUpdateProp($event.target.value, target, 'type')" /></div>
      </div>
      <div class="options-property-item">
        <div class="options-property-title">组件名字:</div>
        <div class="options-property-input"><input type="text" :value="target.name" @input="doUpdateProp($event.target.value, target, 'name')" /></div>
      </div>
      <div class="options-property-item">
        <div class="options-property-title">Class:</div>
        <div class="options-property-input"><input type="text" :value="target.class" @input="doUpdateProp($event.target.value, target, 'class')" /></div>
      </div>
      <div class="options-property-item" v-if="!isContainer">
        <div class="options-property-title">value:</div>
        <div class="options-property-input"><textarea class="value-content" :value="target.value" @input="doUpdateProp($event.target.value, target, 'value')"></textarea></div>
      </div>
      <div class="options-property-item" v-for="(value, key) in configList" :key="key">
        <div class="options-property-config-title">{{value}}:</div>
        <div class="options-property-config-input"><input type="text" :value="isObject(target.config[value]) ? JSON.stringify(target.config[value]) : target.config[value]" @input="doUpdateProp($event.target.value, target, 'config.' + value)" /></div>
        <img @click="doRemoveProp(target, 'config.' + value)" class="options-icon" src="@/assets/images/remove.svg" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, inject, watch, computed } from "@vue/runtime-core"
import { checkContainer } from "../../../../constant/components"
import { doUpdateProp, doRemoveProp, doCreateProp } from '@/utils/crud'
// import prompt from '../../../prompt'

const isObject = (val) => val !== null && typeof val === 'object';

const props = defineProps({
  target: Object
})

const isContainer = computed(() => checkContainer(props.target.type))

const configs = computed(() => proxy[props.target.type] ? propsTree(proxy[props.target.type]) : {})
const instance = getCurrentInstance()
const proxy = instance.appContext.components

const configList = computed(() => {
  const keys = Object.keys(configs.value).map(value => toLine(value))
  return keys
})

function toLine(name) {
  return name.replace(/([A-Z])/g,"-$1").toLowerCase();
}

function propsTree(proxy) {
  if (proxy.extends) {
    return Object.assign({}, proxy.props, propsTree(proxy.extends))
  }
  return Object.assign({}, proxy.props)
}

const clipConfig= inject('clip_config')

const doCopy = (config) => { clipConfig.value = config }
const doPaste = () => { doUpdateProp(clipConfig.value, props.target, 'config') }

const showCreate = () => {
  // prompt({
  //   title: '添加属性',
  //   label: '属性名称:',
  //   value: 'tab',
  //   inputAttrs: {
  //     type: 'text'
  //   },
  //   type: 'input'
  // }).then(input => {
  //   if (!(input in props.target.config)) {
  //     doCreateProp('', props.target, `config.${input}`)
  //   }
  // }).catch(console.error)
}
</script>