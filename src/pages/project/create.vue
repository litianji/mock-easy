<template>
  <div class="me-creater">
    <div class="me-creater__content">
      <el-form
        :model="form"
        label-position="top"
        size="small"
        class="me-form">
        <el-form-item label="项目名">
          <el-input autocomplete="off" placeholder="example" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="基础URL">
          <el-input placeholder="example" v-model="form.url">
            <template slot="prepend">/</template>
          </el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input placeholder="不填写默认为项目名" v-model="form.description"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Easy Mock地址（可选）">
          <el-input placeholder="www.easy-mock.com" v-model="form.onlineUrl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="用户名" v-model="form.onlineUserName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" type="password" v-model="form.onlinePassword"></el-input>
          <p>如果填写Easy Mock地址则必须填写用户名和密码，以便将新创建的项目同步到远程的Easy Mock</p>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item>
          <el-button type="primary" @click="submitForm" class="me-form__btn">创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCreateProject',
  data () {
    return {
      form: {
        name: '',
        url: '',
        description: '',
        onlineUrl: '',
        onlineUserName: '',
        onlinePassword: ''
      }
    }
  },
  methods: {
    async submitForm () {
      this.form.url = this.form.url || '/'
      this.form.description = this.form.description || this.form.name
      await this.$store.dispatch('project/createProject', this.form)

      this.$meRoute.setActive('project')
    }
  }
}
</script>
