import { ipcRenderer } from 'electron/renderer'
export default {
  onLogger: (callback) => ipcRenderer.on('logger', (_event, value) => callback(value))
}
