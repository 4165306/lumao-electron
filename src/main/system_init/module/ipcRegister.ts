import { ipcMain } from 'electron'
import Events from '../../controllers/events'
import Runner from '../../runner'
export default function registerIpcHandler() {
  ipcMain.handle('run:task', (_, browserType, browserId, task) =>
    Runner.main(browserId, browserType, task)
  )
  ipcMain.handle('events:logger', (_, message: string) => {
    Events.log(message)
  })
}
