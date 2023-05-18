<template>
  <div class="sider-page">
    <!-- <div class="sider-page-controller" @click="showCreate">
      <img class="sider-page-plus" src="@/assets/images/plus.svg" type="image/svg+xml" />
      创建新页面
    </div> -->
     <div class="sider-page-controller">页面</div>
    <draggable tag="ul" class="list sider-page-list" :list="pages">
      <BoxPage v-for="(item, index) in pages" :key="item.__id" :item="item" :red="90 + index * 5" :green="130"></BoxPage>
    </draggable>
  </div>
</template>

<script setup>
  import { inject, watch  } from '@vue/runtime-core'
  import BoxPage from './box/page.vue'
  import { VueDraggableNext as draggable } from 'vue-draggable-next'
  // import prompt from '../../prompt'

  const { path, ipcRenderer } = window
  const pages = inject('pages')
  const config = inject('config')
  const filePath = inject('filePath')
  let defaultSelectedPage = inject('page')

  /* 同步渲染 */ 
  // defaultSelectedPage.value = pages.value[0]
  
  watch(pages, () => {
    const { length } = pages.value
    // 默认选中首个渲染数据
    length && (defaultSelectedPage.value = pages.value[0])
  })

  const showCreate = () => {
    if (filePath.value) {
      ipcRenderer.send('CREATE_PAGE', filePath.value)
    }
  }

</script>

<style lang="less">
.sider {
  &-page {
    height: 50%;
    position: relative;

    &-controller {
      padding-left: 10px;
      height: 36px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e7e7e7;
      background-color: #ffffff;
    }

    &-plus {
      width: 18px;
      height: 18px;
      margin: 5px;
      cursor: pointer;
    }

    &-list {
      width: 100%;
      padding: 0px;
      margin: 0px;
      position: absolute;
      top: 36px;
      bottom: 0px;
      overflow: scroll;
    }
  }
}
</style>
