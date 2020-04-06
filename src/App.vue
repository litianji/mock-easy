<template>
  <el-container class="me-app">
    <el-header style="padding: 0; height: auto">
      <me-header></me-header>
    </el-header>
    <el-main>
      <div class="me-body">
        <me-router :routes="routes"/>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import MeRouter from './components/router/index'
import MeHeader from './components/header/index'
import routes from './routes'
export default {
  name: 'App',
  components: {MeRouter, MeHeader},
  data () {
    return {
      msg: '',
      currentPort: '',
      routes
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: auto;
  overflow-x: hidden;
  background: #f8f9fa;
}
</style>
