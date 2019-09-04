<template>
  <div>
    <h3>test-custom-test</h3>

    <h4>MsgBox 插件</h4>

    <div class="">
      <pre>
        this.$MsgBox({
          title: '温馨提示',
          content: '这里是消息弹出内容',
          cancelText: '取消',
          confirmText: '确定',
          className: 'pop-custom'
        }).then(() => {
          console.log('我点击了确定按钮')
        }).catch((err) => {
          console.log(err)
        })
      </pre>
      <a href="javascript:;" @click="showMsgbox">点击我显示msgbox</a><br/>
      <a href="javascript:;" @click="doClipboard">复制文字</a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    showMsgbox () {
      this.$MsgBox({
        title: '温馨提示',
        content: '这里是消息弹出内容',
        cancelText: '取消',
        confirmText: '确定',
        className: 'pop-custom'
      }).then(() => {
        console.log('我点击了确定按钮')
      }).catch((err) => {
        console.log(err)
      })
    },
    doClipboard () {
      let num = parseInt(Math.random() * 1000)
      this.$Clipboard(num)
    }
  },
  created () {
  },
  activated () {
    console.log('activated')
  },
  mounted () {
    console.log(1)
  }
}
</script>
<style lang="scss" scoped>
h4 {
  color: coral;
  font-style: italic;
}
</style>
