const actions = {}

export const createActions = (__id, acts) => {
  actions[__id] = {
    actions: acts
  }
}

export const changeAction = (__id, name) => {
  actions[__id].current && actions[__id].current.stop()
  actions[__id].current = actions[__id].actions[name]
  actions[__id].current.play()
}