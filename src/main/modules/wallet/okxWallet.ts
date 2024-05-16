import type { BrowserContext } from 'playwright-core'
import { BitBrowser } from '../browser/module/bitBrowser'
import { PlaywrightHelper } from '../helper/playwrightHelper'

export class OkxWallet {
  private readonly context: BrowserContext
  private static instance: OkxWallet

  private constructor(ctx: BrowserContext) {
    this.context = ctx
  }

  public static getInstance(ctx: BrowserContext) {
    if (!OkxWallet.instance) {
      OkxWallet.instance = new OkxWallet(ctx)
    }
    return OkxWallet.instance
  }

  async unlock(password: string) {
    await BitBrowser.keepOnePage(this.context)
    const p = await this.context.newPage()
    await p.goto('chrome-extension://mcohilncbfahbmgdjkbpemcciiolgcge/popup.html#unlock')
    const _id = await Promise.race([
      p
        .locator('.okui-input-input')
        .fill(password)
        .then(() => 1),
      p
        .locator('#home-page-root-element-id')
        .waitFor()
        .then(() => 2)
    ])
    if (_id === 1) {
      await p.getByText('解锁').click()
    }
    await p.locator('#home-page-root-element-id').waitFor()
    await p.waitForTimeout(3000)
    await p.close()
  }

  async getChainTokens(chain: string) {
    await PlaywrightHelper.keepOnePage(this.context)
    const p = await this.context.newPage()
    // 找到切换网络页面
    await p.goto(
      'chrome-extension://mcohilncbfahbmgdjkbpemcciiolgcge/popup.html#network-management?tab=0'
    )
    // 输入网络并切换
    await p.getByPlaceholder('搜索网络名称').fill(chain)
    await p.getByText(chain).click()
    await p.waitForTimeout(1000)
    // 重新进入首页
    await p.goto('chrome-extension://mcohilncbfahbmgdjkbpemcciiolgcge/popup.html#home')
    await p.waitForSelector('div._wallet-list__item_k23gm_1')
    await p.waitForTimeout(1000)
    // 收集Token
    // 使用 evaluate 提取币种名称和币种值
    const tokens = await p.evaluate(() => {
      const tokenElements = document.querySelectorAll('div._wallet-list__item_k23gm_1')
      const tokenData: Record<string, string>[] = []

      tokenElements.forEach((el) => {
        const nameElement = el.querySelector(
          'div._wallet-list-token__title__wrap_k23gm_60 ._typography-text-md_1kso9_25'
        ) as HTMLElement
        const valueElement = el.querySelector(
          'div[style*="max-width: calc(50% - 4px)"] ._typography-text-md_1kso9_25'
        ) as HTMLElement

        if (nameElement && valueElement) {
          const name = nameElement.innerText
          const value = valueElement.innerText
          tokenData.push({ name, value })
        }
      })
      return tokenData
    })
    return tokens
  }

  async confirm() {
    const pages = this.context.pages()
    console.log('正在检测okx钱包')
    for (let i = 0; i < pages.length; i++) {
      console.log(pages[i].url())
      if (pages[i].url().indexOf('mcohilncbfahbmgdjkbpemcciiolgcge') !== -1) {
        try {
          await pages[i].locator('.btn-fill-highlight').click()
        } catch (e) {
          console.log(e)
          return
        }
        return
      }
    }
  }
}
