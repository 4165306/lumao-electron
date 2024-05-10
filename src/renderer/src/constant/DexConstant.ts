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
  { name: 'uniswap', chains: [], type: 'dex' },
  { name: 'pancakeswap', chains: [], type: 'dex' },
  { name: 'syncswap', chains: [], type: 'dex' },
  { name: 'sushi', chains: [], type: 'dex' },
  { name: 'izumi', chains: [], type: 'dex' },
  { name: 'jumper', chains: [], type: 'bridge' },
  { name: 'bungee', chains: [], type: 'bridge' },
  { name: 'orbiter', chains: [], type: 'bridge' }
]

export default dexConstant
