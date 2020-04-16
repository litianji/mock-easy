<template>
  <el-container class="me-app">
    <el-header style="padding: 0; height: auto">
      <me-header ref="header"></me-header>
    </el-header>
    <el-main style="overflow: hidden">
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
  componentName: 'App',
  components: {MeRouter, MeHeader},
  data () {
    return {
      msg: '',
      currentPort: '',
      routes
    }
  },
  mounted () {
    this.$on('DOWNLOAD_PROJECT', () => {
      this.$refs.header.importData()
    })
  }
}
</script>
