/* eslint-disable @typescript-eslint/no-explicit-any */
const storeFile = './_config.json'
import * as fs from 'fs'
class Storage {
  private static filePath = storeFile

  static getConfig(path: string): any {
    const config = this.readConfig()
    if (!path) {
      return config
    }
    const keys = path.split('.')
    let current: any = config
    for (const key of keys) {
      if (!Object.prototype.hasOwnProperty.call(current, key)) {
        return undefined
      }
      current = current[key]
    }
    return current
  }

  static putConfig(path: string, value: any): void {
    const config = this.readConfig()
    const keys = path.split('.')
    let current: any = config
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!Object.prototype.hasOwnProperty.call(current, key)) {
        current[key] = {}
      }
      current = current[key]
    }
    current[keys[keys.length - 1]] = value
    this.writeConfig(config)
  }

  private static readConfig(): any {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8')
      return JSON.parse(data)
    } catch (err) {
      return {}
    }
  }

  private static writeConfig(config: any): void {
    fs.writeFileSync(this.filePath, JSON.stringify(config, null, 2), 'utf8')
  }
}

export class AccountStorage {
  private static prefix: string = '_account.'

  public static saveAccountNotEthNumber(address: string, n: number) {
    Storage.putConfig(this.prefix + 'swapNotEthCount.' + address, n)
  }

  public static getAccountNotEthNumber(address: string, d: any = '') {
    const r = Storage.getConfig(this.prefix + 'swapNotEthCount.' + address)
    if (r === undefined) {
      return d
    }
    return r
  }
}
