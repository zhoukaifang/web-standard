# Vue代码风格指南

### 1.组建名必须多个单词组合

> 多个单词组合能有效避免以后维护时出现组件元素冲突的情况

```javascript
// 不推荐
Vue.component('todo',{
    // ...
});
export default {
    name:'Todo'
}

// 推荐
Vue.component('todo-item',{
    // ...
});
export default {
    name:'TodoItem'
}
```

### 2.组件数据`data`必须返回一个函数

> 除了`new Vue`跟实例的`data`，所有组件的数据`data`都必须返回一个函数

```javascript
// 不推荐
data:{
    // ...
},

// 推荐
data(){
    retrun {
        // ... 
    };
},
```

### 3.`Prop`的定义应该尽量详细

> `Prop`定义时是否详细，能避免一些不必要的数据形式的错误

```javascript
// 不推荐
	props:['status'],
    
// 推荐
    props:{
        status:String
    }

// 更好的做法
props:{
    status:{
        type:String,
        require:true,
        validator:(value)=>{
            return [
                'syncing','synced','version-conflict','error'
            ].indexOf(value) !== -1
        }
    }
}
```

### 4.使用`v-for`必须设置键值`key`

> `key`键必须配合`v-for`，能有效便于维护内部组件及其子树的状态

```html
// 不推荐
<ul>
    <li v-for='item in items'>
    	{{item.text}}    
    </li>
</ul>

// 推荐
<ul>
    <li v-for='item in items' :key='item.id'>
    	{{item.text}}    
    </li>
</ul>
```

### 5.`v-for`和`v-if`不能在同一个元素中一起使用

> 因为`v-for`比`v-if`拥有更高的优先级，所以如果在同一个元素上同时使用两者的话，每次遍历的时候都会判断一次，会造成不必要的和运算，降低效率。

```html
// 不推荐
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  <li>
</ul>

// 推荐
// 把需要判断的部分，提取为一个函数，在父元素上使用`v-if`去判定
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  <li>
</ul>
// 其中：
shouldShowUsers(){
    return //...
}
```

### 6.为组件样式设置作用域

> 除了顶层`App`组件的样式可以是全局的，其他单组件的样式都应该是有作用域的，这能避免很多类名重复、样式覆盖的问题。特别是用到UI框架的时候。  

**另外，应尽量避免使用`scoped`，而应该使用`Css Modules`**

```html
<!-- 不推荐 -->
<template>
  <button class="btn btn-close">X</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>

<!-- 推荐 -->
<template>
  <button :class="[$style.button, $style.buttonClose]">X</button>
</template>

<!-- 使用 CSS Modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```





















































































































































