<template>
  <div class="c-form-item" :class="{'is-error': error}">
    <label for="" v-if="label" v-text="label" class="c-form-item__label" :style="{width: labelWidth}"></label>
    <!-- 具名插槽 -->
    <!-- <slot name="ss"></slot> -->
    <div class="c-form-item__content" :style="{marginLeft: labelWidth}">
      <!-- 匿名插槽 -->
      <slot></slot>
      <!-- 错误提示 -->
      <div class="c-form-item__error" v-if="error">
        {{error}}
      </div>
    </div>
  </div>
</template>
<script>
import Schema from 'async-validator'

export default {
  name: 'c-form-item',
  // 注入
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    validate () {
      // 1.获取检验规则
      const rules = this.form.rules[this.prop]
      // 2.获取数据模型
      const value = this.form.model[this.prop]
      // 3.创建校验对象
      const descriptor = { [this.prop]: rules }
      // 4.创建校验器
      const schema = new Schema(descriptor)
      // 5.检验
      schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
    }
  },
  mounted () {
    // 监听检验事件
    this.$on('validate', this.validate)
  }
}
</script>
<style lang="scss">
.c-form-item {
  display: block;
  margin-bottom: 22px;
  &.is-error .c-input__inner {
    border-color: #F56C6C;
  }
  .c-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .c-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    .c-form-item__error {
      color: #F56C6C;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
}
</style>
