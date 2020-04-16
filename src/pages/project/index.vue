<template>
  <div class="me-project">
    <div class="me-project__main" v-if="projectList.length">
      <div class="me-project__list">
        <me-card
          v-for="item in projectList"
          :key="item._id"
          :data="item"
          @click="cardClick"
          @del="delProject">
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
    cardClick (data) {
      this.$meRoute.setActive('api', {
        projectId: data._id,
        projectName: data.name,
        url: data.url
      })
      this.$store.dispatch('apiList/getApiList', data._id)
    },
    delProject (data) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('project/removeProject', data._id).then(res => {
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
