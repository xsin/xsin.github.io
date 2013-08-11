---
layout: post
title:  "Jekyll中如何设置指定文章的自定义样式"
date:   2013-08-12 13:08:02
categories: 
- Notes 
tags:
- Jekyll

---

假设你的jekyll站点有标准的结构：

    |-- _layouts
    |   |-- default.html
    |   |-- post.html
    |-- _includes
    |-- _posts
    |   |-- 1970-01-01-placeholder-post.md
    |-- index.html


### 改下模版文件default.html

在主样式引用代码下面增加已下代码[Liquid](https://github.com/shopify/liquid/wiki/liquid-for-designers) 代码：

{% highlight html%}
{% raw %} 
{% if page.style %}
 <style type="text/css">
     {{ page.style }}
 </style>
{% endif %}
{% endraw %}
{% endhighlight html%}

### 在文章页中添加自定义的style变量

{% highlight html%}
---
layout: post
title: Placeholder post
style: |
  body {
		background: HoneyDew; 
	}
---

Your post content
{% endhighlight html%}