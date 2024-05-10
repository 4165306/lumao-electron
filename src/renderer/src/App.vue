<script setup lang="ts">
import { ref } from 'vue'
import Logger from './components/logger.vue'
import TaskConfig from './components/task-config.vue'
import TaskStep from './components/task-step.vue'
const tasks = ref<unknown[]>([])
const onAddTask = (
  browserId: string,
  DApp: string,
  fromChain: string,
  toChain: string,
  fromToken: string,
  toToken: string
) => {
  const t = {
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
  console.log(tasks)
}
</script>

<template>
  <div style="position: relative; width: 100%; height: 100%">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 50%">
      <taskConfig @on-add="onAddTask" />
    </div>
    <div style="position: absolute; bottom: 2%; left: 0; width: 59%; height: 47%">
      <TaskStep v-model:value="tasks" />
    </div>
    <div style="position: absolute; bottom: 2%; right: 0; width: 40%; height: 47%">
      <Logger />
    </div>
  </div>
</template>
