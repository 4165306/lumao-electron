import { BrowserType } from './../../interfaces/chain'

export type BrowserInfo = {
  open_id: string
  lastRunTime: number
}
export class BrowserCache {
  private static browsers: BrowserInfo[] = []

  public static async getBrowser(type: BrowserType): Promise<BrowserInfo> {
    if (this.browsers.length < 1) {
      this.browsers = await this.getBrowsers(type)
    }
    // 随机一个数据
    return this.getRandItem()
  }

  private static async getRandItem(): Promise<BrowserInfo> {
    if (this.browsers.length < 1) throw new Error('数据为空')
    const items: BrowserInfo[] = this.browsers
    const currentTime = Date.now()
    const weights = items.map((item) => currentTime - item.lastRunTime)

    // 计算权重总和
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

    // 生成一个 0 到 totalWeight 之间的随机数
    const randomWeight = Math.random() * totalWeight

    // 根据随机数找到对应的 item
    let cumulativeWeight = 0
    for (let i = 0; i < items.length; i++) {
      cumulativeWeight += weights[i]
      if (randomWeight < cumulativeWeight) {
        return items[i]
      }
    }

    // 这种情况下，应该总是能够返回一个 item
    return items[items.length - 1]
  }

  private static async getBrowsers(type: BrowserType) {
    const browsers = await window.api.network[type].lst()
    const now = new Date().getTime()
    const r: BrowserInfo[] = browsers.map((item) => {
      return {
        open_id: item.id,
        lastRunTime: now
      }
    })
    return r
  }
}
