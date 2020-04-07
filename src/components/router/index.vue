<template>
  <div class="me-router">
    <template v-for="(component, index) in components">
      <compenent
        v-if="component.keepAlive || component.name === active"
        :key="index"
        :is="component.componentName"
        :data="params[component.name]"
        v-show="component.name === active">
      </compenent>
    </template>
  </div>
</template>

<script>
/**
 * 此组件代替vue-router
 * 三种模式的router都不支持,可能是我太菜了
 */
import Vue from 'vue'

let registerComponent = (components) => {
  let _components = {}
  components.map(item => {
    Vue.component(item.name, item)
    _components[item.name] = item
  })

  Vue.use(_components)
}
export default {
  name: 'MeRouter',
  props: {
    routes: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      components: []
    }
  },
  created () {
    registerComponent(this.routes.map(item => item.component))
  },
  methods: {
    init () {
      if (!this.active) {
        let active = this.routes[0] && this.routes[0].name
        this.setActive(active)
      }
      this.components = this.routes.map(item => {
        return {
          ...item,
          componentName: item.component.name
        }
      })
    },
    setActive (name, params) {
      this.$store.dispatch('router/setActive', { name, params })
    }
  },
  computed: {
    active () {
      return this.$store.state.router.active
    },
    params () {
      return this.$store.state.router.params || {}
    }
  },
  mounted () {
    // 初始化
    this.init()
    // 全局方法
    Vue.prototype.$meRoute = {
      setActive: this.setActive
    }
  }
}
</script>

<style>
.me-router {
  height: 100%;
  width: 100%;
}
</style>
