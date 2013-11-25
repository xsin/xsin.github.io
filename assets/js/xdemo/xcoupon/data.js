J('dataXCoupon',function(M,V,C){
    M.URL_MyCoupon = 'http://ic_fd_pc-pc0.tencent.com:8080/xcoupon/admin_icson.php';
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
        J.dataXCoupon.EVT('onGetMyCoupon');
        J.dataXCoupon.EVT('onGetHotCoupon');
        J.dataXCoupon.EVT('onGetAllCoupon');

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
            J.$win.trigger(J.EVT.dataXCoupon.onGetMyCoupon,[err,data]);
            cbk(err,data);
        });
    };
    /**
     * 获取热门优惠券
     * @param {Function} cbk 回调函数
     */
    this.getHotCoupon = function(cbk){
        return C.ajax(M.URL_HotCoupon,null,function(err,data){
            J.$win.trigger(J.EVT.dataXCoupon.onGetHotCoupon,[err,data]);
            cbk(err,data);
        });
    };

    this.getAllCoupon = function(){
        J.dataXCoupon.getMyCoupon(M.bizInfo.uid,function(err,data){
            console.log('getMyCoupon'+M.bizInfo.uid,err,data);
            /*
            if(!err){
                me.getHotCoupon(function(err1,data1){
                    J.$win.trigger(J.EVT.data.onGetAllCoupon,[err1,data,data1]);
                });
            }
            */
            J.dataXCoupon.getHotCoupon(function(err1,data1){
                console.log('getHotCoupon',err1,data1);
                J.$win.trigger(J.EVT.dataXCoupon.onGetAllCoupon,[err1,data,data1]);
            });
        });
    };

});