<template>
  <div class="em-api-list">
    <div class="em-api-list__info">
      <el-row>
        <div class="em-card__item">
          {{baseUrl}}
          <el-link type="primary" class="em-api-list__copy">
            <i class="el-icon-copy-document"></i>复制
          </el-link>
        </div>
      </el-row>
    </div>

    <div class="em-api-list__actions">
      <ul>
        <!-- <li>
          <i class="el-icon-plus"></i>
          创建接口
        </li>-->
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
    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="Mothod">
              <span>{{ props.row.method }}</span>
            </el-form-item>
             <el-form-item label="URL">
              <span>{{ props.row.url }}</span>
            </el-form-item>
             <el-form-item label="描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="Method" prop="method">
        <template slot-scope="scope">
          <el-tag type="info">{{scope.row.method}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="URL" prop="url"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column label="操作" align="center">
        <el-button-group slot-scope="btnScope">
          <el-button  icon="el-icon-edit" @click="edit(btnScope.row.id)" size="small"></el-button>
          <el-button  icon="el-icon-delete" @click="del(btnScope.row.id)" size="small"></el-button>
        </el-button-group>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'EmApiList',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    // 测试数据
    for (let i = 0; i < 3; i++) {
      this.tableData.push({
        method: 'get',
        url: '/mock',
        desc: '荷兰优质淡奶，奶香浓而不腻'
      })
    }
  },
  computed: {
    baseUrl () {
      return this.$store.state.baseUrl
    },
    port () {
      return this.$store.state.port
    }
  },
  methods: {
    edit (rowId) {
      console.log(rowId)
    },
    del (rowId) {
      console.log(rowId)
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
