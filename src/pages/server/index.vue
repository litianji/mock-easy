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
        <p>实际上IP地址是0.0.0.0，如果在同一局域网内可以通过局域网IP访问</p>
        <el-divider></el-divider>
        <el-form-item label="启动设置" prop="age">
          <el-select v-model="ruleForm.qidong" placeholder="请选择活动区域" class="me-server__btn">
            <el-option label="Chrome启动时" value="shanghai"></el-option>
            <el-option label="Mock Easy启动时" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <p>如果设置'Chrome启动时'，mock服务可以在Chrome启动同时启动，即使没有打开Mock Easy的界面</p>
        <el-divider></el-divider>

        <el-form-item label="睡眠设置" prop="age">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域" class="me-server__btn">
            <el-option label="阻止计算机睡眠" value="shanghai"></el-option>
            <el-option label="随计算机睡眠" value="beijing"></el-option>
          </el-select>
        </el-form-item>
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
export default {
  name: 'MeServer',
  data () {
    return {
      ruleForm: {
        ip: '127.0.0.1',
        port: '8089',
        type: ''
      }
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
