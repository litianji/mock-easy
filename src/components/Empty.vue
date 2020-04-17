<template>
  <div class="me-empty">
    <div class="me-empty__img">
      <img :src="empty" alt="">
    </div>
    <div class="me-empty__description">
      一个项目也没有，从Eazy Mock<el-link type="primary" @click="downloadProject">导入项目</el-link>
    </div>
    <div class="me-empty__footer"></div>
  </div>
</template>

<script>
import empty from '../assets/original.png'
import emitter from 'element-ui/src/mixins/emitter'
export default {
  name: 'MeEmpty',
  mixins: [emitter],
  data () {
    return {
      empty
    }
  },
  methods: {
    downloadProject () {
      this.dispatch('App', 'DOWNLOAD_PROJECT')
    }
  }
}
</script>

<style>

</style>
