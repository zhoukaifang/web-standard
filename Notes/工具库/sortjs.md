## 点击实现排序

> 实现在列表中任意点击`item`后实现真实排序功能

```javascript
// 逻辑实现或者取消后，都要情况/重置原来的值

data(){
    return {
        num: 0,
        count: 0,
        thisIndex: -1
    }
},
  mounted() {
    const inputList = document.getElementsByClassName('sort')
    for (let q = 0; q < inputList.length; q++) {
      inputList[q].innerHTML = ''
    }
  },
methods: {
    /**
       * 点击后：
       *    1、当前num为空的时候，num++，当前值等于num，其它所有项有值的不变；
       *    2、当前num不为空的时候：
       *       A、如果当前项是最大的项，当前值置空，其它值不变；
       *       B、如果当前项不是最大的项:
       *           ①、比当前项的值大的项的值--，当前值置空；
       *           ②、比当前项的值小的项的不变，当前值置空；
       */
    addNum(index) {
      this.count = 0
      const inputList = document.getElementsByClassName('sort')
      this.thisIndex = parseInt(inputList[index].innerHTML)
      const __value = inputList[index].innerHTML
      for (let q = 0; q < inputList.length; q++) {
        const value = inputList[q].innerHTML
        if (value !== '') {
          this.count++
        }
      }
      if (__value === '' || !__value) {
        this.num++
        inputList[index].innerHTML = this.num
      } else {
        if (this.thisIndex === this.count) { // 当前项是最大的项
          this.num--
          inputList[index].innerHTML = ''
          for (let q = 0; q < inputList.length; q++) {
            const value = inputList[q].innerHTML
            if (value && parseInt(value) > 2 && parseInt(value) > this.count - 1) {
              inputList[q].innerHTML = parseInt(value) - 1
            }
          }
        } else {
          for (let q = 0; q < inputList.length; q++) {
            const value = inputList[q].innerHTML
            if (value > this.thisIndex) {
              inputList[q].innerHTML = parseInt(value) - 1
            }
          }
          this.num--
          inputList[index].innerHTML = ''
        }
      }
    },
    // 重置排序的值
  sortInit() {
    return new Promise((resolve) => {
      this.num = 0
      this.count = 0
      const inputList = document.getElementsByClassName('sort')
      for (let q = 0; q < inputList.length; q++) {
        inputList[q].innerHTML = ''
      }
      resolve()
    })
  },
  }
```

