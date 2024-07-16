# code-generator-VAR

## 介绍

code-generator-VAR 是一款纯前端代码生成器，不依赖任何后端程序，使用简单，支持 windows、mac、linux 三大平台；生成器生成的代码，默认是需要在 `vue-admin-roc(vue3.x)` 项目模板中使用（也可以不使用该模版，编写自定义`ejs`模板）。  
`vue-admin-roc(vue3.x)` 是一个 vite + vue3 + pinia 的纯前端后台管理系统模板，可通过 `roc-cli` 脚手架工具创建。  
**推荐使用 `vue-admin-roc(vue3.x)` 项目模板，可与 `code-generator-VAR` 直接结合使用**

## 演示视频

<a href="https://www.bilibili.com/video/BV1qN411g7eE/?spm_id_from=333.999.0.0&vd_source=ebbf099c9e8fce759120f1f2a1094bcb" target="_blank">点击查看</a>

## 使用方式

### 1.安装生成器

下载地址：[https://github.com/rocyuan666/code-generator-var/releases](https://github.com/rocyuan666/code-generator-var/releases)  
windows版本：`code-generator-VAR-win32-x64-x.x.x.msi`、`code-generator-VAR-win32-x64-x.x.x.zip`  
linux版本：`code-generator-var_x.x.x_amd64.deb`、`code-generator-VAR-linux-x64-x.x.x.zip`  
mac版本：`code-generator-VAR-darwin-arm64-x.x.x.zip`

### 2.使用生成器生成

生成器使用：

- 点击`连接`输入数据库信息连接数据库
- 点击`获取表数据`将会拉取所连接的数据库表信息
- 点击每一行后的`配置`配置生成代码的数据配置
- 生成某一张表：点击每一行后面的`生成代码`将会生成该行（表）的前端代码
- 批量生成：选中每一行前面的选择框（顶部选择框可以全选），点顶部的`生成代码`将会生成所选行（表）的前端代码

生成器配置：可以配置生成代码的输出目录、项目名称、及四种生成模版（提供自定义模版使用，需要一定的`ejs`知识）  
生成代码的目录为：`配置的输出目录/配置的项目名称/vue/api`、`配置的输出目录/配置的项目名称/vue/views`、`配置的输出目录/配置的项目名称/vue/router`

### 3.创建 vue-admin-roc(vue3.x) 项目模板

默认生成的代码是需要创建`vue-admin-roc(vue3.x)`项目模版使用。

命令行中使用 `npx roc-cli create 项目名` 选择 `vue-admin-roc(vue3.x)` 创建项目模板。

示例：

```bash
npx roc-cli create project-name

Please select the project type to create:
  vue2.x
  vue3.x
  uniapp(uview1.x)
  uniapp(uview2.x)
> vue-admin-roc(vue3.x)
  electron(vue3.x)
  koa
```

### 4.生成的代码使用

确保以下两步已完成：

- 生成代码完成
- 创建 `vue-admin-roc(vue3.x)` 模版完成

将生成的代码（`配置的输出目录/配置的项目名称/vue/*`）整合进项目模版的 `src/*` 下，进行常规开发即可。

## 自定义ejs模板

如项目没有使用 `vue-admin-roc(vue3.x)` 模版，生成出来的代码是使用不了的，需要根据自己项目结构编写自定义的生成模版，生成器内部使用 `ejs` 编写代码模板，只支持 `ejs` 模板。  
生成器内部暴露给 `ejs` 模板的数据，开发者可根据以下数据进行自定义模版的编写，写好模版后，可在生成器软件的`生成器配置`中选择自定义的`ejs模版`进行代码生成:

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
    dataType: 'mysql field type'
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

#### `FieldConfigItem.dataType`

`type: string`  
字段mysql类型

#### `FieldConfigItem.addOrEdit`

`type: Boolean`  
是否可以添加编辑

#### `FieldConfigItem.list`

`type: Boolean`  
是否在列表中显示

#### `FieldConfigItem.query`

`type: String`  
查询类型，可以不选择，不选为空  
一般前端在代码上是不区分查询类型，内置 `ejs` 模版中与前端代码有关系的就是一个单值和范围值， `EQ` `LIKE` 随便选即可  
生成器中预留出来是为了更好的自定义模版

| 值      | 类型                                                                                       |
| ------- | ------------------------------------------------------------------------------------------ |
| EQ      | = 等值                                                                                     |
| LIKE    | LIKE 模糊                                                                                  |
| BETWEEN | BETWEEN 范围查询（默认模板中只在 `FieldConfigItem.display` 为： `date` 、`datetime` 生效） |

#### `FieldConfigItem.required`

`type: Boolean`  
是否必填

#### `FieldConfigItem.display`

`type: String`  
显示的表单类型

| 值          | 意思     |
| ----------- | -------- |
| input       | 文本框   |
| inputNumber | 数字框   |
| textarea    | 文本域   |
| select      | 下拉框   |
| radio       | 单选框   |
| checkbox    | 复选框   |
| date        | 日期     |
| datetime    | 日期时间 |
| imageUpload | 图片上传 |
| fileUpload  | 文件上传 |
| editor      | 富文本   |

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
fn.functioName("user_name") -> userName  
fn.functioName("user_name", true) -> UserName

### `selectTableName`

`type: Array<String>`  
选中的表名列表

### `all`

`type: Object<TableFieldConfig>`  
所有表的配置对象（ `TableFieldConfig` 中有以上全部属性）
