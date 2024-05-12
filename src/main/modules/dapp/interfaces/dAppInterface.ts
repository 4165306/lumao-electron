interface DAppInterface {
  run(fromChain: string, toChain: string, fromToken: string, toToken: string): void
}

export type { DAppInterface }
