//TODO:move that static methods to base.js
JJ.heredoc = function(fn){return (fn.toString().split('\n').slice(1,-1).join('\n') + '\n');};
JJ.log = function(obj){(window['console']||{log:function(x){alert(x);}}).log(obj);};
JJ.$win = $(window);
JJ.$body=$('body');

/**
 * core ui module
 */
JJ('ui',function(M,V,C){
    var tpl0 = JJ.heredoc(function(){/*
        <li class="mod_sitemap_gap">|</li>
        <li class="mod_sitemap_li mod_sitemap_quan">
            <a href="javascript:alert('comming soon')" ytag="09998">我要券<i> &gt;&gt;</i></a>
        </li>
    */});

    this._init = function(){
        //menu
        $('.mod_sitemap_ul').append(tpl0);
    };
});