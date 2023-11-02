import { defineStore } from 'pinia'
import { snakeFormatHump } from '@/utils/roc'
import useMysqlStore from '@/store/modules/mysql'

const mysqlStore = useMysqlStore()
const homePath = await window.electronApi.getPath('home', true)
const apiEjsTemplatePath = await window.electronApi.getEjsTemplateFilePath('api.ejs')
const routerEjsTemplatePath = await window.electronApi.getEjsTemplateFilePath('router.ejs')
const listEjsTemplatePath = await window.electronApi.getEjsTemplateFilePath('list.ejs')
const addOrEditEjsTemplatePath = await window.electronApi.getEjsTemplateFilePath('addOrEdit.ejs')

const useGeneratorStore = defineStore('generator', {
  persist: true,
  state: () => ({
    genConfig: {
      projectName: 'code-generator-VAR项目',
      outPutDir: homePath,
      apiEjsFilePath: apiEjsTemplatePath,
      listEjsFilePath: listEjsTemplatePath,
      addEditEjsFilePath: addOrEditEjsTemplatePath,
      routerEjsFilePath: routerEjsTemplatePath,
    },
    tableInfoList: [],
    tableFieldConfig: {},
  }),
  actions: {
    /**
     * 设置生成器配置
     * @param {*} genConfig
     */
    setGenConfig(genConfig) {
      this.genConfig.projectName = genConfig.projectName
      this.genConfig.outPutDir = genConfig.outPutDir
    },

    /**
     * 设置 & 处理 表数据
     * @param {Array} data
     */
    setTableInfoList(data) {
      if (!data.length) {
        this.tableInfoList = []
        return
      }

      this.tableInfoList = data.map((item) => ({
        name: item.TABLE_NAME,
        comment: item.TABLE_COMMENT,
      }))

      this.setTableFieldConfig()
    },

    /**
     * 设置 & 处理 生成表及字段默认数据json
     */
    setTableFieldConfig() {
      this.tableInfoList.forEach(async (item) => {
        const tableName = snakeFormatHump(item.name)
        const TableName = snakeFormatHump(item.name, true)
        this.tableFieldConfig[item.name] = {
          hasAdd: true,
          hasEdit: true,
          hasDel: true,
          hasExport: true,
          addPermisstion: `${TableName}.add`,
          editPermisstion: `${TableName}.edit`,
          delPermisstion: `${TableName}.del`,
          exportPermisstion: `${TableName}.export`,
          addApi: `/api/${tableName}/add`,
          editApi: `/api/${tableName}/edit`,
          delApi: `/api/${tableName}/del`,
          exportApi: `/api/${tableName}/export`,
          listPermisstion: `${TableName}.list`,
          listApi: `/api/${tableName}/list`,
          detailApi: `/api/${tableName}/detail`,
          subTable: '',
          subTableFieldConfig: {},
          _sub: {},
          name: item.name,
          comment: `${item.comment}`,
          fieldList: [],
        }
        const data = await window.electronApi.getFields(mysqlStore.form.database, item.name)
        const fieldInfoList = data.map((item) => ({
          name: item.COLUMN_NAME,
          comment: item.COLUMN_COMMENT,
          key: item.COLUMN_KEY, // PRI: 主键
        }))
        fieldInfoList.forEach((fieldItem) => {
          this.tableFieldConfig[item.name].fieldList.push({
            name: snakeFormatHump(fieldItem.name),
            key: fieldItem.key, // PRI: 主键
            label: fieldItem.comment,
            addOrEdit: true,
            list: true,
            query: '',
            required: false,
            display: 'input',
            unit: '',
            dict: '',
          })
        })
      })
    },
  },
})

export default useGeneratorStore
