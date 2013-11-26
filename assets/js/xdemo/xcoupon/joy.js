/**
 * module description
 */
J('joy',function(M,V,C){
    // 获取用户uid
    M.userID = G.header.common.getCookie("yx_uid");
    // 获取用户qq
    M.userQQ = G.header.common.getCookie("yx_uin");

    // 获取用户名称
    M.getUserName  = function(data){
        var d = data;
        if(d.account.toString().indexOf('Login_QQ_') == 0 || 'true' === G.util.cookie.get('__BINDQQACCOUNT')){//QQ用户
            var cps_msg = G.util.cookie.get("cps_msg").split('|');
            if (cps_msg.length >= 2 && cps_msg[0] == d.uid) {
                cps_msg.shift();
                return G.util.parse.encodeHtml(cps_msg.join('|'));
            }
            else{
                var qq_nick = G.util.cookie.get("qq_nick").split('|');
                if (qq_nick.length >= 2 && qq_nick[0] == d.uid) {
                    qq_nick.shift();
                    return G.logic.login.cutString(G.util.parse.encodeHtml(qq_nick.join('|')), G.logic.login._loginNameCutLen);
                }
            }
        }
        else if(d.account.toString().indexOf('Login_Alipay_') == 0){//支付宝
            return G.logic.login.cutString(G.util.parse.encodeHtml(d.name || d.account), G.logic.login._loginNameCutLen);
        }
        else if (/^\d+@51fanli$/.test(d.account.toString())) {//51fanli
            var cps_msg = G.util.cookie.get("cps_msg").split('|');
            if (cps_msg.length >= 2 && cps_msg[0] == d.uid) {
                return cps_msg[1];
            }
        }
        else if (d.account.toString().indexOf('Login_SHAuto_') == 0) {//安悦用户
            return G.logic.login.cutString(G.util.parse.encodeHtml(d.account.substr(13)), G.logic.login._loginNameCutLen);
        }
        //易迅帐号
        return G.logic.login.cutString(G.util.parse.encodeHtml(d.name || d.account), G.logic.login._loginNameCutLen);
    };

    // G.util.token方法（global.js）
    M.token = {
        //给连接加上token
        addToken : function(url,type){
            //type标识请求的方式,jq标识jquery，lk标识普通链接,fr标识form表单,ow打开新窗口
            var token=this.getToken();
            //只支持http和https协议，当url中无协议头的时候，应该检查当前页面的协议头
            if(url=="" || (url.indexOf("://")<0?location.href:url).indexOf("http")!=0){
                return url;
            }
            if(url.indexOf("#")!=-1){
                var f1=url.match(/\?.+\#/);
                 if(f1){
                    var t=f1[0].split("#"),newPara=[t[0],"&g_tk=",token,"&g_ty=",type,"#",t[1]].join("");
                    return url.replace(f1[0],newPara);
                 }else{
                    var t=url.split("#");
                    return [t[0],"?g_tk=",token,"&g_ty=",type,"#",t[1]].join("");
                 }
            }
            //无论如何都把g_ty带上，用户服务器端判断请求的类型
            return token==""?(url+(url.indexOf("?")!=-1?"&":"?")+"g_ty="+type):(url+(url.indexOf("?")!=-1?"&":"?")+"g_tk="+token+"&g_ty="+type);
        },
        //获取转换后的token
        getToken : function(){
            var skey=G.util.cookie.get("skey"),
                token=skey==null?"":this.time33(skey);
                return token;
        },
        //skey转token
        time33 : function(str){
            //哈希time33算法
            for(var i = 0, len = str.length,hash = 5381; i < len; ++i){
               hash += (hash << 5) + str.charAt(i).charCodeAt();
            };
            return hash & 0x7fffffff;
        }
    }

    // 错误信息 模板
    V.errTemplate = J.heredoc(function(){/*
        <div class="xbar_tips_error">
            请登录或刷新页面。
        </div>
    */});

    // 加载中 模板
    V.loadingTemplate = J.heredoc(function(){/*
        <div class="xbar_tips_loading">
            数据加载中
        </div>
    */});

    // 个人中心 模板
    V.mineTemplate = J.heredoc(function(){/*
        <div class="xbar_mineinfo" id="xbarMine">
            <div class="xbar_mineinfo_info">
                <img src="{{img}}" alt="">
                <p><b>{{name}}</b></p>
                <p>{{level_name}}</p>
            </div>
            <div class="xbar_mineinfo_detail">
                <p class="xbar_mineinfo_item">
                    <span class="xbar_mineinfo_tit">我的积分：</span>
                    <span class="xbar_mineinfo_cnt">{{jifen}}</span>
                </p>
                <p class="xbar_mineinfo_item">
                    <span class="xbar_mineinfo_tit">消费金额：</span>
                    <span class="xbar_mineinfo_cnt">&yen; {{fee}}</span>
                </p>
            </div>
        </div>
    */});

    // 购物车 模板
    V.cartTemplate = J.heredoc(function(){/*
        <div class="xbar_goods clearfix xbar_cartinfo" id="xbarCart">
            <ul class=" xbar_cartinfo_list">
            {{#data}}
                <li>
                    <a href="{{url}}" class="xbar_goods_img" target="_blank">
                        <img src="{{img}}" alt="">
                    </a>
                    <div class="xbar_goods_info">
                        <p class="xbar_goods_name">
                            <a href="{{url}}" target="_blank">{{name}}</a>
                        </p>
                        <p class="xbar_goods_price">
                            <span><i>&yen;</i>{{price}}</span><i>&times;</i><span>{{count}}</span>
                        </p>
                    </div>
                </li>
                {{/data}}
            </ul>
            <div class="xbar_cartinfo_total">
                {{#total}}
                <p>共<b>{{count}}</b>件商品，总计：<b>{{price}}</b></p>
                <p>满29元免运费</p>
                <a href="http://buy.yixun.com/showcart.html" class="mod_btn mod_btn_bg2 mod_btn_large" target="_blank">去结算<i></i></a>
                {{/total}}
            </div>
        </div>

    */});

    // 最近浏览 模板
    V.viewTemplate = J.heredoc(function(){/*
        <ul class="xbar_goods clearfix" id="xbarView">
            {{#data}}
            <li>
                <a href="{{url}}" class="xbar_goods_img" target="_blank">
                    <img src="{{img}}" alt="">
                </a>
                <div class="xbar_goods_info">
                    <p class="xbar_goods_name">
                        <a href="{{url}}" target="_blank">{{name}}</a>
                    </p>
                    <p class="xbar_goods_price">
                        <i>&yen;</i><span>{{price}}</span>
                    </p>
                </div>
            </li>
            {{/data}}
        </ul>
    */});

    // 猜你喜欢 模板
    V.likeTemplate = J.heredoc(function(){/*
        <ul class="xbar_goods clearfix" id="xbarLike">
            {{#data}}
            <li>
                <a href="{{url}}" class="xbar_goods_img" target="_blank">
                    <img src="{{img}}" alt="">
                </a>
                <div class="xbar_goods_info">
                    <p class="xbar_goods_name">
                        <a href="{{url}}" target="_blank">{{name}}</a>
                    </p>
                    <p class="xbar_goods_price">
                        <i>&yen;</i><span>{{price}}</span>
                    </p>
                </div>
            </li>
            {{/data}}
        </ul>
    */});

    // 订单 模板
    V.orderTemplate = J.heredoc(function(){/*
        <div class="xbar_orderinfo_wrap">
            {{#data}}
            <div class="xbar_orderinfo">
                <div class="xbar_orderinfo_hd">
                    <a href="http://base.yixun.com/orderdetail-{{businessDealId}}-html" target="_blank" class="xbar_orderinfo_num">订单：{{businessDealId}}</a><!-- <span class="xbar_orderinfo_count">共1件</span> --><span class="xbar_orderinfo_state">{{bdealGenTime}}</span>
                </div>
                <div class="xbar_orderinfo_bd">
                    {{#dealList}}
                    <div class="xbar_orderinfo_item">
                        <div class="xbar_orderinfo_title">
                            共计：<span class="xbar_orderinfo_title_num">&yen;{{dealPayment}}</span><span class="xbar_orderinfo_title_status">{{dealStateStr}}</span>
                        </div>
                        <div class="xbar_orderinfo_pic">
                            <ul>
                                {{#productList}}
                                <li>
                                    <a href="http://item.yixun.com/item-{{productId}}.html" target="_blank" title="{{itemTitle}}"><img src="{{itemUrl}}" alt=""></a>
                                </li>
                                {{/productList}}
                            </ul>
                        </div>
                    </div>
                    {{/dealList}}
                </div>
                <!-- <div class="xbar_orderinfo_info">
                    <p class="xbar_orderinfo_row">
                        <span class="xbar_orderinfo_row_tit">总额：</span>
                        <span class="xbar_orderinfo_row_cnt"><span class="xbar_orderinfo_price">¥9999.00</span>（微信支付）</span>
                    </p>
                    <p class="xbar_orderinfo_row">
                        <span class="xbar_orderinfo_row_tit">时间：</span>
                        <span class="xbar_orderinfo_row_cnt">2013-8-22</span>
                    </p>
                    <div class="xbar_orderinfo_btn">
                        <a href="#" class="mod_btn mod_btn_large">去支付</a>
                    </div>
                </div> -->
            </div>
            {{/data}}
        </div>
    */});

    // 收藏夹 模板
    V.favTemplate = J.heredoc(function(){/*
        <ul class="xbar_goods clearfix" id="xbarFav">
            {{#data}}
            <li>
                <a href="{{url}}" class="xbar_goods_img" target="_blank">
                    <img src="{{img}}" alt="">
                </a>
                <div class="xbar_goods_info">
                    <p class="xbar_goods_name">
                        <a href="{{url}}" target="_blank">{{name}}</a>
                    </p>
                    <p class="xbar_goods_price">
                        <i>&yen;</i><span>{{price}}</span>
                    </p>
                </div>
            </li>
            {{/data}}
        </ul>
    */});

    M.showTemplate = function(name){
        switch(name){
            case "mine":
                $.ajax({
                     url:'http://base.yixun.com/json.php?mod=vip&act=getVipInfo&uid='+M.userID,
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_mine .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        console.log(result);
                        if (result.errno == 0) {
                            // console.log(result);
                            var info = result.data;
                            var _mineInfo = [];
                            _mineInfo.push({
                                img : "http://qlogo2.store.qq.com/qzone/"+info.qq+"/"+info.qq+"/100",
                                name : M.userName,
                                level_name : info.levelDesc,
                                jifen : info.point,
                                fee : info.experience+info.virtualExpPoints
                            });
                            console.log(_mineInfo);
                            $("#xpanel_mine .xpanel_inner").html(J.toHtml(V.mineTemplate,_mineInfo[0]));
                        }else{
                            $("#xpanel_mine .xpanel_inner").html(V.errTemplate);
                        }
                     }
                });
                // $("#xpanel_mine .xpanel_inner").html(J.toHtml(V.mineTemplate,""));
                break;
            case "cart":
                $.ajax({
                     url:'http://cart.buy.yixun.com/minicart/minilistislogincmem?uid='+M.userID+'&pnum=10',
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_cart .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        console.log(result);
                        if (result.errno == 0) {
                            var _goodsInfo = {
                                data : [],
                                total : []
                            };
                            var data = result.data,
                                totalCount = 0,
                                totalPrice = 0;
                            // console.log(data);
                            $.each(data, function(i, item) {
                                _goodsInfo.data.push({
                                    url : 'http://item.'+G.header.domain+'/item-' + item.product_id + '.html',
                                    name : item.name,
                                    img : G.header.common._getPicUrl(item.product_char_id,"middle", 0),
                                    price : (item.price / 100).toFixed(2),
                                    count : item.buy_count
                                });
                                totalCount += parseInt(item.buy_count),
                                totalPrice += (parseInt(item.price)*parseInt(item.buy_count));
                            });
                            _goodsInfo.total.push({
                                price : (totalPrice / 100).toFixed(2),
                                count : totalCount
                            });
                            // console.log();
                            $("#xpanel_cart .xpanel_inner").html(J.toHtml(V.cartTemplate,_goodsInfo));
                        }else{
                            $("#xpanel_cart .xpanel_inner").html(V.errTemplate);
                        }
                     }
                });
                break;
            case "fav":
                $.ajax({
                     url:'http://base.yixun.com/json.php?mod=favor&act=getlist&uid='+M.userID+'&page=1&perpage=100',
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_fav .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        console.log(result);
                        if (result.errno == 0) {
                            var _goodsInfo = {
                                data : []
                            };
                            var data = result.data;
                            // console.log(data);
                            $.each(data, function(i, item) {
                                _goodsInfo.data.push({
                                    url : 'http://item.'+G.header.domain+'/item-' + item.product_id + '.html',
                                    name : item.name,
                                    img : G.header.common._getPicUrl(item.product_char_id,"middle", 0),
                                    price : (item.price / 100).toFixed(1),
                                    count : item.buy_count
                                });
                            });
                            // console.log();
                            $("#xpanel_fav .xpanel_inner").html(J.toHtml(V.favTemplate,_goodsInfo));
                        }else{
                            $("#xpanel_fav .xpanel_inner").html(V.errTemplate);
                        }
                     }
                });
                break;
            case "view":
                $.ajax({
                     url:'http://s6.smart.yixun.com/w/tf/gettfx?tfid=100004&type=jsonp',
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_view .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        // console.log(result);
                        var _goodsInfo = {
                            data : []
                        };
                        var data = result.data.POS_HISTORY;
                        console.log(data);
                        $.each(data, function(i, item) {
                            _goodsInfo.data.push({
                                url : item.URL,
                                name : item.TITLE,
                                img : item.IMG,
                                price : item.PRICE,
                                count : 0
                            });
                        });
                        // console.log();
                        $("#xpanel_view .xpanel_inner").html(J.toHtml(V.viewTemplate,_goodsInfo));
                     }
                });
                break;
            case "like":
                // console.log(M.userQQ);
                var tfids = 100001; //未知参数
                $.ajax({
                     url:'http://s1.smart.yixun.com/w/tf/gettfxs?tfids='+tfids+'&uin='+M.userQQ,
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_like .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        console.log(result);
                        var _goodsInfo = {
                            data : []
                        };
                        var data = result[tfids].data.POS_1;
                        console.log(data);
                        $.each(data, function(i, item) {
                            _goodsInfo.data.push({
                                url : item.URL,
                                name : item.TITLE,
                                img : item.IMG,
                                price : item.PRICE,
                                count : 0
                            });
                        });
                        // console.log();
                        $("#xpanel_like .xpanel_inner").html(J.toHtml(V.likeTemplate,_goodsInfo));
                     }
                });
                break;
            case "order":
                // console.log(M.userQQ);
                $.ajax({
                     url:'http://buy.yixun.com/json.php?mod=showorder&act=getUserOrdersInOneMonth&pageIndex=1',
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_order .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        console.log(result);
                        if (result.errno == 0) {
                            // var _goodsInfo = {
                            //     data : []
                            // };
                            // var data = result.data;
                            // console.log(data);
                            // $.each(data, function(i, item) {
                            //     _goodsInfo.data.push({
                            //         url : "http://base.yixun.com/orderdetail-"+item.businessDealId+"-html",
                            //         name : item.dealList[0]["productList"][0]["itemTitle"],
                            //         img : item.dealList[0]["productList"][0]["itemUrl"],
                            //         price : item.payScore,
                            //         count : 0
                            //     });
                            // });
                            // console.log();
                            result.data.reverse();

                            $("#xpanel_order .xpanel_inner").html(J.toHtml(V.orderTemplate,result));
                        }else{
                            $("#xpanel_order .xpanel_inner").html(V.errTemplate);
                        }
                     }
                });
                break;
            case "coupon":
                
                break;
            default: 
                console.log("none panel");
        }
    };

    M.renderPersonalInfo = function(){
        G.logic.login.getLoginUser(function(o){
            console.log(o);
            if(o && o.errno == 0){//已登录
                var self = o.data;
                M.userName = self.name;
                $('.xbar_mine .xbar_name').html(self.name);
                $('.xbar_avatar').attr('src','http://qlogo2.store.qq.com/qzone/'+self.qq+'/'+self.qq+'/50')
            }
            else{//未登录
                // $(".xbar_mine").attr("href","https://base.yixun.com/login.html?url="+location.href);
                $(".xbar_mine .xbar_name").html("未登录");
                $(".xbar_order").hide();
                $(".xbar_cart").hide();

            }
        });
    };



    C._init = function(){
        M.renderPersonalInfo();
        J.$win.bind(J.EVT.ui.onShowXPanel,function(e,panelId){
            // alert('面板显示:'+panelId);
            //接下来写面板显示后的各种应用逻辑
            M.showTemplate(panelId);
        }); 
    };

});
