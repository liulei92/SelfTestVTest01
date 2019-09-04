<template>
  <div class="menu">
    <ul style="margin-top: 15px">
      <li v-for="(item, index) in menuItems" :key="index" @click="clickAction(item)">
        <span class="firstSub hover" :class="current === item.menukey ? 'active' : ''">
          <!--<img :src="item.img" width="16" height="16">-->
          {{ item.name }}</span>
        <ul>
          <li v-for="(sub, subIndex) in item.submenu" :key="subIndex" class="item hover" :class="current === sub.menukey ? 'active' : ''" @click="clickAction(sub)">
            <span>{{ sub.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>

export default {

  data () {
    return {
      showMenu: false,
      menuItems: this.cache.fetchMenuItems(),
      show: false
    }
  },
  computed: {
    current () {
      if (this.$store.state.layout.currentMenuKey) {
        return this.$store.state.layout.currentMenuKey
      } else {
        return 'index'
      }
    }
  },
  methods: {
    clickAction (item) {
      if (item.submenu && item.submenu.length) return
      if (item.menukey) {
        this.$router.push({ name: item.menukey })
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../styles/variable";

  $sideNavWidth: 206px;

  .menu {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    flex-basis: $sideNavWidth;
    flex-shrink: 0;
  }

  .hover:hover {
    color: $themeColor;
    background: $menuHoverColor;

  }

  .active {
    color: $themeColor !important;
    background: $menuHoverColor !important;
  }

  .item {
    font-size: 16px;
    color: #6A707F;
    padding-top: 9px;
    padding-bottom: 9px;
    padding-left: 70px;
  }

  ul {
    margin: 0;
  }

  li {
    cursor: pointer
  }

  .firstSub {
    display: flex;
    flex-direction: row;
    padding-left: 40px;
    align-items: center;
    font-size: 18px;
    padding-top: 11px;
    padding-bottom: 11px;
    color: #4D4D4D;
    img {
      margin-right: 15px;
    }
  }

  .el-menu-item {
    text-indent: 12px;
  }

  .badge {
    color: white;
    margin-right: 18px;
  }

  .el-submenu .el-menu-item {
    padding: 0;
  }
</style>
