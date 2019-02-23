## 一、`let` 和 `const`

### 1.声明：

- 变量声明：`let`
- 常量声明：`const`

### 2.异同

- 同：
  - 都具有块级作用域，声明的量内部可用，外部不可用。
  - 都不可以再次声明同一个变量。
- 异：
  - `let`：可以重新赋值；可以只声明不赋值。
  - `const`：不可以重新赋值；一旦声明必须赋值。

ps：函数声明尽量用 let 声明语句：`let f = function(){}`

​	`for`循环用`let`来声明可以避免变量冲突。

## 二、变量的解构赋值

### 1.数组`按成员顺序匹配`

- **声明语句等号`=`两边的模式必须匹配。**

```javascript
let [a, b, c] = [1, 2, 3];
// a=1;b=2;c=3;
```

- **默认值**：等号右边的数组成员严格等于`undefined`，等号左边的默认值才会生效。

```javascript
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x = f()] = [1]; // x=1
```

### 2.对象`按成员属性名匹配`

- **等号两边的属性名对应，就可以获取对应的值**，否则是`undefined`。

  ```javascript
  let { foo, bar } = { foo: "aaa", bar: "bbb" };
  foo // "aaa"
  bar // "bbb"
  ```

- **默认值**：对象的属性值严格等于`undefined`

  ```javascript
  var {x = 3} = {};
  x // 3

  ```

- 声明后匹配必须放在括号`()`内

  ```javascript
  // 错误的写法
  let x;
  {x} = {x: 1};
  // SyntaxError: syntax error

  // 正确的写法
  let x;
  ({x} = {x: 1});
  ```

### 3.字符串`被转换成类数组`

- 会自动被转换类数组，且具有`length`属性

  ```javascript
  const [a, b, c, d, e] = 'hello';let {length : len} = 'hello';
  a // "h"
  b // "e"
  c // "l"
  d // "l"
  e // "o"
  len // 5
  ```

###4.数值和布尔类型`都有toString属性`

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
// 数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

###5.函数参数`复用上面1、2、3、4的特性`

### 6.圆括号的问题

- **不能用圆括号：模式不匹配或者声明了的`()`**

  ```javascript
  // 全部报错
  let [(a)] = [1]; // 因声明而报错
  function f([(z)]) { return z; } // 因声明而报错
  ({ p: a }) = { p: 42 }; // 因模式不匹配而报错
  ```

- **可以使用圆括号：赋值语句的非模式部分**

  ```javascript
  [(b)] = [3]; // 正确
  ({ p: (d) } = {}); // 正确
  [(parseInt.prop)] = [3]; // 正确
  ```

### 7.用途

- **(1)交换变量的值**

  ```javascript
  let x = 1;
  let y = 2;

  [x, y] = [y, x];
  x //2
  y //1
  ```

-  **（2）从函数返回多个值**

  ```javascript
  function example() {
    return [1, 2, {a:3}];
  }
  let [a, b, c] = example();
  console.log(a,b,c); // 1 2 {a:3}
  ```

-  **（3）函数参数的定义**

  ```javascript
  // 参数是一组有次序的值
  function f([x, y, z]) { console.log(x,y,z) }
  f([1, 2, 3]); // 1 2 3

  // 参数是一组无次序的值
  function f({x, y, z}) { console.log(x,y,z) }
  f({z: 3, y: 2, x: 1}); // 1 2 3
  ```

-  **（4）提取 JSON 数据**

  ```javascript
  let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
  };

  let { id, status, data: a } = jsonData;

  console.log(id, status, a);
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

- **（6）遍历 Map 结构**   `set`和`get`方法

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

  ```javascript
  const { SourceMapConsumer, SourceNode } = require("source-map");
  ```

## 三、字符串的扩展

###1.Unicode表示法`双字节添加大括号{}`

```javascript
// ES5
"\uD842\uDFB7"
// "𠮷"

// ES6
"\u{20BB7}"
// "𠮷"
```

###2.codePointAt()`判断二/四字节`

- `codePointAt`方法会正确返回 32 位的 UTF-16 字符的码点，可使`toString`方法转换进制。

```javascript
//str.codePointAt(0)>0xFFFF?四字节:二字节

function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF; // 四个字节
}

is32Bit("𠮷") // true
is32Bit("a") // false

let s = '𠮷a';
s.codePointAt(0).toString(16) // "20bb7" 十六进制
```

###3.String.fromCodePoint()--识别大于`0xFFFF`的字符并回具体的字

```javascript
// ES5
String.fromCharCode(0x20BB7)
// "ஷ"

// ES6
String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
```

###4.字符串的遍历接口-- `for...of`

- 用`String.fromCodePoint(0xXXXX)`返回具体的字；


- 然后`for...of`循环会正确识别出大于`0xFFFF`的码点字符。

```javascript
let text = String.fromCodePoint(0x20BB7);// text = "𠮷"
for (let i of text) {
  console.log(i);
}
// "𠮷"
```

###5.includes(),startsWith(),endsWith()--`字符串查询`,区分大小写

- **includes()**：返回布尔值，表示是否找到了参数字符串。
- **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部。
- **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部。

```javascript
let s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```

- 第二个参数，表示开始搜索的位置。

```javascript
let s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

###6.repeat()---重复原字符串`str.repeat(n)`返回新字符串（n>=0,小数向下取整）

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2.2) // "hellohello"
'na'.repeat(-0) // ""
```

###7.padStart(),padEnd()--字符串补全`多补少截始覆盖`

**` sourceStr.padStart(len,addStr);`  ` sourceStr.padEnd(len,addStr);`**

- `padStart`和`padEnd`一共接受两个参数，第一个参数用来指定**字符串的最小长度**，第二个参数是用来补**全的字符串**。
- 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
- 如果省略第二个参数，默认使用空格补全长度。

```javascript
// sourceStr.padStart(len,addStr);
// sourceStr.padEnd(len,addStr);

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

'x1'.padStart(2, 'ab') // "x1"
'x111'.padEnd(5, 'ab') // "x111a"
```

###8.模板字符串！！！--双反引号（\`模板\`）标识

```javascript
var basket = {
    count:20;
    onSale:3
}
$('#result').append(`
	I know ${'that'}
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);

let str = 'return ' + '`Hello ${name}!I am ${name2}`';
let func = new Function('name','name2', str);
func('Jack','Charles') // "Hello Jack!I am Charles"
```

- 标签模板

```javascript
alert`123`
// 等同于
alert(123)
```

> “标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
>
> “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
>
> ```javascript
> function SaferHTML(templateData) {
>   let s = templateData[0];
>   for (let i = 1; i < arguments.length; i++) {
>     let arg = String(arguments[i]);
>
>     // Escape special characters in the substitution.
>     s += arg.replace(/&/g, "&amp;")
>             .replace(/</g, "&lt;")
>             .replace(/>/g, "&gt;");
>
>     // Don't escape special characters in the template.
>     s += templateData[i];
>   }
>   return s;
> }
> let sender = '<script>alert("abc")</script>'; // 恶意代码
> let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
>
> message; // "<p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>"
> ```

## 四、正则的扩展

### 1.RegExp 构造函数

- ES5

  ```javascript
  var regex = new RegExp('xyz', 'i');
  // 等价于
  var regex = /xyz/i;
  ```

- ES6

  ```javascript
  new RegExp(/abc/ig, 'i')
  // /abc/i
  new RegExp(/abc/ig, 'i').flags
  // "i"
  // 原有正则对象的修饰符是ig，它会被第二个参数i覆盖。
  ```

### 2.字符串的正则方法

`match()`、`replace()`、`search()`和`split()`。

### 3. u 修饰符--新添加处理大于`\uFFFF`的 Unicode 字符

```javascript
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
```

> ```javascript
> var s = '𠮷';
>
> /^.$/.test(s) // false
> /^.$/u.test(s) // true
> ```
>
> 点字符

> ```javascript
> /\u{61}/.test('a') // false 如果不加u修饰符，正则表达式无法识别\u{61}这种表示法
>
> /\u{61}/u.test('a') // true
>
> /\u{20BB7}/u.test('𠮷') // true
>
> ```
>
> Unicode 字符表示法

> ```javascript
> /a{2}/.test('aa') // true
> /a{2}/u.test('aa') // true
> ```
>
> 量词

> ```javascript
> /^\S$/.test('𠮷') // false
> /^\S$/u.test('𠮷') // true
> ```
>
> **预定义模式**`\S

> ```javascript
> /[a-z]/i.test('\u212A') // false
> /[a-z]/iu.test('\u212A') // true
> //不加u修饰符，就无法识别非规范的K字符。
> ```
>
> **i 修饰符**

###4. y 修饰符

> `y`修饰符的作用与`g`修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，`g`修饰符只要剩余位置中存在匹配就可，而`y`修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

```javascript
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null
```

###5.sticky属性--检测`y`修饰符

###6.flags属性--返回正则表达式的修饰符

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

###7.s 修饰符：dotAll模式

```javascript
/foo.bar/s.test('foo\nbar') // true
```

###8.后行断言

###9.Unicode属性类

```javascript
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test('π') // true
```

```javascript
\p{UnicodePropertyName=UnicodePropertyValue};
```

```javascript
\p{UnicodePropertyName};
\p{UnicodePropertyValue};
//\P{…}是\p{…}的反向匹配，即匹配不满足条件的字符。
```

```javascript
const regex = /^\p{Decimal_Number}+$/u;
regex.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼') // true
```

- `\p{Number}`能匹配罗马数字。

  ```javascript
  // 匹配所有数字
  const regex = /^\p{Number}+$/u;
  regex.test('²³¹¼½¾') // true
  regex.test('㉛㉜㉝') // true
  regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true 
  ```

- ```javascript
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

###10.具名组匹配

```javascript
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
```

- 解构赋值和替换

  ```javascript
  let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
  one  // foo
  two  // bar
  ```

  - 字符串替换时，使用`$<组名>`引用具名组。

    ```javascript
    let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

    '2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
    // '02/01/2015'
    ```

##五、数值的扩展

###1.二进制(前缀`0b`（或`0B`）)和八进制的(`0o`（或`0O`）)表示法

- ES6 提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。

  ```javascript
  0b111110111 === 503 // true
  0o767 === 503 // true
  ```

- 如果要将`0b`和`0o`前缀的字符串数值转为十进制，要使用`Number`方法。

  ```javascript
  Number('0b111')  // 7
  Number('0o10')  // 8
  ```

###2.Number.isFinite()--有限数；Number.isNaN()--NaN

```javascript
// 有限数
Number.isFinite(15); // true
Number.isFinite(0.8); // true

// NaN
Number.isNaN(NaN) // true
Number.isNaN(15) // false
```

###3.Number.parseInt()--取整,Number.parseFloat()--小数保留

- ES6 将全局方法`parseInt()`和`parseFloat()`，移植到`Number`对象上面，行为完全保持不变。

  ```javascript
  // ES5的写法
  parseInt('12.34') // 12
  parseFloat('123.45#') // 123.45

  // ES6的写法
  Number.parseInt('12.34') // 12
  Number.parseFloat('123.45#') // 123.45
  ```

###4.Number.isInteger()--判断是否为整数

- 所有非Number类型都会返回false

  ```javascript
  Number.isInteger(25) // true
  Number.isInteger(25.1) // false
  Number.isInteger('25') // false
  ```

###5.Number.EPSOLON

- 它表示 1 与大于 1 的最小浮点数之间的差。

  ```javascript
  Number.EPSILON === Math.pow(2, -52)
  // true
  Number.EPSILON
  // 2.220446049250313e-16
  Number.EPSILON.toFixed(20)
  // "0.00000000000000022204
  ```

###6.安全整数与 Number.isSafeInteger()

> JavaScript 能够准确表示的整数范围在`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值。
>
> ES6 引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示`-2^53`到`2^53`之间这个范围的上下限。
>
> ```javascript
> Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
> // true
> Number.MAX_SAFE_INTEGER === 9007199254740991
> // true
> ```

###7.Math对象的扩展

- Math.trunc()：除一个数的小数部分，返回整数部分。

- Math.sign()：判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

- Math.cbrt()：计算一个数的立方根。

- Math.clz32()：返回一个数的 32 位无符号整数形式有多少个前导 0。`Math.clz32(0b01000000000000000000000000000000) // 1`

- Math.imul()：返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。

- Math.fround()：返回一个数的32位单精度浮点数形式。

  ```javascript
  Math.fround(2 ** 24 - 1)   // 16777215
  // 如果参数的绝对值大于 224，返回的结果便开始丢失精度。
  ```

- Math.hypot()：返回所有参数的平方和的平方根。`Math.hypot(3, 4); // 5  ===>  3的平方加上 4 的平方，等于 5 的平方。`

- 双曲函数方法

  ES6 新增了 6 个双曲函数方法。

  - `Math.sinh(x)` 返回`x`的双曲正弦（hyperbolic sine）
  - `Math.cosh(x)` 返回`x`的双曲余弦（hyperbolic cosine）
  - `Math.tanh(x)` 返回`x`的双曲正切（hyperbolic tangent）
  - `Math.asinh(x)` 返回`x`的反双曲正弦（inverse hyperbolic sine）
  - `Math.acosh(x)` 返回`x`的反双曲余弦（inverse hyperbolic cosine）
  - `Math.atanh(x)` 返回`x`的反双曲正切（inverse hyperbolic tangent）

- Math.signbit()：判断一个值的正负，但是如果参数是`-0`，它会返回`-0`。

###9.指数运算符`a ** b  (a的b次方)`

```javascript
2 ** 2 // 4
2 ** 3 // 8
```

- 运算符可以与等号结合，形成一个新的赋值运算符（`**=`）。

```javascript
let a = 1.5;
a **= 3;
// 等同于 a = a * a * a;
```

## 六、函数的扩展

###1.参数的默认值

**（1）**

```javascript
function log(x, y = 'World') {
  console.log([x, y]);
}

log('Hello') // ["Hello", "World"]
```

PS:

- 参数设置默认值后，参数会默认被声明，所以不能再次声明。

- 参数设置默认值后，函数不能有同名参数。

- 参数默认值是惰性求值的，每次都会重新计算默认值表达式的值。

  ```javascript
  let x = 99;
  function foo(p = x + 1) {
    console.log(p);
  }

  foo() // 100

  x = 100;
  foo() // 101

  x = 1000;
  foo() // 1001
  ```

**（2）与解构赋值默认值结合使用**

```javascript
function m2({x, y} = { x: 0, y: 0 }) { // 没有设置默认值
  return [x, y];
} // [0,0]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]
```

**（3）参数默认值的位置**

- 非尾部参数不能为空

  ```javascript
  function f(x, y = 5, z) {
    return [x, y, z];
  }
  f(1) // [1, 5, undefined]
  f(1, ,2) // 报错
  ```

**(4)默认值函数的length属性--本身以及之后的都会失真**

> 设置参数默认值后，该参数的length属性失真；而且后面的参数length属性也会失真。

**(5)、作用域**

- 函数参数没有被赋值默认值时，参数的值跟函数外部（全局）没有关系
- 但是当全局变量被当作值赋值给函数的参数时（成为等号右边的值），取得的值就是全局定义的值。‘
- 另外一种情况，如果全集变量被函数参数作默认值赋值了，但是实际用该函数的时候参数重新赋值了，会使用新的值。

```javascript
var x = 11;
function f(y = x) {
  console.log(y);
}
f() // 11
f(222) // 222
```

```javascript
let foo = 'outer';
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar(); // outer
```

- **可以将参数默认值设为`undefined`，表明这个参数是可以省略的**。`function foo(optional = undefined) { ··· }`

###2.rest参数--`...变量名`

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

- 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

- **函数的`length`属性，不包括 rest 参数**。

  ```javascript
  (function(a) {}).length  // 1
  (function(...a) {}).length  // 0
  (function(a, ...b) {}).length  // 1
  ```

###3.严格模式`use strict`--严格模式下不能使用未声明的变量

- S5 开始，函数内部可以设定为严格模式。


- ES2016 做了一点修改，规定**只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么`函数内部`就不能显式设定为严格模式，否则会报错**。

```javascript
// 报错
function doSomething(a, b = a) {
  'use strict'; 
  // code
}
```

### 4.name属性

- 函数的`name`属性，返回该函数的函数名。

- 如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的`name`属性都返回这个具名函数原本的名字。

  ```javascript
  const bar = function baz() {};

  // ES5
  bar.name // "baz"

  // ES6
  bar.name // "baz"
  ```

###5.箭头函数！！！  `=>`

（1）

- ES6 允许使用“箭头”（`=>`）定义函数。

- 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。`var f = () => 5;`

- 箭头函数返回一个对象

  ```javascript
  // 报错
  let getTempItem = id => { id: id, name: "Temp" };

  // 不报错
  let getTempItem = id => ({ id: id, name: "Temp" });
  ```

- PS:**箭头函数没有自己的`this`**

  - （1）**函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。**
  - （2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
  - （3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
  - （4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

###6.双冒号运算符`提案中`

- 函数绑定运算符是并排的两个冒号（`::`），**双冒号左边是一个对象，右边是一个函数**。该运算符会自动**将左边的对象，作为上下文环境（即`this`对象），绑定到右边的函数上面**。

> 箭头函数可以绑定`this`对象，大大减少了显式绑定`this`对象的写法（`call`、`apply`、`bind`）。但是，箭头函数并不适用于所有场合，所以现在有一个[提案](https://github.com/zenparsing/es-function-bind)，提出了“函数绑定”（function bind）运算符，用来取代`call`、`apply`、`bind`调用。

```javascript
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

```

### 7.尾调用优化

- **尾调用就是指某个函数的最后一步是调用另一个函数。**

  ```javascript
  function f(x){
    return g(x); // 有return，表明是最后一步动作
  }
  //函数f的最后一步是调用函数g，这就叫尾调用。
  // 等同于 g(x)  ---> 优化

  function f(x){
    g(x); // 没有return，表明不是最后一步动作
  }
  //函数f的最后一步 不 是调用函数g，所以不是尾调用。
  ```

- “尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

  > 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

- 尾递归**`最后一步调用自身 ` **

  - **函数调用自身，称为递归。如果尾调用自身，就称为尾递归。**

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

  - 函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。

**递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。对于其他支持“尾调用优化”的语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。**

- 蹦床函数，防止调用栈溢出(循环次数超出限制)。

  ```javascript
  function trampoline(f) {
    while (f && f instanceof Function) {
      f = f();
    }
    return f;
  }
  ```

### 8.函数参数的尾逗号

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

  function add(x, y) {
    return x + y;
  }
  const numbers = [4, 38];
  add(...numbers) // 42
  ```

  ```javascript
  function f(v, w, x, y, z) { }
  const args = [0, 1];
  f(-1, ...args, 2, ...[3]);
  //扩展运算符后面还可以放置表达式。
  const arr = [...(x > 0 ? ['a'] : []),'b',];
  //如果扩展运算符后面是一个空数组，则不产生任何效果。
  [...[], 1]
  // [1]
  ```

- 扩展运算符的应用

  - 复制数组

  ```javascript
  const a1 = [1, 2];
  const a2 = a1;
  a2[0] = 2;
  a1 // [2, 2]
  // const [...a2] = a1;

  ```

  - 合并数组

  ```javascript
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

  - **与解构赋值结合起来，生成数组**。

  ```javascript
  const [first, ...rest] = [];
  first // undefined
  rest  // []

  const [first, ...rest] = ["foo"];
  first  // "foo"
  rest   // []
  ```

  - 将字符串转换为数组，且具有`length`属性

  ```javascript
  const a = [...'hello'];
  a// [ "h", "e", "l", "l", "o" ]
  a.length // 5
  ```

  - 类数组转换

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

- `function*` 函数声明--**生成器函数**

  语法：**function* name([param[, param[, ... param]]]) { statements }**

  > 调用一个**生成器函数**并不会马上执行它里面的语句，而是返回一个这个生成器的 **迭代器** **（iterator ）对象**。当这个迭代器的 `next() `方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现[`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)的位置为止，[`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield) 后紧跟迭代器要返回的值。

  ```javascript
  function *createIterator() {
      let first = yield 1;
      let second = yield first + 2; // 4 + 2 
                                    // first =4 是next(4)将参数赋给上一条的
      yield second + 3;             // 5 + 3
  }

  let iterator = createIterator();

  console.log(iterator.next());    // "{ value: 1, done: false }"
  console.log(iterator.next(4));   // "{ value: 6, done: false }"
  console.log(iterator.next(5));   // "{ value: 8, done: false }"
  console.log(iterator.next());    // "{ value: undefined, done: true }"
  ```

###**2**.Array.from()--将类数组对象和可遍历对象转为数组

```javascript
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});
```

- `Array.from`还可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

  ```javascript
  Array.from([1, 2, 3], (x) => x * x)
  // [1, 4, 9]
  ```

###3.Array.of()--将值转为数组

> `Array.of`总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of() // []
Array.of(undefined) // [undefined]
```

### 4.数组实例的 copyWithin()

- 数组实例的`copyWithin`方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组(新)。

  `Array.prototype.copyWithin(target, start = 0, end = this.length)`

  它接受三个参数。

  - target（必需）：**从该位置开始替换数据**。如果为负值，表示倒数。
  - start（可选）：**从该位置开始读取数据**，默认为 0。如果为负值，表示倒数。
  - end（可选）：**到该位置前停止读取数据**，默认等于数组长度。如果为负值，表示倒数。

  ```javascript
  [1, 2, 3, 4, 5].copyWithin(0, 3) 
  // 从下标 3 开始复制，只复制了 4和5 ，然后从下标 0 开始覆盖，覆盖了 1和2 ，所以新数组是：[4,5,3,4,5]
  // [4, 5, 3, 4, 5]
  ```

### 5.数组实例的 find() --`值`和 findIndex()--`位置`

- **find()**

  ```javascript
  [1, 4, -5, 10].find((n) => n < 0)
  // -5
  ```

- **findIndex()**

  ```javascript
  [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
  }) // 2
  ```

### 6.数组实例的 fill()--`填充覆盖返回新数组`

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

- `fill`方法还可以接受第二个和第三个参数，用于指定填充的起始位置(包含)和结束(不含)位置。

  ```javascript
  ['a', 'b', 'c'].fill(7, 1, 2)
  // ['a', 7, 'c']

  let arr = new Array(3).fill({name: "Mike"});
  arr[0].name = "Ben";
  arr
  // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]
  ```

###7.数组实例的 entries() , keys() 和 values()

- `keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

  ```javascript
  for (let index of ['a', 'b'].keys()) {
    console.log(index);
  }

  for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
  }
  // 0 "a"
  // 1 "b"
  ```

  ```javascript
  let letter = ['a', 'b', 'c'];
  let entries = letter.entries();
  console.log(entries.next().value); // [0, 'a']
  console.log(entries.next().value); // [1, 'b']
  console.log(entries.next().value); // [2, 'c']
  ```

###8.数组实例的 includes()--`判断值是否存在`

```javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

> 注意，Map 和 Set 数据结构有一个`has`方法，需要注意与`includes`区分。
>
> - Map 结构的`has`方法，是用来查找键名的，比如`Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`。
> - Set 结构的`has`方法，是用来查找值的，比如`Set.prototype.has(value)`、`WeakSet.prototype.has(value)`。

### 9.数组的空位

- **ES6 明确将空位转为`undefined`。**

  ```javascript
  Array.from(['a',,'b'])
  // [ "a", undefined, "b" ]
  ```

  > **由于空位的处理规则非常不统一，所以建议避免出现空位。**

##八、对象的扩展

###1.属性的简洁表示法

- ES6 允许直接写入变量和函数，作为对象的属性和方法

  ```javascript
  const foo = [{a:'bar'},{b:1},{c:''}];
  const baz = {foo};
  baz 
  // [{a: "bar"}, {b: 1}, {c: ""}]
  ```

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

###2.属性名表达式

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

- 表达式还可以用于定义方法名。

  ```javascript
  let obj = {
    ['h' + 'ello']() {
      return 'hi';
    }
  };

  obj.hello() // hi
  ```

###3.方法的name属性--返回属性名

- 函数的`name`属性，返回函数名。对象方法也是函数，因此也有`name`属性。

  ```javascript
  const person = {
    sayName() {
      console.log('hello!');
    },
  };

  person.sayName.name   // "sayName"
  ```

  ```javascript
  /* 其实每个对象的属性都有默认的get和set方法：*/
  //如：
  var obj = { a:1}
   obj.a = 10; // 相当于set方法 
   obj.a ; // 10 相当于get方法

  ```

###4.Object.is()--比较值的严格相等

```javascript
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
```

- `Object.defineProperty()` 方法会直接在一个对象上**定义一个新属性**，**或者修改一个对象的现有属性**， 并返回这个对象。

  ```javascript
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

###5.Object.assign(target,obj1,obj2)--对象合并/添加/替换的得到target

```javascript
// 合并
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

// 替换（覆盖）
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)

// 添加
const target = { a: { b: 'c', d: 'e' } }
const source = { x: { b: 'hello' } }
Object.assign(target, source)
```

###6.属性的可枚举性和遍历

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

###7.Object.getOenPropertyDescriptors()--返回指定对象所有自身属性

- `Object.getOwnPropertyDescriptors`方法，**返回指定对象所有自身属性（非继承属性）**的描述对象。

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

### 8.\__proto__属性，Object.setPrototypeOf(),Object.getPrototypeOf()

- `__proto__`属性（前后各两个下划线），用来读取或设置当前对象的`prototype`对象。目前，所有浏览器（包括 IE11）都部署了这个属性。

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

- `Object.setPrototypeOf`方法的作用与`__proto__`相同，**用来设置一个对象的`prototype`对象**，返回参数对象本身。它是 **ES6 正式推荐的设置原型对象的方法**。

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

###9.super 关键字

- ES5中的`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字**`super`，指向当前对象的原型对象**。

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

  ```javascript
  var obj = { foo: 'bar', baz: 42 };
  Object.keys(obj)
  // ["foo", "baz"]
  ```

- **Object.values()**--返回值（数组）

  ```javascript
  const obj = { foo: 'bar', baz: 42 };
  Object.values(obj)
  // ["bar", 42]
  ```

- **Object.entries()** --原值（数组）

  ```javascript
  const obj = { foo: 'bar', baz: 42 };
  Object.entries(obj)
  // [ ["foo", "bar"], ["baz", 42] ]
  ```

###11.对象的扩展运算符

- 对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

  ```javascript
  let z = { a: 3, b: 4 };
  let n = { ...z };
  // 等同于：let n = Object.assign({}, z);
  n // { a: 3, b: 4 }
  ```

- 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。

  ```javascript
  function baseFunction({ a, b }) {
    // ...
  }
  function wrapperFunction({ x, y, ...restConfig }) {
    // 使用 x 和 y 参数进行操作
    // 其余参数传给原始函数
    return baseFunction(restConfig);
  }
  ```

  ​



































































































