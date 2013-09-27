// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name default.js
// @code_url https://raw.github.com/janl/mustache.js/master/mustache.js
// @code_url https://raw.github.com/mamboer/j/master/src/j.core.js
// @code_url https://raw.github.com/mamboer/j/master/src/j.jq.onTransitioned.js
// ==/ClosureCompiler==
(function(h,k){if("object"===typeof exports&&exports)k(exports);else{var l={};k(l);"function"===typeof define&&define.amd?define(l):h.Mustache=l}})(this,function(h){function k(b){return b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function l(b){this.tail=this.string=b;this.pos=0}function n(b,c){this.view=b||{};this.parent=c;this._cache={}}function a(){this.clearCache()}function d(b,c,e,u){for(var f="",a,g,k=0,l=b.length;k<l;++k)switch(a=b[k],g=a[1],a[0]){case "#":g=e.lookup(g);if("object"===typeof g)if(w(g))for(var v=
0,m=g.length;v<m;++v)f+=d(a[4],c,e.push(g[v]),u);else g&&(f+=d(a[4],c,e.push(g),u));else"function"===typeof g?(a=null==u?null:u.slice(a[3],a[5]),g=g.call(e.view,a,function(b){return c.render(b,e)}),null!=g&&(f+=g)):g&&(f+=d(a[4],c,e,u));break;case "^":g=e.lookup(g);if(!g||w(g)&&0===g.length)f+=d(a[4],c,e,u);break;case ">":g=c.getPartial(g);"function"===typeof g&&(f+=g(e));break;case "&":g=e.lookup(g);null!=g&&(f+=g);break;case "name":g=e.lookup(g);null!=g&&(f+=h.escape(g));break;case "text":f+=g}return f}
function v(b){return[RegExp(k(b[0])+"\\s*"),RegExp("\\s*"+k(b[1]))]}var z=/\s*/,x=/\s+/,A=/\S/,y=/\s*=/,B=/\s*\}/,C=/#|\^|\/|>|\{|&|=|!/,D=RegExp.prototype.test,E=Object.prototype.toString,w=Array.isArray||function(b){return"[object Array]"===E.call(b)},F={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};l.prototype.eos=function(){return""===this.tail};l.prototype.scan=function(b){return(b=this.tail.match(b))&&0===b.index?(this.tail=this.tail.substring(b[0].length),this.pos+=
b[0].length,b[0]):""};l.prototype.scanUntil=function(b){var c=this.tail.search(b);switch(c){case -1:b=this.tail;this.pos+=this.tail.length;this.tail="";break;case 0:b="";break;default:b=this.tail.substring(0,c),this.tail=this.tail.substring(c),this.pos+=c}return b};n.make=function(b){return b instanceof n?b:new n(b)};n.prototype.push=function(b){return new n(b,this)};n.prototype.lookup=function(b){var c=this._cache[b];if(!c){if("."==b)c=this.view;else for(var e=this;e;){if(0<b.indexOf("."))for(var c=
e.view,a=b.split("."),f=0;c&&f<a.length;)c=c[a[f++]];else c=e.view[b];if(null!=c)break;e=e.parent}this._cache[b]=c}"function"===typeof c&&(c=c.call(this.view));return c};a.prototype.clearCache=function(){this._cache={};this._partialCache={}};a.prototype.compile=function(b,c){var e=this._cache[b];e||(e=h.parse(b,c),e=this._cache[b]=this.compileTokens(e,b));return e};a.prototype.compilePartial=function(b,c,e){c=this.compile(c,e);return this._partialCache[b]=c};a.prototype.getPartial=function(b){b in
this._partialCache||!this._loadPartial||this.compilePartial(b,this._loadPartial(b));return this._partialCache[b]};a.prototype.compileTokens=function(b,c){var e=this;return function(a,f){if(f)if("function"===typeof f)e._loadPartial=f;else for(var k in f)e.compilePartial(k,f[k]);return d(b,e,n.make(a),c)}};a.prototype.render=function(b,c,e){return this.compile(b)(c,e)};h.name="mustache.js";h.version="0.7.2";h.tags=["{{","}}"];h.Scanner=l;h.Context=n;h.Writer=a;h.parse=function(b,c){b=b||"";c=c||h.tags;
"string"===typeof c&&(c=c.split(x));if(2!==c.length)throw Error("Invalid tags: "+c.join(", "));for(var e=v(c),a=new l(b),f=[],d=[],g=[],n=!1,q=!1,r,m,p,t;!a.eos();){r=a.pos;if(p=a.scanUntil(e[0])){t=0;for(var w=p.length;t<w;++t)if(m=p.charAt(t),D.call(A,m)?q=!0:g.push(d.length),d.push(["text",m,r,r+1]),r+=1,"\n"==m){if(n&&!q)for(;g.length;)delete d[g.pop()];else g=[];q=n=!1}}if(!a.scan(e[0]))break;n=!0;m=a.scan(C)||"name";a.scan(z);"="===m?(p=a.scanUntil(y),a.scan(y),a.scanUntil(e[1])):"{"===m?(p=
a.scanUntil(RegExp("\\s*"+k("}"+c[1]))),a.scan(B),a.scanUntil(e[1]),m="&"):p=a.scanUntil(e[1]);if(!a.scan(e[1]))throw Error("Unclosed tag at "+a.pos);t=[m,p,r,a.pos];d.push(t);if("#"===m||"^"===m)f.push(t);else if("/"===m){if(0===f.length)throw Error('Unopened section "'+p+'" at '+r);m=f.pop();if(m[1]!==p)throw Error('Unclosed section "'+m[1]+'" at '+r);}else if("name"===m||"{"===m||"&"===m)q=!0;else if("="===m){c=p.split(x);if(2!==c.length)throw Error("Invalid tags at "+r+": "+c.join(", "));e=v(c)}}if(m=
f.pop())throw Error('Unclosed section "'+m[1]+'" at '+a.pos);for(var e=d,a=[],s,d=0,g=e.length;d<g;++d)if(f=e[d])"text"===f[0]&&s&&"text"===s[0]?(s[1]+=f[1],s[3]=f[3]):(s=f,a.push(f));s=a;a=e=[];f=[];g=0;for(n=s.length;g<n;++g)switch(d=s[g],d[0]){case "#":case "^":f.push(d);a.push(d);a=d[4]=[];break;case "/":f.pop()[5]=d[2];a=0<f.length?f[f.length-1][4]:e;break;default:a.push(d)}return e};h.escape=function(b){return String(b).replace(/[&<>"'\/]/g,function(b){return F[b]})};var q=new a;h.clearCache=
function(){return q.clearCache()};h.compile=function(b,a){return q.compile(b,a)};h.compilePartial=function(b,a,d){return q.compilePartial(b,a,d)};h.compileTokens=function(a,c){return q.compileTokens(a,c)};h.render=function(a,c,d){return q.render(a,c,d)};h.to_html=function(a,c,d,k){a=h.render(a,c,d);if("function"===typeof k)k(a);else return a}});var J=function(h){return function(k){var l=typeof k;if("undefined"===l)return J;if("string"===l)return J[k];"function"===l&&(l={_:{}},k.call(J,h,l._,l),l.id?J[l.id]?alert('A J module with id "'+l.id+'" exists!'):J[l.id]=l:alert("A J module require a public id property!"))}}(jQuery);
(function(h){var k={},l={};k.onLoaded=function(){for(var a in J)"init"!==a&&"onLoad"!==a&&(a=J[a],k.isFunc(a._onLoad)&&(a._onLoad.call(a),delete a._onLoad),a._&&(k.loadSub(a._),delete a._))};k.initEvents=function(a){h(document).ready(k.onLoaded)};k.isFunc=function(a){return a&&"function"===typeof a};k.initSub=function(a){for(var d in a)if(d=a[d]){k.isFunc(d._init)&&(d._init.call(d),delete d._init);for(var h in d)(h=d[h])&&k.isFunc(h._init)&&(h._init.call(h),delete h._init)}};k.loadSub=function(a){for(var d in a)if(d=
a[d]){k.isFunc(d._onLoad)&&(d._onLoad.call(d),delete d._onLoad);for(var h in d)(h=d[h])&&k.isFunc(h._onLoad)&&(h._onLoad.call(h),delete h._onLoad)}};l.init=function(a){J.opts=k.opts=h.extend(a||{},J.opts||{});for(var d in J)"init"!==d&&"onLoad"!==d&&(d=J[d],k.isFunc(d._init)&&(d._init.call(d),delete d._init),d._&&k.initSub(d._));k.initEvents()};l.onLoad=k.onLoaded;for(var n in l)n&&(J[n]=l[n])})(window.jQuery);(function(h){h.fn.onTransitioned=function(k){return this.each(function(){!1===k?h(this).unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"):h(this).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",k)})}})(jQuery);

J.heredoc = function(fn){return (fn.toString().split('\n').slice(1,-1).join('\n') + '\n');};
J.log = function(obj){(window['console']||{log:function(x){alert(x);}}).log(obj);};

J(function($,p,pub){
    pub.id="core";
    var LS = localStorage;
    p.autoLogin = {
        $name:$('.lg_form_name'),
        $pwd:$('.lg_form_pwd'),
        _init:function(){
            if(this.$name.length){
                this.rock();
            }
        },
        tplHackUI:J.heredoc(function(){/*
            <style>
                .xdemo_hack{
                    position:fixed;top:0;left:0;bottom:0;right:0;z-index:10000;
                }
                .xdemo_hack_bg{
                    position:absolute;z-index:1;top:0;left:0;height:100%;width:100%;background-color:#000;opacity:0.8;
                }
                .xdemo_hack_bd{
                    position:absolute;z-index:2;height:100%;width:100%;color:#fff;
                }
                .xdemo_hack_logo{
                    position:absolute;top:50%;left:50%;margin-top:-64px;margin-left:-64px;height:128px;width:128px;
                }
                .xdemo_hack_txt{
                    position:absolute;top:50%;left:50%;margin-top:60px;margin-left:-64px;font-size:18px;
                }
            </style>
            <div class="xdemo_hack">
                <div class="xdemo_hack_bg"></div>
                <div class="xdemo_hack_bd">
                    <div class="xdemo_hack_logo"><img src="http://oxox.io/assets/img/nologo.png?09271324" alt="hacking"/></div>
                    <div class="xdemo_hack_txt">You are being hacked!!!</div>
                </div>
            </div>
        */}),
        initHackUI:function(){
            $('body').append(this.tplHackUI);
        },
        rock:function(){
            this.initHackUI();
            var uid = LS['xdemo_uid'],
                pwd = LS['xdemo_pwd'];
            if (!uid) {
                alert('自动登录失败，请按提示输入你的用户名和密码！');
                while( !(uid = $.trim(window.prompt('请输入用户名','')) ) );
                LS['xdemo_uid']=uid;
                while(!(pwd = $.trim(window.prompt('用户名已保存至localStorage，接着请输入密码','')) ) );
                LS['xdemo_pwd']=pwd;
            };
            this.$name.val(uid);
            this.$pwd.val(pwd);
            $('.lg_btn').trigger('click');
        }
    };
});

J.init();