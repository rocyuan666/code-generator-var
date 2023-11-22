<template>
  <el-dialog
    :title="title"
    v-model="open"
    width="96%"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <el-divider>表设置</el-divider>
    <el-alert
      description="本表是否有 添加、编辑、删除、导出、子表、api地址功能配置"
      type="warning"
      show-icon
      :closable="false"
      class="mb10"
    />
    <el-form :model="generatorStore.tableFieldConfig[tableName]">
      <el-row :gutter="40">
        <el-col :span="6">
          <el-form-item label="添加" prop="hasAdd">
            <el-switch v-model="generatorStore.tableFieldConfig[tableName].hasAdd" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="编辑" prop="hasEdit">
            <el-switch v-model="generatorStore.tableFieldConfig[tableName].hasEdit" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="删除" prop="hasDel">
            <el-switch v-model="generatorStore.tableFieldConfig[tableName].hasDel" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导出" prop="hasExport">
            <el-switch v-model="generatorStore.tableFieldConfig[tableName].hasExport" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="添加权限" prop="addPermisstion">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].addPermisstion"
              placeholder="添加权限标识"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="编辑权限" prop="editPermisstion">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].editPermisstion"
              placeholder="编辑权限标识"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="删除权限" prop="delPermisstion">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].delPermisstion"
              placeholder="删除权限标识"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导出权限" prop="exportPermisstion">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].exportPermisstion"
              placeholder="导出权限标识"
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
        <el-col :span="6">
          <el-form-item label="列表权限" prop="listPermisstion">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].listPermisstion"
              placeholder="列表权限标识"
            ></el-input>
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
          <el-form-item label="页面名称" prop="comment">
            <el-input
              v-model.trim="generatorStore.tableFieldConfig[tableName].comment"
              placeholder="页面名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="选择子表" prop="subTable">
            <template #label>
              <div style="display: flex; align-items: center">
                <p style="margin-right: 2px">选择子表</p>
                <el-tooltip
                  effect="dark"
                  content="禁止套娃！已是子表的请勿设置子表"
                  placement="top"
                >
                  <el-icon style="cursor: pointer" size="16"><WarningFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-select
              v-model="generatorStore.tableFieldConfig[tableName].subTable"
              placeholder="选择子表"
              clearable
            >
              <el-option
                v-for="item in generatorStore.tableInfoList.filter(
                  (item) => item.name !== tableName
                )"
                :key="item.name"
                :label="item.comment"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider>字段设置</el-divider>
    <el-alert
      description="本表字段功能配置，红颜色为主键字段，字段可拖拽排序"
      type="warning"
      show-icon
      :closable="false"
      class="mb10"
    />
    <el-table
      row-key="name"
      id="fieldTableId"
      :data="generatorStore.tableFieldConfig[tableName].fieldList"
      empty-text="暂无数据~"
    >
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="字段名" prop="name" align="center">
        <template #default="{ row }">
          <el-input
            :class="{ red: row.key === 'PRI' }"
            v-model.trim="row.name"
            placeholder="字段名"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="标签名" prop="label" align="center">
        <template #default="{ row }">
          <el-input v-model.trim="row.label" placeholder="标签名"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="添加编辑显示" prop="addOrEdit" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.addOrEdit" />
        </template>
      </el-table-column>
      <el-table-column label="列表显示" prop="list" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.list" />
        </template>
      </el-table-column>
      <el-table-column label="查询方式" prop="query" align="center">
        <template #default="{ row }">
          <el-select v-model="row.query" placeholder="查询方式" clearable>
            <el-option label="=" value="EQ" />
            <!-- <el-option label="!=" value="NE" />
            <el-option label=">" value="GT" />
            <el-option label=">=" value="GTE" />
            <el-option label="<" value="LT" />
            <el-option label="<=" value="LTE" /> -->
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
            <el-option label="数字框" value="inputNumber" />
            <el-option label="文本域" value="textarea" />
            <el-option label="下拉框" value="select" />
            <el-option label="单选框" value="radio" />
            <el-option label="复选框" value="checkbox" />
            <el-option label="日期" value="date" />
            <el-option label="日期时间" value="datetime" />
            <el-option label="图片上传" value="imageUpload" />
            <el-option label="文件上传" value="fileUpload" />
            <el-option label="富文本" value="editor" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="单位" prop="unit" align="center">
        <template #default="{ row }">
          <el-input v-model.trim="row.unit" placeholder="单位"></el-input>
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
import { nextTick, ref } from 'vue'
import Sortable from 'sortablejs'
import useGeneratorStore from '@/store/modules/generator'
import { cloneDeep } from 'lodash'

const generatorStore = useGeneratorStore()
const tableName = ref('')
const title = ref('')
const open = ref(false)

/**
 * 打包对话框
 * @param {*} row
 */
function handleOpen(row) {
  tableName.value = row.name
  title.value = `${row.name} 表配置`
  open.value = true
  nextTick(() => {
    initSortable()
  })
}

/**
 * 关闭对话框
 */
function handleClose() {
  open.value = false
}

/**
 * 初始化拖拽排序
 */
function initSortable() {
  const fieldTableDom = document.querySelector('#fieldTableId tbody')
  Sortable.create(fieldTableDom, {
    animation: 150,
    onEnd(event) {
      if (event.oldIndex !== event.newIndex) {
        const currentItem = cloneDeep(
          generatorStore.tableFieldConfig[tableName.value].fieldList[event.oldIndex]
        )
        generatorStore.tableFieldConfig[tableName.value].fieldList.splice(event.oldIndex, 1)
        generatorStore.tableFieldConfig[tableName.value].fieldList.splice(
          event.newIndex,
          0,
          currentItem
        )
      }
    },
  })
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
.red :deep(.el-input__inner) {
  color: #f00 !important;
}
</style>
