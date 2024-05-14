export default class Sys {
  public static async sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, ms)
    })
  }
}
