import { ipcMain } from 'electron'
import Events from '../../controllers/events'
import Runner from '../../runner'
export default function registerIpcHandler() {
  ipcMain.handle('run:task', (_, message, type) => Runner.main(message, type))
  ipcMain.handle('events:logger', (_, message: string) => {
    console.log('收到消息', message)
    Events.log(message)
  })
}
