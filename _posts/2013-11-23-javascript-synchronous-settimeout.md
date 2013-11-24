---
layout: post
title:  "javascript异步编程之setTimeOut"
date:   2013-11-23 21:56:59
author: hugo
categories: 
- Notes 
tags:
- javascript
- 异步
- settimeout

---

javascript的执行引擎是单线程的，正常情况下是同步编程的模式，即是程序按照代码的顺序从上到下依次顺序执行。只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段Javascript代码长时间运行（比如死循环），那么在执行期间任何UI更新都会被阻塞，界面事件处理也会停止响应。导致整个页面卡在这个地方，其他任务无法执行。

特别是在for循环语句里，如果for循环的处理逻辑比较复杂，并且循环次数过多，超过1000次时，javascript的执行会阻塞浏览器处理起来会有明显的假死状态。原因就是浏览器在调用javascript的时候，主界面是停止响应的，因为cpu交给js执行了，没有时间去处理界面消息。

为了解决卡死的问题，很多人提出了异步编程的解决方案，这也是性能优化的其中一个方式，在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应。现在很火的nodejs就是异步编程，比如路由派发，IO操作，都是异步的。

在前端页面实现中，最常见的异步就是ajax操作，请求一个ajax无需等待ajax返回，则可继续操作页面。

其他的还有通过`setTimeout`,`setInterval`,`image.onload`, `postMessage,webwork`等方式进行异步编程实现。

网上也有很多库实现了异步编程如：`do.js`. `step.js`, `async.js`, `flow.js`，就不详细阐述了，有兴趣的自行google了解。

##setTimeOut

这里主要讲setTimeOut实现异步编程的方式。

先看一段代码，<http://jsfiddle.net/RPQgj/189/>

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <title>DEMO</title>
</head>
<script src="http://codeorigin.jquery.com/jquery-1.10.2.min.js"></script>
<script>
	var updateSync = function() {
		for (var i = 0; i < 10000; i++) {
			$('#js_output').text(i);
		}
	}
    var updateAsync = function() {
        var i = 0;
        function updateLater() {
            $('#js_output').text(i++);
            if (i < 10000) {
                setTimeout(updateLater, 0);
            }
        }
        updateLater();
    }
</script>
<body>
<button onclick="updateSync()">同步DEMO</button>
<button onclick="updateAsync()">异步DEMO</button>
<div id="js_output"></div>
</body>
</html>
{% endhighlight html %}

**点击同步DEMO**：你会感觉按钮按下去的时候卡了一下，然后看到一个最终结果99999，而没有中间过程，这就是因为在updateSync函数运行过程中UI更新被阻塞，只有当它结束退出后才会更新UI。

**点击异步DEMO**：你会看到UI界面上从0到999快速地更新过程，这就是异步执行的结果。
函数里先声明了一个局部变量i和嵌套函数updateLater，然后调用了updateLater，在这个函数中先是更新output结点的内容为i，
然后通过setTimeout让updateLater函数异步执行。这实际是一种递归调用。任何for循环都可以改造成递归调用的形式。

###为什么用了setTimeOut(fn,0)后，还是能看到快速的更新呢？

这是因为虽然他的delay设置为0，几乎是即时触发，但还是被添加到了执行队列后面，但就是这个过程，渲染已经完成了，当他回调函数执行时，输出来的已经是更新后的值了。

以上结果很显然，异步操作不会阻塞UI，你可以继续执行浏览器其他操作。让UI操作更流畅，但异步编程也有坏处，如上面代码，使用`setTimeout`的异步方式，在代码整体执行效率来看，要比同步执行耗时更长时间。同时由于是异步执行，打断了原有代码的执行顺序，造成嵌套的函数调用，破坏了原有的简单逻辑，让代码难以读懂。

在判断是否执行完毕时，在同步编程中很方便实现，代码写在for循环后面就行了。而异步的话，则需要做一些判断。

还是以上的例子，如何在循环结束后执行回调？可以使用`Jquery`的`$.when`，和`$.Deferred`方法，当然也可以自己写回调函数，但是看起来没那么优雅。
{% highlight javascript %}
	var wait = function(){
        var dtd = $.Deferred();
        var i = 0;
        function updateLater() {
            $('#js_output').text(i++);
            if (i < 1000) {
                setTimeout(updateLater, 0);
            }
            if(i == 1000){
                dtd.resolve(); // 改变Deferred对象的执行状态
            }
        }
        updateLater();
        return dtd.promise(); // 返回promise对象
    }
    var updateAsyncBack = function(){
        $.when(wait()).done(function(){
            alert('done!');
        })
    }
{% endhighlight javascript %}

### 扩展阅读 

* [前端异步解决方案——mmDeferred – 司徒正美](http://www.chawenti.com/articles/19447.html)
* [深入理解JavaScript定时机制](http://www.laruence.com/2009/09/23/1089.html)
* [How JavaScript Timers Work](http://ejohn.org/blog/how-javascript-timers-work/)
* [Events and timing in-depth](http://javascript.info/tutorial/events-and-timing-depth)