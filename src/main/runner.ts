import { BrowserContext } from 'playwright-core'
import { BrowserHelper, BrowserType } from './modules/browser'
import { dexMapping } from './config/mapping'
import { DAppInterface } from './modules/dapp/interfaces/dAppInterface'
import { OkxWallet } from './modules/wallet/okxWallet'
import { ChainNetworkType, ConfigResultType } from './interfaces/chain'
export default class Runner {
  public static async main(options: {
    browser_id: string
    browser_type: BrowserType
    wallet_password: string
    dex: string
    chain: ChainNetworkType
    config: ConfigResultType
  }) {
    // const { browser_id, browser_type, dex, chain, config, wallet_password } = options
    // const browserCtx: BrowserContext = await BrowserHelper.getBrowserContextByBrowserType(
    //   browser_type,
    //   browser_id
    // )
    // const wallet = await OkxWallet.getInstance(browserCtx)
    // await wallet.unlock(wallet_password)
    // const tokens = await wallet.getChainTokens(chain)
    const { config, chain } = options
    const tokens = [
      { name: 'USDT', value: 0 },
      { name: 'USDC', value: 0 },
      { name: 'ETH', value: 22 }
    ]
    // todo 给token加权重
    const combinedTokens = tokens.map((token) => {
      const tokenKey = Object.keys(config.tokens).find((key) => token.name.includes(key))
      return {
        ...token,
        weight: tokenKey ? config.tokens[tokenKey] : 0 // 默认值为0
      }
    }) as { name: string; value: string | number; weight: number }[]
    console.log(combinedTokens)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const dexInstance = dexMapping[dex](browserCtx) as DAppInterface
    const { from, to } = this.getSwapTokens(combinedTokens, chain)
    console.log('交互数据', chain, from, to)
    // await dexInstance.run(chain, chain, from, to)
  }

  private static getSwapTokens(
    tokens: { name: string; value: string | number; weight: number }[],
    chain: ChainNetworkType
  ): {
    from: string
    to: string
  } {
    const totalValue = tokens.reduce((sum, token) => sum + +token.value, 0)

    if (totalValue === 0) {
      throw new Error('账户没有余额')
    }

    const fromToken = tokens.find((token) => +token.value > 0)
    if (!fromToken) {
      throw new Error('没有找到 value 大于 0 的 token')
    }

    const otherTokens = tokens.filter((token) => token.name !== fromToken.name)
    const totalWeight = otherTokens.reduce((sum, token) => sum + token.weight, 0)

    if (totalWeight === 0) {
      throw new Error('没有其他 token 参与随机选择')
    }

    let randomWeight = Math.random() * totalWeight
    let selectedToken: { name: string; value: string | number; weight: number } | undefined

    for (const token of otherTokens) {
      if (randomWeight < token.weight) {
        selectedToken = token
        break
      }
      randomWeight -= token.weight
    }

    if (!selectedToken) {
      throw new Error('随机选择 token 失败')
    }

    return { from: fromToken.name, to: selectedToken.name }
  }

  private static async sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, ms)
    })
  }
}
