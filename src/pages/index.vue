<script setup lang="ts">
import { useDrauu } from '@vueuse/integrations/useDrauu'
import { toRefs, watchDeep } from '@vueuse/core'
import Scrubber from '~/components/Scubber.vue'

const colors = ref(['black', '#ef4444', '#22c55e', '#3b82f6', 'orange', 'white'])
const target = ref()
const { undo, redo, canUndo, canRedo, clear, brush } = useDrauu(target, {
  brush: {
    color: 'black', // 刷子颜色
    size: 3, // 刷子宽度
  },
})
const { mode, color, size } = toRefs(brush)
const background = ref<'white' | '#868e96'>('white')
function initBrush() {
  color.value = 'black'
  size.value = 3
}
watchDeep(isDark, (value) => {
  background.value = value ? '#868e96' : 'white'
})
function handleChangeBrushColor(_color: string) {
  color.value = _color
}
initBrush()
</script>

<template>
  <div
    class="header" flex="~ row" absolute left="50%" transform="translate-x--50%" mt-10px h-6 grid-items-center
    align="center"
  >
    <button
      v-for="_color in colors" :key="_color" :class="{ active: _color === color }" class="_button"
      :style="{ background: _color }" border="2 dark:(light-900 opacity-50) rounded-full"
      @click="handleChangeBrushColor(_color)"
    />
    <Scrubber v-model="size" w="100" :min="1" mr-5 h-1 :max="10" />
    <button class="_button" :disabled="!canUndo" i-carbon-undo icon-btn @click="undo()" />
    <button class="_button" :disabled="!canRedo" i-carbon-redo icon-btn @click="redo()" />
    <button class="_button" i-carbon-clean icon-btn @click="clear()" />
    <button class="_button" :class="{ active: brush.mode === 'draw' }" i-carbon-pen icon-btn @click="mode = 'draw'" />
    <button
      class="_button" :class="{ active: brush.mode === 'line' && !brush.arrowEnd }" i-mdi-slash-forward icon-btn
      @click="mode = 'line'"
    />
    <button
      class="_button" :class="{ active: brush.mode === 'rectangle' }" i-carbon-checkbox icon-btn
      @click="mode = 'rectangle'"
    />
    <button
      class="_button" :class="{ active: brush.mode === 'ellipse' }" i-mdi-circle-outline icon-btn
      @click="mode = 'ellipse'"
    />
    <button
      class="_button" :class="{ active: brush.mode === 'eraseLine' }" i-carbon-erase icon-btn
      @click="mode = 'eraseLine'"
    />
    <button class="_button" i-carbon-awake dark:i-carbon-asleep @click="toggleDark()" />
  </div>
  <div h="full">
    <svg ref="target" w="full" h="full" :bg="background" />
  </div>
</template>

<style lang="postcss">
.header {
  ._button {
    @apply w-6 h-6 mr-1
  }

  .active {
    @apply text-blue-500 border-gray-400
  }
}
</style>
