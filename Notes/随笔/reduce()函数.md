### 浅析`reduce()`函数

- 定义：reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。 

- 语法：

  ```javascript
  array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
  ```

  参数：

  - function(total, currentValue, currentIndex, arr)：必需。用于执行每个数组元素的函数。 

    - total：必需。*初始值*, 或者计算结束后的返回值。 --即数组array首次计算时的下标为0的元素
    - *currentValue* ： 必需。当前元素  --即数组array首次计算时的下标为1的元素，第二次为2的元素，依次递增
    - *currentIndex* ：可选。当前元素的索引 --即数组array计算时第二个参数currentValue的下标，第一次为1，第二次为2，依次递增
    - arr： 可选。当前元素所属的数组对象。--返回的是当前数组array 

  - *initialValue* ：可选。传递给函数的初始值 --意思是数组以*initialValue* 为初始值进行函数计算

    什么意思呢？下面我们通过具体的例子来看：

- 用法浅析

  通常我们求一个数组的累加值，我们首先会想到的是用for：

  ```javascript
  const arr = [1,2,3,4];
  let sum = 0;
  for(let i=0;i<arr.length;i++){
      sum += arr[i];
  };
  console.log(sum); // 10
  
  // 当然，用函数方法会使我们更方便：
  const arr = [1,2,3,4];
  function getSum(arr){
  	let sum = 0;
      for(let i=0;i<arr.length;i++){
          sum += arr[i];
      };
      return sum;
  };
  getSum(arr); // 10
  
  ```

  假如要实现多个数组相加，就要像这样`getSum(arr)+getSum(arr1)+getSum(arr2)...+getSum(arrN);`这样明显是效率极其低下操作起来也麻烦；

  如何可以实现同时传入两个甚至多个数组作为参数呢？上面这种办法明显就行不通，这时候就可以结合ES6的解构用到函数的arguments属性了：

  ```javascript
  const arr = [1,2,3,4];
  const arr2 = [1,2,3,4];
  const arr3 = [1,2,3,4];
  function getSum(){
  	let sum = 0;
      for(const key in arguments){
          sum += arguments[key];
      };
      return sum;
  };
   // 注意：这时候函数接受的参数就是数组的一个个单独的元素了
  getSum(...arr,...arr2); // 20
  getSum(...arr,...arr2,...arr3); // 30
  ```

  这与`reduce()`又有什么关系？既然上面都能轻易实现累加算法（不用解构同样非常烦人），为什么还要用到reduce()？存在即合理，废话不多说，继续看下去：

  ```javascript
  const arr = [1,2,3,4];
  function count(a,b){
  	return a+b;
  };
  function getSum(arr){
  	return arr.reduce(count);
  };
  getSum(arr); // 10
  ```

  如果本身对reduce没有一定了解之前看完有没有觉得很神奇或者很奇怪！？

  这就是reduce方法的在上面的用处了---每次对数组前面的元素累加，然后继续和下一个元素累加。

  > 上面reduce方法实现的逻辑步骤是：
  >
  > ① 1+2 = 3；
  >
  > ② 3 + 3 = 6；
  >
  > ③ 6 + 4 = 10；
  >
  > 也就是说每次都会执行一次count()方法，并且执行的元素在数组中往后缩减。

  同样的，如果想要一次传入多个参数怎么办！？继续使用arguments进一步封装：

  ```javascript
  const arr = [1,2,3,4];
  const arr2 = [1,2,3,4];
  const arr3 = [1,2,3,4];
  function count(a,b){
  	return a+b;
  };
  function getSum(arr){
  	return arr.reduce(count);
  };
  function getReduce(){
      let sum = null;
      for(const key in arguments){
        	sum += arguments[key];  
      };
      return sum;
  };
  getReduce(getSum(arr),getSum(arr2),getSum(arr3)); 
  // 30
  ```

- `reduce`进阶

  为什么说进阶！？因为上面只是实现了数组顺序缩减方式的累加而已，假如我不仅仅是实现这样简单的算法需求，而是实现更为复杂的计算呢！？继续看：

  ```javascript
  const arr = [1,2,3,4];
  function count(a,b){
  	return a*b - a - b;
  };
  function getSum(arr){
  	return arr.reduce(count);
  };
  function getReduce(){
      let sum = null;
      for(const key in arguments){
        	sum += arguments[key];  
      };
      return sum;
  };
  getReduce(getSum(arr));
  // -19
  ```

  > 这到底是怎么得到的！？下面一步步拆解：
  >
  > ① 1*2-1-2 = -1；
  >
  > ② -1*3 - (-1) -3 = -5；
  >
  > ③ -5*4 - (-5) - 4 = -19；
  >
  > 上面的需求假如让你用其他方式实现，你会怎么实现！？我试了下，这相比起上面将会复杂的多。
  >
  > 当然或许你会说哪有这样变态的需求，而且这需求也不现实！
  >
  > ------而我个人的看法，说点废话：
  >
  > ​	起码这样的想法就是错误的，作为一个程序员，上级提出需求，首先不管合不合理，我们都应该尽可能实现，一味抱怨只会显得你懒惰并且无能；其次，如果每次遇到问题都是这种消极逃避的心里，我们的技术谈何提高，技术不行，又如何向“钱”看。

  