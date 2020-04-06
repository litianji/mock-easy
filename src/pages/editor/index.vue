<template>
  <div class="me-editor">
    <div class="me-editor__editor">
      <div ref="codeEditor"></div>
    </div>
    <div class="me-editor__info">

      <div class="me-editor__wrap">
        <h2>更新接口</h2>
        <el-form
          :model="form"
          class="me-editor__form"
          ref="ruleForm"
          label-width="100px"
          label-position="top"
          size="small">
          <el-form-item label="Method" prop="checkPass">
            <el-select v-model="form.region" placeholder="请选择活动区域" class="me-server__btn">
              <el-option label="阻止计算机睡眠" value="shanghai"></el-option>
              <el-option label="随计算机睡眠" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Url" prop="checkPass">
            <el-input v-model="form.ip"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="checkPass">
            <el-input v-model="form.ip"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="me-server__btn">更新</el-button>
          </el-form-item>
        </el-form>
        <div class="me-api-list__actions">
          <ul>
            <li @click="format">格式化</li>
            <li @click="close">关闭</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import jsBeautify from 'js-beautify/js/lib/beautify'
var ace = require('brace')
require('brace/mode/javascript')
require('brace/theme/monokai')
require('brace/ext/language_tools')
require('brace/ext/searchbox')
require('./snippets')
export default {
  name: 'MeEditor',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      codeEditor: null,
      form: {}
    }
  },
  created () {
  },
  mounted () {
    this.codeEditor = ace.edit(this.$refs.codeEditor)
    this.codeEditor.getSession().setMode('ace/mode/javascript')
    this.codeEditor.setTheme('ace/theme/monokai')
    this.codeEditor.setOption('tabSize', 2)
    this.codeEditor.setOption('fontSize', 15)
    this.codeEditor.setOption('enableLiveAutocompletion', true)
    this.codeEditor.setOption('enableSnippets', true)
    this.codeEditor.clearSelection()
    this.codeEditor.getSession().setUseWorker(false)

    this.$nextTick(() => {
      this.codeEditor.setValue(this.data.mode)
      this.format()
    })
  },
  methods: {
    format () {
      const context = this.codeEditor.getValue()
      let code = /^http(s)?/.test(context)
        ? context
        : jsBeautify.js_beautify(context, { indent_size: 2 })
      this.codeEditor.setValue(code)
    },
    close () {
      this.$meRoute.setActive('api', {
        projectId: this.data.projectId
      })
    }
  },
  computed: {

  }
}
</script>

<style lang="scss">
@import 'index.scss';
</style>
