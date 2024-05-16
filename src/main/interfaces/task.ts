import { ChainNetworkType } from './chain'

export type TaskRunnerType = {
  browserName: string
  browserId: string
  browserType: string
  chain: ChainNetworkType
  dex: string
}
