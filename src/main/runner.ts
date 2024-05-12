import { BrowserContext } from 'playwright-core'
import { dexMapping } from './config/mapping'
import { DAppInterface } from './modules/dapp/interfaces/dAppInterface'
import { BrowserHelper, BrowserType } from './modules/browser'
import { sendToRenderer } from './modules/communication/renderer'
interface TaskQueueInterface {
  chains: { from: string; to: string }
  token: { from: string; to: string }
  dApp: string
  type: 'dex' | 'bridge'
  browserUniqId: string
}
interface CacheBrowserInterface {
  browserUniqId: string
  ctx: BrowserContext
}

export default class Runner {
  private static maxBrowser: number = 3
  public static async main(tasks: TaskQueueInterface[], browserType: BrowserType) {
    // 重写console.log
    const oldLog = console.log
    console.log = (...args) => {
      sendToRenderer(JSON.stringify(args))
      oldLog(args)
    }
    const browserMapping: CacheBrowserInterface[] = []
    for (let i = 0; i < tasks.length; ++i) {
      const { chains, token, browserUniqId, dApp } = tasks[i]
      let ctx = await this.findBrowserContext(browserMapping, browserUniqId)
      // todo 链接浏览器
      // 如果浏览器没有上下文
      if (!ctx) {
        // 打开浏览器 获取浏览器上下文
        ctx = await BrowserHelper.getBrowserContextByBrowserType(browserType, browserUniqId)
        // push browserMapping: CacheBrowserInterface
        browserMapping.push({
          browserUniqId,
          ctx
        })
        console.log('浏览器打开成功')
        return 'success'
      }
      ;(dexMapping[dApp](ctx) as DAppInterface).run(chains.from, chains.to, token.from, token.to)
      if (browserMapping.length > this.maxBrowser) {
        browserMapping.shift()
      }
    }
    // 恢复console.log
    console.log = oldLog
    return 'ok'
  }

  private static async findBrowserContext(
    cache: CacheBrowserInterface[],
    browserUniqId: string
  ): Promise<BrowserContext | undefined> {
    return cache.find((item) => (item.browserUniqId = browserUniqId))?.ctx
  }
}
