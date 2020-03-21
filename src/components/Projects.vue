<template>
  <div class="em-project">
    <em-header></em-header>

    <el-main class="em-main" v-if="projectList.length">
      <div class="em-body">
        <!-- <transition-group name="pull-right"> -->
          <div class="em-project__list" v-show="!showApiId" key="project">
            <el-card class="em-card" shadow="hover" v-for="item in projectList" :key="item.id"  @click.native="cardClick">
              <div class="em-card__content">
                <h2>{{item.name}}</h2>
                <div class="em-card__item">{{item.description}}</div>
                <div class="em-card__item">{{item.url}}</div>
                <div class="em-card__item">本地</div>
                <div class="em-card__actions">
                  <el-button-group>
                    <el-button icon="el-icon-copy-document" size="small"></el-button>
                    <el-button icon="el-icon-share" size="small"></el-button>
                    <el-button icon="el-icon-delete" size="small"></el-button>
                  </el-button-group>
                </div>
              </div>
            </el-card>
          </div>

          <em-api-list v-if="showApiId" key="api"></em-api-list>
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
      showApiId: false
    }
  },
  methods: {
    cardClick () {
      this.showApiId = true
    },
    showProject () {
      this.showApiId = false
    }
  },
  computed: {
    projectList () {
      return this.$store.state.projectList
    },
    projectId () {
      return this.$store.state.projectId
    }
  }
}
</script>

<style>

</style>
