import { Locator } from 'playwright-core'
import Arr from '../../helper/arr'

export function isGas(token: string): boolean {
  const upperTokens = token.toUpperCase()
  const r =
    upperTokens === 'ETH' ||
    upperTokens === 'MATIC' ||
    upperTokens === 'BNB' ||
    upperTokens === 'APT' ||
    upperTokens === 'STRK' ||
    upperTokens === 'FTM' ||
    upperTokens === 'AVAX' ||
    upperTokens === 'ETHEREUM'
  return r
}

export function getSwapTokens(tokens: { name: string; value: string; weight: number }[]): {
  from: string
  to: string
} {
  const swapFromToken = tokens.find((item) => item.name.indexOf('_ETH') === -1 && +item.value > 0)
  const result = swapFromToken ? swapFromToken.name : 'ETH'
  let toToken = 'ETH'
  const otherToken = tokens.filter((item) => item.name.indexOf(result) === -1)
  if (result === 'ETH') {
    toToken = otherToken[Arr.randByField(otherToken, 'weight')].name
  }
  return { from: result, to: toToken }
}

export async function getBalance(selector: Locator) {
  const balanceText = ((await selector.innerText()) as string).replace(/\r|\n/g, '')
  const text = balanceText.match(/\b\d+(\.\d+)?\b/) as RegExpMatchArray
  console.log(balanceText)
  return parseFloat(text[0])
}
