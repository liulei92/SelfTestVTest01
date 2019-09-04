export default {
  // 存储当前登录用户信息
  storeUser (data) {
    window.sessionStorage.setItem('operateadmin-user', JSON.stringify(data))
  },

  fetchUser () {
    let user = window.sessionStorage.getItem('operateadmin-user')
    return JSON.parse(user)
  },

  clearUser () {
    window.sessionStorage.removeItem('operateadmin-user')
  },

  // 清除storage
  clearAll () {
    this.clearUser()
  }
}
