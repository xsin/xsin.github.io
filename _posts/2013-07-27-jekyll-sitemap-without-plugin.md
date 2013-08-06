---
layout: post
title:  "不使用插件为 Jekyll 添加 Sitemap"
date:   2013-07-27 14:17:59
categories: 
- Notes 
tags:
- Jekyll
- Sitemap

---

将下面的代码保存为 sitemap.xml 文件保存在本地站点 repo 根目录下，编译后 push 到 GitHub 即可。

{% highlight django %}
{% raw %}
---
sitemap:
    priority: 0.7
    changefreq: monthly
    lastmod: 2013-07-27T12:49:30-05:00
---
 
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  {% for post in site.posts %}
  <url>
    <loc>{{ site.url }}{{ post.url }}</loc>
    {% if post.lastmod == null %}
    <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
    {% else %}
    <lastmod>{{ post.lastmod | date_to_xmlschema }}</lastmod>
    {% endif %}
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  {% endfor %}
  {% for page in site.pages %}
  {% if page.sitemap != null and page.sitemap != empty %}
  <url>
    <loc>{{ site.url }}{{ page.url }}</loc>
    <lastmod>{{ page.sitemap.lastmod | date_to_xmlschema }}</lastmod>
    <changefreq>{{ page.sitemap.changefreq }}</changefreq>
    <priority>{{ page.sitemap.priority }}</priority>
  </url>
  {% endif %}
  {% endfor %}

</urlset>
{% endraw %}
{% endhighlight %}

参考：<http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/>