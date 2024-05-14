<script setup lang="ts">
import { ref } from 'vue'
const log = ref('日志打开成功\n')
window.api.onEvents.onLogger((value) => {
  const date = new Date()
  log.value = date.toLocaleString() + ': ' + value + '\n' + log.value
})
</script>
<template>
  <div style="font-size: 12px; color: #909399; white-space: pre">
    {{ log }}
  </div>
</template>
