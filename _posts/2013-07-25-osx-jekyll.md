---
layout: post
title:  "OS X 下安装配置 Jekyll"
date:   2013-07-25 08:17:59
categories: 
- Notes 
tags:
- Jekyll
- GitHub
- OS X

---

## Xcode
---

在 Mac App Store 中搜索安装 [Xcode](https://developer.apple.com/xcode/‎)。

安装完毕后，进入 Xcode，在 `Preferences` 里的 `Downloads` 中安装 **Command Line Tools**.


## Ruby
---

OS X 自带 Ruby。在终端里输入

	ruby -v
	
即可查看所安装的 Ruby 版本。


## RubyGems
---

访问 <http://rubygems.org/pages/download> 下载 RubyGems 文件。将文件解压到本地，在终端执行：

	sudo ruby setup.rb


## Jekyll
---

终端执行

	gem install jekyll
	gem install rdiscount

执行时间可能较长。

若提示
>ERROR: Failed to build gem native extension

多半是因为没装 Xcode Command Line Tools 引起。

安装完毕后，在指定目录下执行

	jekyll new my-awesome-site
	cd my-awesome-site
	jekyll serve --watch
	
则可在浏览器中以 `localhost:4000` 访问。`--watch` 选项开启页面 regeneration，也就是修改页面后刷新浏览器立即可以看到更新。


## Pygments (语法高亮)
---

执行一下语句：

	sudo easy_install Pygment
	
Pygments 语法可参照 <http://pygments.org/docs/lexers/>


## 资源
---

下面列出学习 Jekyll/Git/Markdown 的一些好资源：

* Jekyll: <http://jekyllrb.com/docs/home/>
* Markdown: <http://daringfireball.net/projects/markdown/>
* Github: <https://help.github.com/>
* GotGithub: <http://www.worldhello.net/gotgithub/>
