---
layout: post
title: "用git和jekyll来发表文章,并同步到github"
categories:
- Notes
tags:
- Jekyll
- Github


---

可以使用下面的命令来创建文章

###创建一篇日志

发布日志前,先在配置文件_config.yml中设置URL格式

    本站的格式为:
    permalink: /:categories/:title/
    其他格式参考: https://github.com/mojombo/jekyll/wiki/Permalinks

然后运行命令：

{% highlight bash %}
$rake post title="about this blog" 
##这个名字将会在url中呈现，所以尽量短些好
##Creating new post: ./_posts/2012-12-05-about-this-blog.md
{% endhighlight bash %}

到_post目录下找到刚才建立的文件，然后编辑文件。设置title,description,category,tags等，再就是用markdown来写文章了。

### 创建一个页面

{% highlight bash %}
$rake page name="about.md"
##Creating new page: ./about.md
{% endhighlight bash %}

### 创建一个嵌套的页面

{% highlight bash %}
$rake page name="pages/about.md"
##Creating new page: ./pages/about.md
{% endhighlight bash %}

### 创建一个路径页面

{% highlight bash %}
$rake page name="pages/about"
##Creating new page: ./pages/about/index.html
{% endhighlight bash %}

Jekyll也提供了许多预设的页面例子,以供参考.你可以学习和按自己的需要自定义它. 注意：如果用notpad++来编辑时，要设置文件的格式为 “以UTF-8无BOM格式编码” 否则提交会出现乱码情况

编辑完成后要先在本地预览一下，再提交到github。一般使用jekyll内置的服务器，运行一下代码：

{% highlight bash %}
$jekyll serve --watch
{% endhighlight bash %}

然后浏览器打开http://localhost:4000，看下页面没有问题后可以提交：

{% highlight bash %}
$git add .
$git commit -m "post a article about how to post a article"
$git push origin master
{% endhighlight bash %}

如果在目录下删除了某个文件，得用git删除才能够在github上看到删除的结果，否则只是本地删除了，github上没有删除。删除文件后要提交，代码如下：

{% highlight bash %}
$git rm -rf XXX.md
$git commit -m "comment"
$git push origin master
{% endhighlight bash %}

### 过程中出现的问题

1.GBK编码错误

 运行 *jekyll serve –-watch* 在本地测试时出现错误:

    Liquid error: invalid byte sequence in GBK

这个问题是在 Windows 下出现的，英文博文没问题，中文博文就会报错，原因是你所使用的控制台并不能工作 UTF-8。

临时办法：
    
    在执行 jekyll 命令前，将当前控制台的代码格式转为 UTF-8:

{% highlight bash %}
$export LC_ALL=en_US.UTF-8
$export LANG=en_US.UTF-8
$jekyll serve --watch
{% endhighlight bash %}

永久办法：

    添加两对用户自定义的环境变量，LC_ALL=en_US.UTF-8 和 LANG=en_US.UTF-8。
    然后在git安装目录Git\etc\profile文件里加入以下内容

{% highlight bash %}
$export LC_ALL=en_US.UTF-8
$export LANG=en_US.UTF-8
{% endhighlight bash %}

2.运行jekyll serve --watch时出现的编码问题

    "Ruby193/lib/ruby/gems/1.9.1/gems/jekyll-0.11.2/lib/jekyll/convertible.rb:29:in ‘read_yaml’: 
    invalid byte sequence in GBK (ArgumentError)"

解决办法：

    找到ruby目录下gems/jekyll-0.11.0/lib/jekyll/convertible.rb29行修改为下面的内容：
    self.content = File.read(File.join(base, name), :encoding => "utf-8")