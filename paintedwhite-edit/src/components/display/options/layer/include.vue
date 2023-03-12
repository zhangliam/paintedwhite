<template>
  <div class="options-item">
    <div class="options-property-header">
      <div class="options-property-header-title">所属状态
       <!--  <img v-if="includes.length" @click="doCopyList" class="options-icon"
          src="@/assets/images/copy.svg" />
        <img v-if="clipInclude" @click="doPaste" class="options-icon"
          src="@/assets/images/paste.svg" /> -->
      </div>
      <!-- <img @click="showCreate" class="options-icon"
        src="@/assets/images/plus.svg" /> -->
    </div>
    <div class="options-property-content">
      <div class="status-input-active" v-for="(value, key) in includes" :key="key">
        {{value}}
        <!-- <div class="options-property-controller">
          <img @click.stop="doCopy(value)" class="options-icon"
            src="@/assets/images/copy.svg" />
          <img @click.stop="doPullProp(value, target, 'include')" class="options-icon"
            src="@/assets/images/close.svg" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { doUpdateProp, doPushProp, doPullProp } from '@/utils/crud'
// import prompt from '../../../prompt'

const props = defineProps({
  target: Object
})

const includes = computed(() => {
  return props.target.include || []
})

const clipInclude = inject('clip_include')
const clipIncludeList = inject('clip_include_list')
const doCopy = (include) => {
  clipInclude.value = include
  clipIncludeList.value = null
}
const doCopyList = () => {
  clipIncludeList.value = props.target.include
  clipInclude.value = null
}
const doPaste = () => {
  if (clipIncludeList.value) {
    doUpdateProp(clipIncludeList.value, props.target, 'include')
  } else {
    doPushProp(clipInclude.value, props.target, 'include')
  }
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
  //   if (props.target.include.indexOf(input) == -1) {
  //     doPushProp(input, props.target, 'include')
  //   }
  // }).catch(console.error)
}
</script>