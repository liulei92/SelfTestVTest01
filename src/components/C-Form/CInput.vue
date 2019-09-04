<template>
  <div class="c-input">
    <input :type="type" :value="value" @input="onInput" class="c-input__inner">
  </div>
</template>
<script>
export default {
  name: 'c-input',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {}
  },
  methods: {
    onInput (e) {
      // 派发事件，通知父组件输入值发生变化
      this.$emit('input', e.target.value)

      // 通知父组件校验（注意）
      this.$parent.$emit('validate')
    }
  }
}
</script>
<style lang="scss">
.c-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  .c-input__inner {
    -webkit-appearance: none;
    background-color: #FFFFFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}
</style>
