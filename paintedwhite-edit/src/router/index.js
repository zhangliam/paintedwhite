import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Display from '../pages/display.vue'
import Process from '../pages/process.vue'

export const router = createRouter({
  history: createWebHistory(),
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

export const routes = [
  {
    path: '/',
    name: 'display',
    component: Display
  }, {
    path: '/process',
    name: 'process',
    component: Process
  }
]