/* S J */
var J=function(e){return function(t){var n=typeof t;if(n==="undefined"){return J}if(n==="string"){return J[t]}if(n==="function"){var r={_:{}};t.call(J,e,r._,r);if(!r.id){alert("A J module require a public id property!");return}if(J[r.id]){alert('A J module with id "'+r.id+'" exists!');return}J[r.id]=r;r=null}}}(jQuery);(function(e){var t={},n={};t.onLoaded=function(){for(var e in J){if(e==="init"||e==="onLoad"){continue}e=J[e];if(t.isFunc(e._onLoad)){e._onLoad.call(e);delete e._onLoad}if(e._){t.loadSub(e._);delete e._}}};t.initEvents=function(n){e(document).ready(t.onLoaded)};t.isFunc=function(e){return e&&typeof e==="function"};t.initSub=function(e){for(var n in e){n=e[n];if(!n){continue}if(t.isFunc(n._init)){n._init.call(n);delete n._init}for(var r in n){r=n[r];if(!r)continue;if(t.isFunc(r._init)){r._init.call(r);delete r._init}}}};t.loadSub=function(e){for(var n in e){n=e[n];if(!n){continue}if(t.isFunc(n._onLoad)){n._onLoad.call(n);delete n._onLoad}for(var r in n){r=n[r];if(!r)continue;if(t.isFunc(r._onLoad)){r._onLoad.call(r);delete r._onLoad}}}};n.init=function(n){J.opts=t.opts=n=e.extend(n||{},J.opts||{});for(var r in J){if(r==="init"||r==="onLoad"){continue}r=J[r];if(t.isFunc(r._init)){r._init.call(r);delete r._init}if(r._){t.initSub(r._)}}t.initEvents()};n.onLoad=t.onLoaded;for(var r in n){if(!r){continue}J[r]=n[r]}})(window["jQuery"]);
/* E J */

J(function($,p,pub){
    pub.id="xdata";
    var $body = $('body');
    //menu
    p.menu={
        tpl:'<div id="xdataMenu" class="xdata_menu">'+
                '<ul>'+
                    '<li><a href="javascript:;" class="xdata_lnk1" rel="1">热区图</a></li>'+
                    '<li><a href="javascript:;" class="xdata_lnk2" rel="2">运营数据</a></li>'+
                '</ul>'+
            '</div>',
        _init:function(){
            $body.append(tpl);
            this._initEvts();
        },
        _initEvts:function(){
            $('#xdataMenu a').bind('click.xdata',function(e){
                $body.trigger('onXDataMenuClick',[{
                    rel:this.rel
                }]);
            });
        }
    };

    //heatmap
    p.heatmap = {
        _init:function(){
            $body.bind('onXDataMenuClick',function(e,d){
                console.log(d);
            });
        }
    };

});
J.init();