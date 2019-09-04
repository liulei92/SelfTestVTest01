// import Dayjs from 'dayjs'

export default {
  /**
   * 操作dom样式
   */
  changeRightDom (bool) {
    let _dom = document.getElementsByClassName('right-under')[0]
    if (!_dom) return
    if (!bool) {
      _dom.classList.add('child-active')
    } else {
      _dom.classList.remove('child-active')
    }
  },

  /**
   * cleanArray 数组拷贝？？？
  */
  cleanArray (actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i])
      }
    }
    return newArray
  },

  /**
   * param
   * param({'ha': '1', 'test': '2'})  =>  "ha=1&test=2"
  */
  param (json) {
    if (!json) return ''
    return this.cleanArray(
      Object.keys(json).map(key => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      })
    ).join('&')
  },

  /**
   * getQueryObject 获取地址传参数据
  */
  getQueryObject (url) {
    url = url || window.location.href
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
    return obj
  },

  /**
   * 获取url中的某个参数
  */
  getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg) // 匹配目标参数
    if (r != null) return unescape(r[2]); return null // 返回参数值
  },

  // 生成随机文件名的函数 start
  randomString (len) {
    len = len || 32
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    var maxPos = chars.length
    var pwd = ''
    for (var i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  },
  getSuffix (filename) {
    var pos = filename.lastIndexOf('.')
    var suffix = ''
    if (pos !== -1) {
      suffix = filename.substring(pos)
    }
    return suffix
  },
  getRandomName (filename, dir) {
    return (dir || '') + this.randomString(10) + this.getSuffix(filename, dir)
  },
  // 校验是不是时分
  isTime (time) {
    let exp = /^([01]\d|2[0-3]):([0-5]\d)$/
    return exp.test(time)
  },
  // 手机号码
  isMobilePhone (phone) {
    let exp = /^1[3-9][0-9]\d{8}$/
    return exp.test(phone)
  },
  // 字母 数字
  isCorrectAccount (account) {
    let exp = /^[0-9a-zA-Z]+$/
    return exp.test(account)
  },
  // 字母 汉字 数字
  isCorrectName (name) {
    let exp = /^[\u{4e00}-\u{9fa5}a-zA-Z0-9]+$/u
    return exp.test(name)
  },
  isCorrectLinkName (linkname) {
    let exp = /^[\u{4e00}-\u{9fa5}]+$/u
    return exp.test(linkname)
  },
  // 字母 汉字
  isCorrectByName (name) {
    let exp = /^[\u{4e00}-\u{9fa5}a-zA-Z]+$/u
    return exp.test(name)
  },
  isEmail (email) {
    let exp = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    return exp.test(email)
  },
  // 400电话
  isServicePhone (phone) {
    let exp1 = /^400\d{7}$/ // 400dianhua
    let exp2 = /^(\d{3,4}-)?\d{7,8}$/i // 座机
    let exp3 = /^1[3-9][0-9]\d{8}$/ // 手机
    return exp1.test(phone) || exp2.test(phone) || exp3.test(phone)
  },
  // 是否是网址
  isUrl (url) {
    let reg = /^(https?):\/\/([\w-]+(\.[\w-]+)*\/?).*/i
    return reg.test(url)
  },
  // 处理地区对象，以需要的形式显示,如：安徽省-宿州市
  handleArea (el) {
    let arr = []
    // 从后往前推导，有区的话就一定有省和市, 拼接成 a省,b市,c区 这种格式
    if (el.area !== '' && el.area !== undefined && el.area !== '-- 区 --') {
      arr.push(`${el.province}-${el.city}-${el.area}`)
    } else if (el.city !== '' && el.city !== undefined && el.city !== '-- 市 --') {
      arr.push(`${el.province}-${el.city}`)
    } else {
      arr.push(el.province)
    }
    return arr
  },
  // 相差是否31天
  testsTimes (end, start) {
    if ((end - start) / (3600 * 1000 * 24) > 31) {
      return false
    } else {
      return true
    }
  },
  // 判断正整数
  testPositiveNum (num) {
    let reg = /^[0-9]*[1-9][0-9]*$/
    return reg.test(num)
  }

}
