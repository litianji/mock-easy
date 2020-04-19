<template>
  <div class="me-api-list">
    <me-header ref="header">
      <el-row>
        <el-col :span="18">
          <el-avatar shape="square" icon="el-icon-tickets" :size="50"></el-avatar>
          <div class="me-header__info">
            <h2>{{project.name}}</h2>
            <p>个人项目</p>
          </div>
        </el-col>
      </el-row>
    </me-header>

    <div class="me-api-list__container">
      <div class="me-api-list__info">
        <el-row>
          <div class="me-card__item">
            {{`${baseUrl}/mock/${project._id}${project.url}`}}
            <el-link type="primary" class="me-api-list__copy copy-url" @click="clipBaseUrl">
              <i class="el-icon-copy-document"></i>复制
            </el-link>
          </div>
        </el-row>
      </div>

      <div class="me-api-list__actions">
        <ul>
          <li @click="createApi">
            <i class="el-icon-plus"></i>
            创建接口
          </li>
          <!-- <li>
            <i class="el-icon-download"></i>
            更新接口
          </li>
          <li>
            <i class="el-icon-upload2"></i>
            上传接口
          </li> -->
          <!-- <li>
            <i class="el-icon-notebook-1"></i>
            历史记录
          </li>-->
        </ul>
      </div>
      <el-table :data="apiList" :border="true" style="width: 100%" size="small">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="top" size="mini" class="me-api-list__form">
              <el-form-item label="Mothod">
                <span class="me-card__item">{{ props.row.method }}</span>
              </el-form-item>
              <el-form-item label="URL">
                <span class="me-card__item">{{ props.row.url }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span class="me-card__item">{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="Method" prop="method" width="100px" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="tagColor(scope.row.method)"
              style="width: 100%;text-align: center;"
              effect="dark"
              size="small">
              {{(scope.row.method + '').toLocaleUpperCase()}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="URL" prop="url">
          <span slot-scope="scope" class="me-api-list__url">{{scope.row.url}}</span>
        </el-table-column>
        <el-table-column label="描述" prop="description">
          <span slot-scope="scope" class="me-api-list__url">{{scope.row.description}}</span>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <el-button-group slot-scope="btnScope">
            <el-button  icon="el-icon-copy-document" title="复制接口地址" @click="clipApi(btnScope.row.url)" size="mini" class="copy-url"></el-button>
            <el-button  icon="el-icon-edit" title="编辑接口" @click="edit(btnScope.row._id, btnScope.row)" size="mini"></el-button>
            <el-button  icon="el-icon-delete" title="删除接口" @click="del(btnScope.row._id)" size="mini"></el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
    </div>

    
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import MeHeader from '../../components/header'
export default {
  name: 'MeApiList',
  components: {MeHeader},
  data () {
    return {
      tableData: []
    }
  },
  computed: {
    baseUrl () {
      return this.$store.state.server.baseUrl
    },
    apiList () {
      return this.$store.state.apiList.apiList
    },
    project () {
      return this.$store.state.apiList.activeProject || {}
    }
  },
  methods: {
    clip (url) {
      const clipboard = new Clipboard('.copy-url', {
        text () {
          return url
        }
      })
      clipboard.on('success', (e) => {
        e.clearSelection()
        clipboard.destroy()
        this.$message({
          type: 'info',
          message: '地址已复制到剪切板!'
        })
      })
    },
    clipApi (path) {
      let url = `${this.baseUrl}/mock/${this.project._id}${this.project.url}${path}`
      this.clip(url)
    },
    clipBaseUrl () {
      let url = `${this.baseUrl}/mock/${this.project._id}${this.project.url}`
      this.clip(url)
    },
    edit (projectId, mock) {
      this.$meRoute.setActive('editor', {
        ...this.project,
        mock
      })
    },
    del (rowId) {
      this.$store.dispatch('apiList/delApi', { projectId: this.project._id, apiId: rowId })
    },
    createApi () {
      this.$meRoute.setActive('editor', { ...this.project, mock: null })
    },
    tagColor (method) {
      let map = {
        warning: method === 'patch',
        danger: method === 'delete',
        info: method === 'put',
        '': method === 'get',
        success: method === 'post'
      }
      return Object.keys(map).find(item => map[item])
    }
  }
}
</script>

<style lang="scss">
@import 'index.scss';
</style>
