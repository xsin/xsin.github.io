/**
 * core ui module
 */
JJ('ui',function(M,V,C){
    V.tpl0 = JJ.heredoc(function(){/*
        <div id="xbar" class="xbar"> 
            <div class="xbar_hd"> 
                <div id="xbarList" class="xbar_lists"> 
                    <a data-xbarid="mine" href="javascript:;" class="xbar_lk xbar_mine"><img src="http://ecd.oa.com/30x30" class="xbar_avatar"><span class="xbar_name">我</span></a>
                    <a data-xbarid="cart" href="javascript:;" class="xbar_lk xbar_cart"><i class="xbar_ico_cart"></i><span class="xbar_name">购物车</span></a>
                    <a data-xbarid="view" href="javascript:;" class="xbar_lk xbar_view"><i class="xbar_ico_view"></i><span class="xbar_name">看过</span></a>
                    <a data-xbarid="fav" href="javascript:;" class="xbar_lk xbar_fav"><i class="xbar_ico_fav"></i><span class="xbar_name">收藏</span></a>
                    <a data-xbarid="coupon" href="javascript:;" class="xbar_lk xbar_coupon"><i class="xbar_ico_coupon"></i><span class="xbar_name">优惠券</span></a>
                    <a data-xbarid="guang" href="javascript:;" class="xbar_lk xbar_guang"><i class="xbar_ico_guang"></i><span class="xbar_name">逛逛</span></a>
                    <a data-xbarid="data" href="javascript:;" class="xbar_lk xbar_data"><i class="xbar_ico_data"></i><span class="xbar_name">易数据</span></a>
                </div> 
            </div> 
            <div id="xbarBD" class="xbar_bd">
                <!--注意：每个xbar菜单对应一个面板(xpanel)，面板的id为xpanel_{xbar菜单的data-xbarid属性}-->
                <div class="xpanel xpanelA" id="xpanel_coupon">
                    <a href="javascript:;" class="xbar_close" rel="xpanel_coupon">&larr;</a>
                    <div class="xpanel_tit">我的优惠券</div> 
                    <div class="xpanel_bd">
                        <div class="xpanel_inner">
                            <ul class="Xcoupon_list clearfix" id="xbarCoupon"></ul>
                            <a href="#" class="xbar_morecoupon" id="J_moreCoupon">查看更多优惠券&gt;&gt;</a>
                        </div>
                    </div> 
                </div>
                <div class="xpanel xpanelA" id="xpanel_data">
                    <a href="javascript:;" class="xbar_close" rel="xpanel_data">&larr;</a>
                    <div class="xpanel_tit">易数据</div> 
                    <div class="xpanel_bd">
                        <div class="xpanel_inner">
                        
                            TODO：周末迁移易数据

                        </div><!--xpanel_bd_inner-->
                    </div> 
                </div>
            </div>
        </div>
    */});


    C.menu = {
        clCur:'xbar_lk_current',
        $cur:null,
        _init:function(){
            this.$items = $("#xbarList a").bind('click',function(e){
                if(this.className.indexOf(C.menu.clCur)!=-1){
                    return false;
                }
                JJ.$win.trigger('onClickXbarMenu',[this.getAttribute('data-xbarid')]);
                C.menu.$items.removeClass(C.menu.clCur);
                C.menu.$cur=$(this).addClass(C.menu.clCur);
                return false;
            });

            JJ.$win.bind('onHideAllXPanel.xbar',function(e){
                C.menu.reset();
            });
        },
        reset:function(){
            this.$cur&&this.$cur.removeClass(this.clCur);
        }
    };

    C.panel = {
        curId:null,
        clShow:'xpanel_ani_show',
        clWrapShow:'xbar_bd_show',
        _init:function(){
            this.$wrap = $('#xbarBD');
            JJ.$win.bind('onClickXbarMenu.xbar',function(e,d){
                C.panel.hide(C.panel.curId);
                C.panel.show(d);
            });
            $('.xbar .xbar_close').live('click',function(e){
                C.panel.hideAll(this.rel);
                return false;
            });
        },
        show:function(id){
            var me  = this,
                onShow = function(){
                    $('#xpanel_'+id).addClass(me.clShow);
                    me.curId = id;
                    me.$wrap.onTransitioned(false);
                    JJ.$win.trigger('onShowXPanel',[id]);
                };
            if(this.$wrap.hasClass(this.clWrapShow)){
                onShow();
            }else{
                this.$wrap.addClass(this.clWrapShow).onTransitioned(function(){
                    onShow();
                });
            };
        },
        hide:function(id){
            var me = this;
            $('#xpanel_'+id).removeClass(this.clShow).onAnimated(function(){
                $(this).onAnimated(false);
            });
        },
        hideAll:function(panelId){
            var me = this;
            this.$wrap.removeClass(this.clWrapShow).onTransitioned(function(){
                me.$wrap.find('.xpanel').removeClass(me.clShow);
                JJ.$win.trigger('onHideAllXPanel');
                me.$wrap.onTransitioned(false);
            });
            //隐藏子面板
            $('[data-xpanel_parent="'+panelId+'"]').find('.xbar_close').trigger('click');
        }
    };

    this._init = function(){
        //menu
        JJ.$body.append(V.tpl0);
    };
});