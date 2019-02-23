# ES6

## 一、`let` 和 `const`

### 1.let（变量，值可变）

#### 区块变量：let => var 

- `var`命令会发生”变量提升“现象，`let`不存在。

```javascript
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1

// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

```javascript
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
```

#### let定义的变量的作用域在他所在的{}大括号内，没有大括号就会在当前script内部

```javascript
let id = 3;
const a =  ()=> {
    console.log('a:'+this.id);
    console.log('b:'+id);
}
a(); 
// a:undefined
// b:3
undefined
var id1 = 3;
const a1 =  ()=> {
    console.log('a1:'+this.id1);
    console.log('b1:'+id1);
}
a1(); 
// a1:3
// b1:3
```



#### `for`循环有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
// 函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。
```

#### `let`不允许在相同作用域内，重复声明同一个变量。**

```javascript
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```

### 2.块级作用域

```javascript
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world'; // var tmp ; 会被提升到console之前
  }
}

f(); // undefined
```

```javascript
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
//上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。
```

#### ES6块级作用域

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

* 外层作用域无法读取内层作用域的变量。

```javascript
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
```

```javascript
// 函数声明语句（不推荐）
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 函数表达式（推荐）
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

```javascript
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}
```

- 允许在块级作用域内声明函数。
- 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

### 3.const命令（常量，值不可变）

#### `const`声明一个只读的常量。一旦声明，常量的值就不能改变；且一旦声明必须赋值。

- 改变常量的值会报错。

```javascript
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

- 对于`const`来说，只声明不赋值，就会报错。

```javascript
const foo;
// SyntaxError: Missing initializer in const declaration
```

- `const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

```javascript
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined

var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

- `const`声明的常量，也与`let`一样不可重复声明。

```javascript
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

### 总结：

1.'`const` '和 '`let`' 都是块级作用域声明，声明并且赋值后子作用域都可以用，但是子作用域声明的父作用域不能用。所以是区块作用域。

2.`const`声明的是常量，值不可更改；let声明的是变量，值可以更改。所以for循环可以用`let`来声明变量可以更好的避免出错。

3.`const`声明的常量必须赋值，否则报错；`let`声明的常量不赋值，会`undefined`。

**ES6声明变量的六种方法：**var、function、let、const、import、class

### 4.顶层对象的属性

```javascript
window.a = 1;
a // 1

a = 2;
window.a // 2
```

```javascript
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

### 5.global对象

- 浏览器里面，顶层对象是`window`，但 Node 和 Web Worker 没有`window`。
- 浏览器和 Web Worker 里面，`self`也指向顶层对象，但是 Node 没有`self`。
- Node 里面，顶层对象是`global`，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用`this`变量，但是有局限性。

- 全局环境中，`this`会返回顶层对象。但是，Node 模块和 ES6 模块中，`this`返回的是当前模块。
- 函数里面的`this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this`会指向顶层对象。但是，严格模式下，这时`this`会返回`undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全政策），那么`eval`、`new Function`这些方法都可能无法使用。

## 二、变量的解构赋值

### 1.数组的解构赋值（取值由排序位置决定）

- 数组“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

```javascript
let a = 1;
let b = 2;
let c = 3;

//ES6 允许写成下面这样。
let [a, b, c] = [1, 2, 3];
// a=1;b=2;c=3;

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

let [foo] = []; // undefined
let [bar, foo] = [1]; // undefined

let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

- 如果数组`模式不匹配`，会报错

```javascript
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

> 默认值

- 注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。

```javascript
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

- 如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格等于`undefined`。

```javascript
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

```javascript
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
// 上面代码中，因为x能取到值为1，所以函数f根本不会执行。
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

### 2.对象的解构赋值（取值由属性名决定）

- 变量名与属性名一致

```javascript
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

- 如果变量名与属性名不一致

```javascript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
```

```javascript
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}
```

- 对象的解构也可以指定默认值，生效的条件是，对象的属性值严格等于`undefined`。

```javascript
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```

```javascript
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error

// 正确的写法
let x;
({x} = {x: 1});

({} = [true, false]);
({} = 'abc');
({} = []);

let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

### 总结

1.数组和对象都可以根据匹配模式解构：

- 数组是根据排序定值。
- 对象是根据属性名定值。
- 如果模式不匹配，会报错。
- 如果模式匹配但没有赋值，会报undefined。

2.数组和对象都可以指定默认值：

- 匹配模式后，只有当要取的值严格等于（===）undefined，才可以在等号左边指定默认值。

### 3.字符串的解构（类数组，length属性）

- 字符串在被解构时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

- 类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```javascript
let {length : len} = 'hello';
len // 5
```

### 4.数值和布尔值的解构赋值（都有toString属性）

- 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
  - 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
// 数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

### 5.函数参数的解构赋值（复用1、2、3、4）

`undefined`才会触发函数参数的默认值。

```javascript
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

function move({x = 0, y = 0} = {}) { // x、y带有默认值
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8] 模式匹配，根据属性名赋值
move({x: 3}); // [3, 0] 模式匹配，y没有重新赋值，所以是默认值
move({}); // [0, 0] 默认值
move(); // [0, 0] 默认值

function move({x, y} = { x: 0, y: 0 }) { // x、y带没有默认值
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

### 6.圆括号问题

- ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

#### - 不能使用圆括号的情况 --- 基本都是属于模式不匹配或是声明语句

- 1.变量声明语句

  ```javascript
  // 全部报错
  let [(a)] = [1];

  let {x: (c)} = {};
  let ({x: c}) = {};
  let {(x: c)} = {};
  let {(x): c} = {};

  let { o: ({ p: p }) } = { o: { p: 2 } };
  ```

- 2.函数参数

  函数参数也属于变量声明，因此不能带有圆括号。

  ```javascript
  // 报错
  function f([(z)]) { return z; }
  // 报错
  function f([z,(x)]) { return x; }
  ```

- 3.赋值语句的模式

  ```javascript
  // 全部报错
  ({ p: a }) = { p: 42 };
  ([a]) = [5];
  ```

#### - 可以使用圆括号的情况(模式匹配且非声明语句???)

- 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

  ```javascript
  [(b)] = [3]; // 正确
  ({ p: (d) } = {}); // 正确
  [(parseInt.prop)] = [3]; // 正确
  ```

### 7.用途

- **（1）交换变量的值**

  ```javascript
  let x = 1;
  let y = 2;

  [x, y] = [y, x];
  x //2
  y //1
  ```

- **（2）从函数返回多个值**

  ```javascript
  // 返回一个数组
  function example() {
    return [1, 2, 3];
  }
  let [a, b, c] = example();
  console.log(a,b,c); // 1 2 3

  // 返回一个对象
  function example() {
    return {
      foo: 1,
      bar: 2
    };
  }
  let { foo, bar } = example();
  console.log(foo,bar); // 1 2
  ```

- **（3）函数参数的定义**

  解构赋值可以方便地将一组参数与变量名对应起来。

  ```javascript
  // 参数是一组有次序的值
  function f([x, y, z]) { console.log(x,y,z) 
  }
  f([1, 2, 3]); // 1 2 3

  // 参数是一组无次序的值
  function f({x, y, z}) { console.log(x,y,z) 
  }
  f({z: 3, y: 2, x: 1}); // 1 2 3
  ```

- **（4）提取 JSON 数据**

  ```javascript
  let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
  };

  let { id, status, data: number } = jsonData;

  console.log(id, status, number);
  // 42 "OK" [867, 5309]
  ```

- **（5）函数参数的默认值**

  ```javascript
  jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
  }) {
    // ... do stuff
  };
    
  // 类似于：
   let f = function (url,{a=1,b=2,c=3,...}){};
  ```

- **（6）遍历 Map 结构**

  ```javascript
  const map = new Map();
  map.set('first', 'hello');
  map.set('second', 'world');

  for (let [key, value] of map) {
    console.log(key + " is " + value);
  }
  // first is hello
  // second is world

  // 获取键名
  for (let [key] of map) {
    // ...
  }

  // 获取键值
  for (let [,value] of map) {
    // ...
  }
  ```

- **（7）输入模块的指定方法**

  加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

  ```javascript
  const { SourceMapConsumer, SourceNode } = require("source-map");
  ```


## 三、字符串的扩展

### 1.字符的Unicode表示法--添加大括号`{}`

- `ES5`js采用`\uxxxx`形式表示一个字符，其中`xxxx`表示字符的 Unicode 码点。

  ```javascript
  "\u0061"
  // "a"
  ```

- 超出`\u0000`~`\uFFFF`之间的字符，必须用两个双字节的形式表示。

  ```javascript
  "\uD842\uDFB7"
  // "𠮷"

  "\u20BB7"
  // " 7"
  ```

- `ES6`对超出`\u0000`~`\uFFFF`之间字符的表示做出了改进，只要将码点放入大括号，就能正确解读该字符。

  ```javascript
  "\u{20BB7}"
  // "𠮷"

  "\u{41}\u{42}\u{43}"
  // "ABC"

  let hello = 123;
  hell\u{6F} // 123

  '\u{1F680}' === '\uD83D\uDE80'
  // true
  ```

- 在`ES6`中，JavaScript 共有 6 种方法可以表示一个字符。

  ```javascript
  '\z' === 'z'  // true
  '\172' === 'z' // true
  '\x7A' === 'z' // true
  '\u007A' === 'z' // true
  '\u{7A}' === 'z' // true
  ```

###2.codePointAt()--`str.codePointAt(0)>0xFFFF?四字节:二字节`

- `codePointAt`方法会正确返回 32 位的 UTF-16 字符的码点。

  ```javascript
  let s = '𠮷a';

  s.codePointAt(0) // 134071
  s.codePointAt(1) // 57271

  s.codePointAt(2) // 97
  ```

- `codePointAt`方法返回的是码点的十进制值，如果想要十六进制的值，可以使用`toString`方法转换一下。

  ```javascript
  let s = '𠮷a';

  s.codePointAt(0).toString(16) // "20bb7"
  s.codePointAt(2).toString(16) // "61"
  ```

- 使用`for...of`循环，可以正确识别 32 位的 UTF-16 字符。

  ```javascript
  let s = '𠮷a';
  for (let ch of s) {
    console.log(ch.codePointAt(0).toString(16));
  }
  // 20bb7
  // 61
  ```

- `codePointAt`方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

  ```javascript
  function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF; // 四个字节
  }

  is32Bit("𠮷") // true
  is32Bit("a") // false
  ```

### 3.String.fromCodePoint()--识别大于`0xFFFF`的字符(返回具体的字)

- ES5 提供`String.fromCharCode`方法，用于从码点返回对应字符`返回具体的字`，但是这个方法不能识别 32 位的 UTF-16 字符（Unicode 编号大于`0xFFFF`）。

  ```javascript
  String.fromCharCode(0x20BB7)
  // "ஷ"
  ```

- ES6 提供了`String.fromCodePoint`方法，可以识别大于`0xFFFF`的字符，弥补了`String.fromCharCode`方法的不足。在作用上，正好与`codePointAt`方法相反。

  ```javascript
  String.fromCodePoint(0x20BB7)
  // "𠮷"
  String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
  // true
  ```

### 4.字符串的遍历接口-- `for...of`

- 用`String.fromCodePoint(0xXXXX)`返回具体的字；


- 然后`for...of`循环会正确识别出大于`0xFFFF`的码点字符。

```javascript
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"

let text = String.fromCodePoint(0x20BB7);// text = "𠮷"

for (let i = 0; i < text.length; i++) { // 单纯的for循环不能识别
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

### 5.at()--`(提案中)`识别 Unicode 编号大于`0xFFFF`的字符（String.fromCodePoint()）

- ES5 对字符串对象提供`charAt`方法，返回字符串给定位置的字符。该方法不能识别码点大于`0xFFFF`的字符。

  ```javascript
  'abc'.charAt(0) // "a"
  '𠮷'.charAt(0) // "\uD842"
  ```

- `at()`可以识别 Unicode 编号大于`0xFFFF`的字符，返回正确的字符`(提案中)`。

```javascript
'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"
```

### 6.normalize()--`Unicode 正规化`

- ES6 提供字符串实例的`normalize()`方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

  ```javascript
  '\u01D1'.normalize() === '\u004F\u030C'.normalize()
  // true
  ```

### 7.includes(),startsWith(),endsWith()--`字符串查询`,区分大小写

传统上，JavaScript 只有`indexOf`方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

- **includes()**：返回布尔值，表示是否找到了参数字符串。
- **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部。
- **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部。

```javascript
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```

这三个方法都支持第二个参数，表示开始搜索的位置。

```javascript
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

上面代码表示，使用第二个参数`n`时，`endsWith`的行为与其他两个方法有所不同。它针对前`n`个字符，而其他两个方法针对从第`n`个位置直到字符串结束。

### 8.repeat()---用来重复原字符串`str.repeat(n)`

- `repeat`方法返回一个新字符串，表示**将原字符串重复`n`次**。

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

- 参数如果是小数，会被**向下取整**。

```javascript
'na'.repeat(2.9) // "nana"

```

- 如果`repeat`的参数是负数或者`Infinity`，会报错。

```javascript
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError

```

- 但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于`-0`，`repeat`视同为 0。

```
'na'.repeat(-0.9) // ""

```

- 参数`NaN`等同于 0。

```
'na'.repeat(NaN) // ""

```

- 如果`repeat`的参数是字符串，则会先转换成数字。

```
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
```

### 9.padStart(),padEnd()--字符串补全`多补少截等不变`

```javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

- `padStart`和`padEnd`一共接受两个参数，第一个参数用来指定**字符串的最小长度**，第二个参数是用来补**全的字符串**。
- 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
- 如果省略第二个参数，默认使用空格补全长度。

```javascript
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

### 10.matchAll()

- > `matchAll`方法返回一个正则表达式在当前字符串的所有匹配，详见《正则的扩展》的一章。

### 11.模板字符串！！！--双反引号（`）标识

```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

- 变量用`$(变量)`引入。

  ```javascript
  // 普通字符串
  `In JavaScript '\n' is a line-feed.`

  // 多行字符串
  `In JavaScript this is
   not legal.`

  console.log(`string text line 1
  string text line 2`);

  // 字符串中嵌入变量
  let name = "Bob", time = "today";
  `Hello ${name}, how are you ${time}?`
  ```

- 如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

- 所有模板字符串的空格和换行，都会被保留。

- 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。

- 模板字符串之中还能调用函数。

  ```javascript
  function fn() {
    return "Hello World";
  }

  `foo ${fn()} bar`
  // foo Hello World bar
  ```

```javascript
// 变量place没有声明
let msg = `Hello, ${place}`;
// 报错
```

```javascript
`Hello ${'World'}`
// "Hello World"
```

- 模板字符串甚至还能嵌套。

```javascript
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>
```

- 如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。

```javascript
// 写法一
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack') // "Hello Jack!"

// 写法二
let str = '(name) => `Hello ${name}!`';
let func = eval.call(null, str);
func('Jack') // "Hello Jack!"
```

> ```
> // 变量place没有声明
> let msg = `Hello, ${place}`;
> // 报错
> ```

### 12.实例：模板编译

```javascript
function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  let script =
  `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}

let parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>
```

### 13.标签模板

- 模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。

```javascript
alert`123`
// 等同于
alert(123)
```

> “标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

```javascript
function tag(stringArr, value1, value2){
  // ...
}

// 等同于

function tag(stringArr, ...values){
  // ...
}
```

```javascript
let a = 5;
let b = 10;

function tag(s, v21, v52) { // 会按顺序排，与变量名是否同类没有关系
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v21);
  console.log(v52);

  return "OK";
}

tag`Hello ${ a + b } world ${ a * b}`;
// "Hello "
// " world "
// ""
// 15
// 50
// "OK"
tag`Hello ${ a + b } world ${ a * b }`; // hello和world都是字符串，组成数组；${ a + b }和${ a * b }都是变量引入，成为单独的参数；${ a + b }占的位置都会变成一个空格，也在数组里。？？？
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

```javascript
let aq11 = 5;
let bq11 = 10;

function tagq11(s, v1, v2) {
  console.log(s.length);
  console.log(v1);
  console.log(v2);

  return "OK";
}

tagq11`${ aq11 + bq11} Hello world ${ aq11 * bq11}`; // 变量占的位会以空格形式在数组中占位
// 3
// 15
// 50
// "OK"
```

- > “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。

  ```javascript
  function SaferHTML(templateData) {
    let s = templateData[0];
    for (let i = 1; i < arguments.length; i++) {
      let arg = String(arguments[i]);

      // Escape special characters in the substitution.
      s += arg.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

      // Don't escape special characters in the template.
      s += templateData[i];
    }
    return s;
  }
  let sender = '<script>alert("abc")</script>'; // 恶意代码
  let message = SaferHTML`<p>${sender} has sent you a message.</p>`;

  message
  ```

- > （`）转义后，会有一个raw属性，而且raw指向一个数组。

```javascript
tag`First line\nSecond line aaa`;
function tag(strings) {
  console.log(strings.raw[0]);
  // strings.raw[0] 为 "First line\\nSecond line"
  // 打印输出 "First line\nSecond line"
}

tag(`First line\nSecond line aaa`);
function tag(strings) {
  console.log(strings);// 这里不会有对象与数组
  // 打印输出 "First line\nSecond line"
}
```

- > 注意（\）转义的使用

  ```
  tag`First line\nSecond line`

  function tag(strings) {
    console.log(strings.raw[0]);
    // strings.raw[0] 为 "First line\\nSecond line"
    // 打印输出 "First line\nSecond line"
  }
  ```

  `strings`数组是`["First line\nSecond line"]`，那么`strings.raw`数组就是`["First line\\nSecond line"]`

### 14.String.raw()--！？！？！？

- ES6 为原生的 String 对象，提供了一个`raw`方法。

  > `String.raw`方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。
  >
  > ```javascript
  > String.raw`Hi\n${2+3}!`;
  > // 返回 "Hi\\n5!"
  >
  > String.raw`Hi\u000A!`;
  > // 返回 "Hi\\u000A!"
  >
  > //如果原字符串的斜杠已经转义，那么String.raw会进行再次转义。
  > String.raw`Hi\\n`
  > // 返回 "Hi\\\\n"
  > ```

- `String.raw`方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有`raw`属性的对象，且`raw`属性的值应该是一个数组。

  > ```
  > String.raw({ raw: 'test' }, 0, 1, 2);
  > // 't0e1s2t'
  >
  > // 等同于
  > String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
  > ```

  > ```
  > String.raw = function (strings, ...values) {
  >   let output = '';
  >   let index;
  >   for (index = 0; index < values.length; index++) {
  >     output += strings.raw[index] + values[index];
  >   }
  >
  >   output += strings.raw[index]
  >   return output;
  > }
  > ```

### 15.模板字符串的限制

## 四、正则的扩展

###1.RegExp构造函数

- `ES5`:

  ```javascript
  var regex = new RegExp('xyz', 'i');
  // 等价于
  var regex = /xyz/i;

  var regex = new RegExp(/xyz/, 'i'); // 报错
  ```

- `ES6`:

  ```javascript
  var regex = new RegExp('xyz', 'i');
  // 等价于
  var regex = /xyz/i;

  new RegExp(/abc/ig, 'i')
  // /abc/i
  new RegExp(/abc/ig, 'i').flags
  // "i"
  // 原有正则对象的修饰符是ig，它会被第二个参数i覆盖。
  ```

### 2.字符串的正则方法

字符串对象共有 4 个方法，可以使用正则表达式：`match()`、`replace()`、`search()`和`split()`。

ES6 将这 4 个方法，在语言内部全部调用`RegExp`的实例方法，从而做到所有与正则相关的方法，全都定义在`RegExp`对象上。

- `String.prototype.match` 调用 `RegExp.prototype[Symbol.match]`
- `String.prototype.replace` 调用 `RegExp.prototype[Symbol.replace]`
- `String.prototype.search` 调用 `RegExp.prototype[Symbol.search]`
- `String.prototype.split` 调用 `RegExp.prototype[Symbol.split]`

### 3. u 修饰符--新添加处理大于`\uFFFF`的 Unicode 字符

- ES6 对正则表达式添加了`u`修饰符，含义为“Unicode 模式”，用来正确处理大于`\uFFFF`的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。

```javascript
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
```

- 一旦加上`u`修饰符号，就会修改下面这些正则表达式的行为。

  > **（1）** 点字符
  >
  > ```javascript
  > var s = '𠮷';
  >
  > /^.$/.test(s) // false
  > /^.$/u.test(s) // true
  > ```

  > **（2）**Unicode 字符表示法
  >
  >  ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上`u`修饰符，才能识别当中的大括号，否则会被解读为量词。
  >
  > ```javascript
  > /\u{61}/.test('a') // false 如果不加u修饰符，正则表达式无法识别\u{61}这种表示法
  > /\u{61}/u.test('a') // true
  > /\u{20BB7}/u.test('𠮷') // true
  > ```

  >  **（3）**量词
  >
  >  使用`u`修饰符后，所有量词都会正确识别码点大于`0xFFFF`的 Unicode 字符。
  >
  >  ```javascript
  >  /a{2}/.test('aa') // true
  >  /a{2}/u.test('aa') // true
  >
  >  /𠮷{2}/.test('𠮷𠮷') // false
  >  /𠮷{2}/u.test('𠮷𠮷') // true
  >  ```

  >  **（4）预定义模式**`\S`
  >
  >  - `u`修饰符也影响到预定义模式`\S`，能否正确识别码点大于`0xFFFF`的 Unicode 字符。
  >
  >  ```javascript
  >  /^\S$/.test('𠮷') // false
  >  /^\S$/u.test('𠮷') // true
  >  ```
  >
  >  - `\S`是预定义模式，匹配所有不是空格的字符。只有加了`u`修饰符，它才能正确匹配码点大于`0xFFFF`的 Unicode 字符。
  >
  >   利用这一点，可以写出一个正确返回字符串长度的函数。
  >
  >  ```javascript
  >  function codePointLength(text) {
  >   var result = text.match(/[\s\S]/gu);
  >   return result ? result.length : 0;
  >  }
  >
  >  var s = '𠮷𠮷';
  >
  >  s.length // 4
  >  codePointLength(s) // 2
  >  ```

  >  **（5）i 修饰符**
  >
  >  有些 Unicode 字符的编码不同，但是字型很相近，比如，`\u004B`与`\u212A`都是大写的`K`。
  >
  >  ```javascript
  >  /[a-z]/i.test('\u212A') // false
  >  /[a-z]/iu.test('\u212A') // true
  >  //不加u修饰符，就无法识别非规范的K字符。
  >  ```

### 4. y 修饰符

除了`u`修饰符，ES6 还为正则表达式添加了`y`修饰符，叫做“粘连”（sticky）修饰符。

`y`修饰符的作用与`g`修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，`g`修饰符只要剩余位置中存在匹配就可，而`y`修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

```javascript
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null

// ===========================
const REGEX = /a/g;

// 指定从2号位置（y）开始匹配
REGEX.lastIndex = 2;

// 匹配成功
const match = REGEX.exec('xaya');

// 在3号位置匹配成功
match.index // 3

// 下一次匹配从4号位开始
REGEX.lastIndex // 4

// 4号位开始匹配失败
REGEX.exec('xaxa') // null

// =============================
const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;

tokenize(TOKEN_Y, '3 + 4')
// [ '3', '+', '4' ]
tokenize(TOKEN_G, '3 + 4')
// [ '3', '+', '4' ]

function tokenize(TOKEN_REGEX, str) {
  let result = [];
  let match;
  while (match = TOKEN_REGEX.exec(str)) {
    result.push(match[1]);
  }
  return result;
}
```

### 5.sticky属性--检测`y`修饰符

与`y`修饰符相匹配，ES6 的正则对象多了`sticky`属性，表示是否设置了`y`修饰符。

```javascript
var r = /hello\d/y;
r.sticky // true
```

### 6.flags属性--正则表达式的修饰符

ES6 为正则表达式新增了`flags`属性，会返回正则表达式的修饰符。

```javascript
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'
```

### 7.s 修饰符：dotAll模式

> ```javascript
> /foo.bar/s.test('foo\nbar') // true
>
> ```
>
> 这被称为`dotAll`模式，即点（dot）代表一切字符。所以，正则表达式还引入了一个`dotAll`属性，返回一个布尔值，表示该正则表达式是否处在`dotAll`模式。

正则表达式中，点（`.`）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用`u`修饰符解决；另一个是行终止符（line terminator character）。

所谓行终止符，就是该字符表示一行的终结。以下四个字符属于”行终止符“。

- U+000A 换行符（`\n`）
- U+000D 回车符（`\r`）
- U+2028 行分隔符（line separator）
- U+2029 段分隔符（paragraph separator）

```javascript
/foo.bar/.test('foo\nbar')
// false

/foo[^]bar/.test('foo\nbar')
// true

/foo.bar/s.test('foo\nbar') // true ES2018 引入s修饰符，使得.可以匹配任意单个字符。
```

> `/s`修饰符和多行修饰符`/m`不冲突，两者一起使用的情况下，`.`匹配所有字符，而`^`和`$`匹配每一行的行首和行尾。

### 8.后行断言

```javascript
/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
/(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]
const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
'$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar');
// '$bar %foo foo'
```

### 9.Unicode属性类

- ES2018 [引入](https://github.com/tc39/proposal-regexp-unicode-property-escapes)了一种新的类的写法`\p{...}`和`\P{...}`，允许正则表达式匹配符合 Unicode 某种属性的所有字符。

```javascript
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test('π') // true
```

- Unicode 属性类要指定属性名和属性值。

```javascript
\p{UnicodePropertyName=UnicodePropertyValue};
```

- 对于某些属性，可以只写属性名，或者只写属性值。

```javascript
\p{UnicodePropertyName};
\p{UnicodePropertyValue};
//\P{…}是\p{…}的反向匹配，即匹配不满足条件的字符。
```

由于 Unicode 的各种属性非常多，所以这种新的类的表达能力非常强。

```javascript
const regex = /^\p{Decimal_Number}+$/u;
regex.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼') // true
```

上面代码中，属性类指定匹配所有十进制字符，可以看到各种字型的十进制字符都会匹配成功。

`\p{Number}`甚至能匹配罗马数字。

```javascript
// 匹配所有数字
const regex = /^\p{Number}+$/u;
regex.test('²³¹¼½¾') // true
regex.test('㉛㉜㉝') // true
regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true 
```

下面是其他一些例子。

```javascript
// 匹配所有空格
\p{White_Space}

// 匹配各种文字的所有字母，等同于 Unicode 版的 \w
[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配 Emoji
/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

// 匹配所有的箭头字符
const regexArrows = /^\p{Block=Arrows}+$/u;
regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true
```

### 10.具名组匹配

- 正则表达式使用圆括号进行组匹配。

```javascript
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
```

上面代码中，正则表达式里面有三组圆括号。使用`exec`方法，就可以将这三组匹配结果提取出来。

```javascript
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
```

- ### 解构赋值和替换 ⇧

  有了具名组匹配以后，可以使用解构赋值直接从匹配结果上为变量赋值。

```javascript
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar
```

字符串替换时，使用`$<组名>`引用具名组。

```javascript
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'
```

`replace`方法的第二个参数也可以是函数，该函数的参数序列如下。

```javascript
'2015-01-02'.replace(re, (
   matched, // 整个匹配结果 2015-01-02
   capture1, // 第一个组匹配 2015
   capture2, // 第二个组匹配 01
   capture3, // 第三个组匹配 02
   position, // 匹配开始的位置 0
   S, // 原字符串 2015-01-02
   groups // 具名组构成的一个对象 {year, month, day}
 ) => {
 let {day, month, year} = args[args.length - 1];
 return `${day}/${month}/${year}`;
});
```

具名组匹配在原来的基础上，新增了最后一个函数参数：具名组构成的一个对象。函数内部可以直接对这个对象进行解构赋值。

### 引用

如果要在正则表达式内部引用某个“具名组匹配”，可以使用`\k<组名>`的写法。

```javascript
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```

数字引用（`\1`）依然有效。

```javascript
const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```

这两种引用语法还可以同时使用。

```javascript
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
RE_TWICE.test('abc!abc!abc') // true
RE_TWICE.test('abc!abc!ab') // false
```

### 11. String.prototype.matchAll--提案中

如果一个正则表达式在字符串里面有多个匹配，现在一般使用`g`修饰符或`y`修饰符，在循环里面逐一取出。

```javascript
var regex = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

var matches = [];
var match;
while (match = regex.exec(string)) {
  matches.push(match);
}

matches
// [
//   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
//   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
//   ["te
```

## 五、数值的扩展

### 1.二进制(前缀`0b`（或`0B`）)和八进制的(`0o`（或`0O`）)表示法

- ES6 提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。

从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀`0`表示，ES6 进一步明确，要使用前缀`0o`表示。

```javascript
0b111110111 === 503 // true
0o767 === 503 // true
```

- 如果要将`0b`和`0o`前缀的字符串数值转为十进制，要使用`Number`方法。

  ```javascript
  Number('0b111')  // 7
  Number('0o10')  // 8
  ```

### 2.Number.isFinite()--有限数,Number.isNaN()--NaN

ES6 在`Number`对象上，新提供了`Number.isFinite()`和`Number.isNaN()`两个方法。

- `Number.isFinite()`用来检查一个数值是否为有限的（finite），即不是`Infinity`。

  注意，如果参数类型不是数值，`Number.isFinite`一律返回`false`。

```javascript
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false
```

- `Number.isNaN()`用来检查一个值是否为`NaN`。

  ```javascript
  Number.isNaN(NaN) // true
  Number.isNaN(15) // false
  Number.isNaN('15') // false
  Number.isNaN(true) // false
  Number.isNaN(9/NaN) // true
  Number.isNaN('true' / 0) // true
  Number.isNaN('true' / 'true') // true
  ```

  注意，如果参数类型不是数值，`Number.isNaN`一律返回`false`。

### 3.Number.parseInt()--取整,Number.parseFloat()--小数保留

- ES6 将全局方法`parseInt()`和`parseFloat()`，移植到`Number`对象上面，行为完全保持不变。

```javascript
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseInt('13.84') // 13
Number.parseFloat('123.45#') // 123.45
Number.parseFloat('123.45123sad#123213') //123.45123
Number.parseFloat('123.4a5123sad#123213') //123.4
```

这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

```javascript
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true
```

###4.Number.isInteger()--判断是否为整数

- `Number.isInteger()`用来判断一个数值是否为整数。所有非Number类型都会返回false

```javascript
Number.isInteger(25) // true
Number.isInteger(25.1) // false
Number.isInteger('25') // false
```

- 注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，`Number.isInteger`可能会误判。

```javascript
Number.isInteger(3.0000000000000002) // true
```

总之，如果对数据精度的要求较高，不建议使用`Number.isInteger()`判断一个数值是否为整数。

###5.Number.EPSOLON

ES6 在`Number`对象上面，新增一个极小的常量`Number.EPSILON`。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。

对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的`1.00..001`，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。

> `Number.EPSILON`实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

```javascript
Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"
```

### 6.安全整数与 Number.isSafeInteger()

JavaScript 能够准确表示的整数范围在`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值。

```javascript
Math.pow(2, 53) // 9007199254740992

9007199254740992  // 9007199254740992
9007199254740993  // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1
// true
```

ES6 引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示`-2^53`到`2^53`之间这个范围的上下限。

```javascript
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true
```

### 7.Math对象的扩展

ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

> ### Math.trunc()
>
> `Math.trunc`方法用于去除一个数的小数部分，返回整数部分。
>
> - 对于非数值，`Math.trunc`内部使用`Number`方法将其先转为数值。
>
> - 对于空值和无法截取整数的值，返回`NaN`。
>
> - 对于没有部署这个方法的环境，可以用下面的代码模拟。
>
>   ```javascript
>   Math.trunc = Math.trunc || function(x) {
>     return x < 0 ? Math.ceil(x) : Math.floor(x);
>   };
>   ```

> ### Math.sign()
>
> `Math.sign`方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
>
> 它会返回五种值。
>
> - 参数为正数，返回`+1`；
> - 参数为负数，返回`-1`；
> - 参数为 0，返回`0`；
> - 参数为-0，返回`-0`;
> - 其他值，返回`NaN`。
> - 如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回`NaN`。
>
> ```javascript
> Math.sign(-5) // -1
> Math.sign(5) // +1
> Math.sign(0) // +0
> Math.sign(-0) // -0
> Math.sign(NaN) // NaN
> ```

> ### Math.cbrt()
>
> `Math.cbrt`方法用于计算一个数的立方根。
>
> - 对于非数值，`Math.cbrt`方法内部也是先使用`Number`方法将其转为数值。

> ### Math.clz32()
>
> JavaScript 的整数使用 32 位二进制形式表示，`Math.clz32`方法返回一个数的 32 位无符号整数形式有多少个前导 0。
>
> ```javascript
> Math.clz32(0) // 32
> Math.clz32(1) // 31
> Math.clz32(1000) // 22
> Math.clz32(0b01000000000000000000000000000000) // 1
> Math.clz32(0b00100000000000000000000000000000) // 2
> ```

> ### Math.imul() 
>
> `Math.imul`方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
>
> ```
> Math.imul(2, 4)   // 8
> Math.imul(-1, 8)  // -8
> Math.imul(-2, -2) // 4
> ```

> ### Math.fround()
>
> `Math.fround`方法返回一个数的32位单精度浮点数形式。
>
> ```javascript
> Math.fround(0)   // 0
> Math.fround(1)   // 1
> Math.fround(2 ** 24 - 1)   // 16777215
> // 如果参数的绝对值大于 224，返回的结果便开始丢失精度。
> Math.fround(2 ** 24)       // 16777216
> Math.fround(2 ** 24 + 1)   // 16777216
> ```

> ### Math.hypot()
>
> `Math.hypot`方法返回所有参数的平方和的平方根。
>
> - 如果参数不是数值，`Math.hypot`方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN。
>
> ```javascript
> Math.hypot(3, 4);        // 5  ===>  3的平方加上 4 的平方，等于 5 的平方。
> Math.hypot(3, 4, 5);     // 7.0710678118654755
> Math.hypot();            // 0
> Math.hypot(NaN);         // NaN
> Math.hypot(3, 4, 'foo'); // NaN
> Math.hypot(3, 4, '5');   // 7.0710678118654755
> Math.hypot(-3);          // 3
> ```

> ### 对数方法
>
> ES6 新增了 4 个对数相关方法。
>
> **（1） Math.expm1()**
>
> ​	`Math.expm1(x)`返回 ex - 1，即`Math.exp(x) - 1`。
>
> ```javascript
> Math.expm1(-1) // -0.6321205588285577
> Math.expm1(0)  // 0
> Math.expm1(1)  // 1.718281828459045
> ```
>
>  **（2）Math.log1p()**
>
> ​	`Math.log1p(x)`方法返回`1 + x`的自然对数，即`Math.log(1 + x)`。如果`x`小于-1，返回`NaN`。
>
> ```javascript
> Math.log1p(1)  // 0.6931471805599453
> Math.log1p(0)  // 0
> Math.log1p(-1) // -Infinity
> Math.log1p(-2) // NaN
> ```
>
>  **（3）Math.log10()**
>
> `Math.log10(x)`返回以 10 为底的`x`的对数。如果`x`小于 0，则返回 NaN。
>
> ```
> Math.log10(2)      // 0.3010299956639812
> Math.log10(1)      // 0
> Math.log10(0)      // -Infinity
> Math.log10(-2)     // NaN
> Math.log10(100000) // 5
> ```
>
>  **（4）Math.log2()**
>
> `Math.log2(x)`返回以 2 为底的`x`的对数。如果`x`小于 0，则返回 NaN。
>
> ```
> Math.log2(3)       // 1.584962500721156
> Math.log2(2)       // 1
> Math.log2(1)       // 0
> Math.log2(0)       // -Infinity
> Math.log2(-2)      // NaN
> Math.log2(1024)    // 10
> Math.log2(1 << 29) // 29 
> ```

> ### 双曲函数方法
>
> ES6 新增了 6 个双曲函数方法。
>
> - `Math.sinh(x)` 返回`x`的双曲正弦（hyperbolic sine）
> - `Math.cosh(x)` 返回`x`的双曲余弦（hyperbolic cosine）
> - `Math.tanh(x)` 返回`x`的双曲正切（hyperbolic tangent）
> - `Math.asinh(x)` 返回`x`的反双曲正弦（inverse hyperbolic sine）
> - `Math.acosh(x)` 返回`x`的反双曲余弦（inverse hyperbolic cosine）
> - `Math.atanh(x)` 返回`x`的反双曲正切（inverse hyperbolic tangent）

### 8.Math.signbit()

`Math.sign()`用来判断一个值的正负，但是如果参数是`-0`，它会返回`-0`。

```
Math.sign(-0) // -0
```

目前，有一个[提案](http://jfbastien.github.io/papers/Math.signbit.html)，引入了`Math.signbit()`方法判断一个数的符号位是否设置了。

```
Math.signbit(2) //false
Math.signbit(-2) //true
Math.signbit(0) //false
Math.signbit(-0) //true

```

可以看到，该方法正确返回了`-0`的符号位是设置了的。

该方法的算法如下。

- 如果参数是`NaN`，返回`false`
- 如果参数是`-0`，返回`true`
- 如果参数是负值，返回`true`
- 其他情况返回`false`

###9.指数运算符###

- ES2016 新增了一个指数运算符（`**`）。

```
2 ** 2 // 4
2 ** 3 // 8

```

- 运算符可以与等号结合，形成一个新的赋值运算符（`**=`）。

```
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;

```

注意，在 V8 引擎中，指数运算符与`Math.pow`的实现不相同，对于特别大的运算结果，两者会有细微的差异。

```
Math.pow(99, 99)
// 3.697296376497263e+197

99 ** 99
// 3.697296376497268e+197


```

上面代码中，两个运算结果的最后一位有效数字是有差异的。

###10.Integer数据类型--提案

JavaScript 所有数字都保存成 64 位浮点数，这决定了整数的精确程度只能到 53 个二进制位。大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。

> 现在有一个[提案](https://github.com/tc39/proposal-bigint)，引入了新的数据类型 Integer（整数），来解决这个问题。整数类型的数据只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
>
> 为了与 Number 类型区别，Integer 类型的数据必须使用后缀`n`表示。
>
> ```
> 1n + 2n // 3n
> ```

## 六、函数的扩展

### 1.函数参数的默认值

####(1)、基本使用

- ES5：在函数内部赋值

  ```javascript
  function log(x, y) {
    y = y || 'World';
    console.log(x, y);
  }

  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello World
  ```

- ES6：在括号内直接个参数赋值

  ```javascript
  function log(x, y = 'World') {
    console.log(x, y);
  }

  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello
  ```

  > - 参数设置默认值后，参数会默认被声明，所以不能再次声明。
  >
  >   ```javascript
  >   function foo(x = 5) {
  >     let x = 1; // error
  >     const x = 2; // error
  >   }
  >   ```
  >
  > - 参数设置默认值后，函数不能有同名参数。
  >
  >   ```javascript
  >   // 不报错
  >   function foo(x, x, y) {
  >     // ...
  >   }
  >
  >   // 报错
  >   function foo(x, x, y = 1) {
  >     // ...
  >   }
  >   // SyntaxError: Duplicate parameter name not allowed in this context
  >   ```
  >
  > - 参数默认值是惰性求值的，每次都会重新计算默认值表达式的值。
  >
  >   ```javascript
  >   let x = 99;
  >   function foo(p = x + 1) {
  >     console.log(p);
  >   }
  >
  >   foo() // 100
  >
  >   x = 100;
  >   foo() // 101
  >
  >   x = 1000;
  >   foo() // 1001
  >   ```

#### (2)、与解构赋值默认值结合使用

```javascript
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
```

```javascript
// 写法一
function m1({x = 0, y = 0} = {}) { // 设置了默认值
  return [x, y];
}  // [0,0]

// 写法二
function m2({x, y} = { x: 0, y: 0 }) { // 没有设置默认值
  return [x, y];
} // [0,0]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]
```

#### (3)、参数默认值的位置

- 非尾部参数不能为空

  ```javascript
  // 例二
  function f(x, y = 5, z) {
    return [x, y, z];
  }

  f() // [undefined, 5, undefined]
  f(1) // [1, 5, undefined]
  f(1, ,2) // 报错
  f(1, undefined, 2) // [1, 5, 2]
  ```

#### (4)、函数的length属性--本身以及之后的都会失真

- 设置参数默认值后，该参数的length属性失真；而且后面的参数length属性也会失真。

  ```javascript
  (function (a,b){}).length;  // 2
  // 设置默认值的参数本身length属性失真
  (function a(a,b = 1){}).length;  // 1
  // 设置默认值的参数本身length属性失真，在它之后的参数的length属性也失真了
  (function a(a = 1,b){}).length;  // 0
  ```

####(5)、作用域

- 函数参数没有被赋值默认值时，参数的值跟函数外部（全局）没有关系
- 但是当全局变量被当作值赋值给函数的参数时（成为等号右边的值），取得的值就是全局定义的值。‘
- 另外一种情况，如果全集变量被函数参数作默认值赋值了，但是实际用该函数的时候参数重新赋值了，会使用新的值。

```javascript
var x = 1;
// 因为函数参数会默认被声明
// 所以实际上函数参数的 x 与全局定义的 x 没有关系
function f(x, y = x) {
  console.log(y);
}
f(2) // 2
//=======================================================
// 但是当全局的 x 作为等号 = 右边的值时，会成为默认值而被赋值
var x = 11;
function f(y = x) {
  console.log(y);
}
f() // 11
//=======================================================
// 参数被重新赋值
var x = 111;
function f(y = x) {
  console.log(y);
}
f(222) // 222
//=======================================================
// 也是重新赋值
var x1 = 111;
function f(y = x1) {
  console.log(y);
}
var x2 = 222;
f(x2) 
```

- 如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。

```javascript
let foo = 'outer';
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar(); // outer
//============================================
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar() // ReferenceError: foo is not defined
```

```javascript
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
```

> 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
>
> ```javascript
> function throwIfMissing() {
>   throw new Error('Missing parameter');
> }
>
> function foo(mustBeProvided = throwIfMissing()) {
>   return mustBeProvided;
> }
>
> foo()
> // Error: Missing parameter
> ```

> 另外，**可以将参数默认值设为`undefined`，表明这个参数是可以省略的**。
>
> ```javascript
> function foo(optional = undefined) { ··· }
> ```

### 2.rest参数--`...变量名`

- `ES6 `引入 **rest 参数（形式为`...变量名`）**，用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {  // val、values只是一个变量名，并不一定是这两个
    sum += val;  // 只要上面定义了 key 的变量名，这里就要用该变量名
  }

  return sum;
}

add(2, 5, 3) // 10
```

```javascript
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

- 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

```javascript
// 报错
function f(a, ...b, c) {
  // ...
}
```

- 函数的`length`属性，不包括 rest 参数。

```javascript
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```

```javascript
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
  console.log(items);
}

var a = [];
push(a, 1, 2, 3)
// 1
// 2
// 3
// [1, 2, 3]
// 等同于
function push(array, ...items) {
  let a = items =  [1,2,3];
  items.forEach(function(item) {
    console.log(item);
  });
  console.log(items);
}

var a = [];
push(a)
```

### 3.严格模式--严格模式下不能使用未声明的变量

-  ES5 开始，函数内部可以设定为严格模式。

```javascript
function doSomething(a, b) {
  'use strict';
  // code
}
```

- ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

```javascript
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

- > 两种方法可以规避这种限制。第一种是**设定全局性的严格模式**，这是合法的。
  >
  > ```javascript
  > 'use strict';
  >
  > function doSomething(a, b = a) {
  >   // code
  > }
  > ```
  >
  > 第二种是把函数包在一个**无参数的立即执行函数**里面。
  >
  > ```javascript
  > const doSomething = (function () {
  >   'use strict';
  >   return function(value = 42) {
  >     return value;
  >   };
  > }());
  > ```

### 4.name属性

- 函数的`name`属性，返回该函数的函数名。

```javascript
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"
```

- 如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的`name`属性都返回这个具名函数原本的名字。

```javascript
const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"
```

> `Function`构造函数返回的函数实例，`name`属性的值为`anonymous`。
>
> ```
> (new Function).name // "anonymous"
>
> ```
>
> `bind`返回的函数，`name`属性值会加上`bound`前缀。
>
> ```javascript
> function foo() {};
> foo.bind({}).name // "bound foo"
>
> (function(){}).bind({}).name // "bound "
> ```

### 5.箭头函数！！！

####基本用法

- ES6 允许使用“箭头”（`=>`）定义函数。

```javascript
var f = v => a;
//上面的箭头函数等同于：
var f = function(v) {
  return a;
};
```

- 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

```javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

- 箭头函数返回一个对象

  ```javascript
  // 报错
  let getTempItem = id => { id: id, name: "Temp" };

  // 不报错
  let getTempItem = id => ({ id: id, name: "Temp" });
  ```

> 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
>
> ```javascript
> let fn = () => void doesNotReturn();
> ```
>
> 箭头函数可以与变量解构结合使用。
>
> ```javascript
> const full = ({ first, last }) => first + ' ' + last;
>
> // 等同于
> function full(person) {
>   return person.first + ' ' + person.last;
> }
> ```
>
> 箭头函数使得表达更加简洁。
>
> ```javascript
> const isEven = n => n % 2 == 0;
> isEven(3); // false
> isEven(2); // true
> const square = n => n * n;
> square(2); // 4
> ```

```javascript
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);
```

```javascript
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```

> ### 使用注意点--箭头函数的`this`总是指向函数定义生效时所在的对象
>
> 箭头函数有几个使用注意点。
>
> （1）**函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。**
>
> （2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
>
> （3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
>
> （4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。
>
> 上面**四点中，第一点尤其值得注意。`this`对象的指向是可变的，但是在箭头函数中，它是固定的**。
>
> - ```javascript
>   function foo() {
>     setTimeout(() => {
>       console.log('id:', this.id);
>     }, 100);
>     setTimeout(function (){
>       console.log('id:', this.id);
>     }, 100);
>   } 
>   var id = 21;
>   foo.call({ id: 42 }); // window.foo.call({ id: 42 });默认被window调用，所以在ES5中this指向全局，输出的就是21.
>   // id: 42
>   // id: 21
>   /*上面代码中，setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到 100 毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42。*/
>
>   let id = 3;
>   const a = function () {
>       console.log('a:'+this.id);
>       console.log('b:'+id);
>   }
>   a(); 
>   // a:undefined -->因为this.出来的是一个属性，跟全局变量id没有关系
>   // b:3 -->这时候才是用的全局
>
>   'use strict'
>   function Timer() {
>     this.s1 = 0;
>     this.s2 = 0;
>     // 箭头函数
>     setInterval(() => this.s1++, 1000);
>     // 普通函数
>     setInterval(function () {
>       this.s2++;
>     }, 1000);
>   }
>
>   var timer = new Timer();
>
>   setTimeout(() => console.log('s1: ', timer.s1), 3100);
>   setTimeout(() => console.log('s2: ', timer.s2), 3100);
>   // s1: 3
>   // s2: 0
>   /*上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。*/
>   ```

> 箭头函数可以让`this`指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM 事件的回调函数封装在一个对象里面。
>
> ```javascript
> var handler = {
>   
>   id: '123456',
>
>   init: function() {
>     document.addEventListener('click',
>       event => this.doSomething(event.type), false);
>   },
>
>   doSomething: function(type) {
>     console.log('Handling ' + type  + ' for ' + this.id);
>   }
> };
> ```

#### 箭头函数没有自己的`this` --（还不熟悉,箭头函数尽量不用this）

##### `ES5的this可能是收养的，谁管饭谁就是妈；ES6的this是滴血认亲了的，只能有一个妈`。

- 内部的`this`就是外层代码块的`this`。正是因为它没有`this`，所以也就不能用作构造函数。
- 尽量不用。

#### 嵌套函数的箭头函数

```javascript
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});
insert(2).into([1, 3]).after(1); //[1, 2, 3]

// ====================================
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
// 12

const plus1 = a => a + 1;
const mult2 = a => a * 2;
mult2(plus1(5))
// 12
```

```javascript
// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));
```

### 6.双冒号运算符

> 箭头函数可以绑定`this`对象，大大减少了显式绑定`this`对象的写法（`call`、`apply`、`bind`）。但是，箭头函数并不适用于所有场合，所以现在有一个[提案](https://github.com/zenparsing/es-function-bind)，提出了“函数绑定”（function bind）运算符，用来取代`call`、`apply`、`bind`调用。

- 函数绑定运算符是并排的两个冒号（`::`），**双冒号左边是一个对象，右边是一个函数**。该运算符会自动**将左边的对象，作为上下文环境（即`this`对象），绑定到右边的函数上面**。

```javascript
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}
```

- 如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。

```javascript
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

let log = ::console.log;
// 等同于
var log = console.log.bind(console);
```

> 双冒号运算符的运算结果，还是一个函数，因此可以采用链式写法。
>
> ```javascript
> // 例一
> import { map, takeWhile, forEach } from "iterlib";
>
> getPlayers()
> ::map(x => x.character())
> ::takeWhile(x => x.strength > 100)
> ::forEach(x => console.log(x));
>
> // 例二
> let { find, html } = jake;
>
> document.querySelectorAll("div.myClass")
> ::find("p")
> ::html("hahaha");
> ```

### 7.尾调用优化

####定义

- 就是指某个函数的最后一步是调用另一个函数。

```javascript
function f(x){
  return g(x); // 有return，表明是最后一步动作
}
//函数f的最后一步是调用函数g，这就叫尾调用。

function f(x){
  g(x); // 没有return，表明不是最后一步动作
}
//函数f的最后一步 不 是调用函数g，所以不是尾调用。
```

> ​	如果在函数`A`的内部调用函数`B`，那么在`A`的调用帧上方，还会形成一个`B`的调用帧。等到`B`运行结束，将结果返回到`A`，`B`的调用帧才会消失。如果函数`B`内部还调用函数`C`，那就还有一个`C`的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

- 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

  ```javascript
  function f() {
    let m = 1;
    let n = 2;
    return g(m + n);
  }
  f();

  // 等同于
  function f() {
    return g(3);
  }
  f();

  // 等同于
  g(3);
  ```

####尾调用优化

- “尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

> 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。
>
> ```javascript
> function addOne(a){
>   var one = 1;
>   function inner(b){
>     return b + one;
>   }
>   return inner(a);
> }//不能使用尾部调用优化
> ```

#### 尾递归

- 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

```javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);  // 递归
}
factorial(5) // 120

function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total); // 尾递归
}
factorial(5, 1) // 120
```

- 函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式

```javascript
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120
```

```javascript
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

**递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。对于其他支持“尾调用优化”的语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。**

- ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

> `func.arguments`：返回调用时函数的参数。

> `func.caller`：返回调用当前函数的那个函数。

尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

```javascript
function restricted() {
  'use strict';
  restricted.caller;    // 报错
  restricted.arguments; // 报错
}
restricted();
```

#### 尾递归优化的实现

尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？回答是可以的，就是自己实现尾递归优化。

它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

下面是一个正常的递归函数。

```javascript
function sum(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
}

sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)
```

上面代码中，`sum`是一个递归函数，参数`x`是需要累加的值，参数`y`控制递归次数。一旦指定`sum`递归 100000 次，就会报错，提示超出调用栈的最大次数。

蹦床函数（trampoline）可以将递归执行转为循环执行。

```javascript
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
```

上面就是蹦床函数的一个实现，它接受一个函数`f`作为参数。只要`f`执行后返回一个函数，就继续执行。注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。

然后，要做的就是将原来的递归函数，改写为每一步返回另一个函数。

```javascript
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
```

上面代码中，`sum`函数的每次执行，都会返回自身的另一个版本。

现在，使用蹦床函数执行`sum`，就不会发生调用栈溢出。

```javascript
trampoline(sum(1, 100000))
// 100001
```

蹦床函数并不是真正的尾递归优化，下面的实现才是。

```javascript
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
/    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
```

###8.函数参数的尾逗号

- ES2017 [允许](https://github.com/jeffmo/es-trailing-function-commas)函数的最后一个参数有尾逗号（trailing comma）。

> 此前，函数定义和调用时，都不允许最后一个参数后面出现逗号，否则会报错。

```javascript
function clownsEverywhere(
  param1,
  param2, // ES5会报错
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar', // ES6不会报错
);
```

##七、数组的扩展

###1.扩展运算符（...[1,2,3]）

- 扩展运算符（spread）是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

> 该运算符主要用于函数调用。

```javascript
function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
```

> 扩展运算符与正常的函数参数可以结合使用，非常灵活。

```javascript
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

> 扩展运算符后面还可以放置表达式。

```javascript
const arr = [...(x > 0 ? ['a'] : []),'b',];
//如果扩展运算符后面是一个空数组，则不产生任何效果。
[...[], 1]
// [1]
```

- 替代函数的 apply 方法

由于扩展运算符可以展开数组，所以不再需要`apply`方法，将数组转为函数的参数了。

```javascript
// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);
```

```javascript
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);
```

```javascript
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);
```

```javascript
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);
```

- 扩展运算符的应用

  - 复制数组

    > 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。

    ```javascript
    const a1 = [1, 2];
    const a2 = a1;
    a2[0] = 2;
    a1 // [2, 2]
    ```

    ES5 只能用变通方法来复制数组。

    ```javascript
    const a1 = [1, 2];
    const a2 = a1.concat();

    a2[0] = 2;
    a1 // [1, 2]
    ```

    - 扩展运算符提供了`复制数组的简便写法` `[...要复制的数组]`。

      ```javascript
      const a1 = [1, 2];
      // 写法一
      const a2 = [...a1];
      // 写法二
      const [...a2] = a1;
      ```

    - 扩展运算符提供了数组合并的新写法`[...数组1,...数组2,...数组3,]`。

      ```javascript
      // ES5
      [1, 2].concat(more)
      // ES6
      [1, 2, ...more]

      var arr1 = ['a', 'b'];
      var arr2 = ['c'];
      var arr3 = ['d', 'e'];

      // ES5的合并数组
      arr1.concat(arr2, arr3);
      // [ 'a', 'b', 'c', 'd', 'e' ]

      // ES6的合并数组
      [...arr1, ...arr2, ...arr3]
      // [ 'a', 'b', 'c', 'd', 'e' ]
      ```

    - 扩展运算符可以**与解构赋值结合起来，用于生成数组**。

      ```javascript
      // ES5
      a = list[0], rest = list.slice(1)
      // ES6
      [a, ...rest] = list

      const [first, ...rest] = [1, 2, 3, 4, 5];
      first // 1
      rest  // [2, 3, 4, 5]

      const [first, ...rest] = [];
      first // undefined
      rest  // []

      const [first, ...rest] = ["foo"];
      first  // "foo"
      rest   // []
      ```

      如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

      ```javascript
      const [...butLast, last] = [1, 2, 3, 4, 5];
      // 报错

      const [first, ...middle, last] = [1, 2, 3, 4, 5];
      // 报错
      ```

    - 扩展运算符还**可以将字符串转为真正的数组**。

      ```javascript
      [...'hello']
      // [ "h", "e", "l", "l", "o" ]
      ```

      **可以正确返回字符串的长度**

      ```javascript
      function length(str) {
        return [...str].length;
      }

      length('x\uD83D\uDE80y') // 3
      ```

    - 类数组对象转换为正真的数组

      ```javascript
      let nodeList = document.querySelectorAll('div'); // 类数组对象
      let array = [...nodeList]; // 真正的数组
      ```

    - **Map 和 Set 结构，Generator 函数**扩展为正真的数组

      ```javascript
      let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
      ]);
      let arr = [...map.keys()]; // [1, 2, 3]

      const go = function*(){
        yield 1;
        yield 2;
        yield 3;
      };
      [...go()] // [1, 2, 3]
      ```

  ####`function*` 函数声明

  语法：**function* name([param[, param[, ... param]]]) { statements }**

- `function*` 这种声明方式(`function`关键字后跟一个星号）会定义一个**生成器函数 (***generator function***)**，它返回一个  [`Generator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)  对象。

  - `name`

    函数名


  - `param`

    要传递给函数的一个参数的名称，一个函数最多可以有255个参数。


  - `statements`

    普通JS语句。

    > **生成器函数**在执行时能暂停，后面又能从暂停处继续执行。
    >
    > 调用一个**生成器函数**并不会马上执行它里面的语句，而是返回一个这个生成器的 **迭代器****（iterator ）对象**。当这个迭代器的 `next() `方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现[`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)的位置为止，[`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield) 后紧跟迭代器要返回的值。或者如果用的是 [`yield*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*)（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。
    >
    > next()方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 `yield `表达式的返回值，done 属性为布尔类型，表示生成器后续是否还有` yield `语句，即生成器函数是否已经执行完毕并返回。
    >
    > //    > 调用 `next()`方法时，如果传入了参数，那么这个参数会作为**上一条执行的  yield 语句的返回值**
    >
    >  
    >
    > ```javascript
    >  function *gen(){    yield 10;    y=yield 'foo';    yield y;}var gen_obj=gen();console.log(gen_obj.next());// 执行 yield 10，返回 10console.log(gen_obj.next());// 执行 yield 'foo'，返回 'foo'console.log(gen_obj.next(10));// 将 10 赋给上一条 yield 'foo' 的左值，即执行 y=10，返回 10console.log(gen_obj.next());// 执行完毕，value 为 undefined，done 为 true
    > ```
    >
    > 当在生成器函数中显式 `return `时，会导致生成器立即变为完成状态，即调用 `next()` 方法返回的对象的 `done `为 `true`。如果 `return `后面跟了一个值，那么这个值会作为**当前**调用 `next()` 方法返回的 value 值。
    >
    > ```javascript
    > function *createIterator() {
    >     let first = yield 1;
    >     let second = yield first + 2; // 4 + 2 
    >                                   // first =4 是next(4)将参数赋给上一条的
    >     yield second + 3;             // 5 + 3
    > }
    >
    > let iterator = createIterator();
    >
    > console.log(iterator.next());    // "{ value: 1, done: false }"
    > console.log(iterator.next(4));   // "{ value: 6, done: false }"
    > console.log(iterator.next(5));   // "{ value: 8, done: false }"
    > console.log(iterator.next());    // "{ value: undefined, done: true }"
    > ```

    **生成器函数不能当构造器使用**

    ```javascript
    function* f() {}
    var obj = new f; // throws "TypeError: f is not a constructor"
    ```



###**2**.Array.from()--将类数组对象和可遍历对象转为数组

- `Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

```javascript
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

```javascript
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```

> 对于还没有部署该方法的浏览器，可以用`Array.prototype.slice`方法替代。
>
> ```javascript
> const toArray = (() =>
>   Array.from ? Array.from : obj => [].slice.call(obj)
> )();
> ```

- `Array.from`还可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

  ```javascript
  Array.from(arrayLike, x => x * x);
  // 等同于
  Array.from(arrayLike).map(x => x * x);

  Array.from([1, 2, 3], (x) => x * x)
  // [1, 4, 9]
  ```

```javascript
let spans = document.querySelectorAll('span.name');
// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
// 对一个参数进行处理
let names2 = Array.from(spans, s => s.textContent)

// 布尔类型转换
Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]

// 利用lenth属性，指定第二个参数的运行次数
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
```

### 3.Array.of()--将值转为数组

- `Array.of`方法用于将一组值，转换为数组。

  ```javascript
  Array.of(3, 11, 8) // [3,11,8]
  Array.of({a:3,b: 11,c: 8}) // [{a:3,b: 11,c: 8}]
  Array.of({a:3},{b: 11},{c: 8}) // [{a:3},{b: 11},{c: 8}]
  Array.of(3) // [3]
  Array.of(3).length // 1
  ```

> 这个方法的主要目的，是弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。
>
> ```javascript
> Array() // []
> Array(3) // [, , ,]
> Array(3, 11, 8) // [3, 11, 8]
> ```

`Array.of`基本上可以用来替代`Array()`或`new Array()`，并且不存在由于参数不同而导致的重载。它的行为非常统一。

```javascript
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

- `Array.of`总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

### 4.数组实例的 copyWithin()

数组实例的`copyWithin`方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组(新)。

```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

它接受三个参数。

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

这三个参数都应该是数值，如果不是，会自动转为数值。

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3) // 从下标 3 开始复制，只复制了 4和5 ，然后从下标 0 开始覆盖，覆盖了 1和2 ，所以新数组是：[4,5,3,4,5]
// [4, 5, 3, 4, 5]

[1, 2, 'a', 'cc', 'bd'].copyWithin(0, 2)
// ["a", "cc", "bd", "cc", "bd"]
```

```javascript
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

### 5.数组实例的 find() --`值`和 findIndex()--`位置`

- 数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。

```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
```

```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) 
// 10
//上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
```

- 数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。

  ```javascript
  [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
  }) // 2
  ```

- 这两个方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

  ```javascript
  function f(v){
    return v > this.age;
  }
  let person = {name: 'John', age: 20};
  [10, 12, 26, 15].find(f, person);    // 26
  [10, 12, 26, 15].findIndex(f, person);    // 2
  ```

```javascript
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```

###6.数组实例的 fill()

- `fill`方法使用给定值，填充一个数组。

  ```javascript
  ['a', 'b', 'c'].fill(7)
  // [7, 7, 7]

  new Array(3).fill(7)
  // [7, 7, 7]
  ```

- `fill`方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置(之前)。

  ```javascript
  ['a', 'b', 'c'].fill(7, 1, 2)
  // ['a', 7, 'c']

  let arr = new Array(3).fill({name: "Mike"});
  arr[0].name = "Ben";
  arr
  // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

  let arr = new Array(3).fill([]);
  arr[0].push(5);
  arr
  // [[5], [5], [5]]
  ```

###7.数组实例的 entries() , keys() 和 values()

- ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象，可以用`for...of`循环进行遍历，唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

  ```javascript
  for (let index of ['a', 'b'].keys()) {
    console.log(index);
  }
  // 0
  // 1

  for (let elem of ['a', 'b'].values()) {
    console.log(elem);
  }
  // 'a'
  // 'b'

  for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
  }
  // 0 "a"
  // 1 "b"
  ```

> 如果不使用`for...of`循环，可以手动调用遍历器对象的`next`方法，进行遍历。
>
> ```javascript
> let letter = ['a', 'b', 'c'];
> let entries = letter.entries();
> console.log(entries.next().value); // [0, 'a']
> console.log(entries.next().value); // [1, 'b']
> console.log(entries.next().value); // [2, 'c']
> ```

### 8.数组实例的 includes()--`判断值是否存在`

- `Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。

```javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

- 该方法的第二个参数表示搜索的起始位置，默认为`0`。如果第二个参数为负数，则表示倒数的位置，（比如第二个参数为`-4`，但数组长度为`3`，则会重置为从`0`开始）。

```javascript
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true

'vjhvgyhbkjno'.includes('gyh', -20); // true
'vjhvgyhbkjno'.includes('gyh', 10); // false
'vjhvgyhbkjno'.includes('gyh', 4); // true
```

- 另外，Map 和 Set 数据结构有一个`has`方法，需要注意与`includes`区分。
  - Map 结构的`has`方法，是用来查找键名的，比如`Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`。
  - Set 结构的`has`方法，是用来查找值的，比如`Set.prototype.has(value)`、`WeakSet.prototype.has(value)`。

###9.数组的空位

- 数组的空位，指数组的某一个位置没有任何值。比如，`Array`构造函数返回的数组都是空位。

```javascript
Array(3) // [, , ,]
```

> 注意，空位不是`undefined`，一个位置的值等于`undefined`，依然是有值的。空位是没有任何值，`in`运算符可以说明这一点。
>
> ```javascript
> 0 in [undefined, undefined, undefined] // true
> 0 in [, , ,] // false
> ```

> ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
>
> - `forEach()`, `filter()`, `reduce()`, `every()` 和`some()`都会跳过空位。
> - `map()`会跳过空位，但会保留这个值
> - `join()`和`toString()`会将空位视为`undefined`，而`undefined`和`null`会被处理成空字符串。
>
> ```javascript
> // forEach方法
> [,'a'].forEach((x,i) => console.log(i)); // 1
>
> // filter方法
> ['a',,'b'].filter(x => true) // ['a','b']
>
> // every方法
> [,'a'].every(x => x==='a') // true
>
> // reduce方法
> [1,,2].reduce((x,y) => return x+y) // 3
>
> // some方法
> [,'a'].some(x => x !== 'a') // false
>
> // map方法
> [,'a'].map(x => 1) // [,1]
>
> // join方法
> [,'a',undefined,null].join('#') // "#a##"
>
> // toString方法
> [,'a',undefined,null].toString() // ",a,,"
> ```

**ES6 则是明确将空位转为`undefined`。**

```javascript
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]
```

> `copyWithin()`会连空位一起拷贝。
>
> ```javascript
> [,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
> ```
>
> `fill()`会将空位视为正常的数组位置。
>
> ```javascript
> new Array(3).fill('a') // ["a","a","a"]
> ```
>
> `for...of`循环也会遍历空位。
>
> ```javascript
> let arr = [, ,];
> for (let i of arr) {
>   console.log(1);
> }
> // 1
> // 1
> ```

`entries()`、`keys()`、`values()`、`find()`和`findIndex()`会将空位处理成`undefined`。

```javascript
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```

**由于空位的处理规则非常不统一，所以建议避免出现空位。**

## 八、对象的扩展

### 1.属性的简洁表示法

- ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

  ```javascript
  const foo = 'bar';
  const baz = {foo};
  baz // {foo: "bar"}
  // 等同于
  const baz = {foo: foo};

  const foo = [{a:'bar'},{b:1},{c:''}];
  const baz = {foo};
  baz 
  // [{a: "bar"}, {b: 1}, {c: ""}]
  ```

> ```javascript
> function f(x, y) {
>   return {x, y};
> }
>
> // 等同于
>
> function f(x, y) {
>   return {x: x, y: y};
> }
>
> f(1, 2) // Object {x: 1, y: 2}
> ```
>
> 除了属性简写，方法也可以简写。
>
> ```javascript
> const o = {
>   method() {
>     return "Hello!";
>   }
> };
> // 等同于
> const o = {
>   method: function() {
>     return "Hello!";
>   }
> };
>
>  o.method() // "Hello!"
> ```

```javascript
let birth = '2000/01/01';

const Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};
Person.hello() // 我的名字是 张三
```

### 2.属性名表达式

```javascript
// 方法一 ES5
obj.foo = true;

// 方法二 ES6
obj['a' + 'bc'] = 123;
// ES6
let propKey = 'foo';
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
```

```javascript
let lastWord = 'last word';

const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```

> 表达式还可以用于定义方法名。
>
> ```javascript
> let obj = {
>   ['h' + 'ello']() {
>     return 'hi';
>   }
> };
>
> obj.hello() // hi
> ```
>
> 注意，**属性名表达式与简洁表示法，不能同时使用**，会报错。
>
> ```javascript
> // 报错
> const foo = 'bar';
> const bar = 'abc';
> const baz = { [foo] };
>
> // 正确
> const foo = 'bar';
> const baz = { [foo]: 'abc'};
> ```

### 3.方法的name属性

- 函数的`name`属性，返回函数名。对象方法也是函数，因此也有`name`属性。

```javascript
const person = {
  sayName() {
    console.log('hello!');
  },
};

person.sayName.name   // "sayName"
```

- ```javascript
  /* 其实每个对象的属性都有默认的get和set方法：
  如： var obj = { a:1}
   obj.a = 10; // 相当于set方法 
   obj.a ; // 10 相当于get方法
  */
  const obj = {
    get foo() {},
    set foo(x) {}
  };

  obj.foo.name
  // TypeError: Cannot read property 'name' of undefined

  const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

  descriptor.get.name // "get foo"
  descriptor.set.name // "set foo"
  ```

> 有两种特殊情况：`bind`方法创造的函数，`name`属性返回`bound`加上原函数的名字；`Function`构造函数创造的函数，`name`属性返回`anonymous`。
>
> ```javascript
> (new Function()).name // "anonymous"
>
> var doSomething = function() {
>   // ...
> };
> doSomething.bind().name // "bound doSomething"
> ```
>
> 如果对象的方法是一个 Symbol 值，那么`name`属性返回的是这个 Symbol 值的描述。
>
> ```javascript
> const key1 = Symbol('description');
> const key2 = Symbol();
> let obj = {
>   [key1]() {},
>   [key2]() {},
> };
> obj[key1].name // "[description]"
> obj[key2].name // ""
> ```

> ```javascript
> var o, d;
>
> o = { 
>   get foo() { 
>     return 17; 
>   } 
> };
> o.foo; // 17
> d = Object.getOwnPropertyDescriptor(o, 'foo');
> // d is {
> //   configurable: true,
> //   enumerable: true,
> //   get: /*the getter function*/,
> //   set: undefined
> // }
> ```

### 4.Object.is()

> ES5 比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。它们都有缺点，前者会自动转换数据类型，后者的`NaN`不等于自身，以及`+0`等于`-0`。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

- ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。`Object.is`就是部署这个算法的新方法。它用来比较两个值是否严格相等，与**严格比较运算符（===）的行为基本一致**。

```javascript
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

```
Object.defineProperty(obj, prop, descriptor)
```

参数

- `obj`

  要在其上定义属性的对象。

- `prop`

  要定义或修改的属性的名称。

- `descriptor`

  将被定义或修改的属性描述符。

返回值

​    被传递给函数的对象。

### 5.Object.assign(target,obj1,obj2)--对象合并/添加/替换的得到target

- `Object.assign`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

  ```javascript
  const target = { a: 1 };

  const source1 = { b: 2 };
  const source2 = { c: 3 };

  Object.assign(target, source1, source2);
  target // {a:1, b:2, c:3}
  ```

  -  `Object.assign`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

    ```javascript
    const obj1 = {a: {b: 1}};
    const obj2 = Object.assign({}, obj1);

    obj1.a.b = 2;
    obj2.a.b // 2
    ```

  -  对于这种嵌套的对象，一旦遇到**同名属性，`Object.assign`的处理方法是替换**，而不是添加。

    ```javascript
    const target = { a: { b: 'c', d: 'e' } }
    const source = { a: { b: 'hello' } }
    Object.assign(target, source)
    // { a: { b: 'hello' } }
    ```

  -  `Object.assign`可以用来处理数组，但是会把数组视为对象。

    ```javascript
    Object.assign([1, 2, 3], [4, 5])
    // [4, 5, 3]
    ```

  -  `Object.assign`只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

    ```javascript
    const source = {
      get foo() { return 1 }
    };
    const target = {};

    Object.assign(target, source)
    // { foo: 1 }
    ```


  - `Object.assign`方法的第一个参数是目标对象，后面的参数都是源对象。

注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

```javascript
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

```

如果只有一个参数，`Object.assign`会直接返回该参数。

```
const obj = {a: 1};
Object.assign(obj) === obj // true

```

如果该参数不是对象，则会先转成对象，然后返回。

```
typeof Object.assign(2) // "object"

```

由于`undefined`和`null`无法转成对象，所以如果它们作为参数，就会报错。

```
Object.assign(undefined) // 报错
Object.assign(null) // 报错

```

如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果`undefined`和`null`不在首参数，就不会报错。

```
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true

```

其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。

```
const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }

```

上面代码中，`v1`、`v2`、`v3`分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。

```
Object(true) // {[[PrimitiveValue]]: true}
Object(10)  //  {[[PrimitiveValue]]: 10}
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}

```

上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性`[[PrimitiveValue]]`上面，这个属性是不会被`Object.assign`拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。

`Object.assign`拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（`enumerable: false`）。

```
Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }

```

上面代码中，`Object.assign`要拷贝的对象只有一个不可枚举属性`invisible`，这个属性并没有被拷贝进去。

属性名为 Symbol 值的属性，也会被`Object.assign`拷贝。

```
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }
```

- 应用场景

  - **（1）为对象添加属性**

    ```
    class Point {
      constructor(x, y) {
        Object.assign(this, {x, y});
      }
    }

    ```

    上面方法通过`Object.assign`方法，将`x`属性和`y`属性添加到`Point`类的对象实例。

    **（2）为对象添加方法**

    ```
    Object.assign(SomeClass.prototype, {
      someMethod(arg1, arg2) {
        ···
      },
      anotherMethod() {
        ···
      }
    });

    // 等同于下面的写法
    SomeClass.prototype.someMethod = function (arg1, arg2) {
      ···
    };
    SomeClass.prototype.anotherMethod = function () {
      ···
    };

    ```

    上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用`assign`方法添加到`SomeClass.prototype`之中。

    **（3）克隆对象**

    ```
    function clone(origin) {
      return Object.assign({}, origin);
    }

    ```

    上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。

    不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。

    ```
    function clone(origin) {
      let originProto = Object.getPrototypeOf(origin);
      return Object.assign(Object.create(originProto), origin);
    }

    ```

    **（4）合并多个对象**

    将多个对象合并到某个对象。

    ```
    const merge =
      (target, ...sources) => Object.assign(target, ...sources);

    ```

    如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

    ```
    const merge =
      (...sources) => Object.assign({}, ...sources);

    ```

    **（5）为属性指定默认值**

    ```
    const DEFAULTS = {
      logLevel: 0,
      outputFormat: 'html'
    };

    function processContent(options) {
      options = Object.assign({}, DEFAULTS, options);
      console.log(options);
      // ...
    }

    ```

    上面代码中，`DEFAULTS`对象是默认值，`options`对象是用户提供的参数。`Object.assign`方法将`DEFAULTS`和`options`合并成一个新对象，如果两者有同名属性，则`option`的属性值会覆盖`DEFAULTS`的属性值。

    注意，由于存在浅拷贝的问题，`DEFAULTS`对象和`options`对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，`DEFAULTS`对象的该属性很可能不起作用。

    ```
    const DEFAULTS = {
      url: {
        host: 'example.com',
        port: 7070
      },
    };

    processContent({ url: {port: 8000} })
    // {
    //   url: {port: 8000}
    // }

    ```

    上面代码的原意是将`url.port`改成 8000，`url.host`不变。实际结果却是`options.url`覆盖掉`DEFAULTS.url`，所以`url.host`就不存在了。

### 6.属性的可枚举性和遍历

- 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。

  ```javascript
  let obj = { foo: 123 };
  Object.getOwnPropertyDescriptor(obj, 'foo')
  //  {
  //    value: 123,
  //    writable: true,
  //    enumerable: true,
  //    configurable: true
  //  }
  ```

> 目前，有四个操作会忽略`enumerable`为`false`的属性。
>
> - `for...in`循环：只遍历对象自身的和继承的可枚举的属性。
> - `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
> - `JSON.stringify()`：只串行化对象自身的可枚举的属性。
> - `Object.assign()`： 忽略`enumerable`为`false`的属性，只拷贝对象自身的可枚举的属性。

- 属性的遍历

  **（1）for...in**

  `for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

  **（2）Object.keys(obj)**

  `Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

  **（3）Object.getOwnPropertyNames(obj)**

  `Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

  **（4）Object.getOwnPropertySymbols(obj)**

  `Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 Symbol 属性的键名。

  **（5）Reflect.ownKeys(obj)**

  `Reflect.ownKeys`返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

  以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

  - 首先遍历所有数值键，按照数值升序排列。
  - 其次遍历所有字符串键，按照加入时间升序排列。
  - 最后遍历所有 Symbol 键，按照加入时间升序排列。

  ```javascript
  Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
  // ['2', '10', 'b', 'a', Symbol()]
  ```

### 7.Object.getOenPropertyDescriptors()

`Object.getOwnPropertyDescriptors`方法，返回指定对象所有自身属性（非继承属性）的描述对象。

```javascript
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

```javascript
let mix = (object) => ({
  with: (...mixins) => mixins.reduce(
    (c, mixin) => Object.create(
      c, Object.getOwnPropertyDescriptors(mixin)
    ), object)
});

// multiple mixins example
let a = {a: 'a'};
let b = {b: 'b'};
let c = {c: 'c'};
let d = mix(c).with(a, b);

d.c // "c"
d.b // "b"
d.a // "a"
```

### 8.\__proto__属性，Object.setPrototypeOf(),Object.getPrototypeOf()

- \__proto__属性

`__proto__`属性（前后各两个下划线），用来读取或设置当前对象的`prototype`对象。目前，所有浏览器（包括 IE11）都部署了这个属性。

```javascript
// es6 的写法
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// es5 的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
```

- Object.setPrototypeOf()

`Object.setPrototypeOf`方法的作用与`__proto__`相同，**用来设置一个对象的`prototype`对象**，返回参数对象本身。它是 **ES6 正式推荐的设置原型对象的方法**。

```javascript
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);
//该方法等同于下面的函数。
function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

```javascript
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
```

- Object.getPrototypeOf()

该方法与`Object.setPrototypeOf`方法配套，用于读取一个对象的原型对象。

```javascript
Object.getPrototypeOf(obj);
```

```javascript
function Rectangle() {
  // ...
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
```

### 9.super 关键字

- ES5中的`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字**`super`，指向当前对象的原型对象**。

  ```
  const proto = {
    foo: 'hello'
  };

  const obj = {
    find() {
      return super.foo;
    }
  };

  Object.setPrototypeOf(obj, proto);
  obj.find() // "hello"
  ```

```javascript
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
```

### 10.Object.keys(),Object.values(),Object.entries()

- **Object.keys()**--返回键

ES5 引入了`Object.keys`方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

```javascript
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

```javascript
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

- **Object.values()**--返回值（数组）

```javascript
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
```

- **Object.entries()** --原值（数组）

`Object.entries`方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

```javascript
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

###11.对象的扩展运算符

```javascript
const [a, ...b] = [1, 2, 3];
a // 1
b // [2, 3]

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

- 扩展运算符

  对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

  ```javascript
  let z = { a: 3, b: 4 };
  let n = { ...z };
  n // { a: 3, b: 4 }
  ```

  这等同于使用`Object.assign`方法。

  ```javascript
  let aClone = { ...a };
  // 等同于
  let aClone = Object.assign({}, a);
  ```

> 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。
>
> ```javascript
> function baseFunction({ a, b }) {
>   // ...
> }
> function wrapperFunction({ x, y, ...restConfig }) {
>   // 使用 x 和 y 参数进行操作
>   // 其余参数传给原始函数
>   return baseFunction(restConfig);
> }
>
> ```
>
> 上面代码中，原始函数`baseFunction`接受`a`和`b`作为参数，函数`wrapperFunction`在`baseFunction`的基础上进行了扩展，能够接受多余的参数，并且保留原始函数的行为。