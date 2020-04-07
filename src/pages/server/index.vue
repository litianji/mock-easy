<template>
  <div class="me-server">
    <div class="me-server__content">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        label-position="top"
        size="small">
        <el-form-item label="地址设置" prop="checkPass">
          <el-input v-model="ruleForm.ip" autocomplete="off" :disabled="true">
            <template slot="prepend">http://</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input v-model="ruleForm.port" autocomplete="off">
            <template slot="prepend">端口号</template>
          </el-input>
        </el-form-item>
        <p>实际上服务IP地址是0.0.0.0，如果在同一局域网内可以通过局域网IP访问</p>
        <el-divider></el-divider>

        <el-form-item label="文件服务（可选）" prop="age">
          <el-input v-model="ruleForm.folder" autocomplete="off" placeholder="D:/images">
            <i
              class="el-icon-folder-opened el-input__icon"
              slot="suffix">
            </i>
          </el-input>
        </el-form-item>
        <p>以服务形式访问本地文件</p>
        <el-divider></el-divider>

        <el-form-item label="启动设置" prop="age">
          <el-select v-model="ruleForm.startUp" placeholder="请选择活动区域" class="me-server__btn" :popper-append-to-body="false">
            <el-option v-for="item in startUps" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <p>如果设置'Chrome启动时'，mock服务可以在Chrome启动同时启动，即使没有打开Mock Easy的界面</p>
        <el-divider></el-divider>

        <el-form-item label="睡眠设置" prop="age">
          <el-select v-model="ruleForm.sleep" placeholder="请选择活动区域" class="me-server__btn" :popper-append-to-body="false">
            <el-option v-for="item in sleeps" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <p>默认情况下计算机睡眠状态将阻止一切网络活动，届时将无法访问到Mock Easy提供的所有服务</p>
        <el-divider></el-divider>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="me-server__btn">保存</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="me-server__btn">关闭服务</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import config from '../../../config'
export default {
  name: 'MeServer',
  data () {
    let { startUp, sleep, port, host } = this.$store.state.server
    return {
      ruleForm: {
        ip: host,
        port,
        startUp,
        sleep
      },
      startUps: config.startUp.map,
      sleeps: config.sleep.map
    }
  },
  computed: {
    config () {
      return this.$store.state.server
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
