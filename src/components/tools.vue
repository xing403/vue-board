<script setup lang="ts">
import useBoardStore from '~/store/board'

const boardStore = useBoardStore()

const colors = ['#000000', '#ef4444', '#22c55e', '#3b82f6', '#FFA500', '#FFFFFF']

const { color, size } = toRefs(boardStore.brush)
// 撤回，取消撤回，清空
const { undo, redo, clear } = boardStore.instance
function handleChangeMode(mode: any, arrow?: boolean) {
  boardStore.changeMode(mode)
  arrow ? boardStore.changeArrow(true) : boardStore.changeArrow(false)
}
function handleChangeBrushColor(_color: string) {
  boardStore.changeColor(_color)
}
const showTools = ref(false)
const boardMode = [{
  id: 1,
  name: 'draw',
  icon: 'i-carbon-pen',
  arrow: false,
}, {
  id: 2,
  name: 'line',
  icon: 'i-mdi-slash-forward',
  arrow: false,
}, {
  id: 3,
  name: 'rectangle',
  icon: 'i-carbon-checkbox',
  arrow: false,
}, {
  id: 4,
  name: 'ellipse',
  icon: 'i-mdi-circle-outline',
  arrow: false,
}, {
  id: 5,
  name: 'eraseLine',
  icon: 'i-carbon-erase',
  arrow: false,
}, {
  id: 6,
  name: 'line',
  icon: 'i-carbon-arrow-up-right',
  arrow: true,
}]
</script>

<template>
  <div class="tools" flex="~ col" bg="light-blue-100" dark:bg="dark-500/20" top="15%" fixed p-2 pb-2 pt-3 rd-r="15px">
    <button class="_button" i-carbon-arrows-vertical mb-1 @click="showTools = !showTools" />
    <el-collapse-transition>
      <div v-show="showTools" flex="~ col" flex-justify-center flex-items-center>
        <el-divider direction="horizontal" content-position="center" mb-1 mt-1 />
        <el-color-picker v-model="color" show-alpha :predefine="colors" @active-change="handleChangeBrushColor" />
        <el-popover placement="right" w-20 trigger="click">
          <template #reference>
            <button class="_button" i-mdi-chart-line-variant />
          </template>
          <el-slider v-model="size" :min="1" :max="10" show-stops mr-2 />
          <div w-full :style="{ height: `${size}px`, background: boardStore.color }" rd-10px />
        </el-popover>

        <button class="_button" i-carbon-undo @click="undo()" />
        <button class="_button" i-carbon-redo @click="redo()" />
        <button class="_button" i-carbon-clean @click="clear()" />
        <button
          v-for="item in boardMode" :key="item.id" class="_button" :class="[
            { active: boardStore.mode === item.name && boardStore.brush.arrowEnd === item.arrow },
            item.icon,
          ]" @click="handleChangeMode(item.name, item.arrow)"
        />
      </div>
    </el-collapse-transition>
    <el-divider direction="horizontal" content-position="center" mb-1 mt-1 />
    <button class="_button" i-carbon-awake dark:i-carbon-asleep @click="toggleDark()" />
    <button class="_button" i-carbon-information-filled />
  </div>
</template>

<style lang="postcss" scoped>
.tools {
  ._button {
    @apply w-6 h-6 mt-1 icon-btn ma
  }

  .active {
    @apply text-blue-500 border-gray-400
  }
}
</style>
