<template>
  <div class="top-nav container">
    <span class="logo"><!-- <img src="../../assets/icon_logo.png"> -->&nbsp;&nbsp;需求采集后台</span>

    <div class="top-right">
      <el-dropdown>
        <div style="display: flex;flex-direction: row;align-items: center;cursor: pointer;">
          <div class="username">
            <h4>{{user.username}}</h4>
          </div>
          <div class="triangle-down"></div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  props: ['user'],
  name: 'top-nav',
  data () {
    return {
      // menuItems: this.cache.fetchMenuItems(),
      currentModalComponent: ''
    }
  },
  methods: {
    logout () {
      this.$confirm('确定退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ajax.fetch({
          url: this.apis.login.loginOutApi,
          method: 'post',
          successFunc: res => {
            this.cache.clearAll()
            this.cache.clearConfig()
            this.$router.replace('/login')
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../styles/variable";

  .logo {
    display: flex;
    margin-left: 65px;
    min-width: 180px;
    color: #323C48;
    align-items: center;
    font-size: 26px;

  }

  .top-nav {
    height: 100%;
    background-color: $topLightColor;
    display: flex;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.10);
    align-items: center;
  }

  .top-left {
    display: flex;
    align-items: center;
  }

  .triangle-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #7A7F8D;
  }

  .username {
    margin-left: 25px;
    h4 {
      margin: 0;
      margin-right: 20px;
      font-weight: normal;
      font-size: 14px;
      color: #6A707F;
    }
    :last-child {
      margin-top: 5px;
    }
  }

  .top-right {
    position: absolute;
    right: 25px;
    display: flex;
    align-items: center;
    height: 48px;
    span {
      color: white;
      padding: 20px;
      display: flex;
      align-items: center;
      h4 {
        display: inline-block;
        margin-left: 4px;
      }
    }
  }

  a {
    display: flex;
    align-items: center;
    span {
      padding: 10px 4px !important;
    }
  }
</style>
