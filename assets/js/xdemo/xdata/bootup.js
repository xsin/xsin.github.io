(function($,R,D){

var isDebug = location.href.indexOf('debug')!=-1,
    prefix = "http://oxox.io/assets/js/xdemo/xdata/",
    t = new Date().getTime(),
    bizJs = isDebug?[prefix+'all.min.js?t='+t]:[
        prefix+"i18n.js?t="+t,
        prefix+"data.js?t="+t,
        prefix+"ui.xbar.js?t="+t,
        prefix+"ui.xdata.js?t="+t,
        prefix+"modchart.js?t="+t,
        prefix+"pagechart.js?t="+t,
        prefix+"modeditor.js?t="+t,
        prefix+"ytag.js?t="+t,
        prefix+"modrank.js?t="+t
    ],
    cbk = function($s){
        //加载第三方库
        $s([prefix+"base.js?t="+t,
            "http://oxox.io/jq/oxmenu/jquery.oxtree.js?t="+t,
            "http://oxox.io/jq/oxi18n/jquery.oxi18n.js?t="+t,
            prefix+"score.js?t="+t
        ],"base");
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
