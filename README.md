# UpsGoC

UpsGo是一个基于 Go+Vue 开发的又拍云 对象存储 服务管理应用。UpsGoC是其WEB客户端

## 开始构建

### 修改 src/main.js
```
Vue.prototype.server = 'http://xxx.xxx.xxx.xxx:7125';//服务器处理地址
Vue.prototype.domain = 'https://xxx.xxx';//又拍云加速域名
```

### 构建
```
npm run serve
```

### 服务端
[UpsGo](https://github.com/xuthus5/UpsGo)
