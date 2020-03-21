<template>
  <div class="em-project">
    <em-header></em-header>

    <el-main class="em-main" v-if="projectList.length">
      <div class="em-body">
        <!-- <transition-group name="pull-right"> -->
          <div class="em-project__list" v-show="!projectId" key="project">
            <el-card
              class="em-card" shadow="hover"
              v-for="item in projectList"
              :key="item._id"
              @click.native="cardClick(item._id)">
              <div class="em-card__content">
                <h2>{{item.name}}</h2>
                <div class="em-card__item">{{item.description}}</div>
                <div class="em-card__item">{{item.url}}</div>
                <div class="em-card__item">本地</div>
                <div class="em-card__actions" @click="e => e.stopPropagation && e.stopPropagation">
                  <el-button-group>
                    <el-button icon="el-icon-copy-document" size="small"></el-button>
                    <el-button icon="el-icon-share" size="small"></el-button>
                    <el-button icon="el-icon-delete" size="small" @click="delProject(item._id)"></el-button>
                  </el-button-group>
                </div>
              </div>
            </el-card>
          </div>

          <em-api-list v-if="projectId" key="api"></em-api-list>
        <!-- </transition-group> -->
      </div>
    </el-main>

    <div class="em-project__empty" v-else>
      <em-empty></em-empty>
    </div>

  </div>
</template>

<script>
import EmApiList from './ApiList'
import EmEmpty from './Empty'
import EmHeader from './Header'
export default {
  name: 'EmProject',
  components: {EmApiList, EmEmpty, EmHeader},
  data () {
    return {
    }
  },
  methods: {
    // 点击项目卡片
    cardClick (id) {
      console.log('click me id is', id)
      // store 中储存id
      this.$store.dispatch('setProjectId', id)
    },
    delProject (id) {
      // 从后台删除， 是异步的
      this.background.delProject(id).then(res => {
        // 更新下store
        this.background.getProject().then(data => {
          this.$store.commit('SET_PROJECT_LIST', data || [])
        })
      })
    }
  },
  computed: {
    projectList () {
      return this.$store.state.projectList
    },
    // 获取id
    projectId () {
      return this.$store.state.projectId
    }
  }
}
</script>

<style>

</style>
