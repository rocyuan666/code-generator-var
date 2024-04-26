import autoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function createAutoImport() {
  return autoImport({
    resolvers: [ElementPlusResolver()],
  })
}
