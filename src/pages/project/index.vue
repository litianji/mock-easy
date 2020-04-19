<template>
  <div class="me-project">
    <me-header ref="header">
      <el-row>
        <el-col :span="18">
          <el-avatar shape="square" icon="el-icon-user-solid" :size="50"></el-avatar>
          <div class="me-header__info">
            <h2>所有项目</h2>
            <p>所有项目</p>
          </div>
        </el-col>
        <el-col :span="6" style="padding-right: 18px; text-align: right;margin-top: 5px">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle @click="createProject"></el-button>
            <el-button type="success" icon="el-icon-bottom" circle @click="importData"></el-button>
          </el-row>
        </el-col>
      </el-row>
    </me-header>

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
        <!-- <el-form-item prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="团队项目" name="type"></el-checkbox>
            <el-checkbox label="个人项目" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submit" style="width: 100%">立即导入</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>

    <div class="me-project__main" v-if="projectList.length">
      <div class="me-project__container">
        <me-card
          v-for="item in projectList"
          :key="item._id"
          :data="item"
          @click="cardClick"
          @del="delProject">
        </me-card>
      </div>
    </div>

    <div class="me-project__empty" v-else>
      <me-empty>
        一个项目也没有，从Eazy Mock<el-link type="primary" @click="importData">导入项目</el-link>
      </me-empty>
    </div>

  </div>
</template>

<script>
import MeHeader from '../../components/header'
import MeEmpty from '../../components/Empty'
import MeCard from '../../components/card'
export default {
  name: 'MeProject',
  components: {MeEmpty, MeCard, MeHeader},
  data () {
    return {
      dialogVisible: false,
      form: {}
    }
  },
  created () {
  },
  methods: {
    async cardClick (data) {
      this.$store.commit('apiList/SET_ACTIVE', data)
      await this.$store.dispatch('apiList/getApiList', data._id)
      this.$meRoute.setActive('api')
    },
    delProject (data) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('project/removeProject', data._id).then(res => {
          this.$message({
            type: 'info',
            message: '删除成功!'
          })
        })
      })
    },
    createProject () {
      this.$meRoute.setActive('create')
    },
    importData () {
      this.dialogVisible = true
    },
    async submit () {
      let config = {
        onlineUrl: this.form.address.replace(/\/$/, ''),
        onlineUserName: this.form.userName,
        onlineUserPassword: this.form.password
      }
      try {
        await this.$store.dispatch('project/downloadProjects', config)
        // 关闭弹窗
        this.dialogVisible = false
      } catch (error) {
        this.dialogVisible = false
        console.log(error)
      }
    }
  },
  computed: {
    projectList () {
      return this.$store.state.project.projectList
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
