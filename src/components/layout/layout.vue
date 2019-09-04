<template>
  <div class="container">

    <div class="top">
      <!-- <TopNave :user="user"></TopNave> -->
      <!-- 动态渲染 TopNave -->
      <component :is="topNaveComponent" :user="user"></component>
    </div>
    <div class="under">
      <div class="left">
        <SideNave></SideNave>
      </div>
      <div class="right">
        <div class="right-top" v-if="isShowBread">
          <Bread ></Bread>
        </div>
        <div class="right-under">
          <router-view @changeShowBread="changeShowBreadEvent"></router-view>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import SideNave from './side-nav'
import Bread from './bread-crumb'
import TopNave from './top-nav'

export default {
  name: 'layout',
  computed: {
    isShowBread () {
      return this.$store.state.layout.isShowBread
    },
    isShowNetbarDialog () {
      return this.$store.state.layout.isShowNetbarDialog
    },
    netbarDetail () {
      return this.$store.state.layout.netbarDetail
    }
  },
  data () {
    return {
      hamburger: true,
      user: {},
      index: 1,
      topNaveComponent: ''
    }
  },
  components: {
    SideNave, Bread, TopNave
  },
  // beforeRouteUpdate(to, from, next) {
  //   let [arr, path] = ['', '']
  //   // useForwardNavKey 就代表使用来源key的导航高亮
  //   if (to.meta.useForwardMenuKey && to.meta.useForwardMenuKey === true) {
  //     arr = from.path.split('/')
  //     arr = this._.drop(arr)
  //     path = arr[0]
  //   } else {
  //     arr = to.path.split('/')
  //     arr = this._.drop(arr)
  //     path = arr.length > 2 ? arr[2] : arr[1]
  //   }
  //   this.$store.commit('changeKey', path)
  //   this.cache.storeMenuKey(path)
  //   next()
  // },
  methods: {
    closeNetbarDialog (done) {
      this.$store.commit('changeShowNetbarDialog', false)
      // done()
    }
  },
  mounted () {
    let user = this.cache.fetchUser()
    this.user = user || ''
    if (!user) {
      this.toast.showWarning('连接超时')
      this.cache.clearAll()
      this.$router.replace({ name: 'login' })
    } else {
      this.topNaveComponent = TopNave
    }
  }
}

</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../styles/variable";

  .top {
    height: 68px;
    width: 100%;
    position: fixed;
    z-index: 1000;
  }

  .under {
    position: absolute;
    width: 100%;
    top: 68px;
    bottom: 0;
    display: flex;
    min-width: 1200px !important;
  }

  .left {
    flex-basis: 206px;
    height: 100%;
    flex-shrink: 0;
  }

  .right {
    height: 100%;
    background: white;
    padding-left: 30px;
    padding-right: 30px;
    background: $contentBg;
    flex-grow: 1; // display: flex;
    flex-direction: column;
    overflow-y: auto;
    /*align-items: stretch;*/
    /*overflow-x: scroll;*/
  }

  .right-under {
    background: white;
    min-height: 600px;
    &.child-active {
      background-color: #F1F3F9;
    }
  }

  .right-top {
    width: 100%;
  }

  .preview {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
  }
</style>
