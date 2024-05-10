type cType = {
  name: string
  type: 'dex' | 'bridge'
  chains: string[]
}
const dexConstant: cType[] = [
  {
    name: 'okxDex',
    type: 'dex',
    chains: [
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
  },
  {
    name: 'uniswap',
    chains: [
      'Ethereum',
      'Arbitrum',
      'Optimism',
      'Polygon',
      'Base',
      'BNB Chain',
      'Avalanche',
      'Celo',
      'Blast'
    ],
    type: 'dex'
  },
  {
    name: 'pancakeswap',
    chains: [
      'BNB Chain',
      'Ethereum',
      'Polygon zkEVM',
      'zkSync Era',
      'Arbitrum One',
      'Linea',
      'Base',
      'opBNB',
      'Aptos'
    ],
    type: 'dex'
  },
  { name: 'syncswap', chains: ['zkSync', 'Linea', 'Scroll'], type: 'dex' },
  {
    name: 'sushi',
    chains: [
      'Aptos',
      'Ethereum',
      'Arbitrum One',
      'Base',
      'Polygon',
      'Polygon zkEVM',
      'Scroll',
      'OP',
      'Linea',
      'Blast',
      'ZetaChain',
      'Core Blockchain',
      'Filecoin',
      'BNB Smart Chain',
      'ThunderCore',
      'Gnosis',
      'Avalanche C-Chain',
      'Fantom',
      'Arbitrum Nova',
      'Harmony',
      'Kava',
      'Celo'
    ],
    type: 'dex'
  },
  {
    name: 'izumi',
    chains: [
      'zkSync Era',
      'Linea',
      'Scroll',
      'Base',
      'Mantle',
      'Mode',
      'X Layer',
      'BNB-Chain',
      'Zeta',
      'Blast',
      'Arbitrum',
      'ZKFair',
      'Ethereum',
      'Optimism',
      'Polygon',
      ''
    ],
    type: 'dex'
  },
  {
    name: 'jumper',
    chains: [
      'Ethereum',
      'Arbitrum',
      'Optimism',
      'Polygon',
      'BSC',
      'zkSync Era',
      'Polygon zkEVM',
      'BASE',
      'Avalanche',
      'Linea',
      'Gnosis',
      'Fantom',
      'Moonbeam',
      'Solana',
      'Mode',
      'Scroll'
    ],
    type: 'bridge'
  },
  {
    name: 'bungee',
    chains: [
      'Ethereum',
      'Optimism',
      'Arbitrum',
      'Blast',
      'Polygon',
      'Base',
      'zkSync Era',
      'Polygon zkEVM',
      'Linea',
      'BSC',
      'Avalanche',
      'Fantom',
      'Gnosis',
      'Scroll',
      ''
    ],
    type: 'bridge'
  },
  {
    name: 'orbiter',
    chains: [
      'Linea',
      'zkSync Era',
      'Bitlayer',
      'X Layer mainnet',
      'BOB',
      'Arbitrum',
      'Merlin',
      'Scroll',
      'Base',
      'Optimism',
      'Blast',
      'Mode',
      'Zora',
      'Polygon',
      'Starknet',
      'BNB Chain',
      'Solana',
      'zklink Nova'
    ],
    type: 'bridge'
  }
]

export default dexConstant
