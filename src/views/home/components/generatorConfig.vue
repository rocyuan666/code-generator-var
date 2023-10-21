<template>
  <el-dialog title="生成器配置" v-model="open" width="700" :close-on-click-modal="false">
    <el-form ref="genConfigFormRef" :model="form" :rules="rules" label-width="auto">
      <el-divider>生成设置</el-divider>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model.trim="form.projectName" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="输出目录" prop="outPutDir" @click="dSelectDirPath">
        <el-input v-model.trim="form.outPutDir" placeholder="请选择输出目录" readonly>
          <template #suffix>
            <el-icon><Folder /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-divider>模板设置</el-divider>
      <el-alert
        description="只支持ejs模板，如需要自定义模板请使用ejs编写，不选择默认使用内置模板!"
        type="warning"
        show-icon
        :closable="false"
        class="mb10"
      />
      <el-form-item label="api模板" prop="apiEjsFilePath" @click="dSelectEjsFilePath('api')">
        <el-input
          v-model.trim="form.apiEjsFilePath"
          placeholder="请选择生成api接口的ejs模板文件"
          readonly
        >
          <template #suffix>
            <el-icon><Document /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="列表模板" prop="listEjsFilePath" @click="dSelectEjsFilePath('list')">
        <el-input
          v-model.trim="form.listEjsFilePath"
          placeholder="请选择生成列表的ejs模板文件"
          readonly
        >
          <template #suffix>
            <el-icon><Document /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="添加编辑模板"
        prop="addEditEjsFilePath"
        @click="dSelectEjsFilePath('addEdit')"
      >
        <el-input
          v-model.trim="form.addEditEjsFilePath"
          placeholder="请选择生成添加编辑的ejs模板文件"
          readonly
        >
          <template #suffix>
            <el-icon><Document /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="路由模板" prop="routerEjsFilePath" @click="dSelectEjsFilePath('router')">
        <el-input
          v-model.trim="form.routerEjsFilePath"
          placeholder="请选择生成路由信息的ejs模板文件"
          readonly
        >
          <template #suffix>
            <el-icon><Document /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup name="GeneratorConfig">
import { debounce } from 'lodash-es'
import { ref, getCurrentInstance } from 'vue'
import useGeneratorStore from '@/store/modules/generator'

const { proxy } = getCurrentInstance()
const generatorStore = useGeneratorStore()

const open = ref(false)
const form = ref({
  projectName: null,
  outPutDir: null,
  apiEjsFilePath: null,
  listEjsFilePath: null,
  addEditEjsFilePath: null,
  routerEjsFilePath: null,
})
const rules = ref({
  projectName: [{ required: true, message: '项目名称必填', trigger: 'blur' }],
  outPutDir: [{ required: true, message: '输出目录必填', trigger: 'blur' }],
})

/**
 * 选择目录
 */
const dSelectDirPath = debounce(selectDirPath, 1000, { leading: true, trailing: false })
function selectDirPath() {
  window.electronApi
    .getDirPath()
    .then((paths) => {
      form.value.outPutDir = paths[0]
    })
    .catch(() => {})
}

/**
 * 选择Ejs模板文件
 */
const dSelectEjsFilePath = debounce(SelectEjsFilePath, 1000, { leading: true, trailing: false })
function SelectEjsFilePath(type) {
  window.electronApi
    .getEjsFilePath()
    .then((paths) => {
      if (type === 'api') {
        form.value.apiEjsFilePath = paths[0]
      } else if (type === 'list') {
        form.value.listEjsFilePath = paths[0]
      } else if (type === 'addEdit') {
        form.value.addEditEjsFilePath = paths[0]
      } else if (type === 'router') {
        form.value.routerEjsFilePath = paths[0]
      }
    })
    .catch(() => {})
}

/**
 * 提交修改配置
 */
function submitForm() {
  proxy.$refs['genConfigFormRef'].validate((valid) => {
    if (valid) {
      generatorStore.setGenConfig(form.value)
      handleClose()
    }
  })
}

/**
 * 打开弹框
 */
function handleOpen() {
  form.value.outPutDir = generatorStore.genConfig.outPutDir
  form.value.projectName = generatorStore.genConfig.projectName
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
