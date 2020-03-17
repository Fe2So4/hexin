<template>
  <div id="notice-bar">
      <div class="location"  >
          <span class="now" >您当前的位置：</span>
          <div class="bc-container" >
              <slot name="location"></slot>
          </div>
      </div>   
  </div>
</template>

<script>
export default {
  name: 'ui-notice-bar',
  data () {
    return {
      item: {}
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
#notice-bar {
    font-size: 14px;
    line-height: 36px;
    border-bottom: 1PX solid #ececec;
    .bc-container{
        display: inline-block;
        line-height: 36px;
        vertical-align: middle;
    }
    .now{
        vertical-align: middle;
    }
    .right {
        float: right;
        padding-right: 60px;
        color: #ff7777;
    }
    .nb-nt{
        font-weight: bolder;
    }
}
</style>
