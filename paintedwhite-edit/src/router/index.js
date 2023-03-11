import { createRouter, createWebHashHistory } from "vue-router";
import Display from '../pages/display.vue'
import Process from '../pages/process.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    name: 'display',
    component: Display
  }, {
    path: '/',
    name: 'process',
    component: Process
  }]
})