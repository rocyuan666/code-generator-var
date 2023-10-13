<template>
  <el-dialog :title="title" v-model="open" width="96%" :close-on-click-modal="false" draggable>
    <el-divider>表设置</el-divider>
    <el-alert
      description="本表是否有 添加、编辑、删除、导出、子表、api地址功能配置"
      type="warning"
      show-icon
      :closable="false"
      class="mb10"
    />
    <el-form :model="generatorStore.tableFieldConfig[tableName]" :inline="true">
      <el-row>
        <el-col :span="6">
          <el-form-item label="添加" prop="add">
            <el-switch v-model="generatorStore.tableFieldConfig[tableName].add" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="编辑" prop="edit">
            <el-switch v-model="generatorStore.tableFieldConfig[tableName].edit" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="删除" prop="del">
            <el-switch v-model="generatorStore.tableFieldConfig[tableName].del" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导出" prop="export">
            <el-switch v-model="generatorStore.tableFieldConfig[tableName].export" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="选择子表" prop="subTable">
            <el-select
              v-model="generatorStore.tableFieldConfig[tableName].subTable"
              placeholder="选择子表"
              clearable
            >
              <el-option
                v-for="item in generatorStore.tableInfoList"
                :key="item.name"
                :label="item.comment"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="列表接口" prop="listApi">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].listApi"
              placeholder="列表api地址"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="详情接口" prop="detailApi">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].detailApi"
              placeholder="详情api地址"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="添加接口" prop="addApi">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].addApi"
              placeholder="添加api地址"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="编辑接口" prop="editApi">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].editApi"
              placeholder="编辑api地址"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="删除接口" prop="delApi">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].delApi"
              placeholder="删除api地址"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导出接口" prop="exportApi">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].exportApi"
              placeholder="导出api地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider>字段设置</el-divider>
    <el-alert
      description="本表字段功能配置"
      type="warning"
      show-icon
      :closable="false"
      class="mb10"
    />
    <el-table :data="generatorStore.tableFieldConfig[tableName].field" empty-text="暂无数据~">
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="字段名" prop="field" align="center">
        <template #default="{ row }">
          <el-input v-model.trim="row.field" placeholder="字段名"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="标签名" prop="label" align="center">
        <template #default="{ row }">
          <el-input v-model.trim="row.label" placeholder="标签名"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="添加编辑" prop="addOrEdit" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.addOrEdit" />
        </template>
      </el-table-column>
      <el-table-column label="列表" prop="list" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.list" />
        </template>
      </el-table-column>
      <el-table-column label="查询" prop="query" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.query" />
        </template>
      </el-table-column>
      <el-table-column label="查询方式" prop="queryWay" align="center">
        <template #default="{ row }">
          <el-select v-model="row.queryWay" placeholder="查询方式" clearable>
            <el-option label="=" value="EQ" />
            <el-option label="!=" value="NE" />
            <el-option label=">" value="GT" />
            <el-option label=">=" value="GTE" />
            <el-option label="<" value="LT" />
            <el-option label="<=" value="LTE" />
            <el-option label="LIKE" value="LIKE" />
            <el-option label="BETWEEN" value="BETWEEN" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="必填" prop="required" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.required" />
        </template>
      </el-table-column>
      <el-table-column label="显示类型" prop="display" align="center">
        <template #default="{ row }">
          <el-select v-model="row.display" placeholder="显示类型">
            <el-option label="文本框" value="input" />
            <el-option label="文本域" value="textarea" />
            <el-option label="下拉框" value="select" />
            <el-option label="单选框" value="radio" />
            <el-option label="复选框" value="checkbox" />
            <el-option label="日期控件" value="datetime" />
            <el-option label="图片上传" value="imageUpload" />
            <el-option label="文件上传" value="fileUpload" />
            <el-option label="富文本控件" value="editor" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="字典标识" prop="dict" align="center">
        <template #default="{ row }">
          <el-input v-model.trim="row.dict" placeholder="字典标识"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup name="TableConfig">
import { ref } from 'vue'
import useGeneratorStore from '@/store/modules/generator'

const generatorStore = useGeneratorStore()
const tableName = ref('')
const title = ref('')
const open = ref(false)

function handleOpen(row) {
  tableName.value = row.name
  title.value = `${row.name} 表配置`
  open.value = true
}

function handleClose() {
  open.value = false
}

defineExpose({
  handleOpen,
  handleClose,
})
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
  .el-button {
    margin: 0 18px;
  }
}
</style>
