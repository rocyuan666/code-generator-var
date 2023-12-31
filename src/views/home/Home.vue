<template>
  <div class="app">
    <el-affix>
      <div class="controller-box">
        <div class="mysql-status mb10">
          <div class="left">
            <p class="text">
              数据库状态:
              <el-text type="danger" v-if="mysqlStore.mysqlStatus === enumMysqlStatus['0']">{{
                mysqlStore.mysqlStatus
              }}</el-text>
              <el-text type="success" v-if="mysqlStore.mysqlStatus === enumMysqlStatus['1']">
                {{ mysqlStore.mysqlStatus }} - {{ mysqlStore.form.database }}
              </el-text>
            </p>
            <el-button
              type="primary"
              size="small"
              @click="handleConnectMysql"
              v-if="mysqlStore.mysqlStatus === enumMysqlStatus['0']"
              >连接</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleConnectMysqlEnd"
              v-if="mysqlStore.mysqlStatus === enumMysqlStatus['1']"
              >断开</el-button
            >
          </div>
          <el-button type="warning" size="small" round @click="handleTips">说明</el-button>
        </div>
        <el-button type="warning" plain @click="handleGenCodeConfig">生成器配置</el-button>
        <!-- 数据库表 -->
        <el-button type="primary" plain @click="handleGetTables" :loading="loading">
          获取表信息
        </el-button>
        <el-button type="success" plain @click="handleGenCode" :disabled="!selectData.length">
          生成代码
        </el-button>
      </div>
    </el-affix>
    <el-table
      :data="generatorStore.tableInfoList"
      empty-text="暂无数据~"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column type="index" label="序号" align="center" width="100" />
      <el-table-column prop="name" label="表名" align="center" />
      <el-table-column prop="comment" label="描述" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button link type="primary" icon="Tools" @click="handleTableFieldConfig(row)">
            配置
          </el-button>
          <el-button link type="success" icon="Download" @click="handleGenCode($event, row.name)">
            生成代码
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <ConnectMysql ref="connectMysqlRef" @updateMysqlStatus="updateMysqlStatus" />
    <GeneratorConfig ref="generatorConfigRef" />
    <TableConfig ref="tableConfigRef" />
    <Tips ref="tipsRef" />
  </div>
</template>

<script setup name="Home">
import { ref, getCurrentInstance } from 'vue'
import { enumMysqlStatus } from '@/enum'
import ConnectMysql from './components/connectMysql.vue'
import GeneratorConfig from './components/generatorConfig.vue'
import TableConfig from './components/tableConfig.vue'
import Tips from './components/tips.vue'
import useMysqlStore from '@/store/modules/mysql'
import useGeneratorStore from '@/store/modules/generator'

const mysqlStore = useMysqlStore()
const generatorStore = useGeneratorStore()
const { proxy } = getCurrentInstance()

const loading = ref(false)

/**
 * 连接mysql
 */
function handleConnectMysql() {
  proxy.$refs['connectMysqlRef'].handleOpen()
}

/**
 * 断开连接
 */
function handleConnectMysqlEnd() {
  proxy.$modal
    .confirm('是否确认断开本次连接？请确保已经生成代码，断开后配置数据将丢失！')
    .then(() => {
      window.electronApi
        .connectMysqlEnd()
        .then(() => {
          proxy.$modal.msgSuccess('mysql已断开')
          mysqlStore.setMysqlStatus(enumMysqlStatus['0'])
          generatorStore.setTableInfoList([])
        })
        .catch((err) => {
          proxy.$modal.msgError('mysql断开错误: ' + err)
        })
    })
    .catch(() => {})
}

/**
 * 打开说明
 */
function handleTips() {
  proxy.$refs['tipsRef'].handleOpen()
}

/**
 * 修改数据库连接状态
 * @param {String} status
 */
function updateMysqlStatus(status) {
  mysqlStore.setMysqlStatus(status)
}

/**
 * 获取表信息
 */
async function handleGetTables() {
  loading.value = true
  if (mysqlStore.mysqlStatus == enumMysqlStatus['1']) {
    if (generatorStore.tableInfoList.length) {
      proxy.$modal
        .confirm('生成器中已存在表数据，重新获取将丢失已配置数据，请确保已配置数据已经生成了代码！')
        .then(async () => {
          // 数据库连接成功
          const data = await window.electronApi.getTables(mysqlStore.form.database)
          // 记录需要的表数据
          generatorStore.setTableInfoList(data)
          proxy.$modal.msgSuccess('获取表信息成功')
        })
        .catch(() => {})
    } else {
      // 数据库连接成功
      const data = await window.electronApi.getTables(mysqlStore.form.database)
      // 记录需要的表数据
      generatorStore.setTableInfoList(data)
      proxy.$modal.msgSuccess('获取表信息成功')
    }
    loading.value = false
  } else {
    // 数据库连接失败
    proxy.$modal.msgError('获取表信息失败，请确保已经连接到数据库')
    loading.value = false
  }
}

/** 选中的数据 */
const selectData = ref([])
/**
 * 表格前多选框选中数据
 * @param {Array} selection
 */
function handleSelectionChange(selection) {
  selectData.value = selection
}

/**
 * 配置表及字段信息
 * @param {*} row
 */
function handleTableFieldConfig(row) {
  proxy.$refs['tableConfigRef'].handleOpen(row)
}

/**
 * 生成代码
 */
function handleGenCode(event, tableName) {
  const selectTableNameList = tableName ? [tableName] : selectData.value.map((item) => item.name)
  const genJsonData = {
    genConfig: generatorStore.genConfig,
    tableFieldConfig: generatorStore.tableFieldConfig,
  }
  window.electronApi
    .genCode(JSON.stringify(selectTableNameList), JSON.stringify(genJsonData))
    .then(() => {
      proxy.$modal
        .confirm('生成成功，打开生成代码目录')
        .then(() => {
          window.electronApi.openExplorer(generatorStore.genConfig.outPutDir)
        })
        .catch((err) => {
          console.log('取消')
        })
    })
    .catch(() => {
      proxy.$modal.msgError('生成失败！请重试~')
    })
}

/**
 * 生成器配置
 */
function handleGenCodeConfig() {
  proxy.$refs['generatorConfigRef'].handleOpen()
}
</script>

<style lang="scss" scoped>
.app {
  padding: 0 10px 0 10px;
  .controller-box {
    width: 100%;
    background-color: #fff;
    padding: 10px 0;
  }
}
.mysql-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .text {
      margin-right: 10px;
    }
  }
}
</style>
