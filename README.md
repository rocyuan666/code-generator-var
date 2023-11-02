# code-generator-var

## 介绍
vue-admin-roc（VAR）代码生成器；生成器默认的 `ejs` 模板生成的代码，只能在 `vue-admin-roc` 项目模板中使用（也支持指定自定义 `ejs` 模板）。  
`vue-admin-roc` 是一个 vite + vue3 + pinia 的纯前端后台管理系统模板，可通过 `roc-cli` 脚手架工具创建。  
**推荐使用 vue-admin-roc 项目模板，可与 code-generator-var 直接结合使用**

## 创建 vue-admin-roc 项目模板

1. 安装 `roc-cli` 方式  
使用 `npm install -g roc-cli` 安装 roc-cli，安装完成后全局可用 `roc` 命令；  
使用 `roc create 项目名` 选择 `vue-admin-roc(vue3.x)` 创建项目模板。

2. npx方式  
使用 ` npx roc-cli create 项目名 ` 选择 `vue-admin-roc(vue3.x)` 创建项目模板。

示例：
```bash
npm install -g roc-cli
roc create project-name

Please select the project type to create:
  vue2.x
  vue3.x
  uniapp(uview1.x)
  uniapp(uview2.x)
> vue-admin-roc(vue3.x)
  electron(vue3.x)
  koa
```

如果使用的是自己创建的前端后台管理模板，需要在生成器配置中指定自定义 `ejs` 模板！

## 自定义ejs模板
生成器内部使用 `ejs` 编写代码模板，只支持 `ejs` 模板。  
生成器内部暴露给 `ejs` 模板的数据:

```
hasAdd: true,
hasEdit: true,
hasDel: true,
hasExport: true,
addPermisstion: 'TableName.add',
editPermisstion: 'TableName.edit',
delPermisstion: 'TableName.del',
exportPermisstion: 'TableName.export',
addApi: '/api/tableName/add',
editApi: '/api/tableName/edit',
delApi: '/api/tableName/del',
exportApi: '/api/tableName/export',
listPermisstion: 'TableName.list'
listApi: '/api/tableName/list',
detailApi: '/api/tableName/detail',
subTable: '',
subTableFieldConfig: {},
_sub: {},
name: 'target table name',
comment: 'table comment',
fieldList: [
  {
    name: 'field name',
    key: 'PRI',
    label: 'field comment',
    addOrEdit: true,
    list: true,
    query: '',
    required: false,
    display: 'input',
    unit: '',
    dict: '',
  },
  ...
],
fn: {
  snakeFormatHump: (name: String, isBig: Boolean = false) => String
}
selectTableName: [],
all: {}
```
## 数据说明

### `hasAdd`
`type: Boolean`  
是否有添加功能

### `hasEdit`
`type: Boolean`  
是否有编辑功能

### `hasDel`
`type: Boolean`  
是否有删除功能

### `hasExport`
`type: Boolean`  
是否有导出功能

### `addPermisstion`
`type: String`  
添加权限标识

### `editPermisstion`
`type: String`  
编辑权限标识

### `delPermisstion`
`type: String`  
删除权限标识

### `exportPermisstion`
`type: String`  
导出权限标识

### `addApi`
`type: String`  
添加api地址

### `editApi`
`type: String`  
编辑api地址

### `delApi`
`type: String`  
删除api地址

### `exportApi`
`type: String`  
导出api地址

### `listPermisstion`
`type: String`  
列表权限标识

### `listApi`
`type: String`  
列表api地址

### `detailApi`
`type: String`  
详情api地址

### `subTable`
`type: String`  
子表名称，可以不选择 不选为空

### `subTableFieldConfig`
`type: TableFieldConfig`  
如果 `subTable` 有子表 则 `subTableFieldConfig` 中有子表配置的所有选项，选项与主表相同（注意：已经是子表的表，不会处理子表的子表！禁止套娃，子表的子表...）

### `_sub`
`subTableFieldConfig` 的别名，简短的名字方便模板使用

### `name`
`type: String`  
表名

### `comment`
`type: String`  
表注释

### `fieldList`
`type: Array<FieldConfigItem>`  
字段配置数据

#### `FieldConfigItem.name`
`type: string`  
字段名

#### `FieldConfigItem.key`
`type: string`  
字段是主键时key为：`PRI`

#### `FieldConfigItem.label`
`type: string`  
页面中显示的字段label

#### `FieldConfigItem.addOrEdit`
`type: Boolean`  
是否可以添加编辑

#### `FieldConfigItem.list`
`type: Boolean`  
是否在列表中显示

#### `FieldConfigItem.query`
`type: String`  
查询类型，可以不选择，不选为空

| 值 | 意思 |
| --- | --- |
| EQ | = 等值 |
| NE | != 不等 |
| GT | > 大于 |
| GTE | >= 大于等于 |
| LT | < 小于 |
|LTE | <= 小于等于 |
| LIKE | LIKE 模糊 |
| BETWEEN | BETWEEN 范围查询（默认模板中只在 `FieldConfigItem.display` 为： `date` 、`datetime` 生效） |

#### `FieldConfigItem.required`
`type: Boolean`  
是否必填

#### `FieldConfigItem.display`
`type: String`  
显示的表单类型

| 值 | 意思 |
| --- | --- |
| input | 文本框 |
| inputNumber | 数字框 |
| textarea | 文本域 |
| select | 下拉框 |
| radio | 单选框 |
| checkbox | 复选框 |
| date | 日期 |
| datetime | 日期时间 |
| imageUpload | 图片上传 |
| fileUpload | 文件上传 |
| editor | 富文本 |

#### `FieldConfigItem.unit`
`type: String`  
单位，无单位则为空（默认模板中只在 `FieldConfigItem.display` 为： `input` 、`inputNumber` 生效）

#### `FieldConfigItem.dict`
`type: String`  
字典类型（标识）

### `fn`
`type: Object<Function>`  
方法

#### `fn.snakeFormatHump`
`type: Function`  
蛇形命名转换驼峰命名  
fn.functioName("user_name")  ->  userName  
fn.functioName("user_name", true)  ->  UserName

### `selectTableName`
`type: Array<String>`  
选中的表名列表

### `all`
`type: Object<TableFieldConfig>`  
所有表的配置对象（ `TableFieldConfig` 中有以上全部属性）

