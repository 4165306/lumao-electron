<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ChainNetworkType, ConfigResultType, BrowserType } from './../../interfaces/chain'
const networks = ref<ChainNetworkType[]>()
const tokens = ref<string[]>()
const browserType = ref<BrowserType>('bit')
const chance = reactive<ConfigResultType>({
  networks: {},
  tokens: {},
  browserType: 'bit'
})
const getConfig = (): ConfigResultType => {
  return JSON.parse(JSON.stringify({ ...chance, browserType: browserType.value }))
}
const getBrowserList = async () => {
  return await window.api.network[browserType.value].lst()
}
defineExpose({ getConfig, getBrowserList })
</script>

<template>
  <div>
    <el-form label-width="auto">
      <el-form-item label="网络选择">
        <el-checkbox-group v-model="networks">
          <el-checkbox value="Optimism" name="type"> Optimism </el-checkbox>
          <el-checkbox value="Arbitrum" name="type"> Arbitrum </el-checkbox>
          <el-checkbox value="zkSync Era" name="type"> zkSync Era </el-checkbox>
          <el-checkbox value="Linea" name="type"> Linea </el-checkbox>
          <el-checkbox value="Scroll" name="type"> Scroll </el-checkbox>
          <el-checkbox value="Base" name="type"> Base </el-checkbox>
          <el-checkbox value="Polygon" name="type"> Polygon </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="交互币种选择">
        <el-checkbox-group v-model="tokens">
          <el-checkbox value="USDT" name="type"> USDT </el-checkbox>
          <el-checkbox value="USDC" name="type"> USDC </el-checkbox>
          <el-checkbox value="DAI" name="type"> DAI </el-checkbox>
          <el-checkbox value="ETH" name="type"> ETH </el-checkbox>
          <el-checkbox value="BTC" name="type"> BTC </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="浏览器类型">
        <el-radio-group v-model="browserType">
          <el-radio value="bit">Bit浏览器</el-radio>
          <el-radio value="Ads">AdsPower浏览器</el-radio>
          <el-radio value="AdsKiller">AdsPower破解版</el-radio>
        </el-radio-group>
      </el-form-item>
      <div style="margin-top: 40px"></div>
      <el-form-item label="链命中率">
        <el-form-item
          v-for="(item, index) in networks"
          :key="index"
          :label="item"
          style="margin-top: 5px"
        >
          <el-input v-model="chance.networks[item]" type="number" placeholder="请输入命中率" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="币命中率">
        <el-form-item
          v-for="(item, index) in tokens"
          :key="index"
          :label="item"
          style="margin-top: 5px"
        >
          <el-input v-model="chance.tokens[item]" type="number" placeholder="请输入命中率" />
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>
