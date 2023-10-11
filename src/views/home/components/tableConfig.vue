<template>
  <el-dialog :title="title" v-model="open" width="80%" :close-on-click-modal="false" draggable>
    <el-divider>表设置</el-divider>
    <el-alert
      description="本表是否有 添加、编辑、删除、导出、子表功能"
      type="warning"
      show-icon
      :closable="false"
      class="mb10"
    />
    <el-form :model="table" :inline="true">
      <el-row>
        <el-col :span="6">
          <el-form-item label="添加" prop="add">
            <el-switch v-model="table.add" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="编辑" prop="edit">
            <el-switch v-model="table.edit" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="删除" prop="del">
            <el-switch v-model="table.del" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导出" prop="export">
            <el-switch v-model="table.export" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="子表表名" prop="subTable">
            <el-input v-model.trim="table.subTable" placeholder="子表名，没有则不填写"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="列表接口" prop="listApi">
            <el-input v-model.trim="table.listApi" placeholder="列表api地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="详情接口" prop="detailApi">
            <el-input v-model.trim="table.detailApi" placeholder="详情api地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="添加接口" prop="addApi">
            <el-input v-model.trim="table.addApi" placeholder="添加api地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="编辑接口" prop="editApi">
            <el-input v-model.trim="table.editApi" placeholder="编辑api地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="删除接口" prop="delApi">
            <el-input v-model.trim="table.delApi" placeholder="删除api地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导出接口" prop="exportApi">
            <el-input v-model.trim="table.exportApi" placeholder="导出api地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider>字段设置</el-divider>
    <el-table :data="tableList" empty-text="暂无数据~">
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
    </el-table>
  </el-dialog>
</template>

<script setup name="TableConfig">
import { ref } from 'vue'

const title = ref('')
const open = ref(false)

const table = ref({
  add: true,
  edit: true,
  del: true,
  export: true,
  subTable: '',
  listApi: '/api/tableName/list',
  detailApi: '/api/tableName/detail',
  addApi: '/api/tableName/add',
  editApi: '/api/tableName/edit',
  delApi: '/api/tableName/del',
  exportApi: '/api/tableName/export',
})
const tableList = ref([{ field: 'name', label: '名称' }])

function handleOpen(row) {
  title.value = `${row.TABLE_NAME} 表配置`
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

<style lang="scss" scoped></style>
