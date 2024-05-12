interface TaskQueueInterface {
  chains: { from: string; to: string }
  token: { from: string; to: string }
  dApp: string
  type: 'dex' | 'bridge'
  browserUniqId: string
}
export default class Runner {
  public static async main(tasks: TaskQueueInterface[]) {
    console.log('task', tasks)
    return tasks
  }
}
