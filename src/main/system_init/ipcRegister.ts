import { ipcMain } from 'electron'
import Dex from '../controllers/dex'
export default function registerIpcHandler() {
  ipcMain.handle('dex:okx', (_, chain: string, fromToken: string, toToken: string) =>
    Dex.okx(chain, fromToken, toToken)
  )
}
