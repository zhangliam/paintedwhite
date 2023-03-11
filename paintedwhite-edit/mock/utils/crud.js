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

function createProp (value, target, prop) {
  let { node, key } = findLastNode(target, prop)
  node[key] = value
}

function removeProp (target, prop) {
  let { node, key } = findLastNode(target, prop)
  delete node[key]
}

function updateProp (value, target, prop) {
  let { node, key } = findLastNode(target, prop)
  node[key] = value
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

export const doCreateProp = throttle(updateProp, 200)
export const doRemoveProp = throttle(removeProp, 200)
export const doUpdateProp = throttle(updateProp, 200)