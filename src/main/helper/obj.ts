import { ChainNetworkType } from './../interfaces/chain'
import Arr from './arr'

export default class Obj {
  public static getRandItem(obj: Record<ChainNetworkType, number> | object): ChainNetworkType | '' {
    const keys = Object.keys(obj)
    if (keys.length === 0) {
      return ''
    }
    const randomIndex = Math.floor(Math.random() * keys.length)
    return obj[keys[randomIndex]]
  }
  public static getRandomKey(object: object) {
    const keys = Object.keys(object)
    return keys[Math.floor(Math.random() * keys.length)]
  }
}
