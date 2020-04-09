<template>
  <el-card
    class="me-card"
    shadow="hover"
    @click.native="cardClick(data._id)">
    <div class="me-card__content">
      <h2>{{data.name}}</h2>
      <div class="me-card__item">{{data.description}}</div>
      <div class="me-card__item">{{data.url}}</div>
      <div class="me-card__item">本地</div>
      <div class="me-card__actions" @click="e => e.stopPropagation && e.stopPropagation()">
        <el-button-group>
          <el-button icon="el-icon-copy-document" size="small"></el-button>
          <el-button icon="el-icon-share" size="small"></el-button>
          <el-button icon="el-icon-delete" size="small" @click="delProject(data._id)"></el-button>
        </el-button-group>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'MeCard',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    delProject (id) {

    },
    cardClick (id) {
      this.$meRoute.setActive('api', {
        projectId: id
      })
    }
  }
}
</script>
