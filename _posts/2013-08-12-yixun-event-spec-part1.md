---
layout: post
title:  "活动重构规范Part1-活动页面的基本框架"
date:   2013-08-12 14:08:12
categories: 
- Docs
tags:
- Yixun
- Yixun-Event

---

    “离娄之明，公输子之巧，不以规矩，不能成方圆。” -- 战国·邹·孟轲《孟子·离娄上》

页面框架的样式命名基于对内容模块的基本划分方式，活动页面也不例外。
为了制定统一的编码规范，我们需要对活动页面的基本框架结构形成一致的理解和认识。

    1.活动主体内容 (.act_wrapper)
    |-- 2.主体内容内嵌层，可选 (.act_wrapper_inner)
    |-- |-- 3.1 活动通栏 (.act_content，可看成h5里面的article)
    |-- |-- |-- 4.活动楼层 (.act_sec，可看成h5里面的section)
    |-- |-- |-- |-- 5.1 普通内容碎片 (.act_flag)
    |-- |-- |-- |-- |-- 6.1 icon组件 (.act_icon)
    |-- |-- |-- |-- |-- 6.2 按钮组件 (.act_btn)
    |-- |-- |-- |-- 5.2 背景链接热区 (.act_hotlnk)
    |-- |-- |-- |-- 5.3 其他内容碎片 (.act_xxx)
    |-- |-- 3.2 活动背景 (.act_bgs)

### 页面基本框架代码

{% highlight html %}

<!--S 活动主体内容-->
<div class="act_wrapper">
    <!--内容内嵌层，可选，有时候做背景图效果需要用到-->
    <div class="act_wrapper_inner">
        
        <!--!!通栏内容A-->
        <!--注：通栏是不设宽度的-->
        <div class="act_content act_contentA">
            
            <!--!!楼层1-->
            <!--一个通栏里可以有N个楼层-->
            <!--楼层是设定宽度的，为窄版页面规范宽度990px-->
            <div class="act_sec act_sec1">
                
                <!--!!绝对定位的内容碎片-->
                <!--内容碎片为页面结构的最小单位-->
                <!--它是绝对定位的-->
                <!--里面是各种个性内容模块、组件-->
                <div class="act_flag s1_flag1">
                    
                    <!--!!按钮-->
                    <a href="#" class="act_btn abtn_xxx"><span></span></a>

                    <!--!!图标-->
                    <i class="act_icon aico_xxx"><span></span></i>

                </div>

                <!--!!非绝对定位的内容碎片-->
                <!--xxx为碎片名称-->
                <div class="act_xxx"></div>

            </div>

        </div>

        <!--有时候一个活动根据需要会有多个通栏-->
        <!--通栏内容B-->
        <!--注：通栏是不设宽度的-->
        <div class="act_content act_contentB"></div>

        <!--!!大背景-->
        <div class="act_bgs">
            <div class="act_bg act_bg1"></div>
            <div class="act_bg act_bg{n}"></div>
        </div>
    
    </div>
</div>
<!--E 活动主体内容-->

{% endhighlight html %}