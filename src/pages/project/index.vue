<template>
  <div class="me-project">
    <div class="me-project__main" v-if="projectList.length">
      <div class="me-project__list">
        <me-card
          v-for="item in projectList"
          :key="item._id"
          :data="item">
        </me-card>
      </div>
    </div>

    <div class="me-project__empty" v-else>
      <me-empty></me-empty>
    </div>

  </div>
</template>

<script>
import MeEmpty from '../../components/Empty'
import MeCard from '../../components/card'
export default {
  name: 'MeProject',
  components: {MeEmpty, MeCard},
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
