export const jsonParse = (str) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}