import Pako from 'pako'
import { createDict } from './createOptionsDict.js'
export const decodeSlotInfo = (slotInfo) => {
  // Decode slotinfo
  const base64String = slotInfo
  const binary = atob(base64String)
  const stringBinary = binary.toString()
  const charData = stringBinary.split('').map(function (x) { return x.charCodeAt(0) })
  const binData = new Uint8Array(charData)
  const binDataUnzip = Pako.ungzip(binData)
  const readableData = String.fromCharCode.apply(null, new Uint16Array(binDataUnzip)).slice(3, -1)
  const slotInfoObject = JSON.parse(readableData)
  const slotInfoObjectFormatted = slotInfoObject.map((slot) => {
    slot.profileId = slot['profileInfo.id']
    delete slot['profileInfo.id']
    return slot
  })
  return slotInfoObjectFormatted
}

export const decodeOptions = (options) => {
  // Decode options

  const base64String = options
  const firstDecode = atob(base64String)
  const charData = firstDecode.split('').map(function (x) { return x.charCodeAt(0) })
  const binDataUnzip = Pako.inflate(charData, { to: 'string' })
  const filterInvalidChar = binDataUnzip.replace(/[^A-Za-z0-9\+\/\=]/g, '')
  const secondDecode = atob(filterInvalidChar).slice(2)
  const stringList = secondDecode.split(/[\x00\x00\x00\x03\x00\x00\x00\x05\x06\x00\x00\x00\x04\x00\x00\x00\x1B\b]+/)
  const optionsObject = createDict(stringList)

  // var doneOnce
  // if (!doneOnce) {
  //  console.log("DECODEDBASE64", optionsObject)
  // doneOnce = true
  // }
  return optionsObject
}
