/* eslint-disable import/default */
/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import electron from 'vite-plugin-electron'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),
    Pages(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
      ],
      resolvers: [ElementPlusResolver()],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    Components({
      dts: true,
    }),
    UnoCSS(),
    electron({
      entry: 'build/index.ts',
    }),
  ],
})
