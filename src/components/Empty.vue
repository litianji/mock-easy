<template>
  <div class="me-empty">
    <div class="me-empty__img">
      <img :src="empty" alt="">
    </div>
    <div class="me-empty__description">
      <slot></slot>
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
  }
}
</script>

<style>

</style>
