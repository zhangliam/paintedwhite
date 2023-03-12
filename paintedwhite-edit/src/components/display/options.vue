<template>
  <div class="options">
    <div class="options-title">设置</div>
    <OptionPage v-if="!target.type" :target="target"></OptionPage>
    <OptionLayer :target="target"></OptionLayer>
   <!--  <OptionAction :target="target"></OptionAction>
    <OptionMock :target="target"></OptionMock> -->
  </div>
</template>

<script setup>
  
import OptionPage from './options/page.vue'
import OptionLayer from './options/layer.vue'


import OptionMock from './options/mock.vue'
import OptionAction from './options/action.vue'
import { computed, inject } from '@vue/runtime-core'

const page = inject('page')
const layer = inject('layer')
const target = computed(() => (layer.value || page.value || {}))
</script>

<style lang="less">
.options {
  width: 20%;
  height: 100%;
  background-color: #FFFFFF;
  border-left: 1px solid #CCC;
  position: relative;
  overflow-y: scroll;

  &-title {
    padding-left: 5px;
    height: 36px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #aaa;
  }

  &-property {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      padding: 5px;
      border-bottom: 1px solid #C6CBEF;
      background: #ffffff;
      position: sticky;
      top: 0;

      &-title {
        color: #8186D5;
        margin-right: 5px;
        display: flex;
        align-items: center;
      }
    }

    &-content {
      padding: 5px 0;
    }

    &-item {
      display: flex;
      flex-direction: row;
      padding-top: 5px;
      align-items: center;
    }

    &-title {
      width: 60px;
      text-align: right;
      color: #9F9F9F;
    }

    &-input {
      border-radius: 5px;
      border: 1px solid #E3E7F1;
      padding: 3px 0;
      margin-left: 5px;

      input {
        border: none;
      }
    }

    &-config {
      &-title {
        width: 110px;
        text-align: right;
        color: #9F9F9F;
      }

      &-input {
        border-radius: 5px;
        border: 1px solid #E3E7F1;
        padding: 3px 0;
        margin-left: 5px;

        input {
          border: none;
          width: 80px;
        }
      }
    }
  }

  &-icon {
    width: 13px;
    height: 13px;
    margin-left: 5px;
    margin-right: 0px;
    cursor:pointer;

    &-left {
       width: 13px;
      height: 13px;
      margin-left: 0px;
      margin-right: 5px;
    }
  }

  textarea {
    border: none;
    outline: none;
    resize: none;
    width: 160px;
  }
}
</style>
