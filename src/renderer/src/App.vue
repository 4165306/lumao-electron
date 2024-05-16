<script setup lang="ts">
import { ref } from 'vue'
import Logger from './components/log/logger.vue'
import Config from './components/task/config.vue'
import Runner from './runner'
import { RunnerConfigType } from './interfaces/task'

const ConfigEl = ref()
const stopTask = () => Runner.stop()
const runTask = async () => {
  const config = (await ConfigEl.value.getConfig()) as RunnerConfigType
  console.log(config)
  Runner.main(config)
}
</script>

<template>
  <div style="position: relative" class="match_parent">
    <div style="position: absolute; top: 0; left: 0; width: 49%; height: 100%">
      <el-card class="match_parent" :body-style="{ overflowY: 'scroll', height: '83%' }">
        <template #header>
          <div style="display: flex; justify-content: space-between">
            <div>任务配置</div>
            <div>
              <el-button type="primary" @click="runTask">执行</el-button>
              <el-button type="danger" @click="stopTask">停止</el-button>
            </div>
          </div>
        </template>
        <template #default>
          <Config ref="ConfigEl" />
        </template>
      </el-card>
    </div>
    <div style="position: absolute; top: 0; right: 0; width: 50%; height: 100%">
      <el-card class="match_parent" :body-style="{ overflowY: 'scroll', height: '83%' }">
        <template #header>
          <div style="display: flex; justify-content: space-between">
            <div>日志</div>
            <div>
              <el-button type="primary">导出</el-button>
              <el-button type="danger">清空</el-button>
            </div>
          </div>
        </template>
        <template #default>
          <div>
            <Logger />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.match_parent {
  width: 100%;
  height: 100%;
}
</style>
