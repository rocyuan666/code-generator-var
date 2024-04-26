import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSetupExtend } from './vueSetupExtend'
import { createCompression } from './compression'
import { createTopLevelAwait } from './topLevelAwait'
import { createAutoImport } from './auto-import'
import { createComponents } from './components'

export function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue(), vueJsx()]
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createTopLevelAwait())
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
