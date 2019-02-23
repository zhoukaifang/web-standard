### `CLASS` 类的定义

```javascript
// 基本语法
class Test{
    // constructor函数会默认执行，并且如果此函数没有显式定义，就会被隐式定义
    constructor(x,y){
        // 这里定义的属性都是定义在Test实例上的属性
        // 这里的this返回的是当前的实例
        this.x = x
        this.y = y
        this.str = '哈哈。'
    }
    // 不是在constructor定义的属性后是定义在实例的原型上的
    getName(name){
        console.log(name)
    }
    getCount(){
        return this.x + this.y
    }
}

const classTest = new Test(1,2)
classTest.getName('哈哈') // 哈哈
classTest.x // 1
classTest.y // 2
classTest.str // 哈哈。
classTest.getCount() // 3
```

