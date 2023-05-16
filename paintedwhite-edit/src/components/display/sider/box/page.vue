<template>
  <li :class="['box', isActive]" @click="doClick"
    :style="'background-color: rgba(' + red + ',' + green + ', 213, 0.2)'">
    <div class="box-item">
      <div v-if="!editName" ref="title" class="box-title" @dblclick="onDBClick">{{item.name}}</div>
      <!-- <input v-if="editName" ref="titleInput" type="text" class="box-title" :value="item.name" @blur="onBlur"/> -->
      <!-- <div class="box-controller">
        <img v-if="editable" @click.stop="doSave" class="options-icon" src="@/assets/images/save.svg" />
        <img @click.stop="doCopy" class="options-icon" src="@/assets/images/copy.svg" />
        <img @click.stop="doRemove" class="options-icon" src="@/assets/images/remove.svg" />
      </div> -->
    </div>
  </li>
</template>

<script setup>
import { computed, ref } from "@vue/reactivity"
import { inject, watch } from "@vue/runtime-core"
import mitt from '@/utils/mitt'
import { changePage } from "@/utils/crud"
const beautify = require('js-beautify').js
const { path, ipcRenderer } = window




const props = defineProps({
  item: Object,
  red: Number,
  green: Number
})

// const page = inject('page')
const config = inject('config')
const filePath = inject('filePath')
const isActive = computed(() => {
  return props.item == defaultSelectedPage.value ? 'box-active' : ''
})
const editName = ref(false)
const editable = ref(false)

const pages = inject('pages')
const defaultSelectedPage = inject('page')
/* 同步渲染 */ 
defaultSelectedPage.value = pages.value[0]
changePage(defaultSelectedPage)
// watch(pages, () => {
//   const { length } = pages.value
//   // 默认选中首个渲染数据
//   length && (defaultSelectedPage.value = pages.value[0])
// })


mitt.on(props.item.__id, (status) => {
  editable.value = status
})

const doClick = () => {
  // page.value = props.item
  // changePage(props.item.__id)
}
const onDBClick = () => {
  // editName.value = true
}
const onBlur = (e) => {
  // props.item.name = e.target.value
  // editName.value = false
  // editable.value = true
}
const doSave = () => {
  let files = [{
    file: path.join(filePath.value, config.value.pages[props.item.__id].name),
    data: beautify(
      JSON.stringify(props.item),
      {
        indent_size: 2,
        space_in_empty_paren: true
      }
    )
  }]
  ipcRenderer.send('WRITE_FILE', files)

  editable.value = false
}


</script>

<style lang="less">
.box {

  &-active {
    color: #ffffff;
    background-color: #C6CBEF!important;
  }

  &-controller {
    padding: 0 5px;
    display: flex;
    align-items: center;
  }

  &-title {
    width: 70%;
  }
}

</style>
