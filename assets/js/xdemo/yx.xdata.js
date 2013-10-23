(function($,R,D){

var cbk = function($s){
    var prefix = "http://oxox.io/assets/js/xdemo/",
            t = new Date().getTime();
    $s(["http://oxox.io/assets/js/libs/heatmap/heatmap.js",
        prefix+"yx.xdata.base.js?t="+t,
        "http://oxox.io/jq/oxmenu/jquery.oxtree.js?t="+t,
        "http://oxox.io/jq/oxi18n/jquery.oxi18n.js?t="+t,
        prefix+"yx.xdata.score.js?t="+t
    ],"base");
    $s.ready('base',function(){
        $s([
            prefix+"yx.xdata.i18n.js?t="+t,
            prefix+"yx.xdata.data.js?t="+t,
            prefix+"yx.xdata.coreui.js?t="+t,
            prefix+"yx.xdata.modchart.js?t="+t,
            prefix+"yx.xdata.pagechart.js?t="+t,
            prefix+"yx.xdata.modeditor.js?t="+t,
            prefix+"yx.xdata.ytag.js?t="+t,
            prefix+"yx.xdata.modrank.js?t="+t,
            prefix+"yx.xdata.heatmap.js?t="+t
        ],"biz");
        $s.ready('biz',function(){
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
