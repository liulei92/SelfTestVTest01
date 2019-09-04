<template>
  <div>
    <h3>test-form-test</h3>

    <div class="form-box">
      <!-- element 表单 -->
      <div class="box-item">
        <h4>element 表单</h4>
        <el-form label-width="100px" :model="model" :rules="rules" ref="elementForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="model.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" size="small" @click="submit('elementForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--  -->
      <div class="box-item">
        <h4>custom 表单</h4>
        <c-form :model="model" :rules="rules" ref="customForm">
          <c-form-item label="用户名" prop="username">
            <c-input type="text" v-model="model.username"></c-input>
            <!-- <span slot="ss">123</span> -->
          </c-form-item>
          <c-form-item label="密码" prop="password">
            <c-input type="password" v-model="model.password"></c-input>
          </c-form-item>
        </c-form>
      </div>
    </div>
  </div>
</template>
<script>
import CForm from '@components/C-Form/CForm'
import CFormItem from '@components/C-Form/CFormItem'
import CInput from '@components/C-Form/CInput'

export default {
  components: {
    CForm,
    CFormItem,
    CInput
  },
  data () {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    submit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.toast.showSuccess('请求登陆')
        } else {
          this.toast.showError('请求失败')
        }
      })
    }
  },
  created () {
  },
  mounted () {
    // document.documentElement.onkeydown = function (e) {
    //   console.log(e)
    // }
  }
}
</script>
<style lang="scss" scoped>
h4 {
  color: coral;
  font-style: italic;
}
.form-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .box-item {
    flex: 0 0 33.3%;
    padding: 10px;
    border: 1px dashed #808080;
    border-radius: 5px;
    box-sizing: border-box;
  }
}
</style>
