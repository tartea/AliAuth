const { clipboard } = require('electron')


export function writeText(dataStr = "") {
  clipboard.writeText(dataStr)
}
export function readImage() {
 return clipboard.readImage()
}
