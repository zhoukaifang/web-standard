## 父子事件

```java
/*
	总结：
	1.比如在子组件Header.vue中定义了一系列的方法：fn1,fn2,fn3
	2.在父组件中引用的该子组件元素上通过ref='smName'实现父子组件的链接
	然后在父组件的某个方法中通过 this.$refs.smName 就可以获取所有子组件（所有配置）定义了的方法以及一些其他属性如：fn1,fn2,fn3...
*/
```

```javascript
/*
	父组件：要调用组件的当前组件，比如Father.vue
	子组件：就是被调用的组件，如公用组件

	1.如果是只是激发子组件的方法，直接在子组件里面写就可以了
	2.如果子父组件要调用子组件的方法，那么就要在子组件的当前方法内部通过`this.$emit(name,data)`去绑定在父组件`@name=(methodName)`的方法名methodName，其中`name`就相当于关联父子组件的一个纽带，而data是要传输的数据，可以传多个。

*/
// 子组件 Header.vue
// <i @click="ac" class="iconfont icon-arrowleft"></i>

methods:{
    ac(){
        console.log('来自Header组件')
        this.$emit('a','哈哈')
    }
}

// 父组件 Gage.vue
// <Header @a="bbb" ref='aaa' class="wk-header" headerTitle='大门控制' isShow='首页'></Header>

methods:{
    bbb(data){
        alert(data)
    }
}

// 哈哈
```

```javascript
/*
	1.在子组件定义一个任意的方法 childfnName。
        childfnName(){
            alert('呵呵')
        }
    2.在父组件的任意元素上定义一个任意的方法 fatherfnName ，并在父组件的子组件元素上通过一个ref='refName'来实现双向绑定子组件的 childfnName 方法。
    fatherfnName(){
    	this.$refs.refName.childfnName();
    }
    // 呵呵
    3.要注意的是在父组件上的子组件引用上定义的方法不能引用ref绑定的方法
*/
```

## slot内容分发

- 父组件Main.vue调用子组件Header.vue，**某部分使用不同的内容**

  ```javascript
  // 子组件Header
  <template>
      <div id='header'>
          <i class="iconfont icon-arrowleft"></i>
  		<div v-else class="wk-header-icon">123123</div>
  		 <slot></slot> 
      </div>
  </template>

  // 父组件Main
  <Main>
      <!-- 这里可以写任意内容 ，然后上面子组件slot标签对应的位置就会显示相应的内容-->
     <Icon type="navicon-round"></Icon> 
  </Main>
  ```

- 父组件Main.vue调用子组件Header.vue，**根据slot属性slot=name的不同值，显示对应不同的内容区块**

  ```javascript
  // 子组件Header
  <template>
      <div id='header'>
          <i class="iconfont icon-arrowleft"></i>
  		<div v-else class="wk-header-icon">123123</div>
  		<!-- 这里name的值对应父组件Main中slot的值，这里就会显示该值对应的内容 -->
  		 <slot name='nav'></slot> 
      </div>
  </template>

  // 父组件Main
  <Main>
     <!-- 如果具体要显示那个ICON，在Header组件的slot标签的name属性中指定一个值，就可以显示对应的ICON -->
          <span slot="plus">
              <Icon type="plus-round"></Icon>
          </span>
          <span slot="close">
              <Icon type="close-round"></Icon>
          </span>
          <span slot="nav">
              <Icon type="navicon-round"></Icon>
          </span> 
  </Main>
  ```

  ### props参数传递

  ```javascript
  // 子组件Header
  <template>
      <div id='header' :class='HeaderClass' @click='HeaderClick'>
         
      </div>
  </template>
  <script>
     props:{
  	HeaderClass:String
     },
     methods: {     
         HeaderClick(){
             this.$emit('Log', '哈哈');
         }
     },
  </script>       

  // 父组件Main
  <template>
  	<Main>
          <Header :HeaderClass='active' @Log='ShowLog'></Header> 
  	</Main>
  </template>
  <script>
     methods: { 
         ShowLog(msg){
             console.log(msg);
         }
     }, 
  </script>    
  ```


## 子组件向父组件传递数据`props`,父组件接收数据在子组件中`属性`用`:`接收，事件用`@`接收；

```javascript
// 子组件
<div @click='$emit("childClick",name)' class='child'>
    {{ name }}
</div>

props:{
    name:{
        type:String,
        default:'我是子组件'
    }
}

//=========================================================

// 父组件
<div class='parent'>
    <Child :childClick='parentClick' /> // 我是子组件
        {{ showName }} // 我是子组件
</div>

data(){
    return {
        showName:''
    }
}

methods:{
    parentClick(name){
        this.showName = name
    }
}
```



##父组件向子组件传递数据`provide`,子组件接收`inject`

```javascript
// 父组件
<div class='parent'>
    <Child /> // 我是子组件
        {{ showName }} // 我是子组件
</div>

data(){
    return {
        showName:''
    }
}

provide(){
    return {
        rootParent:this
    }
}
//=========================================================

// 子组件
<div class='child'>
    {{ rootParent.showName }}
</div>

inject:['rootParent']

```

























































