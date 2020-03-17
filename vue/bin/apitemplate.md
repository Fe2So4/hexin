#### 接口地址
`demo/api`

#### 接口说明
这是一个示例接口

#### 入参列表

| 参数名| 参数说明|类型|可选值|默认值|
| - |:-:|:-:|:-:|:-:|
| name| 姓名 |String|-|-|
| age| 年龄 |Int|-|-|
| sex| 性别 |Int|0-男,1-女|0|

#### 入参示例

```json
{
    name:'aaa',
    age:23,
    sex:0
}
```

#### 返参列表

| 参数名| 参数说明|类型|可选值|默认值|
| - |:-:|:-:|:-:|:-:|
| resultCode| 状态码 |Int|-|-|
| message| 处理结果 |String|-|-|

#### 返参示例

```json
{
    resultCode:0,
    message:'成功'
}
```

#### 涉及文件
+ `src/component/app.vue`