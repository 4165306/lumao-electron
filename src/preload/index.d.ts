import { ElectronAPI } from '@electron-toolkit/preload'
import routers from '../routers'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof routers
  }
}
