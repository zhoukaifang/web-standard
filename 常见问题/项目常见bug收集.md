####1、`https`页面加载`http`资源导致在`IOS`下报错的问题

> 解决：属于跨域范畴，要加载相同协议的资源。
>
> 如：页面引入的微信SDK的js地址，如果页面是基于`HTTPS`加载的，微信的SDK对应的也要引入支持`HTTPS`的资源地址。

**如果不是SDK的问题，就是证书的问题，要重新申请证书**

####2、输入框/下拉框在`IOS12.0`上失去焦点后键盘或者页面布局不能回复正常的问题；

> 解决：
>
> 1、监听页面滚动事件，记录滚动的`SCROLLTOP`的值；
>
> 2、输入框失去焦点或者下拉选择完成后，页面回滚到对应的位置；

```javascript
// 页面初始化的时候监听页面滚动事件
window.addEventListener('scroll', this.handleScroll)


// 页面滚动事件
            handleScroll(){
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            },
            // 下拉框或者输入框失去焦点后页面滚动到对应的位置，解决IOS12页面布局失常的问题
            scrollTo(){
                const body = document.getElementsByTagName('body')[0]
                body.scrollTop = this.scrollTop
            },
                
                
```

####3、时间处理横杠`-`在`IOS`不兼容的问题；

> 解决：不能用第三方库处理，尽量以字符串的方式处理。
>
> 因为通常第三方封装的`JS`都会直接封装，而不会特别针对横杠做处理。



#### 4、input框限制输入为纯数字

> 业务需要，在年龄或者卡号输入时只允许为纯数字，不允许用户输入非数字字符。

##### 解决方法

###### 1. input type属性为number限定

```javascript
  <input type="number">
  <input type='tel'>    // 可以唤起手机数字键盘
```

> 已知bug：
>
> > 1. type="number可以输入e字符
> >    1. IOS手机上不兼容

###### 2. 用正则来限定输入参数

```javascript
 $('#txtInput').on('input',function () {
     $(this).val($(this).val().replace(/[^0-9]/g, ''))
 })
```

> 用oninput来实时监听input框value值的变化

#### 5、IOS输入法弹出和切换语言时出现的输入框遮挡问题

> IOS在软键盘弹起来时，input框未随着软键盘弹起来，或者切换软键盘时，软键盘高度变化了，input框未跟着移动（目前无解。。。）

##### 解决方法

###### 1. 定时器循环设置document.body.scrollTop

```javascript
 let timer = null
 timer = setInterval(function() {
 	document.body.scrollTop = document.body.scrollHeight;
}, 500);
```

> 只要document.body.scrollTop大于软键盘的高度即可。一直用定时器在定位，即使滚动了背后的元素，也可以马上定位回来，然后在失去焦点的时候清除定时器。scrollIntoView这个属性也是相关定位
> 已知bug：
> ​	1. iphone x 上的输入框会一直闪，每隔500ms闪，安卓和iphone6上未发现。是否将500ms改成100ms就不会闪了？？？
> ​	优化：如何不用定时器 ？监听键盘或者背后元素移动事件来实时定位，来节省资源？（看方法2）

###### 2. 定时器循环有条件设置document.body.scrollTop

```javascript
	let teacher_info_timer = null 
	let scrollTopHeight = undefined
	teacher_info_timer = setInterval(function() {
          console.log('scrollTop', document.body.scrollTop)
          if(document.body.scrollTop !== scrollTopHeight) {
            console.log('进来了', document.body.scrollTop)
            scrollTopHeight = document.body.scrollTop
            document.body.scrollTop = document.body.scrollHeight;
          }
        }, 500);
```

> 优化：实时判断document.body.scrollTop有无变化，有变化再去改变定位
>
> 最后还是放弃这种了，因为IOS12上面还是不兼容，会闪一次，没有方法1那么频繁而已，所以此问题暂时无解，要是能主动监控键盘高度变化就好了。

#### 6、 IOS12上的手机软键盘收回页面问题

> IOS12系统上软键盘收起来，页面不会自动弹下来，IOS12以下没有问题

##### 解决方法

> 在input的onblur事件中手动设置html,body的scrollTop值

```javascript
$('html, body').scrollTop(0) 
```

> 备注：原理就是将页面滚动一下，将dom元素重新排列到正常的位置，所以scrollTop的值可以看情况而定，不一定非得是0

#### 7、 input标签maxLength兼容性问题

> 目前发现在索尼手机安卓5.1微信浏览器上发现maxLength约束字符无用

##### 解决方法

> 动态检测input中val的长度，然后截取值

```javascript
$('#cnt').bind('input propertychange', function () { // 动态检测
    var val = $(this).val()
    var valLength = val.length;
    if (valLength >= 800) {
       $(this).val(val.substr(0, 800)) // 截取字符
       $(this).blur();
       setTimeout(function () {
          $dato.toast("您本次输入已达到上限800字");
       }, 300)
    }
})
```

#### 8、 Vue兼容IE9及以上

> vue项目在IE浏览器上报vuex requires a Promise polyfill in this browser

##### 解决方法

> 第一步： 安装 babel-polyfill 。 babel-polyfill可以模拟ES6使用的环境，可以使用ES6的所有新方法
> 第二步： 在 Webpack/Browserify/Node中使用
> 在webpack.config.js文件中，使用

```javascript
   npm install --save babel-polyfill
  
   module.exports = {
       entry: {
         app: ["babel-polyfill", "./src/main.js"]
       }
   };
```



























