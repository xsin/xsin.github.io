---
layout: post
title:  "Escape Liquid 模板标签的方法"
date:   2013-07-26 16:17:59
categories: 
- Notes 
tags:
- Liquid
- Jekyll
---

Jekyll 网站模板使用的的 Liquid 模板语言。当网页中要展示某段 Liquid 模板代码本身时，需要使用 raw 标签进行 escape：

	{ % raw % } 
		Liquid 代码内容
	{ % endraw % }

但是，如何 escape 带有 raw 标签的代码？比如上面这个，我只能把百分号和括号写开，不然无法编译成功。