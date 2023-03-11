import {
  provide,
  watch,
  ref,
  inject,
  computed
} from 'vue'
import { BaseObject, dataItem, dataOrigin, dataStyle, dataClass, dataChildren, dataElements, dataAnimations, dataWorkFlows, dataSource, injectAppData, insertOrUpdate } from '@ergat3/core'

export class Page extends BaseObject {

  constructor (props, ctx, type = 'page') {
    super(props, ctx, type)

    let self = this
    const style = {}
    self[dataStyle] = ref(style)
    const cls = []
    self[dataClass] = ref(cls)
  
    this.computedStyle = computed(() => self[dataItem].value ? self[dataItem].value.style : self[dataStyle].value)
    this.computedClass = computed(() => (self[dataClass].value || []).concat(self[dataItem].value ? (self[dataItem].value.class || []) : []))

    self[dataChildren] = ref([])
    this.dataStatus = ref('normal')

    this.computedComponents = computed(() => {
      return self[dataItem].value.components || []
    })

    this.computedOrigin = computed(() => Object.assign({}, self[dataOrigin].value, self[injectAppData]))

    const animations = {}
    const workflows = {}

    self[dataAnimations] = ref(animations)
    self[dataWorkFlows] = ref(workflows)
    self[dataElements] = inject('elements')

    this.isActive = ref(true)

    provide('animations', self[dataAnimations].value)
    provide('workflows', self[dataWorkFlows].value)
    provide('page', this)
    watch(() => props.dataSource, (val, old) => {
      this.isActive.value = false
      
      setTimeout(() => {
        this.pageInitialized(val)
        this.isActive.value = true
      }, 10);
    })
  }

  onPageInitialize = this.pageInitialized.bind(this)
  pageInitialized (config) {
    let self = this
    self[dataElements][config.__id] = this
    self[dataElements][config.name] = this
    self[dataElements]['page'] = self[dataElements]['root'] = this
    self[dataItem].value = config
    self[dataStyle].value = config.style || {}
    self[dataClass].value = config.class || []
    this.dataStatus.value = self[dataItem].value.status[0];
  }

  setData = (function (newValue) {
    let self = this
    insertOrUpdate(self[dataSource].value, newValue)
    return this
  }).bind(this)

  setStyle = (function (newStyle) {
    let self = this
    insertOrUpdate(self[dataStyle].value, newStyle)
    return this
  }).bind(this)

  setClass = (function (classNames) {
    let self = this
    self[dataClass].value = classNames
    return this
  }).bind(this)

  setStatus = (function (newStatus) {
    let self = this
    this.dataStatus.value = newStatus
    return this
  }).bind(this)
}