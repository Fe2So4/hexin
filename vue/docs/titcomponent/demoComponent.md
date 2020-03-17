#### 示例组件(DemoComponent)
引用：`import DemoComponent from '@/titcomponents/demoCommponent.vue'`
#### 说明
组件用于描述如何开发一个自定义的TIT-VUE组件。

#### 依赖模块

+ moment
+ src/titcomponents/assets/jquery.min.js

#### 代码示范
```vue
<template>
  <div>
    <demo-component/>
  </div>
</template>

<script>
import DemoComponent from '@/titcomponents/demoComponent.vue'
export default {
  components: {
    'demo-component':DemoComponent
  }
}
</script>

<style lang="scss" type="text/css">
</style>

```

#### 参数说明
+ 内部参数(data)

| 参数名| 参数说明| 何时改变|类型|可选值|默认值|
| - |:-:|:-:|:-:|:-:|:-:|
| time| 系统时间 | 每秒增加1 |String|-|-|

+ 外部参数(props)

| 参数名| 参数说明| 详述|类型|可选值|默认值|
| - |:-:|:-:|:-:|:-:|:-:|
|-|-|-|-|-|-|

+ 事件(events)

| 事件名| 说明| 回调参数 |
| - |:-:|:-:|
|- |- |- |

+ 函数(methods)

| 函数名名| 说明| 参数 |
| - |:-:|:-:|
|- |- |- |

#### 变更日志

2017-11-20 -组件创建 by syz。