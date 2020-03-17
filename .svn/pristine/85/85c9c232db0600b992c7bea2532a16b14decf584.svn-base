<template>
  <div id="app">
    <router-view v-wechat-title="title" />
  </div>
</template>

<script>
// import global from '@/utils/global'
// import IsEmpty from '@/utils/IsEmpty'
export default {
  name: 'app',
  data () {
    return {
      title: '佰盈核心业务系统'
    }
  },
  mounted () {
    window.onbeforeunload = () => {
      this.$store.state.login.enumData = []
      for (const key in this.$store.state) {
        if (this.$store.state.hasOwnProperty(key)) {
          const element = this.$store.state[key]
          localStorage.setItem(key, JSON.stringify(element))
        }
      }
    }
  },
  created () {
    this.$store.dispatch('getEnumData')
  }
  // watch: {
  //   // userId: {
  //   //   handler (newValue, oldValue) {
  //   //     if (!IsEmpty(newValue) && !IsEmpty(oldValue)) {
  //   //       window.location.href = '/tabycore/login'
  //   //     }
  //   //   }
  //   // }
  //   'global.isLogin' () {
  //     console.log('watch')
  //     if (!IsEmpty(global.isLogin) && global.isLogin !== 0) {
  //       window.location.href = '/tabycore/login'
  //     }
  //   }
  // }
}
</script>

<style lang="scss" type="text/css">
@import './variable.scss';
@import '../static/fonts/iconfont.css';
@media screen and (min-width:	10PX) and (max-width:	919PX){html{font-size:	10PX!important}}
@media screen and (min-width:	920PX) and (max-width:	1006PX){html{font-size:	11PX!important}}
@media screen and (min-width:	1007PX) and (max-width:	1093PX){html{font-size:	12PX!important}}
@media screen and (min-width:	1094PX) and (max-width:	1180PX){html{font-size:	13PX!important}}
@media screen and (min-width:	1181PX) and (max-width:	1267PX){html{font-size:	14PX!important}}
@media screen and (min-width:	1268PX) and (max-width:	1354PX){html{font-size:	15PX!important}}
@media screen and (min-width:	1355PX) and (max-width:	1441PX){html{font-size:	16PX!important}}
@media screen and (min-width:	1442PX) and (max-width:	1528PX){html{font-size:	17PX!important}}
@media screen and (min-width:	1529PX) and (max-width:	1615PX){html{font-size:	18PX!important}}
@media screen and (min-width:	1616PX) and (max-width:	1702PX){html{font-size:	19PX!important}}
@media screen and (min-width:	1703PX) and (max-width:	1789PX){html{font-size:	20PX!important}}
@media screen and (min-width:	1790PX) and (max-width:	1876PX){html{font-size:	21PX!important}}
@media screen and (min-width:	1877PX) and (max-width:	1963PX){html{font-size:	22PX!important}}
@media screen and (min-width:	1964PX) and (max-width:	2050PX){html{font-size:	23PX!important}}
@media screen and (min-width:	2051PX) {html{font-size:	24PX!important}}

@keyframes scroll{from {transform: translateY(0);} to {transform: translateY(-100%);}}
@keyframes scroll2{from {transform: translateY(0%);} to {transform: translateY(-100%);}}

body{
  margin: 0;
  padding: 0;
}
html{
  -webkit-text-size-adjust:none;
}

#app{
  position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
/*修改element样式*/
.el-button{
 line-height: 30px;
 height: 30px;
 width: 120px;
 font-size: 16px;
 padding: 0;
}
.el-table thead,.el-table th, .el-table th {
  background: $lighten_bg_blue;
  color: $base_blue;
}
.el-table th,.el-table td {
  text-align: center;
}
.el-dialog__header,.el-dialog__title {
  background: #fafdff;
  color: $base-blue;
  font-size: 16px;
  padding: 10px;
}
.el-dialog__header{
  border-bottom: 1px solid $lighten_bg_blue;
}
.el-dialog__headerbtn {
  top: 10px;
}
.el-dialog__headerbtn .el-dialog__close {
  font-size: 16px;
  border-radius: 16px;
  border: 1px solid;
  padding-right: 1PX;
  padding-top: 1PX;
}
.el-pagination{
  text-align: right;
  margin-right: 10px;
}
.el-input__icon { line-height: initial; }
.el-date-editor .el-range__icon, .el-date-editor .el-range-separator { height: auto;}
.el-input.is-disabled .el-input__inner { color: #717171; }
.el-radio__input.is-disabled+span.el-radio__label { color: #717171; }
.slide-left-enter-active {
  transition: all .1s ease;
}
.slide-left-leave-active {
  transition: all .1s ease-out;
}
.slide-left-enter, .slide-left-leave-active {
  transform: translateX(-150px);
  opacity: 0;
}
.el-table__empty-text{
  font-size: 18px;
  color: black;
}
.el-checkbox__input.is-disabled .el-checkbox__inner {
  background-color: #E4E7ED;
  border-color: #909399;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #E4E7ED;
  border-color: #909399;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #909399;
}
</style>
