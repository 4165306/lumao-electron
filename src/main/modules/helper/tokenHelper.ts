import { Locator } from '@playwright/test'

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

export async function getBalance(selector: Locator) {
  const balanceText = ((await selector.innerText()) as string).replace(/\r|\n/g, '')
  const text = balanceText.match(/\b\d+(\.\d+)?\b/) as RegExpMatchArray
  console.log(balanceText)
  return parseFloat(text[0])
}