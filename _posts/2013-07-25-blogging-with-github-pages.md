---
layout: post
title:  "使用 GitHub Pages 建立博客"
date:   2013-07-25 14:17:59
categories: 
- Notes 
tags:
- Jekyll
- GitHub

---

## GitHub Pages
---

可以利用 [GitHub Pages](http://pages.github.com/ "GitHub Pages") 创建个人博客。对于小白，首先要知道什么是 Git 和 GitHub。当然，不知道也无所谓。但是利用 GitHub Pages 写博客（大多数程序员用其当笔记本），必须满足以下条件：

* 喜欢折腾；
* 喜欢简洁和格式化；
* 学会使用 [Markdown](http://daringfireball.net/projects/markdown/ "Markdown") 或其他一种标记语言

这里并不想详细写出建立 GitHub Pages 的每一步，因为关于它的建立、设置、使用网上的资料已经很详细。

## 创建 GitHub 账户
---

当然你要有一个 [GitHub](https://github.com/) 账户。注册成功后参照下面的页面下载或配置本地 Git 环境。

* <https://help.github.com/articles/set-up-git>

Windows 用户建议使用 GitHub 的 native app。非常直观好用，不用（相对）繁琐的命令行操作。

## 创建 GitHub Page

---

每一个 GitHub 分配了一个形如 username.github.io 的个人网址。比如这里是 oxox.github.io。但是这个网址默认是没有启用的。按照下面页面指示的方法利用官网的 Automatic Page Generator 创建 GitHub Page。

* <https://help.github.com/articles/creating-pages-with-the-automatic-generator>

## 使用本地 GitHub app 

---

使用 GitHub app。将建立的空 repo "username.github.io" clone 到本地。如果是 OS X/Linux 环境，可以按照 Jekyll 官网给的方法很轻松的创建本地 Jekyll 环境，在本地编译调试产生一个默认的网站。Windows 下似乎也有方法创建本地环境，但是似乎比较繁琐。

一个好办法是在 GitHub 搜索并 fork 别人的模板，例如 GitHub 创始人给出的一些网站：

* [https://github.com/mojombo/jekyll/wiki/sites](https://github.com/mojombo/jekyll/wiki/sites)

把 fork 的 repo 下载下来，复制粘贴到之前 clone 到本地的文件夹内，然后进行相应的修改。这种“剽窃”在开源社区是合理的，但是注意保留作者的信息（如果作者有申明）。

## 利用 Markdown 写博客

---

Markdown 其实不是一种新语言，只是 HTML 的一种转换器。语法可参照官方的 [Syntax](http://daringfireball.net/projects/markdown/syntax)。编辑器这里推荐：

* [Mou](http://mouapp.com/) (OS X)
* [MarkdownPad](http://markdownpad.com/) (Windows)

编辑好的文件保存为 .md 格式文件，按照要求个文件名格式保存在 _post 目录下。

然后使用本地环境编译，然后 push 或者 sync 所有文件到 GitHub。 .md 文件都得转换成 html 格式文件才能用浏览器查看。所以，如果像 Windows 系统没有安装 Ruby 和 Jekyll 环境的是不行的。但是可以在没有 Jekyll 环境的 Windows 电脑上利用 Markdown 文件写文章，把 .md 文件 sync 到 GitHub，然后等有时间的时候再在 OS X 的电脑中编译并 sync。 