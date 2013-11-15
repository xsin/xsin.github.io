/**
 * module description
 */
JJ('joy',function(M,V,C){
    var tpl0 = JJ.heredoc(function(){/*
        <li class="mod_sitemap_gap">|</li>
        <li class="mod_sitemap_li mod_sitemap_quan">
            <a href="javascript:alert('comming soon')" ytag="09998">我要券<i> &gt;&gt;</i></a>
        </li>
    */});

    var html = function(){
        /* 
        <div class="xbar"> 
            <div class="xbar_hd"> 
                <div class="xbar_lists"> 
                    <a href="javascript:;" class="xbar_lk xbar_mine"><img src="http://ecd.oa.com/30x30" class="xbar_avatar"><span class="xbar_name">我</span></a>
                    <a href="javascript:;"  class="xbar_lk xbar_cart"><i class="xbar_ico_cart"></i><span class="xbar_name">购物车</span></a>
                    <a href="javascript:;" class="xbar_lk xbar_view"><i class="xbar_ico_view"></i><span class="xbar_name">看过</span></a>
                    <a href="javascript:;"  class="xbar_lk xbar_fav"><i class="xbar_ico_fav"></i><span class="xbar_name">收藏</span></a>
                    <a href="javascript:;"  class="xbar_lk xbar_coupon"><i class="xbar_ico_coupon"></i><span class="xbar_name">优惠券</span></a>
                    <a href="javascript:;"  class="xbar_lk xbar_guang"><i class="xbar_ico_guang"></i><span class="xbar_name">逛逛</span></a>
                </div> 
            </div> 
            <div class="xbar_bd"> 
                <a href="javascript:;" class="xbar_close">&rarr;</a> 
                <div class="xbar_item"> 
                    <div class="xbar_tit"></div> 
                    <div class="xbar_iframe"></div> 
                </div> 
            </div> 
        </div>
        */
    };

    var heredoc = function(func){
        var _str = func.toString(), 
        s_pos = _str.indexOf("/*")+2, 
        e_pos = _str.lastIndexOf("*/"); 
        return (s_pos<0 || e_pos<0) ? "" : _str.substring(s_pos, e_pos);
    };

    var showBd = function(title){
        $(".xbar_bd").animate({ 
            right : '50px'
        },300,'linear',function(){ 
            console.log("animate done"); 
            $('.xbar_tit').html("我的优惠券"); 
        }) 
    };

    var hideBd = function(title){
        $(".xbar_bd").animate({ 
            right : '-170px'
        },300,'linear',function(){ 
            $('.xbar_tit').html(); 
        })
    };

    this._init = function(){
        $("body").append(heredoc(html)); 
        $(".xbar_coupon").live('click', function(){ 
            showBd("我的优惠券");
            $(this).addClass("xbar_lk_current");
        }); 
        $(".xbar_close").live('click', function(){ 
            hideBd();
            $('.xbar_lk').removeClass('xbar_lk_current');
        }); 
    };
});
