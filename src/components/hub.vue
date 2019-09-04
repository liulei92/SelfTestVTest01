<template>
  <div class="hub-page">
    <div class="hub-routes">
      <select name="currPath" v-model="currPath" @change="changePath()">
        <option :value="item.path" v-for="(item, index) in routes" :key="index" v-text="item.name"></option>
      </select>
    </div>
    <keep-alive>
      <router-view class="hub-view" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="hub-view" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'hub',
  data () {
    return {
      currPath: '',
      routes: []
    }
  },
  created () {
    this.getRoutes()
  },
  methods: {
    getRoutes () {
      let routes = this.$router.options.routes
      let arr = []
      routes.map(el => {
        if (el.name || el.children) {
          if (el.children && el.children.length > 0) {
            let children = el.children
            children.forEach(cel => {
              if (cel.name) {
                arr.push({
                  name: cel.name,
                  path: el.path + '/' + cel.path
                })
              }
            })
          } else {
            arr.push({
              name: el.name,
              path: el.path
            })
          }
        }
      })
      this.routes = arr
      this.currPath = this.routes[0].path
      Object.freeze(this.routes)
    },
    changePath () {
      this.$router.push({ path: this.currPath })
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.hub-page {
  background-color: lightcyan;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
  .hub-routes {
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
    select {
      width: 200px;
      height: 30px;
      font-size: 16px;
      outline: none;
    }
  }
  .hub-view {
    width: 100%;
    height: calc(100% - 50px);
    font-size: 16px;
  }
}
</style>
