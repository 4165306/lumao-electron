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
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('Input array is either not an array or is empty')
    }

    // 处理权重，将字符串转换为数字，并将 undefined 和 null 视为 0
    const validItems = arr.map((item) => {
      let weight = parseFloat(item[field] as any)
      weight = isNaN(weight) || weight <= 0 ? 0 : weight
      return { item, weight }
    })

    // 如果所有权重都为 0，则抛出错误
    const totalWeight = validItems.reduce((sum, item) => sum + item.weight, 0)
    if (totalWeight === 0) {
      throw new Error('No valid items with a positive weight found in the array')
    }

    // 生成一个 0 到 totalWeight 之间的随机数
    const randomWeight = Math.random() * totalWeight

    // 根据随机数找到对应的 item
    let cumulativeWeight = 0
    for (let i = 0; i < validItems.length; i++) {
      cumulativeWeight += validItems[i].weight
      if (randomWeight < cumulativeWeight) {
        return arr.indexOf(validItems[i].item)
      }
    }

    // 这种情况下，应该总是能够返回一个索引
    return arr.indexOf(validItems[validItems.length - 1].item)
  }
}
