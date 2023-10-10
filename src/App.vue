<template>
  <div id="app">
    <RouterView #default="{ Component, route }">
      <!-- KeepAlive 看自己情况使用 -->
      <!-- <KeepAlive> </KeepAlive> -->
      <component :is="Component" :key="route.path"></component>
    </RouterView>
  </div>
</template>

<script setup>
// import { KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
@import '@/assets/css/base.css';
</style>
