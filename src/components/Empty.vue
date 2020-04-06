<template>
  <div class="me-empty">
    <div class="me-empty__img">
      <img :src="empty" alt="">
    </div>
    <div class="me-empty__description">
      一个项目也没有，从eazy-mock<el-link type="primary">导入项目</el-link>
    </div>
    <div class="me-empty__footer"></div>
  </div>
</template>

<script>
import empty from '../assets/original.png'
export default {
  name: 'MeEmpty',
  data () {
    return {
      empty
    }
  }
}
</script>

<style>

</style>
