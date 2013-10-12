$.getScript('http://oxox.io/assets/js/libs/script.js')
    .done(function(js,txtStatus,jqxhr){
        var prefix = "http://oxox.io/assets/js/xdemo/",
            t = new Date().getTime();
        $script(["http://oxox.io/assets/js/libs/heatmap/heatmap.js",prefix+"yx.xdata.base.js?t="+t,"http://oxox.io/jq/oxmenu/jquery.oxmenu.js?t="+t],"base");
        $script.ready('base',function(){
            $script([
                prefix+"yx.xdata.data.js?t="+t,
                prefix+"yx.xdata.coreui.js?t="+t,
                prefix+"yx.xdata.modchart.js?t="+t,
                prefix+"yx.xdata.pagechart.js?t="+t,
                prefix+"yx.xdata.modeditor.js?t="+t,
                prefix+"yx.xdata.ytagrank.js?t="+t,
                prefix+"yx.xdata.ytag.js?t="+t,
                prefix+"yx.xdata.modrank.js?t="+t,
                prefix+"yx.xdata.heatmap.js?t="+t
            ],"biz");
            $script.ready('biz',function(){
                J.init();
                J.data.init();
            });
        });
    })
    .fail(function(jqxhr,cfg,err){
        console.log('Error happening at loading script.js:'+err);
    });