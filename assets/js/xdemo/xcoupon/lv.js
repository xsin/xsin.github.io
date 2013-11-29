/**
 * module description
 */
J('lv',function(M,V,C){
    M.isSearchex = location.href.indexOf('searchex.yixun.com')>-1;
    
    M.quan = {};alert(1);
    V.quan = {
        tplHD:J.heredoc(function(){/*
            <a class="goods_more_tag xcoupon_lnk"gtagtype="he">可用券<i></i><span></span></a>
        */}),
        tplBD:J.heredoc(function(){/*
            {{#cnt1}}
            <h4>可用券：</h4>
            <ul class="xcoupon_list xcoupon_list1">
                {{#items1}}
                <li><a href="{{url}}" target="_blank" title="{{name}}">{{name}}</a></li>
                {{/items1}}
            </ul>
            {{/cnt1}}
            <h4>可领券：</h4>
            <ul class="xcoupon_list xcoupon_list2">
                {{#items2}}
                <li><a href="{{url}}" target="_blank" title="{{title}}">{{title}}</a></li>
                {{/items2}}
            </ul>
        */}),
        _init:function(){
            if(!M.isSearchex) return;
            this.$items = $('#itemList').find('li');
            M.cnt = this.$items.length;

            
        },
        render:function(myCoupons,hotCoupons){
            var cnt =8 ,idx;
            while(cnt>0){
                idx = Math.floor(Math.random()*cnt);
                if(idx<M.cnt){
                    this.addQuanUI(idx,myCoupons,hotCoupons);
                }
                cnt--;
            };
        },
        addQuanUI:function(idx,myCoupons,hotCoupons){
            if(M.quan[idx+'']){
                return;
            }
            M.quan[idx+'']=true;
            var $hd = this.$items.eq(idx).find('.goods_more_hd').append(this.tplHD);
            var data = {
                cnt1:0,
                cnt2:0,
                items1:[],
                items2:[]
            };
            if(myCoupons.total>0){
                data.items1.push({
                    url:"http://base.yixun.com/mycoupon.html",
                    name:myCoupons.coupons[0].coupon_name
                });
                data.cnt1=1;
            }
            if(hotCoupons.xv.length>0){
                data.items2.push({
                    url:hotCoupons.xv[0].url,
                    name:hotCoupons.xv[0].coupon_name
                });
                data.cnt2=1;
            }
            var html = J.toHtml(this.tplBD,data),
                $bd = this.$items.eq(idx).find('.goods_more_bd');
            if($bd.length>0){
                $bd.append(html);
            }else{
                $hd.after('<div class="goods_more_bd">'+html+'</div>');
            }
        }
    };

    C.quan = {
        _init:function(){
            if(!M.isSearchex) return;
            J.$win.bind(J.EVT.dataXCoupon.onGetAllCoupon,function(e,err,myCoupons,hotCoupons){
                if(err){
                    return;
                }
                //TEST:
                myCoupons = myCoupons||{errCode:0,data:{total:0}}
                //数据二次处理
                if(myCoupons.errCode!==0){
                    J.log(myCoupons.errMsg);
                    //获取我的优惠券报错
                    return;
                }
                myCoupons = myCoupons.data;
                if(hotCoupons.code!=="1"){
                    //获取热门优惠券报错
                    J.log(hotCoupons.info);
                    return;
                }
                hotCoupons = hotCoupons.info;

                if(!err){
                    M.quan.myCoupons = myCoupons;
                    M.quan.hotCoupons = hotCoupons;
                    V.quan.render(myCoupons,hotCoupons);
                }
                
            });

            //取券数据
            J.dataXCoupon.getAllCoupon();

        }
    };

});