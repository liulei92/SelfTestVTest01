<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'c-form',
  // 传递，把 表单实例 传递下去，子代可以直接食用
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      require: true
    },
    rules: {
      type: Object
    }
  },
  data () {
    return {}
  }
}
</script>
