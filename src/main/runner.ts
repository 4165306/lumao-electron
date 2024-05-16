import { BrowserContext } from 'playwright-core'
import { BrowserHelper, BrowserType } from './modules/browser'
import { dexMapping } from './config/mapping'
import { DAppInterface } from './modules/dapp/interfaces/dAppInterface'
import { OkxWallet } from './modules/wallet/okxWallet'
import { ChainNetworkType } from './interfaces/chain'
export default class Runner {
  public static async main(
    browserId: string,
    browserType: BrowserType,
    task: {
      chain: ChainNetworkType
      dex: string
    }
  ) {
    const browserCtx: BrowserContext = await BrowserHelper.getBrowserContextByBrowserType(
      browserType,
      browserId
    )
    const wallet = await OkxWallet.getInstance(browserCtx)
    await wallet.unlock('qaz123123')
    const tokens = await wallet.getChainTokens(task.chain)
    console.log('币种', tokens)
    const chain = task.chain
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dexInstance = dexMapping[task.dex](browserCtx) as DAppInterface
    const { from, to } = await this.getSwapToken(tokens)
    console.log('交互数据', chain, from, to)
    await dexInstance.run(chain, chain, from, to)
  }

  private static async getSwapToken(tokens: { name: string; value: number | string }[]): Promise<{
    from: string
    to: string
  }> {
    // 过滤出符合条件的tokens：name不包含_ETH且value > 0
    const validTokens = tokens.filter(
      (token) => token.name.indexOf('_ETH') === -1 && +token.value > 0
    )

    let fromToken: string
    if (validTokens.length > 0) {
      // 随机选择一个符合条件的token
      const selectedToken = validTokens[Math.floor(Math.random() * validTokens.length)]
      fromToken = selectedToken.name
    } else {
      fromToken = 'ETH'
    }

    // 过滤出to token的候选集合，不能包含fromToken
    const toTokens = tokens.filter(
      (token) => (token.name.indexOf('_ETH') === -1 ? token.name : 'ETH') !== fromToken
    )

    // 随机选择一个to token
    const toToken = toTokens[Math.floor(Math.random() * toTokens.length)].name

    return { from: fromToken, to: toToken }
  }

  private static async sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, ms)
    })
  }
}
