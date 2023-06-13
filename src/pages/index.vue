<script setup lang="ts">
import { toRefs, watchDeep } from '@vueuse/core'
import useBoardStore from '~/store/board'

const colors = ref(['#000000', '#ef4444', '#22c55e', '#3b82f6', '#FFA500', '#FFFFFF'])

const boardStore = useBoardStore()
const target = ref()
const { undo, redo, canUndo, canRedo, clear, brush } = boardStore.init(target)
const { color, size } = toRefs(boardStore.brush)
const background = ref<'#FFFFFF' | '#868e96'>('#FFFFFF')

watchDeep(isDark, (value) => {
  background.value = value ? '#868e96' : '#FFFFFF'
})
function handleChangeMode(mode: any) {
  boardStore.changeMode(mode)
}
function handleChangeBrushColor(_color: string) {
  boardStore.changeColor(_color)
}
const showTools = ref(false)
</script>

<template>
  <div class="tools" flex="~ col" bg="light-blue-100" top="15%" fixed p-2 pb-2 pt-3 rd-r="15px">
    <button class="_button" ce i-carbon-arrows-vertical ma mb-1 @click="showTools = !showTools" />
    <el-collapse-transition>
      <div v-show="showTools" flex="~ col" flex-justify-center flex-items-center>
        <div>
          <el-color-picker v-model="color" show-alpha :predefine="colors" @active-change="handleChangeBrushColor" />
        </div>
        <el-popover placement="right" w-20 trigger="click">
          <template #reference>
            <button class="_button" i-mdi-chart-line-variant />
          </template>
          <el-slider v-model="size" :min="1" :max="10" show-stops mr-2 />
          <div w-full :style="{ height: `${size}px`, background: boardStore.color }" rd-10px />
        </el-popover>
        <button class="_button" :disabled="!canUndo" i-carbon-undo @click="undo()" />
        <button class="_button" :disabled="!canRedo" i-carbon-redo icon-btn @click="redo()" />
        <button class="_button" i-carbon-clean icon-btn @click="clear()" />
        <button class="_button" :class="{ active: boardStore.mode === 'draw' }" i-carbon-pen @click="handleChangeMode('draw')" />
        <button
          class="_button" :class="{ active: boardStore.mode === 'line' && !brush.arrowEnd }" i-mdi-slash-forward
          @click="handleChangeMode('line')"
        />
        <button
          class="_button" :class="{ active: boardStore.mode === 'rectangle' }" i-carbon-checkbox
          @click="handleChangeMode('rectangle')"
        />
        <button
          class="_button" :class="{ active: boardStore.mode === 'ellipse' }" i-mdi-circle-outline
          @click="handleChangeMode('ellipse')"
        />
        <button class="_button" :class="{ active: boardStore.mode === 'eraseLine' }" i-carbon-erase @click="handleChangeMode('eraseLine')" />
      </div>
    </el-collapse-transition>
  </div>
  <div h="full">
    <svg ref="target" w="full" h="full" :bg="background" />
  </div>
</template>

<style lang="postcss" scoped>
.tools {
  ._button {
    @apply w-6 h-6 mt-1 icon-btn
  }

  .active {
    @apply text-blue-500 border-gray-400
  }
}
</style>
