import { ChainNetworkType } from '@renderer/interfaces/chain'
const chainDexMapping: {
  [key in ChainNetworkType]: { dex: string[] }
} = {
  Scroll: {
    dex: ['okxDex', 'pancake', 'syncswap']
  },
  Arbitrum: {
    dex: ['okxDex', 'pancake', 'uniSwap']
  },
  Polygon: {
    dex: ['okxDex', 'pancake', 'uniSwap']
  },
  'zkSync Era': {
    dex: ['okxDex', 'pancake', 'syncswap']
  },
  Base: { dex: ['okxDex', 'pancake', 'uniSwap'] },
  Linea: { dex: ['okxDex', 'pancake', 'syncswap', 'uniSwap'] },
  Optimism: { dex: ['okxDex', 'pancake', 'uniSwap'] }
}

export { chainDexMapping }
