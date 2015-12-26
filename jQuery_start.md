## 目录

```javascript
认识 jQuery
学习线路
学习资源
```

### 认识jQuery

Write less, do more

一个非常流行的快速、小巧、功能强大的开源JavaScript库。
它使我们常用的HTML文档遍历、DOM操作、事件处理、动画效果、Ajax、工具方法等功能代码的实现变得非常简单。
更重要的是，它为我们做了跨浏览器的兼容。绝大多数时候，老板再也不用担心我的JS兼容问题了(由于浏览器bug等因素，jQuery也无法100%地实现跨浏览器兼容，这种情况极少遇到，官方会对这些少数API作特殊说明)。

最新版本
```code
  v1.11.3
  v2.1.4
```
1.x和2.x的API是一致的，但2.x不支持IE6、7、8

下载
生产环境： http://code.jquery.com/jquery-2.1.4.min.js
开发环境： http://code.jquery.com/jquery-2.1.4.js

* 压缩版（.min.js）会去除多余的注释、空白字符等信息，并缩短了变量的名称，以减小js文件的体积。

在html中引用

```html
<script src="./jquery-2.1.4.js"></script>
<!-- 或者直接引用官方的源文件 -->
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
```

判断当前页是否有jQuery对象

```javascript
> !!window.jQuery

true
```

使用

```javascript
> $(document.body)

[<body>​…​</body>​]
```

* 在jQuery库中定义了一个jQuery()方法，调用该方法可以获得一个包含DOM元素的jQuery对象，然后可以使用jQuery对象上的方法来操作它所包含的DOM元素。
* jQuery对象是一个类数组对象，需要使用jQuery对象上的方法进行操作。

jQuery对象与DOM相互转换

```javascript
> $(document.body)[0] === document.body

true
```

## 学习线路

三大核心： 选择器、DOM操作、事件

功能： 动画效果、CSS操作、AJAX封装、工具方法

### 选择器

```html
<div>
    <div class="cs1" name=>Hello jQuery!</div>
    <div class="cs2" >Hello jQuery!</div>
</div>
```

#### js原生选择器

```javascript
> document.getElementById('Id')
> document.getElementsByClassName('ClassName')
> document.getElementsByName('Name')
> document.getElementsByTagName('TagName')
```

#### jQuery选择器

```javascript
> jQuery('#Id')
> jQuery('.ClassName')
> jQuery('[name=Name]')
> jQuery('TagName')
```

[jQuery Selectors API](http://api.jquery.com/category/selectors/)

[jQuery 参考手册 - 选择器 (W3School)](http://www.w3school.com.cn/jquery/jquery_ref_selectors.asp)

* jQuery使用了[Sizzle](http://sizzlejs.com/) CSS Selector Engine v2.2.0-pre作为选择器的引擎，使用方法跟CSS选择器一样。

### DOM操作

![htmltree][1]

获取和修改元素以及它们的属性

[jQuery DOM API](http://api.jquery.com/category/manipulation/)

[jQuery 参考手册 - 文档操作 (W3School)](http://www.w3school.com.cn/jquery/jquery_ref_manipulation.asp)

### 事件

[jQuery Events API](http://api.jquery.com/category/events/)

[jQuery 参考手册 - 事件 (W3School)](http://www.w3school.com.cn/jquery/jquery_ref_events.asp)


## 学习资源

[jQuery 官网](http://jquery.com/)

[jQuery API](http://api.jquery.com/)

[jQuery 教程 (W3School)](http://www.w3school.com.cn/jquery/index.asp)

[jQuery1.7 中文手册](http://www.php100.com/manual/jquery/)

[jQuery 快速入门教程](http://www.365mini.com/page/jquery-quickstart.htm)


进阶

[jQuery 编程的最佳实践](http://www.cnblogs.com/Wayou/p/jquery_best_practise.html)

  [1]: http://www.w3school.com.cn/i/ct_htmltree.gif
