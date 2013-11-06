(function($,R,D){

var cbk = function($s){
    var prefix = "http://oxox.io/assets/js/xdemo/xcoupon/",
            t = new Date().getTime();
    $s([prefix+"base.js?t="+t
    ],"base");
    $s.ready('base',function(){
        $s([
            prefix+"ui.js?t="+t
        ],"biz");
        $s.ready('biz',function(){
            //i18n.addLng('zh-CN',yx_xdata_i18n['zh-CN']);
            JJ.init();
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
