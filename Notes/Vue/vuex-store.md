# 状态管理器：vuex中的store

​	vue项目通常是一个单页面应用，因此导致很多属性或者数据需要公用，并且需要统一管理，所以vue就推出了这个**状态管路模式**。

​	Store实例：可以在`js`文件中通过`new Vuex.Store(state,getters,mutations,actions,modules)`来实例化。

​	需要注意的是这个注册的实例**每个vue项目只允许有一个**。

### state

- 是一个对象，里面就放公用的属性、方法等。
- 相当于`new Vue()`实例中的`data`。

### getters

- `state`的数据过滤器。
- 在`getters`里面的方法都是通过某种判断条件，然后获取这种条件下的`state`。
- `new Vue()`实例通过全局暴露的`$store.getters.xxx`来调用`getters`里面的方法。
- 相当于`new Vue()`实例中的`computed`。

### mutations：同步

- 更改`store`状态的唯一指定方法。


- 更改`state`状态，**同步执行**，相当于这里的方法都默认先执行一次。
- 在`actions`中通过上下文`context.commit('xxx')`进行异步操作。

### actions：异步

- 异步执行`mutations`的方法。
- 这里的方法在`new Vue()`中通过全局调用：`$store.dispatch('xxx')`



### modules

- 如果不通过`modules`来简化状态的返回，通常在标签中直接使用`$store.state.xxx`来用，通过`modules`简化后直接通过`xxx`来调用。

- 简化：

  ```javascript
  computed:{
      count(){
          return this.$store.state.a.count;
      }
  },
  // 这样就可以直接通过 count 直接用了。
  ```

  ​



###管理方法时的简写方式：

```javascript
//方法一：
computed: {
     notes() {return this.$store.getters.notes},
     activeNote() {return this.$store.getters.activeNote}
  }
//方法二：
computed: {
    ...mapGetters([
        'notes', 'activeNote'
      ])
  }

```



## 使用

```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavbar:true,
    isChildren:true,
    HeaderTitle:''
  },
  mutations: {
    changeHeaderTitle(state,title){
      state.HeaderTitle = title;
    },
    changeNavbar(state,flag){
      state.isNavbar = flag;
    },
    changeChildren(state,flag){
      state.isChildren = flag;
    }
  },
    actions: {
        changeHeaderTitleAction({commit},title){
            commit('changeHeaderTitle',title)
        }
    }
});
```

> 在`main.js`中引入`Vuex`自动把`store`定义为全局变量
>
> 使用的时候`this.$store.state...`

- 使用`mutations`

  ```javascript
  this.$store.commit('changeHeaderTitle', '账单详情'); // 同步
  ```

- 使用`actions`

  ```javascript
  this.$store.dispatch('changeHeaderTitleAction', '账单详情'); // 异步
  ```

  ​