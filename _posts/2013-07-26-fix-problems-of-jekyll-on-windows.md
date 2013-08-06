---
layout: post
title:  "Windows 安装 Jekyll 若干问题的解决"
date:   2013-07-26 09:17:59
categories: 
- Notes 
tags:
- Jekyll
- Windows

---

Jekyll 官方网站是以外链的形式给出的 [Windows 下安装 Jekyll 方法](http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html)。这个方法总体上是可行的，但是这篇文章写于 2011 年，并且没有考虑中文环境下的问题，所以安装过程中会碰到种种问题。

---

一，软件版本问题。建议在 Windwos 7 中下载安装以下版本 Ruby 和 DevKit：

* [Ruby 1.9.3-p448](http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-1.9.3-p448.exe?direct)
* [DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe](https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe)

2.0 版本 Ruby 似乎会碰到一些问题。文章作者给出的一个便携版的 Jekyll 也挺坑爹，400+ M 保存在 Dropbox 上，下载解压花了我 1 个多小时，安装还不成功。主要就是因为他使用的是 Ruby 2.0。不用尝试这个了。

---

二，运行 `jekyll serve` 时显示

	Liquid Exception: No such file or directory - /bin/sh in ...

这个是语法高亮插件 Pygments 引起。解决方法是卸载最新版本的 Pygments （0.5.1+），重新安装 0.5.0 版本的 Pygments:

	gem uninstall pygments.rb --version "=0.5.2"
	gem install pygments.rb --version "=0.5.0"

---

三，和第二个问题类似，提示

	Liquid Exception: No such file or directory - python ...

原因是没将 Python 的路径添加为 PATH 环境变量。

---

四，运行 `jekyll serve` 不成功，显示

	 ... invalid byte sequence in GBK  ...

这个是中文编码引起的问题。一旦 post 中有中文字符就会出现这样的问题。当然这个是 Windows 下特有的问题。解决方法是将 `C:/Ruby193/lib/ruby/gems/1.9.1/gems/jekyll-0.11.2/lib/jekyll/convertible.rb` 文件 （路径可能与此不同）中的 

{% highlight ruby %}
self.content = File.read(File.join(base, name)) 
{% endhighlight ruby %}

改为

{% highlight ruby %}
self.content = File.read(File.join(base, name), :encoding => "utf-8")
{% endhighlight ruby %}

### References 

* <http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html>
* <http://stackoverflow.com/questions/17364028/jekyll-on-windows-pygments-not-working>
*  <http://chxt6896.github.io/blog/2011/12/01/blog-pygments.html>