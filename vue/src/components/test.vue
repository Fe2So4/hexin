<template>
  <div id="test">
    测试专用页面
    <el-button @click="query">默认按钮</el-button>
  </div>

</template>

<script>
import {Button} from 'element-ui'
export default {
  name: '',
  data () {
    return {
      log: 'getIT',
      data: '天安佰盈保险销售有限公司深圳分公司'
    }
  },
  created () {
    console.log(this.log)
  },
  mounted () {
    console.log(this.log)
  },
  methods: {
    query () {
      this.data = this.data.replace(/天安佰盈保险销售有限公司/, '')
      this.data = this.data.replace(/分公司/, '')
      console.log(this.data)
    }
  },
  components: {
    [Button.name]: Button
  }
}
</script>

<style lang="scss" scoped type="text/css">
</style>
