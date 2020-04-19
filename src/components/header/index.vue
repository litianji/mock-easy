<template>
  <el-header class="me-header" ref="header">
    <div class="me-header__container">
      <!-- 导航 -->
      <el-row>
        <div class="me-header__nav">
          <div class="me-header__content-nav">
            <el-menu mode="horizontal" background-color="#495060" text-color="#c9cbd0">
              <div class="me-logo">
                <img :src="logo" alt="">
              </div>
              <el-menu-item index="1" @click="changeRouter('project')">我的项目</el-menu-item>
              <el-menu-item index="2" @click="changeRouter('server')">我的服务</el-menu-item>
            </el-menu>
          </div>

        </div>
      </el-row>
      <!-- 标题 -->
      <div style="height: 90px; width: 100%" ref="content">
        <div class="me-header__wrap" :class="{'me-header--fixed': fixed}" ref="fixed">
          <div class="me-header__content">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
import { on, off } from 'element-ui/src/utils/dom'
import logo from '../../assets/easy-mock.png'
export default {
  name: 'MeHeader',
  data () {
    return {
      fixed: false,
      logo,
      formLabelWidth: '60'
    }
  },
  methods: {
    scroll (e) {
      let { top } = this.$refs.content.getBoundingClientRect()
      if (e.target.scrollTop > 0 && top <= 0) {
        this.fixed = true
        this.$refs.fixed.style.width = e.target.offsetWidth - 17 + 'px'
      } else {
        this.fixed = false
        this.$refs.fixed.style.width = '100%'
      }
    },
    changeRouter (name) {
      this.$meRoute.setActive(name)
    }
  },
  computed: {
    router () {
      return this.$store.state.router
    }
  },
  mounted () {
    this.$refs.header.$el.style.height = 'auto'
    on(document.body, 'scroll', this.scroll)
  },
  beforeDestroy () {
    off(document.body, 'scroll', this.scroll)
  }

}
</script>

<style lang="scss">
@import './index.scss';
</style>
