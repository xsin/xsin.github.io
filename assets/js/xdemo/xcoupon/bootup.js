(function($,R,D){

var cbk = function($s){
    var prefix = "http://oxox.io/assets/js/xdemo/xcoupon/",
            t = new Date().getTime();
    //加载基础代码
    $s([
        prefix+"base.js?t="+t,
        "http://twitter.github.com/hogan.js/builds/2.0.0/hogan-2.0.0.js?t="+t
    ],"base");
    $s.ready('base',function(){
        JJ.toHtml = function(tpl,obj,ext){tpl = Hogan.compile(tpl);return (tpl.render(obj,ext));};
        //加载主UI模块
        $s([
            prefix+"ui.js?t="+t,
            prefix+'data.js?t='+t
        ],"biz");
        $s.ready('biz',function(){
            //加载业务逻辑模块
            //i18n.addLng('zh-CN',yx_xdata_i18n['zh-CN']);
            $s([
                prefix+"joy.js?t="+t,
                prefix+"aron.js?t="+t,
                prefix+"lv.js?t="+t
            ],"main");
            $s.ready('main',function(){
                JJ.init();
            })
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
