### 使用elementUI
elementUI是vue2.0的pc端UI框架
+ 参考资料：http://element-cn.eleme.io/#/zh-CN

``` vue
//使用示例
<template>
  <div id="test">
    测试专用页面 
    <el-button>默认按钮</el-button>
  </div>
  
</template>

<script>
import {Button} from 'element-ui';
export default {
  name: '',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {

  },
  components: {
    [Button.name]:Button
  }
}
</script>

<style lang="scss" scoped type="text/css">
</style>

```