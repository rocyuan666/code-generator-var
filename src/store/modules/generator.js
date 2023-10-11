import { defineStore } from 'pinia'

const homePath = await window.electronApi.getPath('home')

const useGeneratorStore = defineStore('generator', {
  persist: true,
  state: () => ({
    genConfig: {
      projectName: 'code-generator-VAR项目',
      outPutDir: homePath,
    },
  }),
  actions: {
    setGenConfig(genConfig) {
      this.genConfig.projectName = genConfig.projectName
      this.genConfig.outPutDir = genConfig.outPutDir
    },
  },
})

export default useGeneratorStore
