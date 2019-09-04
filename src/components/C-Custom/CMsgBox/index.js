import { throttle } from 'lodash'
import MsgBoxComponent from './MsgBox'

export default {
  install (Vue, options) {
    let MsgBox = (options = {}) => {
      let MsgBoxConstructor = Vue.extend(MsgBoxComponent) // 返回一个 “扩展实例构造器”
      // 使用
      let instance = new MsgBoxConstructor({
        el: document.createElement('div')
      })

      // 插入body后
      document.body.appendChild(instance.$el)
      // 配置合并
      Object.assign(instance.$data, options)
      // 返回一个promise 方便链式写法
      return new Promise((resolve, reject) => {
        // 显示 msgbox
        instance.show = true
        let cancelBtn = instance.cancelBtn
        let confirmBtn = instance.confirmBtn

        instance.confirmBtn = throttle(() => {
          resolve('confirm')
          confirmBtn()
        }, 500)
        instance.cancelBtn = throttle(() => {
          // reject(new Error())
          cancelBtn()
        }, 500)
      })
    }
    // 添加原型方法
    Vue.prototype.$MsgBox = MsgBox
  }
}
