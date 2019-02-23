前端GitLab项目对应的Test分支：



### PC端：

- 1、PC端内容平台：PC-ContentManage--Test
- 2、PC端全局面板：PC-GlobalSetting--Test-Global
- 3、PC端人脸管理：PC-GlobalSetting--Test-Face
- 4、PC端第三方平台：PC-WxSetting--Test
- 5、PC端第三方平台：PC-WxSetting--Test



### 微信端：

- 1、微信端内容平台：WX-ContentManage--Test
- 2、微信端账单支付：WX-SchoolBill--Test
- 3、微信端新生报名：WX-SchoolEnrolStudent--Test
- 4、微信端访客系统：WX-Vistor--Test



### 打包命令

`VUE`：`npm run build`

> 招生和支付因为分家长端以及园长端，所以命令要根据对应的端打包
>
> 家长：`npm run build:parent`
>
> 园长：`npm run build:master`

