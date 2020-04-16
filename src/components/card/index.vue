<template>
  <el-card
    class="me-card"
    shadow="hover">
    <div
      class="me-card__content"
      @click="cardClick(data)">
      <h2>{{data.name}}</h2>
      <div class="me-card__item">{{data.description}}</div>
      <div class="me-card__item">{{data.url}}</div>
      <div class="me-card__item">{{data.onlineUrl}}</div>
      <div class="me-card__actions" @click="e => e.stopPropagation && e.stopPropagation()">
        <el-button-group>
          <el-button icon="el-icon-copy-document" size="small"></el-button>
          <el-button icon="el-icon-share" size="small"></el-button>
          <el-button icon="el-icon-delete" size="small" @click="delProject(data)"></el-button>
        </el-button-group>
      </div>
    </div>

    <div class="me-card__loading" v-if="!data.loaded">
      <el-progress type="circle" :percentage="progress" class="me-card__progress"></el-progress>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'MeCard',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      progress: 0,
      status: ''
    }
  },
  methods: {
    delProject (data) {
      this.$emit('del', data)
    },
    cardClick (data) {
      this.$emit('click', data)
    },
    async downloadApi () {
      try {
        await this.$store.dispatch('apiList/downloadApiList', {
          id: this.data._id,
          token: this.token,
          baseUrl: this.data.onlineUrl,
          onDownloadProgress: this.onDownloadProgress
        })

        this.$store.dispatch('project/updateProject', {
          ...this.data,
          loaded: true
        })
      } catch (error) {
        console.log(error)
      }
    },
    onDownloadProgress (e) {
      this.progress = parseInt(e.loaded / e.total)
    }
  },
  computed: {
    token () {
      return this.$store.state.project.token
    }
  },
  watch: {
    data: {
      deep: true,
      handler (val) {
        !val.loaded && this.downloadApi()
      }
    }
  },
  mounted () {
    if (!this.data.loaded) {
      this.downloadApi()
    }
  }
}
</script>
