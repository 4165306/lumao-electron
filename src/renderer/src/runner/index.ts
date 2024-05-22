import Sys from '@renderer/helper/sys'
import { RunnerConfigType } from './../interfaces/task'
import { BrowserCache } from './modules/browser'
import { ChainNetworkType } from '@renderer/interfaces/chain'
import Arr from '@renderer/helper/arr'
import { chainDexMapping } from '@renderer/config/mapping'

export default class Runner {
  private static isRunning: boolean = false

  public static async main(config: RunnerConfigType) {
    if (config.chains.length < 1) {
      window.api.sendEvents.events.logger('未选择交互链')
      return
    }
    this.isRunning = true
    let nextRunTime = new Date().getTime()
    while (this.isRunning) {
      await Sys.sleep(1000)
      if (!this.isRunning) {
        break
      }
      if (new Date().getTime() < nextRunTime) {
        continue
      }
      const minutes = 60 * 1000
      nextRunTime =
        new Date().getTime() +
        Math.floor(Math.random() * (30 * minutes - 10 * minutes)) +
        10 * minutes
      window.api.sendEvents.events.logger('下次运行时间:' + new Date(nextRunTime).toLocaleString())
      let browserId: string
      try {
        browserId = (await BrowserCache.getBrowser(config.browserType)).open_id
      } catch (e) {
        window.api.sendEvents.events.logger((e as Error).message)
        continue
      }
      const chains = config.chains.map((item: ChainNetworkType) => {
        return {
          chain: item,
          weight: config.networkTokenConfig[item].weight
        }
      })
      let id = 0
      try {
        id = Arr.randByField(chains, 'weight')
      } catch (e) {
        window.api.sendEvents.events.logger((e as Error).message)
        break
      }
      console.log('chains', chains, id)
      // 随机链 dex nextRunTime
      const chain = chains[id].chain
      const dex = Arr.randArray(chainDexMapping[chain].dex)
      // 执行
      window.api.sendEvents.events.runTask(config.browserType, browserId, {
        chain,
        dex,
        tokens: config.networkTokenConfig
      })
    }
    window.api.sendEvents.events.logger('停止成功')
  }

  public static async stop() {
    window.api.sendEvents.events.logger('正在停止中...')
    this.isRunning = false
  }
}
