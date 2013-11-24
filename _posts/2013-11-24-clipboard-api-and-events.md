---
layout: post
title:  "Clipboard API实现截图粘贴到网页"
date:   2013-11-24 11:16:59
author: hugo
categories: 
- Notes 
tags:
- javascript
- Clipboard

---
[Clipboard API and events](http://dev.w3.org/2006/webapi/clipops/) 里面描述了剪切板事件onpaste，通过onpaste可以访问剪切板数据，然后使用blob、和FileReader方法将剪切板数据转为dataurl即可。

类似QQ截图，然后直接粘贴到网页上传。非常方便。

相关代码片段：[http://jsfiddle.net/baofen14787/8yxc5/](DEMO)

{% highlight javascript %}
/**
 * 通过reader方式生成dataurl图片
 * @param event
 */
function handlePaste(event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    console.log(JSON.stringify(items)); // will give you the mime types
    var blob = items[0].getAsFile();
    var reader = new FileReader();
    reader.onload = function(event){
        console.log(event.target.result)}; // data url!
    reader.readAsDataURL(blob);
}

/**
 * createObjectURL方式，创建图片文件
 * @param e
 */
function handlePaste2(e) {
    var items = e.originalEvent.clipboardData.items;

    for (var i = 0; i < items.length; ++i) {
        console.log(items[i].type);
        if (items[i].kind == 'file' && items[i].type == 'image/png') {
            var blob = items[i].getAsFile();
            var img = document.createElement('img');
            img.src = window.URL? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
            $("#js_editor").html(img);
        }
    }
};
{% endhighlight javascript %}
