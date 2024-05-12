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
  self: () => undefined
}

export { dexMapping, browserMapping }
