<template>
  <!-- <div class="options-item">
    <div class="options-property-header">
      <div class="options-property-header-title">动画
        <img v-if="clipAnimation" @click="doPaste" class="options-icon" src="@/assets/images/paste.svg" />
      </div>
      <img v-if="target.__id" @click="showCreateProp" class="options-icon" src="@/assets/images/plus.svg" />
    </div>
    <div class="options-property-content">
      <div class="animation-item" v-for="(group, index) in computedAnimations" :key="index">
        <div class="animation-group">
          <div class="group-title">{{group.eventType}}:
            <img @click="doCopy(group)" class="options-icon" src="@/assets/images/copy.svg" />
          </div>
          <div>
            <img @click="doRemove(group)" class="options-icon" src="@/assets/images/remove.svg" />
          </div>
        </div>
        <div class="options-property-content">
          <div class="options-property-item">
            <div class="animation-title">边界条件:</div>
            <div class="options-property-input"><input type="text" :value="group.exitExpression" @input="doUpdateProp($event.target.value, group, 'exitExpression')" /></div>
          </div>
          <div class="options-property-item">
            <div class="animation-title">参数列表:</div>
            <img @click="doPasteProp(group)" v-if="clipAnimationProp" class="options-icon" src="@/assets/images/paste.svg" />
            <img @click="doCreateProp(group)" class="options-icon animation-options-prop" src="@/assets/images/plus.svg" />
          </div>
          <div class="animation-prop-content">
            <AnimationProp v-for="(prop, key) in group.props" :key="key" :parent="group" :item="prop"></AnimationProp>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup>
import { computed, inject } from 'vue'
import { doUpdateProp, doCreateProp } from '@/utils/crud'
import AnimationProp from './animation/prop.vue'
// import prompt from '../../../prompt'

const props = defineProps({
  target: Object
})

const computedAnimations = computed(() => {
  return props.target.animations || []
})

const clipAnimation = inject('clip_animation')
const clipAnimationProp = inject('clip_animation_prop')
const doCopy = (animation) => {clipAnimation.value = animation}
const doPaste = () => {}
const showCreateProp = () => {
  // prompt({
  //   title: '添加动画',
  //   label: '动画名称:',
  //   value: 'fadeIn',
  //   inputAttrs: {
  //     type: 'text'
  //   },
  //   type: 'input'
  // }).then(input => { console.log(`input == ${input}`) }).catch(console.error)
}
const doRemove = () => {}
const doPasteProp = () => {}
const showCreatePropProp = () => {}
</script>

<style>
.animation-item {
  padding: 0 5px;
}

.animation-group {
  display: flex;
  justify-content: space-between;
  height: 30px;
  padding: 5px 0 0 5px;
  border-bottom: 1px solid #C6CBEF;
  align-items: center;
}

.animation-title {
  width: 60px;
  text-align: right;
  color: #9F9F9F;
}

.animation-options-prop {
  position: absolute;
  right: 5px;
}

.animation-prop-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

.animation-prop-content {
  padding: 0 0 5px 0;
  border: 1px #f2f2f2 solid;
}
</style>
