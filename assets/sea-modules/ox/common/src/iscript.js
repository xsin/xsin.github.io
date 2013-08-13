/**
 * 执行页面内嵌的js脚本。这类脚本统一至于iScripts变量中
 */
define(function(require){
    $(document).ready(function(){
        var items = window['iScripts']||[];
            len = iScripts.length;
        if(len===0){
            return;
        }
        for(var i=0;i<len;i++){
            items[i]._onLoad&&items[i]._onLoad.call(items[i]);
        };//for
        delete window['iScripts'];
    });
});