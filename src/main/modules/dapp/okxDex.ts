import { BrowserContext, Page } from 'playwright-core'
import { OkxWallet } from './../wallet/okxWallet'
import { isGas } from './../helper/tokenHelper'
import { DAppInterface } from './interfaces/dAppInterface'

export class OkxDex implements DAppInterface {
  private readonly context: BrowserContext
  private static instance: OkxDex

  private constructor(ctx: BrowserContext) {
    this.context = ctx
  }

  public static getInstance(ctx: BrowserContext) {
    if (!OkxDex.instance) {
      OkxDex.instance = new OkxDex(ctx)
    }
    return OkxDex.instance
  }

  public async run(fromChain: string, _toChain: string, fromToken: string, toToken: string) {
    const chain = fromChain
    const p = await this.context.newPage()
    await p.goto('https://www.okx.com/zh-hans/web3/dex-swap')
    await p.waitForTimeout(2000)
    this.context.on('page', () => {
      OkxWallet.getInstance(this.context).confirm()
    })
    let _id = await Promise.race([
      p
        .locator('.address-drop-container')
        .waitFor()
        .then(() => 1)
        .catch(() => 1),
      p
        .getByRole('button', { name: '连接钱包' })
        .waitFor()
        .then(() => 2)
        .catch(() => 2)
    ])
    if (_id === 2) {
      await p.getByRole('button', { name: '连接钱包' }).click()
      await p.locator('#scroll-box').getByRole('button', { name: '连接钱包' }).click()
      await p.locator('.address-drop-container').waitFor({ timeout: 30000 })
    }
    await p.waitForTimeout(1000)
    await p.locator('div[data-monitor="chain"]').getByText('从').click()
    console.log('选择链')
    // 选择chain
    await p.getByText('30+').click()
    await p.getByPlaceholder('搜索', { exact: true }).fill(chain)
    await p.waitForTimeout(3000)
    await p.locator('.index_supported-chains__Na8BT > div').nth(0).click()
    await p.waitForTimeout(1500)
    console.log('选择fromToken')
    // 选择来源币
    await this.selectToken(fromToken, p)
    console.log('选择目标币')
    // 选择目标币
    await p.locator('div[data-monitor="chain"]').getByText('到').click()
    await p.waitForTimeout(1500)
    await this.selectToken(toToken, p)
    const fromTokenUpperCase = fromToken.toUpperCase()
    if (isGas(fromTokenUpperCase)) {
      console.log('gas币')
      const balance = await this.getBalance(p)
      if (balance < 0.003) {
        console.log('gas不足0.003')
        return
      }
      await p
        .locator(
          '//*[@id="dex_right_part"]/div[1]/div[2]/div[1]/div[1]/div[2]/div/div[2]/div[1]/input[2]'
        )
        .fill((balance * 0.8).toFixed(5))
    } else {
      console.log('all-in')
      await p.waitForTimeout(2000)
      await p.getByTestId('all-btn').click()
    }
    await p.waitForTimeout(2000)
    _id = await Promise.race([
      p
        .getByRole('button', { name: '授权' })
        .waitFor()
        .then(() => 1),
      p
        .getByRole('button', { name: '兑换' })
        .waitFor()
        .then(() => 2)
    ])
    if (_id === 1) {
      await p.getByRole('button', { name: '授权' }).click()
      await p.getByRole('button', { name: '兑换' }).waitFor({ timeout: 60000 * 2 })
    }
    await p.getByRole('button', { name: '兑换' }).click()
    await p.getByRole('button', { name: '确认' }).click()
    // 等待完成
    await p.waitForSelector(
      '#scroll-box > div > div > div.text-center.styles_status__6aCMO > button',
      { timeout: 60 * 1000 * 2 }
    )
  }

  private async selectToken(token: string, p: Page) {
    await p.locator('#scroll-box').getByPlaceholder('搜索币种名称、合约地址').fill(token)
    await p.waitForTimeout(3000)
    await p.locator('.dex_okd6015-virtual-list-holder-inner > div').nth(0).click()
  }

  private async getBalance(p: Page) {
    const balanceText = await p
      .locator('//*[@id="dex_right_part"]/div/div[2]/div[1]/div[1]/div[1]/div[2]/div/div')
      .innerText()
    return parseFloat(balanceText)
  }
}
