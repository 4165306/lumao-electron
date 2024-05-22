import { browserMapping } from '../../config/mapping'
import { chromium, BrowserContext } from 'playwright-core'

export type BrowserType = 'bit' | 'ads' | 'ads-killer'
export class BrowserHelper {
  public static async getBrowserContextByBrowserType(
    type: BrowserType,
    browserUniqId: string
  ): Promise<BrowserContext> {
    console.log('浏览器信息', type, browserUniqId)
    const { ws } = await browserMapping[type](browserUniqId)
    const ctx = await chromium.connectOverCDP(ws.indexOf('ws') === -1 ? `ws://${ws}` : ws)
    try {
      return ctx.contexts()[0]
    } catch (e) {
      return await ctx.newContext()
    }
  }
}
