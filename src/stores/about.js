import { defineStore } from 'pinia'
import { asyncTasks } from 'roc-utils'
import { getCaptcha } from '@/api/about'

export const useAboutStore = defineStore('about', {
  state: () => ({
    captchaData: {},
  }),
  getters: {},
  actions: {
    async actionCaptchaData() {
      const [err, res] = await asyncTasks(getCaptcha())
      if (err) return console.log(err)
      this.captchaData = res.data
    },
  },
})
