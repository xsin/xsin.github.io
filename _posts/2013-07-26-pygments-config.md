---
layout: post
title:  "Jekyll 代码高亮利器 Pygments 配置"
date:   2013-07-26 14:17:59
categories: 
- Notes 
tags:
- Jekyll
- Pygments

---

[Pygments](http://pygments.org/) 是 Jekyll 最常用的代码高亮程序。假设 Python 的 easy_install 已经可用，则执行

	easy_install Pygments
	
安装 Pygments.

Pygments 自带多种样式。在 Python 中用下面的命令可以查看所有样式列表：

{% highlight pycon%}
>>> from pygments.styles import STYLE_MAP
>>> STYLE_MAP.keys()
['monokai', 'manni', 'rrt', 'perldoc', 'borland', 'colorful', 'default', 'murphy', 'vs', 'trac', 'tango', 'fruity', 'autumn', 'bw', 'emacs', 'vim', 'pastie', 'friendly', 'native']
{% endhighlight pycon %}

关于不同样式，可以在 [Demo](http://pygments.org/demo) 页面选择一个 demo，再在右边样式列表中选择不同样式查看效果。

下一步是生成所需的 CSS 文件。假设我们想使用 `friendly` 样式，则在 Terminal 或 cmd 进入 CSS 所在路径下执行

	pygmentize -S friendly -f html > highlight.css

则产生一个 `highlight.css` 文件。

下面介绍如何在 Jekyll 中使用 Pygments，假设一段代码需要被高亮，则在模板里使用以下 [Liquid](http://liquidmarkup.org/) 代码
	
	{% raw %} 
	{% highlight shortname %}
		代码内容
	{% endhighlight shortname %}
	{% endraw %}

name 是不同语言对应的短名称，可以在[这里](http://pygments.org/docs/lexers/)查看。
