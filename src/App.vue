<template>
  <div id="app">
    <img src="./assets/logo.png">

    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style lang="scss" scoped>
img {
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  opacity: .3;
}
</style>
