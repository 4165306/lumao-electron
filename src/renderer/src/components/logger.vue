<script setup lang="ts">
import { ref } from 'vue'
const log = ref('')
window.api.onEvents.onLogger((value) => {
  const date = new Date()
  log.value +=
    date.toLocaleString() +
    ': ' +
    value +
    `
`
})
</script>
<template>
  <el-card header="日志" style="height: 100%">
    <div style="font-size: 12px; color: #909399">
      {{ log }}
    </div>
  </el-card>
</template>
