import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UseDrauuOptions } from '@vueuse/integrations/useDrauu'
import { useDrauu } from '@vueuse/integrations/useDrauu'

const useBoardStore = defineStore('config',
  () => {
    const instance = ref(null as any)
    const brush = ref(null as any)
    const mode = computedEager(() => brush.value?.mode)
    const color = computedEager(() => brush.value?.color ?? '#000000')
    function init(el: any, options?: UseDrauuOptions | undefined) {
      instance.value = useDrauu(el, options)
      brush.value = instance.value.brush
      return instance.value
    }
    function changeMode(mode: any) {
      brush.value.mode = mode
    }
    function changeArrow(enable: boolean) {
      brush.value.arrowEnd = enable
    }
    function changeColor(_color: string) {
      brush.value.color = _color
    }
    return {
      mode,
      color,
      brush,
      instance,
      init,
      changeMode,
      changeColor,
      changeArrow,
    }
  },
)
export default useBoardStore
