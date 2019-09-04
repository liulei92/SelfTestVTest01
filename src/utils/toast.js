import { Loading, Message } from 'element-ui'

export default {
  loadingInstance: null,
  loading () {
    this.loadingInstance = Loading.service({ fullscreen: true, text: '加载中...' })
  },

  showWarning (msg) {
    Message({
      message: msg,
      duration: 2000,
      center: true,
      type: 'warning'
    })
  },

  showError (msg) {
    Message({
      message: msg,
      duration: 2000,
      center: true,
      type: 'error'
    })
  },

  showSuccess (msg) {
    Message({
      message: msg,
      center: true,
      duration: 2000,
      type: 'success'
    })
  },

  hide () {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
    }
  }
}
