/**
 * module description
 */
J('aron',function(M,V,C){


    

     V.couponPopupTpl = J.heredoc(function(){/*
        <div class="Xmod_popup" id="J_coupon_popup" style="display:none;">
            <div class="Xmod_popup_hd">
                <h3>优惠券</h3>
                <span class="Xmod_popup_close" id="J_popup_close">关闭</span>
            </div>
            <div class="Xmod_popup_bd">
                <div class="Xcoupon_container">
                    <div class="Xcoupon">
                        <div class="Xcoupon_sec my_coupon">
                            <h2 class="Xcoupon_sec_tit">我的优惠券</h2>
                            <div class="Xcoupon_sec_bd">
                                <ul class="Xcoupon_list clearfix" id="myCoupon">
                                </ul>
                            </div>
                        </div>

                        <div class="Xcoupon_sec">
                            <h2 class="Xcoupon_sec_tit">热门优惠券</h2>
                            <div class="Xcoupon_sec_bd">
                                <ul class="Xcoupon_list clearfix" id="availableCoupon">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
        <div id="J_mask" class="Xmod_popup_mask" style="display:none;"></div>
    */});

    V.renderCoupon = function(obj, data, isOwned, num){
        var html = [];
        var count = 0;
        if (data.length == 0) {
            html.push('<p class="tips_none">暂时没有可用的优惠券哦！</p>');
        } else {
            $.each(data, function(){
                count++;
                var row = this;
                var rowHtml;
                if (isOwned) {
                    rowHtml = [
                        '<li>',
                            '<a class="Xcoupon_item" title="'+ row.coupon_name+'" href="http://base.yixun.com/mycoupon.html" title="查看我的优惠券" target="_blank">',
                            '<div class="col col1"><div class="Xcoupon_val"><i>&yen;</i><span>' + row.coupon_amt/100 + '</span></div></div>',
                            '<div class="col col2"><div class="Xcoupon_desc">' + row.coupon_name + '</div><div class="Xcoupou_expired">有效期至：' + M.formatTime(row.valid_time_to*1000) + '</div></div>',
                            '</a>',
                        '</li>'
                    ].join(''); 
                } else {
                    rowHtml = [
                        '<li>',
                            '<a class="Xcoupon_item" href="' + row.url + '" target="_blank" title="'+ row.coupon_name+'">',
                            '<div class="col col1"><div class="Xcoupon_val"><i>&yen;</i><span>' + row.coupon_amt + '</span></div></div>',
                            '<div class="col col2"><div class="Xcoupon_desc">' + row.coupon_name + '</div><div class="Xcoupou_expired">有效期至：' + M.formatTime(row.valid_time_to) + '</div></div>',
                            /*'<div class="Xcoupou_btn Xmod_btn">立即领取</div></a>',*/
                        '</li>'
                    ].join(''); 
                } 
                html.push(rowHtml);
                if (num && count == num) {
                    return false;
                }
            });
        }
        $(obj).html(html.join(''));
    }

    V.showCouponPopup = function(){
        $('#J_coupon_popup').show();
        $('#J_mask').show();
    }


    V.hideCouponPopup = function(){
       $('#J_coupon_popup').hide();
       $('#J_mask').hide(); 
    }


    M.formatTime = function(timestamp){
        var date = new Date(timestamp);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }



    C._init = function(){
        J.$body.append(V.couponPopupTpl);
        J.$win.bind(J.EVT.dataXCoupon.onGetAllCoupon,function(e,err,myCoupons,hotCoupons){
            if (err) {
                return
            }
            console.log(myCoupons);
            myCoupons = myCoupons.data.coupons;
            hotCoupons = hotCoupons.info.xv;
            V.renderCoupon($('#xbarCoupon'), myCoupons, true, 5);
            V.renderCoupon($('#availableCoupon'), hotCoupons, false);
            V.renderCoupon($('#myCoupon'), myCoupons, true);
        }); 


        $('#J_popup_close').bind('click', function(e){
            e.preventDefault();
            V.hideCouponPopup();
        });

         $('#J_moreCoupon').bind('click', function(e){
            e.preventDefault();
            V.showCouponPopup();
        });

         J.dataXCoupon.getAllCoupon();

        
    };





    /*V.tpl0 = J.heredoc(function(){/*
        <div class="mod_pop" style="left:-400px; top:200px; left: 50%; width:800px;">
            <div class="mod_pop_hd">
                <h3 class="mod_pop_tit">优惠券</h3>
                <button type="button" class="mod_pop_close" data-dismiss="model">关闭</button>
            </div>
            <div class="mod_pop_bd">
                <div class="mod_pop_con">
                    <iframe frameborder="0" border="0" id="preview_frame" width="188" height="225" scrolling="no" allowtransparency="true" src="http://chong.qq.com/tws/entra/getpanel?id=306&amp;vb2ctag=3_1007_1_1346&amp;width=188&amp;height=225"></iframe>
                </div>
            </div>
        </div>
    });

    /*V.render = function(data){
        $('#list').append(J.toHtml(this.tpl0,data));
        if(M.isDataLoaded){

        }
    };

    M.isDataLoaded = false;

    C._init = function(){
        J.$win.bind(J.EVT.data.onGetAllCoupon,function(e,err,myCoupons,hotCoupons){
            console.log(hotCoupons)
            M.isDataLoaded = true;
        }); 
    };

    C.xxx = {
        _init:function(){
           J.$win.bind(J.EVT.data.onGetAllCoupon,function(e,err,myCoupons,hotCoupons){
                console.log(hotCoupons)
            });  
        }
    };
    
    C=>V
    C=>M
    V=>M





    */


});