<template>
  <el-header class="em-header" ref="header">
    <el-row>
      <div class="em-header__nav">
        <div class="em-header__content-nav">
          <el-menu mode="horizontal" background-color="#495060" text-color="#c9cbd0">
            <div class="em-logo">
              <img :src="logo" alt="">
            </div>
            <el-menu-item index="1" @click="showProject">我的项目</el-menu-item>
          </el-menu>
        </div>

      </div>
    </el-row>
    <div style="height: 90px; width: 100%" ref="content">
      <div class="em-header__wrap" :class="{'em-header--fixed': fixed}" ref="fixed">
        <div class="em-header__content">
          <el-row  v-if="!projectId">
            <el-col :span="18">
              <el-avatar shape="square" icon="el-icon-user-solid" :size="50"></el-avatar>
              <div class="em-header__info">
                <h2>所有项目</h2>
                <p>subTitle</p>
              </div>
            </el-col>
            <el-col :span="6" style="padding-right: 18px; text-align: right;margin-top: 5px">
              <el-row>
                <!-- <el-button icon="el-icon-search" circle></el-button> -->
                <el-button type="primary" icon="el-icon-plus" circle></el-button>
                <el-button type="success" icon="el-icon-bottom" circle @click="importData"></el-button>
              </el-row>
            </el-col>
          </el-row>

          <el-row  v-if="projectId">
            <el-col :span="18">
              <el-avatar shape="square" icon="el-icon-tickets" :size="50"></el-avatar>
              <div class="em-header__info">
                <h2>{{projectName}}</h2>
                <p>个人项目</p>
              </div>
            </el-col>
          </el-row>
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
import logo from '../assets/easy-mock.png'
export default {
  name: 'EmHeader',
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
    showProject () {
      // 清空id
      this.$store.dispatch('setProjectId', '')
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
        let {projects, apiLists} = await this.$store.dispatch('setProjectList', config)
        // 存储到后台chrome服务
        this.background.saveProject(projects)
        this.background.saveApiLists(apiLists)
        // 关闭弹窗
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    projectId () {
      return this.$store.state.projectId
    },
    projectName () {
      return this.$store.state.apiLists[this.projectId].project.name
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
