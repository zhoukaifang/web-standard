### 1-创建节点

- 元素：`document.creatElement(tangname)`
- 文本：`document.creatTextNode(string)`

###2-获取`DOM`节点

- `getElementById(id)：`返回一个唯一的对象，是当前`id`所属元素的实例。
- `getElementsByTagName(tagname)`：返回一个数组，包含所遍历的标签名的标签集合。
- `getElementsByClassName()`：返回一个数组，包含所遍历的类名的元素集合。
- `querySelector()`：返回参数选择器的元素(多个用逗号隔开)，且返回**第一个被匹配到的元素**。
- `querySelectorAll()`：返回参数选择器(多个用逗号隔开)的所有元素列表，改列表是一个`NodeList`对象。

### 3-插入节点

- 末尾插入子节点：`appendChild(element)`
- 目标元素前面插入新元素：`parentNode.insertBefore(newElement,targetElement)`
- 目标元素属性：
  - `targetElement.nextSibling`
  - `targetElement.parentNode.lastChild`

### 4-删除节点

- `parentNode.removeChild(targetElement)`

### 5-节点属性

- 父节点：`parentNode`

- 子节点：`firstChild` 、`lastChild`、 `childNodes`

- 兄弟节点：`nextSibling` 、`previousSibling` 

- `nodeType`

  > 其中：
  >
  > ​	元素节点的   `nodeType==1`；
  >
  > ​	属性节点的   `nodeType==2`；
  >
  > ​	文本节点的   `nodeType==3`；

### 6-元素属性

- 获取：

  `getAttribute(attrName)`：获取元素的属性值。

- 设置：

  `setAttribute(attrname,value)`：把元素的`attrname`属性值设为`value`。

### 7-获取css样式

- **可读写：**
  - `element.style `，可读写，但是只能获取定义了的样式。


- **只读：**

  - `window.getCoumputedStyle(元素，伪类/null):`，获取元素的所有可用样式属性，返回一个只读的数组。

    等同：`document.defaultView.getComputedStyle`

  - `getPropertyValue(style)：`，获取特定css属性的值。


- **IE特有：**
  - `element.currentStyle`

> 通过` e.style.cssName  `就可以获取或者设置对应的样式的值。
>
> 具体哪些样式属性能够被获取，可以通过 `e.style` 获取。









