export default class Arr {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static randArray<T>(arr: Array<T>): T {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  public static interselection<T>(...arrays: Array<Array<T>>): T[] | [] {
    if (arrays.length === 0) {
      return []
    }
    return arrays.reduce((acc, array) => acc.filter((value) => array.includes(value)))
  }

  public static randByField<T extends object>(arr: Array<T>, field: keyof T): number {
    if (arr.length === 0) {
      return 0
    }
    // 定义当前时间基准点
    const now = arr.reduce(
      (max, obj) => (obj[field] > max ? obj[field] : max),
      arr[0][field]
    ) as number
    console.log('基准点', now)
    // 收集权重
    const weights = arr.map((item: T) => Math.abs((item[field] as number) - now))
    // 生成随机值用于加权
    const totalWeight = weights.reduce((acc, val) => acc + val, 0)
    let random = Math.random() * totalWeight
    // 根据随机值选择一个返回
    for (let i = 0; i < arr.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        return i
      }
    }
    // 如果出现计算错误，返回最后一个元素
    return arr.length - 1
  }
}
