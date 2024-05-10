import { sendToRenderer } from '../modules/communication/renderer'

export default class Dex {
  private static okxConfig: Record<string, unknown[]> = {
    chain: [
      'Ethereum',
      'Solana',
      'Optimism',
      'Base',
      'Linea',
      'Starknet',
      'SUI',
      'Mantle',
      'X Layer',
      'Mode',
      'Arbitrum',
      'zkSync Era',
      'Scroll',
      'BNB Chain',
      'Avalanche C',
      'Aptos',
      'Blast'
    ]
  }

  public static async okx(chain: string, fromToken: string, toToken: string) {
    if (Dex.okxConfig.chain.indexOf(chain) === -1) {
      throw new Error('链不存在')
    }
    sendToRenderer(`执行okxDex兑换,链: ${chain}, 来源: ${fromToken}, 目标: ${toToken}`)

    return 'success'
  }
}
