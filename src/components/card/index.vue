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
      <div class="me-card__actions">
        <el-button-group>
          <el-button icon="el-icon-copy-document" size="small" title="复制项目地址" class="copy-url-p" @click="clip"></el-button>
          <el-button icon="el-icon-edit" size="small" title="编辑项目" @click.stop="cardClick(data)"></el-button>
          <el-button icon="el-icon-delete" size="small" title="删除项目" @click.stop="delProject(data)"></el-button>
        </el-button-group>
      </div>
    </div>

    <div class="me-card__loading" v-if="!data.loaded">
      <el-progress type="circle" :percentage="progress" class="me-card__progress"></el-progress>
    </div>
  </el-card>
</template>

<script>
import Clipboard from 'clipboard'
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
      status: '',
      cliped: false
    }
  },
  methods: {
    clip () {
      let baseUrl = this.$store.state.server.baseUrl
      let url = `${baseUrl}/mock/${this.data._id}${this.data.url}`
      const clipboard = new Clipboard('.copy-url-p', {
        text () {
          return url
        }
      })
      this.cliped = true
      clipboard.on('success', (e) => {
        this.cliped = false
        e.clearSelection()
        clipboard.destroy()
        this.$message({
          type: 'info',
          message: '项目地址已复制到剪切板!'
        })
      })
    },
    delProject (data) {
      this.$emit('del', data)
    },
    cardClick (data) {
      if (!this.cliped) {
        this.$emit('click', data)
      }
    },
    async downloadApi () {
      try {
        await this.$store.dispatch('apiList/downloadApiList', {
          id: this.data._id,
          token: this.token,
          baseUrl: this.data.onlineUrl,
          onDownloadProgress: this.onDownloadProgress
        })
      } catch (error) {
        console.log(error)
      }
    },
    onDownloadProgress (e) {
      this.progress = parseInt(e.loaded / e.total) * 100
      if(this.progress >= 100) {
        setTimeout(() => {
            this.$store.dispatch('project/updateProject', {
            ...this.data,
            loaded: true
          })
        }, 1000)
      }
      
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
