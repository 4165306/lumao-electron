const SYS_Chains = [
  'Optimism',
  'Arbitrum',
  'zkSync Era',
  'Polygon',
  'Linea',
  'Scroll',
  'Base'
] as const
const SYS_Tokens = ['USDT', 'USDC', 'ETH', 'BTC', 'DAI', 'Gas币'] as const
const SYS_BrowserTypes = ['bit', 'ads', 'ads-killer'] as const

export type ChainNetworkType = (typeof SYS_Chains)[number]
// | 'Optimism'
// | 'Arbitrum'
// | 'zkSync Era'
// | 'Polygon'
// | 'Linea'
// | 'Scroll'
// | 'Base'

export type TokenType = (typeof SYS_Tokens)[number]
// export type TokenType = 'USDT' | 'USDC' | 'DAI' | 'ETH' | 'BTC'

export type BrowserType = (typeof SYS_BrowserTypes)[number]

export { SYS_Chains, SYS_Tokens, SYS_BrowserTypes }
