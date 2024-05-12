<script setup lang="ts">
import { ref } from 'vue'
import Logger from './components/logger.vue'
import TaskConfig from './components/task-config.vue'
import TaskStep from './components/task-step.vue'
interface TaskModelInterface {
  id: number
  browser: { id: string }
  DApp: string
  chains: { from: string; to: string }
  tokens: { from: string; to: string }
}
interface TaskQueueInterface {
  chains: { from: string; to: string }
  token: { from: string; to: string }
  dApp: string
  type: 'dex' | 'bridge'
  browserUniqId: string
}
const tasks = ref<TaskModelInterface[]>([])
const onAddTask = (
  browserId: string,
  DApp: string,
  fromChain: string,
  toChain: string,
  fromToken: string,
  toToken: string,
) => {
  const t: TaskModelInterface = {
    id: tasks.value.length,
    browser: {
      id: browserId
    },
    DApp: DApp,
    chains: {
      from: fromChain,
      to: toChain
    },
    tokens: {
      from: fromToken,
      to: toToken
    }
  }
  console.log(t)
  tasks.value.push(t)
}
const runTask = () => {
  const taskQueue: TaskQueueInterface[] = tasks.value.map((item: TaskModelInterface) => {
    return {
      browserUniqId: item.browser.id,
      dApp: item.DApp,
      type: item.chains.to === item.chains.from || item.chains.to === '' ? 'dex' : 'bridge',
      chains: item.chains,
      token: item.tokens
    }
  })
  console.log('开始运行任务', taskQueue)
  window.api.sendEvents.events.runTask(JSON.parse(JSON.stringify(taskQueue)), 'bit')
}
</script>

<template>
  <div style="position: relative; width: 100%; height: 100%">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 50%">
      <taskConfig @on-add="onAddTask" />
    </div>
    <div style="position: absolute; bottom: 2%; left: 0; width: 59%; height: 47%">
      <TaskStep v-model:value="tasks" @on-start="runTask" />
    </div>
    <div style="position: absolute; bottom: 2%; right: 0; width: 40%; height: 47%">
      <Logger />
    </div>
  </div>
</template>
