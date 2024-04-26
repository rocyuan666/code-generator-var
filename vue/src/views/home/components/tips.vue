<template>
  <el-dialog title="说明" v-model="open" width="50%" :close-on-click-modal="false">
    <div style="text-align: center">
      连接数据库 > 生成器配置 > 获取表信息 > 配置生成信息 > 生成代码
    </div>
    <el-divider />
    <div class="text"></div>
    <div class="text">
      本项目为纯前端代码生成器，不依赖任何后端程序，通过配置生成前端CURD代码；默认生成代码的模版仅在“vue-admin-roc(vue3.x)”项目模版中可用，如果没有使用该模版，请通过“生成器配置”选择自定义模版进行生成。
    </div>
    <div class="text">
      “vue-admin-roc(vue3.x)”项目模版可以通过“roc-cli”创建，请使用“
      <span class="red">npx roc-cli create xxx</span>
      ”（xxx请替换为要创建的项目名），选择“vue-admin-roc(vue3.x)”项目模版，创建项目；将生成的代码放入项目中的“src”目录下即可。
    </div>
    <template #footer>
      <el-button @click="handleClose">关 闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup name="Tips">
import { ref } from 'vue'

const open = ref(false)
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

<style lang="scss" scoped>
.text {
  text-indent: 2em;
  word-break: break-all;
  -webkit-user-select: text;
  user-select: text;
  .red {
    color: #a00;
  }
}
</style>
