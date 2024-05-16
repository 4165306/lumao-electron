import { ipcRenderer } from 'electron/renderer'
import { BrowserType } from './../../renderer/src/interfaces/chain'

const tryIpcRendererFunc = (channel: string, ...args: unknown[]) => {
  try {
    return ipcRenderer.invoke(channel, ...args)
  } catch (e: unknown) {
    return (e as Error).message
  }
}

export default {
  events: {
    logger: (message: string) => tryIpcRendererFunc('events:logger', message),
    runTask: (browserType: BrowserType, browserId: string, task) =>
      tryIpcRendererFunc('run:task', browserType, browserId, task)
  }
}
