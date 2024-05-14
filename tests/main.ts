import { OkxWallet } from '../src/main/modules/wallet/okxWallet'
import { BrowserHelper } from './../src/main/modules/browser/index'
class Tests {
  public static async main() {
    const ctx = await BrowserHelper.getBrowserContextByBrowserType(
      'bit',
      '4e4b1fc924a24aeda4af21d219598f16'
    )
    const wallet = OkxWallet.getInstance(ctx)
    await wallet.unlock('qaz123123')
    // 从okx切换网络 获取余额
    // 余额映射 ETH -> OP_ETH   USDT -> USDT   USDC -> USDC
    // 获取余额结果 [{token: 'ETH', value: 1}, {token: 'USDC', value: 0}]
    // 确定来源币
    //  如果有非ETH 余额的币，则随机选一个
    //  如果只有ETH， 则选择ETH
    // 确定目标币
    //  如果来源币是ETH，则根据配置概率选择其他币种
    //  如果来源币不是ETH，则选择ETH
    // 打开dex
    // loop: 选择网络-链接钱包-切换网络 end: 0x...
    // 选择确定的来源币/目标币
    // SWAP
    //  如果有Approve, 则先Approve, 等待swap按钮
    //  swapToken
    //  等待dex交互完成
    // 结束
  }
}

Tests.main()
