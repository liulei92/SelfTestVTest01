<template>
  <div class="bread">
    <el-button v-if="$route.meta.showBack" type="primary" @click="goBack" style="padding: 6px 15px">返回</el-button>
    <!--<el-breadcrumb-item>云平台</el-breadcrumb-item>-->
    <p class="title" v-else>{{$route.meta.name}}</p>
  </div>
</template>
<script>
export default {
  name: 'bread-crumb',
  data () {
    return {
      showBack: this.$route.meta.showBack
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .bread {
    background-color: #F1F3F9;
    padding: 20px 0;
    display: flex;
    align-items: center;
  }

  .title {
    font-family: MicrosoftYaHei;
    font-size: 24px;
    margin: 0;
    color: #4D4D4D;
  }
</style>
