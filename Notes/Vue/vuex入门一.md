##手把手教你vuex（一） 
###1  先使用vue-cli 搭配好Vue 前端开发环境 
```    
     vue  init webpack 'demo'
```
###2  假设 vue-cli 安装很顺利，
### 3  创建一下vuex 文件夹

![image-20180820145242914](/var/folders/1r/t5zgxbgd71l238q7sj0vcr0r0000gn/T/abnerworks.Typora/image-20180820145242914.png)

     3.1 在src 目录下先建一个vuex文件夹  
     3.2 在vuex文件夹创建一个store.js 
     3.3 安装vuex
``` 
      cnpm install vuex --save   
```
### 4在刚刚创建的store.js 引入 vue 和引入vuex,并且use vuex

    代码如下：
```
    import Vue from "vue"
    import Vuex from "vuex"
    Vue.use(Vuex);
```
### 5定义数据（在store.js中写代码）
```
      /*1.state在vuex中用于存储数据*/
        var state={

            count:1
        }
```
### 6 定义方法  mutations里面放的是方法，方法主要用于改变state里面的数据
```    
        var mutations={

            incCount(){

          ++state.count;
            }
        }
```
### 7 暴露Vuex的实例对象 
```
  写法一
      const store = new Vuex.Store({
		    state,       /*这里的state,mutations 是ES6 的写法,如果key 跟                vlaue 相同，则可以使用一个值,如果不相同则必须写2值，key 跟value 必须要写 */
		    mutations

      
		})
  
  写法二
      /*标准写法应该是 */

      const store = new Vuex.Store({
              state:  state ,   /* 第二个state则是上面定义的变量,如果上面定义的变量名为states 则应该写成：state:  states */ 
              mutations:mutations  
          })	
		export default store;  
```
### 8 在组件里使用vuex   
     1 我们在 components定义一个home.vue的组件 
     2 引入store  
```  
    import store from "../vuex/store.js"
```
    3 注册store 附上home.vue组件里完整的代码
```
  <template>
  <div id="home">
    我是首页组件
    ----{{this.$store.state.count}}


    <br>
    <button @click="inCont">增加数组++</button>
  </div>
</template>


<script>

  import store from "../vuex/store.js"
  export default {
    data(){
      return {
        msg:'我是一个home 组件',
        vaule:''
      }
    },
    store,
    methods:{
      inCont(){
        this.$store.commit('incCount')   /*这里官方文档写得有问题,触发state里面的数据的时候,要加上this,
         我们这里需要用到commit 去触发vuex 里面的mutations里面对象的incCount方法，
         然后这个方法去改变state里面的数据，我这里是改变的是state 里面的count的值
        */
      }
    }

  }
</script>
```
    4 获取state里面的数据 
      this.$store.state.数据 
      我这里 state里面只定义了一个count 的变量 获取方法如下： 
      {{this.$store.state.count}}
    5  触发mutations 改变state里面的数据 
      this.$store.commit('inCount');
    6 这里我在home 组件里写了一个按钮button 绑定了一个方法
```
      <button @click="inCont">增加数组++</button>
```
    7 把这个方法写在methods 里面 代码如下:
```
   methods:{
      inCont(){
        this.$store.commit('incCount')
      }
```










