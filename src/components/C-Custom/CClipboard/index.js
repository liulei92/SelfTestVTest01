export default {
  install (Vue) {
    let Clipboard = (text) => {
      // 动态创建input输入框
      let input = document.createElement('input')
      input.type = 'text'
      input.id = 'ClipboardContent'
      input.style = 'position: absolute; top: 0; left: 0; opacity: 0; z-index: -10;'
      input.value = text
      document.body.appendChild(input)
      let inputElement = document.getElementById('ClipboardContent')
      // 选中输入框
      inputElement.select()
      // 执行浏览器复制命令
      if (document.execCommand('Copy')) {
        document.body.removeChild(inputElement)
      }
    }
    // 添加原型方法
    Vue.prototype.$Clipboard = Clipboard
  }
}
