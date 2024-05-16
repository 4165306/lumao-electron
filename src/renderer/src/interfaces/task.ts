import { BrowserType, ChainNetworkType, TokenType } from './chain'

export type RunnerConfigType = {
  chains: ChainNetworkType[]
  browserType: BrowserType
  networkTokenConfig: Record<
    ChainNetworkType,
    {
      weight: number | undefined
      tokens: TokenType[]
    }
  >
  smartSwapGas: boolean
}
