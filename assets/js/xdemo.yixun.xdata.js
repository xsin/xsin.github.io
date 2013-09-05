/* S J */
var J=function(e){return function(t){var n=typeof t;if(n==="undefined"){return J}if(n==="string"){return J[t]}if(n==="function"){var r={_:{}};t.call(J,e,r._,r);if(!r.id){alert("A J module require a public id property!");return}if(J[r.id]){alert('A J module with id "'+r.id+'" exists!');return}J[r.id]=r;r=null}}}(jQuery);(function(e){var t={},n={};t.onLoaded=function(){for(var e in J){if(e==="init"||e==="onLoad"){continue}e=J[e];if(t.isFunc(e._onLoad)){e._onLoad.call(e);delete e._onLoad}if(e._){t.loadSub(e._);delete e._}}};t.initEvents=function(n){e(document).ready(t.onLoaded)};t.isFunc=function(e){return e&&typeof e==="function"};t.initSub=function(e){for(var n in e){n=e[n];if(!n){continue}if(t.isFunc(n._init)){n._init.call(n);delete n._init}for(var r in n){r=n[r];if(!r)continue;if(t.isFunc(r._init)){r._init.call(r);delete r._init}}}};t.loadSub=function(e){for(var n in e){n=e[n];if(!n){continue}if(t.isFunc(n._onLoad)){n._onLoad.call(n);delete n._onLoad}for(var r in n){r=n[r];if(!r)continue;if(t.isFunc(r._onLoad)){r._onLoad.call(r);delete r._onLoad}}}};n.init=function(n){J.opts=t.opts=n=e.extend(n||{},J.opts||{});for(var r in J){if(r==="init"||r==="onLoad"){continue}r=J[r];if(t.isFunc(r._init)){r._init.call(r);delete r._init}if(r._){t.initSub(r._)}}t.initEvents()};n.onLoad=t.onLoaded;for(var r in n){if(!r){continue}J[r]=n[r]}})(window["jQuery"]);
(function(e){e.fn.onTransitioned=function(t){return this.each(function(){if(t===false){e(this).unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");return}e(this).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",t)})}})(jQuery);
J.heredoc = function(fn){return (fn.toString().split('\n').slice(1,-1).join('\n') + '\n');};
J.log = function(obj){(window['console']||{log:function(x){alert(x);}}).log(obj);};
J.$win = $(window);
J.$body=$('body');
/* E J */

/* S 数据 */
J(function($,p,pub){
    pub.id="data";
    var uid = null,
        pid = window['yPageId']||'1000',
        wsid=null,
        areaid=null,
        today = new Date(),
        ck = (document.cookie||''),
        isParamsReady = false;
    try{
        uid = ck.split('yx_uid=')[1].split(';')[0];
        wsid=ck.split('wsid=')[1].split(';')[0];
        areaid=ck.split('areasInfo=')[1].split(';')[0];
        isParamsReady=true;
    }catch(e){
        J.log('获取统计参数失败！'+e.toString());
    };
    var clickStreamData = function(_type,_params,_cbk){
        if (!isParamsReady) {
            _cbk('获取统计参数失败！');
            return;
        };
        $.ajax({
            type: "GET",
            url: 'http://statistic.yixun.com/json.php?mod=stat&act='+_type,
            data: _params,
            dataType: 'json'
        }).fail(function(jqXHR,txtStatus,err){
            _cbk(_type+':'+err);
        }).done(function(data,txtStatus,jqXHR){
            _cbk(null,data);
        });
    };
    //获取日期数据
    pub.getDateTimeStr=function(dObj,ignoreHMS){
        var o =[dObj.getFullYear()+'-',(dObj.getMonth()+1)],
        format = function(i){
            return (i<10?('0'+i):i);
        };
        o[1]=format(o[1])+'-';
        o.push(format(dObj.getDate()));

        if(ignoreHMS){
            o.push(" 00:00:00");
        }else{
            o.push(' ');
            tempObj = dObj.getHours();
            o.push(format(dObj.getHours())+':');
            o.push(format(dObj.getMinutes())+':');
            o.push(format(dObj.getSeconds()));
        }

        return o.join('');

    };
    //获取主数据
    pub.getKeyData = function(_params,cbk){
        _params = $.extend({},{
            uid:uid, 
            start_date:pub.getDateTimeStr(today,true), 
            end_date:pub.getDateTimeStr(today), 
            date_type:"today", 
            page_id:pid, 
            warehouse_id:wsid, 
            areasInfo:areaid
        },_params||{});
        clickStreamData('PageKeyData',_params,cbk);
    };
    //获取点击数据
    pub.getClickData = function(_params,cbk){
        _params = $.extend({},{
            uid:uid, 
            start_date:pub.getDateTimeStr(today,true), 
            end_date:pub.getDateTimeStr(today), 
            date_type:"today", 
            page_id:pid, 
            warehouse_id:wsid, 
            areasInfo:areaid
        },_params||{});
        clickStreamData('PageClickData',_params,cbk);
    };
    //获取指定YTag的数据
    pub.getRangeClickData = function(_params,cbk){
        _params = $.extend({},{
            uid:uid, 
            start_date:pub.getDateTimeStr(today,true), 
            end_date:pub.getDateTimeStr(today), 
            date_type:"today", 
            page_id:pid, 
            warehouse_id:wsid, 
            areasInfo:areaid,
            page_tag_ids:"-1"
        },_params||{});
        clickStreamData('DragClickData',_params,cbk);
    };

    pub.EVT = {
        'InitKeyData':'onXDataInitKeyData',
        'InitClickData':'onXDataInitClickData'
    };

    pub.init = function(){
        //获取主数据和点击数据
        pub.getKeyData(null,function(err,data){
            pub["InitKeyData"] = data;
            J.$win.trigger(pub.EVT.InitKeyData,[err,data]);
            if(!err){
                pub.getClickData(null,function(err1,data1){
                    pub['InitClickData']=data1;
                    J.$win.trigger(pub.EVT.InitClickData,[err1,data1]);
                });
            }
        });
    };


});
/* E 数据 */

/* S 菜单 */
J(function($,p,pub){
    pub.id="xdata_menu";
    var $body = J.$body;
    //menu
    p.menu={
        $d:null,
        tpl0:'<div id="xdataMenu" class="xdata_menu xdata_menu_rock"><strong class="xdata_c1">C</strong>lick<strong class="xdata_c2">S</strong>tream<span class="xdata_loading"></span></div>',
        tpl1:J.heredoc(function(){/*
            <a id="xdataMenuClose" class="xdata_menu_close" href="javascript:;">&times;</a>
            <ul class="xdata_menulist">
                <li><a href="javascript:;" class="xdata_lnk1" rel="1"><strong class="xdata_c1">热</strong>区数据</a></li>
                <li><a href="javascript:;" class="xdata_lnk1" rel="2"><strong class="xdata_c2">模</strong>块数据</a></li>
            </ul>
        */}),
        _init:function(){
            $body.append(this.tpl0);
            this.$d = $('#xdataMenu');
            this._initEvts();
        },
        _initEvts:function(){
            J.$win.bind(J.data.EVT.InitKeyData,function(e,err,data){
                if(err){
                    p.menu.showError(err);
                    return;
                }
            }).bind(J.data.EVT.InitClickData,function(e,err,data){
                if (err) {
                    p.menu.showError(err);
                    return;
                };
                //这里主数据和点击数据已经拿到
                p.menu.onDataReady();
            });
        },
        onDataReady:function(){
            this.$d.removeClass('xdata_menu_rock').onTransitioned(function(){
                this.innerHTML = p.menu.tpl1;
                $('#xdataMenu a').bind('click.xdata',function(e){
                    $body.trigger('onXDataMenuClick',[{
                        rel:this.rel
                    }]);
                });
                p.menu.$d.onTransitioned(false).addClass('xdata_menu_rock');
            });
        },
        showError:function(txt){
            this.$d.html('<span class="xdata_err">'+txt.toString()+'</span>');
        },
        show:function(){
            this.$d.addClass('xdata_menu_rock');
        },
        hide:function(){
            this.$d.removeClass('xdata_menu_rock');
        }
    };
});
/* E 菜单 */

/* S SingleYTag */

/* E SingleYTag */

/* S 热区 */
J(function($,p,pub){
    pub.id="xdata_heatmap";
    var $body = $('body');
    //heatmap
    p.heatmap = {
        isRender:false,
        instance:null,
        _init:function(){
            $body.bind('onXDataMenuClick',function(e,d){
                if(d.rel=="1"){
                    if(!p.heatmap.isRender){
                        p.heatmap.render();
                    }
                    p.heatmap.toggleDisplay();
                }
            });
        },
        toggleDisplay:function(){
            this.instance&&this.instance.toggleDisplay();
        },
        fixPosition:function(){
            var offset = $(this.instance.target).offset(),
                canvasObj = this.instance.get('canvas');
            canvasObj.style.left=offset.left+'px';
            canvasObj.style.top=offset.top+'px';
        },
        getData:function(){



            //max-坐标的最大点击数
            //data-坐标点击数据。
            //data.x - x坐标值
            //data.y - y坐标值
            //data.count - 该坐标的点击数总和

            //注意：由于屏幕分辨率的影响，坐标的x/y必须是相对于主体内容的值
            //例如：首页首屏的点击坐标值应该是相对于grid_c1的

            var d={
                max: 90, 
                data: [
                {x: 100, y: 100, count: 80},
                {x: 120, y: 120, count: 60},
                {x: 100, y: 80, count: 90},
                {x: 111, y: 110, count: 60},
                {x: 201, y: 150, count: 90},
                {x: 311, y: 110, count: 60},
                {x: 121, y: 510, count: 70},
                {x: 511, y: 110, count: 60},
                {x: 211, y: 110, count: 50},
                {x: 191, y: 110, count: 20},
                {x: 511, y: 110, count: 40}
            ]};

            var rdCnt = 1000,
                maxX = 1190,
                maxY = 2000,
                maxCnt=100;

            d.max = maxCnt;

            for(var i=0;i<rdCnt;i++){
                d.data.push({
                    x:Math.floor(Math.random()*maxX+1),
                    y:Math.floor(Math.random()*maxY+1),
                    count:Math.floor(Math.random()*maxCnt+1)
                });
            }
            return d;
        },
        render:function(){
            //cfg
            //由于用户屏幕大小差异，element元素必须是相对于主体内容容器
            var target = $('.ic_content .grid_c1')[0];
            var cfg = {
                "element":target, 
                "radius":25, 
                "visible":false
            };
            //heatmap
            var hm1 = h337.create(cfg);
            hm1.get("canvas").onclick = function(ev){
                var pos = h337.util.mousePosition(ev);
                hm1.store.addDataPoint(pos[0],pos[1]);
            };
            hm1.target=target;
            //demo data
            var data = this.getData();
            // call the heatmap's store's setDataSet method in order to set static data
            hm1.store.setDataSet(data);
            this.isRender=true;
            this.instance=hm1;
            //position fix
            this.fixPosition();
        }
    };

});
/* E 热区 */

/* S 模块运营数据 */
J(function($,p,pub){
    pub.id="xdata_mods";
    var $body = $('body');
    //mods
    p.mods={
        isRender:false,
        _init:function(){
            $body.bind('onXDataMenuClick',function(e,d){
                if(d.rel=="2"){
                    if(!p.mods.isRender){
                        p.mods.render();
                    }
                    p.mods.toggleDisplay();
                }
            });
        },
        render:function(){
            alert('todo by joy');
            
        },
        toggleDisplay:function(){

        }
    };
});
/* E 模块运营数据 */

J.init();
J.data.init();