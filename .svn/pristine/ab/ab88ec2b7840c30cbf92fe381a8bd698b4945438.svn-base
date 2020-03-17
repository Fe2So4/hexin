#### 组件说明
本章适用于
+ 不同项目可公用的业务组件。
+ 自主开发的VUE的ui组件。
+ 改进的或者封装成Vue的ui组件。

#### 如何开发

+ *推荐使用命令行工具自动完成操作*
```bash
###新建一个业务组件，并自动关联文档。
node ./bin/initComponent -c demo
###新建一个TIT-VUE组件，并自动关联文档。
node ./bin/initComponent -t demo
```

新组件需要依赖一个新的nodejs模块:
+ 获取依赖包`npm install --save momnet`。
+ 在`package.json`的`dependencies`节点中找到`momnet`节点的内容，并复制到`package-origin.json`的相应节点。

新组件需要依赖一个压缩的js文件：
+ 获取文件例如：`jquery.min.js`
+ 复制文件至 `src/titcomponents/assets/`目录下。
+ 在组件中引用 `require('jquery.min.js')`,css同理。
+ 在组件中使用 `window.$('#testJQ').html('created by JQ')`

组件代码:
```vue
<template>
  <div id="demo">
    {{time}}
    <div id="testJQ">
    </div>
  </div>
  
</template>

<script>
import moment from 'moment'
require('./assets/jquery.min.js')
export default {
  name: 'tit-demo-component',
  data () {
    return {
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    setInterval(() => {
      this.time = moment().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
    window.$('#testJQ').html('created by JQ')
  }
}
</script>

<style lang="scss" type="text/css">
</style>

```

#### 编写组件文档

+ 新建 `docs/ticomponent/[组件名].md` 文件。
+ 复制 `docs/ticomponent/demoComponent.md` 内容至新文件中。
+ 打开 `docs/_sidebar.md` 并在 `- [TIT组件](titcomponent/README)`节点下添加`- - [示例组件](titcomponent/[组件名].md)`

#### 上传至svn
上传 package-origin.json ,src/titcomponents/,docs/_sidebar.md,docs/titcomponent/至svn即可。