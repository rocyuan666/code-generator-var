<template>
  <el-dialog title="生成器配置" v-model="open" width="500" :close-on-click-modal="false" draggable>
    <el-form ref="genConfigFormRef" :model="form" :rules="rules" label-width="80">
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
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
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
