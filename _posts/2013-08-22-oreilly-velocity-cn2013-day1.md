---
layout: post
title: "2013中国Velocity-Web性能与运维大会-Day1"
date:   2013-08-22 21:02:12
categories:
- Notes
tags:
- Velocity
style: |
    .schedule_table {
        width: 100%;
        border: 0;
        margin-top: 20px;
        margin-bottom: 20px;
        line-height:1.7;
    }

    .schedule_table th, .schedule_table td {
        border: solid #cccccc;
        border-width: 0px 0px 1px 0px;
    }

    .schedule_table th {
        background-color: #333;
        color: #ffffff;
        font-weight: normal;
        padding: 6px 8px;
    }

    .schedule_table td {
        background-color: #f6f6f6;
        padding: 5px 7px;
        vertical-align: top;
        font-size:.9em;
    }

    .schedule_table td.schedule_break {
        background-color: #EF4372;
        color:#fff;
    }
    .schedule_table_embedded td {
        border: none;
        padding: 0;
    }
    .topic{color:#666;font-size:.85em;line-height:1.5;}
    .topic_viewed b{color:green;}
    .topic_level0{text-decoration:line-through;font-style:italic;}
    .topic_level1{color:#333;font-size:1.1em;line-height:1.7;}
    .topic_level1 a{color:#EF4372;font-weight:bold;}

---

一路颠簸，下午总算平安回到了深圳，结束了为期两天的北京Velocity大会之旅。
深圳最近的天气也不知道怎么了，印象中已半月不见阳光，19号出发去北京时是大风暴雨，今儿回来时是全城雾霾，雾里之间还略泛紫光，这算啥米征兆嘛？！

这届的Velocity，亲见亲闻再加上随行同事在微信群里的各种说法和吐槽，整体上来说3个字——嘛嘛地。广告多，老外们集体水，差点儿以为走错会场。前端方向的主题演讲，幸好还有几个救场撑面的（已在下面日程表格中标红），推荐前端的同学参阅下他们的PPT，特别是最后一天PJ的[《16毫秒的优化——Web前端性能优化的微观分析》](http://velocity.oreilly.com.cn/2013/ppts/16_ms_optimization--web_front-end_performance_optimization.pdf)，估计好多同学听完都膜拜到跪了o(∩_∩)o。

### Day1日程及对应演讲稿地址

    导读：
    1. 日期标绿 - 表示本人选择参与过
    2. 中划线斜体 - 表示坑爹
    3. 标红 - 表示推荐

<table class="schedule_table" cellspacing="0">
<tbody><tr>
<td colspan="3" class="schedule_break"><b>08:00</b> 来宾登记（酒店二层）<br/></td>
</tr>
<tr>
<td colspan="3"><div class="topic topic_viewed"><b>09:30</b><br/>主题发言&nbsp;<a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=24">简单、通用的性能技巧</a>
<br/>Theo Schlossnagle
(OmniTI)</div>
</td>
</tr>
<tr>
<td colspan="3"><div class="topic topic_viewed"><b>10:00</b><br/>主题发言&nbsp;<a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=22">印象笔记在中国</a>
<br/>肖贺
(印象笔记)</div>
</td>
</tr>
<tr>
<td colspan="3"><div class="topic topic_viewed topic_level0"><b>10:30</b><br/>主题发言&nbsp;<a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=39">网站性能，贏在用户体验</a>
<br/>琚伟
(Compuware)</div>
</td>
</tr>
<tr>
<td colspan="3" class="schedule_break"><b>10:45</b> 上午茶歇<br/></td>
</tr>
<tr>
<td colspan="3"><div class="topic topic_viewed topic_level1"><b>11:05</b><br/>主题发言&nbsp;<a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=30">HTML5 的速度与激情</a>
<br/>王咏刚
(Google)</div>
</td>
</tr>
<tr>
<td colspan="3"><div class="topic topic_viewed"><b>11:20</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=21">Chrome资源调度</a>
<br/>陈智昌
(Google)</div>
</td>
</tr>
<tr>
<td colspan="3" class="schedule_break"><b>12:00</b> 自助午餐（宜客乐咖啡厅）<br/></td>
</tr>
<tr>
<th style="width: 33%;">会厅A</th>
<th style="width: 33%;">会厅B</th>
<th style="width: 33%;">会厅C</th>
</tr>
<tr>
<td colspan="1"><div class="topic topic_viewed"><b>13:30</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=11">Java Web应用诊断利器——Serviceability Agent</a>
<br/>梅路峣
(阿里巴巴)</div>
</td>
<td colspan="1"><div class="topic"><b>13:30</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=13">Taobao移动网页性能优化之路</a>
<br/>曹仁
(阿里巴巴)</div>
</td>
<td colspan="1"><div class="topic"><b>13:30</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=1">淘宝数据采集分析工具——Tsar</a>
<br/>李克
(阿里巴巴)</div>
</td>
</tr>
<tr>
<td colspan="1"><div class="topic topic_viewed"><b>14:30</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=3">大型JavaScript应用开发与维护</a>
<br/>Charlie Fiskeaux II
(OmniTI)</div>
</td>
<td colspan="1"><div class="topic"><b>14:30</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=20">Android高性能实践</a>
<br/>冯斌
(正点科技)</div>
</td>
<td colspan="1"><div class="topic"><b>14:30</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=40">应用交付链的测量和优化</a>
<br/>刘晓晋
(Compuware)</div>
</td>
</tr>
<tr>
<td colspan="3" class="schedule_break"><b>15:30</b> 下午茶歇<br/></td>
</tr>
<tr>
<td colspan="1"><div class="topic topic_viewed topic_level1"><b>15:50</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=8">Web APP的性能优化——Qzone touch海量服务性能优化实战</a>
<br/>石玉磊
(腾讯)</div>
</td>
<td colspan="1"><div class="topic"><b>15:50</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=27">JavaScript引擎的性能优化</a>
<br/>任寰
(奇虎360)</div>
</td>
<td colspan="1"><div class="topic"><b>15:50</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=16">58统一监管平台系统分析与设计</a>
<br/>姜中明
(58同城)</div>
</td>
</tr>
<tr>
<td colspan="1"><div class="topic topic_viewed"><b>16:50</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=29">结构化、用户驱动的Web性能优化</a>
<br/>Buddy Brewer
(SOASTA)</div>
</td>
<td colspan="1"><div class="topic"><b>16:50</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=41">挑战与机遇共存——超大规模网络应用的运维</a>
<br/>刘元
(雅虎北京研发中心)</div>
</td>
<td colspan="1"><div class="topic"><b>16:50</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=17">携程客户端网站性能及用户行为数据采集</a>
<br/>储诚栋
(携程旅行网)</div>
</td>
</tr>
<tr>
<td colspan="1"><div class="topic topic_viewed topic_level1"><b>17:50</b><br/><a target="_blank" href="http://velocity.oreilly.com.cn/2013/index.php?func=session&amp;id=7">贴吧性能优化实战</a>
<br/>雷志兴
(百度)</div>
</td></tr>
<tr></tr>
</tbody></table>

### Day1 推荐的3个演讲

#### Google-王永刚- HTML5的速度与激情

从HTML5诞生时开始，Google一如既往地站在Web前端技术的最前沿，不但在几乎所有产品线中实践和探索相关技术，还在Google主页涂鸦中创新性地使用HTML5技术构建不同凡响的交互式Doodle体验。作为交互式Doodle研发团队的一员，演讲者将以几个最受用户喜爱的交互式Doodle的研发细节为例，展示性能优化、交互式动画、游戏逻辑、图像渲染、多媒体等技术在创造最佳前端用户体验时的巨大潜力。

    HTML5 Doodles = Performance + Experience
    Google Doodle是98年开始的文化，从08年开始是个转折点，开始应用h5的技术
    （思考：yixun的前端文化？）

1，背景图叠加（视差滚动）与H5的结合应用

[Jules Verne Doodle](http://www.google.com/logos/2011/verne-hp.html)

背景与介绍：<http://www.google.com/doodles/jules-vernes-183rd-birthday>

2，Canvas-based 

[Roswell Doodle](http://www.google.com/logos/2013/roswell_66th_anniversary.html)

背景与介绍：<http://www.google.com/doodles/roswells-66th-anniversary>

    实现方法：
    The Animation - Sprited Images
    Canvas-based Sprite Animation : doodle.CanvasSprite类库 

#### 腾讯-石玉磊-Web APP的性能优化——Qzone touch海量服务性能优化实战

@Yuni这次在Velocity的演讲内容够干，会场座不虚席，推荐在做webapp或对webapp开发感兴趣的同学看下，可以藉此了解：

1. qzone webapp的页面管理方式
2. 测速方式
3. 各种优化方法（包括nodejs的应用）
4. 异步渲染与nodejs直出的性能差别
5. 拍照上传功能的实现、问题与解决办法
6. hybrid app中js与宿主通讯的实现方案

详细请[猛击这里下载PPT！](http://velocity.oreilly.com.cn/2013/ppts/web_app_performance_optimization_of_qzone_touch.pdf)


#### 百度-雷志兴-贴吧性能优化实战

提起@berg，我依稀记得在百度知道的时候他在隔壁组做百度的js库[tangram](http://tangram.baidu.com/)，没想到转去弄贴吧了。相对于别的互联网公司来说，百度的前端文化在我脑海里的整体印象一直都是“底子厚、流程化、规范化、系统化”，tangram、火麒麟、[fis](http://fis.baidu.com)。。。有不少的例子可以举，但唯有亲自在百度工作过你才能真切体会到其中的差异。

因为流程化、规范化、系统化，百度在最大程度上提升了前端工程师的效率，不过也正因为这“三化”，他们的开发模式较难被别的公司沿袭或吸收。流程化和系统化往往依赖于开发环境，而不同公司开发环境多少不同甚至迥异。[fis](http://fis.baidu.com)想在业界产生影响估计有点悬。

言归正传，@berg在这次的演讲主题中，对于性能优化，

有方法论，

    1. “监控=〉分析=〉优化=〉监控”，性能优化需要全过程性的、系统性的进行
    2. 分析结果的直观表达：分数>图表，性能分数的计算公式
    3. 关键性能指标：白屏、首屏时间

也有具体的实践方式，

    1. 数据分析工具: DynaTrace、Chrome Devtools
    2. 异步、并行加载 - 提升首屏时间
    3. 重要功能提前 - 提升可操作失焦
    4. 无线设备的优化
    ...


详细请[猛击这里下载PPT！](http://velocity.oreilly.com.cn/2013/ppts/performance_optimization_of_tieba_in_baidu.pdf)
