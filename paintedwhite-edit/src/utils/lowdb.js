export const findOneById = (field, id) => {
  return (window.db.get(field).find({id}).value() || {}).data
}

export const insertOrUpdateById = (field, id, data) => {
  let history = window.db.get(field).find({id}).value()
  if (history) {
    window.db.get(field).find({id}).assign({data}).write()
  } else {
    window.db.get(field).push({id, data}).write()
  }
}
