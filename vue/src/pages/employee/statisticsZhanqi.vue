<template>
  <div  class="iframeDivStyle">
    <iframe class="iframeStyle" v-show="showIframe" id="show-iframe" frameborder=0 name="showHere" scrolling=auto :src="url1"></iframe>
  </div>
</template>

<script>
import IsEmpty from '@/utils/IsEmpty'
export default {
  data () {
    return {
      showIframe: false
    }
  },
  mounted () {
    // window.location.href = 'http://192.168.176.1:8090/tabyperf/index.html#/statistics-zhanqi?userId=9&userCode=00000000&userName=%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86%E5%91%98&orgId=01'
    this.showIframe = true
  },
  beforeDestroy () {
    this.showIframe = false
  },
  methods: {
  },
  components: {
  },
  created () {
  },
  computed: {
    url1 () {
      if (!IsEmpty(this.$store.state.login.zqEmploMag)) {
        for (let i = 0; i < this.$store.state.login.zqEmploMag.length; i++) {
          if (this.$store.state.login.zqEmploMag[i].label === '展期算薪清单') {
            return this.$store.state.login.zqEmploMag[i].url1
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.iframeDivStyle{
  width: 100%;
  height: 100%;
}
.iframeStyle{
  width: 100%;
  height: 100%;
}
</style>
