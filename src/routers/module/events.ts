import { ipcRenderer } from 'electron/renderer'

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
    runTask: (taskQueue, type) => tryIpcRendererFunc('run:task', taskQueue, type)
  }
}
