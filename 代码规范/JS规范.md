### 1.使用两个空格替代tab缩进	

```javascript
// bad 
function foo() {
∙∙∙∙let name;
}
// bad 
function bar() {
∙let name;
}
// good 
function baz() {
∙∙let name;
}
```

### 2.不能省略分号

```javascript
// bad 
let luke = {}
let leia = {}
[luke, leia].forEach(jedi=>jedi.father='vader')

// good 
let luke = {};
let leia = {};
[luke, leia].forEach((jedi) => {
  jedi.father='vader';
});
```

### 3.杜绝var

```javascript
// bad
var example =42;
// good
const example=42;
```

### 4.优先使用箭头函数

```javascript
// bad
[1, 2, 3].map(function (x) {
  const y= x +1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y= x +1;
  return x * y;
});
```

### 5.使用模板字符串``取代连接字符串''

```javascript
// bad
function sayHi(name) {
  return'How are you, '+ name +'?';
}
// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}
// bad
function sayHi(name) {
  return`How are you, ${ name }?`;
}
// good
function sayHi(name) {
  return`How are you, ${name}?`;
}
```

### 6.优先使用for...of

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

###7.常量的命名规范

> *常量命名应该用全大写格式，并用下划线分割*

如果你确定一定以及肯定一个变量值以后不会被修改，你可以将它的名称使用全大写模式改写，暗示这是一个常量，请不要修改它的值。

遵守这条规则时需要注意的一点是，如果这个常量是一个函数，那么应该使用驼峰式命名法，并且首字母也应该大写。

```javascript
// bad
const number=5;

// good
const NUMBER=5;

const FunctionName = ()=>{};
```

### 8.每次只声明一个变量

```javascript
// bad
let a =1, b =2, c =3;

// good
let a =1;
let b =2;
let c =3;
```

### 9.使用单引号

> 只允许使用单引号包裹普通字符串，禁止使用双引号。如果字符串中包含单引号字符，应该使用模板字符串。

```javascript
// bad
let directive ="No identification of self or mission."

// bad
let saying ='Say it ain\u0027t so.';

// good
let directive ='No identification of self or mission.';

// good
let saying =`Say it ain't so`;
```

























































