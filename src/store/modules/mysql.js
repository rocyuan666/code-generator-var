import { defineStore } from 'pinia'
import { enumMysqlStatus } from '@/enum'

const useMysqlStore = defineStore('mysql', {
  persist: true,
  state: () => ({
    mysqlStatus: enumMysqlStatus['0'],
    form: {
      host: 'localhost',
      port: '3306',
      database: '',
      user: '',
      password: '',
    },
    tableInfo: [],
  }),
  actions: {
    setMysqlStatus(status) {
      this.mysqlStatus = status
    },
    setTableInfo(data) {
      this.tableInfo = data
    },
  },
})

export default useMysqlStore
