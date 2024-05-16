import { BrowserContext } from 'playwright-core'
import { BrowserHelper, BrowserType } from './modules/browser'
import { dexMapping } from './config/mapping'
import { DAppInterface } from './modules/dapp/interfaces/dAppInterface'
import { OkxWallet } from './modules/wallet/okxWallet'
import { ChainNetworkType, ConfigResultType } from './interfaces/chain'
export default class Runner {
  public static async main(
    browserId: string,
    browserType: 'bit' | 'ads' | 'ads-killer',
    task: {
      chain: ChainNetworkType
      dex: string
    }
  ) {
    // const browserCtx: BrowserContext = await BrowserHelper.getBrowserContextByBrowserType(
    //   browserType,
    //   browserId
    // )
    // const wallet = await OkxWallet.getInstance(browserCtx)
    // await wallet.unlock(wallet_password)
    // const tokens = await wallet.getChainTokens(chain)
    const tokens = [
      { name: 'USDT', value: 0 },
      { name: 'USDC', value: 0 },
      { name: 'ETH', value: 22 }
    ]
    const chain = task.chain
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const dexInstance = dexMapping[dex](browserCtx) as DAppInterface
    const { from, to } = await this.getSwapToken(tokens)
    console.log('交互数据', chain, from, to)
    // await dexInstance.run(chain, chain, from, to)
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
    const toTokens = tokens.filter((token) => token.name !== fromToken)

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
