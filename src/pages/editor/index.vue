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
          <el-form-item label="Method" prop="method">
            <el-select v-model="form.method" class="me-server__btn">
              <el-option label="GET" value="get"></el-option>
              <el-option label="POST" value="post"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Url" prop="url">
            <el-input v-model="form.url" placeholder="api/mock">
              <template slot="prepend">/</template>
            </el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="form.description" placeholder="接口的描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="me-server__btn">{{data.mock ? `更新` : `创建`}}</el-button>
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
      form: {
        method: 'get',
        description: ''
      }
    }
  },
  created () {
    if (this.data.mock) {
      this.form.method = this.data.mock.method
      this.form.url = this.data.mock.url.replace(/^\//, '')
      this.form.description = this.data.mock.description
    }
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
      if (this.data.mock) {
        this.codeEditor.setValue(this.data.mock.mode)
      }
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
