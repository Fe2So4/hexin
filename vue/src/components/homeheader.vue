<template>
  <div id="home_header">
    <div id="logo">
      <div class="xitong-main" >天安佰盈核心业务系统</div>
      <div class="xitong-second" >Insurance Sales Compony Business System</div>
    </div>
    <div class="header_right">
      <div class="right_exit1">
        <span class="exit"><b>{{`用户名：${this.$store.state.login.showUserId}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司：${this.$store.state.login.showComName}`}}</b></span>
      </div>
      <div class="right_exit" @click="exit" >
          <img :src="exitPng" alt="">
          <span class="exit" >安全退出</span>
      </div>
    </div>
  </div>

</template>

<script>
import exitPng from '#/imgs/tc.png'
import { removeUserId } from '@/utils/cookie'
export default {
  name: '',
  data () {
    return {
      exitPng
    }
  },
  mounted () {},
  computed: {
    empName () {
      // console.log(this.$store.state.login.userInfo)
      return this.$store.state.login.userInfo.name
    },
    empNo () {
      // console.log(this.$store.state.login.username)
      return this.$store.state.login.userInfo.empno
    }
  },
  methods: {
    exit () {
      this.$store.dispatch('logout').then(data => {
        removeUserId()
        window.location.href = '/tabycore/login'
      })
    }
  }
}
</script>

<style lang="scss" type="text/css">
@import '../variable.scss';
#home_header {
  color: #fff;
  font-size: $font_size_base;
  #logo {
    margin-top: 12px;
    margin-left: 24px;
    display: inline-block;
    .xitong-main {
      font-size: 20px;
      line-height: 28px;
    }
    .xitong-second {
      font-size: 12px;
      line-height: 17px;
    }
  }
  .header_right {
    float: right;
    margin-top: 16px;
    margin-right: 15px;
    .exit {
      line-height: 2;
    }
    .right_name,
    .right_exit {
      @include inline-div(auto);
      font-weight: bolder;
    }
    .right_name {
      margin-right: 40px;
      text-align: center;
    }
    .right_exit1 {
      display: inline;
      margin-right: 30px;
    }
    .right_exit {
      margin-top: 4px;
      cursor: pointer;
      img {
        width: 20px;
        vertical-align: text-top;
        @include relative-top-left(-2px, 0);
      }
    }
  }
}
</style>
