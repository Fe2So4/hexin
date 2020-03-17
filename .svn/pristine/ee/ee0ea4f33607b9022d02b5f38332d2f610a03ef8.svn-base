<template>
  <div class="login-container">
    <el-form v-bind:style="{top:`${top}px`}" class="login-form" autoComplete="on" :model="loginForm" :rules="loginRule" ref="loginForm" label-position="left">
      <el-form-item class="username" prop="username">
        <!-- <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username">
            <span slot="prefix"></span>
        </el-input> -->
        <ui-label-text labelWidth="86" label="用户名" >
          <el-input name="username" slot="text" v-model="loginForm.username" placeholder="请输入用户名">
          </el-input>
        </ui-label-text>
      </el-form-item>

      <el-form-item class="pwd" prop="password">
        <!-- <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password">
          <span slot="prefix"></span>
          <span slot="suffix" @click="showPwd">
            <i class="el-icon-view"></i>
          </span>
        </el-input> -->
        <ui-label-text labelWidth="86" label="密码" >
          <el-input name="password" slot="text" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="请输入用户名">
          </el-input>
        </ui-label-text>
      </el-form-item>

      <el-button type="primary" size="small" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  <div id="xitong" v-bind:style="{top:`${titletop}px`}" >
    <div class="xitong-main" >佰盈保险销售公司业务系统</div>
    <div class="xitong-second" >Insurance Sales Compony Business System</div>
  </div>

  <div id="compony" >
    技术支持   TIT福建创昱达信息技术有限公司
  </div>

  </div>
</template>

<script>
import LabelText from '@/components/label-text'
export default {
  components: { [LabelText.name]: LabelText },
  name: 'login',
  data () {
    const {userNameValidator, passWordValidator} = this.$store.getters.validators
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: userNameValidator,
        password: passWordValidator
      },
      loginRule: {
        username: '',
        password: ''
      },
      pwdType: 'password',
      loading: false,
      showDialog: false,
      top: 181,
      titletop: 296
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      // window.top.location.href = '/homePage'
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          let info = {
            jpassword: this.loginForm.password,
            username: this.loginForm.username
          }
          console.log(info)
          this.$store.dispatch('LoginByUsername', info).then(() => {
            this.loading = false
            // this.$router.push({ path: '/' })
            // this.showDialog = true
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
  },
  destroyed () {
  },
  mounted () {
    this.top = (window.innerHeight - document.getElementsByClassName('login-form')[0].clientHeight) / 2
    this.titletop = (window.innerHeight - document.getElementById('xitong').clientHeight) / 2
  }
}
</script>
<style scoped lang="scss">
@import '../variable.scss';
    .login-form{
        width: 594px;
        background: #fff;
        text-align: center;
        position: fixed;
        left: 699px;
        top: 181px;
        height: 406px;
        border-radius: 10px;
    }
    body{
        margin: 0;
        padding: 0;
    }
    .login-container{
      position:fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: url('#{$img_url}/Layer 1.png');
      background-size: 100% 100%;
    .title{
      color: #333;
    }
    }
    .username{
      margin-top: 64px;
      margin-bottom: 48px;
    }
    .pwd{
      margin-bottom: 60px;
    }
    button {
      width: 495px;
      height: 71px;
      line-height: 71px;
      font-size: 32px;

    }
    #xitong{
      position: fixed;
      top: 296px;
      left: 50px;
      color: #fff;
      .xitong-main{
        font-size: 46px;
        line-height: 78px;
      }
      .xitong-second{
        font-size: 28px;
        line-height: 40px;
      }
    }
    #compony{
      position: fixed;
      bottom: 20px;
      font-size: 18px;
      left: 0;
      right: 0;
      text-align: center;
      color: #fff;
    }
</style>
<style lang="scss">
.login-form{
  .lt-label{
    font-size:28px!important;
    color:#999!important;
    margin-right:40px;
  }
}
</style>
