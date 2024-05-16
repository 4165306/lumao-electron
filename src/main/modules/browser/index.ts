import { browserMapping } from '../../config/mapping'
import { chromium, BrowserContext } from 'playwright-core'

export type BrowserType = 'bit' | 'ads' | 'self'
export class BrowserHelper {
  public static async getBrowserContextByBrowserType(
    type: BrowserType,
    browserUniqId: string
  ): Promise<BrowserContext> {
    console.log('浏览器信息', type, browserUniqId)
    const { ws } = await browserMapping[type](browserUniqId)
    const ctx = await chromium.connectOverCDP(ws.indexOf('ws') === -1 ? `ws://${ws}` : ws)
    return ctx.contexts()[0]
  }
}
