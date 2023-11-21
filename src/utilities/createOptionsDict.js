import { optionsMap } from './utilities.js'

export const createDict = (keyValueString) => {
  const object = {}
  let key = ''
  let value = ''
  keyValueString.forEach((keyValue) => {
    if (keyValue !== '') {
      [key, value] = keyValue.split(':')
      object[optionsMap[key]] = value
    }
  }
  )
  return object
}
