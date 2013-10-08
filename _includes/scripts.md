<script src="{{ site.url }}/assets/sea-modules/seajs/seajs/2.1.1/sea.js"></script>
<script>
    //seajs configuration
    seajs.config({
        debug:true,
        alias:{
            "jquery":"/assets/js/libs/jquery/2.0.2/jquery.min.js",
            "jquery.tagclound":"/assets/js/jquery.tagcloud.js",
            "han":"/assets/js/han.js"
        },
        preload:['jquery']
    });
    var app = window['seajsMod']||{mod:'main'};
    app.app=app.app||'common';
    if(location.href.indexOf('localhost')>0){
        seajs.use("ox/%/src/$".replace('%',app.app).replace('$',app.mod));
    }else{
        seajs.use("ox/%/1.0.0/$".replace('%',app.app).replace('$',app.mod));
    }
</script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=27787138" charset="UTF-8"></script>