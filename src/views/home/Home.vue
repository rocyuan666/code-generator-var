<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button></el-col
      >
      <el-col :span="12">
        <el-button plain>Plain</el-button>
        <el-button type="primary" plain>Primary</el-button>
        <el-button type="success" plain>Success</el-button>
        <el-button type="info" plain>Info</el-button>
        <el-button type="warning" plain>Warning</el-button>
        <el-button type="danger" plain>Danger</el-button></el-col
      >
    </el-row>
  </div>
</template>

<script setup name="Home">
//
</script>

<style lang="scss" scoped></style>
