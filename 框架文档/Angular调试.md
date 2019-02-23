### `Chrome`调试

**1. Augury： Angular专用的chrome 调试插件****1.1 Augury安装**
[augury.angular.io/](https://link.juejin.im/?target=https%3A%2F%2Faugury.angular.io%2F)
Augury是一个Chrome插件，直接安装即可。**1.2 使用方法**
打开浏览器控制台，你会看到Augury菜单。
**1.2.1 查看Component结构**
![img](https://user-gold-cdn.xitu.io/2018/1/3/160bc5cff65854e4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
**1.2.2 查看属性/方法/依赖注入/源码**
还可以双击修改属性，会实时反馈到页面上。![img](https://user-gold-cdn.xitu.io/2018/1/3/160bc5cffb0262b7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
**1.2.3 Component关系图**
![img](https://user-gold-cdn.xitu.io/2018/1/3/160bc5cfef7d5890?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
**1.2.4 路由结构**
可以查看完整的路由关系、路由详细等：![img](https://user-gold-cdn.xitu.io/2018/1/3/160bc5cffbd8042d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
**2. Sources调试**

熟悉JS调试的应该都使用过

```
Sources调试
```

。

按

```
F12
```

打开浏览器控制台，选择 

```
Sources 
```

标签，然后在左侧的树中选择

```
 webpack:// 
```

节点展开后进入源码目录设置断点即可 



注意：



- 如果用的 Angular CLI，那么 ng serve 默认就提供完整的 sourcemap，直接点鼠标打断点就行
- 如果是自己配置的 Webpack 环境（Devtool），需要选择带 module 版本的 sourcemap 才会把 bundle 中的内容映射回源文件，例如 cheap-module-eval-source-map。