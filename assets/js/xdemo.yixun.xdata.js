/* S Mustache & oxtip */
// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name default.js
// @code_url https://raw.github.com/janl/mustache.js/master/mustache.js
// @code_url http://oxox.io/jq/oxtip/js/jquery.oxtip.js
// ==/ClosureCompiler==
(function(d,m){if("object"===typeof exports&&exports)m(exports);else{var n={};m(n);"function"===typeof define&&define.amd?define(n):d.Mustache=n}})(this,function(d){function m(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function n(a){this.tail=this.string=a;this.pos=0}function h(a,b){this.view=a||{};this.parent=b;this._cache={}}function p(){this.clearCache()}function q(a,b,c,g){for(var e="",k,f,x=0,v=a.length;x<v;++x)switch(k=a[x],f=k[1],k[0]){case "#":f=c.lookup(f);if("object"===typeof f)if(y(f))for(var h=
0,l=f.length;h<l;++h)e+=q(k[4],b,c.push(f[h]),g);else f&&(e+=q(k[4],b,c.push(f),g));else"function"===typeof f?(k=null==g?null:g.slice(k[3],k[5]),f=f.call(c.view,k,function(a){return b.render(a,c)}),null!=f&&(e+=f)):f&&(e+=q(k[4],b,c,g));break;case "^":f=c.lookup(f);if(!f||y(f)&&0===f.length)e+=q(k[4],b,c,g);break;case ">":f=b.getPartial(f);"function"===typeof f&&(e+=f(c));break;case "&":f=c.lookup(f);null!=f&&(e+=f);break;case "name":f=c.lookup(f);null!=f&&(e+=d.escape(f));break;case "text":e+=f}return e}
function w(a){return[RegExp(m(a[0])+"\\s*"),RegExp("\\s*"+m(a[1]))]}var x=/\s*/,v=/\s+/,A=/\S/,z=/\s*=/,B=/\s*\}/,C=/#|\^|\/|>|\{|&|=|!/,D=RegExp.prototype.test,E=Object.prototype.toString,y=Array.isArray||function(a){return"[object Array]"===E.call(a)},F={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};n.prototype.eos=function(){return""===this.tail};n.prototype.scan=function(a){return(a=this.tail.match(a))&&0===a.index?(this.tail=this.tail.substring(a[0].length),this.pos+=
a[0].length,a[0]):""};n.prototype.scanUntil=function(a){var b=this.tail.search(a);switch(b){case -1:a=this.tail;this.pos+=this.tail.length;this.tail="";break;case 0:a="";break;default:a=this.tail.substring(0,b),this.tail=this.tail.substring(b),this.pos+=b}return a};h.make=function(a){return a instanceof h?a:new h(a)};h.prototype.push=function(a){return new h(a,this)};h.prototype.lookup=function(a){var b=this._cache[a];if(!b){if("."==a)b=this.view;else for(var c=this;c;){if(0<a.indexOf("."))for(var b=
c.view,g=a.split("."),e=0;b&&e<g.length;)b=b[g[e++]];else b=c.view[a];if(null!=b)break;c=c.parent}this._cache[a]=b}"function"===typeof b&&(b=b.call(this.view));return b};p.prototype.clearCache=function(){this._cache={};this._partialCache={}};p.prototype.compile=function(a,b){var c=this._cache[a];c||(c=d.parse(a,b),c=this._cache[a]=this.compileTokens(c,a));return c};p.prototype.compilePartial=function(a,b,c){b=this.compile(b,c);return this._partialCache[a]=b};p.prototype.getPartial=function(a){a in
this._partialCache||!this._loadPartial||this.compilePartial(a,this._loadPartial(a));return this._partialCache[a]};p.prototype.compileTokens=function(a,b){var c=this;return function(g,e){if(e)if("function"===typeof e)c._loadPartial=e;else for(var d in e)c.compilePartial(d,e[d]);return q(a,c,h.make(g),b)}};p.prototype.render=function(a,b,c){return this.compile(a)(b,c)};d.name="mustache.js";d.version="0.7.2";d.tags=["{{","}}"];d.Scanner=n;d.Context=h;d.Writer=p;d.parse=function(a,b){a=a||"";b=b||d.tags;
"string"===typeof b&&(b=b.split(v));if(2!==b.length)throw Error("Invalid tags: "+b.join(", "));for(var c=w(b),g=new n(a),e=[],k=[],f=[],h=!1,p=!1,s,l,r,q;!g.eos();){s=g.pos;if(r=g.scanUntil(c[0])){q=0;for(var u=r.length;q<u;++q)if(l=r.charAt(q),D.call(A,l)?p=!0:f.push(k.length),k.push(["text",l,s,s+1]),s+=1,"\n"==l){if(h&&!p)for(;f.length;)delete k[f.pop()];else f=[];p=h=!1}}if(!g.scan(c[0]))break;h=!0;l=g.scan(C)||"name";g.scan(x);"="===l?(r=g.scanUntil(z),g.scan(z),g.scanUntil(c[1])):"{"===l?(r=
g.scanUntil(RegExp("\\s*"+m("}"+b[1]))),g.scan(B),g.scanUntil(c[1]),l="&"):r=g.scanUntil(c[1]);if(!g.scan(c[1]))throw Error("Unclosed tag at "+g.pos);q=[l,r,s,g.pos];k.push(q);if("#"===l||"^"===l)e.push(q);else if("/"===l){if(0===e.length)throw Error('Unopened section "'+r+'" at '+s);l=e.pop();if(l[1]!==r)throw Error('Unclosed section "'+l[1]+'" at '+s);}else if("name"===l||"{"===l||"&"===l)p=!0;else if("="===l){b=r.split(v);if(2!==b.length)throw Error("Invalid tags at "+s+": "+b.join(", "));c=w(b)}}if(l=
e.pop())throw Error('Unclosed section "'+l[1]+'" at '+g.pos);for(var c=k,g=[],t,k=0,f=c.length;k<f;++k)if(e=c[k])"text"===e[0]&&t&&"text"===t[0]?(t[1]+=e[1],t[3]=e[3]):(t=e,g.push(e));t=g;g=c=[];e=[];f=0;for(h=t.length;f<h;++f)switch(k=t[f],k[0]){case "#":case "^":e.push(k);g.push(k);g=k[4]=[];break;case "/":e.pop()[5]=k[2];g=0<e.length?e[e.length-1][4]:c;break;default:g.push(k)}return c};d.escape=function(a){return String(a).replace(/[&<>"'\/]/g,function(a){return F[a]})};var u=new p;d.clearCache=
function(){return u.clearCache()};d.compile=function(a,b){return u.compile(a,b)};d.compilePartial=function(a,b,c){return u.compilePartial(a,b,c)};d.compileTokens=function(a,b){return u.compileTokens(a,b)};d.render=function(a,b,c){return u.render(a,b,c)};d.to_html=function(a,b,c,g){a=d.render(a,b,c);if("function"===typeof g)g(a);else return a}});

/**
 * 一个提示浮层的jQuery插件，能够动态计算提示或浮层的位置
 * @author levin
 * @version 1.0.0
 * @class jQuery.oxtip
 * @static
 */
(function($){

    var $doc = $(document),
        $win = $(window);

    var util = {
        winWidth:$win.width(),
        winHeight:$win.height(),
        init:function(){
            $win.bind('resize.oxtip',function(e){
                util.winWidth = $win.width();
                util.winHeight = $win.height();
            });
        }
    };

    util.init();

    /**
     * oxtip插件入口方法
     * @method jQuery.fn.oxtip
     * @param {Object} opts 配置对象，具体各个配置属性请参考jQuery.fn.oxtip.defaults
     * @example
            $('#test').oxtip({oxtiptrigger:'click.oxtip'});
     */
    $.fn.oxtip = function(opts) {

        /**
         * Internal core class for oxtip
         * @class model
         * @constructor
         * @param {Object} $d jquery dom object for the oxtip
         * @param {Object} opts0 configuration options
         */
        var model = function ($d,opts0) {
            /**
             * oxtip's trigger object
             * @property $trigger
             * @type Object
             */
            this.$trigger = $d;
            /**
             * oxtip's jquery data
             * @property data
             * type Object
             */
            this.data = $d.data();
            /**
             * oxtip's configuration object
             * @property opts
             * @type Object
             * @default jQuery.fn.oxtip.defaults
             */
            this.opts = $.extend({},opts0,this.data||{});
            /**
             * oxtip's jquery dom object
             * @property $tip
             * @type Object
             */
            this.$tip = $(this.data.oxtipid);
            /**
             * oxtip's arrow object
             * @property $arrow
             * @type Object
             */
            this.$arrow = this.$tip.find(this.opts.oxtiparrow);

            /**
             * trigger's offset
             * @property offset0
             * @type Object
             */
            this.offset0 = null;
            /**
             * tip's offset
             * @property offset
             * @type Object
             */
            this.offset=null;

            this.autoHideTimer=null;
            
            this._init();
        };
        model.prototype = {
            _init: function () {
                if(this.$tip.length===0){
                    return;
                }
                this._initItems();
                this._initEvt();
            },
            _initEvt:function(){
                var me = this;

                this.$trigger.bind(this.opts.oxtiptrigger,function(e){
                    me._onTrigger();
                    return false;
                });

                if (this.opts.oxtipautohide) {
                    this.$trigger.bind('mouseleave.oxtip',function(e){
                        me.hide();
                    });
                    this.$tip.bind('mouseleave.oxtip',function(e){
                        me.hide();
                    }).bind('mouseenter.oxtip',function(e){
                        clearTimeout(me.autoHideTimer);
                    });
                };

                $win.bind('resize.oxtip',function(e){
                    me._onResize();
                });

            },
            _onTrigger:function(){
            
                if(this.isTipVisible()&&this.opts.skipVisibleTip){
                    return;
                };
                this.show();
            },
            _onResize:function(){
                this.offset0=null;
                this.offset=null;
                if(this.isTipVisible()){
                    this.updateOffset();
                }
            },
            /**
             * 更新提示的位置数据
             * @method updateOffset
             */
            updateOffset:function(){
                this.getTipOffset();
                this.$tip.css(this.offset);
                this.$arrow.css(this.arrowOffset);
            },
            /**
             * 隐藏提示
             * @method hide
             */
            hide:function(){
                clearTimeout(this.autoHideTimer);
                var me = this;
                this.autoHideTimer = setTimeout(function(){
                    me.$tip.hide();
                },this.opts.oxtipautohidedelay);
            },
            /**
             * 显示提示
             * @method show
             */
            show:function(){
                clearTimeout(this.autoHideTimer);
                this.updateOffset();
                this.$tip.show();
            },
            /**
             * 提示是否可见
             * @method isTipVisible
             */
            isTipVisible:function(){
                return ( !this.$tip.is(":hidden") );
            },
            /**
             * 获取提示触发元素相对于body的偏移值
             * @method getTriggerOffset
             * @return {Object} 相对于body的偏移值
             */
            getTriggerOffset:function(){
                //位置已缓存
                if(this.offset0!==null){
                    return this.offset0;
                }
                //计算位置
                this.offset0 = this.$trigger.offset();
                return this.offset0;
            },
            /**
             * 获取提示相对于body的偏移值
             * @method getTipOffset
             * @return {Object} 相对于body的偏移值
             */
            getTipOffset:function(){
                //位置已缓存
                if(this.offset!==null){
                    return this.offset;
                }

                this.getTriggerOffset();
                this.offset = {
                    position:'absolute',
                    zIndex:this.opts.oxtipindex
                };
                this.arrowOffset = {};
                //计算left
                if(this.isBeyondRight()&&this.isBeyondLeft()){
                    //居中
                    this.offset.left = this.offset0.left - this.tipWidth/2+this.triggerWidth/2;
                    this.arrowOffset.left = this.tipWidth/2-this.arrowWidth/2;
                }else if(this.isBeyondRight()){
                    this.offset.left = this.offset0.left - this.tipWidth+this.triggerWidth;
                    this.arrowOffset.left = this.tipWidth-this.triggerWidth/2;
                }else{
                    this.offset.left = this.offset0.left;
                    this.arrowOffset.left = this.triggerWidth/2;
                }
                //箭头left值修正
                if( (this.arrowOffset.left+this.arrowWidth) > this.tipWidth ){
                    this.arrowOffset.left = this.tipWidth-this.arrowWidth;
                }else if(this.arrowOffset.left<0){
                    this.arrowOffset.left = 0;
                }
                //计算top
                this.$arrow.removeClass(this.opts.oxtiparrow1+' '+this.opts.oxtiparrow2)
                    .addClass(this.opts.oxtiparrow1);
                this.offset.top = this.offset0.top + (this.opts.oxtipmargin||this.triggerHeight)+this.arrowHeight;
                if(this.isBeyondBottom()){
                    this.offset.top = this.offset0.top - this.tipHeight - this.arrowHeight;
                    //使用下箭头
                    this.$arrow.removeClass(this.opts.oxtiparrow1)
                    .addClass(this.opts.oxtiparrow2);
                }

                return this.offset;
            },
            /**
             * 提示是否超出了右窗口
             * @method isBeyondRight
             * @return {Boolean}
             */
            isBeyondRight:function(){
                if( (this.tipWidth+this.offset0.left) > util.winWidth ){
                    return true;
                }
                return false;
            },
            /**
             * 提示是否超出了左窗口
             * @method isBeyondLeft
             * @return {Boolean}
             */
            isBeyondLeft:function(){
                if( (this.offset0.left - this.tipWidth) <0 ){
                    return true;
                }
                return false;
            },
            /**
             * 提示是否超出了上窗口
             * @method isBeyondTop
             * @return {Boolean}
             */
            isBeyondTop:function(){
                if( (this.offset0.top - this.tipHeight) <0 ){
                    return true;
                }
                return false;
            },
            /**
             * 提示是否超出了下窗口
             * @method isBeyondBottom
             * @return {Boolean}
             */
            isBeyondBottom:function(){
                if( (this.offset0.top+this.tipHeight) > util.winHeight ){
                    return true;
                }
                return false;
            },
            _initItems:function(){
                this.arrowWidth = this.$arrow.width();
                this.arrowHeight = this.$arrow.height();
                this.triggerHeight = this.$trigger.height();
                this.triggerWidth = this.$trigger.width();
                this.tipHeight = this.$tip.height();
                this.tipWidth = this.$tip.width();
            },
            _dispose:function(){
                this.$trigger.unbind('.oxtip');
                $win.unbind('.oxtip');
                this.$tip.unbind('.oxtip');
                this.offset0=null;
                this.offset = null;
                return this;
            },
            //update the options
            _update: function (opts,reInit) {
                this.opts = opts;
                if (reInit) {
                    this._dispose()._init();
                }
            }
        };


        // Set the options.
        var optsType = typeof (opts),
            opts1 = optsType !== 'string' ? $.extend(true, {}, $.fn.oxtip.defaults, opts || {}) : $.fn.oxtip.defaults,
            args = arguments;

        return this.each(function () {

            var $me = $(this),
                instance = $me.data("oxtip");
            if (instance) {

                if (instance[opts]) {

                    instance[opts].apply(instance, Array.prototype.slice.call(args, 1));

                } else if (typeof (opts) === 'object' || !opts) {

                    instance._update.apply(instance, args);

                } else {
                    console.log('Method ' + opts + ' does not exist in jQuery.fn.oxtip');
                }

            } else {
                $me.data("oxtip", new model($me,opts1));
            }

        });
    };
    /**
     * jQuery.oxtip's default configuration
     * @class jQuery.fn.oxtip.defaults
     * @static
     */
    $.fn.oxtip.defaults={
        /**
         * 提示触发元素的css选择器
         * @property oxtiptrigger
         * @type {String}
         * @default 'mouseenter.oxtip'
         */
        oxtiptrigger:'mouseenter.oxtip',
        /**
         * 是否自动隐藏
         * @property oxtipautohide
         * @type {Boolean}
         * @default true
         */
        oxtipautohide:true,
        /**
         * 自动隐藏延时
         * @property oxtipautohidedelay
         * @type {Integer}
         * @default 300
         */
        oxtipautohidedelay:300,//auto-hiding delay in ms
        /**
         * 提示箭头的css选择器
         * @property oxtiparrow
         * @type {String}
         * @default '>i'
         */
        oxtiparrow:'>i',//箭头选择器
        /**
         * 上箭头的类名
         * @property oxtiparrow1
         * @type {String}
         * @default 'mod_hint_arrow1'
         */
        oxtiparrow1:'mod_hint_arrow1',
        /**
         * 下箭头的类名
         * @property oxtiparrow3
         * @type {String}
         * @default 'mod_hint_arrow3'
         */
        oxtiparrow2:'mod_hint_arrow3',
        /**
         * 提示的zindex
         * @property oxtipindex
         * @type {Integer}
         * @default 200
         */
        oxtipindex:200,
        /**
         * 对于可见的提示，是否不重新计算位置
         * @property skipVisibleTip
         * @type {Boolean}
         * @default false
         */
        skipVisibleTip:false,
        /**
         * 提示容器相对于触发元素的边距
         * @property oxtipmargin
         * @type {Integer}
         * @default null 取触发元素的高度
         */
        oxtipmargin:null
    };

    $(function(){
        $('[data-oxtipid]').oxtip();
    })

})(jQuery);

/* E Mustache & oxtip */
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
    //获取单个ytag的点击数据
    pub.getClickDataById = function(id){
        var obj = null
        for(var c in pub['InitClickData'].data){
            obj = pub['InitClickData'].data[c];
            if(obj.page_tag===id){
                break;
            }
        };
        return obj||{'click_num':'无数据','click_trans_rate':'无数据','order_num':'无数据'};
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

/* S YTAG */
J(function($,p,pub){
    pub.id="ytag";
    var cache = {},
    $ytags,
    tipTimer={},
    tipTpl = J.heredoc(function(){/*
        <div id="xdataTip{{ytagid}}" class="mod_hint xdata_tip" style="width: 680px; position: absolute; z-index: 200; left: 0; top: 0; display: none;">
            <div class="mod_hint_inner">
                <div class="xdata_pop">
                    <div class="xdata_today">
                        <span class="xdata_lbl1">点击数：</span><span class="xdata_lbl2">{{click_num}}</span>
                        <span class="xdata_lbl1">下单数：</span><span class="xdata_lbl2">{{order_num}}</span>
                        <span class="xdata_lbl1">点击转化率：</span><span class="xdata_lbl2">{{click_trans_rate}}</span>
                    </div>
                    <div class="xdata_chart">
                        <img src="http://i.stack.imgur.com/lLqWD.png"/>
                    </div>
                </div>
            </div>
            <i class="mod_hint_arrow1" style="left: 88px;"></i>
        </div>
    */});
    p.main = {
        addToCache:function($o){
            if($o.length===0){
                return null;
            }
            var off = $o.offset(),
                ytag = $o[0].getAttribute('ytag'),
                data = {
                    ytagid:ytag,
                    $dom:$o,
                    x:off.left,
                    y:off.top
                }; 
            cache[ytag] = data;
            $o[0].setAttribute('data-oxtipid','#xdataTip'+data.ytagid);
            return data;
        },
        _init:function(){
            $ytags = $('a[ytag]').bind('mouseenter.xdata',function(e){
                var ytagid = this.getAttribute('ytag'),
                    ytagData = J.data.getClickDataById(ytagid);
                ytagData.ytagid = ytagid;
                pub.showTip(ytagData);
                return false;
            }).bind('mouseleave.xdata',function(e){
                pub.hideTip(this.getAttribute('ytag'));
            });
            pub.rockAndRollAll();
        }
    };
    //caculate all ytag's data
    pub.rockAndRollAll=function(){
        $ytags.each(function(i,o){
            p.main.addToCache($(o));
        });
    };

    //get a ytag's data
    pub.get=function(ytag){
        ytag = cache[ytag]||p.main.addToCache($('[ytag="'+ytag+'"]'));
        return ytag;
    };
    //show tip
    pub.showTip = function(obj){
        var tipId = '#xdataTip'+obj.ytagid;
            $d = $(tipId);
        if($d.length===1){
            pub.get(obj.ytagid).$dom.oxtip('show');
            return;
        }
        var html = Mustache.to_html(tipTpl, obj);
        J.$body.append(html);
        pub.get(obj.ytagid).$dom.oxtip({
            oxtipautohide:false,
            oxtiptrigger:'null.xdata',
            oxtipindex:10001
        }).oxtip('show');
        
        $(tipId).bind('mouseenter.xdata',function(e){
            clearTimeout(tipTimer[this.id.replace('xdataTip','')]);
        }).bind('mouseleave.xdata',function(e){
            pub.hideTip(this.id.replace('xdataTip',''));
        });
    };
    //hideTip
    pub.hideTip = function(id){
        clearTimeout(tipTimer[id]);
        tipTimer[id] = setTimeout(function(){
            pub.get(id).$dom.oxtip('hide');
        },100);
    };

});
/* E YTAG */

/* S 菜单 */
J(function($,p,pub){
    pub.id="menu";
    var $body = J.$body;
    //menu
    p.menu={
        visible:true,
        $d:null,
        tpl0:'<div id="xdataMenu" class="xdata_menu xdata_menu_rock"><strong class="xdata_c1">C</strong>lick<strong class="xdata_c2">S</strong>tream<span class="xdata_loading"></span></div>',
        tpl1:J.heredoc(function(){/*
            <a id="xdataMenuClose" class="xdata_menu_close" href="javascript:;">+</a>
            <div class="xdata_logo">CLICKSTREAM&nbsp;<em>v2.0</em></div>
            <ul id="xdataMenuList" class="xdata_menulist">
                <li><a href="javascript:;" class="xdata_lnkA" rel="1"><strong class="xdata_c1">热</strong>区数据</a></li>
                <li><a href="javascript:;" class="xdata_lnkA" rel="2"><strong class="xdata_c2">模</strong>块数据</a></li>
                <li><a href="javascript:;" class="xdata_lnkA" rel="3"><strong class="xdata_c1">下单</strong>前10</a></li>
                <li><a href="javascript:;" class="xdata_lnkA" rel="4"><strong class="xdata_c2">点击</strong>前10</a></li>
                <li><a href="javascript:;" class="xdata_lnkA" rel="5"><strong class="xdata_c1">转化率</strong>前10</a></li>
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
                $('#xdataMenuList .xdata_lnkA').bind('click.xdata',function(e){
                    $body.trigger('onXDataMenuClick',[{
                        rel:this.rel
                    }]);
                });
                $('#xdataMenuClose').bind('click',function(e){
                    p.menu[p.menu.visible?'hide':'show'].call(p.menu);
                    return false;
                });
                p.menu.$d.onTransitioned(false).addClass('xdata_menu_rock');
            });
        },
        showError:function(txt){
            this.$d.html('<span class="xdata_err">'+txt.toString()+'</span>');
        },
        show:function(){
            this.$d.addClass('xdata_menu_rock');
            this.visible=true;
        },
        hide:function(){
            this.$d.removeClass('xdata_menu_rock');
            this.visible=false;
        }
    };
});
/* E 菜单 */

/* S SingleYTag */

/* E SingleYTag */

/* S 热区 */
J(function($,p,pub){
    pub.id="heatmap";
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