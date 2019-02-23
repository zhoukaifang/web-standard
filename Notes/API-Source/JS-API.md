#API

## Object

### 1.Object.defineProperty

> 可以定义新属性或者修改原有属性

- 语法：`Object.defineProperty(obj,prop,descriptor)`

  > obj：必须。目标对象
  >
  > prop：必须。需要定义或者修改的属性的名字
  >
  > descriptor：必须。目标属性所拥有的特性

- 返回值：传入函数的对象。即传入的`obj`

- 数据描述：

  ```javascript
  // 当修改或者定义某个属性的时候，可以给这个属性添加一些特性。
  // exp：
  let obj = {
      test:'Hello'
  };
  // 对已有对象添加特性描述
  Object.defineProperty(obj,'test',{
      configurable:true|false, // 是否可被删除或重新设置，默认false
      enumeralbe:true|false, // 是否可被枚举(使用for...in或Object.keys())，默认false
      value:任意类型的值, // 值，默认undefined
      writable:true|false // 是否可被重写，默认false
  });

  //对对象新添加属性的特性描述
  Object.defineProperty(obj,'newKey',{
      configurable:true|false, // 是否可被删除或重新设置，默认false
      enumeralbe:true|false, // 是否可被枚举(使用for...in或Object.keys())，默认false
      value:任意类型的值, // 值，默认undefined
      writable:true|false // 是否可被重写，默认false
  });

  // getter和setter
  /* ps：当使用了getter和setter方法之后，不允许使用writerable和value两个属性*/
  const initValue = 'Hi'
  Object.defineProperty(obj,'newKey',{
      get(){
          return initValue; // 默认返回undefined
      },
      set(newVal){
          return initValue= newVal; // 默认返回undefined
  	}
  });
  ```

### 2.Object.assign

> 定义：合并两个对象，并返回第一个对象的引用

- 语法：`Object.assign(newObj,oldObj)`

  >newObj：一个空对象或者已有对象；
  >
  >oldObj：需要合并或者复制的对象；

- 返回值：

  > `Object.assign(newObj,oldObj)`执行后返回`newObj`的引用；如果只有一个参数，返回该参数的引用；如果两个对象有相同的属性，`newObj`会被`oldObj`的覆盖。

- exp：

  ```javascript
  
  ```

  




## Function

### 1.`proptertype`

定义：

- 实例如`var func = new Ojb()`，当前的实例`func`的原型就是`func.propertype`
- 方法都应该定义在原型下，如：`Ojb.propertype.funcA = function(){}`，这样当用的时候不但可以正常像对象的属性一样调用`func.funcA()`，主要是在实例`func`被拷贝的时候，拷贝后的实例下的方法指向的是原型`Ojb.propertype`，而不是复制一份从而造成内存多占一份，而如果是用原型定义的话就只是获取到一个指针而已。


###2.`Promise`--(ES6)

- 立即执行性

  > `Promise`对象表示未来将要发生的事件，但是在创建(new) Promise 的时候，作为 Promise 参数传入的函数是会被立即执行的，只是其中的代码可以是异步的代码。

  ```javascript
  let p = new Promise(function(resolve,reject){
      console.log('首先被执行');    
      resolve('最后被执行');
  });
  	console.log('其次被执行');
  p.then(function(val){ 
      console.log(val); // 输出 resolved 状态
  });
  ```

  ​

- `Promise`的是三种状态

  **Promise的内部实现是一个状态机。它有三种状态：**

  > pending只会转为resolved或者rejected中的其中一种状态。

  - `pending`

    > 当刚创建完的时候，处于`pending`状态。

  - `resolved`

    > 当`promise`的参数执行完`resolve`方法之后，由`pending`状态转为`resolved`状态。

  - `rejectd`

    > 而如果`promise`的参数执行的是`reject`方法，就会由`pending`状态转为`rejected`状态。

- `Promise`状态的不可逆性

  ```javascript
  var p1 = new Promise(function(resolve, reject){
    resolve("p1会执行");
    resolve("不会再执行");
  });

  var p2 = new Promise(function(resolve, reject){
    resolve("p2会执行");
    reject("不会再执行");
  });

  p1.then(function(value){
    console.log(value);
  });

  p2.then(function(value){
    console.log(value);
  });

  // p1会执行
  // p2会执行
  ```

  > 上面的例子表明：`Promise`一旦由`rending`状态确定为`resolved`或者`rejected`的时候，无论之后再如何调用`solve`和`reject`，都不会改变已经取得的状态和值。这就是`Promise`的不可逆性。

- 链式调用

  ```javascript
  var p = new Promise(function(resolve,reject){
      resolve(1); // 第一次执行，输出 1
  });

  // PS:
  // 以下的每个console的其实就是当前then方法的return的值
  p.then(function(value){               //第一个then，执行的是resolve(1)，所以输出 value*2 => 2;
    console.log(value);
    return value*2;
  }).then(function(value){              //第二个then，没有return语句，返回undefined
    console.log(value);
  }).then(function(value){              //第三个then，返回成功执行的 resolve，所以返回/输出 resolve
    console.log(value);
    return Promise.resolve('resolve'); 
  }).then(function(value){              //第四个then，返回执行失败的 reject
    console.log(value);
    return Promise.reject('reject'); // 这里执行的是失败的回调，所以会在throw中抛出失败对象，所以会执行最后的异常抛出函数
  }).then(function(value){              //第五个then，因为第四个then返回的是rejected，所以会执行err，最后输出"reject: reject"
    console.log('resolve: '+ value); 
  }, function(err){
    console.log('reject: ' + err);
  });

  // 1
  // 2
  // undefined
  // "resolve"
  // "reject: reject"
  /*
  代码中第一个then会返回一个值为2（1*2），状态为resolved的Promise对象，于是第二个then输出的值是2。第二个then中没有返回值，因此将返回默认的undefined，于是在第三个then中输出undefined。第三个then和第四个then中分别返回一个状态是resolved的Promise和一个状态是rejected的Promise，依次由第四个then中成功的回调函数和第五个then中失败的回调函数处理。
  */
  ```

  > `Promise`对象链式调用的每个then方法返回的都是一个新的Promise对象。而每个then方法都接收两个参数，第一个是Promise执行成功时的回调，第二个参数就是Promise执行失败时返回的回调。
  >
  > 要注意的是两个参数只有一个会被调用，并在被调用之后返回值作为新的Promise对象执行下一个then方法。

  - `return` 一个同步的值 ，或者 `undefined`（当没有返回一个有效值时，默认返回undefined），`then`方法将返回一个resolved状态的Promise对象，Promise对象的值就是这个返回值。
  - `return` 另一个 Promise，`then`方法将根据这个Promise的状态和值创建一个新的Promise对象返回。
  - `throw` 一个同步异常，`then`方法将返回一个rejected状态的Promise,  值是该异常。

- `Promise then()`回调异步性

- `Promise`中的异常

- `Promise.resolve()`

- `resolve vs reject`





#JS-Library

## Window

### 1.浏览器事件

- #### history 中的操作

  > 简单介绍
  >
  > 1.window.history.back()，后退
  >
  > 2.window.history.forward()，前进
  >
  > 3.window.history.go(num)，前进或后退到指定的历史记录
  >
  > 4.window.history.pushState(state, title, utl)，在页面中创建一个 history 实体。直接添加到历史记录中。
  >
  > 　参数：　　
  >
  > ​	state：存储一个对象，可以添加相关信息，可以使用 history.state 读取其中的内容。
  >
  > 　　title：历史记录的标题。
  >
  > 　　url：创建的历史记录的链接。进行历史记录操作时会跳转到该链接。
  >
  > 5.window.history.replaceState()，修改当前的 history 实体。
  >
  > 6.popstate 事件，history 实体改变时触发的事件。
  >
  > 7.window.history.state，会获得 history 实体中的 state 对象

- #### 使用方法

  > 取消默认的返回操作：
  >
  > 1.添加一条 history 实体作为替代原来的 history 实体
  >
  > ```javascript
  > function pushHistory(){
  >   var state = {
  >        title: "title",
  >        url: "#"     
  >     };
  >   window.history.pushState(state, "title", "#");   
  > };
  >
  > pushHistory();
  > ```
  >
  > 2.监听 popstate 事件
  >
  > ```javascript
  > window.addEventListener("popstate", function(){
  >     //doSomething
  > }, false);
  >
  > ```

- 注意事项

  > 1.每次返回都会消耗一个 history 实体，若用户选择取消离开，则需要继续 pushState 一个实体
  >
  > 2.pushState 只能使用一个实体，多个实体返回会出错。使用 window.history.state 查询是否存在添加的实体。

## Ajax

- `get`

  ```javascript
  var xmlhttp;
  if(window.XMLHttpRequest){
     xmlhttp = new XMLHttpRequest();
  };

  xmlhttp.onreadystatechange = function(){
      // 请求完成并且请求成功-状态码为 200
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
         // do something with xmlhttp.responseText
      }else{
          // 404
          alert('response error');
      }  
  };
   
  xmlhttp.get('GET',url,true);
  xmlhttp.send();
  ```

- `post`

  > `post` 需要设置请求头`Content-type`还有发送请求的数据`data`。

  ```javascript
  var xmlhttp;
  if(window.XMLHttpRequest){
     xmlhttp = new XMLHttpRequest();
  };

  xmlhttp.onreadystatechange = function(){
      // 请求完成并且请求成功-状态码为 200
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
         // do something with xmlhttp.responseText
      }else{
          // 404
          alert('response error');
      }  
  };
   
  xmlhttp.open('POST',url,true);
  xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xmlhttp.send(data);
  ```



## Onload

> 添加页面加载事件

```javascript
function addLoadEvent(callback){
    const oldLoad = window.onload;
    if(typeof window.onload != 'function'){
       window.onload = callback;
    }else{
        window.onload = function(){
          oldLoad();
          callback();
        };
    }
};
// 可以通过`addLoadEvent(callback)`方法添加不同的多个文档加载完成后执行的方法。
```

## Aminate

###1.`position:top/left`实现移动动画

```javascript
// DOM加载完毕的onload函数
function addEventListener(callback){
    var onload = window.onload;
    if(typeof onload == 'function'){
        onload();
        callback();
	}else{
        onload = function(){
          onload = callback;  
        };
	};
};

// 通过ID获取元素
function getElemengtByID(ID,toX,toY,stepTime){
    if(!document.getElementById) retrun false;
    if(!document.getElementById(ID)) retrun false;
    var animateDIV = document.getElementById(ID);
    animateDIV.style.position = 'absolute';
    animateDIV.style.left = '0px';
    animateDIV.style.top = '0px';
    animateDIV.onclick = function(){
      animateJS(div,toX,toY,stepTime);  
    };
};

// 动画函数
function animateJS(div,toX,toY,timeStep){
    var left = parseInt(div.style.left);
    var top = parseInt(div.style.top);
    if(left == toX && top == toY){
       return true;
    };
    var countX = Math.ceil(Math.abs(toX - left));
    var countY = Math.ceil(Math.abs(toY - top));
    left += countX + 'px';
    top += countY + 'px';
};

// DOM加载完毕后实现动画
addEventListener(getElementByID(ID,toX,toY,stepTime));
```

