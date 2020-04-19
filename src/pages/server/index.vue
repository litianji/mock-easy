<template>
  <div class="me-server">
    <me-header ref="header">
      <el-row>
        <el-col :span="18">
          <el-avatar shape="square" icon="el-icon-coin" :size="50"></el-avatar>
          <div class="me-header__info">
            <h2>我的服务</h2>
            <p>本地服务设置</p>
          </div>
        </el-col>
      </el-row>
    </me-header>

    <div class="me-server__container">
      <div class="me-server__content">
        <el-form
          :model="form"
          ref="ruleForm"
          label-width="100px"
          label-position="top"
          class="me-form"
          size="small">
          <el-form-item label="地址设置" prop="checkPass">
            <el-input v-model="form.ip" autocomplete="off" :disabled="true">
              <template slot="prepend">http://</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input v-model="form.port" autocomplete="off">
              <template slot="prepend">端口号</template>
            </el-input>
            <p>实际上服务IP地址是0.0.0.0，如果在同一局域网内可以通过局域网IP访问</p>
          </el-form-item>
          <el-divider></el-divider>

          <el-form-item label="文件服务（可选）">
            <el-checkbox v-model="form.fileServer">打开文件服务，你可以设置选择一个文件夹以http服务形式访问本地文件</el-checkbox>
            <el-input
              v-model="form.fileFolder"
              autocomplete="off"
              placeholder="D:/images"
              ref="folder"
              @focus="folder"
              :disabled="!form.fileServer">
              <i
                class="el-icon-folder-opened el-input__icon"
                slot="suffix">
              </i>
            </el-input>
            <template v-if="form.fileServer && form.fileFolder">
              <el-tag size="small" class="me-server__tag" @click="openfolder(config.baseUrl)">{{config.baseUrl}}</el-tag>
              <el-tag size="small" class="me-server__tag" @click="openfolder(config.networkUrl)" v-if="config.network">{{config.networkUrl}}</el-tag>
            </template>
            <!-- <p>你可以设置选择一个文件夹以http服务形式访问本地文件</p> -->
          </el-form-item>
          <el-divider></el-divider>

          <!-- <el-form-item label="启动设置" prop="age">
            <el-select v-model="form.startUp" class="me-server__btn" :popper-append-to-body="false">
              <el-option v-for="item in startUps" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <p>如果设置'Chrome启动时'，mock服务可以在Chrome启动同时启动，即使没有打开Mock Easy的界面</p>
          </el-form-item>
          <el-divider></el-divider> -->

          <el-form-item label="睡眠设置" prop="age">
            <el-select v-model="form.sleep" class="me-server__btn" :popper-append-to-body="false">
              <el-option v-for="item in sleeps" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <p>默认情况下计算机睡眠状态将阻止一切网络活动，届时将无法访问到Mock Easy提供的所有服务</p>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item>
            <el-button type="primary" @click="submitForm" class="me-server__btn" :disabled="saveDisabled">保存</el-button>
          </el-form-item>
          <el-form-item>
            <el-button :type="status ? 'danger' : 'success'" @click="toggleServer" class="me-server__btn">{{ status ? '关闭服务' : '开启服务' }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import config from '../../../config'
import MeHeader from '../../components/header'
export default {
  name: 'MeServer',
  components: {MeHeader},
  data () {
    let { startUp, sleep, port, host, fileFolder } = this.$store.state.server
    return {
      form: {
        ip: host,
        port,
        fileFolder,
        fileServer: !!fileFolder,
        startUp,
        sleep
      },
      saveDisabled: true,
      startUps: config.startUp.map,
      sleeps: config.sleep.map
    }
  },
  methods: {
    async submitForm () {
      // 重启
      let config = {
        ...this.form
      }
      delete config.fileServer
      await this.$store.dispatch('server/startServer', config)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    },
    async toggleServer () {
      if (this.status) {
        await this.$store.dispatch('server/stopServer')
        this.$message({
          message: '服务已关闭',
          type: 'success'
        })
      } else {
        await this.$store.dispatch('server/startServer')
        this.$message({
          message: '服务已开启',
          type: 'success'
        })
      }
    },
    async folder () {
      this.$refs.folder.blur()
      let {retainstr, displayPath} = await this.$store.dispatch('server/choosefolder')
      this.form.fileFolder = displayPath
      this.form.retainstr = retainstr
    },
    async openfolder (url) {
      if (!this.saveDisabled) {
        try {
          await this.$confirm('文件服务需要保存设置之后才能生效，是否保存设置？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          await this.submitForm()
          window.open(url, '_blank')
        } catch (error) {
          console.log('取消')
        }
      } else {
        window.open(url, '_blank')
      }
    }
  },
  computed: {
    config () {
      return this.$store.state.server
    },
    status () {
      return this.$store.state.server.started
    }
  },
  watch: {
    form: {
      deep: true,
      handler () {
        this.saveDisabled = false
      }
    },
    'form.fileServer' () {
      if (!this.form.fileServer) {
        this.form.fileFolder = ''
        this.form.retainstr = '-1'
      }
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
