TSRPC 分布式房间管理架构示例
===

[TSRPC](https://tsrpc.cn) 是专为 TypeScript 设计的 RPC 框架，如果还没有了解过，建议先阅读这篇文章：[《2 天做了个多人实时对战，200ms 延迟竟然也能丝滑流畅？》](https://mp.weixin.qq.com/s/V1YWPF5LmY-l1L5LF2nR3A)

实现了单点服务后，如何将其扩展为一个支持开房间、随机匹配等功能，并且分布式、可扩展的架构呢？

这是本示例想要介绍的部分。

## 特性

**演示地址: https://tsrpc.cn/room-management/index.html**

1. 支持开房间、随机匹配
2. 房间逻辑抽离为单独的 Class，方便自定义
3. 支持分布式部署和水平扩展
4. 相比传统三层架构，结构难度和上手门槛都更低

## 启动

**注意：先启动后端，再启动前端**

### 后端

后端在 **同一个项目下** 拆分为 2 个服务：
- MatchServer：房间管理服务（开房间、随机匹配），HTTP
- RoomServer：房间服务（运行实际房间逻辑），WebSocket

MatchServer 和 RoomServer 为一对多的关系，保持长连接 RPC

```shell
# 启动 MatchServer
npm run dev:match

# 启动 RoomServer
npm run dev:room

# 再启动一个 RoomServer （测试分布式）
npm run dev:room2
```

### 前端

- 需要 Cocos Creator 3.4.2 以上版本
- 先 `npm install`，再打开 Cocos Creator
- 如果 `npm install` 之后打开 Cocos 依然报错，尝试大清理重启：
    - 关闭 Cocos Creator
    - 删除 `library` `temp` 目录
    - 重启 Cocos Creator

## 部署

### 后端

1. 进入 `backend` 目录，执行 `npm run build` 命令构建
2. 将构建后的 `dist` 目录拷贝至服务器
3. 在服务器端 `npm install`
4. 在服务器端运行 `node matchServer.js` `node roomServer.js` 即可
5. 程序需要的配置项，可通过环境变量传入；例如 `PORT` `MATCH_SERVER_URL` `THIS_SERVER_URL`

方便起见，也可以使用 PM2 一键配置和启动：
1. 重复上述 1~3 步骤
2. 在服务端安装 PM2 `npm i -g pm2`
3. 修改构建后的 ecosystem.config.js
4. 一键启动服务 `pm2 start ecosystem.config.js`

**环境变量配置说明**
- MatchServer
    - PORT：服务运行的端口，默认 3000
- RoomServer
    - PORT：服务运行的端口 默认 3001
    - MATCH_SERVER_URL：要连接的 MatchServer 地址（可以是内网地址），默认 `http://127.0.0.1:3000`
    - THIS_SERVER_URL：客户端可访问的本服务地址，默认 `ws://127.0.0.1:端口号`

### 前端

1. 修改 `frontend/assets/scripts/models/FrontConfig.ts` 里的 `matchServer` 地址
2. 构建部署

## 架构

![1](https://user-images.githubusercontent.com/1681689/165915071-6556cf8a-1292-4db4-acff-e0bec3ac358c.png)
![2](https://user-images.githubusercontent.com/1681689/165915078-e7ef32fd-43d0-4bb5-aa05-825a8dce613f.png)
![3](https://user-images.githubusercontent.com/1681689/165915082-9fca98e6-1907-4f60-b32d-8b06890dc8cf.png)
![4](https://user-images.githubusercontent.com/1681689/165915090-e278fdda-8379-4c79-b622-9e276d9e91dc.png)

## 扩容

既然是分布式，那么可以水平扩展和平滑扩容，当然是必不可少的了。基于此套架构扩展，10 万人同时在线也绝非难事。

**RoomServer 扩容**

通常，对于此类场景，性能瓶颈都在 `RoomServer`。比如现在你各自启动了 1 个 `RoomServer` 和 `MatchServer`，然后发现用户数量激增，一个 `RoomServer` 很快就不够用了。

此时，你只需要多启动几个 `RoomServer`，注册到相同的 `MatchServer` 即可以实现平滑扩容。

注意多个 `RoomServer` 应该具有不同的 URL。

**MatchServer 扩容**

相比 `RoomServer`，`MatchServer` 的压力要小得多。但如果你的游戏成了大爆款，连 `MatchServer` 都出现瓶颈了怎么办呢？

答案很简单，我们可以把每个 `MatchServer` 及其管理的 `RoomServer` 视为 **一组** 服务。

当 `MatchServer` 遇到性能瓶颈后，我们只需再额外部署 **几组** 这样的服务群即可，即：

- 同时存在多个 `MatchServer`
- 每个 `MatchServer` 管理多个 `RoomServer`
- 每个 `RoomServer` 只注册到唯一的 `MatchServer`
- `MatchServer` 作为无状态服务，由前置负载均衡（例如 nginx 或者阿里云 SLB）完成随机转发

## 加群交流

![image](https://user-images.githubusercontent.com/1681689/165915560-cbe2520a-b654-472b-828e-e42252d5e32f.png)

## 版权声明

本项目使用了以下模型：
- [https://sketchfab.com/3d-models/proportional-low-poly-man-free-download-0bfd0e2b49a348a4b64b20cc8196e3b3](https://sketchfab.com/3d-models/proportional-low-poly-man-free-download-0bfd0e2b49a348a4b64b20cc8196e3b3)  
（作者：Robin Butler，协议：CC AttributionCreative Commons Attribution）