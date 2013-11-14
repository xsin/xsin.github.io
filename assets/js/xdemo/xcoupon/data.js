JJ('data',function(M,V,C){
    M.URL_MyCoupon = 'http://aronhuang-pc0.tencent.com:8002/xcoupon/admin_icson.php';
    M.URL_HotCoupon='http://log.oxox.io/api.php?xn=xcoupon&xk=coupons&act=query';
    M._init = function(){
        var ck =(document.cookie||''),
            uid = ck.split('yx_uid=')[1].split(';')[0],
            pid = window['yPageId']||'1000',
            wsid=ck.split('wsid=')[1].split(';')[0];

        this.bizInfo={
            uid:uid,
            wsid:wsid,
            pid:pid
        };

        //事件接口
        JJ.data.EVT('onGetMyCoupon');
        JJ.data.EVT('onGetHotCoupon');
        JJ.data.EVT('onGetAllCoupon');

    }
    C.ajax = function(url,_params,_cbk,type){
        type = type||'GET';
        var jqXHR=$.ajax({
            type: type,
            url: url,
            data: _params,
            dataType: 'json'
        }).fail(function(jqXHR1,txtStatus1,err1){
            _cbk(err1);
        }).done(function(data,txtStatus2,jqXHR2){
            _cbk(null,data);
        });
        return jqXHR;
    };

    C.coupon = {
        _init:function(){
            JJ.data.getMyCoupon('10281283',function(err,data){
                console.log('getMyCoupon',err,data);
                /*
                if(!err){
                    me.getHotCoupon(function(err1,data1){
                        JJ.$win.trigger(JJ.EVT.data.onGetAllCoupon,[err1,data,data1]);
                    });
                }
                */
                JJ.data.getHotCoupon(function(err1,data1){
                    console.log('getHotCoupon',err1,data1);
                    JJ.$win.trigger(JJ.EVT.data.onGetAllCoupon,[err1,data,data1]);
                });
            });
            
        }
    };


    this.getBizData = function(){
        return M.bizInfo;
    };
    /**
     * 获取我的优惠券
     * @param {string} uid 用户id
     */
    this.getMyCoupon = function(uid,cbk){
        var bizInfo = this.getBizData();
        uid = uid||bizInfo.uid;
        return C.ajax(M.URL_MyCoupon,{uid:uid},function(err,data){
            JJ.$win.trigger(JJ.EVT.data.onGetMyCoupon,[err,data]);
            cbk(err,data);
        });
    };
    /**
     * 获取热门优惠券
     * @param {Function} cbk 回调函数
     */
    this.getHotCoupon = function(cbk){
        return C.ajax(M.URL_HotCoupon,null,function(err,data){
            JJ.$win.trigger(JJ.EVT.data.onGetHotCoupon,[err,data]);
            cbk(err,data);
        });
    };

    this.init = function(){
        C.coupon._init();
    };
});