<template>
  <el-dialog title="连接mysql数据库" v-model="open" width="500" :close-on-click-modal="false">
    <el-form ref="mysqlFormRef" :model="mysqlStore.form" :rules="rules" label-width="auto">
      <el-form-item label="主机" prop="host">
        <el-input v-model.trim="mysqlStore.form.host" placeholder="请输入主机名" />
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model.trim="mysqlStore.form.port" placeholder="请输入端口号" />
      </el-form-item>
      <el-form-item label="数据库" prop="database">
        <el-input v-model.trim="mysqlStore.form.database" placeholder="请输入数据库名" />
      </el-form-item>
      <el-form-item label="用户名" prop="user">
        <el-input v-model.trim="mysqlStore.form.user" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="mysqlStore.form.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">连 接</el-button>
    </template>
  </el-dialog>
</template>

<script setup name="ConnectMysql">
import { ref, getCurrentInstance, defineEmits, isRef } from 'vue'
import { enumMysqlStatus } from '@/enum'
import useMysqlStore from '@/store/modules/mysql'

const mysqlStore = useMysqlStore()
const { proxy } = getCurrentInstance()

const open = ref(false)
const rules = ref({
  host: [{ required: true, message: '主机必填', trigger: 'blur' }],
  port: [{ required: true, message: '端口必填', trigger: 'blur' }],
  database: [{ required: true, message: '数据库必填', trigger: 'blur' }],
  user: [{ required: true, message: '用户名必填', trigger: 'blur' }],
  password: [{ required: true, message: '密码必填', trigger: 'blur' }],
})

const emits = defineEmits(['updateMysqlStatus'])

/**
 * 提交连接数据库
 */
function submitForm() {
  proxy.$refs['mysqlFormRef'].validate((valid) => {
    if (valid) {
      window.electronApi
        .connectMysql(JSON.stringify(mysqlStore.form))
        .then(() => {
          proxy.$modal.msgSuccess('mysql已连接')
          emits('updateMysqlStatus', enumMysqlStatus['1'])
          handleClose()
        })
        .catch((err) => {
          proxy.$modal.msgError('mysql连接错误: ' + err)
        })
    }
  })
}

/**
 * 打开弹框
 */
function handleOpen() {
  open.value = true
}

/**
 * 关闭弹框
 */
function handleClose() {
  open.value = false
}

defineExpose({ handleOpen, handleClose })
</script>

<style lang="scss" scoped></style>
