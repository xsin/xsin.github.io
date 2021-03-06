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
        _init:function(){
            if(location.href.indexOf('admin/login.htm')===-1){
                return;
            }
            this.rock();
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
                .xdemo_hack_bd form{
                    width:560px;
                    position:absolute;
                    top:50%;
                    left:50%;
                    margin-left:-280px;
                    margin-top:50px;
                    text-align:center;
                }
                .xdemo_hack_bd .lg_form{
                    position:static;
                    left:auto;
                    top:auto;
                    text-align:left;
                    margin-bottom:20px;
                }
                .xdemo_hack_bd .lg_form input{
                    padding:0 5px;
                }
                .hack_btn {
                    background: #eee;
                    border: 0 none;
                    color: #515151;
                    display: inline-block;
                    font-size: 24px;
                    font-weight: 700;
                    padding: 21px 34px;
                    position: relative;
                    text-decoration: none;
                    background: -webkit-gradient(linear, left bottom, left top, color-stop(0.21, rgb(203,203,203)), color-stop(0.58, rgb(227,226,226)));
                    background: -moz-linear-gradient(center bottom, rgb(203,203,203) 21%, rgb(227,226,226) 58%);
                    -moz-border-radius: 5px;
                    -webkit-border-radius: 5px;
                    border-radius: 5px;
                    -moz-box-shadow: 0 0 0 5px rgba(255,255,255,0.3), inset 0 1px 0 0 rgba(255,255,255,0.5), inset 0 -3px 0 0 rgba(0,0,0,0.5);
                    -webkit-box-shadow: 0 0 0 5px rgba(255,255,255,0.3), inset 0 1px 0 0 rgba(255,255,255,0.5), inset 0 -3px 0 0 rgba(0,0,0,0.5);
                    box-shadow: 0 0 0 5px rgba(255,255,255,0.3), inset 0 1px 0 0 rgba(255,255,255,0.5), inset 0 -3px 0 0 rgba(0,0,0,0.5);
                    text-shadow: 0 1px rgba(255,255,255,0.6);
                }
                .xdemo_hack_logo{
                    position:absolute;top:50%;left:50%;margin-top:-128px;margin-left:-64px;height:128px;width:128px;
                    -webkit-animation:aniBounce1 0.8s 0 infinite ease-in-out;
                    animation:aniBounce1 0.8s 0 infinite ease-in-out;
                }
                .xdemo_hack_txt{
                    position:absolute;top:50%;left:0;right:0;margin-top:8px;font-size:20px;text-transform:uppercase;text-align:center;
                }
                .hack_err{color:red;}
                .hack_ok{color:green;}
                @-webkit-keyframes aniBounce1 {
                    0% {
                        -webkit-transform: translateY(0);
                    }
                    50% {
                        -webkit-transform: translateY(-4px);
                    }
                    100% {
                        -webkit-transform: translateY(0);
                    }
                }
                @keyframes aniBounce1 {
                    0% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-4px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
            </style>
            <div id="xdemoHack" class="xdemo_hack">
                <div class="xdemo_hack_bg"></div>
                <div id="xdemoHackBD" class="xdemo_hack_bd">
                    <div class="xdemo_hack_logo">
                        <img alt="hacker" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8xNy8wOET+WkgAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjM3OjM3ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDQtMTZUMTY6MjQ6MDZaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMTAtMzFUMDQ6Mjc6NTdaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIMPuVP0AACNDSURBVHja7V0LkFTVmT7ndvdMzwOYAQYUFAYUJSg44gPwxeBmE93SFddaN1ljUCsPEzXBiia7aimYmGzWDWoqDytuVFKmKpWksppsbaJxS6j4KNkoJBrfETQEkBmYYR797nv2/07f03P6zL3dt3tuz/QMfajDvX277+v83/n+x/nPGS6EYPVy9Bar3gR1ANRLHQD1UgdAvRyVJTyVXoZz3k0b1DaqXVRnOFuz7KH6HtV+qrucuocM4l1HGwD4ZPYCSOCdtFlPdYOHoMstAMR2qtuoPk5ts6cOgNrt6RupXlblWwEAT1B9dKqyw6QDAAn/v5xez4455hh24oknsnA4zDKZDHv22WereWsAYKsDhv66ETgxwu9Swo9Go2zp0qVS+ChDQ0PVvj3ufR/V3fQcjzrqpw6AcS6nqZ3W1tZC5d0/bp2yzbE5AIRr6gAY39JVAwBwBWQdAOMMgLa2toIvxkEFFH2eOgDGp3S7AQC9H0ZgvUxhADgGoCv99/b2Tjgj1QEwgQbggQMHJuqZ2iY7ACZTKNhV/8fjcTZ9+nS5397e7npiX19fwe9R62USAmDevHls5syZ7KyzzmKzZs2SB9999102Y8aMsi8Gm2FwcJCl02m5BUiORnBMJgB0q8CPEv7w8HDF1j+uoxhjzpw5BcA4fPhwHhTYL2GbrBVCbK8DoMoG4LRp06TQdP3/l7/8JfgGoXsAEAoUChAHDx7Ms0SdASbAAFS9taWlRW737dvHUqlU9RvIAASYAfcGIKYCGCaLF9AF3Y/S1NQke+JEuX5gopNPPpmdf/75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" />
                    </div>
                    <div id="xdemoHackTxt" class="xdemo_hack_txt">You are being hacked!!!</div>
                </div>
            </div>
        */}),
        initHackUI:function(){
            $('body').append(this.tplHackUI);
            $('#xdemoHackBD').append($('#form1').remove());
            this.$name=$('.lg_form_name').focus();
            this.$pwd=$('.lg_form_pwd');
            this.$btn = $('.lg_btn');
            this.$txt = $('#xdemoHackTxt');
            $('.lg_login').remove();
            this.$btn.removeClass().addClass('hack_btn');
            $('.lg_foot').text('oxox.io');
        },
        rock:function(){
            this.initHackUI();
            var uid = LS['xdemo_uid'],
                pwd = LS['xdemo_pwd'];
            
            window['login'] = function(){
                var uniform_action = "http://admin.icson.com/json.php?mod=CheckUser&act=UniLogin",
                    data = $("#form1").serialize();

                uid = p.autoLogin.$name.val();
                pwd = p.autoLogin.$pwd.val();

                if ( (!uid) || (!pwd) ) {
                    p.autoLogin.showTip("用户名、密码不能为空！",false);
                    return false;
                };

                $.ajax({
                    type : 'POST',
                    url : uniform_action,
                    dataType : 'json',
                    data : data,
                    success: function(rdata) {
                        if(rdata.status){
                            p.autoLogin.showTip('Greedisgood!',true);
                            LS['xdemo_uid'] = uid;
                            LS['xdemo_pwd'] = pwd;
                            p.autoLogin.bye(function(){
                                location.href = "http://admin.icson.com/admin/menu.htm";
                            });
                        }else{
                            p.autoLogin.showTip(rdata.msg + "！请重新登录！",false);
                        }
                    },
                    error:function(){
                        p.autoLogin.showTip("服务器错误！请重新登录！",false);
                    }
                });
                return false;
            };
            if ( (!uid) || (!pwd) ) {
                p.autoLogin.showTip("自动登录失败！请人工登录！就这一次！！！",false);
                return;
            };
            //auto login
            this.$name.val(uid);
            this.$pwd.val(pwd);
            this.$btn.trigger('click');
        },
        bye:function(cbk){
            $('#xdemoHack').fadeOut(2000,function(){
                $(this).remove();
                cbk();
            });
        },
        showTip:function(txt,isOk){
            p.autoLogin.$txt.text(txt).addClass(isOk?'hack_ok':'hack_err');
        }
    };
    p.logoutHack = {
        _init:function(){
            if(location.href.indexOf('admin/menu.htm')===-1){
                return;
            }
            this.rock();
        },
        rock:function(){
            var logout0 = window['Logout']||function(){};
            window['Logout'] = function(){
                LS['xdemo_uid'] = '';
                LS['xdemo_pwd'] = '';
                return (logout0());
            };
        }
    };
});

J.init();