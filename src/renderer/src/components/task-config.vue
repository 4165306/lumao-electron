<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import DexConstant from './../constant/DexConstant'
import Token from './../constant/Token'

const taskConfigForm = reactive({
  type: 'dex',
  DApp: 'okxDex',
  fromChain: '',
  toChain: '',
  fromToken: '',
  toToken: ''
})
const filterDApp = computed(() => DexConstant.filter((item) => item.type === taskConfigForm.type))
const currentSelectDApp = ref(filterDApp.value[0])
const onDAppSelect = (value: string) => {
  DexConstant.every((item) => {
    if (item.name === value) {
      currentSelectDApp.value = item
      return false
    }
    return true
  })
}

const browsers = ref()

/**
 * <el-table-column prop="id" label="优先级" />
  <el-table-column prop="DApp" label="DApp" />
  <el-table-column prop="chains" label="链" />
  <el-table-column prop="fromToken" label="源币" />
  <el-table-column prop="toToken" label="到币" />
 */
const tasks = ref<Record<string, unknown>[]>([])
const addTask = () => {
  const task = {
    id: tasks.value.length,
    DApp: taskConfigForm.DApp,
    chains: {
      from: taskConfigForm.fromChain,
      to: taskConfigForm.toChain
    },
    fromToken: taskConfigForm.fromToken,
    toToken: taskConfigForm.toToken
  }
  tasks.value.push(task)
  // emits
}
</script>
<template>
  <el-card header="任务配置">
    <el-row :gutter="10" justify="space-between">
      <el-col :span="8">
        <el-form :model="taskConfigForm" label-width="auto">
          <el-form-item label="任务类型">
            <el-radio-group v-model="taskConfigForm.type" @change="taskConfigForm.DApp = ''">
              <el-radio value="dex">Swap</el-radio>
              <el-radio value="bridge">跨链</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="DApp">
            <el-select
              v-model="taskConfigForm.DApp"
              placeholder="请选择DApp"
              @change="onDAppSelect"
            >
              <el-option
                v-for="(item, index) in filterDApp"
                :key="index"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="源链">
            <el-select v-model="taskConfigForm.fromChain" placeholder="请选择源链">
              <el-option
                v-for="(item, index) in currentSelectDApp.chains"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-show="taskConfigForm.type === 'bridge'" label="目标链">
            <el-select v-model="taskConfigForm.toChain" placeholder="请选择目标链">
              <el-option
                v-for="(item, index) in currentSelectDApp.chains"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="币种">
            <span style="font-size: 12px; color: #909399">提示：可以自定义输入币种名称</span>
            <el-row>
              <el-select
                v-model="taskConfigForm.fromToken"
                default-first-option
                placeholder="来源币"
                filterable
                allow-create
                style="width: 100px"
              >
                <el-option
                  v-for="(item, index) in Token"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <span style="margin: 0 10px">到</span>
              <el-select
                v-model="taskConfigForm.toToken"
                default-first-option
                placeholder="目标币"
                filterable
                allow-create
                style="width: 100px"
              >
                <el-option
                  v-for="(item, index) in Token"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="15">
        <el-table
          :data="browsers"
          :height="230"
          size="small"
          show-overflow-tooltip
          style="width: 100%"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="浏览器标识" />
          <el-table-column prop="name" label="浏览器名" />
          <el-table-column prop="remark" label="浏览器备注" />
          <el-table-column prop="lastRunTime" label="上次打开时间" />
        </el-table>
      </el-col>
      <el-col>
        <div style="padding: 10px 0">
          <el-button type="danger" @click="addTask">添加任务</el-button>
          <el-button type="primary">完全随机</el-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
