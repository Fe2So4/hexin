### 认识ECMA规范
> ECMA是javascript的规范，目前(2017-11-13)有3,5,6,7版本,浏览器大部分支持到5(IE仅部分支持)，最新的nodejs(8.x)支持7。

#### ECMA 3.0
+ 最经典的js语法标准，目前市面上大部分教程都是基于ECMA3.0的语法规范进行的。
+ 了解什么是本地对象，内置对象和宿主对象:http://www.w3school.com.cn/js/pro_js_object_types.asp
+ 了解Array对象的方法使用，重点了解splice的用法：http://www.w3school.com.cn/jsref/jsref_obj_array.asp
+ 了解Date对象的方法使用（非重点，一般使用moment代替Date对象）：http://www.w3school.com.cn/jsref/jsref_obj_date.asp
+ 了解String对象的方法使用，重点split，indexOf，replace：http://www.w3school.com.cn/jsref/jsref_obj_string.asp
+ 了解RegExp对象，了解正则表达式的语法：http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp
+ 了解Object对象，了解深浅拷贝的区别。
#### ECMA5.0
+ JSON对象,stringify和parse方法。

```javascript
//stringify方法转化Object对象为String对象，可以用于url传参以及http请求
var a={b:1,c:2};
JSON.stringify(a);
>>"{"b":1,"c":2}"
//parse方法转化String对象为Object对象，转化失败抛出异常。
var a='{"b":1,"c":2}';
var obj=JSON.parse(a);
obj.b;
>>1
```

+ Array对象的扩展函数：reduce,some,every,map,forEach等的用法：https://dev.opera.com/articles/javascript-array-extras-in-detail/。
+ Function对象的bind方法指定this，了解函数的作用域。
#### ECMA6.0/7.0
+ 箭头函数（函数扩展）
+ module模块引入以及导出
+ class类定义
+ Promise 对象函数和async函数。
+ 参考资料：http://es6.ruanyifeng.com/#README

### 认识babel
>由于部分浏览器对es6，7不支持，所以我们需要将es6,7的语法翻译成es5。在这里我们利用babel编译器将语法翻译成浏览器能运行的es5语法。
babel主页：https://github.com/babel/babel

>由于部分浏览器不支持es5语法，我们需要引入babel-polyfill,使得浏览器可以运行es5的语法。

- [下一步-了解webpack](info/webpack.md)