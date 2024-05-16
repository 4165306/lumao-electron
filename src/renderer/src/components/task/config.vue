<script setup lang="ts">
import { ref, reactive } from 'vue'
import { BrowserType, SYS_Chains, SYS_Tokens } from '@renderer/interfaces/chain'
import { RunnerConfigType } from '@renderer/interfaces/task'

const form = reactive<RunnerConfigType>({
  smartSwapGas: false,
  chains: [],
  networkTokenConfig: {
    Optimism: { tokens: [], weight: undefined },
    Arbitrum: { tokens: [], weight: undefined },
    'zkSync Era': { tokens: [], weight: undefined },
    Polygon: { tokens: [], weight: undefined },
    Linea: { tokens: [], weight: undefined },
    Scroll: { tokens: [], weight: undefined },
    Base: { tokens: [], weight: undefined }
  }
})

const browserType = ref<BrowserType>('bit')
const getConfig = (): RunnerConfigType => {
  return JSON.parse(JSON.stringify(form))
}
const getBrowserList = async () => {
  return await window.api.network[browserType.value].lst()
}
defineExpose({ getConfig, getBrowserList })
</script>

<template>
  <div>
    <el-form label-width="auto">
      <el-form-item label="交互链">
        <el-checkbox-group v-model="form.chains">
          <el-checkbox v-for="(item, index) in SYS_Chains" :key="index" :value="item">
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-for="(item, index) in form.chains" :key="index" :label="item">
        <el-form-item label="交互概率">
          <el-input
            v-model="form.networkTokenConfig[item].weight"
            placeholder="越小越不容易命中活跃"
          />
        </el-form-item>
        <el-form-item label="交互币种">
          <el-checkbox-group v-model="form.networkTokenConfig[item].tokens">
            <el-checkbox v-for="(item2, index2) in SYS_Tokens" :key="index2" :value="item2">
              {{ item2 }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>
