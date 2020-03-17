<template>
  <el-container class="layout_container">

    <el-container>
      <el-header height="4.3rem" class="layout_header">
      <router-view name="header" />
      </el-header>
      <router-view name="aside" />
      <el-main v-bind:style="{marginLeft:marginLeft+'px'}"  class="layout_main">
        <div class="main-holder" ><router-view name="main" /></div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserId, setUserId } from '@/utils/cookie'
export default {
  components: { },
  name: 'login',
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  destroyed () {
  },
  beforeCreate () {
    let userId = this.$route.query.userId
    if (userId === null || userId === undefined) {
      userId = getUserId()
      if (userId === null || userId === undefined) {
        userId = ''
      }
    } else {
      setUserId(userId)
    }
    this.$store.dispatch('GetUserInfo', userId)
    this.$store.dispatch('GetAllAgent', userId)
  },
  computed: {
    marginLeft () {
      return this.$store.state.login.marginLeft
    }
  }
}
</script>
<style scoped lang="scss">
@import "../variable.scss";
.layout_header{
    background-image: linear-gradient(90deg, #003CCE 0%, #52CEFF 100%);
    color: #fff;
    padding: 0;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background-size: 100% 100%;
}
.layout_main{
    padding: 0;
    position: fixed;
    left: 40px;
    right: 40px;
    bottom: 20px;
    top: 88px;
    border: 1PX solid #ccc;
    border-radius: 20px;
    box-shadow: 0 2PX 12PX 0 rgba(0, 0, 0, 0.1);
    overflow: auto;
}
.main-holder{
   min-width: 905PX;
   height:99%
}
</style>
