<template>
  <transition name="msgbox">
    <div v-if="show" class="msgbox-container" :class="className">
      <div class="msgbox-content">
        <header v-text="title"></header>
        <div class="content-body" v-html="content"></div>
        <footer>
          <button v-if="cancelText" @click="cancelBtn()">{{cancelText}}</button>
          <button @click="confirmBtn()">{{confirmText}}</button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'msg-box',
  data () {
    return {
      show: false,
      className: '',
      title: '提示',
      content: '弹出内容可以为html',
      cancelText: '',
      confirmText: '确定'
    }
  },
  watch: {
    show (val) {
      if (val) {
        if (!this.hasClass(document.body, 'pop-mask')) {
          this.operateClass('add', document.body, 'pop-mask')
        }
      } else {
        this.operateClass('remove', document.body, 'pop-mask')
      }
    }
  },
  methods: {
    cancelBtn () {
      this.show = false
    },
    confirmBtn () {
      this.show = false
    },
    // 操作 className， add remove
    operateClass (operate, node, cls) {
      let curr = node.className.split(' ')
      curr = curr.filter(el => el !== '')
      switch (operate) {
        case 'add':
          curr.push(cls)
          break
        case 'remove':
          curr = curr.filter(el => el !== cls)
          break
        default:
          break
      }
      node.className = curr.join(' ')
    },
    // 判断是否有 className
    hasClass (node, cls) {
      let curr = node.className.split(' ')
      return curr.includes(cls)
    }
  },
  created () {
  },
  beforeMount () {
    // 在mounted之前判定 是否已存在，存在清除
    let node = document.querySelector('.msgbox-container')
    if (node && node.parentNode) {
      node.parentNode.removeChild(node)
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.pop-mask {
  position: relative;
  overflow: hidden;
}
.msgbox-container{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  // background-color: rgba($color: #000000, $alpha: 0.3);
  .msgbox-content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 99999;
    width: 340px;
    background: #fff;
    color: #555;
    border-radius: 10px;
    transform: translate(-50%, -50%) scale(1, 1);
    header {
      margin: 0;
      padding: 10px 0;
      text-align: center;
      color: #333;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      border-radius: 10px 10px 0 0;
      background: #fff;
      border-width: 0;
      border-bottom: 1px solid #ccc;
    }
    .content-body {
      font-size: 14px;
      margin: 20px 10px;
      line-height: 2;
      max-height: 200px;
      overflow-y: auto;
      color: #666;
      div{
        padding: 0 15px;
        text-align: justify;
        word-break: break-all;
      }
    }
    footer {
      width: 100%;
      text-align: center;
      display: block !important;
      border-width: 0;
      border-top: 1px solid #ccc;
      overflow: hidden;
      background: transparent;
      border-radius: 0 0 10px 10px;
      button{
        float: left;
        padding: 10px 0;
        width: 50%;
        color: #999;
        box-sizing: border-box;
        line-height: 30px;
        font-size: 16px;
        background: #f7f7f7;
        border-right: 1px solid #D5D7D6;
        outline: none;
        &:first-child:nth-last-child(1) {
          width: 100%;
        }
        &:first-child:nth-last-child(2) ~ button {
          width: 50%;
        }
      }
    }
  }
}

.msgbox-enter, .msgbox-leave-to{
  -webkit-transform: scale(0, 0);
  transform: scale(0, 0);
}
.msgbox-enter-active, .msgbox-leave-active {
  -webkit-transition: all .3s;
  transition: all .3s;
}
.msgbox-enter-to, .msgbox-leave {
  -webkit-transform: scale(1, 1);
  transform: scale(1, 1);
}
</style>
