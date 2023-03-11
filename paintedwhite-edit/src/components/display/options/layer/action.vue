<template>
  <div class="options-item">
    <div class="options-property-header">
      <div class="options-property-header-title">动作
      </div>
    </div>
    <div class="options-property-content">
      <div class="status-input" @click="changeAction(value)" v-for="(value, key) in actions" :key="key">
        {{value}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
// import { doUpdateProp, doPushProp, doPullProp } from '@/utils/crud'
// import prompt from '../../../prompt'
import mitt from '@/utils/mitt'

const props = defineProps({
  target: Object
})

const injectActions = inject('actions')
const actions = computed(() => injectActions.value[props.target.__id] || [])

const changeAction = (action) => {
  mitt.emit('update_action', JSON.stringify({
    target: props.target.__id,
    action
  }))
}

</script>