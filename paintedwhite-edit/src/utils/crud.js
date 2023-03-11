import mitt from './mitt'
import { insertOrUpdateById } from './lowdb'
import { jsonParse } from './json'

let page

export const changePage = (value) => {
  page = value
}

Array.prototype.pull = function(b) {
  var a = this.indexOf(b)
  if (a >= 0) {
    this.splice(a, 1)
  }
  return this
}

const undo = []
const redo = []

mitt.on('undo', (e) => {
  undo.push(e)
})

mitt.on('redo', (e) => {
  redo.push(e)
})

function throttle (fn, wait) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(function() {
      fn.apply(context, args);
      timer = null;
    }, wait)
  }
}

function createProp (value, target, prop, isEmit = true) {
  let { node, key } = findLastNode(target, prop)
  isEmit && mitt.emit('undo', {command: 'create', target, prop, newValue: value})
  mitt.emit('update_prop', {command: 'create', target: target.__id, prop, newValue: value})
  mitt.emit(page, true)
  node[key] = jsonParse(value)
}

function removeProp (target, prop, isEmit = true) {
  let { node, key } = findLastNode(target, prop)
  isEmit && mitt.emit('undo', {command: 'remove', target, prop, oldValue: node[key]})
  mitt.emit('update_prop', {command: 'remove', target: target.__id, prop, oldValue: node[key]})
  mitt.emit(page, true)
  delete node[key]
}

function updateProp (value, target, prop, isEmit = true) {
  let { node, key } = findLastNode(target, prop)
  isEmit && mitt.emit('undo', {command: 'update', target, prop, oldValue: node[key], newValue: value})
  mitt.emit('update_prop', {command: 'update', target: target.__id, prop, oldValue: node[key], newValue: value})
  mitt.emit(page, true)
  node[key] = jsonParse(value)
}

function pushProp (value, target, prop, isEmit = true) {
  let { node, key } = findLastNode(target, prop)
  let oldValue = node[key].concat([])
  isEmit && mitt.emit('undo', {command: 'update', target, prop, oldValue, newValue: node[key].concat([value])})
  mitt.emit('update_prop', {command: 'update', target: target.__id, prop, oldValue, newValue: node[key].concat([value])})
  mitt.emit(page, true)
  node[key].push(value)
}

function pullProp (value, target, prop, isEmit = true) {
  let { node, key } = findLastNode(target, prop)
  let oldValue = node[key].concat([])
  let newValue = node[key].concat([]).pull(value)
  isEmit && mitt.emit('undo', {command: 'update', target, prop, oldValue, newValue})
  mitt.emit('update_prop', {command: 'update', target: target.__id, prop, oldValue, newValue})
  mitt.emit(page, true)
  node[key].pull(value)
}

function findLastNode(target, prop) {
  let keys = prop.split('.')
  let lastKey
  while (keys.length > 1) {
    lastKey = keys.shift()
    if (!target[lastKey]) {
      target[lastKey] = {}
    }
    target = target[lastKey]
  }
  let key = keys.shift()
  return { node: target, key }
}

export const doCreateProp = throttle(createProp, 200)
export const doRemoveProp = throttle(removeProp, 200)
export const doUpdateProp = throttle(updateProp, 200)
export const doPushProp = throttle(pushProp, 200)
export const doPullProp = throttle(pullProp, 200)

function setOrigin (value, target, refObject, isEmit = true) {
  let newValue
  try {
    JSON.parse(value)
    newValue = value
  } catch (e) {
    return
  }
  let oldValue = refObject.value
  isEmit && mitt.emit('undo', {command: 'update_origin', target, refObject, oldValue, newValue})
  mitt.emit('update_origin', {command: 'update', target: target.__id, oldValue, newValue})
  insertOrUpdateById('origin', target.__id, newValue)
  refObject.value = newValue
}

function setRow (value, target, refObject, isEmit = true) {
  let newValue
  try {
    JSON.parse(value)
    newValue = value
  } catch (e) {
    return
  }
  let oldValue = refObject.value
  isEmit && mitt.emit('undo', {command: 'update_row', target, refObject, oldValue, newValue})
  mitt.emit('update_row', {command: 'update', target: target.__id, oldValue, newValue})
  insertOrUpdateById('row', target.__id, newValue)
  refObject.value = newValue
}

function setStatus (value, target, refObject, isEmit = true) {
  let oldValue = refObject.value
  let newValue = value
  isEmit && mitt.emit('undo', {command: 'update_status', target, refObject, oldValue, newValue})
  mitt.emit('update_status', {command: 'update', target: target.__id, oldValue, newValue})
  insertOrUpdateById('status', target.__id, newValue)
  refObject.value = newValue
}
export const doSetOrigin = throttle(setOrigin, 200)
export const doSetRow = throttle(setRow, 200)
export const doSetStatus = throttle(setStatus, 200)

export const executeUndoAction = () => {
  if (undo.length < 1) return
  const action = undo.pop()
  console.log(`UNDO:`, action)
  const {command, target, refObject, prop, oldValue } = action
  switch (command) {
    case 'create':
      doRemoveProp(target, prop, false)
      break
    case 'update':
      doUpdateProp(oldValue, target, prop, false)
      break
    case 'remove':
      doCreateProp(oldValue, target, prop, false)
      break
    case 'update_origin':
      insertOrUpdateById('origin', target.__id, oldValue)
      refObject.value = oldValue
      break
    case 'update_row':
      insertOrUpdateById('row', target.__id, oldValue)
      refObject.value = oldValue
      break
    case 'update_status':
      insertOrUpdateById('status', target.__id, oldValue)
      refObject.value = oldValue
      break
  }
  redo.push(action)
}
export const executeRedoAction = () => {
  if (redo.length < 1) return
  const action = redo.pop()
  console.log(`REDO: `, action)
  const {command, target, refObject, prop, newValue } = action
  switch (command) {
    case 'create':
      doCreateProp(newValue, target, prop, false)
      break
    case 'update':
      doUpdateProp(newValue, target, prop, false)
      break
    case 'remove':
      doRemoveProp(target, prop, false)
      break
    case 'update_origin':
      insertOrUpdateById('origin', target.__id, newValue)
      refObject.value = newValue
      break
    case 'update_row':
      insertOrUpdateById('row', target.__id, newValue)
      refObject.value = newValue
      break
    case 'update_status':
      insertOrUpdateById('status', target.__id, newValue)
      refObject.value = newValue
      break
  }
  undo.push(action)
}