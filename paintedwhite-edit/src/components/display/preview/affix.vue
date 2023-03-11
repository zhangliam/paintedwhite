<template>
  <div class="preview-affix">
    <div class="preview-affix-button">
      <img @click="onTrigger" class="preview-affix-icon" src="@/assets/images/component.svg" />
    </div>
    <div v-if="isShow" class="preview-affix-components">
      <div class="preview-affix-components-group" v-for="(value, name) in componentList" :key="name">
        <div class="preview-affix-components-name" @click.stop="triggerExpand(value)">
          {{name}}
          <img v-if="!value.isExpand" class="options-icon" src="@/assets/images/plus-o.svg" />
          <img v-else class="options-icon" src="@/assets/images/min-o.svg" />
        </div>
        <template v-if="value.isExpand">
          <div class="preview-affix-components-kind" v-for="(kind, key) in value" :key="key">
            <div class="preview-affix-components-kind-title" @click.stop="triggerExpand(kind)">{{kind.label}}
              <img v-if="!kind.isExpand" class="options-icon" src="@/assets/images/plus-o.svg" />
              <img v-else class="options-icon" src="@/assets/images/min-o.svg" />
            </div>
            <template v-if="kind.isExpand">
              <div class="preview-affix-components-kind-group">
                <div v-for="(item, index) in kind.children" :key="index" @click="doCreate(item)" :class="['preview-affix-components-item', 'preview-affix-order-'+(index % 4)]">{{item.label}}</div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import { components, checkContainer } from "../../../constant/components";
import { doPushProp } from "../../../utils/crud";
import { generate } from 'shortid'

const componentList = ref(components)

const isShow = ref(false)
const onTrigger = () => {
  isShow.value = !isShow.value
}

const triggerExpand = (group) => {
  group.isExpand = !group.isExpand
}

const layer = inject('layer')
const page = inject('page')
const doCreate = (model) => {
  const { template } = model
  const newLayer = {
    __id: generate(),
    type: template,
    config: {},
    style: {},
    class: '',
    include: ['normal'],
    status: ['normal'],
    components: [],
    value: ''
  }
  if (!checkContainer(template)) {
    delete newLayer.status
  }
  if (layer.value) {
    if (checkContainer(layer.value.type)) {
      doPushProp(newLayer, layer.value, 'components')
    }
  } else {
    doPushProp(newLayer, page.value, 'components')
  }
}
</script>

<style lang="less">
.preview-affix {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 30px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;


  &-button {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-icon {
    width: 24px;
    height: 24px;
    cursor:pointer;
  }

  &-components {
    position: absolute;
    right: 35px;
    width: 240px;
    background-color: #ffffff;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    max-height: 520px;
    overflow-y: scroll;
    border: 1px solid #dddddd;
    box-shadow: 0 2px 5px 4px rgba(60,60,60,0.1);
    padding: 0 8px 8px;

    &-name {
      width: 100%;
      padding: 6px 0;
      font-weight: 600;
      color: #8186D5;
      border-bottom: 1px solid #C6CBEF;
    }

    &-kind {
      &-title {
        width: 100%;
        padding: 5px 0;
        border-bottom: 1px solid #e7e7e7;
      }

      &-group {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
      }
    }

    &-item {
      width: 55px;
      height: 55px;
      border-bottom: 1px solid #e7e7e7;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      cursor:pointer;
    }
  }

  &-order-0 {
    border-left: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
  }

  &-order-1 {
    border-right: 1px solid #e7e7e7;
  }

  &-order-2 {
    border-right: 1px solid #e7e7e7;
  }

  &-order-3 {
    border-right: 1px solid #e7e7e7;
  }
}
</style>
