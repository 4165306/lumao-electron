import { ipcMain } from 'electron'
import Dex from '../controllers/dex'
import Events from '../controllers/events'
export default function registerIpcHandler() {
  ipcMain.handle('dex:okx', (_, chain: string, fromToken: string, toToken: string) =>
    Dex.okx(chain, fromToken, toToken)
  )
  ipcMain.handle('events:logger', (_, message: string) => {
    console.log('收到消息', message)
    Events.log(message)
  })
}
