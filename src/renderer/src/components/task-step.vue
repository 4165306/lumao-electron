<script setup lang="ts">
import { ref } from 'vue'
const runMode = ref('1')

const props = defineProps(['value'])
const emits = defineEmits(['update:value', 'onStart'])
const delStep = (stepId: number) => {
  const newData = (props.value as unknown[]).filter((_, i) => i !== stepId)
  emits('update:value', newData)
}

const flushData = () => {
  emits('update:value', [])
}
</script>
<template>
  <el-card style="height: 100%">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div style="display: flex; gap: 5px; align-items: center">
          <div>执行顺序</div>
          <div><el-button type="danger" size="small" @click="flushData">清空</el-button></div>
        </div>
        <div style="display: flex; justify-content: start; align-items: center">
          <div>
            <el-radio-group v-model="runMode">
              <el-radio value="1">UI</el-radio>
              <el-radio value="2" disabled>合约</el-radio>
            </el-radio-group>
          </div>
          <div style="margin-left: 10px">
            <el-button type="primary" size="small" @click="emits('onStart', runMode)">开始</el-button>
          </div>
        </div>
      </div>
    </template>
    <el-table
      :data="props.value"
      :height="280"
      :default-sort="{ prop: 'id', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column prop="id" label="优先级" />
      <el-table-column prop="DApp" label="DApp" />
      <el-table-column label="浏览器">
        <template #default="scope">
          {{ scope.row.browser.id }}
        </template>
      </el-table-column>
      <el-table-column prop="chains" label="链">
        <template #default="scope">
          {{ scope.row.chains.from }} {{ scope.row.chains.to !== '' ? ' - ' + scope.row.chains.to : '' }}
        </template>
      </el-table-column>
      <el-table-column label="源币">
        <template #default="scope">
          {{ scope.row.tokens.from }}
        </template>
      </el-table-column>
      <el-table-column label="到币">
        <template #default="scope">
          {{ scope.row.tokens.to }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="danger" size="small" @click="delStep(scope.$index)">删</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
