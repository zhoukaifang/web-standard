## 分别在使用`mutations`和`actions`

> 在`actions`中分别通过`commit`和`dispatch`来绑定前者与后者中的方法，并使用异步函数`new Promise()`

```javascript
/**
 * 这种使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名的用法
 * 可以在store中当mutation中的方法很多时候在一个单独的js中统一用常量替代
 * 用以达到对方法作用一目了然的目的
 */
// export const Fn = 'FnTest'

import {
  Fn
} from './type'

const R = (res) => {
  console.log(res);
}

const contentManage = {
  state: {
    ImgLoading: false,
    count: 0
  },

  mutations: {
    CHANGE_IMG_LOADING(state, flag) {
      state.ImgLoading = flag;
      console.log(state.ImgLoading);
    },
    [Fn](state) { // ES6的计算属性命名
      return new Promise((resolve, reject) => {
        R(state)
        resolve(state) // 代表R(state)执行成功
        reject() // 代表R(state)执行失败
      }).then((res) => {
        console.log(res); // R(state)执行成功会执行
      }).catch((err) => {
        console.log(err); // R(state)执行失败会执行
      })
    },
    actionA(state) {
      state.count++
      console.log(state.count)
    }
  },

  actions: {
    actionTest({
      commit
    }, falg) {
      commit('CHANGE_IMG_LOADING', falg)
    },
    actionB({
      dispatch,
      commit
    }, state) {
      return new Promise((resolve, reject) => {
        commit(Fn, state) // ES6的计算属性命名mutations绑定--A
        commit('actionA', state) // 正常的mutations绑定--B
        dispatch('actionTest', true) // 正常的actions绑定--C
        resolve(state,a) // A\B\C三个绑定的方法都执行成功后才会执行，但是因为这里的a变量无法找到，最后会执行reject()
        reject() // A\B\C三个绑定的方法只要有一个执行失败都会执行 --> a is not defined
      })
    }
  }
}
export default contentManage


// 在实际的vue组件中使用
  import {
    mapActions
  } from 'vuex'

methods:{
    ...mapActions({
        add: 'actionB' // 将 `this.add()` 映射为 `this.$store.dispatch('actionB')`
      }),
        useMapActionsAdd(){
            this.add(this.activeName).then(res => {
            console.log(res); // add方法执行成功后，这里res的值就是实际的this.activeName
          }).catch(err => {
            console.log(err); // actionB()执行失败或者执行过程发送错误都会执行
          })
    	}
    }
}

```

