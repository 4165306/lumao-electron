import { ipcRenderer } from 'electron/renderer'

const tryIpcRendererFunc = (channel: string, ...args: string[]) => {
  try {
    return ipcRenderer.invoke(channel, ...args)
  } catch (e: unknown) {
    return (e as Error).message
  }
}

export default {
  dex: {
    okx: (chain: string, fromToken: string, toToken: string) =>
      tryIpcRendererFunc('dex:okx', chain, fromToken, toToken)
  }
}
