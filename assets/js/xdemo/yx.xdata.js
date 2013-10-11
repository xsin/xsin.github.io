$.getScript('http://oxox.io/assets/js/libs/script.js')
    .done(function(js,txtStatus,jqxhr){
        var prefix = "http://oxox.io/assets/js/xdemo/";
        $script(["http://oxox.io/assets/js/libs/heatmap/heatmap.js",prefix+"yx.xdata.base.js"],"base");
        $script.ready('base',function(){
            $script([
                prefix+"yx.xdata.data.js",
                prefix+"yx.xdata.coreui.js",
                prefix+"yx.xdata.ytag.js",
                prefix+"yx.xdata.heatmap.js"
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