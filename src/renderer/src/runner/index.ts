import { BrowserConfigureType, ChainNetworkType, ConfigResultType } from './../interfaces/chain'
import Arr from './../helper/arr'
import { chainDexMapping } from './../config/mapping'
import Sys from '@renderer/helper/sys'

export default class Runner {
  private static isRunning: boolean = false

  private static nextRunTime: number = new Date().getTime()

  public static async main(options: {
    config: ConfigResultType
    browsers: BrowserConfigureType[]
  }) {
    const { config, browsers } = options
    this.isRunning = true
    this.nextRunTime = new Date().getTime() - 1
    while (this.isRunning) {
      const now = new Date().getTime()
      if (now < this.nextRunTime) {
        await Sys.sleep(1000)
        continue
      }
      if (!this.isRunning) {
        break
      }
      try {
        window.api.sendEvents.events.logger('正在生成任务')
        const browserIdx = await this.getRandomBrowser(browsers)
        config.networks
        // const randChain = Obj.getRandomKey(chainDexMapping) as ChainNetworkType
        const randChain = await this.getRandomChain(config.networks)
        const randDex = Arr.randArray(chainDexMapping[randChain].dex)
        browsers[browserIdx].lastRunTime = new Date().getTime()
        window.api.sendEvents.events.logger(`任务链: ${randChain}`)
        window.api.sendEvents.events.logger(`任务dex: ${randDex}`)
        window.api.sendEvents.events.logger(`任务浏览器: ${browsers[browserIdx].name}`)
        window.api.sendEvents.events.logger(`任务生成成功`)
      } catch (e) {
        window.api.sendEvents.events.logger((e as Error).message)
        console.error(e)
      } finally {
        // this.nextRunTime =
        //   now + Math.floor(Math.random() * (30 * 60 * 1000 - 10 * 60 * 1000 + 1)) + 10 * 60 * 1000
        this.nextRunTime = now + Math.floor(Math.random() * (30 * 1000 - 10 * 1000 + 1)) + 10 * 1000
        window.api.sendEvents.events.logger(
          '下次运行时间:' + new Date(this.nextRunTime).toLocaleString()
        )
      }
    }
    window.api.sendEvents.events.logger('停止成功')
  }

  public static async stop() {
    this.isRunning = false
    window.api.sendEvents.events.logger('正在停止...')
  }

  private static async getRandomChain(chains: {
    [key in ChainNetworkType]?: number
  }): Promise<ChainNetworkType> {
    const keys = Object.keys(chains)
    if (keys.length === 0) {
      throw new Error('未勾选任何交互链')
    }
    const chainObjectArray = keys.map((item) => {
      return {
        chain: item,
        weight: chains[item]
      }
    })
    console.log('交互链', chainObjectArray)
    const randomIdx = Arr.randByField(chainObjectArray, 'weight')
    console.log('idx', randomIdx)
    return chainObjectArray[randomIdx].chain as ChainNetworkType
  }

  private static async getRandomBrowser(browser: BrowserConfigureType[]): Promise<number> {
    if (browser.length === 0) {
      return 0
    }
    // 计算每个对象的时间间隔
    const now = Date.now()
    const intervals = browser.map((data) => now - data.lastRunTime)
    console.log('intervals', intervals)
    // 计算概率分布
    const totalInterval = intervals.reduce((acc, interval) => acc + interval, 0)
    const probabilities = intervals.map((interval) => interval / totalInterval)

    // 在概率分布上进行随机选择
    const randomValue = Math.random()
    let cumulativeProbability = 0
    for (let i = 0; i < browser.length; i++) {
      cumulativeProbability += probabilities[i]
      if (randomValue <= cumulativeProbability) {
        return i
      }
    }
    // 如果由于浮点数运算精度问题导致未能选择，则返回最后一个
    return browser.length - 1
  }
}
