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
      if (!IsEmpty(this.$store.state.login.lifeCharge)) {
        for (let i = 0; i < this.$store.state.login.lifeCharge.length; i++) {
          if (this.$store.state.login.lifeCharge[i].label === '寿险对账单清单') {
            return this.$store.state.login.lifeCharge[i].url1
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
