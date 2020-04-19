<template>
  <el-container class="me-app">
    <me-router :routes="routes"/>
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
  }
}
</script>
