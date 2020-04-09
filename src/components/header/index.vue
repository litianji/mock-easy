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
            <el-row  v-if="router.active === 'project'">
              <el-col :span="18">
                <el-avatar shape="square" icon="el-icon-user-solid" :size="50"></el-avatar>
                <div class="me-header__info">
                  <h2>所有项目</h2>
                  <p>所有项目</p>
                </div>
              </el-col>
              <el-col :span="6" style="padding-right: 18px; text-align: right;margin-top: 5px">
                <el-row>
                  <!-- <el-button icon="el-icon-search" circle></el-button> -->
                  <el-button type="primary" icon="el-icon-plus" circle @click="createProject"></el-button>
                  <el-button type="success" icon="el-icon-bottom" circle @click="importData"></el-button>
                </el-row>
              </el-col>
            </el-row>

            <el-row v-if="router.active === 'api'">
              <el-col :span="18">
                <el-avatar shape="square" icon="el-icon-tickets" :size="50"></el-avatar>
                <div class="me-header__info">
                  <h2>{{projectName}}</h2>
                  <p>个人项目</p>
                </div>
              </el-col>
            </el-row>

            <el-row v-if="router.active === 'server'">
              <el-col :span="18">
                <el-avatar shape="square" icon="el-icon-coin" :size="50"></el-avatar>
                <div class="me-header__info">
                  <h2>我的服务</h2>
                  <p>本地服务设置</p>
                </div>
              </el-col>
            </el-row>

            <el-row v-if="router.active === 'create'">
              <el-col :span="18">
                <el-avatar shape="square" icon="el-icon-plus" :size="50"></el-avatar>
                <div class="me-header__info">
                  <h2>创建项目</h2>
                  <p>创建一个令人愉快的项目</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

      </div>
    </div>

    <el-dialog
      title="导入数据"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="400px">
      <el-form :model="form" label-position="top"  size="small">
        <el-form-item  prop="pass">
          <el-input type="text" v-model="form.address" autocomplete="off" placeholder="eazy-mock地址"></el-input>
        </el-form-item>
        <el-form-item  prop="pass">
          <el-input type="text" v-model="form.userName" autocomplete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item  prop="checkPass">
          <el-input type="password" v-model="form.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="团队项目" name="type"></el-checkbox>
            <el-checkbox label="个人项目" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" style="width: 100%">立即导入</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
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
      showApiId: false,
      dialogVisible: false,
      form: {
        type: [],
        address: 'https://easy-mock.bookset.io',
        userName: 'ltj111',
        password: '2131410li'
      },
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
    },
    createProject () {
      this.changeRouter('create')
    },
    importData () {
      this.dialogVisible = true
    },
    async submit () {
      let config = {
        onlineUrl: this.form.address,
        onlineUserName: this.form.userName,
        onlineUserPassword: this.form.password
      }
      try {
        await this.$store.dispatch('project/setProjectList', config)
        // 关闭弹窗
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    router () {
      return this.$store.state.router
    },
    projectId () {
      let active = this.router.active
      if (active === 'api') {
        return this.router.params[active].projectId
      } else {
        return ''
      }
    },
    projectName () {
      let p = this.$store.state.project.apiLists[this.projectId]
      return p && p.project.name
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
