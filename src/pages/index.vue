<script setup lang="ts">
import { useDrauu } from '@vueuse/integrations/useDrauu'
import { toRefs } from '@vueuse/core'
import Scrubber from '~/components/Scubber.vue'

const colors = ref(['black', '#ef4444', '#22c55e', '#3b82f6'])
const target = ref()
const { undo, redo, canUndo, canRedo, clear, brush } = useDrauu(target, {
  brush: {
    color: 'black', // 刷子颜色
    size: 1, // 刷子宽度
  },
})
const { mode, color, size } = toRefs(brush)

function initBrush() {
  color.value = 'black'
  size.value = 1
}
function handleChangeBrushColor(_color: string) {
  color.value = _color
}
function handlechandeBrushLineSize(_size: number) {
  size.value = _size
}

initBrush()
</script>

<template>
  <div position="absolute" flex="~ row">
    <button
      v-for="_color in colors" :key="_color" :class="{ active: _color === color }" m="r-1"
      :style="{ background: _color }" w="6" h="6" border="2 dark:(light-900 opacity-50) rounded-full" @click="handleChangeBrushColor(_color)"
    />
    <div w="200" h-24px lh-24px>
      <Scrubber v-model="size" w="full" h="full" :min="1" :max="10" />
    </div>
    <button w="6" h="6" m="r-1" :disabled="!canUndo" :style="{ color: canUndo ? 'black' : '#999' }" i-carbon-undo icon-btn @click="undo()" />
    <button w="6" h="6" m="r-1" :disabled="!canRedo" :style="{ color: canRedo ? 'black' : '#999' }" i-carbon-redo icon-btn @click="redo()" />
    <button w="6" h="6" m="r-1" i-carbon-clean icon-btn @click="clear()" />

    <button w="6" h="6" m="r-1" :class="{ active: brush.mode === 'draw' }" i-carbon-pen @click="mode = 'draw'" />
    <button w="6" h="6" m="r-1" :class="{ active: brush.mode === 'line' && !brush.arrowEnd }" i-mdi-slash-forward @click="mode = 'line'" />
    <button w="6" h="6" m="r-1" :class="{ active: brush.mode === 'rectangle' }" i-carbon-checkbox @click="mode = 'rectangle'" />
    <button w="6" h="6" m="r-1" :class="{ active: brush.mode === 'ellipse' }" i-mdi-circle-outline @click="mode = 'ellipse'" />
    <button w="6" h="6" m="r-1" dark:i-carbon-awake i-carbon-asleep @click="toggleDark()" />
  </div>
  <div h="full">
    <svg ref="target" w="full" h="full" bg="white" />
  </div>
</template>
