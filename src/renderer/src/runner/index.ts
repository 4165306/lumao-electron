import { RunnerConfigType } from './../interfaces/task'
import { BrowserCache } from './modules/browser'

export default class Runner {
  private static isRunning: boolean = false

  public static async main(config: RunnerConfigType) {
    let browserId: string
    try {
      browserId = (await BrowserCache.getBrowser(config.browserType)).open_id
    } catch (e) {
      return (e as Error).message
    }
    window.api.sendEvents.events.runTask(config.browserType, browserId, '')
  }

  public static async stop() {
    this.isRunning = false
  }
}
