import { BrowserWindow } from 'electron'
export function sendToRenderer(message: string) {
  const win = BrowserWindow.getAllWindows()[0]
  if (win && !win.isDestroyed()) {
    win.webContents.send('logger', message)
  }
}
