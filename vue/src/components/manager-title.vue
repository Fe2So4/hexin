<template>
<div>
  <div class="manager-title">
      <div class="line" ></div>
      <div class="title" >
          <slot name="title"></slot>
      </div>
      <div v-on:click="fold()" v-if="collapsible" class="right" >
          <span v-if="isFold" ><i class="font_family icon-jy-down" ></i></span>
          <span v-else ><i class="font_family icon-icon-jy-up" ></i></span>
      </div>
      <div v-else class="right" >
          <slot name="right"></slot>
      </div>
  </div>
  <div class="title-content" v-show="!isFold" >
      <slot name="content"></slot>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'ui-manager-tittle',
  data () {
    return {
      isFold: true
    }
  },
  mounted () {
  },
  methods: {
    fold () {
      this.isFold = !this.isFold
    }
  },
  created () {
  },
  props: ['collapsible']
}
</script>

<style lang="scss" scoped type="text/css">
@import '../variable.scss';
.manager-title{
    padding-top: 12PX;
    padding-bottom: 6PX;
    background: #fff;
    .line{
        height: 1PX;
        background: $base-blue;
        z-index: -1;
    }
    .title {
        float: left;
        font-size: 12px;
        color: $base-blue;
        background: #fff;
        margin-top: -9px;
        padding-right: 5px;
        i {
            vertical-align: middle;
            margin-right: 5px;
        }
    }
    .right{
        float: right;
        font-size: 12px; 
        color: $base-blue;
        background: #fff;
        margin-top: -9px;
        padding-left: 5px;
    }
    .right>span>i{
        font-size:10px;
    }
    .right:hover {
        cursor: pointer;
    }
}
.title-content{
        padding-top: 8px;
    }
</style>