---
layout: post
title:  "活动重构规范Part3-如何用模板快速制作活动"
date:   2013-08-13 10:33:12
categories: 
- Docs
tags:
- Yixun
- Yixun-Event

---

    “离娄之明，公输子之巧，不以规矩，不能成方圆。” -- 战国·邹·孟轲《孟子·离娄上》

本文介绍如何使用活动模板快速构建活动。利用已有的模板可让活动制作的效率大幅提升，具体参详以下步骤。

### 准备工作

1. ps一个
2. 你喜欢的任何编辑器，推荐[sublime](http://www.sublimetext.com/)
3. less编译工具，推荐[koala](http://koala-app.com/)


### Step1 拷贝模版

    1.1 需求目录名称按yydd_xx的格式改下
    1.2 不同发布方式有不同的模版，在svn位置也不一样
    1.3 模板默认你用less，如果不用less请删除相关less目录
        推荐less自动编译工具koala

* 走运营平台发布的活动模板

    > {活动svn url}/2013/yydd_xx/

* 正常发布的活动

    > {活动svn url}/{html|css}/event/yydd_xx/index.html


### Step2 根据PSD修改基本的配置变量

到了这一步，一些基本的变量是可以确定的，例如活动背景色、字体色、背景图宽度、主题内容宽度等等。

{% highlight css %}
@fontYahei:           "\5FAE\8F6F\96C5\9ED1","\9ED1\4F53"; //雅黑字体
@bgContent:             #081653;                           //活动背景色
@colorContent:          #333333;                           //内容字体色
@colorEM:               #ff662a;                           //内容字体强调色
@bgWidth:               1980;                              //背景图宽度
@contentWidth:          990;                               //主体内容宽度，规范是990，不符合应该向设计师反馈
@contentMinHeight:      1000px;                            //主体
@bgSection:             transparent;                       //楼层背景色
@lnkColor:              #333333;                           //链接颜色
@spriteHoverGap:        175;                               //雪碧图中正常态与hover态的间隔。用于less自动计算hover态的位置
@spriteWidth:           343px;                             //雪碧图宽度
@spriteHeight:          658px;                             //雪碧图高度
@bgScrollbar:           #f1f1f1;                           //滚动条背景颜色
@colorScrollbar:        #203053;                           //滚动条颜色
@borderScrollbar:       transparent;                       //滚动条边框色
{% endhighlight css %}

### Step3 切背景图、雪碧图，同时更新图片的配置变量

背景图搞完后，整个页面的基本样子就出来了。

{% highlight css %}
@imgPrefix0:             "/icson/img/event/common/";    //活动公共图片目录
@imgPrefix1:             "/icson/img/event/yydd_xx/";    //活动私有图片目录
@img0:      ~"@{imgPrefix1}sprite.png";      //活动私有雪碧图
@img1:      ~"@{imgPrefix1}img_1.jpg";       //以下为其它背景图
@img2:      ~"@{imgPrefix1}img_2.jpg";
@img3:      ~"@{imgPrefix1}img_3.jpg";
@img4:      ~"@{imgPrefix1}img_4.jpg";
@img5:      ~"@{imgPrefix1}img_5.jpg";
@img6:      ~"@{imgPrefix1}img_6.jpg";
@img7:      ~"@{imgPrefix1}img_7.jpg";
@img8:      ~"@{imgPrefix1}img_8.jpg";
@img9:      ~"@{imgPrefix1}img_9.jpg";
@img10:      ~"@{imgPrefix1}img_10.jpg";
@img11:      ~"@{imgPrefix1}img_11.jpg";
@img12:      ~"@{imgPrefix1}img_12.jpg";
@img13:      ~"@{imgPrefix1}img_13.jpg";
@img14:      ~"@{imgPrefix1}img_14.jpg";
@img15:      ~"@{imgPrefix1}img_15.jpg";
@img16:      ~"@{imgPrefix1}img_16.jpg";
@img17:      ~"@{imgPrefix1}img_17.jpg";
@img18:      ~"@{imgPrefix1}img_18.jpg";
@img19:      ~"@{imgPrefix1}img_19.png";
@img20:      ~"@{imgPrefix1}img_20.jpg";
@img21:      ~"@{imgPrefix1}img_21.jpg";
@img22:      ~"@{imgPrefix1}img_22.jpg";
@img99:      ~"@{imgPrefix1}img_99.png";
{% endhighlight css %}

### Step4 活动通栏、楼层、内容碎片的构建

到了这里，页面的骨架、整体样子已经出来了，接下来你需要根据PSD组织页面的血肉：

    注：页面的私有样式在_main.less里面。

1. 通栏(act_content)
2. 楼层(act_sec)
3. 碎片(act_flag|act_xxx)
4. 其它另类内容

如果你对活动页面的架构不清楚，请阅读以下提到的系列文章。

### Step5 发布页面

#### 如果走运营平台发布

这个有点蛋疼，你需要进行以下各项工作（这里省去一大陀和商品组、广告组相关的东西）：

1. 熟悉平台的模版变量，将静态页面转换成平台需要的模板
    
    > 为了便于维护，建议将发布用的模版文件保存至index-publish.html。
    注：我们的重构模板利用less自动生成了样式模板文件style.remote.css，每次修改样式后拷贝至index-publish.html中即可

2. 到平台上新建一个活动

    注:请使用优化后的模板“2013优化模板”，编号为10643

3. 将index-publish.html中的内容拷贝至第2步建立的活动中

4. 各种预览、各种等待，没问题发布

#### 如果走正常发布方式

请参考ON里面的发布文档，不懂咨询joy。

### 线上活动案例

[易迅会员日](http://event.yixun.com/event/116389bd6.html)

### 系列文章

> * Part1 [活动重构规范Part1-活动页面的基本框架](/docs/yixun-event-spec-part1/)
 * Part2 [活动重构规范Part2-活动页面模板介绍](/docs/yixun-event-spec-part2/)