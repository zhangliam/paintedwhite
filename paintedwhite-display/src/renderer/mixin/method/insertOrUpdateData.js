import Vue from 'vue'
/**
 * @class insertOrUpdateData
 */
export default {
  name: 'insertOrUpdateData',
  methods: {
    insertOrUpdateData (item, obj) {
      let {key, value} = obj
      if (!key || !value) {
        for (key in obj) {
          if (!item[key]) {
            Vue.set(item, key, obj[key])
          } else {
            item[key] = obj[key]
          }
        }
      } else {
        if (!item[key]) {
          Vue.set(item, key, value)
        } else {
          item[key] = value
        }
      }
    },
  }
}