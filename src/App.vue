<template>
  <el-container class="em-app">
    <em-project></em-project>
  </el-container>
</template>

<script>
import EmProject from './components/Projects'
export default {
  name: 'App',
  components: {EmProject},
  data () {
    return {
      msg: '',
      currentPort: ''
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
.em-app {
  height: 100%;
}
</style>
