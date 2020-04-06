<template>
  <div class="me-project">
    <div class="me-project__main" v-if="projectList.length">
      <div class="me-project__list">
        <el-card
          class="me-card" shadow="hover"
          v-for="item in projectList"
          :key="item._id"
          @click.native="cardClick(item._id)">
          <div class="me-card__content">
            <h2>{{item.name}}</h2>
            <div class="me-card__item">{{item.description}}</div>
            <div class="me-card__item">{{item.url}}</div>
            <div class="me-card__item">本地</div>
            <div class="me-card__actions" @click="e => e.stopPropagation && e.stopPropagation()">
              <el-button-group>
                <el-button icon="el-icon-copy-document" size="small"></el-button>
                <el-button icon="el-icon-share" size="small"></el-button>
                <el-button icon="el-icon-delete" size="small" @click="delProject(item._id)"></el-button>
              </el-button-group>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="me-project__empty" v-else>
      <me-empty></me-empty>
    </div>

  </div>
</template>

<script>
import MeEmpty from '../../components/Empty'
export default {
  name: 'MeProject',
  components: {MeEmpty},
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    cardClick (id) {
      this.$meRoute.setActive('api', {
        projectId: id
      })
    },
    delProject (id) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.background.delProject(id).then(res => {
          this.background.getProject().then(data => {
            this.$store.commit('SET_PROJECT_LIST', data || [])
          })
          this.$message({
            type: 'info',
            message: '删除成功!'
          })
        })
      })
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
