<template>
  <div class="label-text">
    <div v-bind:class="{required:required}"  v-bind:style="{'min-width': labelWidth + 'px' }" class="lt-label" >{{label}}</div>
    <div v-if="text" class="lt-text" >{{text}}</div>
    <slot class="lt-text" name="text"></slot>
  </div>

</template>

<script>
export default {
  name: 'ui-label-text',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {

  },
  components: {
  },
  props: ['label', 'text', 'required', 'labelWidth']
}
</script>

<style lang="scss" scoped type="text/css">
@import '../variable';
.lt-label {
  color: $label_gray;
  font-size: 14px;
  @include inline-div(auto);
}
.required:before{
    content: '*';
    font-size: 24px;
    font-weight: bolder;
    color: #ff7777;
    position: relative;
    top: 7px;
}
.lt-text {
  @include inline-div(auto);
  font-size: 14px;
}
</style>

<style type="text/css" lang="scss">
@import '../variable';
.label-text{
  line-height:32px;
  .el-input__inner{
    line-height:32px !important;
    font-size:14px !important;
    height:32px !important;
    width: 268px !important;
    input::-webkit-input-placeholder{font-size: 12px}
    input::-ms-input-placeholder{font-size: 12px}
  }
  .el-select__caret{
    color:$base_blue;
  }
  .el-input,textarea {
    @include inline-div(268px);
  }
  .el-checkbox__label{
    font-size: 12px;
  }
  .el-textarea{
    width:auto;
  }
  .lt-label{
    vertical-align: top;
  }
}
</style>

