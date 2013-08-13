---
layout: post
title:  "活动重构规范Part2-活动页面模板介绍"
date:   2013-08-12 17:13:12
categories: 
- Docs
tags:
- Yixun
- Yixun-Event

---

    “离娄之明，公输子之巧，不以规矩，不能成方圆。” -- 战国·邹·孟轲《孟子·离娄上》

基于[DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself)原则，本文接下来在[活动重构规范Part1-活动页面的基本框架](docs/yixun-event-spec-part1/)的基础上，将活动页面通用的html代码和css代码整理成模板。

### 模板位置：

    {活动svn url}/{html|css}/event/yydd_xx/index.html


### 为什么需要模板?

1. 统一编码规范，便于交叉维护
2. 最大限度减少编码工作量
3. 对于行为交互的组件（如分享微博、边栏导航），使用相同结构的组件，便于将交互逻辑封装到js中复用，避免每个活动都要写同样的js

### 模板的具体内容

    注：下面提到的基本结构、组件，我们在模板中定义了基本的样式，
    实际做活动时不需要考虑布局、不需要考虑背景图怎么定位。。。

1, 通栏 (act_content)

    通栏用于组织大块相关内容。顾名思义，通栏是不设宽度的，
    因此有时候可以根据需要在通栏内部私有背景图层。
    语义有点像h5中的article

{% highlight html %}
<div class="act_wrapper">
    <!--内容内嵌层，可选，有时候做背景图效果需要用到-->
    <div class="act_wrapper_inner">

        <!--!!通栏内容A-->
        <div class="act_content act_contentA">

        </div>

        <!--!!大背景-->
        <div class="act_bgs">
            <div class="act_bg act_bg1"></div>
            <div class="act_bg act_bg{n}"></div>
        </div>
    
    </div>
</div>
{% endhighlight html %}

2，背景图 (act_bgs)

    一般的活动只有一组背景图结构。
    有时候可根据需要在通栏内部设置该通栏私有的背景图层。
    
{% highlight html %}
<div class="act_bgs">
    <div class="act_bg act_bg1"></div>
    <div class="act_bg act_bg{n}"></div>
</div>
{% endhighlight html %}


    模板样式里做了大部分处理，你只需要指定图片地址，设定图片高度即可。

{% highlight css %}
.act_bgs{
    position:absolute;
    left:50%;
    top:0;
    z-index:1;
    width:~'@{bgWidth}px';
    @haftWidth:@bgWidth/2;
    margin-left:~'-@{haftWidth}px';
}
.act_bg{
    width:~'@{bgWidth}px';
    background-position:50% 0;
    background-repeat: no-repeat;
}
{% endhighlight css %}

3, 楼层 (act_sec)

    一个通栏里可以有N个楼层。
    每个楼层宽度为窄版的990px，通过less变量配置。
    sec_bg用于设置楼层私有背景图层；sec_hd、sec_bd、sec_ft根据需要取舍。
    语义有点像h5中的section (段落)。

{% highlight html %}
<div class="act_sec act_sec1">
    <div class="sec_bg"></div>
    <div class="sec_hd"></div>
    <div class="sec_bd"></div>
    <div class="sec_ft"></div>
</div>
{% endhighlight html %}

    楼层的模板样式

{% highlight css %}
.act_sec{
    background: @bgSection;
    position: relative;
    width: ~'@{contentWidth}px';
    margin:auto;
    overflow: hidden;
    .sec_hd,.sec_bd,.sec_ft{
        position:relative;
        z-index: 2;
    }
    .sec_bg{
        position:absolute;
        z-index: 1;
        top:0;
        left:0;
    }
}
{% endhighlight css %}

4, 内容碎片 (act_flag、act_xxx)

    内容碎片为页面结构的最小单位，里面是各种个性内容模块、组件。
    一个楼层里可以有N个内容碎片。
    根据定位方式不同碎片分为2种，绝对定位的碎片和其它碎片。
    绝对定位的碎片统一用act_flag作为基类名，其他碎片为act_xxx。

{% highlight html %}
<!--!!绝对定位的内容碎片-->
<div class="act_flag s1_flag1"></div>
<!--!!非绝对定位的内容碎片-->
<div class="act_xxx"></div>
{% endhighlight html %}

    绝对定位的碎片的模板样式，只定义了定位方式。个性样式定义width、height、top和left即可。

{% highlight css %}
.act_flag{
    position:absolute;
}
{% endhighlight css %}

5，背景图链接热区 (act_hotlnk)

    背景图链接热区用于在某个背景图位置添加链接。
    具有固定的html结构。
    私有活动样式只需要定义它的top和left值即可。

{% highlight html %}
<div class="act_hotlnk s1_flag5">
    <a title="xxx" href="#xxx"></a>
</div>
{% endhighlight html %}

    背景图链接热区的模板样式

{% highlight css %}
.act_hotlnk{
    position: absolute;
    a{
        display: block;
        .size(100%,100%);
        &:hover{
            text-decoration: none;
        }
    }
    .amod_icon span{
        cursor:pointer;
    }
}
{% endhighlight css %}

6, 图片按钮组件和图标组件

    * 图片按钮组件和图标组件使用类似的结构，抛弃传统的background-position的方式，
      使用span标签承载雪碧图，通过设置margin-top和margin-left来定位雪碧图的位置。
    * 按钮hover态可以利用less自动计算实现
    * 不用考虑png24的ie6问题，因为模板样式中已经给你处理好！

{% highlight html %}
<!--按钮-->
<a href="#" class="act_btn abtn_xxx"><span></span></a>
<!--图标-->
<i class="act_icon aico_xxx"><span></span></i>
{% endhighlight html %}

    图片按钮组件和图标组件的模板样式

{% highlight css %}
.act_btn{
    display:inline-block;
    position:relative;
    line-height:5000px;
    overflow:hidden;
    outline: none;
}
.act_icon{
    position: relative;
    display: inline-block;
    overflow:hidden;
}
.act_icon span, .act_btn span{
    cursor:default;
    position:absolute;
    left:0;
    top:0;
    width:@spriteWidth;
    height:@spriteHeight;
    background:url(@img0) 0 0 no-repeat;
    .ie6PNGFix(@img0);
}
.act_btn,.act_btn span{cursor:pointer;}
.act_btn:hover span{left:~'-@{spriteHoverGap}px';cursor:pointer;}
.act_btn:hover {*zoom:1;}
{% endhighlight css %}

7, 基本浮动列表 (act_list)

    * ul.act_list，li左浮动。自身清楚浮动所以不用加clearfix。
    * ul.act_list 适用于商品列表、链接列表。
    * ol.act_list li没有浮动，适用于活动规则

{% highlight html %}
<div class="act_goods">
    <ul class="act_list goods_list1">
        <li>
            <div class="act_good">
                ...
            </div>
        </li>
    </ul>
</div>
{% endhighlight html %}

    基本浮动列表的模板样式

{% highlight css %}
.act_list{
    overflow:hidden;
    *zoom:1;
    &:before,
    &:after {
        display: table;
        content: "";
        // Fixes Opera/contenteditable bug:
        // http://nicolasgallagher.com/micro-clearfix-hack/#comment-36952
        line-height: 0;
    }
    &:after {
        clear: both;
    }
    li{
        float:left;
        display: inline;
        margin-right:10px;
        &.last{
            margin-right:0;
        }
    }
}
ol.act_list li{
    float:none;
    width:auto;
    margin-left:0;
    display: list-item;
}
ol.act_list,ol.act_list li{
    list-style: decimal inside;
}
{% endhighlight css %}

8, 边栏导航组件

    less自动计算它的位置
    js自定处理它的交互效果

{% highlight html %}
<div id="actSideNav" class="act_sidenav">
    <!--背景图层-->
    <div class="sidenav_bg"></div>
    <!--头部，根据实际看是否需要-->
    <div class="sidenav_hd"></div>
    <!--主体，这里放具体的导航链接列表-->
    <div class="sidenav_bd"></div>
</div>
{% endhighlight html %}

    边栏导航组件的模板样式

{% highlight css %}
.act_sidenav{
    position: fixed;
    z-index: 100;
    top:auto;
    left:50%;
    @haftWidth:@contentWidth/2+8;
    margin-left:~'@{haftWidth}px';
    bottom:0px;
    _position:absolute;
    _top:200px;
    _bottom:auto;
    .size(176px,521px);
    .sidenav_bg{
        position:absolute;
        .size(176px,521px);
        top:0;
        left:0;
        z-index: 1;
        background: url(@img19) no-repeat;
        .ie6PNGFix(@img19);
    }
}
{% endhighlight css %}

9，其他助手类

    这个不解释了，看看类名就知道怎么用。

{% highlight css %}
.act_hide{display: none !important;}
.act_hidden{visibility: hidden !important;}
.act_show{display: block !important;}
.act_visible{visibility: visible !important;}
.act_fl{float:left;display: inline;}
.act_fr{float:right;display: inline;}
{% endhighlight css %}


### Part3预告

> [如何使用模板快速制作活动？](docs/yixun-event-spec-part1/)