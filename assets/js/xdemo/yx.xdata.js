(function($,R,D){

var isDebug = location.href.indexOf('debug')!=-1,
    prefixXData = "http://oxox.io/assets/js/xdemo/xdata/",
    prefixXCoupon = "http://oxox.io/assets/js/xdemo/xcoupon/",
    t = new Date().getTime(),
    bizJs = (!isDebug)?[prefixXData+'all.min.js?t='+t]:[
        prefixXData+"score.js?t="+t,
        prefixXData+"i18n.js?t="+t,
        prefixXData+"data.js?t="+t,
        prefixXData+"ui.xbar.js?t="+t,
        prefixXData+"ui.xdata.js?t="+t,
        prefixXData+"modchart.js?t="+t,
        prefixXData+"pagechart.js?t="+t,
        prefixXData+"modeditor.js?t="+t,
        prefixXData+"ytag.js?t="+t,
        prefixXData+"modrank.js?t="+t,
        prefixXCoupon+"data.js?t="+t,
        prefixXCoupon+"joy.js?t="+t,
        prefixXCoupon+"lv.js?t="+t,
        prefixXCoupon+"aron.js?t="+t
    ],
    cbk = function($s){
        //加载第三方库
        $s([prefixXData+"base.js?t="+t],"base");
        //加载xdata逻辑js
        $s.ready('base',function(){
            $s(bizJs,"biz");
            $s.ready('biz',function(){
                //模块初始化
                i18n.addLng('zh-CN',yx_xdata_i18n['zh-CN']);
                J.init();
            });
        });
    };

if( typeof(R) =='function' && typeof(D)=='function' && D.amd ){
    //requirejs style
    R(['http://oxox.io/assets/js/libs/script.js'],function($s){
        cbk($s);
    });
}else{
    $.getScript('http://oxox.io/assets/js/libs/script.js')
        .done(function(js,txtStatus,jqxhr){
            cbk(window["$script"]);
        })
        .fail(function(jqxhr,cfg,err){
            console.log('Error happening at loading script.js:'+err);
        });
};

})(jQuery,window["require"],window["define"]);
