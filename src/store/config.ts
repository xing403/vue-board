import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const defaultConfig = {
  lineWidth: 3,
  color: '#000000',
}

const useConfigStore = defineStore('config',
  () => {
    const config = ref(useStorage('config', defaultConfig))
    return { config }
  },
)
export default useConfigStore
