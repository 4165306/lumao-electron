import { BrowserContext, Locator, Page } from 'playwright-core'

export class PlaywrightHelper {
  static async keepOnePage(context: BrowserContext) {
    const pages = context.pages()
    for (let i = 1; i < pages.length; i++) {
      await pages[i].close()
    }
  }
  public static async waitLocators(p: Page, locators: Locator[]): Promise<number> {
    const promises = locators.map((locator: Locator) => locator.waitFor())
    const index: number = await Promise.race(promises.map((p, i) => p.then(() => i)))
    return index
  }
}
