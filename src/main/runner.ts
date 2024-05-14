import { BrowserContext } from 'playwright-core'
import { BrowserHelper, BrowserType } from './modules/browser'

export default class Runner {
  public static async main(options: {
    browser_id: string
    browser_type: BrowserType
    dex: string
    chain: string
  }) {
    const { browser_id, browser_type, dex, chain } = options
    const browserCtx: BrowserContext = BrowserHelper.getBrowserContextByBrowserType(
      browser_type,
      browser_id
    )
  }

  private static async sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, ms)
    })
  }
}
