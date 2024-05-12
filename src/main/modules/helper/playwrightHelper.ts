import { Locator, Page } from 'playwright-core'

export class PlaywrightHelper {
  public static async waitLocators(p: Page, locators: Locator[]): Promise<number> {
    const promises = locators.map((locator: Locator) => locator.waitFor())
    const index: number = await Promise.race(promises.map((p, i) => p.then(() => i)))
    return index
  }
}
