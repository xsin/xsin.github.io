// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name default.js
// @code_url http://twitter.github.com/hogan.js/builds/2.0.0/hogan-2.0.0.js
// @code_url https://raw.github.com/mamboer/j/v1/src/j.core.js
// @code_url https://raw.github.com/mamboer/j/master/src/j.jq.onTransitioned.js
// ==/ClosureCompiler==

/**
 * @namespace JJ
 * @summary 一个简单的js模块管理框架
 * @desc 实现Module Pattern，解决最基本的js代码组织问题。不包含依赖管理，动态加载等功能，如需要推荐使用SeaJS或RequireJS。注：JF假设你使用jQuery，如果您使用别的库，可以针对性改一下代码。
 * @author Levin
 * @version 2.0.0
 * @example 
    JJ('id',function(M,V,C){
        C.submodule = {
            _init:function(){
                alert('init submodule');
            }
        };

        this.hi = function(){
            alert('hi from module'+this.id);
        };
    });
 */
var JJ = (function(){

    var modUtil = {
        //export global event
        EVT:function(name){
            JJ.EVT[this.id][name]=this.id+'_'+name+'.'+this.id;
        }
    };

    var define = function(module,id){
        var module1 = {id:id,_M:{},_V:{},_C:{}},
            jSay = window[JJ.__mode==='silent'?'throw':'alert'];
        module.call(module1,module1._M,module1._V,module1._C);
        if (!module1.id) {
            jSay('JJ complains: A JJ module require a public id property!');
            return;
        };
        if (JJ[module1.id]) {
            jSay('JJ complains: A JJ module with id "'+module1.id+'" exists!');
            return;
        };
        //add a JJ module
        JJ.EVT[module1.id]={};
        for(var c in modUtil){
            module1[c]=JJ.proxy(module1,modUtil[c]);
        };
        JJ[module1.id]=module1;
        module1=null;
    };

    return (function(id,module){
        var t = typeof(id);
        if (t==='undefined') {return JJ;};
        if (t==='function'){ return define(id);};
        if (t==='object'){return id;};
        t = typeof(module);
        if (t==='undefined') {return JJ[id];};
        if (t==='function') {return define(module,id);};
    });
})();
JJ.__mode="silent";
JJ.EVT={};
JJ.proxy=function(_this,func){
    return (function(){
        return func.apply(_this,arguments);
    });
};

/**
 * @public
 * @name JJ#GOD
 * @summary common JJ module loader
 */
JJ('GOD',function(M,V,C){
    var $ = window['Zepto']||window['jQuery']||(function(){
        var my$ = function(cbk){
            // Old browsers
            if (window.addEventListener)
                window.addEventListener('load', cbk, false);
            else if (window.attachEvent)
                window.attachEvent('onload', cbk);
            else {
                var fn = window.onload; // very old browser, copy old onload
                window.onload = function() { // replace by new onload and call the old one
                    fn && fn();
                    cbk();
                };
            };
        };
        //simple extend
        my$.extend = function(targetObj,srcObj){
            for(var c in srcObj){
                targetObj[c]=srcObj[c];
            };
            return targetObj;
        };
        return my$;
    })();
    /**
     * @private
     * @desc execSub 初始化JJ模块的子模块
     * @param {Object} sub 子模块
     * @param {String} action 接口方法名
     */
    C.execSub = function(sub,action){
        if(typeof(sub)!=='object') return;
        for (var c in sub) {
            c = sub[c];
            if (!c) {
                continue;
            };
            if ( C.isFunc(c[action]) ) {
                c[action].call(c);
                delete c[action];
            };
            //sub sub module
            C.execSub(c,action);
        };
    };
    /**
     * @private
     * @desc exec 初始化JJ的模块
     * @param {String} action 模块回调函数名称，JJ一共定义了有两个回调接口:1,_onLoad 页面内容加载完毕后的回调；2，_init
     */
    C.exec = function(action,destroyMVCAfterExec){
        for (var m in JJ) {
            if(typeof(JJ[m])!=='object') continue;
            //skip special objects
            if ( m==='GOD' || m==='EVT' || m==='init'/*jquery compatibility*/||m==='onLoad') {continue;};
            m = JJ[m];
            if( C.isFunc(m[action]) ) {
                m[action].call(m);
                delete m[action];
            };
            var mvc = ['_M','_V','_C'],len=mvc.length;
            for(var i=0;i<len;i++){
                m[mvc[i]] && C.execSub(m[mvc[i]],action);
                destroyMVCAfterExec && (delete m[mvc[i]]);
            };
        };
    };
    //function test
    C.isFunc = function(v){
        return (v && typeof(v)==='function');
    };
    /**
    * 初始化JJ框架，页面js逻辑的唯一入口。一般至于</body>标签之前，用户向整个app传递参数用
    * @public
    * @function
    * @name JJ#init
    * @param {Object} opts 配置对象
    * @example
    *
    *   JJ.init({x:'kk',y:'zz'});
    *
    */
    this.init = function (opts) {
        JJ.opts = M.opts = opts = $.extend(opts || {},JJ.opts||{});
        C.exec('_init',false);
        //document ready callback
        $(function(){
            C.exec('_onLoad',true);
        });
    };
    
    //export the init method to JJ
    JJ.init = this.init;

});

JJ.heredoc = function(fn){return (fn.toString().split('\n').slice(1,-1).join('\n') + '\n');};
JJ.log = function(obj){(window['console']||{log:function(x){alert(x);}}).log(obj);};
JJ.$win = $(window);
JJ.$body=$('body');