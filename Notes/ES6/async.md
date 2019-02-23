## `async`实际上是`Promise`函数的 一个更优雅的写法，所以返回的是一个`Promise`对象

- 1、`await`函数按顺序执行；
- 2、如果`await`函数是一个**正常函数**并且函数内部有异步请求，那么回执行完`async`的整个同步流程才会走对应顺序的异步流程；
- 3、如果`await`函数是一个`Promise`函数并且函数内部有异步请求，回把这个`Promise`函数当作同步函数执行；

> `async`函数返回的是一个`Promise`函数

```javascript
// 语法
async function asyncFn(){
    // do something
    console.log(1)
    await console.log(2) // do something later    
    await console.log(3) // do something later and later
     console.log(4)
}
asyncFn().then(()=>{
    console.log(5)
})
console.log('哈哈')
// 1 2 哈哈 3 4 5
```

> 有同步执行同步，有异步执行相同线程(层)的异步

```javascript
export default async function asyncTest() {
    async function asyncFn(){
        // do something
        console.log(1)
        await console.log(2) // do something later    
        await console.log(222) // do something later    
        await console.log(3) // do something later and later
         console.log(4)
    }
    asyncFn().then(()=>{
        console.log(5)
    })
    console.log('哈哈')
    new Promise((r,j)=>{
        console.log('O');
        r()
    }).then(()=>{
        console.log('A');
    })
    new Promise((r,j)=>{
        console.log('Q');
        r()
    }).then(()=>{
        console.log('T');
    })
}
 asyncTest()
// 1 2 哈哈 O Q 22 A T 3 4 5
```

> Ps：`await`必须写在`async`函数内部

### `async`函数有多种使用方式

```javascript
// 函数声明
async function Foo(){}

// 函数表达式
const Foo = async function(){}

// 对象的方法
const Obj = { async Foo(){} }
Obj.Foo().then()

// Class 的方法
class Foo {
    constructor(name){
        this.name = name
    }
    async getName(name){
        console.log(name)
    }
}
const asyncFoo = new Foo()
asyncFoo.getName('哈哈').then(()=>{
    console.log('完成')
})

// 箭头函数
const Foo = async ()=>{}
```











































































































































