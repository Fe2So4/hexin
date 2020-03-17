#### 接口文档说明
接口文档包含：
+ 请求地址
+ 入参列表
+ 入参示例
+ 返参列表
+ 返参示例
+ 涉及文件

#### 如何写
+ *推荐使用命令行工具自动完成操作*
```bash
node ./bin/initComponent -a server/api/user
```

+ 新建`docs/api/[接口名(/转化为_)].md`
+ 复制`docs/api/demo_api.md`的内容至新文件夹
+ 开始填写内容
+ `_sidebar.md` 中 `- [API文档](api/README)`节点下增加`- - [接口](api/文档名.md)`节点


#### 使用rest client发送请求
本章内容需要使用vscode编辑器并且安装 rest client插件
+ 在`docs/api/api.http`中写入请求

```restClient
POST https://{{host}}/comments/{{version}} HTTP/1.1
content-type: application/json

{
    "name": "sample",
    "time": "Wed, 21 Oct 2015 18:27:50 GMT"
}
#接口描述
###

```
+ 点击Send Request 发送请求

如果需要更改环境变量配置
+ 打开.vscode/setting.json。
+ 更改`rest-client.environmentVariables`节点内容。

```json
 "rest-client.environmentVariables": {
        //默认的环境变量，其他环境没有的值会在这里找到默认值
        "$shared": {
            "host":"localhost:8080",
            "version":"v1"
        },
        //dev环境变量
        "development":{
            "version":"v2"
        },
        //production环境变量
        "production":{
            "host":"example.com"
        }
      }
```

如果需要切换化境变量
+ 打开api.http，按下crtl+alt+e,切换环境变量