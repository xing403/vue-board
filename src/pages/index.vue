<script setup lang="ts">
import { watchDeep } from '@vueuse/core'
import useBoardStore from '~/store/board'
import tools from '~/components/tools.vue'

const boardStore = useBoardStore()
const target = ref()
boardStore.init(target)

const background = ref<'#FFFFFF' | '#868e96'>('#FFFFFF')
watchDeep(isDark, (value) => {
  background.value = value ? '#868e96' : '#FFFFFF'
})
</script>

<template>
  <tools :el="target" />
  <div h="full">
    <svg ref="target" w="full" h="full" :bg="background" />
  </div>
</template>

<style lang="postcss" scoped>

</style>
