export type ChainNetworkType =
  | 'Optimism'
  | 'Arbitrum'
  | 'zkSync Era'
  | 'Polygon'
  | 'Linea'
  | 'Scroll'
  | 'Base'

export type TokenType = 'USDT' | 'USDC' | 'DAI' | 'ETH' | 'BTC'

export type BrowserType = 'bit' | 'Ads' | 'AdsKiller'

export type BrowserConfigureType = {
  id: string // 打开标识
  _id: string
  name: string // 浏览器名字
  remark: string // 浏览器备注
  lastRunTime: number // 上次打开时间
}

export type ConfigResultType = {
  networks: { [key in ChainNetworkType]?: number }
  tokens: { [key in TokenType]?: number }
  browserType: BrowserType
}
