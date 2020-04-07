<template>
  <div class="me-api-list">
    <div class="me-api-list__info">
      <el-row>
        <div class="me-card__item">
          {{`${baseUrl}/mock/${data.projectId}${project.url}`}}
          <el-link type="primary" class="me-api-list__copy" @click="copyBaseUrl">
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
        <li>
          <i class="el-icon-download"></i>
          更新接口
        </li>
        <li>
          <i class="el-icon-upload2"></i>
          上传接口
        </li>
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
          <el-button  icon="el-icon-edit" @click="edit(btnScope.row._id, btnScope.row)" size="mini"></el-button>
          <el-button  icon="el-icon-copy-document" @click="del(btnScope.row._id)" size="mini"></el-button>
          <el-button  icon="el-icon-delete" @click="del(btnScope.row._id)" size="mini"></el-button>
        </el-button-group>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MeApiList',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  created () {
    // 测试数据
    console.log(this.data)
  },
  computed: {
    baseUrl () {
      return this.$store.state.server.baseUrl
    },
    apiList () {
      let store = this.$store.state.project
      return store.apiLists[this.data.projectId].mocks
    },
    project () {
      let store = this.$store.state.project
      return store.apiLists[this.data.projectId].project
    }
  },
  methods: {
    edit (projectId, mock) {
      this.$meRoute.setActive('editor', {
        projectId: this.data.projectId,
        mock
      })
    },
    del (rowId) {
      console.log(rowId)
    },
    copyBaseUrl () {},
    createApi () {
      this.$meRoute.setActive('editor', {
        projectId: this.data.projectId
      })
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
