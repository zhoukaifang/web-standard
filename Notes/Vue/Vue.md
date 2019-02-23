## 一、DOM上的指令

### 1.`v-bind`

- 响应式更新HTML属性：class、id、style、...
- 简写：v-bind:id   ===  :id

###2.`v-on`

- 绑定DOM事件：click、title（hover）、...
- 简写：v-on:click   ===   @click

### 3.`v-if`

- 判断指令
- 可以`v-else-if`、 `v-else`配合使用
- 顺序是 `v-if  -->  v-else-if  -->  v-else`

### 4.`v-for`

- 循环指令

- ```html
  <ul id="app">
    <li v-for="(value, key, index) in items" :key='index'> 
        <!-- vue2.0起v-for循环要有key属性 -->
       {{ index }}. {{ key }}: {{ value }}
    </li>
  </ul>
  ```

###5.`v-show`

- 动态切换`display`样式属性的值
- `v-show` 的元素始终存在，`v-if`  的元素只有为` true` 时才存在


### 6.`v-pre  v-cloak  v-once`

- `v-pre` : 原样输出，并不绑定任何东西
- `v-cloak`：渲染完成后再输出
- `v-once`：只在文档加载时渲染一次

### 7.`v-model`

- 给组件添加 v-model 属性时，默认会把 value 作为组件的属性。

  ```html
  <!-- 下面实际得到的值是 value 的值，即 sex 为“男” -->
  <input type="radio" name="" id="check_1" value="男" v-model='sex' >
  ```

- 用于表单控件绑定。

### 8.`v-text  v-html`

- `v-text`：

  ​	通常使用数据绑定的时候都是直`<span> {{ message }} </span>`绑定，这样的话如果页面加载的慢就会先出现大括号`{{message}}`然后才会获取到实际的数据；但是如果用了`v-text`会更友好，会等`DOM`先加载完才加载`message`的实际数据。

- `v-html`：绑定的是一段实际的`html`代码，相当于`jquery`的`.html()`方法。


## 二、实例的属性和方法

```javascript
// 实例属性
vm.$data
vm.$el
vm.$options
vm.$parent
vm.$root
vm.$children
vm.$refs
vm.$els

// 实例方法/数据
vm.$watch
vm.$get 
vm.$set
vm.$delete
vm.$eval
vm.$interpolate
vm.$log
```



### 1.`el`

- new Vue 实例要绑定的元素
- 一个实例只能绑定一个元素（父）

### 2.`data`

- 需要用到的数据，都在data里面定义

- 只要data里面定义的数据有变化，DOM中对应的`{{数据变量}}`就会做相应的改变

- data里定义的属性，当前实例的其他地方如computed中（属性或者方法的首层）需要拿到这里面的属性值的时候通过 `this.属性名`获取。

  ```javascript
  var vm = new Vue({
    el: '#demo',
    data: {
      firstName: 'Foo',
      lastName: 'Bar'
    },
    computed: {
      fullName: function () {
        return this.firstName + ' ' + this.lastName
      }
    }
  })
  ```

### 3.`computed`

- 这里定义的方法会默认自动执行，相当于随时监听的watch方法。即当所监听的依赖有变化时候，都会执行相应的函数从而使实际数据自动变化。但有一定的区别。

- 主要作用是计算属性值。

- `computed`和`watch`都有数据依赖。

- `watch`和`computed`各自处理的数据关系场景不同

  1.`watch`擅长处理的场景：一个数据影响多个数据

  2.`computed`擅长处理的场景：一个数据受多个数据影响

- 在很多时候，`computed`是用来处理使用`watch`和`methods`的时候无法处理，或者是处理起来并不太恰当的情况的。

### 4.`methods`

- “手动”执行的方法。


- 定义方法

  ```javascript
  data:{
      mes:'这是一个按钮！',
  	_show:false
  },
  methods:{
      _click:function(){
          this.mes = '被点击了!';
          console.log('执行点击操作');
      },
      _hover:function(){
          this._show = true;
          console.log('执行鼠标悬停操作');
      },
  }
  ```

  ```html
  <div id='app'>
      <span :title='_hover'>哈哈</span>
      <span @click='_click'>{{mes}}</span>
  </div>
  ```

- 组件要用methods里面注册的方法，需要 .native 调用。

  ```html
  <div id="app">
  	<btn @click.native='add(5)'></btn>
  </div> 

  <script>
  const btn = {
              template:`<button>组件ADD</button>`
          }
  const app = new Vue({
      el:'#app',
      data:{
          price:100,
      },
      components:{
          'btn':btn
      },
      methods:{
          add:function(num){
              if(num != '') this.price += num;
              else this.price++
          }
      }
  })
  </script>
  ```

  ​


###5.`watch`

- 数据实时监听。

- 对应一个对象，键是观察表达式，值是对应回调。值也可以是方法名，或者是对象，包含选项。在实例化时实际上是为每个键调用 `$watch()`方法 。

- `computed`和`watch`都有数据依赖。

- `computed`的作用主要是计算，`watch`的作用主要是观察一个特定的值，当该值变化时候执行某个特定的函数。

- `watch`和`computed`各自处理的数据关系场景不同

  1.`watch`擅长处理的场景：一个数据影响多个数据

  2.`computed`擅长处理的场景：一个数据受多个数据影响

- 在很多时候，`computed`是用来处理使用`watch`和`methods`的时候无法处理，或者是处理起来并不太恰当的情况的。

### 6.`computed`

- ```html
  <div>
  1. data 属性初始化 getter setter
  2. computed 计算属性初始化，提供的函数将用作属性 vm.reversedMessage 的 getter
  3. 当首次获取 reversedMessage 计算属性的值时，Dep 开始依赖收集
  4. 在执行 message getter 方法时，如果 Dep 处于依赖收集状态，则判定 message 为 reversedMessage 的依赖，并建立依赖关系
  5. 当 message 发生变化时，根据依赖关系，触发 reverseMessage 的重新计算
  </div>
  ```

- 主要作用是计算data里面注册的原始数据，从而使得原始数据不会被污染。

### 7.`extend、extends、mixins`

- Vue.extend
  - Vue.extend只是创建一个构造器,他是为了创建可复用的组件.
- mixins,extends
  - 而mixins和extends是为了拓展组件.



### .生命周期

```javascript
           // Vue 生命周期的钩子函数
            beforeCreate:function(){
                console.log('1:初始化之前');
            },
            created:function(){
                console.log('2:创建完成');
            },
            beforeMount:function(){
                console.log('4:挂载之前');
            },
            mounted:function(){
                console.log('5:挂载之后');
            },
            beforeUpdate:function(){
                console.log('6:数据更新之前');
            },
            updated:function(){
                console.log('7:数据更新之后');
            },
            //activated:function(){
                // console.log('1:初始化之前');
           // },
           // deactivated:function(){
                // console.log('1:初始化之前');
           // },
            beforeDestroy:function(){
                console.log('10:实例被销毁之前');
            },
            destroyed:function(){
                console.log('11:实例被销毁之后');
            }
```





## 三、组件

### 1.`props`

- 父组件（`Vue.component`所注册的组件或者实例定义的组件）向子组件传递数据
- 除了将 props 定义为一个数组或字符串，你还可以将其定义为一个带有验证要求条件的对象。



###2.`events`

- 子组件向父组件传递数据






###3.`slot`

- ` slot`是标签的内容扩展，也就是说你用slot就可以在自定义组件时传递给组件内容，组件接收内容并输出。

  Ps：也就是说：slot标签的name值是什么，元素引用slot属性的值就是什么。

  ​			slot 标签name绑定的值和使用slot属性元素对应的slot的值是同一个。

  slot的使用需要两步：

  - 1、在HTML的组件中用slot属性传递值。

  ```html
          <jspang>
              <span slot="bolgUrl">{{jspangData.bolgUrl}}</span>    
              <span slot="netName">{{jspangData.netName}}</span>    
              <span slot="skill">{{jspangData.skill}}</span>    
          </jspang>

  ```

  - 2、在组件模板中用`<slot name=''></slot>`标签接收值。

  ```html
          <template id="tmp">
              <div>
                  <p>博客地址：<slot name="bolgUrl"></slot></p>
                  <p>网名：<slot name="netName"></slot></p>
                  <p>技术类型：<slot name="skill"></slot></p>
              </div>
          </template>

  ```

  ​





##四、全局 API 

### `###  ### 

​	每个全局的实例方法，在实例内都可以通过`$`来绑定。如：`$set()`相当于`Vue.set()`。

### 1.`Vue.set`

- 外部改变Vue实例内部数据的值，即添加或者改变。
- 改变数组：`Vue.set(vue.arr，下标，要改为的值)`
- 改变对象：`Vue.set(vue.obj，newkey，newvalue)`, `Vue.set(vue.obj，oldkey，newvalue)`


### 2.`Vue.extend()`

- **参数：**对象。

  **用法：**使用Vue构造器，创建一个“子类”，参数是一个包含组件选项的对象，其中,`data`选项中必须是函数。

  **描述：**`Vue.extend`返回的是一个“扩展实例构造器”，也就是预设了部分选项的Vue的实例构造器，**它常常服务于`Vue.component`用来生成组件**，可以简单理解为当在模板中遇到该组件作为标签的自定义元素时，会自动调用“扩展实例构造器”来生产组件实例，并挂在到自定义元素上。

- `extend`扩展了构造器后，返回一个实例对象，想要使用这个实例对象，必须`new`改对象，并通过`$mount()`挂在到具体的元素上才会生效(可以多次挂在不同的元素上)。

  ```javascript
  // 注册
  var author = Vue.extend({
    template: "<p><a :href='url'>{{author}}</a></p>",
    data : function() {
      return {
        author : 'vamous',
        url : 'http://blog.csdn.net/Dear_Mr/article/details/72614370'
      }
    }
  });

  // 挂载到元素 #author 上
  new author().$mount('#author');

  // 使用
  <author></author>
  ```

- 通过`propsData`传递参数

  ```javascript
  new author({propsData: {name : 'dear_mr'}}).$mount('#author');
  ```

- 生成的实例扩展器，既可以绑定到具体的元素上，也可以做`Vue.component(options)`中作为一个子组件`compontents:{author:'author'}`

```html
<!--
1.Vue.extend

	Vue.extend只是创建一个构造器,他是为了创建可复用的组件.

2.mixins,extends

	而mixins和extends是为了拓展组件.
-->
```

```javascript
/*
- Vue.extend
  - Vue.extend只是创建一个构造器,他是为了创建可复用的组件.
- mixins,extends
  - 而mixins和extends是为了拓展组件.


Vue.component 注册全局组件,为了方便

Vue.extend 创建组件的构造函数,为了复用

mixins、extends 为了扩展

*/
```







###3.`Vue.directive()`

- 语法：`Vue.directive(name,options)`，一般适用于集成第三方插件。

  - name：自定义的指令的名称--在元素上使用自定义指令的时候`v-name`实现绑定。
  - options：提供的钩子函数：
    - `bind`: 只调用一次，指令第一次绑定到元素时调用且只调用一次，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
    - `inserted`: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
    - `update`: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
    - `componentUpdated`: 被绑定元素所在模板完成一次更新周期时调用。
    - `unbind`: 只调用一次， 指令与元素解绑时调用。

  ```html
  <!-- 使用 -->  <!-- v-text是vue制定的指令，不是自定义 -->
  <div v-charles='color' v-text='num'></div>
  <script>
  		// 定义指令    
          Vue.directive('charles',{ 
              bind:function(el,binding){ // 被绑定（初始化）
                  console.log('1-bind');
                  el.style = 'color:'+binding.value
              }, 
              inserted:function(){ //绑定到节点
                  console.log('2-inserted');

              },
              update:function(){ // 组件更新
                  console.log('3-update');

              },
              componentUpdated:function(){ // 组件更新完成
                  console.log('4-componentUpdated');
                  
              },
              unbind:function(){ // 解绑
                  console.log('5-unbind');

              },
          })
      
      	// 实例
      	const app = new Vue({
              el:'#app',
              data:{
                  num:10,
                  color:'dodgerblue'
              },
              methods:{
                  addNum:function(){
                      this.num++;
                  }
              }
          })
  </script>
  ```

  ​



















