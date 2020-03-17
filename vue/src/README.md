+ App.vue是项目入口组件,需要全局生效的css样式可以写在App.vue中
+ variable.scss是定义css变量的地方，使用时需要将该文件引入css代码中。只能以相对路径引入，例如：
``` scss
@import "../variable.scss";
div {
  background: $base_blue;
}
```
+ main.js 是项目js的入口逻辑，具体参看main.js的注释