import { BrowserWindow } from 'electron'
export function sendToRenderer(message: string) {
  const win = BrowserWindow.getAllWindows()[0]
  console.log('获取到的win', win)
  if (win && !win.isDestroyed()) {
    win.webContents.send('logger', message)
  }
}
