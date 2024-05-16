import { ChainNetworkType } from '../interfaces/chain'
import { BrowserType } from '../modules/browser'
import { AdsBrowser } from '../modules/browser/module/adsBrowser'
import { BitBrowser } from '../modules/browser/module/bitBrowser'
import { OkxDex } from '../modules/dapp/okxDex'
import { Pancake } from '../modules/dapp/pancake'
import { Syncswap } from '../modules/dapp/syncswap'
import { UniSwap } from '../modules/dapp/uniSwap'

const dexMapping = {
  okxDex: OkxDex.getInstance,
  pancake: Pancake.getInstance,
  syncswap: Syncswap.getInstance,
  uniSwap: UniSwap.getInstance
}

const browserMapping: Record<BrowserType, CallableFunction> = {
  bit: BitBrowser.openBrowser,
  ads: AdsBrowser.openBrowser,
  'ads-killer': () => undefined
}

const chainTokenMapping: Record<ChainNetworkType, { wallet_name: string; sys_name: string }[]> = {
  Optimism: [{ wallet_name: 'OP_ETH', sys_name: 'ETH' }],
  'zkSync Era': [{ wallet_name: 'ERA_ETH', sys_name: 'ETH' }],
  Arbitrum: [{ wallet_name: 'ARB_ETH', sys_name: 'ETH' }],
  Linea: [{ wallet_name: 'LINEA_ETH', sys_name: 'ETH' }],
  Base: [{ wallet_name: 'BASE_ETH', sys_name: 'ETH' }],
  Scroll: [{ wallet_name: 'SCROLL_ETH', sys_name: 'ETH' }],
  Polygon: [{ wallet_name: 'MATIC', sys_name: 'MATCH' }]
}

const ChainGasMapping: Record<ChainNetworkType, string> = {
  Optimism: 'ETH',
  'zkSync Era': 'ETH',
  Arbitrum: 'ETH',
  Linea: 'ETH',
  Base: 'ETH',
  Scroll: 'ETH',
  Polygon: 'MATIC'
}

export { dexMapping, browserMapping, chainTokenMapping, ChainGasMapping }
