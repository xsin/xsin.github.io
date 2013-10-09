// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name default.js
// @code_url http://twitter.github.com/hogan.js/builds/2.0.0/hogan-2.0.0.js
// @code_url http://oxox.io/assets/highcharts/3.0.5/highcharts.js
// @code_url http://oxox.io/assets/highcharts/3.0.5/highcharts-more.js
// @code_url http://oxox.io/assets/highcharts/3.0.5/modules/exporting.js
// @code_url http://draggabilly.desandro.com/draggabilly.pkgd.min.js
// @code_url http://oxox.io/jq/oxmenu/jquery.oxmenu.js
// @code_url https://raw.github.com/mamboer/j/master/src/j.core.js
// @code_url https://raw.github.com/mamboer/j/master/src/j.jq.onTransitioned.js
// ==/ClosureCompiler==
var Hogan={};
(function(g,v){function y(e){return String(null===e||void 0===e?"":e)}g.Template=function(e,g,k,n){this.r=e||this.r;this.c=k;this.options=n;this.text=g||"";this.buf=v?[]:""};g.Template.prototype={r:function(e,g,k){return""},v:function(t){t=y(t);return M.test(t)?t.replace(B,"&amp;").replace(l,"&lt;").replace(q,"&gt;").replace(e,"&#39;").replace(k,"&quot;"):t},t:y,render:function(e,g,k){return this.ri([e],g||{},k)},ri:function(e,g,k){return this.r(e,g,k)},rp:function(e,g,k,n){e=k[e];if(!e)return"";this.c&&
"string"==typeof e&&(e=this.c.compile(e,this.options));return e.ri(g,k,n)},rs:function(e,g,k){var n=e[e.length-1];if(D(n))for(var x=0;x<n.length;x++)e.push(n[x]),k(e,g,this),e.pop();else k(e,g,this)},s:function(e,g,k,n,x,l,q){if(D(e)&&0===e.length)return!1;"function"==typeof e&&(e=this.ls(e,g,k,n,x,l,q));k=""===e||!!e;!n&&k&&g&&g.push("object"==typeof e?e:g[g.length-1]);return k},d:function(e,g,k,n){var x=e.split("."),l=this.f(x[0],g,k,n),q=null;if("."===e&&D(g[g.length-2]))return g[g.length-1];for(e=
1;e<x.length;e++)l&&"object"==typeof l&&x[e]in l?(q=l,l=l[x[e]]):l="";if(n&&!l)return!1;n||"function"!=typeof l||(g.push(q),l=this.lv(l,g,k),g.pop());return l},f:function(e,g,k,n){for(var x=!1,l=null,q=!1,u=g.length-1;0<=u;u--)if((l=g[u])&&"object"==typeof l&&e in l){x=l[e];q=!0;break}if(!q)return n?!1:"";n||"function"!=typeof x||(x=this.lv(x,g,k));return x},ho:function(e,g,k,n,x){var l=this.c,q=this.options;q.delimiters=x;n=e.call(g,n);n=null==n?String(n):n.toString();this.b(l.compile(n,q).render(g,
k));return!1},b:v?function(e){this.buf.push(e)}:function(e){this.buf+=e},fl:v?function(){var e=this.buf.join("");this.buf=[];return e}:function(){var e=this.buf;this.buf="";return e},ls:function(e,g,k,n,x,l,q){g=g[g.length-1];var u=null;if(!n&&this.c&&0<e.length)return this.ho(e,g,k,this.text.substring(x,l),q);u=e.call(g);if("function"==typeof u){if(n)return!0;if(this.c)return this.ho(u,g,k,this.text.substring(x,l),q)}return u},lv:function(e,g,k){g=g[g.length-1];e=e.call(g);return"function"==typeof e&&
(e=y(e.call(g)),this.c&&~e.indexOf("{{"))?this.c.compile(e,this.options).render(g,k):y(e)}};var B=/&/g,l=/</g,q=/>/g,e=/\'/g,k=/\"/g,M=/[&<>\"\']/,D=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}})("undefined"!==typeof exports?exports:Hogan);
(function(g){function v(e){"}"===e.n.substr(e.n.length-1)&&(e.n=e.n.substring(0,e.n.length-1))}function y(e){return e.trim?e.trim():e.replace(/^\s*|\s*$/g,"")}function B(e,g,n){if(g.charAt(n)!=e.charAt(0))return!1;for(var k=1,l=e.length;k<l;k++)if(g.charAt(n+k)!=e.charAt(k))return!1;return!0}function l(e,g,n,k){g=[];for(var q=null,t=null;0<e.length;){t=e.shift();if(!(q="#"==t.tag)&&!(q="^"==t.tag))a:{for(var q=t,v=k,A=0,y=v.length;A<y;A++)if(v[A].o==q.n){q.tag="#";q=!0;break a}q=void 0}if(q)n.push(t),
t.nodes=l(e,t.tag,n,k);else if("/"==t.tag){if(0===n.length)throw Error("Closing tag without opener: /"+t.n);q=n.pop();if(e=t.n!=q.n){a:{e=0;for(n=k.length;e<n;e++)if(k[e].c==t.n&&k[e].o==q.n){k=!0;break a}k=void 0}e=!k}if(e)throw Error("Nesting error: "+q.n+" vs. "+t.n);q.end=t.i;return g}g.push(t)}if(0<n.length)throw Error("missing closing tag: "+n.pop().n);return g}function q(e){return e.replace(P,"\\\\").replace(D,'\\"').replace(t,"\\n").replace(A,"\\r")}function e(e){return~e.indexOf(".")?"d":
"f"}function k(g){for(var n="",l=0,u=g.length;l<u;l++){var t=g[l].tag;if("#"==t)var t=g[l].nodes,v=e(g[l].n),A=g[l].i,y=g[l].end,D=g[l].otag+" "+g[l].ctag,t="if(_.s(_."+v+'("'+q(g[l].n)+'",c,p,1),c,p,0,'+A+","+y+',"'+D+'")){_.rs(c,p,function(c,p,_){'+k(t)+"});c.pop();}",n=n+t;else"^"==t?(t=g[l].nodes,t="if(!_.s(_."+e(g[l].n)+'("'+q(g[l].n)+'",c,p,1),c,p,1,0,0,"")){'+k(t)+"};",n+=t):"<"==t||">"==t?n+='_.b(_.rp("'+q(g[l].n)+'",c,p,"'+(g[l].indent||"")+'"));':"{"==t||"&"==t?(t="_.b(_.t(_."+e(g[l].n)+
'("'+q(g[l].n)+'",c,p,0)));',n+=t):"\n"==t?n+='_.b("\\n"'+(g.length-1==l?"":" + i")+");":"_v"==t?(t="_.b(_.v(_."+e(g[l].n)+'("'+q(g[l].n)+'",c,p,0)));',n+=t):void 0===t&&(t='"'+q(g[l])+'"',n+="_.b("+t+");")}return n}var M=/\S/,D=/\"/g,t=/\n/g,A=/\r/g,P=/\\/g,n={"#":1,"^":2,"/":3,"!":4,">":5,"<":6,"=":7,_v:8,"{":9,"&":10};g.scan=function(e,g){function k(){0<ha.length&&(T.push(new String(ha)),ha="")}function l(e,r){k();var g;if(g=e)a:{g=!0;for(var s=da;s<T.length;s++)if(g=T[s].tag&&n[T[s].tag]<n._v||
!T[s].tag&&null===T[s].match(M),!g){g=!1;break a}}if(g){g=da;for(var H;g<T.length;g++)T[g].tag||((H=T[g+1])&&">"==H.tag&&(H.indent=T[g].toString()),T.splice(g,1))}else r||T.push({tag:"\n"});E=!1;da=T.length}function q(e,r){var g="="+ba,n=e.indexOf(g,r),k=y(e.substring(e.indexOf("=",r)+1,n)).split(" ");P=k[0];ba=k[1];return n+g.length-1}var t=e.length,A=0,D=null,V=null,ha="",T=[],E=!1,F=0,da=0,P="{{",ba="}}";g&&(g=g.split(" "),P=g[0],ba=g[1]);for(F=0;F<t;F++)0==A?B(P,e,F)?(--F,k(),A=1):"\n"==e.charAt(F)?
l(E):ha+=e.charAt(F):1==A?(F+=P.length-1,D=(V=n[e.charAt(F+1)])?e.charAt(F+1):"_v","="==D?(F=q(e,F),A=0):(V&&F++,A=2),E=F):B(ba,e,F)?(T.push({tag:D,n:y(ha),otag:P,ctag:ba,i:"/"==D?E-ba.length:F+P.length}),ha="",F+=ba.length-1,A=0,"{"==D&&("}}"==ba?F++:v(T[T.length-1]))):ha+=e.charAt(F);l(E,!0);return T};g.generate=function(e,n,l){e='var _=this;_.b(i=i||"");'+k(e)+"return _.fl();";return l.asString?"function(c,p,i){"+e+";}":new g.Template(new Function("c","p","i",e),n,g,l)};g.parse=function(e,g,n){n=
n||{};return l(e,"",[],n.sectionTags||[])};g.cache={};g.compile=function(e,g){g=g||{};var n=e+"||"+!!g.asString,k=this.cache[n];if(k)return k;k=this.generate(this.parse(this.scan(e,g.delimiters),e,g),e,g);return this.cache[n]=k}})("undefined"!==typeof exports?exports:Hogan);(function(){function g(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a}function v(){var a,b=arguments.length,c={},d=function(a,b){var c,p;"object"!==typeof a&&(a={});for(p in b)b.hasOwnProperty(p)&&(c=b[p],a[p]=c&&"object"===typeof c&&"[object Array]"!==Object.prototype.toString.call(c)&&"number"!==typeof c.nodeType?d(a[p]||{},c):b[p]);return a};for(a=0;a<b;a++)c=d(c,arguments[a]);return c}function y(a,b){return parseInt(a,b||10)}function B(a){return"string"===typeof a}function l(a){return"object"===
typeof a}function q(a){return"[object Array]"===Object.prototype.toString.call(a)}function e(a){return"number"===typeof a}function k(a){return pa.log(a)/pa.LN10}function M(a){return pa.pow(10,a)}function D(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function t(a){return a!==N&&null!==a}function A(a,b,c){var d,f;if(B(b))t(c)?a.setAttribute(b,c):a&&a.getAttribute&&(f=a.getAttribute(b));else if(t(b)&&l(b))for(d in b)a.setAttribute(d,b[d]);return f}function P(a){return q(a)?a:[a]}function n(){var a=
arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],"undefined"!==typeof c&&null!==c)return c}function x(a,b){Ga&&b&&b.opacity!==N&&(b.filter="alpha(opacity="+100*b.opacity+")");g(a.style,b)}function Q(a,b,c,d,f){a=W.createElement(a);b&&g(a,b);f&&x(a,{padding:0,border:ra,margin:0});c&&x(a,c);d&&d.appendChild(a);return a}function R(a,b){var c=function(){};c.prototype=new a;g(c.prototype,b);return c}function u(a,b,c,d){var f=ma.lang;a=+a||0;var h=-1===b?(a.toString().split(".")[1]||"").length:isNaN(b=
ea(b))?2:b;b=void 0===c?f.decimalPoint:c;d=void 0===d?f.thousandsSep:d;f=0>a?"-":"";c=String(y(a=ea(a).toFixed(h)));var m=3<c.length?c.length%3:0;return f+(m?c.substr(0,m)+d:"")+c.substr(m).replace(/(\d{3})(?=\d)/g,"$1"+d)+(h?b+ea(a-c).toFixed(h).slice(2):"")}function S(a,b){return Array((b||2)+1-String(a).length).join(0)+a}function ca(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);return c.apply(this,a)}}function ka(a,b){for(var c="{",d=!1,f,h,m,p,z,G=
[];-1!==(c=a.indexOf(c));){f=a.slice(0,c);if(d){h=f.split(":");m=h.shift().split(".");z=m.length;f=b;for(p=0;p<z;p++)f=f[m[p]];h.length&&(h=h.join(":"),m=/\.([0-9])/,p=ma.lang,/f$/.test(h)?(z=(z=h.match(m))?z[1]:-1,f=u(f,z,p.decimalPoint,-1<h.indexOf(",")?p.thousandsSep:"")):f=bb(h,f))}G.push(f);a=a.slice(c+1);c=(d=!d)?"}":"{"}G.push(a);return G.join("")}function ga(a){return pa.pow(10,na(pa.log(a)/pa.LN10))}function V(a,b,c,d){var f;c=n(c,1);f=a/c;b||(b=[1,2,2.5,5,10],d&&!1===d.allowDecimals&&(1===
c?b=[1,2,5,10]:0.1>=c&&(b=[1/c])));for(d=0;d<b.length&&!(a=b[d],f<=(b[d]+(b[d+1]||b[d]))/2);d++);return a*c}function ha(a,b){var c=b||[[Ab,[1,2,5,10,20,25,50,100,200,500]],[nb,[1,2,5,10,15,30]],[cb,[1,2,5,10,15,30]],[Wa,[1,2,3,4,6,8,12]],[Ha,[1,2]],[db,[1,2]],[Xa,[1,2,3,4,6]],[Ia,null]],d=c[c.length-1],f=Z[d[0]],h=d[1],m;for(m=0;m<c.length&&!(d=c[m],f=Z[d[0]],h=d[1],c[m+1]&&a<=(f*h[h.length-1]+Z[c[m+1][0]])/2);m++);f===Z[Ia]&&a<5*f&&(h=[1,2,5]);f===Z[Ia]&&a<5*f&&(h=[1,2,5]);c=V(a/f,h,d[0]===Ia?ga(a/
f):1);return{unitRange:f,count:c,unitName:d[0]}}function T(a,b,c,d){var f=[],h={},m=ma.global.useUTC,p,z=new Date(b),G=a.unitRange,X=a.count;if(t(b)){G>=Z[nb]&&(z.setMilliseconds(0),z.setSeconds(G>=Z[cb]?0:X*na(z.getSeconds()/X)));if(G>=Z[cb])z[Bb](G>=Z[Wa]?0:X*na(z[ob]()/X));if(G>=Z[Wa])z[Cb](G>=Z[Ha]?0:X*na(z[pb]()/X));if(G>=Z[Ha])z[qb](G>=Z[Xa]?1:X*na(z[Ya]()/X));G>=Z[Xa]&&(z[Db](G>=Z[Ia]?0:X*na(z[eb]()/X)),p=z[fb]());G>=Z[Ia]&&(p-=p%X,z[Eb](p));if(G===Z[db])z[qb](z[Ya]()-z[rb]()+n(d,1));b=1;p=
z[fb]();d=z.getTime();for(var e=z[eb](),r=z[Ya](),wa=m?0:(864E5+6E4*z.getTimezoneOffset())%864E5;d<c;)f.push(d),G===Z[Ia]?d=gb(p+b*X,0):G===Z[Xa]?d=gb(p,e+b*X):m||G!==Z[Ha]&&G!==Z[db]?d+=G*X:d=gb(p,e,r+b*X*(G===Z[Ha]?1:7)),b++;f.push(d);C(tb(f,function(a){return G<=Z[Wa]&&a%Z[Ha]===wa}),function(a){h[a]=Ha})}f.info=g(a,{higherRanks:h,totalRange:G*X});return f}function E(){this.symbol=this.color=0}function F(a,b){var c=a.length,d,f;for(f=0;f<c;f++)a[f].ss_i=f;a.sort(function(a,c){d=b(a,c);return 0===
d?a.ss_i-c.ss_i:d});for(f=0;f<c;f++)delete a[f].ss_i}function da(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function qa(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);return c}function ba(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function fa(a){hb||(hb=Q(Na));a&&hb.appendChild(a);hb.innerHTML=""}function r(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw c;la.console&&console.log(c)}function w(a){return parseFloat(a.toPrecision(14))}
function s(a,b){Oa=n(a,b.animation)}function H(){var a=ma.global.useUTC,b=a?"getUTC":"get",c=a?"setUTC":"set";gb=a?Date.UTC:function(a,b,c,m,p,z){return(new Date(a,b,n(c,1),n(m,0),n(p,0),n(z,0))).getTime()};ob=b+"Minutes";pb=b+"Hours";rb=b+"Day";Ya=b+"Date";eb=b+"Month";fb=b+"FullYear";Bb=c+"Minutes";Cb=c+"Hours";qb=c+"Date";Db=c+"Month";Eb=c+"FullYear"}function U(){}function O(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;c||d||this.addLabel()}function I(a,b){this.axis=a;b&&(this.options=
b,this.id=b.id)}function Sa(a,b,c,d,f,h){var m=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.total=null;this.points={};this.stack=f;this.percent="percent"===h;this.alignOptions={align:b.align||(m?c?"left":"right":"center"),verticalAlign:b.verticalAlign||(m?"middle":c?"bottom":"top"),y:n(b.y,m?4:c?14:-6),x:n(b.x,m?c?-6:6:0)};this.textAlign=b.textAlign||(m?c?"right":"left":"center")}function Ja(){this.init.apply(this,arguments)}function ub(){this.init.apply(this,arguments)}
function Ba(a,b){this.init(a,b)}function vb(a,b){this.init(a,b)}function wb(){this.init.apply(this,arguments)}var N,W=document,la=window,pa=Math,L=pa.round,na=pa.floor,Ka=pa.ceil,K=pa.max,Y=pa.min,ea=pa.abs,ta=pa.cos,Ca=pa.sin,Ta=pa.PI,Za=2*Ta/360,Pa=navigator.userAgent,Fb=la.opera,Ga=/msie/i.test(Pa)&&!Fb,ib=8===W.documentMode,jb=/AppleWebKit/.test(Pa),kb=/Firefox/.test(Pa),Gb=/(Mobile|Android|Windows Phone)/.test(Pa),La="http://www.w3.org/2000/svg",xa=!!W.createElementNS&&!!W.createElementNS(La,
"svg").createSVGRect,Mb=kb&&4>parseInt(Pa.split("Firefox/")[1],10),ya=!xa&&!Ga&&!!W.createElement("canvas").getContext,$a,lb=W.documentElement.ontouchstart!==N,Hb={},xb=0,hb,ma,bb,Oa,yb,Z,Ma=function(){},Qa=[],Na="div",ra="none",Ib="rgba(192,192,192,"+(xa?1E-4:0.002)+")",Ab="millisecond",nb="second",cb="minute",Wa="hour",Ha="day",db="week",Xa="month",Ia="year",Jb="stroke-width",gb,ob,pb,rb,Ya,eb,fb,Bb,Cb,qb,Db,Eb,za={};la.Highcharts=la.Highcharts?r(16,!0):{};bb=function(a,b,c){if(!t(b)||isNaN(b))return"Invalid date";
a=n(a,"%Y-%m-%d %H:%M:%S");var d=new Date(b),f,h=d[pb](),m=d[rb](),p=d[Ya](),z=d[eb](),G=d[fb](),X=ma.lang,e=X.weekdays,d=g({a:e[m].substr(0,3),A:e[m],d:S(p),e:p,b:X.shortMonths[z],B:X.months[z],m:S(z+1),y:G.toString().substr(2,2),Y:G,H:S(h),I:S(h%12||12),l:h%12||12,M:S(d[ob]()),p:12>h?"AM":"PM",P:12>h?"am":"pm",S:S(d.getSeconds()),L:S(L(b%1E3),3)},Highcharts.dateFormats);for(f in d)for(;-1!==a.indexOf("%"+f);)a=a.replace("%"+f,"function"===typeof d[f]?d[f](b):d[f]);return c?a.substr(0,1).toUpperCase()+
a.substr(1):a};E.prototype={wrapColor:function(a){this.color>=a&&(this.color=0)},wrapSymbol:function(a){this.symbol>=a&&(this.symbol=0)}};Z=function(){for(var a=0,b=arguments,c=b.length,d={};a<c;a++)d[b[a++]]=b[a];return d}(Ab,1,nb,1E3,cb,6E4,Wa,36E5,Ha,864E5,db,6048E5,Xa,26784E5,Ia,31556952E3);yb={init:function(a,b,c){b=b||"";var d=a.shift,f=-1<b.indexOf("C"),h=f?7:3,m;b=b.split(" ");c=[].concat(c);var p,z,G=function(a){for(m=a.length;m--;)"M"===a[m]&&a.splice(m+1,0,a[m+1],a[m+2],a[m+1],a[m+2])};
f&&(G(b),G(c));a.isArea&&(p=b.splice(b.length-6,6),z=c.splice(c.length-6,6));if(d<=c.length/h)for(;d--;)c=[].concat(c).splice(0,h).concat(c);a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=[].concat(b).splice(b.length-h,h),f&&(d[h-6]=d[h-2],d[h-5]=d[h-1]),b=b.concat(d);p&&(b=b.concat(p),c=c.concat(z));return[b,c]},step:function(a,b,c,d){var f=[],h=a.length;if(1===c)f=d;else if(h===b.length&&1>c)for(;h--;)d=parseFloat(a[h]),f[h]=isNaN(d)?a[h]:c*parseFloat(b[h]-d)+d;else f=b;return f}};(function(a){la.HighchartsAdapter=
la.HighchartsAdapter||a&&{init:function(b){var c=a.fx,d=c.step,f,h=a.Tween,m=h&&h.propHooks;f=a.cssHooks.opacity;a.extend(a.easing,{easeOutQuad:function(a,b,c,d,f){return-d*(b/=f)*(b-2)+c}});a.each(["cur","_default","width","height","opacity"],function(a,b){var f=d,X,e;"cur"===b?f=c.prototype:"_default"===b&&h&&(f=m[b],b="set");(X=f[b])&&(f[b]=function(c){c=a?c:this;e=c.elem;return e.attr?e.attr(c.prop,"cur"===b?N:c.now):X.apply(this,arguments)})});ca(f,"get",function(a,b,c){return b.attr?b.opacity||
0:a.call(this,b,c)});f=function(a){var c=a.elem,d;a.started||(d=b.init(c,c.d,c.toD),a.start=d[0],a.end=d[1],a.started=!0);c.attr("d",b.step(a.start,a.end,a.pos,c.toD))};h?m.d={set:f}:d.d=f;this.each=Array.prototype.forEach?function(a,b){return Array.prototype.forEach.call(a,b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(!1===b.call(a[c],a[c],c,a))return c};a.fn.highcharts=function(){var a="Chart",b=arguments,c,d;B(b[0])&&(a=b[0],b=Array.prototype.slice.call(b,1));c=b[0];c!==N&&(c.chart=c.chart||
{},c.chart.renderTo=this[0],new Highcharts[a](c,b[1]),d=this);c===N&&(d=Qa[A(this[0],"data-highcharts-chart")]);return d}},getScript:a.getScript,inArray:a.inArray,adapterRun:function(b,c){return a(b)[c]()},grep:a.grep,map:function(a,c){for(var d=[],f=0,h=a.length;f<h;f++)d[f]=c.call(a[f],a[f],f,a);return d},offset:function(b){return a(b).offset()},addEvent:function(b,c,d){a(b).bind(c,d)},removeEvent:function(b,c,d){var f=W.removeEventListener?"removeEventListener":"detachEvent";W[f]&&b&&!b[f]&&(b[f]=
function(){});a(b).unbind(c,d)},fireEvent:function(b,c,d,f){var h=a.Event(c),m="detached"+c,p;!Ga&&d&&(delete d.layerX,delete d.layerY);g(h,d);b[c]&&(b[m]=b[c],b[c]=null);a.each(["preventDefault","stopPropagation"],function(a,b){var c=h[b];h[b]=function(){try{c.call(h)}catch(a){"preventDefault"===b&&(p=!0)}}});a(b).trigger(h);b[m]&&(b[c]=b[m],b[m]=null);f&&!h.isDefaultPrevented()&&!p&&f(h)},washMouseEvent:function(a){var c=a.originalEvent||a;c.pageX===N&&(c.pageX=a.pageX,c.pageY=a.pageY);return c},
animate:function(b,c,d){var f=a(b);b.style||(b.style={});c.d&&(b.toD=c.d,c.d=1);f.stop();c.opacity!==N&&b.attr&&(c.opacity+="px");f.animate(c,d)},stop:function(b){a(b).stop()}}})(la.jQuery);var ua=la.HighchartsAdapter,aa=ua||{};ua&&ua.init.call(ua,yb);var mb=aa.adapterRun,Nb=aa.getScript,Ea=aa.inArray,C=aa.each,tb=aa.grep,Ob=aa.offset,Ua=aa.map,ia=aa.addEvent,Aa=aa.removeEvent,$=aa.fireEvent,Kb=aa.washMouseEvent,zb=aa.animate,ab=aa.stop,aa={enabled:!0,x:0,y:15,style:{color:"#666",cursor:"default",
fontSize:"11px",lineHeight:"14px"}};ma={colors:"#2f7ed8 #0d233a #8bbc21 #910000 #1aadce #492970 #f28f43 #77a1e5 #c42525 #a6c96a".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",
numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:!0,canvasToolsURL:"http://code.highcharts.com/3.0.5/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/3.0.5/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:5,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacingTop:10,spacingRight:10,spacingBottom:15,spacingLeft:10,style:{fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
fontSize:"12px"},backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#274b6d",fontSize:"16px"}},subtitle:{text:"",align:"center",style:{color:"#4d759e"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,marker:{enabled:!0,lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0},select:{fillColor:"#FFFFFF",
lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:v(aa,{align:"center",enabled:!1,formatter:function(){return null===this.y?"":u(this.y,-1)},verticalAlign:"bottom",y:0}),cropThreshold:300,pointRange:0,showInLegend:!0,states:{hover:{marker:{}},select:{marker:{}}},stickyTracking:!0}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderWidth:1,borderColor:"#909090",borderRadius:5,navigation:{activeColor:"#274b6d",
inactiveColor:"#CCC"},shadow:!1,itemStyle:{cursor:"pointer",color:"#274b6d",fontSize:"12px"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolWidth:16,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"1em"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:xa,
backgroundColor:"rgba(255, 255, 255, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',shadow:!0,snap:Gb?25:10,style:{color:"#333333",cursor:"default",
fontSize:"12px",padding:"8px",whiteSpace:"nowrap"}},credits:{enabled:!0,text:"Highcharts.com",href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};var va=ma.plotOptions,ua=va.line;H();var Fa=function(a){var b=[],c,d;(function(a){a&&a.stops?d=Ua(a.stops,function(a){return Fa(a[1])}):(c=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a))?b=[y(c[1]),y(c[2]),
y(c[3]),parseFloat(c[4],10)]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))?b=[y(c[1],16),y(c[2],16),y(c[3],16),1]:(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))&&(b=[y(c[1]),y(c[2]),y(c[3]),1])})(a);return{get:function(c){var h;d?(h=v(a),h.stops=[].concat(h.stops),C(d,function(a,b){h.stops[b]=[h.stops[b][0],a.get(c)]})):h=b&&!isNaN(b[0])?"rgb"===c?"rgb("+b[0]+","+b[1]+","+b[2]+")":"a"===c?b[3]:"rgba("+b.join(",")+")":a;return h},brighten:function(a){if(d)C(d,
function(b){b.brighten(a)});else if(e(a)&&0!==a){var c;for(c=0;3>c;c++)b[c]+=y(255*a),0>b[c]&&(b[c]=0),255<b[c]&&(b[c]=255)}return this},rgba:b,setOpacity:function(a){b[3]=a;return this}}};U.prototype={init:function(a,b){this.element="span"===b?Q(b):W.createElementNS(La,b);this.renderer=a;this.attrSetters={}},opacity:1,animate:function(a,b,c){b=n(b,Oa,!0);ab(this);b?(b=v(b),c&&(b.complete=c),zb(this,a,b)):(this.attr(a),c&&c())},attr:function(a,b){var c,d,f,h,m=this.element,p=m.nodeName.toLowerCase(),
z=this.renderer,G,X=this.attrSetters,e=this.shadows,g,r,sa=this;B(a)&&t(b)&&(c=a,a={},a[c]=b);if(B(a))c=a,"circle"===p?c={x:"cx",y:"cy"}[c]||c:"strokeWidth"===c&&(c="stroke-width"),sa=A(m,c)||this[c]||0,"d"!==c&&"visibility"!==c&&(sa=parseFloat(sa));else{for(c in a)if(G=!1,d=a[c],f=X[c]&&X[c].call(this,d,c),!1!==f){f!==N&&(d=f);if("d"===c)d&&d.join&&(d=d.join(" ")),/(NaN| {2}|^$)/.test(d)&&(d="M 0 0");else if("x"===c&&"text"===p)for(f=0;f<m.childNodes.length;f++)h=m.childNodes[f],A(h,"x")===A(m,"x")&&
A(h,"x",d);else if(!this.rotation||"x"!==c&&"y"!==c)if("fill"===c)d=z.color(d,m,c);else if("circle"!==p||"x"!==c&&"y"!==c)if("rect"===p&&"r"===c)A(m,{rx:d,ry:d}),G=!0;else if("translateX"===c||"translateY"===c||"rotation"===c||"verticalAlign"===c||"scaleX"===c||"scaleY"===c)G=r=!0;else if("stroke"===c)d=z.color(d,m,c);else if("dashstyle"===c)if(c="stroke-dasharray",d=d&&d.toLowerCase(),"solid"===d)d=ra;else{if(d){d=d.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot",
"1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(f=d.length;f--;)d[f]=y(d[f])*n(a["stroke-width"],this["stroke-width"]);d=d.join(",")}}else"width"===c?d=y(d):"align"===c?(c="text-anchor",d={left:"start",center:"middle",right:"end"}[d]):"title"===c&&((f=m.getElementsByTagName("title")[0])||(f=W.createElementNS(La,"title"),m.appendChild(f)),f.textContent=d);else c={x:"cx",y:"cy"}[c]||c;else r=!0;"strokeWidth"===
c&&(c="stroke-width");if("stroke-width"===c||"stroke"===c)this[c]=d,this.stroke&&this["stroke-width"]?(A(m,"stroke",this.stroke),A(m,"stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===c&&0===d&&this.hasStroke&&(m.removeAttribute("stroke"),this.hasStroke=!1),G=!0;this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c)&&(g||(this.symbolAttr(a),g=!0),G=!0);if(e&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c))for(f=e.length;f--;)A(e[f],c,
"height"===c?K(d-(e[f].cutHeight||0),0):d);("width"===c||"height"===c)&&"rect"===p&&0>d&&(d=0);this[c]=d;"text"===c?(d!==this.textStr&&delete this.bBox,this.textStr=d,this.added&&z.buildText(this)):G||A(m,c,d)}r&&this.updateTransform()}return sa},addClass:function(a){var b=this.element,c=A(b,"class")||"";-1===c.indexOf(a)&&A(b,"class",c+" "+a);return this},symbolAttr:function(a){var b=this;C("x y r start end width height innerR anchorX anchorY".split(" "),function(c){b[c]=n(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,
b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":ra)},crisp:function(a,b,c,d,f){var h,m={},p={},z;a=a||this.strokeWidth||this.attr&&this.attr("stroke-width")||0;z=L(a)%2/2;p.x=na(b||this.x||0)+z;p.y=na(c||this.y||0)+z;p.width=na((d||this.width||0)-2*z);p.height=na((f||this.height||0)-2*z);p.strokeWidth=a;for(h in p)this[h]!==p[h]&&(this[h]=m[h]=p[h]);return m},css:function(a){var b=this.element,c=a&&a.width&&"text"===b.nodeName.toLowerCase(),
d,f="",h=function(a,b){return"-"+b.toLowerCase()};a&&a.color&&(a.fill=a.color);this.styles=a=g(this.styles,a);ya&&c&&delete a.width;if(Ga&&!xa)c&&delete a.width,x(this.element,a);else{for(d in a)f+=d.replace(/([A-Z])/g,h)+":"+a[d]+";";A(b,"style",f)}c&&this.added&&this.renderer.buildText(this);return this},on:function(a,b){var c=this.element;lb&&"click"===a&&(c.ontouchstart=function(a){a.preventDefault();b.call(c,a)});c["on"+a]=b;return this},setRadialReference:function(a){this.element.radialReference=
a;return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();this.styles=g(this.styles,a);x(this.element,a);return this},htmlGetBBox:function(){var a=this.element,b=this.bBox;b||("text"===a.nodeName&&(a.style.position="absolute"),b=this.bBox={x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,
height:a.offsetHeight});return b},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,f=this.x||0,h=this.y||0,m=this.textAlign||"left",p={left:0,center:0.5,right:1}[m],z=m&&"left"!==m,G=this.shadows;x(b,{marginLeft:c,marginTop:d});G&&C(G,function(a){x(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&C(b.childNodes,function(c){a.invertChild(c,b)});if("SPAN"===b.tagName){var e,g,G=this.rotation,r;e=0;var wa=1,sa=0,s;r=y(this.textWidth);
var k=this.xCorr||0;s=this.yCorr||0;var w=[G,m,b.innerHTML,this.textWidth].join();w!==this.cTT&&(t(G)&&(e=G*Za,wa=ta(e),sa=Ca(e),this.setSpanRotation(G,sa,wa)),e=n(this.elemWidth,b.offsetWidth),g=n(this.elemHeight,b.offsetHeight),e>r&&/[ \-]/.test(b.textContent||b.innerText)&&(x(b,{width:r+"px",display:"block",whiteSpace:"normal"}),e=r),r=a.fontMetrics(b.style.fontSize).b,s=0>wa*sa,k=(0>wa&&-e)+sa*r*(s?1-p:p),s=(0>sa&&-g)-wa*r*(G?s?p:1-p:1),z&&(k-=e*p*(0>wa?-1:1),G&&(s-=g*p*(0>sa?-1:1)),x(b,{textAlign:m})),
this.xCorr=k,this.yCorr=s);x(b,{left:f+k+"px",top:h+s+"px"});jb&&(g=b.offsetHeight);this.cTT=w}}else this.alignOnAdd=!0},setSpanRotation:function(a){var b={};b[Ga?"-ms-transform":jb?"-webkit-transform":kb?"MozTransform":Fb?"-o-transform":""]=b.transform="rotate("+a+"deg)";x(this.element,b)},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,c=this.scaleX,d=this.scaleY,f=this.inverted,h=this.rotation;f&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];
f?a.push("rotate(90) scale(-1,1)"):h&&a.push("rotate("+h+" "+(this.x||0)+" "+(this.y||0)+")");(t(c)||t(d))&&a.push("scale("+n(c,1)+" "+n(d,1)+")");a.length&&A(this.element,"transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){var d,f,h,m,p={};f=this.renderer;h=f.alignedObjects;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!c||B(c))this.alignTo=d=c||"renderer",D(h,this),h.push(this),c=null}else a=this.alignOptions,b=this.alignByTranslate,
d=this.alignTo;c=n(c,f[d],f);d=a.align;f=a.verticalAlign;h=(c.x||0)+(a.x||0);m=(c.y||0)+(a.y||0);if("right"===d||"center"===d)h+=(c.width-(a.width||0))/{right:1,center:2}[d];p[b?"translateX":"x"]=L(h);if("bottom"===f||"middle"===f)m+=(c.height-(a.height||0))/({bottom:1,middle:2}[f]||1);p[b?"translateY":"y"]=L(m);this[this.placed?"animate":"attr"](p);this.placed=!0;this.alignAttr=p;return this},getBBox:function(){var a=this.bBox,b=this.renderer,c,d=this.rotation;c=this.element;var f=this.styles,h=
d*Za;if(!a){if(c.namespaceURI===La||b.forExport){try{a=c.getBBox?g({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight}}catch(m){}if(!a||0>a.width)a={width:0,height:0}}else a=this.htmlGetBBox();b.isSVG&&(b=a.width,c=a.height,Ga&&f&&"11px"===f.fontSize&&"22.7"===c.toPrecision(3)&&(a.height=c=14),d&&(a.width=ea(c*Ca(h))+ea(b*ta(h)),a.height=ea(c*ta(h))+ea(b*Ca(h))));this.bBox=a}return a},show:function(){return this.attr({visibility:"visible"})},hide:function(){return this.attr({visibility:"hidden"})},
fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.hide()}})},add:function(a){var b=this.renderer,c=a||b,d=c.element||b.box,f=d.childNodes,h=this.element,m=A(h,"zIndex"),p;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&b.buildText(this);m&&(c.handleZ=!0,m=y(m));if(c.handleZ)for(c=0;c<f.length;c++)if(a=f[c],b=A(a,"zIndex"),a!==h&&(y(b)>m||!t(m)&&t(b))){d.insertBefore(h,a);p=!0;break}p||d.appendChild(h);this.added=!0;$(this,
"add");return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&"SPAN"===b.nodeName&&b.parentNode,f,h;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;ab(a);a.clipPath&&(a.clipPath=a.clipPath.destroy());if(a.stops){for(h=0;h<a.stops.length;h++)a.stops[h]=a.stops[h].destroy();a.stops=null}a.safeRemoveChild(b);for(c&&C(c,function(b){a.safeRemoveChild(b)});d&&0===d.childNodes.length;)b=
d.parentNode,a.safeRemoveChild(d),d=b;a.alignTo&&D(a.renderer.alignedObjects,a);for(f in a)delete a[f];return null},shadow:function(a,b,c){var d=[],f,h,m=this.element,p,z,G,e;if(a){z=n(a.width,3);G=(a.opacity||0.15)/z;e=this.parentInverted?"(-1,-1)":"("+n(a.offsetX,1)+", "+n(a.offsetY,1)+")";for(f=1;f<=z;f++)h=m.cloneNode(0),p=2*z+1-2*f,A(h,{isShadow:"true",stroke:a.color||"black","stroke-opacity":G*f,"stroke-width":p,transform:"translate"+e,fill:ra}),c&&(A(h,"height",K(A(h,"height")-p,0)),h.cutHeight=
p),b?b.element.appendChild(h):m.parentNode.insertBefore(h,m),d.push(h);this.shadows=d}return this}};var Ra=function(){this.init.apply(this,arguments)};Ra.prototype={Element:U,init:function(a,b,c,d){var f=location,h,m;h=this.createElement("svg").attr({version:"1.1"});m=h.element;a.appendChild(m);-1===a.innerHTML.indexOf("xmlns")&&A(m,"xmlns",La);this.isSVG=!0;this.box=m;this.boxWrapper=h;this.alignedObjects=[];this.url=(kb||jb)&&W.getElementsByTagName("base").length?f.href.replace(/#.*?$/,"").replace(/([\('\)])/g,
"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(W.createTextNode("Created with Highcharts 3.0.5"));this.defs=this.createElement("defs").add();this.forExport=d;this.gradients={};this.setSize(b,c,!1);var p;kb&&a.getBoundingClientRect&&(this.subPixelFix=b=function(){x(a,{left:0,top:0});p=a.getBoundingClientRect();x(a,{left:Ka(p.left)-p.left+"px",top:Ka(p.top)-p.top+"px"})},b(),ia(la,"resize",b))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=
this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();ba(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.subPixelFix&&Aa(la,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:function(){},buildText:function(a){for(var b=a.element,c=this,d=c.forExport,f=n(a.textStr,"").toString().replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,
"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g),h=b.childNodes,m=/style="([^"]+)"/,p=/href="(http[^"]+)"/,z=A(b,"x"),G=a.styles,e=G&&G.width&&y(G.width),g=G&&G.lineHeight,r=h.length;r--;)b.removeChild(h[r]);e&&!a.added&&this.box.appendChild(b);""===f[f.length-1]&&f.pop();C(f,function(f,h){var r,sb=0;f=f.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");r=f.split("|||");C(r,function(f){if(""!==f||1===r.length){var n={},s=W.createElementNS(La,"tspan"),wa;m.test(f)&&
(wa=f.match(m)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),A(s,"style",wa));p.test(f)&&!d&&(A(s,"onclick",'location.href="'+f.match(p)[1]+'"'),x(s,{cursor:"pointer"}));f=(f.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");if(" "!==f&&(s.appendChild(W.createTextNode(f)),sb?n.dx=0:n.x=z,A(s,n),!sb&&h&&(!xa&&d&&x(s,{display:"block"}),A(s,"dy",g||c.fontMetrics(/px$/.test(s.style.fontSize)?s.style.fontSize:G.fontSize).h,jb&&s.offsetHeight)),b.appendChild(s),sb++,e)){f=f.replace(/([^\^])-/g,
"$1- ").split(" ");for(var k,w=[];f.length||w.length;)delete a.bBox,k=a.getBBox().width,(n=k>e)&&1!==f.length?(s.removeChild(s.firstChild),w.unshift(f.pop())):(f=w,w=[],f.length&&(s=W.createElementNS(La,"tspan"),A(s,{dy:g||16,x:z}),wa&&A(s,"style",wa),b.appendChild(s),k>e&&(e=k))),f.length&&s.appendChild(W.createTextNode(f.join(" ").replace(/- /g,"-")))}}})})},button:function(a,b,c,d,f,h,m,p){var z=this.label(a,b,c,null,null,null,null,null,"button"),G=0,e,r,s,n,sa,k;a={x1:0,y1:0,x2:0,y2:1};f=v({"stroke-width":1,
stroke:"#CCCCCC",fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},f);s=f.style;delete f.style;h=v(f,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},h);n=h.style;delete h.style;m=v(f,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},m);sa=m.style;delete m.style;p=v(f,{style:{color:"#CCC"}},p);k=p.style;delete p.style;ia(z.element,Ga?"mouseover":"mouseenter",function(){3!==G&&z.attr(h).css(n)});ia(z.element,Ga?
"mouseout":"mouseleave",function(){3!==G&&(e=[f,h,m][G],r=[s,n,sa][G],z.attr(e).css(r))});z.setState=function(a){(z.state=G=a)?2===a?z.attr(m).css(sa):3===a&&z.attr(p).css(k):z.attr(f).css(s)};return z.on("click",function(){3!==G&&d.call(z)}).attr(f).css(g({cursor:"default"},s))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=L(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=L(a[2])+b%2/2);return a},path:function(a){var b={fill:ra};q(a)?b.d=a:l(a)&&g(b,a);return this.createElement("path").attr(b)},circle:function(a,
b,c){a=l(a)?a:{x:a,y:b,r:c};return this.createElement("circle").attr(a)},arc:function(a,b,c,d,f,h){l(a)&&(b=a.y,c=a.r,d=a.innerR,f=a.start,h=a.end,a=a.x);a=this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:f||0,end:h||0});a.r=c;return a},rect:function(a,b,c,d,f,h){f=l(a)?a.r:f;f=this.createElement("rect").attr({rx:f,ry:f,fill:ra});return f.attr(l(a)?a:f.crisp(h,a,b,K(c,0),K(d,0)))},setSize:function(a,b,c){var d=this.alignedObjects,f=d.length;this.width=a;this.height=b;for(this.boxWrapper[n(c,
!0)?"animate":"attr"]({width:a,height:b});f--;)d[f].align()},g:function(a){var b=this.createElement("g");return t(a)?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,f){var h={preserveAspectRatio:ra};1<arguments.length&&g(h,{x:b,y:c,width:d,height:f});h=this.createElement("image").attr(h);h.element.setAttributeNS?h.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):h.element.setAttribute("hc-svg-href",a);return h},symbol:function(a,b,c,d,f,h){var m,p=this.symbols[a],p=p&&p(L(b),
L(c),d,f,h),z=/^url\((.*?)\)$/,G,e;p?(m=this.path(p),g(m,{symbolName:a,x:b,y:c,width:d,height:f}),h&&g(m,h)):z.test(a)&&(e=function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(L((d-b[0])/2),L((f-b[1])/2)))},G=a.match(z)[1],a=Hb[G],m=this.image(G).attr({x:b,y:c}),m.isImg=!0,a?e(m,a):(m.attr({width:0,height:0}),Q("img",{onload:function(){e(m,Hb[G]=[this.width,this.height])},src:G})));return m},symbols:{circle:function(a,b,c,d){var f=0.166*c;return["M",a+c/2,b,"C",
a+c+f,b,a+c+f,b+d,a+c/2,b+d,"C",a-f,b+d,a-f,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"]},arc:function(a,b,c,d,f){var h=f.start;c=f.r||c||d;var m=f.end-0.001;d=f.innerR;var p=f.open,z=ta(h),G=Ca(h),e=ta(m),m=Ca(m);f=f.end-h<Ta?0:1;return["M",
a+c*z,b+c*G,"A",c,c,0,f,1,a+c*e,b+c*m,p?"M":"L",a+d*e,b+d*m,"A",d,d,0,f,0,a+d*z,b+d*G,p?"":"Z"]}},clipRect:function(a,b,c,d){var f="highcharts-"+xb++,h=this.createElement("clipPath").attr({id:f}).add(this.defs);a=this.rect(a,b,c,d,0).add(h);a.id=f;a.clipPath=h;return a},color:function(a,b,c){var d=this,f,h=/^rgba/,m,p,z,G,e,r,g,s=[];a&&a.linearGradient?m="linearGradient":a&&a.radialGradient&&(m="radialGradient");if(m){c=a[m];p=d.gradients;G=a.stops;b=b.radialReference;q(c)&&(a[m]=c={x1:c[0],y1:c[1],
x2:c[2],y2:c[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===m&&b&&!t(c.gradientUnits)&&(c=v(c,{cx:b[0]-b[2]/2+c.cx*b[2],cy:b[1]-b[2]/2+c.cy*b[2],r:c.r*b[2],gradientUnits:"userSpaceOnUse"}));for(g in c)"id"!==g&&s.push(g,c[g]);for(g in G)s.push(G[g]);s=s.join(",");p[s]?a=p[s].id:(c.id=a="highcharts-"+xb++,p[s]=z=d.createElement(m).attr(c).add(d.defs),z.stops=[],C(G,function(a){h.test(a[1])?(f=Fa(a[1]),e=f.get("rgb"),r=f.get("a")):(e=a[1],r=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":e,
"stop-opacity":r}).add(z);z.stops.push(a)}));return"url("+d.url+"#"+a+")"}return h.test(a)?(f=Fa(a),A(b,c+"-opacity",f.get("a")),f.get("rgb")):(b.removeAttribute(c+"-opacity"),a)},text:function(a,b,c,d){var f=ma.chart.style,h=ya||!xa&&this.forExport;if(d&&!this.forExport)return this.html(a,b,c);b=L(n(b,0));c=L(n(c,0));a=this.createElement("text").attr({x:b,y:c,text:a}).css({fontFamily:f.fontFamily,fontSize:f.fontSize});h&&a.css({position:"absolute"});a.x=b;a.y=c;return a},html:function(a,b,c){var d=
ma.chart.style,f=this.createElement("span"),h=f.attrSetters,m=f.element,p=f.renderer;h.text=function(a){a!==m.innerHTML&&delete this.bBox;m.innerHTML=a;return!1};h.x=h.y=h.align=function(a,b){"align"===b&&(b="textAlign");f[b]=a;f.htmlUpdateTransform();return!1};f.attr({text:a,x:L(b),y:L(c)}).css({position:"absolute",whiteSpace:"nowrap",fontFamily:d.fontFamily,fontSize:d.fontSize});f.css=f.htmlCss;p.isSVG&&(f.add=function(a){var b,c=p.box.parentNode,d=[];if(a){if(b=a.div,!b){for(;a;)d.push(a),a=a.parentGroup;
C(d.reverse(),function(a){var d;b=a.div=a.div||Q(Na,{className:A(a.element,"class")},{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px"},b||c);d=b.style;g(a.attrSetters,{translateX:function(a){d.left=a+"px"},translateY:function(a){d.top=a+"px"},visibility:function(a,b){d[b]=a}})})}}else b=c;b.appendChild(m);f.added=!0;f.alignOnAdd&&f.htmlUpdateTransform();return f});return f},fontMetrics:function(a){a=y(a||11);a=24>a?a+4:L(1.2*a);var b=L(0.8*a);return{h:a,b:b}},label:function(a,
b,c,d,f,h,m,p,z){function G(){var a,b;a=w.element.style;q=(void 0===u||void 0===E||k.styles.textAlign)&&w.getBBox();k.width=(u||q.width||0)+2*I+O;k.height=(E||q.height||0)+2*I;D=I+n.fontMetrics(a&&a.fontSize).b;B&&(l||(a=L(-H*I),b=p?-D:0,k.box=l=d?n.symbol(d,a,b,k.width,k.height):n.rect(a,b,k.width,k.height,0,y[Jb]),l.add(k)),l.isImg||l.attr(v({width:k.width,height:k.height},y)),y=null)}function e(){var a=k.styles,a=a&&a.textAlign,b=O+I*(1-H),c;c=p?0:D;!t(u)||"center"!==a&&"right"!==a||(b+={center:0.5,
right:1}[a]*(u-q.width));b===w.x&&c===w.y||w.attr({x:b,y:c});w.x=b;w.y=c}function r(a,b){l?l.attr(a,b):y[a]=b}function s(){w.add(k);k.attr({text:a,x:b,y:c});l&&t(f)&&k.attr({anchorX:f,anchorY:h})}var n=this,k=n.g(z),w=n.text("",0,0,m).attr({zIndex:1}),l,q,H=0,I=3,O=0,u,E,A,x,F=0,y={},D;m=k.attrSetters;var B;ia(k,"add",s);m.width=function(a){u=a;return!1};m.height=function(a){E=a;return!1};m.padding=function(a){t(a)&&a!==I&&(I=a,e());return!1};m.paddingLeft=function(a){t(a)&&a!==O&&(O=a,e());return!1};
m.align=function(a){H={left:0,center:0.5,right:1}[a];return!1};m.text=function(a,b){w.attr(b,a);G();e();return!1};m[Jb]=function(a,b){B=!0;F=a%2/2;r(b,a);return!1};m.stroke=m.fill=m.r=function(a,b){"fill"===b&&(B=!0);r(b,a);return!1};m.anchorX=function(a,b){f=a;r(b,a+F-A);return!1};m.anchorY=function(a,b){h=a;r(b,a-x);return!1};m.x=function(a){k.x=a;a-=H*((u||q.width)+I);A=L(a);k.attr("translateX",A);return!1};m.y=function(a){x=k.y=L(a);k.attr("translateY",x);return!1};var ca=k.css;return g(k,{css:function(a){if(a){var b=
{};a=v(a);C("fontSize fontWeight fontFamily color lineHeight width textDecoration textShadow".split(" "),function(c){a[c]!==N&&(b[c]=a[c],delete a[c])});w.css(b)}return ca.call(k,a)},getBBox:function(){return{width:q.width+2*I,height:q.height+2*I,x:q.x-I,y:q.y-I}},shadow:function(a){l&&l.shadow(a);return k},destroy:function(){Aa(k,"add",s);Aa(k.element,"mouseenter");Aa(k.element,"mouseleave");w&&(w=w.destroy());l&&(l=l.destroy());U.prototype.destroy.call(k);k=n=G=e=r=s=null}})}};$a=Ra;var ja;if(!xa&&
!ya){Highcharts.VMLElement=ja={init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],f=b===Na;("shape"===b||f)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",f?"hidden":"visible");c.push(' style="',d.join(""),'"/>');b&&(c=f||"span"===b||"img"===b?c.join(""):a.prepVML(c),this.element=Q(c));this.renderer=a;this.attrSetters={}},add:function(a){var b=this.renderer,c=this.element,d=b.box,d=a?a.element||a:d;a&&a.inverted&&b.invertChild(c,d);d.appendChild(c);
this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();$(this,"add");return this},updateTransform:U.prototype.htmlUpdateTransform,setSpanRotation:function(a,b,c){x(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",c,", M12=",-b,", M21=",b,", M22=",c,", sizingMethod='auto expand')"].join(""):ra})},pathToVML:function(a){for(var b=a.length,c=[],d;b--;)e(a[b])?c[b]=L(10*a[b])-5:"Z"===a[b]?c[b]="x":(c[b]=a[b],!a.isArc||"wa"!==a[b]&&"at"!==a[b])||(d="wa"===
a[b]?1:-1,c[b+5]===c[b+7]&&(c[b+7]-=d),c[b+6]===c[b+8]&&(c[b+8]-=d));return c.join(" ")||"x"},attr:function(a,b){var c,d,f,h=this.element||{},m=h.style,p=h.nodeName,z=this.renderer,G=this.symbolName,X,r=this.shadows,g,s=this.attrSetters,k=this;B(a)&&t(b)&&(c=a,a={},a[c]=b);if(B(a))c=a,k="strokeWidth"===c||"stroke-width"===c?this.strokeweight:this[c];else for(c in a)if(d=a[c],g=!1,f=s[c]&&s[c].call(this,d,c),!1!==f&&null!==d){f!==N&&(d=f);if(G&&/^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(c))X||
(this.symbolAttr(a),X=!0),g=!0;else if("d"===c){d=d||[];this.d=d.join(" ");h.path=d=this.pathToVML(d);if(r)for(f=r.length;f--;)r[f].path=r[f].cutOff?this.cutOffPath(d,r[f].cutOff):d;g=!0}else if("visibility"===c){if(r)for(f=r.length;f--;)r[f].style[c]=d;"DIV"===p&&(d="hidden"===d?"-999em":0,ib||(m[c]=d?"visible":"hidden"),c="top");m[c]=d;g=!0}else"zIndex"===c?(d&&(m[c]=d),g=!0):-1!==Ea(c,["x","y","width","height"])?(this[c]=d,"x"===c||"y"===c?c={x:"left",y:"top"}[c]:d=K(0,d),this.updateClipping?(this[c]=
d,this.updateClipping()):m[c]=d,g=!0):"class"===c&&"DIV"===p?h.className=d:"stroke"===c?(d=z.color(d,h,c),c="strokecolor"):"stroke-width"===c||"strokeWidth"===c?(h.stroked=d?!0:!1,c="strokeweight",this[c]=d,e(d)&&(d+="px")):"dashstyle"===c?((h.getElementsByTagName("stroke")[0]||Q(z.prepVML(["<stroke/>"]),null,null,h))[c]=d||"solid",this.dashstyle=d,g=!0):"fill"===c?"SPAN"===p?m.color=d:"IMG"!==p&&(h.filled=d!==ra?!0:!1,d=z.color(d,h,c,this),c="fillcolor"):"opacity"===c?g=!0:"shape"===p&&"rotation"===
c?(this[c]=h.style[c]=d,h.style.left=-L(Ca(d*Za)+1)+"px",h.style.top=L(ta(d*Za))+"px"):"translateX"===c||"translateY"===c||"rotation"===c?(this[c]=d,this.updateTransform(),g=!0):"text"===c&&(this.bBox=null,h.innerHTML=d,g=!0);g||(ib?h[c]=d:A(h,c,d))}return k},clip:function(a){var b=this,c;a?(c=a.members,D(c,b),c.push(b),b.destroyClip=function(){D(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:ib?"inherit":"rect(auto)"});return b.css(a)},css:U.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&
fa(a)},destroy:function(){this.destroyClip&&this.destroyClip();return U.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=la.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var c;a=a.split(/[ ,]/);c=a.length;if(9===c||11===c)a[c-4]=a[c-2]=y(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],f,h=this.element,m=this.renderer,p,z=h.style,G,e=h.path,r,g,s,k;e&&"string"!==typeof e.value&&(e="x");g=e;if(a){s=n(a.width,3);k=(a.opacity||
0.15)/s;for(f=1;3>=f;f++)r=2*s+1-2*f,c&&(g=this.cutOffPath(e.value,r+0.5)),G=['<shape isShadow="true" strokeweight="',r,'" filled="false" path="',g,'" coordsize="10 10" style="',h.style.cssText,'" />'],p=Q(m.prepVML(G),null,{left:y(z.left)+n(a.offsetX,1),top:y(z.top)+n(a.offsetY,1)}),c&&(p.cutOff=r+1),G=['<stroke color="',a.color||"black",'" opacity="',k*f,'"/>'],Q(m.prepVML(G),null,null,p),b?b.element.appendChild(p):h.parentNode.insertBefore(p,h),d.push(p);this.shadows=d}return this}};ja=R(U,ja);
var Da={Element:ja,isIE8:-1<Pa.indexOf("MSIE 8.0"),init:function(a,b,c){var d,f;this.alignedObjects=[];d=this.createElement(Na);f=d.element;f.style.position="relative";a.appendChild(d.element);this.isVML=!0;this.box=f;this.boxWrapper=d;this.setSize(b,c,!1);W.namespaces.hcv||(W.namespaces.add("hcv","urn:schemas-microsoft-com:vml"),W.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ")},isHidden:function(){return!this.box.offsetWidth},
clipRect:function(a,b,c,d){var f=this.createElement(),h=l(a);return g(f,{members:[],left:(h?a.x:a)+1,top:(h?a.y:b)+1,width:(h?a.width:c)-1,height:(h?a.height:d)-1,getCSS:function(a){var b=a.element,c=b.nodeName;a=a.inverted;var d=this.top-("shape"===c?b.offsetTop:0),f=this.left,b=f+this.width,h=d+this.height,d={clip:"rect("+L(a?f:d)+"px,"+L(a?h:b)+"px,"+L(a?b:h)+"px,"+L(a?d:f)+"px)"};!a&&ib&&"DIV"===c&&g(d,{width:b+"px",height:h+"px"});return d},updateClipping:function(){C(f.members,function(a){a.css(f.getCSS(a))})}})},
color:function(a,b,c,d){var f=this,h,m=/^rgba/,p,z,e=ra;a&&a.linearGradient?z="gradient":a&&a.radialGradient&&(z="pattern");if(z){var r,g,s=a.linearGradient||a.radialGradient,k,n,w,l,q,H="";a=a.stops;var I,t=[],O=function(){p=['<fill colors="'+t.join(",")+'" opacity="',w,'" o:opacity2="',n,'" type="',z,'" ',H,'focus="100%" method="any" />'];Q(f.prepVML(p),null,null,b)};k=a[0];I=a[a.length-1];0<k[0]&&a.unshift([0,k[1]]);1>I[0]&&a.push([1,I[1]]);C(a,function(a,b){m.test(a[1])?(h=Fa(a[1]),r=h.get("rgb"),
g=h.get("a")):(r=a[1],g=1);t.push(100*a[0]+"% "+r);b?(w=g,l=r):(n=g,q=r)});if("fill"===c)if("gradient"===z)c=s.x1||s[0]||0,a=s.y1||s[1]||0,k=s.x2||s[2]||0,s=s.y2||s[3]||0,H='angle="'+(90-180*pa.atan((s-a)/(k-c))/Ta)+'"',O();else{var e=s.r,u=2*e,U=2*e,E=s.cx,A=s.cy,x=b.radialReference,v,e=function(){x&&(v=d.getBBox(),E+=(x[0]-v.x)/v.width-0.5,A+=(x[1]-v.y)/v.height-0.5,u*=x[2]/v.width,U*=x[2]/v.height);H='src="'+ma.global.VMLRadialGradientURL+'" size="'+u+","+U+'" origin="0.5,0.5" position="'+E+","+
A+'" color2="'+q+'" ';O()};d.added?e():ia(d,"add",e);e=l}else e=r}else m.test(a)&&"IMG"!==b.tagName?(h=Fa(a),p=["<",c,' opacity="',h.get("a"),'"/>'],Q(this.prepVML(p),null,null,b),e=h.get("rgb")):(e=b.getElementsByTagName(c),e.length&&(e[0].opacity=1,e[0].type="solid"),e=a);return e},prepVML:function(a){var b=this.isIE8;a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=-1===a.indexOf('style="')?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):
a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:Ra.prototype.html,path:function(a){var b={coordsize:"10 10"};q(a)?b.d=a:l(a)&&g(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var d=this.symbol("circle");l(a)&&(c=a.r,b=a.y,a=a.x);d.isCircle=!0;return d.attr({x:a,y:b,width:2*c,height:2*c})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(Na).attr(b)},
image:function(a,b,c,d,f){var h=this.createElement("img").attr({src:a});1<arguments.length&&h.attr({x:b,y:c,width:d,height:f});return h},rect:function(a,b,c,d,f,h){var m=this.symbol("rect");m.r=l(a)?a.r:f;return m.attr(l(a)?a:m.crisp(h,a,b,K(c,0),K(d,0)))},invertChild:function(a,b){var c=b.style;x(a,{flip:"x",left:y(c.width)-1,top:y(c.height)-1,rotation:-90})},symbols:{arc:function(a,b,c,d,f){var h=f.start,m=f.end,p=f.r||c||d;c=f.innerR;d=ta(h);var z=Ca(h),e=ta(m),r=Ca(m);if(0===m-h)return["x"];h=
["wa",a-p,b-p,a+p,b+p,a+p*d,b+p*z,a+p*e,b+p*r];f.open&&!c&&h.push("e","M",a,b);h.push("at",a-c,b-c,a+c,b+c,a+c*e,b+c*r,a+c*d,b+c*z,"x","e");h.isArc=!0;return h},circle:function(a,b,c,d,f){f&&f.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,f){var h=a+c,m=b+d,p;t(f)&&f.r?(p=Y(f.r,c,d),h=["M",a+p,b,"L",h-p,b,"wa",h-2*p,b,h,b+2*p,h-p,b,h,b+p,"L",h,m-p,"wa",h-2*p,m-2*p,h,m,h,m-p,h-p,m,"L",a+p,m,"wa",a,m-2*p,a+2*p,m,a+p,m,a,m-p,"L",a,b+p,"wa",a,b,a+2*
p,b+2*p,a,b+p,a+p,b,"x","e"]):h=Ra.prototype.symbols.square.apply(0,arguments);return h}}};Highcharts.VMLRenderer=ja=function(){this.init.apply(this,arguments)};ja.prototype=v(Ra.prototype,Da);$a=ja}var Lb;ya&&(Highcharts.CanVGRenderer=ja=function(){La="http://www.w3.org/1999/xhtml"},ja.prototype.symbols={},Lb=function(){function a(){var a=b.length,d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){0===b.length&&Nb(d,a);b.push(c)}}}(),$a=ja);O.prototype={addLabel:function(){var a=this.axis,
b=a.options,c=a.chart,d=a.horiz,f=a.categories,h=a.series[0]&&a.series[0].names,m=this.pos,p=b.labels,z=a.tickPositions,d=d&&f&&!p.step&&!p.staggerLines&&!p.rotation&&c.plotWidth/z.length||!d&&(c.optionsMarginLeft||0.33*c.chartWidth),G=m===z[0],r=m===z[z.length-1],h=f?n(f[m],h&&h[m],m):m,f=this.label,z=z.info,s;a.isDatetimeAxis&&z&&(s=b.dateTimeLabelFormats[z.higherRanks[m]||z.unitName]);this.isFirst=G;this.isLast=r;b=a.labelFormatter.call({axis:a,chart:c,isFirst:G,isLast:r,dateTimeLabelFormat:s,
value:a.isLog?w(M(h)):h});m=d&&{width:K(1,L(d-2*(p.padding||10)))+"px"};m=g(m,p.style);t(f)?f&&f.attr({text:b}).css(m):(d={align:a.labelAlign},e(p.rotation)&&(d.rotation=p.rotation),this.label=t(b)&&p.enabled?c.renderer.text(b,0,0,p.useHTML).attr(d).css(m).add(a.labelGroup):null)},getLabelSize:function(){var a=this.label,b=this.axis;return a?(this.labelBBox=a.getBBox())[b.horiz?"height":"width"]:0},getLabelSides:function(){var a=this.axis,b=this.labelBBox.width,a=b*{left:0,center:0.5,right:1}[a.labelAlign]-
a.options.labels.x;return[-a,b-a]},handleOverflow:function(a,b){var c=!0,d=this.axis,f=d.chart,h=this.isFirst,m=this.isLast,p=b.x,z=d.reversed,e=d.tickPositions;if(h||m){var r=this.getLabelSides(),g=r[0],r=r[1],f=f.plotLeft,s=f+d.len,e=(d=d.ticks[e[a+(h?1:-1)]])&&d.label.xy&&d.label.xy.x+d.getLabelSides()[h?0:1];h&&!z||m&&z?p+g<f&&(p=f-g,d&&p+r>e&&(c=!1)):p+r>s&&(p=s-r,d&&p+g<e&&(c=!1));b.x=p}return c},getPosition:function(a,b,c,d){var f=this.axis,h=f.chart,m=d&&h.oldChartHeight||h.chartHeight;return{x:a?
f.translate(b+c,null,null,d)+f.transB:f.left+f.offset+(f.opposite?(d&&h.oldChartWidth||h.chartWidth)-f.right-f.left:0),y:a?m-f.bottom+f.offset-(f.opposite?f.height:0):m-f.translate(b+c,null,null,d)-f.transB}},getLabelPosition:function(a,b,c,d,f,h,m,p){var z=this.axis,e=z.transA,r=z.reversed,g=z.staggerLines,s=z.chart.renderer.fontMetrics(f.style.fontSize).b,k=f.rotation;a=a+f.x-(h&&d?h*e*(r?-1:1):0);b=b+f.y-(h&&!d?h*e*(r?1:-1):0);k&&2===z.side&&(b-=s-s*ta(k*Za));t(f.y)||k||(b+=s-c.getBBox().height/
2);g&&(b+=m/(p||1)%g*(z.labelOffset/g));return{x:a,y:b}},getMarkPath:function(a,b,c,d,f,h){return h.crispLine(["M",a,b,"L",a+(f?0:-c),b+(f?c:0)],d)},render:function(a,b,c){var d=this.axis,f=d.options,h=d.chart.renderer,m=d.horiz,p=this.type,z=this.label,e=this.pos,r=f.labels,g=this.gridLine,s=p?p+"Grid":"grid",k=p?p+"Tick":"tick",w=f[s+"LineWidth"],l=f[s+"LineColor"],q=f[s+"LineDashStyle"],H=f[k+"Length"],s=f[k+"Width"]||0,I=f[k+"Color"],t=f[k+"Position"],k=this.mark,O=r.step,u=!0,U=d.tickmarkOffset,
E=this.getPosition(m,e,U,b),C=E.x,E=E.y,v=m&&C===d.pos+d.len||!m&&E===d.pos?-1:1,A=d.staggerLines;this.isActive=!0;if(w&&(e=d.getPlotLinePath(e+U,w*v,b,!0),g===N&&(g={stroke:l,"stroke-width":w},q&&(g.dashstyle=q),p||(g.zIndex=1),b&&(g.opacity=0),this.gridLine=g=w?h.path(e).attr(g).add(d.gridGroup):null),!b&&g&&e))g[this.isNew?"attr":"animate"]({d:e,opacity:c});s&&H&&("inside"===t&&(H=-H),d.opposite&&(H=-H),b=this.getMarkPath(C,E,H,s*v,m,h),k?k.animate({d:b,opacity:c}):this.mark=h.path(b).attr({stroke:I,
"stroke-width":s,opacity:c}).add(d.axisGroup));z&&!isNaN(C)&&(z.xy=E=this.getLabelPosition(C,E,z,m,r,U,a,O),this.isFirst&&!this.isLast&&!n(f.showFirstLabel,1)||this.isLast&&!this.isFirst&&!n(f.showLastLabel,1)?u=!1:!A&&m&&"justify"===r.overflow&&!this.handleOverflow(a,E)&&(u=!1),O&&a%O&&(u=!1),u&&!isNaN(E.y)?(E.opacity=c,z[this.isNew?"attr":"animate"](E),this.isNew=!1):z.attr("y",-9999))},destroy:function(){ba(this,this.axis)}};I.prototype={render:function(){var a=this,b=a.axis,c=b.horiz,d=(b.pointRange||
0)/2,f=a.options,h=f.label,m=a.label,p=f.width,z=f.to,e=f.from,r=t(e)&&t(z),g=f.value,s=f.dashStyle,w=a.svgElem,l=[],q,H=f.color,I=f.zIndex,O=f.events,u=b.chart.renderer;b.isLog&&(e=k(e),z=k(z),g=k(g));if(p){if(l=b.getPlotLinePath(g,p),d={stroke:H,"stroke-width":p},s)d.dashstyle=s}else if(r){if(e=K(e,b.min-d),z=Y(z,b.max+d),l=b.getPlotBandPath(e,z,f),d={fill:H},f.borderWidth)d.stroke=f.borderColor,d["stroke-width"]=f.borderWidth}else return;t(I)&&(d.zIndex=I);if(w)l?w.animate({d:l},null,w.onGetPath):
(w.hide(),w.onGetPath=function(){w.show()});else if(l&&l.length&&(a.svgElem=w=u.path(l).attr(d).add(),O))for(q in f=function(b){w.on(b,function(c){O[b].apply(a,[c])})},O)f(q);h&&t(h.text)&&l&&l.length&&0<b.width&&0<b.height?(h=v({align:c&&r&&"center",x:c?!r&&4:10,verticalAlign:!c&&r&&"middle",y:c?r?16:10:r?6:-4,rotation:c&&!r&&90},h),m||(a.label=m=u.text(h.text,0,0,h.useHTML).attr({align:h.textAlign||h.align,rotation:h.rotation,zIndex:I}).css(h.style).add()),b=[l[1],l[4],n(l[6],l[1])],l=[l[2],l[5],
n(l[7],l[2])],c=da(b),r=da(l),m.align(h,!1,{x:c,y:r,width:qa(b)-c,height:qa(l)-r}),m.show()):m&&m.hide();return a},destroy:function(){D(this.axis.plotLinesAndBands,this);delete this.axis;ba(this)}};Sa.prototype={destroy:function(){ba(this,this.axis)},setTotal:function(a){this.cum=this.total=a},addValue:function(a){this.setTotal(w(this.total+a))},render:function(a){var b=this.options,c=b.format,c=c?ka(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=
this.axis.chart.renderer.text(c,0,0,b.useHTML).css(b.style).attr({align:this.textAlign,rotation:b.rotation,visibility:"hidden"}).add(a)},cacheExtremes:function(a,b){this.points[a.index]=b},setOffset:function(a,b){var c=this.axis,d=c.chart,f=d.inverted,h=this.isNegative,m=c.translate(this.percent?100:this.total,0,0,0,1),c=c.translate(0),c=ea(m-c),p=d.xAxis[0].translate(this.x)+a,z=d.plotHeight,h={x:f?h?m:m-c:p,y:f?z-p-b:h?z-m-c:z-m,width:f?c:b,height:f?b:c};if(f=this.label)f.align(this.alignOptions,
null,h),h=f.alignAttr,f.attr({visibility:!1===this.options.crop||d.isInsidePlot(h.x,h.y)?xa?"inherit":"visible":"hidden"})}};Ja.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#C0C0C0",labels:aa,lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,
minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:5,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{align:"middle",style:{color:"#4d759e",fontWeight:"bold"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:!0,tickWidth:0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return u(this.total,
-1)},style:aa.style}},defaultLeftAxisOptions:{labels:{x:-8,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:8,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{x:0,y:14},title:{rotation:0}},defaultTopAxisOptions:{labels:{x:0,y:-5},title:{rotation:0}},init:function(a,b){var c=b.isX;this.horiz=a.inverted?!c:c;this.xOrY=(this.isXAxis=c)?"x":"y";this.opposite=b.opposite;this.side=this.horiz?this.opposite?0:2:this.opposite?1:3;this.setOptions(b);var d=this.options,f=d.type;
this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.chart=a;this.reversed=d.reversed;this.zoomEnabled=!1!==d.zoomEnabled;this.categories=d.categories||"category"===f;this.isLog="logarithmic"===f;this.isDatetimeAxis="datetime"===f;this.isLinked=t(d.linkedTo);this.tickmarkOffset=this.categories&&"between"===d.tickmarkPlacement?0.5:0;this.ticks={};this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=
this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stackExtremes={};this.min=this.max=null;var h,d=this.options.events;-1===Ea(this,a.axes)&&(a.axes.push(this),a[c?"xAxis":"yAxis"].push(this));this.series=this.series||[];a.inverted&&c&&this.reversed===N&&(this.reversed=!0);this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(h in d)ia(this,h,d[h]);this.isLog&&(this.val2lin=k,this.lin2val=M)},setOptions:function(a){this.options=
v(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],v(ma[this.isXAxis?"xAxis":"yAxis"],a))},update:function(a,b){var c=this.chart;a=c.options[this.xOrY+"Axis"][this.options.index]=v(this.userOptions,a);this.destroy(!0);this._addedPlotLB=!1;this.init(c,g(a,{events:N}));c.isDirtyBox=!0;n(b,!0)&&c.redraw()},remove:function(a){var b=this.chart,c=this.xOrY+"Axis";C(this.series,
function(a){a.remove(!1)});D(b.axes,this);D(b[c],this);b.options[c].splice(this.options.index,1);C(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;n(a,!0)&&b.redraw()},defaultLabelFormatter:function(){var a=this.axis,b=this.value,c=a.categories,d=this.dateTimeLabelFormat,f=ma.lang.numericSymbols,h=f&&f.length,m,p=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(p)m=ka(p,this);else if(c)m=b;else if(d)m=bb(d,b);else if(h&&1E3<=a)for(;h--&&m===N;)c=Math.pow(1E3,h+1),a>=c&&
null!==f[h]&&(m=u(b/c,-1)+f[h]);m===N&&(m=1E3<=b?u(b,0):u(b,-1));return m},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=null;a.stackExtremes={};a.buildStacks();C(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries){var d=c.options,f;f=d.threshold;a.hasVisibleSeries=!0;a.isLog&&0>=f&&(f=null);if(a.isXAxis){if(f=c.xData,f.length)a.dataMin=Y(n(a.dataMin,f[0]),da(f)),a.dataMax=K(n(a.dataMax,f[0]),qa(f))}else d=d.stacking,a.usePercentage=
"percent"===d,a.usePercentage&&(a.dataMin=0,a.dataMax=99),c.getExtremes(),d=c.dataMax,c=c.dataMin,!a.usePercentage&&t(c)&&t(d)&&(a.dataMin=Y(n(a.dataMin,c),c),a.dataMax=K(n(a.dataMax,d),d)),t(f)&&(a.dataMin>=f?(a.dataMin=f,a.ignoreMinPadding=!0):a.dataMax<f&&(a.dataMax=f,a.ignoreMaxPadding=!0))}})},translate:function(a,b,c,d,f,h){var m=this.len,p=1,z=0,r=d?this.oldTransA:this.transA;d=d?this.oldMin:this.min;var g=this.minPixelPadding;f=(this.options.ordinal||this.isLog&&f)&&this.lin2val;r||(r=this.transA);
c&&(p*=-1,z=m);this.reversed&&(p*=-1,z-=p*m);b?(a=a*p+z,a-=g,a=a/r+d,f&&(a=this.lin2val(a))):(f&&(a=this.val2lin(a)),"between"===h&&(h=0.5),a=p*(a-d)*r+z+p*g+(e(h)?r*h*this.pointRange:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d){var f=this.chart,h=this.left,m=this.top,p,z,e;a=this.translate(a,null,null,c);var r=c&&f.oldChartHeight||
f.chartHeight,g=c&&f.oldChartWidth||f.chartWidth,s;p=this.transB;c=z=L(a+p);p=e=L(r-a-p);if(isNaN(a))s=!0;else if(this.horiz){if(p=m,e=r-this.bottom,c<h||c>h+this.width)s=!0}else if(c=h,z=g-this.right,p<m||p>m+this.height)s=!0;return s&&!d?null:f.renderer.crispLine(["M",c,p,"L",z,e],b||0)},getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b),d=this.getPlotLinePath(a);d&&c?d.push(c[4],c[5],c[1],c[2]):d=null;return d},getLinearTickPositions:function(a,b,c){var d;b=w(na(b/a)*a);c=w(Ka(c/a)*a);
for(var f=[];b<=c;){f.push(b);b=w(b+a);if(b===d)break;d=b}return f},getLogTickPositions:function(a,b,c,d){var f=this.options,h=this.len,m=[];d||(this._minorAutoInterval=null);if(0.5<=a)a=L(a),m=this.getLinearTickPositions(a,b,c);else if(0.08<=a)for(var h=na(b),p,z,e,r,g,f=0.3<a?[1,2,4]:0.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];h<c+1&&!g;h++)for(z=f.length,p=0;p<z&&!g;p++)e=k(M(h)*f[p]),e>b&&(!d||r<=c)&&m.push(r),r>c&&(g=!0),r=e;else(b=M(b),c=M(c),a=f[d?"minorTickInterval":"tickInterval"],a=n("auto"===
a?null:a,this._minorAutoInterval,(c-b)*(f.tickPixelInterval/(d?5:1))/((d?h/this.tickPositions.length:h)||1)),a=V(a,null,ga(a)),m=Ua(this.getLinearTickPositions(a,b,c),k),d)||(this._minorAutoInterval=a/5);d||(this.tickInterval=a);return m},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],f;if(this.isLog)for(f=b.length,a=1;a<f;a++)d=d.concat(this.getLogTickPositions(c,b[a-1],b[a],!0));else if(this.isDatetimeAxis&&"auto"===a.minorTickInterval)d=d.concat(T(ha(c),
this.min,this.max,a.startOfWeek)),d[0]<this.min&&d.shift();else for(b=this.min+(b[0]-this.min)%c;b<=this.max;b+=c)d.push(b);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,f=this.dataMax-this.dataMin>=this.minRange,h,m,p,z;this.isXAxis&&this.minRange===N&&!this.isLog&&(t(a.min)||t(a.max)?this.minRange=null:(C(this.series,function(a){z=a.xData;for(m=a.xIncrement?1:z.length-1;0<m;m--)if(p=z[m]-z[m-1],h===N||p<h)h=p}),this.minRange=Y(5*h,this.dataMax-this.dataMin)));
if(c-b<this.minRange){var e=this.minRange;d=(e-c+b)/2;d=[b-d,n(a.min,b-d)];f&&(d[2]=this.dataMin);b=qa(d);c=[b+e,n(a.max,b+e)];f&&(c[2]=this.dataMax);c=da(c);c-b<e&&(d[0]=c-e,d[1]=n(a.min,c-e),b=qa(d))}this.min=b;this.max=c},setAxisTranslation:function(a){var b=this.max-this.min,c=0,d,f=0,h=0,m=this.linkedParent,p=this.transA;this.isXAxis&&(m?(f=m.minPointOffset,h=m.pointRangePadding):C(this.series,function(a){var m=a.pointRange,p=a.options.pointPlacement,e=a.closestPointRange;m>b&&(m=0);c=K(c,m);
f=K(f,B(p)?0:m/2);h=K(h,"on"===p?0:m);!a.noSharedTooltip&&t(e)&&(d=t(d)?Y(d,e):e)}),m=this.ordinalSlope&&d?this.ordinalSlope/d:1,this.minPointOffset=f*=m,this.pointRangePadding=h*=m,this.pointRange=Y(c,b),this.closestPointRange=d);a&&(this.oldTransA=p);this.translationSlope=this.transA=p=this.len/(b+h||1);this.transB=this.horiz?this.left:this.bottom;this.minPixelPadding=p*f},setTickPositions:function(a){var b=this,c=b.chart,d=b.options,f=b.isLog,h=b.isDatetimeAxis,m=b.isXAxis,p=b.isLinked,z=b.options.tickPositioner,
e=d.maxPadding,g=d.minPadding,s=d.tickInterval,l=d.minTickInterval,q=d.tickPixelInterval,H=b.categories;p?(b.linkedParent=c[m?"xAxis":"yAxis"][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=n(c.min,c.dataMin),b.max=n(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&r(11,1)):(b.min=n(b.userMin,d.min,b.dataMin),b.max=n(b.userMax,d.max,b.dataMax));f&&(!a&&0>=Y(b.min,n(b.dataMin,b.min))&&r(10,1),b.min=w(k(b.min)),b.max=w(k(b.max)));b.range&&(b.userMin=b.min=K(b.min,b.max-b.range),b.userMax=b.max,
a)&&(b.range=null);b.beforePadding&&b.beforePadding();b.adjustForMinRange();!H&&!b.usePercentage&&!p&&t(b.min)&&t(b.max)&&(c=b.max-b.min)&&(t(d.min)||t(b.userMin)||!g||!(0>b.dataMin)&&b.ignoreMinPadding||(b.min-=c*g),t(d.max)||t(b.userMax)||!e||!(0<b.dataMax)&&b.ignoreMaxPadding||(b.max+=c*e));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:p&&!s&&q===b.linkedParent.options.tickPixelInterval?b.linkedParent.tickInterval:n(s,H?1:(b.max-b.min)*q/(b.len||1));m&&!a&&C(b.series,function(a){a.processData(b.min!==
b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&(b.tickInterval=K(b.pointRange,b.tickInterval));!s&&b.tickInterval<l&&(b.tickInterval=l);h||f||s||(b.tickInterval=V(b.tickInterval,null,ga(b.tickInterval),d));b.minorTickInterval="auto"===d.minorTickInterval&&b.tickInterval?b.tickInterval/5:d.minorTickInterval;b.tickPositions=a=d.tickPositions?
[].concat(d.tickPositions):z&&z.apply(b,[b.min,b.max]);a||((b.max-b.min)/b.tickInterval>2*b.len&&r(19,!0),a=h?(b.getNonLinearTimeTicks||T)(ha(b.tickInterval,d.units),b.min,b.max,d.startOfWeek,b.ordinalPositions,b.closestPointRange,!0):f?b.getLogTickPositions(b.tickInterval,b.min,b.max):b.getLinearTickPositions(b.tickInterval,b.min,b.max),b.tickPositions=a);p||(f=a[0],h=a[a.length-1],p=b.minPointOffset||0,d.startOnTick?b.min=f:b.min-p>f&&a.shift(),d.endOnTick?b.max=h:b.max+p<h&&a.pop(),1===a.length&&
(b.min-=0.001,b.max+=0.001))},setMaxTicks:function(){var a=this.chart,b=a.maxTicks||{},c=this.tickPositions,d=this._maxTicksKey=[this.xOrY,this.pos,this.len].join("-");!this.isLinked&&!this.isDatetimeAxis&&c&&c.length>(b[d]||0)&&!1!==this.options.alignTicks&&(b[d]=c.length);a.maxTicks=b},adjustTickAmount:function(){var a=this._maxTicksKey,b=this.tickPositions,c=this.chart.maxTicks;if(c&&c[a]&&!this.isDatetimeAxis&&!this.categories&&!this.isLinked&&!1!==this.options.alignTicks){var d=this.tickAmount,
f=b.length;this.tickAmount=a=c[a];if(f<a){for(;b.length<a;)b.push(w(b[b.length-1]+this.tickInterval));this.transA*=(f-1)/(a-1);this.max=b[b.length-1]}t(d)&&a!==d&&(this.isDirty=!0)}},setScale:function(){var a=this.stacks,b,c,d,f;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();f=this.len!==this.oldAxisLength;C(this.series,function(a){if(a.isDirtyData||a.isDirty||a.xAxis.isDirty)d=!0});if(f||d||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||
this.userMax!==this.oldUserMax){if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].total=null;this.forceRedraw=!1;this.getSeriesExtremes();this.setTickPositions();this.oldUserMin=this.userMin;this.oldUserMax=this.userMax;this.isDirty||(this.isDirty=f||this.min!==this.oldMin||this.max!==this.oldMax)}else if(!this.isXAxis)for(b in this.oldStacks&&(a=this.stacks=this.oldStacks),a)for(c in a[b])a[b][c].cum=a[b][c].total;this.setMaxTicks()},setExtremes:function(a,b,c,d,f){var h=this,m=h.chart;c=n(c,!0);
f=g(f,{min:a,max:b});$(h,"setExtremes",f,function(){h.userMin=a;h.userMax=b;h.isDirtyExtremes=!0;c&&m.redraw(d)})},zoom:function(a,b){this.allowZoomOutside||(t(this.dataMin)&&a<=this.dataMin&&(a=N),t(this.dataMax)&&b>=this.dataMax&&(b=N));this.displayBtn=a!==N||b!==N;this.setExtremes(a,b,!1,N,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=b.offsetRight||0,f=this.horiz,h,m;this.left=m=n(b.left,a.plotLeft+c);this.top=h=n(b.top,a.plotTop);this.width=
c=n(b.width,a.plotWidth-c+d);this.height=b=n(b.height,a.plotHeight);this.bottom=a.chartHeight-b-h;this.right=a.chartWidth-c-m;this.len=K(f?c:b,0);this.pos=f?m:h},getExtremes:function(){var a=this.isLog;return{min:a?w(M(this.min)):this.min,max:a?w(M(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=b?M(this.min):this.min,b=b?M(this.max):this.max;c>a||null===a?a=c:b<a&&(a=b);return this.translate(a,0,
1,0,1)},addPlotBand:function(a){this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(a,b){var c=(new I(this,a)).render(),d=this.userOptions;b&&(d[b]=d[b]||[],d[b].push(a));this.plotLinesAndBands.push(c);return c},autoLabelAlign:function(a){a=(n(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,f=a.tickPositions,h=a.ticks,m=
a.horiz,p=a.side,z=b.inverted?[1,0,3,2][p]:p,e,r=0,g,s=0,k=d.title,w=d.labels,l=0,q=b.axisOffset,H=b.clipOffset,I=[-1,1,1,-1][p],u,E=1,U=n(w.maxStaggerLines,5),v,A,x,F;a.hasData=e=a.hasVisibleSeries||t(a.min)&&t(a.max)&&!!f;a.showAxis=b=e||n(d.showEmpty,!0);a.staggerLines=a.horiz&&w.staggerLines;a.axisGroup||(a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(),a.labelGroup=c.g("axis-labels").attr({zIndex:w.zIndex||7}).add());if(e||
a.isLinked){a.labelAlign=n(w.align||a.autoLabelAlign(w.rotation));C(f,function(b){h[b]?h[b].addLabel():h[b]=new O(a,b)});if(a.horiz&&!a.staggerLines&&U&&!w.rotation){for(u=a.reversed?[].concat(f).reverse():f;E<U;){e=[];v=!1;for(w=0;w<u.length;w++)A=u[w],x=(x=h[A].label&&h[A].label.bBox)?x.width:0,F=w%E,x&&(A=a.translate(A),e[F]!==N&&A<e[F]&&(v=!0),e[F]=A+x);if(v)E++;else break}1<E&&(a.staggerLines=E)}C(f,function(b){if(0===p||2===p||{1:"left",3:"right"}[p]===a.labelAlign)l=K(h[b].getLabelSize(),l)});
a.staggerLines&&(l*=a.staggerLines,a.labelOffset=l)}else for(u in h)h[u].destroy(),delete h[u];k&&k.text&&!1!==k.enabled&&(a.axisTitle||(a.axisTitle=c.text(k.text,0,0,k.useHTML).attr({zIndex:7,rotation:k.rotation||0,align:k.textAlign||{low:"left",middle:"center",high:"right"}[k.align]}).css(k.style).add(a.axisGroup),a.axisTitle.isNew=!0),b&&(r=a.axisTitle.getBBox()[m?"height":"width"],s=n(k.margin,m?5:10),g=k.offset),a.axisTitle[b?"show":"hide"]());a.offset=I*n(d.offset,q[p]);a.axisTitleMargin=n(g,
l+s+(2!==p&&l&&I*d.labels[m?"y":"x"]));q[p]=K(q[p],a.axisTitleMargin+r+I*a.offset);H[z]=K(H[z],2*na(d.lineWidth/2))},getLinePath:function(a){var b=this.chart,c=this.opposite,d=this.offset,f=this.horiz,h=this.left+(c?this.width:0)+d;this.lineTop=d=b.chartHeight-this.bottom-(c?this.height:0)+d;c&&(a*=-1);return b.renderer.crispLine(["M",f?this.left:h,f?d:this.top,"L",f?b.chartWidth-this.right:h,f?d:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=
this.len,f=this.options.title,h=a?b:c,m=this.opposite,p=this.offset,e=y(f.style.fontSize||12),d={low:h+(a?0:d),middle:h+d/2,high:h+(a?d:0)}[f.align],b=(a?c+this.height:b)+(a?1:-1)*(m?-1:1)*this.axisTitleMargin+(2===this.side?e:0);return{x:a?d:b+(m?this.width:0)+p+(f.x||0),y:a?b-(m?this.height:0)+p:d+(f.y||0)}},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,f=a.isLog,h=a.isLinked,m=a.tickPositions,p=a.axisTitle,e=a.stacks,r=a.ticks,g=a.minorTicks,s=a.alternateBands,k=d.stackLabels,
w=d.alternateGridColor,n=a.tickmarkOffset,l=d.lineWidth,q,H=b.hasRendered&&t(a.oldMin)&&!isNaN(a.oldMin);q=a.hasData;var u=a.showAxis,E,U;C([r,g,s],function(a){for(var b in a)a[b].isActive=!1});if(q||h)(a.minorTickInterval&&!a.categories&&C(a.getMinorTickPositions(),function(b){g[b]||(g[b]=new O(a,b,"minor"));H&&g[b].isNew&&g[b].render(null,!0);g[b].render(null,!1,1)}),m.length&&(C(m.slice(1).concat([m[0]]),function(b,c){c=c===m.length-1?0:c+1;if(!h||b>=a.min&&b<=a.max)r[b]||(r[b]=new O(a,b)),H&&
r[b].isNew&&r[b].render(c,!0),r[b].render(c,!1,1)}),n&&0===a.min&&(r[-1]||(r[-1]=new O(a,-1,null,!0)),r[-1].render(-1))),w&&C(m,function(b,c){0===c%2&&b<a.max&&(s[b]||(s[b]=new I(a)),E=b+n,U=m[c+1]!==N?m[c+1]+n:a.max,s[b].options={from:f?M(E):E,to:f?M(U):U,color:w},s[b].render(),s[b].isActive=!0)}),a._addedPlotLB)||(C((d.plotLines||[]).concat(d.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0);C([r,g,s],function(a){var c,d,f=[],h=Oa?Oa.duration||500:0,m=function(){for(d=f.length;d--;)a[f[d]]&&
!a[f[d]].isActive&&(a[f[d]].destroy(),delete a[f[d]])};for(c in a)a[c].isActive||(a[c].render(c,!1,0),a[c].isActive=!1,f.push(c));a!==s&&b.hasRendered&&h?h&&setTimeout(m,h):m()});l&&(q=a.getLinePath(l),a.axisLine?a.axisLine.animate({d:q}):a.axisLine=c.path(q).attr({stroke:d.lineColor,"stroke-width":l,zIndex:7}).add(a.axisGroup),a.axisLine[u?"show":"hide"]());p&&u&&(p[p.isNew?"attr":"animate"](a.getTitlePosition()),p.isNew=!1);if(k&&k.enabled){var A,v,d=a.stackTotalGroup;d||(a.stackTotalGroup=d=c.g("stack-labels").attr({visibility:"visible",
zIndex:6}).add());d.translate(b.plotLeft,b.plotTop);for(A in e)for(v in c=e[A],c)c[v].render(d)}a.isDirty=!1},removePlotBandOrLine:function(a){for(var b=this.plotLinesAndBands,c=this.options,d=this.userOptions,f=b.length;f--;)b[f].id===a&&b[f].destroy();C([c.plotLines||[],d.plotLines||[],c.plotBands||[],d.plotBands||[]],function(b){for(f=b.length;f--;)b[f].id===a&&D(b,b[f])})},setTitle:function(a,b){this.update({title:a},b)},redraw:function(){var a=this.chart.pointer;a.reset&&a.reset(!0);this.render();
C(this.plotLinesAndBands,function(a){a.render()});C(this.series,function(a){a.isDirty=!0})},buildStacks:function(){this.isXAxis||C(this.series,function(a){a.setStackedPoints()})},setCategories:function(a,b){this.update({categories:a},b)},destroy:function(a){var b=this,c=b.stacks,d,f=b.plotLinesAndBands;a||Aa(b);for(d in c)ba(c[d]),c[d]=null;C([b.ticks,b.minorTicks,b.alternateBands],function(a){ba(a)});for(a=f.length;a--;)f[a].destroy();C("stackTotalGroup axisLine axisGroup gridGroup labelGroup axisTitle".split(" "),
function(a){b[a]&&(b[a]=b[a].destroy())})}};ub.prototype={init:function(a,b){var c=b.borderWidth,d=b.style,f=y(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape,null,null,b.useHTML,null,"tooltip").attr({padding:f,fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).hide().add();ya||this.label.shadow(b.shadow);this.shared=b.shared},destroy:function(){C(this.crosshairs,function(a){a&&
a.destroy()});this.label&&(this.label=this.label.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,c,d){var f=this,h=f.now,m=!1!==f.options.animation&&!f.isHidden;g(h,{x:m?(2*h.x+a)/3:a,y:m?(h.y+b)/2:b,anchorX:m?(2*h.anchorX+c)/3:c,anchorY:m?(h.anchorY+d)/2:d});f.label.attr(h);m&&(1<ea(a-h.x)||1<ea(b-h.y))&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){f&&f.move(a,b,c,d)},32))},hide:function(){var a=this,b;clearTimeout(this.hideTimer);
this.isHidden||(b=this.chart.hoverPoints,this.hideTimer=setTimeout(function(){a.label.fadeOut();a.isHidden=!0},n(this.options.hideDelay,500)),b&&C(b,function(a){a.setState()}),this.chart.hoverPoints=null)},hideCrosshairs:function(){C(this.crosshairs,function(a){a&&a.hide()})},getAnchor:function(a,b){var c,d=this.chart,f=d.inverted,h=d.plotTop,m=0,p=0,e;a=P(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===N&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-h]);c||(C(a,function(a){e=
a.series.yAxis;m+=a.plotX;p+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!f&&e?e.top-h:0)}),m/=a.length,p/=a.length,c=[f?d.plotWidth-p:m,this.shared&&!f&&1<a.length&&b?b.chartY-h:f?d.plotHeight-m:p]);return Ua(c,L)},getPosition:function(a,b,c){var d=this.chart,f=d.plotLeft,h=d.plotTop,m=d.plotWidth,p=d.plotHeight,e=n(this.options.distance,12),r=c.plotX;c=c.plotY;var d=r+f+(d.inverted?e:-a-e),g=c-b+h+15,s;7>d&&(d=f+K(r,0)+e);d+a>f+m&&(d-=d+a-(f+m),g=c-b+h-e,s=!0);g<h+5&&(g=h+5,s&&c>=g&&c<=g+b&&(g=
c+h+e));g+b>h+p&&(g=K(h,h+p-b-e));return{x:d,y:g}},defaultFormatter:function(a){var b=this.points||P(this),c=b[0].series,d;d=[c.tooltipHeaderFormatter(b[0])];C(b,function(a){c=a.series;d.push(c.tooltipFormatter&&c.tooltipFormatter(a)||a.point.tooltipFormatter(c.tooltipOptions.pointFormat))});d.push(a.options.footerFormat||"");return d.join("")},refresh:function(a,b){var c=this.chart,d=this.label,f=this.options,h,m,p={},e,r=[];e=f.formatter||this.defaultFormatter;var p=c.hoverPoints,g,s=f.crosshairs,
w=this.shared;clearTimeout(this.hideTimer);this.followPointer=P(a)[0].series.tooltipOptions.followPointer;m=this.getAnchor(a,b);h=m[0];m=m[1];!w||a.series&&a.series.noSharedTooltip?p=a.getLabelConfig():(c.hoverPoints=a,p&&C(p,function(a){a.setState()}),C(a,function(a){a.setState("hover");r.push(a.getLabelConfig())}),p={x:a[0].category,y:a[0].y},p.points=r,a=a[0]);e=e.call(p,this);p=a.series;!1===e?this.hide():(this.isHidden&&(ab(d),d.attr("opacity",1).show()),d.attr({text:e}),g=f.borderColor||a.color||
p.color||"#606060",d.attr({stroke:g}),this.updatePosition({plotX:h,plotY:m}),this.isHidden=!1);if(s)for(s=P(s),d=s.length;d--;)if(w=a.series,f=w[d?"yAxis":"xAxis"],s[d]&&f)(p=d?n(a.stackY,a.y):a.x,f.isLog&&(p=k(p)),w.modifyValue&&(p=w.modifyValue(p)),f=f.getPlotLinePath(p,1),this.crosshairs[d])?this.crosshairs[d].attr({d:f,visibility:"visible"}):(p={"stroke-width":s[d].width||1,stroke:s[d].color||"#C0C0C0",zIndex:s[d].zIndex||2},s[d].dashStyle&&(p.dashstyle=s[d].dashStyle),this.crosshairs[d]=c.renderer.path(f).attr(p).add());
$(c,"tooltipRefresh",{text:e,x:h+c.plotLeft,y:m+c.plotTop,borderColor:g})},updatePosition:function(a){var b=this.chart,c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(L(c.x),L(c.y),a.plotX+b.plotLeft,a.plotY+b.plotTop)}};Ba.prototype={init:function(a,b){var c=ya?"":b.chart.zoomType,d=a.inverted,f;this.options=b;this.chart=a;this.zoomX=f=/x/.test(c);this.zoomY=c=/y/.test(c);this.zoomHor=f&&!d||c&&d;this.zoomVert=c&&!d||f&&d;this.pinchDown=[];this.lastValidTouch=
{};b.tooltip.enabled&&(a.tooltip=new ub(a,b.tooltip));this.setDOMEvents()},normalize:function(a){var b,c,d;a=a||la.event;a.target||(a.target=a.srcElement);a=Kb(a);d=a.touches?a.touches.item(0):a;this.chartPosition=b=Ob(this.chart.container);d.pageX===N?(c=K(a.x,a.clientX-b.left),b=a.y):(c=d.pageX-b.left,b=d.pageY-b.top);return g(a,{chartX:L(c),chartY:L(b)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};C(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?
"chartX":"chartY"])})});return b},getIndex:function(a){var b=this.chart;return b.inverted?b.plotHeight+b.plotTop-a.chartY:a.chartX-b.plotLeft},runPointActions:function(a){var b=this.chart,c=b.series,d=b.tooltip,f,h=b.hoverPoint,m=b.hoverSeries,p,e,r=b.chartWidth,g=this.getIndex(a);if(d&&this.options.tooltip.shared&&(!m||!m.noSharedTooltip)){f=[];p=c.length;for(e=0;e<p;e++)c[e].visible&&!1!==c[e].options.enableMouseTracking&&!c[e].noSharedTooltip&&c[e].tooltipPoints.length&&(b=c[e].tooltipPoints[g],
b.series)&&(b._dist=ea(g-b.clientX),r=Y(r,b._dist),f.push(b));for(p=f.length;p--;)f[p]._dist>r&&f.splice(p,1);f.length&&f[0].clientX!==this.hoverX&&(d.refresh(f,a),this.hoverX=f[0].clientX)}if(m&&m.tracker){if((b=m.tooltipPoints[g])&&b!==h)b.onMouseOver(a)}else d&&d.followPointer&&!d.isHidden&&(a=d.getAnchor([{}],a),d.updatePosition({plotX:a[0],plotY:a[1]}))},reset:function(a){var b=this.chart,c=b.hoverSeries,d=b.hoverPoint,f=b.tooltip,b=f&&f.shared?b.hoverPoints:d;(a=a&&f&&b)&&P(b)[0].plotX===N&&
(a=!1);if(a)f.refresh(b);else{if(d)d.onMouseOut();if(c)c.onMouseOut();f&&(f.hide(),f.hideCrosshairs());this.hoverX=null}},scaleGroups:function(a,b){var c=this.chart,d;C(c.series,function(f){d=a||f.getPlotBox();f.xAxis&&f.xAxis.zoomEnabled&&(f.group.attr(d),f.markerGroup&&(f.markerGroup.attr(d),f.markerGroup.clip(b?c.clipRect:null)),f.dataLabelsGroup&&f.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},pinchTranslateDirection:function(a,b,c,d,f,h,m){var p=this.chart,e=a?"x":"y",r=a?"X":"Y",
g="chart"+r,s=a?"width":"height",k=p["plot"+(a?"Left":"Top")],w,n,l=1,q=p.inverted,H=p.bounds[a?"h":"v"],I=1===b.length,t=b[0][g],O=c[0][g],u=!I&&b[1][g],E=!I&&c[1][g],U;c=function(){!I&&20<ea(t-u)&&(l=ea(O-E)/ea(t-u));n=(k-O)/l+t;w=p["plot"+(a?"Width":"Height")]/l};c();b=n;b<H.min?(b=H.min,U=!0):b+w>H.max&&(b=H.max-w,U=!0);U?(O-=0.8*(O-m[e][0]),I||(E-=0.8*(E-m[e][1])),c()):m[e]=[O,E];q||(h[e]=n-k,h[s]=w);h=q?1/l:l;f[s]=w;f[e]=b;d[q?a?"scaleY":"scaleX":"scale"+r]=l;d["translate"+r]=h*k+(O-h*t)},pinch:function(a){var b=
this,c=b.chart,d=b.pinchDown,f=c.tooltip&&c.tooltip.options.followTouchMove,h=a.touches,m=h.length,p=b.lastValidTouch,e=b.zoomHor||b.pinchHor,r=b.zoomVert||b.pinchVert,s=e||r,k=b.selectionMarker,w={},n={};(f||s)&&a.preventDefault();Ua(h,function(a){return b.normalize(a)});"touchstart"===a.type?(C(h,function(a,b){d[b]={chartX:a.chartX,chartY:a.chartY}}),p.x=[d[0].chartX,d[1]&&d[1].chartX],p.y=[d[0].chartY,d[1]&&d[1].chartY],C(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,
f=a.toPixels(a.dataMin),h=a.toPixels(a.dataMax),m=Y(f,h),f=K(f,h);b.min=Y(a.pos,m-d);b.max=K(a.pos+a.len,f+d)}})):d.length&&(k||(b.selectionMarker=k=g({destroy:Ma},c.plotBox)),e&&b.pinchTranslateDirection(!0,d,h,w,k,n,p),r&&b.pinchTranslateDirection(!1,d,h,w,k,n,p),b.hasPinched=s,b.scaleGroups(w,n),!s&&f&&1===m&&this.runPointActions(b.normalize(a)))},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},
drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,f=a.chartY,h=this.zoomHor,m=this.zoomVert,p=b.plotLeft,e=b.plotTop,r=b.plotWidth,g=b.plotHeight,s,k=this.mouseDownX,w=this.mouseDownY;d<p?d=p:d>p+r&&(d=p+r);f<e?f=e:f>e+g&&(f=e+g);this.hasDragged=Math.sqrt(Math.pow(k-d,2)+Math.pow(w-f,2));10<this.hasDragged&&(s=b.isInsidePlot(k-p,w-e),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&s&&!this.selectionMarker&&(this.selectionMarker=b.renderer.rect(p,e,h?1:r,m?1:g,0).attr({fill:c.selectionMarkerFill||
"rgba(69,114,167,0.25)",zIndex:7}).add()),this.selectionMarker&&h&&(d-=k,this.selectionMarker.attr({width:ea(d),x:(0<d?0:d)+k})),this.selectionMarker&&m&&(d=f-w,this.selectionMarker.attr({height:ea(d),y:(0<d?0:d)+w})),s&&!this.selectionMarker&&c.panning&&b.pan(a,c.panning))},drop:function(a){var b=this.chart,c=this.hasPinched;if(this.selectionMarker){var d={xAxis:[],yAxis:[],originalEvent:a.originalEvent||a},f=this.selectionMarker,h=f.x,m=f.y,p;if(this.hasDragged||c)C(b.axes,function(a){if(a.zoomEnabled){var b=
a.horiz,c=a.toValue(b?h:m),b=a.toValue(b?h+f.width:m+f.height);!isNaN(c)&&!isNaN(b)&&(d[a.xOrY+"Axis"].push({axis:a,min:Y(c,b),max:K(c,b)}),p=!0)}}),p&&$(b,"selection",d,function(a){b.zoom(g(a,c?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();c&&this.scaleGroups()}b&&(x(b.container,{cursor:b._cursor}),b.cancelClick=10<this.hasDragged,b.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);a.preventDefault&&
a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(a){this.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition,d=b.hoverSeries;a=Kb(a);c&&d&&!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.pageX-c.left-b.plotLeft,a.pageY-c.top-b.plotTop)&&this.reset()},onContainerMouseLeave:function(){this.reset();this.chartPosition=null},onContainerMouseMove:function(a){var b=this.chart;a=this.normalize(a);a.returnValue=!1;"mousedown"===b.mouseIsDown&&this.drag(a);
(this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop))&&!b.openMenu&&this.runPointActions(a)},inClass:function(a,b){for(var c;a;){if(c=A(a,"class")){if(-1!==c.indexOf(b))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;if(b&&!b.options.stickyTracking&&!this.inClass(a.toElement||a.relatedTarget,"highcharts-tooltip"))b.onMouseOut()},onContainerClick:function(a){var b=
this.chart,c=b.hoverPoint,d=b.plotLeft,f=b.plotTop,h=b.inverted,m,p,e;a=this.normalize(a);a.cancelBubble=!0;b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(m=this.chartPosition,p=c.plotX,e=c.plotY,g(c,{pageX:m.left+d+(h?b.plotWidth-e:p),pageY:m.top+f+(h?b.plotHeight-p:e)}),$(c.series,"click",g(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(g(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-f)&&$(b,"click",a)))},onContainerTouchStart:function(a){var b=this.chart;
1===a.touches.length?(a=this.normalize(a),b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)?(this.runPointActions(a),this.pinch(a)):this.reset()):2===a.touches.length&&this.pinch(a)},onContainerTouchMove:function(a){1!==a.touches.length&&2!==a.touches.length||this.pinch(a)},onDocumentTouchEnd:function(a){this.drop(a)},setDOMEvents:function(){var a=this,b=a.chart.container,c;this._events=c=[[b,"onmousedown","onContainerMouseDown"],[b,"onmousemove","onContainerMouseMove"],[b,"onclick","onContainerClick"],
[b,"mouseleave","onContainerMouseLeave"],[W,"mousemove","onDocumentMouseMove"],[W,"mouseup","onDocumentMouseUp"]];lb&&c.push([b,"ontouchstart","onContainerTouchStart"],[b,"ontouchmove","onContainerTouchMove"],[W,"touchend","onDocumentTouchEnd"]);C(c,function(b){a["_"+b[2]]=function(c){a[b[2]](c)};0===b[1].indexOf("on")?b[0][b[1]]=a["_"+b[2]]:ia(b[0],b[1],a["_"+b[2]])})},destroy:function(){var a=this;C(a._events,function(b){0===b[1].indexOf("on")?b[0][b[1]]=null:Aa(b[0],b[1],a["_"+b[2]])});delete a._events;
clearInterval(a.tooltipTimeout)}};vb.prototype={init:function(a,b){var c=this,d=b.itemStyle,f=n(b.padding,8),h=b.itemMarginTop||0;this.options=b;b.enabled&&(c.baseline=y(d.fontSize)+3+h,c.itemStyle=d,c.itemHiddenStyle=v(d,b.itemHiddenStyle),c.itemMarginTop=h,c.padding=f,c.initialItemX=f,c.initialItemY=f-5,c.maxItemWidth=0,c.chart=a,c.itemHeight=0,c.lastLineHeight=0,c.render(),ia(c.chart,"endResize",function(){c.positionCheckboxes()}))},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,
f=a.legendLine,h=a.legendSymbol,m=this.itemHiddenStyle.color,c=b?c.itemStyle.color:m,p=b?a.color:m,m=a.options&&a.options.marker,e={stroke:p,fill:p},r;d&&d.css({fill:c,color:c});f&&f.attr({stroke:p});if(h){if(m&&h.isMarker)for(r in m=a.convertAttribs(m),m)d=m[r],d!==N&&(e[r]=d);h.attr(e)}},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,f=d[0],d=d[1],h=a.checkbox;a.legendGroup&&a.legendGroup.translate(b?f:this.legendWidth-f-2*c-4,d);h&&(h.x=f,h.y=d)},destroyItem:function(a){var b=
a.checkbox;C(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&fa(a.checkbox)},destroy:function(){var a=this.group,b=this.box;b&&(this.box=b.destroy());a&&(this.group=a.destroy())},positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||this.legendHeight;b&&(c=b.translateY,C(this.allItems,function(f){var h=f.checkbox,m;h&&(m=c+h.y+(a||0)+3,x(h,{left:b.translateX+f.legendItemWidth+h.x-20+"px",top:m+"px",display:m>c-6&&m<c+d-
6?"":ra}))}))},renderTitle:function(){var a=this.padding,b=this.options.title,c=0;b.text&&(this.title||(this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group)),a=this.title.getBBox(),c=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:c}));this.titleHeight=c},renderItem:function(a){var b=this,c=b.chart,d=c.renderer,f=b.options,h="horizontal"===f.layout,m=f.symbolWidth,p=f.symbolPadding,e=b.itemStyle,
r=b.itemHiddenStyle,g=b.padding,s=h?n(f.itemDistance,8):0,k=!f.rtl,w=f.width,l=f.itemMarginBottom||0,q=b.itemMarginTop,H=b.initialItemX,I=a.legendItem,O=a.series||a,t=O.options,u=t.showCheckbox,E=f.useHTML;!I&&(a.legendGroup=d.g("legend-item").attr({zIndex:1}).add(b.scrollGroup),O.drawLegendSymbol(b,a),a.legendItem=I=d.text(f.labelFormat?ka(f.labelFormat,a):f.labelFormatter.call(a),k?m+p:-p,b.baseline,E).css(v(a.visible?e:r)).attr({align:k?"left":"right",zIndex:2}).add(a.legendGroup),(E?I:a.legendGroup).on("mouseover",
function(){a.setState("hover");I.css(b.options.itemHoverStyle)}).on("mouseout",function(){I.css(a.visible?e:r);a.setState()}).on("click",function(b){var c=function(){a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):$(a,"legendItemClick",b,c)}),b.colorizeItem(a,a.visible),t&&u)&&(a.checkbox=Q("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},f.itemCheckboxStyle,c.container),ia(a.checkbox,"click",function(b){$(a,"checkboxClick",{checked:b.target.checked},
function(){a.select()})}));d=I.getBBox();f=a.legendItemWidth=f.itemWidth||m+p+d.width+s+(u?20:0);b.itemHeight=m=d.height;h&&b.itemX-H+f>(w||c.chartWidth-2*g-H)&&(b.itemX=H,b.itemY+=q+b.lastLineHeight+l,b.lastLineHeight=0);b.maxItemWidth=K(b.maxItemWidth,f);b.lastItemY=q+b.itemY+l;b.lastLineHeight=K(m,b.lastLineHeight);a._legendItemPos=[b.itemX,b.itemY];h?b.itemX+=f:(b.itemY+=q+m+l,b.lastLineHeight=m);b.offsetWidth=w||K((h?b.itemX-H-s:f)+g,b.offsetWidth)},render:function(){var a=this,b=a.chart,c=b.renderer,
d=a.group,f,h,m,p,e=a.box,r=a.options,s=a.padding,k=r.borderWidth,w=r.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;d||(a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup));a.renderTitle();f=[];C(b.series,function(a){var b=a.options;b.showInLegend&&!t(b.linkedTo)&&(f=f.concat(a.legendItems||("point"===b.legendType?a.data:a)))});F(f,function(a,b){return(a.options&&a.options.legendIndex||
0)-(b.options&&b.options.legendIndex||0)});r.reversed&&f.reverse();a.allItems=f;a.display=h=!!f.length;C(f,function(b){a.renderItem(b)});m=r.width||a.offsetWidth;p=a.lastItemY+a.lastLineHeight+a.titleHeight;p=a.handleOverflow(p);if(k||w)m+=s,p+=s,e?0<m&&0<p&&(e[e.isNew?"attr":"animate"](e.crisp(null,null,null,m,p)),e.isNew=!1):(a.box=e=c.rect(0,0,m,p,r.borderRadius,k||0).attr({stroke:r.borderColor,"stroke-width":k||0,fill:w||ra}).add(d).shadow(r.shadow),e.isNew=!0),e[h?"show":"hide"]();a.legendWidth=
m;a.legendHeight=p;C(f,function(b){a.positionItem(b)});h&&d.align(g({width:m,height:p},r),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,f=this.options,h=f.y,h=c.spacingBox.height+("top"===f.verticalAlign?-h:h)-this.padding,m=f.maxHeight,p=this.clipRect,e=f.navigation,r=n(e.animation,!0),g=e.arrowSize||12,s=this.nav;"horizontal"===f.layout&&(h/=2);m&&(h=Y(h,m));a>h&&!f.useHTML?(this.clipHeight=c=h-20-this.titleHeight,this.pageCount=
Ka(a/c),this.currentPage=n(this.currentPage,1),this.fullHeight=a,p||(p=b.clipRect=d.clipRect(0,0,9999,0),b.contentGroup.clip(p)),p.attr({height:c}),s||(this.nav=s=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,g,g).on("click",function(){b.scroll(-1,r)}).add(s),this.pager=d.text("",15,10).css(e.style).add(s),this.down=d.symbol("triangle-down",0,0,g,g).on("click",function(){b.scroll(1,r)}).add(s)),b.scroll(0),a=h):s&&(p.attr({height:c.chartHeight}),s.hide(),this.scrollGroup.attr({translateY:1}),
this.clipHeight=0);return a},scroll:function(a,b){var c=this.pageCount,d=this.currentPage+a,f=this.clipHeight,h=this.options.navigation,m=h.activeColor,p=h.inactiveColor,h=this.pager,e=this.padding;d>c&&(d=c);0<d&&(b!==N&&s(b,this.chart),this.nav.attr({translateX:e,translateY:f+7+this.titleHeight,visibility:"visible"}),this.up.attr({fill:1===d?p:m}).css({cursor:1===d?"default":"pointer"}),h.attr({text:d+"/"+this.pageCount}),this.down.attr({x:18+this.pager.getBBox().width,fill:d===c?p:m}).css({cursor:d===
c?"default":"pointer"}),f=-Y(f*(d-1),this.fullHeight-f+e)+1,this.scrollGroup.animate({translateY:f}),h.attr({text:d+"/"+c}),this.currentPage=d,this.positionCheckboxes(f))}};wb.prototype={init:function(a,b){var c,d=a.series;a.series=null;c=v(ma,a);c.series=a.series=d;var d=c.chart,f=d.margin,f=l(f)?f:[f,f,f,f];this.optionsMarginTop=n(d.marginTop,f[0]);this.optionsMarginRight=n(d.marginRight,f[1]);this.optionsMarginBottom=n(d.marginBottom,f[2]);this.optionsMarginLeft=n(d.marginLeft,f[3]);f=d.events;
this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var h=this,m;h.index=Qa.length;Qa.push(h);!1!==d.reflow&&ia(h,"load",function(){h.initReflow()});if(f)for(m in f)ia(h,m,f[m]);h.xAxis=[];h.yAxis=[];h.animation=ya?!1:n(d.animation,!0);h.pointCount=0;h.counters=new E;h.firstRender()},initSeries:function(a){var b=this.options.chart;(b=za[a.type||b.type||b.defaultSeriesType])||r(17,!0);b=new b;b.init(this,a);return b},
addSeries:function(a,b,c){var d,f=this;a&&(b=n(b,!0),$(f,"addSeries",{options:a},function(){d=f.initSeries(a);f.isDirtyLegend=!0;f.linkSeries();b&&f.redraw(c)}));return d},addAxis:function(a,b,c,d){var f=b?"xAxis":"yAxis",h=this.options;new Ja(this,v(a,{index:this[f].length,isX:b}));h[f]=P(h[f]||{});h[f].push(a);n(c,!0)&&this.redraw(d)},isInsidePlot:function(a,b,c){var d=c?b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},adjustTickAmounts:function(){!1!==this.options.chart.alignTicks&&
C(this.axes,function(a){a.adjustTickAmount()});this.maxTicks=null},redraw:function(a){var b=this.axes,c=this.series,d=this.pointer,f=this.legend,h=this.isDirtyLegend,m,p,e=this.isDirtyBox,r=c.length,g=r,k=this.renderer,w=k.isHidden(),n=[];s(a,this);w&&this.cloneRenderTo();for(this.layOutTitles();g--;)if(a=c[g],a.options.stacking&&(m=!0,a.isDirty)){p=!0;break}if(p)for(g=r;g--;)if(a=c[g],a.options.stacking)a.isDirty=!0;C(c,function(a){a.isDirty&&"point"===a.options.legendType&&(h=!0)});h&&f.options.enabled&&
(f.render(),this.isDirtyLegend=!1);m&&this.getStacks();this.hasCartesianSeries&&(this.isResizing||(this.maxTicks=null,C(b,function(a){a.setScale()})),this.adjustTickAmounts(),this.getMargins(),C(b,function(a){a.isDirty&&(e=!0)}),C(b,function(a){a.isDirtyExtremes&&(a.isDirtyExtremes=!1,n.push(function(){$(a,"afterSetExtremes",a.getExtremes())}));(e||m)&&a.redraw()}));e&&this.drawChartBox();C(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset&&d.reset(!0);k.draw();
$(this,"redraw");w&&this.cloneRenderTo(!0);C(n,function(a){a.call()})},showLoading:function(a){var b=this.options,c=this.loadingDiv,d=b.loading;c||(this.loadingDiv=c=Q(Na,{className:"highcharts-loading"},g(d.style,{zIndex:10,display:ra}),this.container),this.loadingSpan=Q("span",null,d.labelStyle,c));this.loadingSpan.innerHTML=a||b.lang.loading;this.loadingShown||(x(c,{opacity:0,display:"",left:this.plotLeft+"px",top:this.plotTop+"px",width:this.plotWidth+"px",height:this.plotHeight+"px"}),zb(c,{opacity:d.style.opacity},
{duration:d.showDuration||0}),this.loadingShown=!0)},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&zb(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){x(b,{display:ra})}});this.loadingShown=!1},get:function(a){var b=this.axes,c=this.series,d,f;for(d=0;d<b.length;d++)if(b[d].options.id===a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++)for(f=c[d].points||[],b=0;b<f.length;b++)if(f[b].id===a)return f[b];return null},
getAxes:function(){var a=this,b=this.options,c=b.xAxis=P(b.xAxis||{}),b=b.yAxis=P(b.yAxis||{});C(c,function(a,b){a.index=b;a.isX=!0});C(b,function(a,b){a.index=b});c=c.concat(b);C(c,function(b){new Ja(a,b)});a.adjustTickAmounts()},getSelectedPoints:function(){var a=[];C(this.series,function(b){a=a.concat(tb(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return tb(this.series,function(a){return a.selected})},getStacks:function(){var a=this;C(a.yAxis,function(a){a.stacks&&
a.hasVisibleSeries&&(a.oldStacks=a.stacks)});C(a.series,function(b){!b.options.stacking||!0!==b.visible&&!1!==a.options.chart.ignoreHiddenSeries||(b.stackKey=b.type+n(b.options.stack,""))})},showResetZoom:function(){var a=this,b=ma.lang,c=a.options.chart.resetZoomButton,d=c.theme,f=d.states,h="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,f&&f.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,
!1,h)},zoomOut:function(){var a=this;$(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,f;!a||a.resetSelection?C(this.axes,function(a){b=a.zoom()}):C(a.xAxis.concat(a.yAxis),function(a){var f=a.axis,p=f.isXAxis;if(c[p?"zoomX":"zoomY"]||c[p?"pinchX":"pinchY"])b=f.zoom(a.min,a.max),f.displayBtn&&(d=!0)});f=this.resetZoomButton;d&&!f?this.showResetZoom():!d&&l(f)&&(this.resetZoomButton=f.destroy());b&&this.redraw(n(this.options.chart.animation,a&&a.animation,
100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,f;d&&C(d,function(a){a.setState()});C("xy"===b?[1,0]:[1],function(b){var d=a[b?"chartX":"chartY"],p=c[b?"xAxis":"yAxis"][0],e=c[b?"mouseDownX":"mouseDownY"],r=(p.pointRange||0)/2,g=p.getExtremes(),s=p.toValue(e-d,!0)+r,e=p.toValue(e+c[b?"plotWidth":"plotHeight"]-d,!0)-r;p.series.length&&s>Y(g.dataMin,g.min)&&e<K(g.dataMax,g.max)&&(p.setExtremes(s,e,!1,!1,{trigger:"pan"}),f=!0);c[b?"mouseDownX":"mouseDownY"]=d});f&&c.redraw(!1);x(c.container,
{cursor:"move"})},setTitle:function(a,b){var c=this,d=c.options,f;f=d.title=v(d.title,a);d=d.subtitle=v(d.subtitle,b);C([["title",a,f],["subtitle",b,d]],function(a){var b=a[0],d=c[b],f=a[1];a=a[2];d&&f&&(c[b]=d=d.destroy());a&&a.text&&!d&&(c[b]=c.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add())});c.layOutTitles()},layOutTitles:function(){var a=0,b=this.title,c=this.subtitle,d=this.options,f=d.title,d=d.subtitle,h=this.spacingBox.width-
44;!b||(b.css({width:(f.width||h)+"px"}).align(g({y:15},f),!1,"spacingBox"),f.floating||f.verticalAlign)||(a=b.getBBox().height,18<=a&&25>=a&&(a=15));c&&(c.css({width:(d.width||h)+"px"}).align(g({y:a+f.margin},d),!1,"spacingBox"),!d.floating&&!d.verticalAlign&&(a=Ka(a+c.getBBox().height)));this.titleOffset=a},getChartSize:function(){var a=this.options.chart,b=this.renderToClone||this.renderTo;this.containerWidth=mb(b,"width");this.containerHeight=mb(b,"height");this.chartWidth=K(0,a.width||this.containerWidth||
600);this.chartHeight=K(0,n(a.height,19<this.containerHeight?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),fa(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),x(b,{position:"absolute",top:"-9999px",display:"block"}),W.body.appendChild(b),c&&b.appendChild(c))},getContainer:function(){var a,b=this.options.chart,c,d,f;this.renderTo=
a=b.renderTo;f="highcharts-"+xb++;B(a)&&(this.renderTo=a=W.getElementById(a));a||r(13,!0);c=y(A(a,"data-highcharts-chart"));!isNaN(c)&&Qa[c]&&Qa[c].destroy();A(a,"data-highcharts-chart",this.index);a.innerHTML="";a.offsetWidth||this.cloneRenderTo();this.getChartSize();c=this.chartWidth;d=this.chartHeight;this.container=a=Q(Na,{className:"highcharts-container"+(b.className?" "+b.className:""),id:f},g({position:"relative",overflow:"hidden",width:c+"px",height:d+"px",textAlign:"left",lineHeight:"normal",
zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},b.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=b.forExport?new Ra(a,c,d,!0):new $a(a,c,d);ya&&this.renderer.create(this,a,c,d)},getMargins:function(){var a=this.options.chart,b=a.spacingTop,c=a.spacingRight,d=a.spacingBottom,a=a.spacingLeft,f,h=this.legend,m=this.optionsMarginTop,p=this.optionsMarginLeft,e=this.optionsMarginRight,r=this.optionsMarginBottom,g=this.options.legend,s=n(g.margin,10),k=g.x,w=g.y,l=g.align,
q=g.verticalAlign,H=this.titleOffset;this.resetMargins();f=this.axisOffset;H&&!t(m)&&(this.plotTop=K(this.plotTop,H+this.options.title.margin+b));h.display&&!g.floating&&("right"===l?t(e)||(this.marginRight=K(this.marginRight,h.legendWidth-k+s+c)):"left"===l?t(p)||(this.plotLeft=K(this.plotLeft,h.legendWidth+k+s+a)):"top"===q?t(m)||(this.plotTop=K(this.plotTop,h.legendHeight+w+s+b)):"bottom"!==q||t(r)||(this.marginBottom=K(this.marginBottom,h.legendHeight-w+s+d)));this.extraBottomMargin&&(this.marginBottom+=
this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);this.hasCartesianSeries&&C(this.axes,function(a){a.getOffset()});t(p)||(this.plotLeft+=f[3]);t(m)||(this.plotTop+=f[0]);t(r)||(this.marginBottom+=f[2]);t(e)||(this.marginRight+=f[1]);this.setChartSize()},initReflow:function(){function a(a){var m=c.width||mb(d,"width"),p=c.height||mb(d,"height");a=a?a.target:la;if(!b.hasUserSize&&m&&p&&(a===la||a===W)){if(m!==b.containerWidth||p!==b.containerHeight)clearTimeout(f),b.reflowTimeout=
f=setTimeout(function(){b.container&&(b.setSize(m,p,!1),b.hasUserSize=null)},100);b.containerWidth=m;b.containerHeight=p}}var b=this,c=b.options.chart,d=b.renderTo,f;ia(la,"resize",a);ia(b,"destroy",function(){Aa(la,"resize",a)})},setSize:function(a,b,c){var d=this,f,h,m;d.isResizing+=1;m=function(){d&&$(d,"endResize",null,function(){d.isResizing-=1})};s(c,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;t(a)&&(d.chartWidth=f=K(0,L(a)),d.hasUserSize=!!f);t(b)&&(d.chartHeight=h=K(0,L(b)));
x(d.container,{width:f+"px",height:h+"px"});d.setChartSize(!0);d.renderer.setSize(f,h,c);d.maxTicks=null;C(d.axes,function(a){a.isDirty=!0;a.setScale()});C(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.getMargins();d.redraw(c);d.oldChartHeight=null;$(d,"resize");!1===Oa?m():setTimeout(m,Oa&&Oa.duration||500)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,f=this.chartHeight,h=this.options.chart,m=h.spacingTop,p=h.spacingRight,e=h.spacingBottom,
r=h.spacingLeft,g=this.clipOffset,s,k,w,n;this.plotLeft=s=L(this.plotLeft);this.plotTop=k=L(this.plotTop);this.plotWidth=w=K(0,L(d-s-this.marginRight));this.plotHeight=n=K(0,L(f-k-this.marginBottom));this.plotSizeX=b?n:w;this.plotSizeY=b?w:n;this.plotBorderWidth=h.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:r,y:m,width:d-r-p,height:f-m-e};this.plotBox=c.plotBox={x:s,y:k,width:w,height:n};d=2*na(this.plotBorderWidth/2);b=Ka(K(d,g[3])/2);c=Ka(K(d,g[0])/2);this.clipBox={x:b,y:c,width:na(this.plotSizeX-
K(d,g[1])/2-b),height:na(this.plotSizeY-K(d,g[2])/2-c)};a||C(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this.options.chart,b=a.spacingRight,c=a.spacingBottom,d=a.spacingLeft;this.plotTop=n(this.optionsMarginTop,a.spacingTop);this.marginRight=n(this.optionsMarginRight,b);this.marginBottom=n(this.optionsMarginBottom,c);this.plotLeft=n(this.optionsMarginLeft,d);this.axisOffset=[0,0,0,0];this.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,
b=this.renderer,c=this.chartWidth,d=this.chartHeight,f=this.chartBackground,h=this.plotBackground,m=this.plotBorder,p=this.plotBGImage,e=a.borderWidth||0,r=a.backgroundColor,g=a.plotBackgroundColor,s=a.plotBackgroundImage,k=a.plotBorderWidth||0,w,n=this.plotLeft,l=this.plotTop,q=this.plotWidth,H=this.plotHeight,I=this.plotBox,O=this.clipRect,t=this.clipBox;w=e+(a.shadow?8:0);if(e||r)f?f.animate(f.crisp(null,null,null,c-w,d-w)):(f={fill:r||ra},e&&(f.stroke=a.borderColor,f["stroke-width"]=e),this.chartBackground=
b.rect(w/2,w/2,c-w,d-w,a.borderRadius,e).attr(f).add().shadow(a.shadow));g&&(h?h.animate(I):this.plotBackground=b.rect(n,l,q,H,0).attr({fill:g}).add().shadow(a.plotShadow));s&&(p?p.animate(I):this.plotBGImage=b.image(s,n,l,q,H).add());O?O.animate({width:t.width,height:t.height}):this.clipRect=b.clipRect(t);k&&(m?m.animate(m.crisp(null,n,l,q,H)):this.plotBorder=b.rect(n,l,q,H,0,-k).attr({stroke:a.plotBorderColor,"stroke-width":k,zIndex:1}).add());this.isDirtyBox=!1},propFromSeries:function(){var a=
this,b=a.options.chart,c,d=a.options.series,f,h;C(["inverted","angular","polar"],function(m){c=za[b.type||b.defaultSeriesType];h=a[m]||b[m]||c&&c.prototype[m];for(f=d&&d.length;!h&&f--;)(c=za[d[f].type])&&c.prototype[m]&&(h=!0);a[m]=h})},linkSeries:function(){var a=this,b=a.series;C(b,function(a){a.linkedSeries.length=0});C(b,function(b){var d=b.options.linkedTo;B(d)&&(d=":previous"===d?a.series[b.index-1]:a.get(d))&&(d.linkedSeries.push(b),b.linkedParent=d)})},render:function(){var a=this,b=a.axes,
c=a.renderer,d=a.options,f=d.labels,h=d.credits,m;a.setTitle();a.legend=new vb(a,d.legend);a.getStacks();C(b,function(a){a.setScale()});a.getMargins();a.maxTicks=null;C(b,function(a){a.setTickPositions(!0);a.setMaxTicks()});a.adjustTickAmounts();a.getMargins();a.drawChartBox();a.hasCartesianSeries&&C(b,function(a){a.render()});a.seriesGroup||(a.seriesGroup=c.g("series-group").attr({zIndex:3}).add());C(a.series,function(a){a.translate();a.setTooltipPoints();a.render()});f.items&&C(f.items,function(b){var d=
g(f.style,b.style),h=y(d.left)+a.plotLeft,m=y(d.top)+a.plotTop+12;delete d.left;delete d.top;c.text(b.html,h,m).attr({zIndex:2}).css(d).add()});h.enabled&&!a.credits&&(m=h.href,a.credits=c.text(h.text,0,0).on("click",function(){m&&(location.href=m)}).attr({align:h.position.align,zIndex:8}).css(h.style).add().align(h.position));a.hasRendered=!0},destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,f,h=d&&d.parentNode;$(a,"destroy");Qa[a.index]=N;a.renderTo.removeAttribute("data-highcharts-chart");
Aa(a);for(f=b.length;f--;)b[f]=b[f].destroy();for(f=c.length;f--;)c[f]=c[f].destroy();C("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer scroller rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});d&&(d.innerHTML="",Aa(d),h&&fa(d));for(f in a)delete a[f]},isReadyToRender:function(){var a=this;return!xa&&la==la.top&&"complete"!==W.readyState||ya&&!la.canvg?(ya?Lb.push(function(){a.firstRender()},
a.options.global.canvasToolsURL):W.attachEvent("onreadystatechange",function(){W.detachEvent("onreadystatechange",a.firstRender);"complete"===W.readyState&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options,c=a.callback;a.isReadyToRender()&&(a.getContainer(),$(a,"init"),a.resetMargins(),a.setChartSize(),a.propFromSeries(),a.getAxes(),C(b.series||[],function(b){a.initSeries(b)}),a.linkSeries(),$(a,"beforeRender"),a.pointer=new Ba(a,b),a.render(),a.renderer.draw(),c&&c.apply(a,
[a]),C(a.callbacks,function(b){b.apply(a,[a])}),a.cloneRenderTo(!0),$(a,"load"))}};wb.prototype.callbacks=[];var Va=function(){};Va.prototype={init:function(a,b,c){this.series=a;this.applyOptions(b,c);this.pointAttr={};a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter++],a.colorCounter===b.length)&&(a.colorCounter=0);a.chart.pointCount++;return this},applyOptions:function(a,b){var c=this.series,d=c.pointValKey;a=Va.prototype.optionsToObject.call(this,
a);g(this,a);this.options=this.options?g(this.options,a):a;d&&(this.y=this[d]);this.x===N&&c&&(this.x=b===N?c.autoIncrement():b);return this},optionsToObject:function(a){var b,c=this.series,d=c.pointArrayMap||["y"],f=d.length,h=0,m=0;if("number"===typeof a||null===a)b={y:a};else if(q(a))for(b={},a.length>f&&(c=typeof a[0],"string"===c?b.name=a[0]:"number"===c&&(b.x=a[0]),h++);m<f;)b[d[m++]]=a[h++];else"object"===typeof a&&(b=a,a.dataLabels&&(c._hasPointLabels=!0),a.marker&&(c._hasPointMarkers=!0));
return b},destroy:function(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;b&&(this.setState(),D(b,this),!b.length)&&(a.hoverPoints=null);if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)Aa(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(c in this)this[c]=null},destroyElements:function(){for(var a="graphic dataLabel dataLabelUpper group connector shadowGroup".split(" "),b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,
y:this.y,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},select:function(a,b){var c=this,d=c.series,f=d.chart;a=n(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[Ea(c,d.data)]=c.options;c.setState(a&&"select");b||C(f.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,d.options.data[Ea(a,d.data)]=a.options,a.setState(""),
a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series,c=b.chart,d=c.tooltip,f=c.hoverPoint;if(f&&f!==this)f.onMouseOut();this.firePointEvent("mouseOver");d&&(!d.shared||b.noSharedTooltip)&&d.refresh(this,a);this.setState("hover");c.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;b&&-1!==Ea(this,b)||(this.firePointEvent("mouseOut"),this.setState(),a.hoverPoint=null)},tooltipFormatter:function(a){var b=this.series,c=b.tooltipOptions,d=n(c.valueDecimals,
""),f=c.valuePrefix||"",h=c.valueSuffix||"";C(b.pointArrayMap||["y"],function(b){b="{point."+b;if(f||h)a=a.replace(b+"}",f+b+"}"+h);a=a.replace(b+"}",b+":,."+d+"f}")});return ka(a,{point:this,series:this.series})},update:function(a,b,c){var d=this,f=d.series,h=d.graphic,m,p=f.data,e=f.chart,r=f.options;b=n(b,!0);d.firePointEvent("update",{options:a},function(){d.applyOptions(a);l(a)&&(f.getAttribs(),h)&&(a.marker&&a.marker.symbol?d.graphic=h.destroy():h.attr(d.pointAttr[f.state]));m=Ea(d,p);f.xData[m]=
d.x;f.yData[m]=f.toYData?f.toYData(d):d.y;f.zData[m]=d.z;r.data[m]=d.options;f.isDirty=f.isDirtyData=e.isDirtyBox=!0;"point"===r.legendType&&e.legend.destroyItem(d);b&&e.redraw(c)})},remove:function(a,b){var c=this,d=c.series,f=d.chart,h,m=d.data;s(b,f);a=n(a,!0);c.firePointEvent("remove",null,function(){h=Ea(c,m);m.splice(h,1);d.options.data.splice(h,1);d.xData.splice(h,1);d.yData.splice(h,1);d.zData.splice(h,1);c.destroy();d.isDirty=!0;d.isDirtyData=!0;a&&f.redraw()})},firePointEvent:function(a,
b,c){var d=this,f=this.series.options;(f.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();"click"===a&&f.allowPointSelect&&(c=function(a){d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});$(this,a,b,c)},importEvents:function(){if(!this.hasImportedEvents){var a=v(this.series.options.point,this.options).events,b;this.events=a;for(b in a)ia(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a){var b=this.plotX,c=this.plotY,d=this.series,f=d.options.states,
h=va[d.type].marker&&d.options.marker,m=h&&!h.enabled,p=h&&h.states[a],e=p&&!1===p.enabled,r=d.stateMarkerGraphic,g=this.marker||{},s=d.chart,k=this.pointAttr;a=a||"";if(!(a===this.state||this.selected&&"select"!==a||f[a]&&!1===f[a].enabled||a&&(e||m&&!p.enabled))){if(this.graphic)f=h&&this.graphic.symbolName&&k[a].r,this.graphic.attr(v(k[a],f?{x:b-f,y:c-f,width:2*f,height:2*f}:{}));else if(a&&p&&(f=p.radius,g=g.symbol||d.symbol,r&&r.currentSymbol!==g&&(r=r.destroy()),r?r.attr({x:b-f,y:c-f}):(d.stateMarkerGraphic=
r=s.renderer.symbol(g,b-f,c-f,2*f,2*f).attr(k[a]).add(d.markerGroup),r.currentSymbol=g)),r)r[a&&s.isInsidePlot(b,c)?"show":"hide"]();this.state=a}}};var oa=function(){};oa.prototype={isCartesian:!0,type:"line",pointClass:Va,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},colorCounter:0,init:function(a,b){var c,d,f=a.series;this.chart=a;this.options=b=this.setOptions(b);this.linkedSeries=[];this.bindAxes();g(this,{name:b.name,
state:"",pointAttr:{},visible:!1!==b.visible,selected:!0===b.selected});ya&&(b.animation=!1);d=b.events;for(c in d)ia(this,c,d[c]);if(d&&d.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;this.getColor();this.getSymbol();this.setData(b.data,!1);this.isCartesian&&(a.hasCartesianSeries=!0);f.push(this);this._i=f.length-1;F(f,function(a,b){return n(a.options.index,a._i)-n(b.options.index,a._i)});C(f,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},
bindAxes:function(){var a=this,b=a.options,c=a.chart,d;a.isCartesian&&C(["xAxis","yAxis"],function(f){C(c[f],function(c){d=c.options;if(b[f]===d.index||b[f]!==N&&b[f]===d.id||b[f]===N&&0===d.index)c.series.push(a),a[f]=c,c.isDirty=!0});a[f]||r(18,!0)})},autoIncrement:function(){var a=this.options,b=this.xIncrement,b=n(b,a.pointStart,0);this.pointInterval=n(this.pointInterval,a.pointInterval,1);this.xIncrement=b+this.pointInterval;return b},getSegments:function(){var a=-1,b=[],c,d=this.points,f=d.length;
if(f)if(this.options.connectNulls){for(c=f;c--;)null===d[c].y&&d.splice(c,1);d.length&&(b=[d])}else C(d,function(c,m){null===c.y?(m>a+1&&b.push(d.slice(a+1,m)),a=m):m===f-1&&b.push(d.slice(a+1,m+1))});this.segments=b},setOptions:function(a){var b=this.chart.options,c=b.plotOptions,d=c[this.type];this.userOptions=a;a=v(d,c.series,a);this.tooltipOptions=v(b.tooltip,a.tooltip);null===d.marker&&delete a.marker;return a},getColor:function(){var a=this.options,b=this.userOptions,c=this.chart.options.colors,
d=this.chart.counters,f;f=a.color||va[this.type].color;f||a.colorByPoint||(t(b._colorIndex)?a=b._colorIndex:(b._colorIndex=d.color,a=d.color++),f=c[a]);this.color=f;d.wrapColor(c.length)},getSymbol:function(){var a=this.userOptions,b=this.options.marker,c=this.chart,d=c.options.symbols,c=c.counters;this.symbol=b.symbol;this.symbol||(t(a._symbolIndex)?a=a._symbolIndex:(a._symbolIndex=c.symbol,a=c.symbol++),this.symbol=d[a]);/^url/.test(this.symbol)&&(b.radius=0);c.wrapSymbol(d.length)},drawLegendSymbol:function(a){var b=
this.options,c=b.marker,d=a.options,f;f=d.symbolWidth;var h=this.chart.renderer,m=this.legendGroup;a=a.baseline-L(0.3*h.fontMetrics(d.itemStyle.fontSize).b);b.lineWidth&&(d={"stroke-width":b.lineWidth},b.dashStyle&&(d.dashstyle=b.dashStyle),this.legendLine=h.path(["M",0,a,"L",f,a]).attr(d).add(m));c&&c.enabled&&(b=c.radius,this.legendSymbol=f=h.symbol(this.symbol,f/2-b,a-b,2*b,2*b).add(m),f.isMarker=!0)},addPoint:function(a,b,c,d){var f=this.options,h=this.data,m=this.graph,p=this.area,e=this.chart,
r=this.xData,g=this.yData,k=this.zData,w=this.names,l=m&&m.shift||0,q=f.data;s(d,e);c&&C([m,p,this.graphNeg,this.areaNeg],function(a){a&&(a.shift=l+1)});p&&(p.isArea=!0);b=n(b,!0);d={series:this};this.pointClass.prototype.applyOptions.apply(d,[a]);r.push(d.x);g.push(this.toYData?this.toYData(d):d.y);k.push(d.z);w&&(w[d.x]=d.name);q.push(a);"point"===f.legendType&&this.generatePoints();c&&(h[0]&&h[0].remove?h[0].remove(!1):(h.shift(),r.shift(),g.shift(),k.shift(),q.shift()));this.isDirtyData=this.isDirty=
!0;b&&(this.getAttribs(),e.redraw())},setData:function(a,b){var c=this.points,d=this.options,f=this.chart,h=null,m=this.xAxis,p=m&&m.categories&&!m.categories.length?[]:null,g;this.xIncrement=null;this.pointRange=m&&m.categories?1:d.pointRange;this.colorCounter=0;var s=[],k=[],w=[],l=a?a.length:[];g=n(d.turboThreshold,1E3);var H=this.pointArrayMap,H=H&&H.length,I=!!this.toYData;if(g&&l>g){for(g=0;null===h&&g<l;)h=a[g],g++;if(e(h)){h=n(d.pointStart,0);d=n(d.pointInterval,1);for(g=0;g<l;g++)s[g]=h,
k[g]=a[g],h+=d;this.xIncrement=h}else if(q(h))if(H)for(g=0;g<l;g++)d=a[g],s[g]=d[0],k[g]=d.slice(1,H+1);else for(g=0;g<l;g++)d=a[g],s[g]=d[0],k[g]=d[1];else r(12)}else for(g=0;g<l;g++)a[g]!==N&&(d={series:this},this.pointClass.prototype.applyOptions.apply(d,[a[g]]),s[g]=d.x,k[g]=I?this.toYData(d):d.y,w[g]=d.z,p&&d.name)&&(p[d.x]=d.name);B(k[0])&&r(14,!0);this.data=[];this.options.data=a;this.xData=s;this.yData=k;this.zData=w;this.names=p;for(g=c&&c.length||0;g--;)c[g]&&c[g].destroy&&c[g].destroy();
m&&(m.minRange=m.userMinRange);this.isDirty=this.isDirtyData=f.isDirtyBox=!0;n(b,!0)&&f.redraw(!1)},remove:function(a,b){var c=this,d=c.chart;a=n(a,!0);c.isRemoving||(c.isRemoving=!0,$(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;d.linkSeries();a&&d.redraw(b)}));c.isRemoving=!1},processData:function(a){var b=this.xData,c=this.yData,d=b.length,f;f=0;var h,m,p=this.xAxis,e=this.options,g=e.cropThreshold,s=this.isCartesian;if(s&&!(this.isDirty||p.isDirty||this.yAxis.isDirty||
a))return!1;if(s&&this.sorted&&(!g||d>g||this.forceCrop))if(a=p.min,p=p.max,b[d-1]<a||b[0]>p)b=[],c=[];else if(b[0]<a||b[d-1]>p)f=this.cropData(this.xData,this.yData,a,p),b=f.xData,c=f.yData,f=f.start,h=!0;for(p=b.length-1;0<=p;p--)d=b[p]-b[p-1],0<d&&(m===N||d<m)?m=d:0>d&&this.requireSorting&&r(15);this.cropped=h;this.cropStart=f;this.processedXData=b;this.processedYData=c;null===e.pointRange&&(this.pointRange=m||1);this.closestPointRange=m},cropData:function(a,b,c,d){var f=a.length,h=0,m=f,e;for(e=
0;e<f;e++)if(a[e]>=c){h=K(0,e-1);break}for(;e<f;e++)if(a[e]>d){m=e+1;break}return{xData:a.slice(h,m),yData:b.slice(h,m),start:h,end:m}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,f=this.processedYData,h=this.pointClass,m=d.length,e=this.cropStart||0,g,r=this.hasGroupedData,s,k=[],w;b||r||(b=[],b.length=a.length,b=this.data=b);for(w=0;w<m;w++)g=e+w,r?k[w]=(new h).init(this,[d[w]].concat(P(f[w]))):(b[g]?s=b[g]:a[g]!==N&&(b[g]=s=(new h).init(this,a[g],d[w])),
k[w]=s);if(b&&(m!==(c=b.length)||r))for(w=0;w<c;w++)if(w===e&&!r&&(w+=m),b[w])b[w].destroyElements(),b[w].plotX=N;this.data=b;this.points=k},setStackedPoints:function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var a=this.processedXData,b=this.processedYData,c=b.length,d=this.options,f=d.threshold,h=d.stack,d=d.stacking,m=this.stackKey,e="-"+m,g=this.yAxis,r=g.stacks,s=g.oldStacks,k=g.stackExtremes,w,l,n,H,q;for(n=0;n<c;n++)H=a[n],q=b[n],l=(w=
this.negStacks&&q<f)?e:m,"number"===typeof q&&!k[m]&&(k[m]={dataMin:q,dataMax:q}),r[l]||(r[l]={}),r[l][H]||(s[l]&&s[l][H]?(r[l][H]=s[l][H],r[l][H].total=null):r[l][H]=new Sa(g,g.options.stackLabels,w,H,h,d)),l=r[l][H],w=l.total,l.addValue(q||0),l.cacheExtremes(this,[w,w+(q||0)]),"number"===typeof q&&(k[m].dataMin=Y(k[m].dataMin,l.total,q),k[m].dataMax=K(k[m].dataMax,l.total,q));g.oldStacks={}}},getExtremes:function(){var a=this.yAxis,b=this.stackKey,c,d,f=this.options,h=a.isLog?null:f.threshold,m=
this.processedXData,e=this.processedYData,g=e.length,r=[],s=0,k=this.xAxis.getExtremes(),w=k.min,k=k.max,l;f.stacking&&(c=a.stackExtremes[b],d=c.dataMin,c=c.dataMax,d=Y(d,n(h,d)),c=K(c,n(h,c)));if(!t(d)||!t(c)){for(b=0;b<g;b++)if(l=m[b],h=e[b],f=null!==h&&h!==N&&(!a.isLog||h.length||0<h),l=this.getExtremesFromAll||this.cropped||(m[b+1]||l)>=w&&(m[b-1]||l)<=k,f&&l)if(f=h.length)for(;f--;)null!==h[f]&&(r[s++]=h[f]);else r[s++]=h;d=n(d,da(r));c=n(c,qa(r))}this.dataMin=d;this.dataMax=c},translate:function(){this.processedXData||
this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,f=this.yAxis,h=this.points,m=h.length,p=!!this.modifyValue,g=a.pointPlacement,r="between"===g||e(g),s=a.threshold,a=0;a<m;a++){var k=h[a],w=k.x,l=k.y,q=k.low,H=f.stacks[(this.negStacks&&l<s?"-":"")+this.stackKey],I;f.isLog&&0>=l&&(k.y=l=null);k.plotX=c.translate(w,0,0,0,1,g);b&&this.visible&&H&&H[w]&&(H=H[w],I=H.total,H.cum=q=H.cum-l,l=q+l,0===H.cum&&(q=n(s,f.min)),f.isLog&&0>=q&&(q=null),"percent"===
b&&(q=I?100*q/I:0,l=I?100*l/I:0),k.percentage=I?100*k.y/I:0,k.total=k.stackTotal=I,k.stackY=l,H.setOffset(this.pointXOffset||0,this.barW||0));k.yBottom=t(q)?f.translate(q,0,1,0,1):null;p&&(l=this.modifyValue(l,k));k.plotY="number"===typeof l&&Infinity!==l?f.translate(l,0,1,0,1):N;k.clientX=r?c.translate(w,0,0,0,1):k.plotX;k.negative=k.y<(s||0);k.category=d&&d[k.x]!==N?d[k.x]:k.x}this.getSegments()},setTooltipPoints:function(a){var b=[],c,d,f=(c=this.xAxis)?c.tooltipLen||c.len:this.chart.plotSizeX,
h,m,e,g=[];if(!1!==this.options.enableMouseTracking){a&&(this.tooltipPoints=null);C(this.segments||this.points,function(a){b=b.concat(a)});c&&c.reversed&&(b=b.reverse());this.orderTooltipPoints&&this.orderTooltipPoints(b);a=b.length;for(e=0;e<a;e++)for(h=b[e],m=b[e+1],c=b[e-1]?d+1:0,d=b[e+1]?Y(K(0,na((h.clientX+(m?m.wrappedClientX||m.clientX:f))/2)),f):f;0<=c&&c<=d;)g[c++]=h;this.tooltipPoints=g}},tooltipHeaderFormatter:function(a){var b=this.tooltipOptions,c=b.xDateFormat,d=b.dateTimeLabelFormats,
f=this.xAxis,h=f&&"datetime"===f.options.type,b=b.headerFormat,f=f&&f.closestPointRange,m;if(h&&!c)if(f)for(m in Z){if(Z[m]>=f){c=d[m];break}}else c=d.day;h&&c&&e(a.key)&&(b=b.replace("{point.key}","{point.key:"+c+"}"));return ka(b,{point:a,series:this})},onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&$(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,
d=b.hoverPoint;if(d)d.onMouseOut();this&&a.events.mouseOut&&$(this,"mouseOut");!c||a.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState();b.hoverSeries=null},animate:function(a){var b=this,c=b.chart,d=c.renderer,f;f=b.options.animation;var h=c.clipBox,m=c.inverted,e;f&&!l(f)&&(f=va[b.type].animation);e="_sharedClip"+f.duration+f.easing;if(a)a=c[e],f=c[e+"m"],a||(c[e]=a=d.clipRect(g(h,{width:0})),c[e+"m"]=f=d.clipRect(-99,m?-c.plotLeft:-c.plotTop,99,m?c.chartWidth:c.chartHeight)),
b.group.clip(a),b.markerGroup.clip(f),b.sharedClipKey=e;else{if(a=c[e])a.animate({width:c.plotSizeX},f),c[e+"m"].animate({width:c.plotSizeX+99},f);b.animate=null;b.animationTimeout=setTimeout(function(){b.afterAnimate()},f.duration)}},afterAnimate:function(){var a=this.chart,b=this.sharedClipKey,c=this.group;c&&!1!==this.options.clip&&(c.clip(a.clipRect),this.markerGroup.clip());setTimeout(function(){b&&a[b]&&(a[b]=a[b].destroy(),a[b+"m"]=a[b+"m"].destroy())},100)},drawPoints:function(){var a,b=this.points,
c=this.chart,d,f,h,m,e,r,s,k,w=this.options.marker,l,q=this.markerGroup;if(w.enabled||this._hasPointMarkers)for(h=b.length;h--;)(m=b[h],d=na(m.plotX),f=m.plotY,k=m.graphic,r=m.marker||{},a=w.enabled&&r.enabled===N||r.enabled,l=c.isInsidePlot(L(d),f,c.inverted),a&&f!==N&&!isNaN(f)&&null!==m.y)?(a=m.pointAttr[m.selected?"select":""],e=a.r,r=n(r.symbol,this.symbol),s=0===r.indexOf("url"),k)?k.attr({visibility:l?xa?"inherit":"visible":"hidden"}).animate(g({x:d-e,y:f-e},k.symbolName?{width:2*e,height:2*
e}:{})):l&&(0<e||s)&&(m.graphic=c.renderer.symbol(r,d-e,f-e,2*e,2*e).attr(a).add(q)):k&&(m.graphic=k.destroy())},convertAttribs:function(a,b,c,d){var f=this.pointAttrToOptions,h,m,e={};a=a||{};b=b||{};c=c||{};d=d||{};for(h in f)m=f[h],e[h]=n(a[m],b[h],c[h],d[h]);return e},getAttribs:function(){var a=this,b=a.options,c=va[a.type].marker?b.marker:b,d=c.states,f=d.hover,h,e=a.color,p={stroke:e,fill:e},r=a.points||[],s=[],k,w=a.pointAttrToOptions,l=b.negativeColor,n;b.marker?(f.radius=f.radius||c.radius+
2,f.lineWidth=f.lineWidth||c.lineWidth+1):f.color=f.color||Fa(f.color||e).brighten(f.brightness).get();s[""]=a.convertAttribs(c,p);C(["hover","select"],function(b){s[b]=a.convertAttribs(d[b],s[""])});a.pointAttr=s;for(e=r.length;e--;){p=r[e];(c=p.options&&p.options.marker||p.options)&&!1===c.enabled&&(c.radius=0);p.negative&&l&&(p.color=p.fillColor=l);h=b.colorByPoint||p.color;if(p.options)for(n in w)t(c[w[n]])&&(h=!0);h?(c=c||{},k=[],d=c.states||{},h=d.hover=d.hover||{},b.marker||(h.color=Fa(h.color||
p.color).brighten(h.brightness||f.brightness).get()),k[""]=a.convertAttribs(g({color:p.color},c),s[""]),k.hover=a.convertAttribs(d.hover,s.hover,k[""]),k.select=a.convertAttribs(d.select,s.select,k[""]),p.negative&&b.marker&&l&&(k[""].fill=k.hover.fill=k.select.fill=a.convertAttribs({fillColor:l}).fill)):k=s;p.pointAttr=k}},update:function(a,b){var c=this.chart,d=this.type;a=v(this.userOptions,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1);g(this,
za[a.type||d].prototype);this.init(c,a);n(b,!0)&&c.redraw(!1)},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(Pa),d,f,h=a.data||[],e,p,g;$(a,"destroy");Aa(a);C(["xAxis","yAxis"],function(b){if(g=a[b])D(g.series,a),g.isDirty=g.forceRedraw=!0});a.legendItem&&a.chart.legend.destroyItem(a);for(f=h.length;f--;)(e=h[f])&&e.destroy&&e.destroy();a.points=null;clearTimeout(a.animationTimeout);C("area graph dataLabelsGroup group markerGroup tracker graphNeg areaNeg posClip negClip".split(" "),
function(b){a[b]&&(d=c&&"group"===b?"hide":"destroy",a[b][d]())});b.hoverSeries===a&&(b.hoverSeries=null);D(b.series,a);for(p in a)delete a[p]},drawDataLabels:function(){var a=this,b=a.options.dataLabels,c=a.points,d,f,h,e;if(b.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(b),e=a.plotGroup("dataLabelsGroup","data-labels",a.visible?"visible":"hidden",b.zIndex||6),f=b,C(c,function(c){var g,r=c.dataLabel,s,k,w=c.connector,l=!0;d=c.options&&c.options.dataLabels;g=f.enabled||d&&d.enabled;
if(r&&!g)c.dataLabel=r.destroy();else if(g){b=v(f,d);g=b.rotation;s=c.getLabelConfig();h=b.format?ka(b.format,s):b.formatter.call(s,b);b.style.color=n(b.color,b.style.color,a.color,"black");if(r)if(t(h))r.attr({text:h}),l=!1;else{if(c.dataLabel=r=r.destroy(),w)c.connector=w.destroy()}else if(t(h)){r={fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,r:b.borderRadius||0,rotation:g,padding:b.padding,zIndex:1};for(k in r)r[k]===N&&delete r[k];r=c.dataLabel=a.chart.renderer[g?"text":
"label"](h,0,-999,null,null,null,b.useHTML).attr(r).css(b.style).add(e).shadow(b.shadow)}r&&a.alignDataLabel(c,r,b,null,l)}})},alignDataLabel:function(a,b,c,d,f){var h=this.chart,e=h.inverted,p=n(a.plotX,-999),r=n(a.plotY,-999);a=b.getBBox();d=g({x:e?h.plotWidth-r:p,y:L(e?h.plotHeight-p:r),width:0,height:0},d);g(c,{width:a.width,height:a.height});c.rotation?(d={align:c.align,x:d.x+c.x+d.width/2,y:d.y+c.y+d.height/2},b[f?"attr":"animate"](d)):(b.align(c,null,d),d=b.alignAttr);b.attr({visibility:!1===
c.crop||h.isInsidePlot(d.x,d.y)&&h.isInsidePlot(d.x+a.width,d.y+a.height)?h.renderer.isSVG?"inherit":"visible":"hidden"})},getSegmentPath:function(a){var b=this,c=[],d=b.options.step;C(a,function(f,h){var e=f.plotX,p=f.plotY,g;b.getPointSpline?c.push.apply(c,b.getPointSpline(a,f,h)):(c.push(h?"L":"M"),d&&h&&(g=a[h-1],"right"===d?c.push(g.plotX,p):"center"===d?c.push((g.plotX+e)/2,g.plotY,(g.plotX+e)/2,p):c.push(e,g.plotY)),c.push(f.plotX,f.plotY))});return c},getGraphPath:function(){var a=this,b=
[],c,d=[];C(a.segments,function(f){c=a.getSegmentPath(f);1<f.length?b=b.concat(c):d.push(f[0])});a.singlePoints=d;return a.graphPath=b},drawGraph:function(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color]],d=b.lineWidth,f=b.dashStyle,h=this.getGraphPath(),e=b.negativeColor;e&&c.push(["graphNeg",e]);C(c,function(c,e){var m=c[0],g=a[m];g?(ab(g),g.animate({d:h})):d&&h.length&&(g={stroke:c[1],"stroke-width":d,zIndex:1},f&&(g.dashstyle=f),a[m]=a.chart.renderer.path(h).attr(g).add(a.group).shadow(!e&&
b.shadow))})},clipNeg:function(){var a=this.options,b=this.chart,c=b.renderer,d=a.negativeColor||a.negativeFillColor,f,h=this.graph,e=this.area,g=this.posClip,r=this.negClip;f=b.chartWidth;var s=b.chartHeight,k=K(f,s),w=this.yAxis;d&&(h||e)&&(d=L(w.toPixels(a.threshold||0,!0)),a={x:0,y:0,width:k,height:d},k={x:0,y:d,width:k,height:k},b.inverted&&(a.height=k.y=b.plotWidth-d,c.isVML&&(a={x:b.plotWidth-d-b.plotLeft,y:0,width:f,height:s},k={x:d+b.plotLeft-f,y:0,width:b.plotLeft+d,height:f})),w.reversed?
(b=k,f=a):(b=a,f=k),g?(g.animate(b),r.animate(f)):(this.posClip=g=c.clipRect(b),this.negClip=r=c.clipRect(f),h&&this.graphNeg&&(h.clip(g),this.graphNeg.clip(r)),e&&(e.clip(g),this.areaNeg.clip(r))))},invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};C(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;b.xAxis&&(ia(c,"resize",a),ia(b,"destroy",function(){Aa(c,"resize",a)}),a(),b.invertGroups=a)},plotGroup:function(a,b,c,d,f){var h=
this[a],e=!h;e&&(this[a]=h=this.chart.renderer.g(b).attr({visibility:c,zIndex:d||0.1}).add(f));h[e?"attr":"animate"](this.getPlotBox());return h},getPlotBox:function(){return{translateX:this.xAxis?this.xAxis.left:this.chart.plotLeft,translateY:this.yAxis?this.yAxis.top:this.chart.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this.chart,b,c=this.options,d=c.animation&&!!this.animate&&a.renderer.isSVG,f=this.visible?"visible":"hidden",h=c.zIndex,e=this.hasRendered,g=a.seriesGroup;b=this.plotGroup("group",
"series",f,h,g);this.markerGroup=this.plotGroup("markerGroup","markers",f,h,g);d&&this.animate(!0);this.getAttribs();b.inverted=this.isCartesian?a.inverted:!1;this.drawGraph&&(this.drawGraph(),this.clipNeg());this.drawDataLabels();this.drawPoints();!1!==this.options.enableMouseTracking&&this.drawTracker();a.inverted&&this.invertGroups();!1===c.clip||this.sharedClipKey||e||b.clip(a.clipRect);d?this.animate():e||this.afterAnimate();this.isDirty=this.isDirtyData=!1;this.hasRendered=!0},redraw:function(){var a=
this.chart,b=this.isDirtyData,c=this.group,d=this.xAxis,f=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:n(d&&d.left,a.plotLeft),translateY:n(f&&f.top,a.plotTop)}));this.translate();this.setTooltipPoints(!0);this.render();b&&$(this,"updatedData")},setState:function(a){var b=this.options,c=this.graph,d=this.graphNeg,f=b.states,b=b.lineWidth;a=a||"";this.state!==a&&(this.state=a,f[a]&&!1===f[a].enabled||(a&&(b=f[a].lineWidth||b+1),c&&!c.dashstyle&&(a=
{"stroke-width":b},c.attr(a),d&&d.attr(a))))},setVisible:function(a,b){var c=this,d=c.chart,f=c.legendItem,h,e=d.options.chart.ignoreHiddenSeries,g=c.visible;h=(c.visible=a=c.userOptions.visible=a===N?!g:a)?"show":"hide";C(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][h]()});if(d.hoverSeries===c)c.onMouseOut();f&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&C(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});C(c.linkedSeries,function(b){b.setVisible(a,
!1)});e&&(d.isDirtyBox=!0);!1!==b&&d.redraw();$(c,h)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=a===N?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);$(this,a?"select":"unselect")},drawTracker:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),f=d.length,h=a.chart,e=h.pointer,g=h.renderer,r=h.options.tooltip.snap,s=a.tracker,k=b.cursor,w=k&&{cursor:k},k=a.singlePoints,l,n=function(){if(h.hoverSeries!==
a)a.onMouseOver()};if(f&&!c)for(l=f+1;l--;)"M"===d[l]&&d.splice(l+1,0,d[l+1]-r,d[l+2],"L"),(l&&"M"===d[l]||l===f)&&d.splice(l,0,"L",d[l-2]+r,d[l-1]);for(l=0;l<k.length;l++)f=k[l],d.push("M",f.plotX-r,f.plotY,"L",f.plotX+r,f.plotY);s?s.attr({d:d}):(a.tracker=g.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:Ib,fill:c?Ib:ra,"stroke-width":b.lineWidth+(c?0:2*r),zIndex:2}).add(a.group),C([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",
n).on("mouseout",function(a){e.onTrackerMouseOut(a)}).css(w);if(lb)a.on("touchstart",n)}))}};aa=R(oa);za.line=aa;va.area=v(ua,{threshold:0});aa=R(oa,{type:"area",getSegments:function(){var a=[],b=[],c=[],d=this.xAxis,f=this.yAxis,h=f.stacks[this.stackKey],e={},g,r,s=this.points,k,w,l;if(this.options.stacking&&!this.cropped){for(w=0;w<s.length;w++)e[s[w].x]=s[w];for(l in h)c.push(+l);c.sort(function(a,b){return a-b});C(c,function(a){e[a]?b.push(e[a]):(g=d.translate(a),k=h[a].percent?h[a].total?100*
h[a].cum/h[a].total:0:h[a].cum,r=f.toPixels(k,!0),b.push({y:null,plotX:g,clientX:g,plotY:r,yBottom:r,onMouseOver:Ma}))});b.length&&a.push(b)}else oa.prototype.getSegments.call(this),a=this.segments;this.segments=a},getSegmentPath:function(a){var b=oa.prototype.getSegmentPath.call(this,a),c=[].concat(b),d,f=this.options;3===b.length&&c.push("L",b[1],b[2]);if(f.stacking&&!this.closedStacks)for(d=a.length-1;0<=d;d--)d<a.length-1&&f.step&&c.push(a[d+1].plotX,a[d].yBottom),c.push(a[d].plotX,a[d].yBottom);
else this.closeSegment(c,a);this.areaPath=this.areaPath.concat(c);return b},closeSegment:function(a,b){var c=this.yAxis.getThreshold(this.options.threshold);a.push("L",b[b.length-1].plotX,c,"L",b[0].plotX,c)},drawGraph:function(){this.areaPath=[];oa.prototype.drawGraph.apply(this);var a=this,b=this.areaPath,c=this.options,d=c.negativeColor,f=c.negativeFillColor,h=[["area",this.color,c.fillColor]];(d||f)&&h.push(["areaNeg",d,f]);C(h,function(d){var f=d[0],h=a[f];h?h.animate({d:b}):a[f]=a.chart.renderer.path(b).attr({fill:n(d[2],
Fa(d[1]).setOpacity(n(c.fillOpacity,0.75)).get()),zIndex:0}).add(a.group)})},drawLegendSymbol:function(a,b){b.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,a.options.symbolWidth,12,2).attr({zIndex:3}).add(b.legendGroup)}});za.area=aa;va.spline=v(ua);ja=R(oa,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,f=b.plotY,h=a[c-1],e=a[c+1],g,r,s,k;if(h&&e){a=h.plotY;s=e.plotX;var e=e.plotY,w;g=(1.5*d+h.plotX)/2.5;r=(1.5*f+a)/2.5;s=(1.5*d+s)/2.5;k=(1.5*f+e)/2.5;w=(k-r)*(s-d)/(s-g)+f-k;
r+=w;k+=w;r>a&&r>f?(r=K(a,f),k=2*f-r):r<a&&r<f&&(r=Y(a,f),k=2*f-r);k>e&&k>f?(k=K(e,f),r=2*f-k):k<e&&k<f&&(k=Y(e,f),r=2*f-k);b.rightContX=s;b.rightContY=k}c?(b=["C",h.rightContX||h.plotX,h.rightContY||h.plotY,g||d,r||f,d,f],h.rightContX=h.rightContY=null):b=["M",d,f];return b}});za.spline=ja;va.areaspline=v(va.area);Da=aa.prototype;ja=R(ja,{type:"areaspline",closedStacks:!0,getSegmentPath:Da.getSegmentPath,closeSegment:Da.closeSegment,drawGraph:Da.drawGraph,drawLegendSymbol:Da.drawLegendSymbol});za.areaspline=
ja;va.column=v(ua,{borderColor:"#FFFFFF",borderWidth:1,borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},stickyTracking:!1,threshold:0});ja=R(oa,{type:"column",pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",r:"borderRadius"},trackerGroups:["group","dataLabelsGroup"],
negStacks:!0,init:function(){oa.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&C(b.series,function(b){b.type===a.type&&(b.isDirty=!0)})},getColumnMetrics:function(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,f=c.reversed,h,e={},g,r=0;!1===b.grouping?r=1:C(a.chart.series,function(b){var c=b.options,f=b.yAxis;b.type===a.type&&b.visible&&d.len===f.len&&d.pos===f.pos&&(c.stacking?(h=b.stackKey,e[h]===N&&(e[h]=r++),g=e[h]):!1!==c.grouping&&(g=r++),b.columnIndex=g)});var c=Y(ea(c.transA)*
(c.ordinalSlope||b.pointRange||c.closestPointRange||1),c.len),k=c*b.groupPadding,s=(c-2*k)/r,w=b.pointWidth,b=t(w)?(s-w)/2:s*b.pointPadding,w=n(w,s-2*b);return a.columnMetrics={width:w,offset:b+(k+((f?r-(a.columnIndex||0):a.columnIndex)||0)*s-c/2)*(f?-1:1)}},translate:function(){var a=this.chart,b=this.options,c=b.borderWidth,d=this.yAxis,f=this.translatedThreshold=d.getThreshold(b.threshold),h=n(b.minPointLength,5),b=this.getColumnMetrics(),e=b.width,g=this.barW=Ka(K(e,1+2*c)),r=this.pointXOffset=
b.offset,s=-(c%2?0.5:0),k=c%2?0.5:1;a.renderer.isVML&&a.inverted&&(k+=1);oa.prototype.translate.apply(this);C(this.points,function(a){var b=Y(K(-999,a.plotY),d.len+999),c=n(a.yBottom,f),w=a.plotX+r,l=g,q=Y(b,c),H,b=K(b,c)-q;ea(b)<h&&h&&(b=h,q=L(ea(q-f)>h?c-h:f-(d.translate(a.y,0,1,0,1)<=f?h:0)));a.barX=w;a.pointWidth=e;c=0.5>ea(w);l=L(w+l)+s;w=L(w)+s;l-=w;H=0.5>ea(q);b=L(q+b)+k;q=L(q)+k;b-=q;c&&(w+=1,l-=1);H&&(q-=1,b+=1);a.shapeType="rect";a.shapeArgs={x:w,y:q,width:l,height:b}})},getSymbol:Ma,drawLegendSymbol:aa.prototype.drawLegendSymbol,
drawGraph:Ma,drawPoints:function(){var a=this,b=a.options,c=a.chart.renderer,d;C(a.points,function(f){var h=f.plotY,e=f.graphic;h===N||isNaN(h)||null===f.y?e&&(f.graphic=e.destroy()):(d=f.shapeArgs,e?(ab(e),e.animate(v(d))):f.graphic=c[f.shapeType](d).attr(f.pointAttr[f.selected?"select":""]).add(a.group).shadow(b.shadow,null,b.stacking&&!b.borderRadius))})},drawTracker:function(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,f=d&&{cursor:d},h=function(c){var d=c.target,f;if(b.hoverSeries!==
a)a.onMouseOver();for(;d&&!f;)f=d.point,d=d.parentNode;if(f!==N&&f!==b.hoverPoint)f.onMouseOver(c)};C(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.element.point=a)});a._hasTracking||(C(a.trackerGroups,function(b){if(a[b]&&(a[b].addClass("highcharts-tracker").on("mouseover",h).on("mouseout",function(a){c.onTrackerMouseOut(a)}).css(f),lb))a[b].on("touchstart",h)}),a._hasTracking=!0)},alignDataLabel:function(a,b,c,d,f){var h=this.chart,e=h.inverted,g=a.dlBox||
a.shapeArgs,r=a.below||a.plotY>n(this.translatedThreshold,h.plotSizeY),k=n(c.inside,!!this.options.stacking);g&&(d=v(g),e&&(d={x:h.plotWidth-d.y-d.height,y:h.plotHeight-d.x-d.width,width:d.height,height:d.width}),!k)&&(e?(d.x+=r?0:d.width,d.width=0):(d.y+=r?d.height:0,d.height=0));c.align=n(c.align,!e||k?"center":r?"right":"left");c.verticalAlign=n(c.verticalAlign,e||k?"middle":r?"top":"bottom");oa.prototype.alignDataLabel.call(this,a,b,c,d,f)},animate:function(a){var b=this.yAxis,c=this.options,
d=this.chart.inverted,f={};xa&&(a?(f.scaleY=0.001,a=Y(b.pos+b.len,K(b.pos,b.toPixels(c.threshold))),d?f.translateX=a-b.len:f.translateY=a,this.group.attr(f)):(f.scaleY=1,f[d?"translateX":"translateY"]=b.pos,this.group.animate(f,this.options.animation),this.animate=null))},remove:function(){var a=this,b=a.chart;b.hasRendered&&C(b.series,function(b){b.type===a.type&&(b.isDirty=!0)});oa.prototype.remove.apply(a,arguments)}});za.column=ja;va.bar=v(va.column);Da=R(ja,{type:"bar",inverted:!0});za.bar=Da;
va.scatter=v(ua,{lineWidth:0,tooltip:{headerFormat:'<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",followPointer:!0},stickyTracking:!1});Da=R(oa,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["markerGroup"],drawTracker:ja.prototype.drawTracker,setTooltipPoints:Ma});za.scatter=Da;va.pie=v(ua,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,
enabled:!0,formatter:function(){return this.point.name}},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});ua={type:"pie",isCartesian:!1,pointClass:R(Va,{init:function(){Va.prototype.init.apply(this,arguments);var a=this,b;0>a.y&&(a.y=null);g(a,{visible:!1!==a.visible,name:n(a.name,"Slice")});b=function(b){a.slice("select"===b.type)};ia(a,"select",b);ia(a,"unselect",
b);return a},setVisible:function(a){var b=this,c=b.series,d=c.chart,f;b.visible=b.options.visible=a=a===N?!b.visible:a;c.options.data[Ea(b,c.data)]=b.options;f=a?"show":"hide";C(["graphic","dataLabel","connector","shadowGroup"],function(a){if(b[a])b[a][f]()});b.legendItem&&d.legend.colorizeItem(b,a);!c.isDirty&&c.options.ignoreHiddenPoint&&(c.isDirty=!0,d.redraw())},slice:function(a,b,c){var d=this.series;s(c,d.chart);n(b,!0);this.sliced=this.options.sliced=a=t(a)?a:!this.sliced;d.options.data[Ea(this,
d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)}}),requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},getColor:Ma,animate:function(a){var b=this,c=b.points,d=b.startAngleRad;a||(C(c,function(a){var c=a.graphic;a=a.shapeArgs;c&&(c.attr({r:b.center[3]/2,start:d,end:d}),c.animate({r:a.r,start:a.start,
end:a.end},b.options.animation))}),b.animate=null)},setData:function(a,b){oa.prototype.setData.call(this,a,!1);this.processData();this.generatePoints();n(b,!0)&&this.chart.redraw()},generatePoints:function(){var a,b=0,c,d,f,h=this.options.ignoreHiddenPoint;oa.prototype.generatePoints.call(this);c=this.points;d=c.length;for(a=0;a<d;a++)f=c[a],b+=h&&!f.visible?0:f.y;this.total=b;for(a=0;a<d;a++)f=c[a],f.percentage=0<b?100*(f.y/b):0,f.total=b},getCenter:function(){var a=this.options,b=this.chart,c=2*
(a.slicedOffset||0),d,f=b.plotWidth-2*c,h=b.plotHeight-2*c,b=a.center,a=[n(b[0],"50%"),n(b[1],"50%"),a.size||"100%",a.innerSize||0],e=Y(f,h),g;return Ua(a,function(a,b){g=/%$/.test(a);d=2>b||2===b&&g;return(g?[f,h,e,e][b]*y(a)/100:a)+(d?c:0)})},translate:function(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,f=d+c.borderWidth,h,e,g,r=this.startAngleRad=Ta/180*((c.startAngle||0)%360-90),k=this.points,s=2*Ta,w=c.dataLabels.distance,c=c.ignoreHiddenPoint,l,n=k.length,q;a||(this.center=
a=this.getCenter());this.getX=function(b,c){g=pa.asin((b-a[1])/(a[2]/2+w));return a[0]+(c?-1:1)*ta(g)*(a[2]/2+w)};for(l=0;l<n;l++){q=k[l];h=L(1E3*(r+b*s))/1E3;if(!c||q.visible)b+=q.percentage/100;e=L(1E3*(r+b*s))/1E3;q.shapeType="arc";q.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:h,end:e};g=(e+h)/2;g>0.75*s&&(g-=2*Ta);q.slicedTranslation={translateX:L(ta(g)*d),translateY:L(Ca(g)*d)};h=ta(g)*a[2]/2;e=Ca(g)*a[2]/2;q.tooltipPos=[a[0]+0.7*h,a[1]+0.7*e];q.half=g<s/4?0:1;q.angle=g;f=Y(f,w/2);
q.labelPos=[a[0]+h+ta(g)*w,a[1]+e+Ca(g)*w,a[0]+h+ta(g)*f,a[1]+e+Ca(g)*f,a[0]+h,a[1]+e,0>w?"center":q.half?"right":"left",g]}this.setTooltipPoints()},drawGraph:null,drawPoints:function(){var a=this,b=a.chart.renderer,c,d,f=a.options.shadow,h,e;f&&!a.shadowGroup&&(a.shadowGroup=b.g("shadow").add(a.group));C(a.points,function(r){d=r.graphic;e=r.shapeArgs;h=r.shadowGroup;f&&!h&&(h=r.shadowGroup=b.g("shadow").add(a.shadowGroup));c=r.sliced?r.slicedTranslation:{translateX:0,translateY:0};h&&h.attr(c);d?
d.animate(g(e,c)):r.graphic=d=b.arc(e).setRadialReference(a.center).attr(r.pointAttr[r.selected?"select":""]).attr({"stroke-linejoin":"round"}).attr(c).add(a.group).shadow(f,h);!1===r.visible&&r.setVisible(!1)})},drawDataLabels:function(){var a=this,b=a.data,c,d=a.chart,f=a.options.dataLabels,h=n(f.connectorPadding,10),e=n(f.connectorWidth,1),g=d.plotWidth,d=d.plotHeight,r,k,s=n(f.softConnector,!0),w=f.distance,l=a.center,q=l[2]/2,H=l[1],I=0<w,t,O,u,E,U=[[],[]],A,v,x,F,y,D=[0,0,0,0],B=function(a,
b){return b.y-a.y},ca=function(a,b){a.sort(function(a,c){return void 0!==a.angle&&(c.angle-a.angle)*b})};if(a.visible&&(f.enabled||a._hasPointLabels)){oa.prototype.drawDataLabels.apply(a);C(b,function(a){a.dataLabel&&U[a.half].push(a)});for(F=0;!E&&b[F];)E=b[F]&&b[F].dataLabel&&(b[F].dataLabel.getBBox().height||21),F++;for(F=2;F--;){var b=[],Sa=[],Ba=U[F],M=Ba.length,S;ca(Ba,F-0.5);if(0<w){for(y=H-q-w;y<=H+q+w;y+=E)b.push(y);O=b.length;if(M>O){c=[].concat(Ba);c.sort(B);for(y=M;y--;)c[y].rank=y;for(y=
M;y--;)Ba[y].rank>=O&&Ba.splice(y,1);M=Ba.length}for(y=0;y<M;y++){c=Ba[y];u=c.labelPos;c=9999;var Ja,T;for(T=0;T<O;T++)Ja=ea(b[T]-u[1]),Ja<c&&(c=Ja,S=T);if(S<y&&null!==b[y])S=y;else for(O<M-y+S&&null!==b[y]&&(S=O-M+y);null===b[S];)S++;Sa.push({i:S,y:b[S]});b[S]=null}Sa.sort(B)}for(y=0;y<M;y++){c=Ba[y];u=c.labelPos;t=c.dataLabel;x=!1===c.visible?"hidden":"visible";c=u[1];if(0<w){if(O=Sa.pop(),S=O.i,v=O.y,c>v&&null!==b[S+1]||c<v&&null!==b[S-1])v=c}else v=c;A=f.justify?l[0]+(F?-1:1)*(q+w):a.getX(0===
S||S===b.length-1?c:v,F);t._attr={visibility:x,align:u[6]};t._pos={x:A+f.x+({left:h,right:-h}[u[6]]||0),y:v+f.y-10};t.connX=A;t.connY=v;null===this.options.size&&(O=t.width,A-O<h?D[3]=K(L(O-A+h),D[3]):A+O>g-h&&(D[1]=K(L(A+O-g+h),D[1])),0>v-E/2?D[0]=K(L(-v+E/2),D[0]):v+E/2>d&&(D[2]=K(L(v+E/2-d),D[2])))}}if(0===qa(D)||this.verifyDataLabelOverflow(D))this.placeDataLabels(),I&&e&&C(this.points,function(b){r=b.connector;u=b.labelPos;(t=b.dataLabel)&&t._pos?(x=t._attr.visibility,A=t.connX,v=t.connY,k=s?
["M",A+("left"===u[6]?5:-5),v,"C",A,v,2*u[2]-u[4],2*u[3]-u[5],u[2],u[3],"L",u[4],u[5]]:["M",A+("left"===u[6]?5:-5),v,"L",u[2],u[3],"L",u[4],u[5]],r?(r.animate({d:k}),r.attr("visibility",x)):b.connector=r=a.chart.renderer.path(k).attr({"stroke-width":e,stroke:f.connectorColor||b.color||"#606060",visibility:x}).add(a.group)):r&&(b.connector=r.destroy())})}},verifyDataLabelOverflow:function(a){var b=this.center,c=this.options,d=c.center,f=c=c.minSize||80,h;null!==d[0]?f=K(b[2]-K(a[1],a[3]),c):(f=K(b[2]-
a[1]-a[3],c),b[0]+=(a[3]-a[1])/2);null!==d[1]?f=K(Y(f,b[2]-K(a[0],a[2])),c):(f=K(Y(f,b[2]-a[0]-a[2]),c),b[1]+=(a[0]-a[2])/2);f<b[2]?(b[2]=f,this.translate(b),C(this.points,function(a){a.dataLabel&&(a.dataLabel._pos=null)}),this.drawDataLabels()):h=!0;return h},placeDataLabels:function(){C(this.points,function(a){a=a.dataLabel;var b;a&&((b=a._pos)?(a.attr(a._attr),a[a.moved?"animate":"attr"](b),a.moved=!0):a&&a.attr({y:-999}))})},alignDataLabel:Ma,drawTracker:ja.prototype.drawTracker,drawLegendSymbol:aa.prototype.drawLegendSymbol,
getSymbol:Ma};ua=R(oa,ua);za.pie=ua;g(Highcharts,{Axis:Ja,Chart:wb,Color:Fa,Legend:vb,Pointer:Ba,Point:Va,Tick:O,Tooltip:ub,Renderer:$a,Series:oa,SVGElement:U,SVGRenderer:Ra,arrayMin:da,arrayMax:qa,charts:Qa,dateFormat:bb,format:ka,pathAnim:yb,getOptions:function(){return ma},hasBidiBug:Mb,isTouchDevice:Gb,numberFormat:u,seriesTypes:za,setOptions:function(a){ma=v(ma,a);H();return ma},addEvent:ia,removeEvent:Aa,createElement:Q,discardElement:fa,css:x,each:C,extend:g,map:Ua,merge:v,pick:n,splat:P,extendClass:R,
pInt:y,wrap:ca,svg:xa,canvas:ya,vml:!xa&&!ya,product:"Highcharts",version:"3.0.5"})})();(function(g,v){function y(e,g,k){this.init.call(this,e,g,k)}function B(e,g,k){e.call(this,g,k);this.chart.polar&&(this.closeSegment=function(e){var g=this.xAxis.center;e.push("L",g[0],g[1])},this.closedStacks=!0)}function l(e,g){var k=this.chart,l=this.options.animation,n=this.group,q=this.markerGroup,I=this.xAxis.center,u=k.plotLeft,t=k.plotTop;if(k.polar){if(k.renderer.isSVG)if(!0===l&&(l={}),g){if(k={translateX:I[0]+u,translateY:I[1]+t,scaleX:0.001,scaleY:0.001},n.attr(k),q)q.attrSetters=n.attrSetters,
q.attr(k)}else k={translateX:u,translateY:t,scaleX:1,scaleY:1},n.animate(k,l),q&&q.animate(k,l),this.animate=null}else e.call(this,g)}var q=g.arrayMin,e=g.arrayMax,k=g.each,M=g.extend,D=g.merge,t=g.map,A=g.pick,P=g.pInt,n=g.getOptions().plotOptions,x=g.seriesTypes,Q=g.extendClass,R=g.splat,u=g.wrap,S=g.Axis,ca=g.Tick,ka=g.Series,ga=x.column.prototype,V=Math,ha=V.round,T=V.floor,E=V.max,F=function(){};M(y.prototype,{init:function(e,g,s){var l=this,n=l.defaultOptions;l.chart=g;g.angular&&(n.background=
{});l.options=e=D(n,e);(e=e.background)&&k([].concat(R(e)).reverse(),function(e){var g=e.backgroundColor;e=D(l.defaultBackgroundOptions,e);g&&(e.backgroundColor=g);e.color=e.backgroundColor;s.options.plotBands.unshift(e)})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"silver",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#FFF"],[1,"#DDD"]]},from:Number.MIN_VALUE,innerRadius:0,to:Number.MAX_VALUE,
outerRadius:"105%"}});var da=S.prototype,ca=ca.prototype,qa={getOffset:F,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:F,setCategories:F,setTitle:F},ba={isRadial:!0,defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,plotBands:[],tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,
distance:15,x:0,y:null},maxPadding:0,minPadding:0,plotBands:[],showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},plotBands:[],showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(e){this.options=D(this.defaultOptions,this.defaultRadialOptions,e)},getOffset:function(){da.getOffset.call(this);this.chart.axisOffset[this.side]=0;this.center=this.pane.center=x.pie.prototype.getCenter.call(this.pane)},getLinePath:function(e,
g){var k=this.center;g=A(g,k[2]/2-this.offset);return this.chart.renderer.symbols.arc(this.left+k[0],this.top+k[1],g,g,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0})},setAxisTranslation:function(){da.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.isXAxis)&&(this.minPixelPadding=this.transA*this.minPointOffset+(this.reversed?(this.endAngleRad-this.startAngleRad)/
4:0))},beforeSetTickPositions:function(){this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange)},setAxisSize:function(){da.setAxisSize.call(this);this.center&&(this.len=this.width=this.height=this.isCircular?this.center[2]*(this.endAngleRad-this.startAngleRad)/2:this.center[2]/2)},getPosition:function(e,g){this.isCircular||(g=this.translate(e),e=this.min);return this.postTranslate(this.translate(e),A(g,this.center[2]/2)-this.offset)},postTranslate:function(e,g){var k=
this.chart,l=this.center;e=this.startAngleRad+e;return{x:k.plotLeft+l[0]+Math.cos(e)*g,y:k.plotTop+l[1]+Math.sin(e)*g}},getPlotBandPath:function(e,g,k){var l=this.center,n=this.startAngleRad,q=l[2]/2,I=[A(k.outerRadius,"100%"),k.innerRadius,A(k.thickness,10)],u=/%$/,E,v=this.isCircular;"polygon"===this.options.gridLineInterpolation?l=this.getPlotLinePath(e).concat(this.getPlotLinePath(g,!0)):(v||(I[0]=this.translate(e),I[1]=this.translate(g)),I=t(I,function(e){u.test(e)&&(e=P(e,10)*q/100);return e}),
"circle"!==k.shape&&v?(e=n+this.translate(e),g=n+this.translate(g)):(e=-Math.PI/2,g=1.5*Math.PI,E=!0),l=this.chart.renderer.symbols.arc(this.left+l[0],this.top+l[1],I[0],I[0],{start:e,end:g,innerR:A(I[1],I[0]-I[2]),open:E}));return l},getPlotLinePath:function(e,g){var s=this.center,l=this.chart,n=this.getPosition(e),q,I,u;this.isCircular?u=["M",s[0]+l.plotLeft,s[1]+l.plotTop,"L",n.x,n.y]:"circle"===this.options.gridLineInterpolation?(e=this.translate(e))&&(u=this.getLinePath(0,e)):(q=l.xAxis[0],u=
[],e=this.translate(e),s=q.tickPositions,q.autoConnect&&(s=s.concat([s[0]])),g&&(s=[].concat(s).reverse()),k(s,function(g,k){I=q.getPosition(g,e);u.push(k?"L":"M",I.x,I.y)}));return u},getTitlePosition:function(){var e=this.center,g=this.chart,k=this.options.title;return{x:g.plotLeft+e[0]+(k.x||0),y:g.plotTop+e[1]-{high:0.5,middle:0.25,low:0}[k.align]*e[2]+(k.y||0)}}};u(da,"init",function(e,g,k){var l,n=g.angular,q=g.polar,I=k.isX,u=n&&I,t,E;E=g.options;var x=k.pane||0;if(n){if(M(this,u?qa:ba),t=
!I)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else q&&(M(this,ba),this.defaultRadialOptions=(t=I)?this.defaultRadialXOptions:D(this.defaultYAxisOptions,this.defaultRadialYOptions));e.call(this,g,k);u||!n&&!q||(e=this.options,g.panes||(g.panes=[]),this.pane=(l=g.panes[x]=g.panes[x]||new y(R(E.pane)[x],g,this),x=l),x=x.options,g.inverted=!1,E.chart.zoomType=null,this.startAngleRad=g=(x.startAngle-90)*Math.PI/180,this.endAngleRad=E=(A(x.endAngle,x.startAngle+360)-90)*Math.PI/180,this.offset=
e.offset||0,(this.isCircular=t)&&k.max===v&&E-g===2*Math.PI&&(this.autoConnect=!0))});u(ca,"getPosition",function(e,g,k,l,n){var q=this.axis;return q.getPosition?q.getPosition(k):e.call(this,g,k,l,n)});u(ca,"getLabelPosition",function(e,g,k,l,n,q,u,t,E){var v=this.axis,x=q.y,F=q.align,y=180*((v.translate(this.pos)+v.startAngleRad+Math.PI/2)/Math.PI)%360;v.isRadial?(e=v.getPosition(this.pos,v.center[2]/2+A(q.distance,-25)),"auto"===q.rotation?l.attr({rotation:y}):null===x&&(x=0.9*P(l.styles.lineHeight)-
l.getBBox().height/2),null===F&&(F=v.isCircular?20<y&&160>y?"left":200<y&&340>y?"right":"center":"center",l.attr({align:F})),e.x+=q.x,e.y+=x):e=e.call(this,g,k,l,n,q,u,t,E);return e});u(ca,"getMarkPath",function(e,g,k,l,n,q,u){var t=this.axis;t.isRadial?(e=t.getPosition(this.pos,t.center[2]/2+l),g=["M",g,k,"L",e.x,e.y]):g=e.call(this,g,k,l,n,q,u);return g});n.arearange=D(n.area,{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
trackByArea:!0,dataLabels:{verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}});x.arearange=g.extendClass(x.area,{type:"arearange",pointArrayMap:["low","high"],toYData:function(e){return[e.low,e.high]},pointValKey:"low",getSegments:function(){var e=this;k(e.points,function(g){e.options.connectNulls||null!==g.low&&null!==g.high?null===g.low&&null!==g.high&&(g.y=g.high):g.y=null});ka.prototype.getSegments.call(this)},translate:function(){var e=this.yAxis;x.area.prototype.translate.apply(this);k(this.points,
function(g){var k=g.low,l=g.high,n=g.plotY;null===l&&null===k?g.y=null:null===k?(g.plotLow=g.plotY=null,g.plotHigh=e.translate(l,0,1,0,1)):null===l?(g.plotLow=n,g.plotHigh=null):(g.plotLow=n,g.plotHigh=e.translate(l,0,1,0,1))})},getSegmentPath:function(e){var g,k=[],l=e.length,n=ka.prototype.getSegmentPath,q,u;u=this.options;var t=u.step;for(g=HighchartsAdapter.grep(e,function(e){return null!==e.plotLow});l--;)q=e[l],null!==q.plotHigh&&k.push({plotX:q.plotX,plotY:q.plotHigh});e=n.call(this,g);t&&
(!0===t&&(t="left"),u.step={left:"right",center:"center",right:"left"}[t]);k=n.call(this,k);u.step=t;u=[].concat(e,k);k[0]="L";this.areaPath=this.areaPath.concat(e,k);return u},drawDataLabels:function(){var e=this.data,g=e.length,k,l=[],n=ka.prototype,q=this.options.dataLabels,u,t=this.chart.inverted;if(q.enabled||this._hasPointLabels){for(k=g;k--;)u=e[k],u.y=u.high,u.plotY=u.plotHigh,l[k]=u.dataLabel,u.dataLabel=u.dataLabelUpper,u.below=!1,t?(q.align="left",q.x=q.xHigh):q.y=q.yHigh;n.drawDataLabels.apply(this,
arguments);for(k=g;k--;)u=e[k],u.dataLabelUpper=u.dataLabel,u.dataLabel=l[k],u.y=u.low,u.plotY=u.plotLow,u.below=!0,t?(q.align="right",q.x=q.xLow):q.y=q.yLow;n.drawDataLabels.apply(this,arguments)}},alignDataLabel:x.column.prototype.alignDataLabel,getSymbol:x.column.prototype.getSymbol,drawPoints:F});n.areasplinerange=D(n.arearange);x.areasplinerange=Q(x.arearange,{type:"areasplinerange",getPointSpline:x.spline.prototype.getPointSpline});n.columnrange=D(n.column,n.arearange,{lineWidth:1,pointRange:null});
x.columnrange=Q(x.arearange,{type:"columnrange",translate:function(){var e=this,g=e.yAxis,l;ga.translate.apply(e);k(e.points,function(k){var n=k.shapeArgs,q=e.options.minPointLength,u;k.plotHigh=l=g.translate(k.high,0,1,0,1);k.plotLow=k.plotY;u=l;k=k.plotY-l;k<q&&(q-=k,k+=q,u-=q/2);n.height=k;n.y=u})},trackerGroups:["group","dataLabels"],drawGraph:F,pointAttrToOptions:ga.pointAttrToOptions,drawPoints:ga.drawPoints,drawTracker:ga.drawTracker,animate:ga.animate,getColumnMetrics:ga.getColumnMetrics});
n.gauge=D(n.line,{dataLabels:{enabled:!0,y:15,borderWidth:1,borderColor:"silver",borderRadius:3,style:{fontWeight:"bold"},verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1});ca={type:"gauge",pointClass:g.extendClass(g.Point,{setState:function(e){this.state=e}}),angular:!0,drawGraph:F,trackerGroups:["group","dataLabels"],translate:function(){var e=this.yAxis,g=this.options,l=e.center;this.generatePoints();k(this.points,function(k){var n=D(g.dial,k.dial),q=P(A(n.radius,
80))*l[2]/200,u=P(A(n.baseLength,70))*q/100,t=P(A(n.rearLength,10))*q/100,E=n.baseWidth||3,v=n.topWidth||1,x=e.startAngleRad+e.translate(k.y,null,null,null,!0);!1===g.wrap&&(x=Math.max(e.startAngleRad,Math.min(e.endAngleRad,x)));x=180*x/Math.PI;k.shapeType="path";k.shapeArgs={d:n.path||["M",-t,-E/2,"L",u,-E/2,q,-v/2,q,v/2,u,E/2,-t,E/2,"z"],translateX:l[0],translateY:l[1],rotation:x};k.plotX=l[0];k.plotY=l[1]})},drawPoints:function(){var e=this,g=e.yAxis.center,l=e.pivot,n=e.options,q=n.pivot,u=e.chart.renderer;
k(e.points,function(g){var k=g.graphic,l=g.shapeArgs,s=l.d,q=D(n.dial,g.dial);k?(k.animate(l),l.d=s):g.graphic=u[g.shapeType](l).attr({stroke:q.borderColor||"none","stroke-width":q.borderWidth||0,fill:q.backgroundColor||"black",rotation:l.rotation}).add(e.group)});l?l.animate({translateX:g[0],translateY:g[1]}):e.pivot=u.circle(0,0,A(q.radius,5)).attr({"stroke-width":q.borderWidth||0,stroke:q.borderColor||"silver",fill:q.backgroundColor||"black"}).translate(g[0],g[1]).add(e.group)},animate:function(e){var g=
this;e||(k(g.points,function(e){var k=e.graphic;k&&(k.attr({rotation:180*g.yAxis.startAngleRad/Math.PI}),k.animate({rotation:e.shapeArgs.rotation},g.options.animation))}),g.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);x.pie.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:x.pie.prototype.setData,drawTracker:x.column.prototype.drawTracker};x.gauge=g.extendClass(x.line,
ca);n.boxplot=D(n.column,{fillColor:"#FFFFFF",lineWidth:1,medianWidth:2,states:{hover:{brightness:-0.3}},threshold:null,tooltip:{pointFormat:'<span style="color:{series.color};font-weight:bold">{series.name}</span><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},whiskerLength:"50%",whiskerWidth:2});x.boxplot=Q(x.column,{type:"boxplot",pointArrayMap:["low","q1","median","q3","high"],toYData:function(e){return[e.low,
e.q1,e.median,e.q3,e.high]},pointValKey:"high",pointAttrToOptions:{fill:"fillColor",stroke:"color","stroke-width":"lineWidth"},drawDataLabels:F,translate:function(){var e=this.yAxis,g=this.pointArrayMap;x.column.prototype.translate.apply(this);k(this.points,function(l){k(g,function(g){null!==l[g]&&(l[g+"Plot"]=e.translate(l[g],0,1,0,1))})})},drawPoints:function(){var e=this,g=e.points,l=e.options,n=e.chart.renderer,q,u,t,E,x,y,F,D,B,ca,S,M,ka,L,da,P,K,Q,V,R,ga,ba,qa=!1!==e.doQuartiles,fa=parseInt(e.options.whiskerLength,
10)/100;k(g,function(g){B=g.graphic;ga=g.shapeArgs;S={};L={};P={};ba=g.color||e.color;g.plotY!==v&&((q=g.pointAttr[g.selected?"selected":""],K=ga.width,Q=T(ga.x),V=Q+K,R=ha(K/2),u=T(qa?g.q1Plot:g.lowPlot),t=T(qa?g.q3Plot:g.lowPlot),E=T(g.highPlot),x=T(g.lowPlot),S.stroke=g.stemColor||l.stemColor||ba,S["stroke-width"]=A(g.stemWidth,l.stemWidth,l.lineWidth),S.dashstyle=g.stemDashStyle||l.stemDashStyle,L.stroke=g.whiskerColor||l.whiskerColor||ba,L["stroke-width"]=A(g.whiskerWidth,l.whiskerWidth,l.lineWidth),
P.stroke=g.medianColor||l.medianColor||ba,P["stroke-width"]=A(g.medianWidth,l.medianWidth,l.lineWidth),F=S["stroke-width"]%2/2,D=Q+R+F,ca=["M",D,t,"L",D,E,"M",D,u,"L",D,x,"z"],qa&&(F=q["stroke-width"]%2/2,D=T(D)+F,u=T(u)+F,t=T(t)+F,Q+=F,V+=F,M=["M",Q,t,"L",Q,u,"L",V,u,"L",V,t,"L",Q,t,"z"]),fa&&(F=L["stroke-width"]%2/2,E+=F,x+=F,ka=["M",D-R*fa,E,"L",D+R*fa,E,"M",D-R*fa,x,"L",D+R*fa,x]),F=P["stroke-width"]%2/2,y=ha(g.medianPlot)+F,da=["M",Q,y,"L",V,y,"z"],B)?(g.stem.animate({d:ca}),fa&&g.whiskers.animate({d:ka}),
qa&&g.box.animate({d:M}),g.medianShape.animate({d:da})):(g.graphic=B=n.g().add(e.group),g.stem=n.path(ca).attr(S).add(B),fa&&(g.whiskers=n.path(ka).attr(L).add(B)),qa&&(g.box=n.path(M).attr(q).add(B)),g.medianShape=n.path(da).attr(P).add(B)))})}});n.errorbar=D(n.boxplot,{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:n.arearange.tooltip.pointFormat},whiskerWidth:null});x.errorbar=Q(x.boxplot,{type:"errorbar",pointArrayMap:["low","high"],toYData:function(e){return[e.low,e.high]},
pointValKey:"high",doQuartiles:!1,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||x.column.prototype.getColumnMetrics.call(this)}});n.waterfall=D(n.column,{lineWidth:1,lineColor:"#333",dashStyle:"dot",borderColor:"#333"});x.waterfall=Q(x.column,{type:"waterfall",upColorProp:"fill",pointArrayMap:["low","y"],pointValKey:"y",init:function(e,g){g.stacking=!0;x.column.prototype.init.call(this,e,g)},translate:function(){var e=this.options,g=this.yAxis,k,l,n,q,u,t,
v,F,A;k=e.threshold;e=e.borderWidth%2/2;x.column.prototype.translate.apply(this);F=k;n=this.points;l=0;for(k=n.length;l<k;l++)q=n[l],u=q.shapeArgs,t=this.getStack(l),A=t.points[this.index],isNaN(q.y)&&(q.y=this.yData[l]),v=E(F,F+q.y)+A[0],u.y=g.translate(v,0,1),q.isSum||q.isIntermediateSum?(u.y=g.translate(A[1],0,1),u.height=g.translate(A[0],0,1)-u.y):F+=t.total,0>u.height&&(u.y+=u.height,u.height*=-1),q.plotY=u.y=ha(u.y)-e,u.height=ha(u.height),q.yBottom=u.y+u.height},processData:function(e){var g=
this.yData,k=this.points,l,n=g.length,q=this.options.threshold||0,u,t,E,v,x,F;t=u=E=v=q;for(F=0;F<n;F++)x=g[F],l=k?k[F]:{},"sum"===x||l.isSum?g[F]=t:"intermediateSum"===x||l.isIntermediateSum?(g[F]=u,u=q):(t+=x,u+=x),E=Math.min(t,E),v=Math.max(t,v);ka.prototype.processData.call(this,e);this.dataMin=E;this.dataMax=v},toYData:function(e){return e.isSum?"sum":e.isIntermediateSum?"intermediateSum":e.y},getAttribs:function(){x.column.prototype.getAttribs.apply(this,arguments);var e=this.options,l=e.states,
s=e.upColor||this.color,e=g.Color(s).brighten(0.1).get(),n=D(this.pointAttr),q=this.upColorProp;n[""][q]=s;n.hover[q]=l.hover.upColor||e;n.select[q]=l.select.upColor||s;k(this.points,function(e){0<e.y&&!e.color&&(e.pointAttr=n,e.color=s)})},getGraphPath:function(){var e=this.data,g=e.length,k=ha(this.options.lineWidth+this.options.borderWidth)%2/2,l=[],n,q,u;for(u=1;u<g;u++)q=e[u].shapeArgs,n=e[u-1].shapeArgs,q=["M",n.x+n.width,n.y+k,"L",q.x,n.y+k],0>e[u-1].y&&(q[2]+=n.height,q[5]+=n.height),l=l.concat(q);
return l},getExtremes:F,getStack:function(e){var g=this.yAxis.stacks,k=this.stackKey;this.processedYData[e]<this.options.threshold&&(k="-"+k);return g[k][e]},drawGraph:ka.prototype.drawGraph});n.bubble=D(n.scatter,{dataLabels:{inside:!0,style:{color:"white",textShadow:"0px 0px 3px black"},verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1},minSize:8,maxSize:"20%",tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0});x.bubble=Q(x.scatter,{type:"bubble",
pointArrayMap:["y","z"],trackerGroups:["group","dataLabelsGroup"],pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor"},applyOpacity:function(e){var k=this.options.marker,l=A(k.fillOpacity,0.5);e=e||k.fillColor||this.color;1!==l&&(e=g.Color(e).setOpacity(l).get("rgba"));return e},convertAttribs:function(){var e=ka.prototype.convertAttribs.apply(this,arguments);e.fill=this.applyOpacity(e.fill);return e},getRadii:function(e,g,k,l){var n,q,u,t=this.zData,E=[];q=0;for(n=
t.length;q<n;q++)u=g-e,u=0<u?(t[q]-e)/(g-e):0.5,E.push(V.ceil(k+u*(l-k))/2);this.radii=E},animate:function(e){var g=this.options.animation;e||(k(this.points,function(e){var k=e.graphic;e=e.shapeArgs;k&&e&&(k.attr("r",1),k.animate({r:e.r},g))}),this.animate=null)},translate:function(){var e,g=this.data,k,l,q=this.radii;x.scatter.prototype.translate.call(this);for(e=g.length;e--;)k=g[e],l=q?q[e]:0,k.negative=k.z<(this.options.zThreshold||0),l>=this.minPxSize/2?(k.shapeType="circle",k.shapeArgs={x:k.plotX,
y:k.plotY,r:l},k.dlBox={x:k.plotX-l,y:k.plotY-l,width:2*l,height:2*l}):k.shapeArgs=k.plotY=k.dlBox=v},drawLegendSymbol:function(e,g){var k=P(e.itemStyle.fontSize)/2;g.legendSymbol=this.chart.renderer.circle(k,e.baseline-k,k).attr({zIndex:3}).add(g.legendGroup);g.legendSymbol.isMarker=!0},drawPoints:x.column.prototype.drawPoints,alignDataLabel:x.column.prototype.alignDataLabel});S.prototype.beforePadding=function(){var g=this,l=this.len,n=this.chart,u=0,t=l,E=this.isXAxis,x=E?"xData":"yData",F=this.min,
y={},D=V.min(n.plotWidth,n.plotHeight),B=Number.MAX_VALUE,S=-Number.MAX_VALUE,ca=this.max-F,M=l/ca,T=[];this.tickPositions&&(k(this.series,function(l){var n=l.options;"bubble"===l.type&&l.visible&&(g.allowZoomOutside=!0,T.push(l),E)&&(k(["minSize","maxSize"],function(e){var g=n[e],k=/%$/.test(g),g=P(g);y[e]=k?D*g/100:g}),l.minPxSize=y.minSize,l=l.zData,l.length&&(B=V.min(B,V.max(q(l),!1===n.displayNegative?n.zThreshold:-Number.MAX_VALUE)),S=V.max(S,e(l))))}),k(T,function(e){var g=e[x],k=g.length,
l;E&&e.getRadii(B,S,y.minSize,y.maxSize);if(0<ca)for(;k--;)l=e.radii[k],u=Math.min((g[k]-F)*M-l,u),t=Math.max((g[k]-F)*M+l,t)}),0<ca&&A(this.options.min,this.userMin)===v&&A(this.options.max,this.userMax)===v&&(t-=l,M*=(l+u-t)/l,this.min+=u/M,this.max+=t/M))};var fa=ka.prototype,n=g.Pointer.prototype;fa.toXY=function(e){var g,k=this.chart;g=e.plotX;var l=e.plotY;e.rectPlotX=g;e.rectPlotY=l;e.clientX=(180*(g/Math.PI)+this.xAxis.pane.options.startAngle)%360;g=this.xAxis.postTranslate(e.plotX,this.yAxis.len-
l);e.plotX=e.polarPlotX=g.x-k.plotLeft;e.plotY=e.polarPlotY=g.y-k.plotTop};fa.orderTooltipPoints=function(e){this.chart.polar&&(e.sort(function(e,g){return e.clientX-g.clientX}),e[0])&&(e[0].wrappedClientX=e[0].clientX+360,e.push(e[0]))};u(x.area.prototype,"init",B);u(x.areaspline.prototype,"init",B);u(x.spline.prototype,"getPointSpline",function(e,g,k,l){var n,q,u,t,E,v,x;this.chart.polar?(n=k.plotX,q=k.plotY,e=g[l-1],u=g[l+1],this.connectEnds&&(e||(e=g[g.length-2]),u||(u=g[1])),e&&u&&(t=e.plotX,
E=e.plotY,g=u.plotX,v=u.plotY,t=(1.5*n+t)/2.5,E=(1.5*q+E)/2.5,u=(1.5*n+g)/2.5,x=(1.5*q+v)/2.5,g=Math.sqrt(Math.pow(t-n,2)+Math.pow(E-q,2)),v=Math.sqrt(Math.pow(u-n,2)+Math.pow(x-q,2)),t=Math.atan2(E-q,t-n),E=Math.atan2(x-q,u-n),x=Math.PI/2+(t+E)/2,Math.abs(t-x)>Math.PI/2&&(x-=Math.PI),t=n+Math.cos(x)*g,E=q+Math.sin(x)*g,u=n+Math.cos(Math.PI+x)*v,x=q+Math.sin(Math.PI+x)*v,k.rightContX=u,k.rightContY=x),l?(k=["C",e.rightContX||e.plotX,e.rightContY||e.plotY,t||n,E||q,n,q],e.rightContX=e.rightContY=null):
k=["M",n,q]):k=e.call(this,g,k,l);return k});u(fa,"translate",function(e){e.call(this);if(this.chart.polar&&!this.preventPostTranslate){e=this.points;for(var g=e.length;g--;)this.toXY(e[g])}});u(fa,"getSegmentPath",function(e,g){var k=this.points;this.chart.polar&&!1!==this.options.connectEnds&&g[g.length-1]===k[k.length-1]&&null!==k[0].y&&(this.connectEnds=!0,g=[].concat(g,[k[0]]));return e.call(this,g)});u(fa,"animate",l);u(ga,"animate",l);u(fa,"setTooltipPoints",function(e,g){this.chart.polar&&
M(this.xAxis,{tooltipLen:360});return e.call(this,g)});u(ga,"translate",function(e){var g=this.xAxis,k=this.yAxis.len,l=g.center,n=g.startAngleRad,q=this.chart.renderer,u,t;this.preventPostTranslate=!0;e.call(this);if(g.isRadial)for(g=this.points,t=g.length;t--;)u=g[t],e=u.barX+n,u.shapeType="path",u.shapeArgs={d:q.symbols.arc(l[0],l[1],k-u.plotY,null,{start:e,end:e+u.pointWidth,innerR:k-A(u.yBottom,k)})},this.toXY(u)});u(ga,"alignDataLabel",function(e,g,k,l,n,q){this.chart.polar?(e=180*(g.rectPlotX/
Math.PI),null===l.align&&(l.align=20<e&&160>e?"left":200<e&&340>e?"right":"center"),null===l.verticalAlign&&(l.verticalAlign=45>e||315<e?"bottom":135<e&&225>e?"top":"middle"),fa.alignDataLabel.call(this,g,k,l,n,q)):e.call(this,g,k,l,n,q)});u(n,"getIndex",function(e,g){var k,l=this.chart,n;l.polar?(n=l.xAxis[0].center,k=g.chartX-n[0]-l.plotLeft,l=g.chartY-n[1]-l.plotTop,k=180-Math.round(180*(Math.atan2(k,l)/Math.PI))):k=e.call(this,g);return k});u(n,"getCoordinates",function(e,g){var l=this.chart,
n={xAxis:[],yAxis:[]};l.polar?k(l.axes,function(e){var k=e.isXAxis,q=e.center,r=g.chartX-q[0]-l.plotLeft,q=g.chartY-q[1]-l.plotTop;n[k?"xAxis":"yAxis"].push({axis:e,value:e.translate(k?Math.PI-Math.atan2(r,q):Math.sqrt(Math.pow(r,2)+Math.pow(q,2)),!0)})}):n=e.call(this,g);return n})})(Highcharts);(function(g){var v=g.Chart,y=g.addEvent,B=g.removeEvent,l=g.createElement,q=g.discardElement,e=g.css,k=g.merge,M=g.each,D=g.extend,t=Math.max,A=document,P=window,n=g.isTouchDevice,x=g.Renderer.prototype.symbols,Q=g.getOptions(),R;D(Q.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});Q.navigation={menuStyle:{border:"1px solid #A0A0A0",
background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:n?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};Q.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{symbol:"menu",
_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};g.post=function(e,g){var k,n;n=l("form",{method:"post",action:e,enctype:"multipart/form-data"},
{display:"none"},A.body);for(k in g)l("input",{type:"hidden",name:k,value:g[k]},null,n);n.submit();q(n)};D(v.prototype,{getSVG:function(e){var n=this,t,x,v,y,B=k(n.options,e);A.createElementNS||(A.createElementNS=function(e,g){return A.createElement(g)});e=l("div",null,{position:"absolute",top:"-9999em",width:n.chartWidth+"px",height:n.chartHeight+"px"},A.body);x=n.renderTo.style.width;y=n.renderTo.style.height;x=B.exporting.sourceWidth||B.chart.width||/px$/.test(x)&&parseInt(x,10)||600;y=B.exporting.sourceHeight||
B.chart.height||/px$/.test(y)&&parseInt(y,10)||400;D(B.chart,{animation:!1,renderTo:e,forExport:!0,width:x,height:y});B.exporting.enabled=!1;B.series=[];M(n.series,function(e){v=k(e.options,{animation:!1,showCheckbox:!1,visible:e.visible});v.isInternal||B.series.push(v)});t=new g.Chart(B,n.callback);M(["xAxis","yAxis"],function(e){M(n[e],function(g,k){var l=t[e][k],n=g.getExtremes(),q=n.userMin,n=n.userMax;l&&(void 0!==q||void 0!==n)&&l.setExtremes(q,n,!0,!1)})});x=t.container.innerHTML;B=null;t.destroy();
q(e);x=x.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,
'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(e){return e.toLowerCase()});return x=x.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},exportChart:function(e,l){e=e||{};var n=this.options.exporting,n=this.getSVG(k({chart:{borderRadius:0}},n.chartOptions,l,{exporting:{sourceWidth:e.sourceWidth||n.sourceWidth,sourceHeight:e.sourceHeight||
n.sourceHeight}}));e=k(this.options.exporting,e);g.post(e.url,{filename:e.filename||"chart",type:e.type,width:e.width||0,scale:e.scale||2,svg:n})},print:function(){var e=this,g=e.container,k=[],l=g.parentNode,n=A.body,q=n.childNodes;e.isPrinting||(e.isPrinting=!0,M(q,function(e,g){1===e.nodeType&&(k[g]=e.style.display,e.style.display="none")}),n.appendChild(g),P.focus(),P.print(),setTimeout(function(){l.appendChild(g);M(q,function(e,g){1===e.nodeType&&(e.style.display=k[g])});e.isPrinting=!1},1E3))},
contextMenu:function(g,k,n,q,x,v,A){var B=this,E=B.options.navigation,F=E.menuItemStyle,da=B.chartWidth,Q=B.chartHeight,P="cache-"+g,R=B[P],r=t(x,v),w,s,H;R||(B[P]=R=l("div",{className:"highcharts-"+g},{position:"absolute",zIndex:1E3,padding:r+"px"},B.container),w=l("div",null,D({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},E.menuStyle),R),s=function(){e(R,{display:"none"});A&&A.setState(0);B.openMenu=!1},y(R,"mouseleave",function(){H=setTimeout(s,
500)}),y(R,"mouseenter",function(){clearTimeout(H)}),M(k,function(g){if(g){var k=g.separator?l("hr",null,null,w):l("div",{onmouseover:function(){e(this,E.menuItemHoverStyle)},onmouseout:function(){e(this,F)},onclick:function(){s();g.onclick.apply(B,arguments)},innerHTML:g.text||B.options.lang[g.textKey]},D({cursor:"pointer"},F),w);B.exportDivElements.push(k)}}),B.exportDivElements.push(w,R),B.exportMenuWidth=R.offsetWidth,B.exportMenuHeight=R.offsetHeight);g={display:"block"};n+B.exportMenuWidth>
da?g.right=da-n-x-r+"px":g.left=n-r+"px";q+v+B.exportMenuHeight>Q&&"top"!==A.alignOptions.verticalAlign?g.bottom=Q-q-r+"px":g.top=q+v-r+"px";e(R,g);B.openMenu=!0},addButton:function(e){var l=this,n=l.renderer;e=k(l.options.navigation.buttonOptions,e);var q=e.onclick,t=e.menuItems,x,v,A={stroke:e.symbolStroke,fill:e.symbolFill},E=e.symbolSize||12;l.btnCount||(l.btnCount=0);l.btnCount++;l.exportDivElements||(l.exportDivElements=[],l.exportSVGElements=[]);if(!1!==e.enabled){var F=e.theme,y=F.states,
B=y&&y.hover,y=y&&y.select,M;delete F.states;q?M=function(){q.apply(l,arguments)}:t&&(M=function(){l.contextMenu("contextmenu",t,v.translateX,v.translateY,v.width,v.height,v);v.setState(2)});e.text&&e.symbol?F.paddingLeft=g.pick(F.paddingLeft,25):e.text||D(F,{width:e.width,height:e.height,padding:0});v=n.button(e.text,0,0,M,F,B,y).attr({title:l.options.lang[e._titleKey],"stroke-linecap":"round"});e.symbol&&(x=n.symbol(e.symbol,e.symbolX-E/2,e.symbolY-E/2,E,E).attr(D(A,{"stroke-width":e.symbolStrokeWidth||
1,zIndex:1})).add(v));v.add().align(D(e,{width:v.width,x:g.pick(e.x,R)}),!0,"spacingBox");R+=(v.width+e.buttonSpacing)*("right"===e.align?-1:1);l.exportSVGElements.push(v,x)}},destroyExport:function(e){e=e.target;var g,k;for(g=0;g<e.exportSVGElements.length;g++)if(k=e.exportSVGElements[g])k.onclick=k.ontouchstart=null,e.exportSVGElements[g]=k.destroy();for(g=0;g<e.exportDivElements.length;g++)k=e.exportDivElements[g],B(k,"mouseleave"),e.exportDivElements[g]=k.onmouseout=k.onmouseover=k.ontouchstart=
k.onclick=null,q(k)}});x.menu=function(e,g,k,l){return["M",e,g+2.5,"L",e+k,g+2.5,"M",e,g+l/2+0.5,"L",e+k,g+l/2+0.5,"M",e,g+l-1.5,"L",e+k,g+l-1.5]};v.prototype.callbacks.push(function(e){var g,k=e.options.exporting,l=k.buttons;R=0;if(!1!==k.enabled){for(g in l)e.addButton(l[g]);y(e,"destroy",e.destroyExport)}})})(Highcharts);(function(g){function v(e,g){(y(e,g)?l:B)(e,g)}var y,B,l;"classList"in document.documentElement?(y=function(e,g){return e.classList.contains(g)},B=function(e,g){e.classList.add(g)},l=function(e,g){e.classList.remove(g)}):(y=function(e,g){return RegExp("(^|\\s+)"+g+"(\\s+|$)").test(e.className)},B=function(e,g){y(e,g)||(e.className=e.className+" "+g)},l=function(e,g){e.className=e.className.replace(RegExp("(^|\\s+)"+g+"(\\s+|$)")," ")});var q={hasClass:y,addClass:B,removeClass:l,toggleClass:v,has:y,
add:B,remove:l,toggle:v};"function"==typeof define&&define.amd?define(q):g.classie=q})(window);
(function(g){var v=document.documentElement,y=function(){};v.addEventListener?y=function(g,q,e){g.addEventListener(q,e,!1)}:v.attachEvent&&(y=function(l,q,e){l[q+e]=e.handleEvent?function(){var k=g.event;k.target=k.target||k.srcElement;e.handleEvent.call(e,k)}:function(){var k=g.event;k.target=k.target||k.srcElement;e.call(l,k)};l.attachEvent("on"+q,l[q+e])});var B=function(){};v.removeEventListener?B=function(g,q,e){g.removeEventListener(q,e,!1)}:v.detachEvent&&(B=function(g,q,e){g.detachEvent("on"+
q,g[q+e]);try{delete g[q+e]}catch(k){g[q+e]=void 0}});v={bind:y,unbind:B};"function"==typeof define&&define.amd?define(v):g.eventie=v})(this);
(function(){function g(){}function v(g,q){for(var e=g.length;e--;)if(g[e].listener===q)return e;return-1}function y(g){return function(){return this[g].apply(this,arguments)}}var B=g.prototype;B.getListeners=function(g){var q,e,k=this._getEvents();if("object"==typeof g)for(e in q={},k)k.hasOwnProperty(e)&&g.test(e)&&(q[e]=k[e]);else q=k[g]||(k[g]=[]);return q};B.flattenListeners=function(g){var q,e=[];for(q=0;g.length>q;q+=1)e.push(g[q].listener);return e};B.getListenersAsObject=function(g){var q,
e=this.getListeners(g);return e instanceof Array&&(q={},q[g]=e),q||e};B.addListener=function(g,q){var e,k=this.getListenersAsObject(g),y="object"==typeof q;for(e in k)k.hasOwnProperty(e)&&-1===v(k[e],q)&&k[e].push(y?q:{listener:q,once:!1});return this};B.on=y("addListener");B.addOnceListener=function(g,q){return this.addListener(g,{listener:q,once:!0})};B.once=y("addOnceListener");B.defineEvent=function(g){return this.getListeners(g),this};B.defineEvents=function(g){for(var q=0;g.length>q;q+=1)this.defineEvent(g[q]);
return this};B.removeListener=function(g,q){var e,k,y=this.getListenersAsObject(g);for(k in y)y.hasOwnProperty(k)&&(e=v(y[k],q),-1!==e&&y[k].splice(e,1));return this};B.off=y("removeListener");B.addListeners=function(g,q){return this.manipulateListeners(!1,g,q)};B.removeListeners=function(g,q){return this.manipulateListeners(!0,g,q)};B.manipulateListeners=function(g,q,e){var k,v,y=g?this.removeListener:this.addListener;g=g?this.removeListeners:this.addListeners;if("object"!=typeof q||q instanceof
RegExp)for(k=e.length;k--;)y.call(this,q,e[k]);else for(k in q)q.hasOwnProperty(k)&&(v=q[k])&&("function"==typeof v?y.call(this,k,v):g.call(this,k,v));return this};B.removeEvent=function(g){var q,e=typeof g,k=this._getEvents();if("string"===e)delete k[g];else if("object"===e)for(q in k)k.hasOwnProperty(q)&&g.test(q)&&delete k[q];else delete this._events;return this};B.removeAllListeners=y("removeEvent");B.emitEvent=function(g,q){var e,k,v,y,t=this.getListenersAsObject(g);for(v in t)if(t.hasOwnProperty(v))for(k=
t[v].length;k--;)e=t[v][k],!0===e.once&&this.removeListener(g,e.listener),y=e.listener.apply(this,q||[]),y===this._getOnceReturnValue()&&this.removeListener(g,e.listener);return this};B.trigger=y("emitEvent");B.emit=function(g){var q=Array.prototype.slice.call(arguments,1);return this.emitEvent(g,q)};B.setOnceReturnValue=function(g){return this._onceReturnValue=g,this};B._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0};B._getEvents=function(){return this._events||
(this._events={})};"function"==typeof define&&define.amd?define(function(){return g}):"object"==typeof module&&module.exports?module.exports=g:this.EventEmitter=g}).call(this);
(function(g){function v(g){if(g){if("string"==typeof B[g])return g;g=g.charAt(0).toUpperCase()+g.slice(1);for(var q,e=0,k=y.length;k>e;e++)if(q=y[e]+g,"string"==typeof B[q])return q}}var y=["Webkit","Moz","ms","Ms","O"],B=document.documentElement.style;"function"==typeof define&&define.amd?define(function(){return v}):g.getStyleProperty=v})(window);
(function(g){function v(e){var g=parseFloat(e);return-1===e.indexOf("%")&&!isNaN(g)&&g}function y(e){var g,y=e("boxSizing");return function(){if(y){var e=document.createElement("div");e.style.width="200px";e.style.padding="1px 2px 3px 4px";e.style.borderStyle="solid";e.style.borderWidth="1px 2px 3px 4px";e.style[y]="border-box";var q=document.body||document.documentElement;q.appendChild(e);var A=l(e);g=200===v(A.width);q.removeChild(e)}}(),function(e){if("string"==typeof e&&(e=document.querySelector(e)),
e&&"object"==typeof e&&e.nodeType){var t=l(e);if("none"===t.display){var A={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},t=0;for(e=q.length;e>t;t++)A[q[t]]=0;return A}A={};A.width=e.offsetWidth;A.height=e.offsetHeight;e=A.isBorderBox=!(!y||!t[y]||"border-box"!==t[y]);for(var B=0,n=q.length;n>B;B++){var x=q[B],Q=parseFloat(t[x]);A[x]=isNaN(Q)?0:Q}var B=A.paddingLeft+A.paddingRight,n=A.paddingTop+A.paddingBottom,x=A.marginLeft+A.marginRight,Q=A.marginTop+A.marginBottom,R=
A.borderLeftWidth+A.borderRightWidth,u=A.borderTopWidth+A.borderBottomWidth;e=e&&g;var S=v(t.width);!1!==S&&(A.width=S+(e?0:B+R));t=v(t.height);return!1!==t&&(A.height=t+(e?0:n+u)),A.innerWidth=A.width-(B+R),A.innerHeight=A.height-(n+u),A.outerWidth=A.width+x,A.outerHeight=A.height+Q,A}}}var B=document.defaultView,l=B&&B.getComputedStyle?function(e){return B.getComputedStyle(e,null)}:function(e){return e.currentStyle},q="paddingLeft paddingRight paddingTop paddingBottom marginLeft marginRight marginTop marginBottom borderLeftWidth borderRightWidth borderTopWidth borderBottomWidth".split(" ");
"function"==typeof define&&define.amd?define(["get-style-property/get-style-property"],y):g.getSize=y(g.getStyleProperty)})(window);
(function(g){function v(e,g){for(var k in g)e[k]=g[k];return e}function y(){}function B(e,l,n,t,B){function D(e,g){this.element=e;this.options=v({},this.options);v(this.options,g);this._create()}function P(){return!1}function ga(e,g){e.x=void 0!==g.pageX?g.pageX:g.clientX;e.y=void 0!==g.pageY?g.pageY:g.clientY}var V=t("transform");t=!!t("perspective");v(D.prototype,l.prototype);D.prototype.options={};D.prototype._create=function(){this.position={};this._getPosition();this.startPoint={x:0,y:0};this.dragPoint=
{x:0,y:0};this.startPosition=v({},this.position);var e=k(this.element);"relative"!==e.position&&"absolute"!==e.position&&(this.element.style.position="relative");this.enable();this.setHandles()};D.prototype.setHandles=function(){this.handles=this.options.handle?this.element.querySelectorAll(this.options.handle):[this.element];for(var e=0,g=this.handles.length;g>e;e++){var k=this.handles[e];n.bind(k,"mousedown",this);n.bind(k,"touchstart",this);ha(k)}};var ha="attachEvent"in q.documentElement?function(e){"IMG"===
e.nodeName&&(e.ondragstart=P);e=e.querySelectorAll("img");for(var g=0,k=e.length;k>g;g++)e[g].ondragstart=P}:y;D.prototype._getPosition=function(){var e=k(this.element),g=parseInt(e.left,10),l=parseInt(e.top,10);this.position.x=isNaN(g)?0:g;this.position.y=isNaN(l)?0:l;this._addTransformPosition(e)};D.prototype._addTransformPosition=function(e){if(V){var g=e[V];if(0===g.indexOf("matrix")){e=g.split(",");var k=0===g.indexOf("matrix3d")?12:4,g=parseInt(e[k],10);e=parseInt(e[k+1],10);this.position.x+=
g;this.position.y+=e}}};D.prototype.handleEvent=function(e){var g="on"+e.type;this[g]&&this[g](e)};D.prototype.getTouch=function(e){for(var g=0,k=e.length;k>g;g++){var l=e[g];if(l.identifier===this.pointerIdentifier)return l}};D.prototype.onmousedown=function(e){this.dragStart(e,e)};D.prototype.ontouchstart=function(e){this.isDragging||this.dragStart(e,e.changedTouches[0])};D.prototype.dragStart=function(k,l){if(this.isEnabled){k.preventDefault?k.preventDefault():k.returnValue=!1;var n="touchstart"===
k.type;this.pointerIdentifier=l.identifier;this._getPosition();this.measureContainment();ga(this.startPoint,l);this.startPosition.x=this.position.x;this.startPosition.y=this.position.y;this.setLeftTop();this.dragPoint.x=0;this.dragPoint.y=0;this._bindEvents({events:n?["touchmove","touchend","touchcancel"]:["mousemove","mouseup"],node:k.preventDefault?g:q});e.add(this.element,"is-dragging");this.isDragging=!0;this.emitEvent("dragStart",[this,k,l]);this.animate()}};D.prototype._bindEvents=function(e){for(var g=
0,k=e.events.length;k>g;g++)n.bind(e.node,e.events[g],this);this._boundEvents=e};D.prototype._unbindEvents=function(){for(var e=this._boundEvents,g=0,k=e.events.length;k>g;g++)n.unbind(e.node,e.events[g],this);delete this._boundEvents};D.prototype.measureContainment=function(){var e=this.options.containment;if(e){this.size=B(this.element);var g=this.element.getBoundingClientRect(),e=M(e)?e:"string"==typeof e?q.querySelector(e):this.element.parentNode;this.containerSize=B(e);e=e.getBoundingClientRect();
this.relativeStartPosition={x:g.left-e.left,y:g.top-e.top}}};D.prototype.onmousemove=function(e){this.dragMove(e,e)};D.prototype.ontouchmove=function(e){var g=this.getTouch(e.changedTouches);g&&this.dragMove(e,g)};D.prototype.dragMove=function(e,g){if(ga(this.dragPoint,g),this.dragPoint.x-=this.startPoint.x,this.dragPoint.y-=this.startPoint.y,this.options.containment){var k=this.relativeStartPosition.x,l=this.relativeStartPosition.y;this.dragPoint.x=Math.max(this.dragPoint.x,-k);this.dragPoint.y=
Math.max(this.dragPoint.y,-l);this.dragPoint.x=Math.min(this.dragPoint.x,this.containerSize.width-k-this.size.width);this.dragPoint.y=Math.min(this.dragPoint.y,this.containerSize.height-l-this.size.height)}this.position.x=this.startPosition.x+this.dragPoint.x;this.position.y=this.startPosition.y+this.dragPoint.y;this.emitEvent("dragMove",[this,e,g])};D.prototype.onmouseup=function(e){this.dragEnd(e,e)};D.prototype.ontouchend=function(e){var g=this.getTouch(e.changedTouches);g&&this.dragEnd(e,g)};
D.prototype.dragEnd=function(g,k){this.isDragging=!1;delete this.pointerIdentifier;V&&(this.element.style[V]="",this.setLeftTop());this._unbindEvents();e.remove(this.element,"is-dragging");this.emitEvent("dragEnd",[this,g,k])};D.prototype.ontouchcancel=function(e){var g=this.getTouch(e.changedTouches);this.dragEnd(e,g)};D.prototype.animate=function(){if(this.isDragging){this.positionDrag();var e=this;A(function(){e.animate()})}};var T=t?function(e,g){return"translate3d( "+e+"px, "+g+"px, 0)"}:function(e,
g){return"translate( "+e+"px, "+g+"px)"};return D.prototype.setLeftTop=function(){this.element.style.left=this.position.x+"px";this.element.style.top=this.position.y+"px"},D.prototype.positionDrag=V?function(){this.element.style[V]=T(this.dragPoint.x,this.dragPoint.y)}:D.prototype.setLeftTop,D.prototype.enable=function(){this.isEnabled=!0},D.prototype.disable=function(){this.isEnabled=!1;this.isDragging&&this.dragEnd()},D}for(var l,q=g.document,e=q.defaultView,k=e&&e.getComputedStyle?function(g){return e.getComputedStyle(g,
null)}:function(e){return e.currentStyle},M="object"==typeof HTMLElement?function(e){return e instanceof HTMLElement}:function(e){return e&&"object"==typeof e&&1===e.nodeType&&"string"==typeof e.nodeName},D=0,t=["webkit","moz","ms","o"],A=g.requestAnimationFrame,P=g.cancelAnimationFrame,n=0;t.length>n&&(!A||!P);n++)l=t[n],A=A||g[l+"RequestAnimationFrame"],P=P||g[l+"CancelAnimationFrame"]||g[l+"CancelRequestAnimationFrame"];A&&P||(A=function(e){var k=(new Date).getTime(),l=Math.max(0,16-(k-D)),n=g.setTimeout(function(){e(k+
l)},l);return D=k+l,n},P=function(e){g.clearTimeout(e)});"function"==typeof define&&define.amd?define(["classie/classie","eventEmitter/EventEmitter","eventie/eventie","get-style-property/get-style-property","get-size/get-size"],B):g.Draggabilly=B(g.classie,g.EventEmitter,g.eventie,g.getStyleProperty,g.getSize)})(window);(function(g){g.fn.oxmenu=function(e){var k="string"!==typeof e?g.extend(!0,{},g.fn.oxmenu.defaults,e||{}):g.fn.oxmenu.defaults,q=arguments;g(document).bind("mouseover.oxmenu",function(e){e=g(e.target);e.is(k.cssMenuWrapper)||0!=e.parents(k.cssMenuWrapper).length||B.hideAllMenus()});return this.each(function(){var v=g(this),t=v.data("oxmenu");t?t[e]?t[e].apply(t,Array.prototype.slice.call(q,1)):"object"!==typeof e&&e?console.log("Method "+e+" does not exist in jQuery.fn.oxmenu"):t._update.apply(t,
q):v.data("oxmenu",new l(v,k))})};g.fn.oxmenu.defaults={showSpeed:200,showDelay:300,hideDelay:400,subMenuIdPrefix:"xdataListMore",clHoverIn:"data_list_item_hover",clSubMenuOn:"data_list_more_on",cssSubMenu:".data_list_more",cssMenuItem:".data_list_item",cssMenuItemHasChildren:".data_list_item2",cssMenuWrapper:".xdata_wrap",triggerEvent:"mouseenter",menuHeight:39,onShowing:function(e,g){}};var v=g(window),y=v.height();v.bind("resize.oxmenu",function(e){y=v.height()});var B={rootCache:[],hideAllTimer:null,
curRootMenu:null,hideAllMenus:function(e){B.stopHideAllMenus();B.hideAllTimer=setTimeout(function(){for(var e=B.rootCache.length-1;0<=e;e--)B.rootCache[e].hideSubMenus()},e||g.fn.oxmenu.defaults.hideDelay)},stopHideAllMenus:function(){clearTimeout(B.hideAllTimer)},assertSingleton:function(e){B.curRootMenu&&B.curRootMenu.resetAll();B.curRootMenu=e},show:function(e){if(e){var g=this.$trigger;e.stop(!0,!0).show(this.opts.showSpeed);e.addClass(this.opts.clSubMenuOn);e.data("oxmenutrigger",this);g.data("oxmenusublist",
e);this.isShowed=!0;e.bind("mouseleave.oxmenu",function(e){}).bind("mouseover.oxmenu",function(e){B.stopHideAllMenus()})}},hide:function(e){e&&(this.$trigger.removeClass(this.opts.clHoverIn),e.stop(!0,!0).hide(this.opts.showSpeed),e.removeClass(this.opts.clSubMenuOn),e.unbind(".oxmenu"),this.isShowed=!1)},onHoverOut:function(){this.resetTimer();var e=this,g=this.$trigger,l=g.data("oxmenusublist");l&&e.isShowed?this.hideTimer=setTimeout(function(){e.hide(l)},this.opts.hideDelay):g.removeClass(e.opts.clHoverIn)},
resetTimer:function(){clearTimeout(this.hideTimer);clearTimeout(this.showTimer)}},l=function(e,k){this.$trigger=e;this.id=e[0].getAttribute("data-oxmenuid")||e[0].id||(new Date).getTime();this.opts=k;this.$wrap=g(k.cssMenuWrapper);this.hideTimer=this.showTimer=null;this.isDomReady=this.isShowed=!1;this.subMenuWithChildren=[];this._init()};l.prototype={_init:function(){var e=this;this.$trigger.bind(this.opts.triggerEvent+".oxmenu",function(g){e.onHoverIn();return!1}).bind("mouseleave.oxmenu",function(g){e.onHoverOut();
return!1});v.bind("resize.oxmenu-modelA,oxmenuPositionNeedUpdating",function(g){e.updatePosition()})},_initSubMenus:function(e){this.$sub=e;this.isDomReady=!0;B.rootCache.push(this);this.updatePosition();this.$subMenuWithChildren=e.find(this.opts.cssMenuItemHasChildren);e=this.$subMenuWithChildren.length;for(var g=0;g<e;g++)this.subMenuWithChildren.push(new q(this.$subMenuWithChildren.eq(g),this.opts))},hideSubMenus:function(){for(var e=this.subMenuWithChildren.length,g=0;g<e;g++)this.subMenuWithChildren[g].onHoverOut();
this.onHoverOut()},updatePosition:function(e){if(this.isDomReady){e=e||0;var g=this.$trigger.offset();this.$sub.css({bottom:y-g.top-this.opts.menuHeight+e})}},onShowing:function(e,g){var l=this;null===g?l.show(e):l.showTimer=setTimeout(function(){l.show(e)},l.opts.showDelay)},onHoverIn:function(){clearTimeout(this.showTimer);B.assertSingleton(this);this.$trigger.addClass(this.opts.clHoverIn);if(this.isDomReady)this.onShowing(this.$sub);else{var e=this;$me=this.$trigger;$sub=g("#"+this.opts.subMenuIdPrefix+
e.id);offs=$me.offset();0<$sub.length?(e._initSubMenus($sub),e.onShowing($sub)):e.opts.onShowing.call(e,e.id,function(k){e.$wrap.append(k);$sub=g("#"+e.opts.subMenuIdPrefix+e.id);0!==$sub.length&&(e._initSubMenus($sub),e.onShowing($sub))})}},resetAll:function(){this.resetTimer();this.hideSubMenus();this.$trigger.removeClass(this.opts.clHoverIn)}};g.extend(l.prototype,B);var q=function(e,g){this.$trigger=e;this.opts=g;this.hideTimer=this.showTimer=null;this.isShowed=!1;this._init()};q.prototype={_init:function(){var e=
this;this.$trigger.bind(this.opts.triggerEvent+".oxmenu",function(g){e.onHoverIn();return!1}).bind("mouseleave.oxmenu",function(g){e.onHoverOut();return!1})},onHoverIn:function(){clearTimeout(this.showTimer);this.$trigger.addClass(this.opts.clHoverIn);var e=this,g=this.$trigger,l=g.find(e.opts.cssSubMenu);0!==l.length&&(l=l.eq(0),(g=g.parents(e.opts.cssSubMenu).eq(0).data("oxmenutrigger"))&&g.resetTimer(),this.showTimer=setTimeout(function(){e.show(l)},this.opts.showDelay))}};g.extend(q.prototype,
B)})(jQuery);var J=function(g){return function(v){var y=typeof v;if("undefined"===y)return J;if("string"===y)return J[v];"function"===y&&(y={_:{}},v.call(J,g,y._,y),y.id?J[y.id]?alert('A J module with id "'+y.id+'" exists!'):J[y.id]=y:alert("A J module require a public id property!"))}}(jQuery);
(function(g){var v={},y={};v.onLoaded=function(){for(var g in J)"init"!==g&&"onLoad"!==g&&(g=J[g],v.isFunc(g._onLoad)&&(g._onLoad.call(g),delete g._onLoad),g._&&(v.loadSub(g._),delete g._))};v.initEvents=function(l){g(document).ready(v.onLoaded)};v.isFunc=function(g){return g&&"function"===typeof g};v.initSub=function(g){for(var q in g)if(q=g[q]){v.isFunc(q._init)&&(q._init.call(q),delete q._init);for(var e in q)(e=q[e])&&v.isFunc(e._init)&&(e._init.call(e),delete e._init)}};v.loadSub=function(g){for(var q in g)if(q=
g[q]){v.isFunc(q._onLoad)&&(q._onLoad.call(q),delete q._onLoad);for(var e in q)(e=q[e])&&v.isFunc(e._onLoad)&&(e._onLoad.call(e),delete e._onLoad)}};y.init=function(l){J.opts=v.opts=g.extend(l||{},J.opts||{});for(var q in J)"init"!==q&&"onLoad"!==q&&(q=J[q],v.isFunc(q._init)&&(q._init.call(q),delete q._init),q._&&v.initSub(q._));v.initEvents()};y.onLoad=v.onLoaded;for(var B in y)B&&(J[B]=y[B])})(window.jQuery);(function(g){g.fn.onTransitioned=function(v){return this.each(function(){!1===v?g(this).unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"):g(this).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",v)})}})(jQuery);
J.heredoc = function(fn){return (fn.toString().split('\n').slice(1,-1).join('\n') + '\n');};
J.log = function(obj){(window['console']||{log:function(x){alert(x);}}).log(obj);};
J.toHtml = function(tpl,obj,ext){tpl = Hogan.compile(tpl);return (tpl.render(obj,ext));};
J.$win = $(window);
J.$body=$('body');
/* E J */
Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

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
        pub.bizInfo={
            uid:uid,
            wsid:wsid,
            pid:pid,
            areaid:areaid
        };
        isParamsReady=true;
    }catch(e){
        J.log('获取统计参数失败！'+e.toString());
    };
    var clickStreamData = function(_type,_params,_cbk){
        if (!isParamsReady) {
            _cbk('获取统计参数失败！');
            return null;
        };
        var jqXHR=$.ajax({
            type: "POST",
            url: 'http://statistic.yixun.com/json.php?mod=stat&act='+_type,
            data: _params,
            dataType: 'json'
        }).fail(function(jqXHR,txtStatus,err){
            _cbk(_type+':'+err);
        }).done(function(data,txtStatus,jqXHR){
            _cbk(null,data);
        });
        return jqXHR;
    };
    //获取日期数据
    pub.getDateTimeStr=function(dObj,cfg){
        cfg=cfg||{};
        cfg.len=cfg.len||19;
        cfg.dayDiff=cfg.dayDiff||0;
        if(cfg.dayDiff!==0){
            dObj.setDate(dObj.getDate()+cfg.dayDiff);
        };
        var o =[dObj.getFullYear()+'-',(dObj.getMonth()+1)],
        format = function(i){
            return (i<10?('0'+i):i);
        };
        o[1]=format(o[1])+'-';
        o.push(format(dObj.getDate()));

        if(cfg.ignoreHMS){
            o.push(" 00:00:00");
        }else{
            o.push(' ');
            tempObj = dObj.getHours();
            o.push(format(dObj.getHours())+':');
            o.push(format(dObj.getMinutes())+':');
            o.push(format(dObj.getSeconds()));
        }

        return o.join('').substr(0,cfg.len);

    };
    //获取主数据
    pub.getKeyData = function(_params,cbk){
        _params = $.extend({},{
            uid:uid, 
            start_date:pub.getDateTimeStr(today,{ignoreHMS:true}), 
            end_date:pub.getDateTimeStr(today), 
            date_type:"today", 
            page_id:pid, 
            warehouse_id:wsid, 
            areasInfo:areaid
        },_params||{});
        return clickStreamData('PageKeyData',_params,cbk);
    };
    //获取点击数据
    pub.getClickData = function(_params,cbk){
        _params = $.extend({},{
            uid:uid, 
            start_date:pub.getDateTimeStr(today,{ignoreHMS:true}), 
            end_date:pub.getDateTimeStr(today), 
            date_type:"today", 
            page_id:pid, 
            warehouse_id:wsid, 
            areasInfo:areaid
        },_params||{});
        return clickStreamData('PageClickData',_params,cbk);
    };
    //根据css选择器获取该选择器下ytag的数据
    pub.getClickDataBySelector = function(cssSelector){
        var ids = [];
        $(cssSelector).find('[ytag]').each(function(i,o){
            ids.push(o.getAttribute('ytag'));
        });
        return pub.getClickDataByIds(ids);
    };
    //根据id获取多个ytag的点击数据
    pub.getClickDataByIds = function(ids){
        var len =0,
            obj = null,
            clickData = pub['CurrentClickData'].data,
            items=[];
        if( (len=ids.length)==0){
            return items;
        };
        for(var i=0;i<len;i++){
            for(var c in clickData){
                obj = clickData[c];
                if(obj.page_tag===ids[i]){
                    items.push(obj);
                    break;
                }
            };
        };//for
        return items;
    };
    //获取单个ytag的点击数据
    pub.getClickDataById = function(id){
        var obj = null;
        for(var c in pub['CurrentClickData'].data){
            obj = pub['CurrentClickData'].data[c];
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
            start_date:pub.getDateTimeStr(today,{ignoreHMS:true}), 
            end_date:pub.getDateTimeStr(today), 
            date_type:"today", 
            page_id:pid, 
            warehouse_id:wsid, 
            areasInfo:areaid,
            page_tag_ids:"-1"
        },_params||{});
        return clickStreamData('DragClickData',_params,cbk);
    };
    pub.getItemDimension = function($o){
        if($o.length===0){
            return null;
        }
        var $parent = $o.parent(),
            off = $o.offset()||{top:0,left:0},
            data = {
                left:off.left,
                top:off.top,
                width:$o.outerWidth(),
                height:$o.outerHeight(),
                parentWidth:$parent.outerWidth(),
                parentHeight:$parent.outerHeight()
            };
        return data;
    };
    /**
     * 获取主数据和点击数据
     * @params {Object} _params 为null时表示是第一次数据加载
     * @params {Function} cbk 回调函数
     */
    pub.getKeyAndClickData = function(_params,cbk){
        //获取当天主数据和点击数据
        pub['jqXHRKeyData']=pub.getKeyData(_params,function(err,data){
            pub["CurrentKeyData"] = data;
            pub['jqXHRKeyData'] = null;
            if(_params===null){
                J.$win.trigger(pub.EVT.InitKeyData,[err,data]);
            }
            if(err){
                cbk&&cbk(err);
                return;
            }
            pub['jqXHRClickData']=pub.getClickData(_params,function(err1,data1){
                pub['CurrentClickData']=data1;
                pub['jqXHRClickData']=null;
                if(_params===null){
                    J.$win.trigger(pub.EVT.InitClickData,[err1,data1]);
                }else{
                    J.$win.trigger(pub.EVT.ClickDataChange,[err1,data1]);
                }
                if(err1){
                    cbk&&cbk(err1);
                    return;
                }
                cbk&&cbk(null,data,data1);
            });
        });
    };
    /**
     * 获取预配置的tag信息
     */
    pub.getDefaultCTags = function(cbk){
        var xhr = $.getScript('http://oxox.io/assets/js/xdemo.yixun.xdata.ctags.js?t'+(new Date()).getTime());
        xhr.done(function(script, textStatus, jqxhr){
            cbk(null,(window['xdataCTags']||{})[pub.bizInfo.pid]);
        }).fail(function(jqxhr, cfgs, err){
            cbk(err);
        });
    };
    /**
     * 获取指定编号的预设tag
     */
    pub.getDefaultCTagById = function(id){
        var pageCTags = (pub.defaultCTags||[]),
            len = pageCTags.length,
            obj = null;
        for(var i =0 ;i<len;i++){
            if(pageCTags[i].id===id){
                obj = pageCTags[i];
                break;
            }
        };
        return obj;
    };
    pub.getAllCTags = function(cbk){
        var items = pub.getCTags()||[];
        if(!pub.defaultCTags){
            J.data.getDefaultCTags(function(err,d){
                if(err){
                    console.log('预设模块读取出错：',err);
                    cbk(items);
                    return;
                };
                pub.defaultCTags = d||[];
                items = items.concat(pub.defaultCTags);
                cbk(items);
            });
            return;
        };
        items = items.concat(pub.defaultCTags);
        cbk(items);
    };
    /**
     * 获取自定义tag信息
     */
    pub.getCTags = function(rawForm){
        rawForm=rawForm||false;
        var key = 'xdata_ctags_'+pub.bizInfo.pid,
            rawData = localStorage[key];
        if(!rawData){
            return null;
        };
        rawData = JSON.parse(rawData);
        if (rawForm) {
            return rawData;
        };
        var tags = [];
        for(var c in rawData){
            tags.push(rawData[c]);
        };
        return tags;
    };
    /**
     * 获取自定义tag数据
     * @params {String} id tag编号
     */
    pub.getCTag = function(id){
        var d = pub.getCTags(true)||{};
        d = d[id]||pub.getDefaultCTagById(id);
        return d;
    };
    /**
     * 保存自定义tag数据
     * @params {Object} tagData tag数据
     */
    pub.saveCTag = function(tagData){
        var d = pub.getCTags(true)||{},
            isNew = false;
        if(tagData.id==''){
            tagData.id = new Date().getTime();
        };
        if(!pub.getCTag(tagData.id)){
            isNew = true;
        };
        d[tagData.id]=tagData;
        var key = 'xdata_ctags_'+pub.bizInfo.pid;
        localStorage[key]=JSON.stringify(d);
        J.$win.trigger(pub.EVT.CTagUpdated,[(isNew?0:1),tagData]);
        return d;
    };
    /**
     * 删除自定义tag数据
     * @params {String} id tag id
     */
    pub.deleteCTag = function(id){
        var d = pub.getCTags(true);
        if(!d){
            return null;
        };
        if(!d[id]){
            return d;
        };
        delete d[id];
        var key = 'xdata_ctags_'+pub.bizInfo.pid;
        localStorage[key]=JSON.stringify(d);
        J.$win.trigger(pub.EVT.CTagUpdated,[-1,id]);
        return d;
    };
    /**
     * 停止主数据和点击数据的ajax请求
     */
    pub.abortKeyAndClickDataRequest = function(){
        var jqXHR = pub['jqXHRKeyData'];
        if(jqXHR&&jqXHR.readyState != 4){
            jqXHR.abort();
        };
        jqXHR = pub['jqXHRClickData'];
        if(jqXHR&&jqXHR.readyState != 4){
            jqXHR.abort();
        };
    };
    pub.EVT = {
        'InitKeyData':'onXDataInitKeyData',
        'InitClickData':'onXDataInitClickData',
        'ClickDataChange':'onXDataClickDataChanged',
        'CTagUpdated':'onXDataCTagUpdated'
    };
    /**
     * 初始化数据
     */
    pub.init = function(){
        pub.getKeyAndClickData(null);
    };
});
/* E 数据 */

/* S CoreUI */
J(function($,p,pub){
    pub.id='ui';
    var coreTpl = J.heredoc(function(){/*
        <div id="xdataWrap" class="xdata_wrap">
            <a id="xdataClose" href="javascript:;" class="xdata_close">+</a>
            <div id="xdataUI" class="data_ui">
                <div id="xdataUIHD" class="data_ui_hd xdata_fixed">
                    <div id="xdataTab" class="data_tab">
                        <ul id="xdataType">
                            <li><a href="javascript:;" class="on" rel="1">点击量</a></li>
                            <li><a href="javascript:;" rel="2">下单量</a></li>
                            <li><a href="javascript:;" rel="3">转化率</a></li>
                        </ul>
                    </div>
                    <div class="data_time">
                        <input class="xdata_date xdata_sdate" id="xdataKeyChartDate1" type="date"/><span class="c_tx3">-</span><input class="xdata_date xdata_edate" id="xdataKeyChartDate2" type="date" />
                        <button id="xdataRetweet1" class="data_btn">刷新</button>
                    </div>
                </div>

                <div class="data_ui_bd">
                    <div class="data_box">
                        <div class="data_box_hd">
                            <h3>页面趋势</h3>
                            <a href="javascript:;" id="xdataBtnHeatmap" class="data_btn data_btn_bg1">显示热区图</a>
                        </div>
                        <div class="data_box_bd">
                            <div id="xdataKeyCharts" class="data_total">
                                <div id="xdataKeyChartTip" class="xdata_keycharttip xdata_hidden"><div class="xdata_keycharttip_bg"></div><div class="xdata_keycharttip_bd"></div></div>
                                <div id="xdataKeyChart1" class="data_total_inner xdata_keychart xdata_visible"></div>
                                <div id="xdataKeyChart2" class="data_total_inner xdata_keychart"></div>
                                <div id="xdataKeyChart3" class="data_total_inner xdata_keychart"></div>
                            </div>
                        </div>
                    </div><!--/data_box-->
                    <div class="data_box">
                        <div class="data_box_hd">
                            <h3>模块趋势</h3>
                            <a id="xdataAddCTag" href="javascript:;" class="data_btn data_btn_bg1 xdata_btn_addmod">新增模块</a>
                            <img id="xdataLoading2" class="xdata_loading2" src="http://static.gtimg.com/icson/img/common/loading.gif"/>
                        </div>
                        <div class="data_box_bd">
                            <!--默认列表-->
                            <div id="xdataList1" class="data_list"></div>
                            <!--单个ytag排行榜-->
                            <div id="xdataList2" class="data_list data_listb xdata_hidden">
                                <div id="xdataRank1" class="xdata_rank xdata_visible"></div>
                                <div id="xdataRank2" class="xdata_rank"></div>
                                <div id="xdataRank3" class="xdata_rank"></div>
                            </div>
                            <!--/单个ytag排行榜-->
                        </div>
                    </div><!--/data_box-->
                </div>

            </div>
            <div id="xdataPop1" class="data_pop data_pop1 xdata_hidden">
                <div class="data_time">
                    <input id="xdataPop1Date1" class="xdata_date xdata_sdate1" type="date" /><span class="c_tx3">-</span><input id="xdataPop1Date2" class="xdata_date xdata_edate" type="date" />
                    <button id="xdataRetweet2" class="data_btn">刷新</button>
                </div>
                <div class="data_pop_con">
                    <div class="data_total">
                        <div id="xdataYTagChartTip" class="xdata_ytagcharttip xdata_hidden"></div>
                        <div id="xdataYTagChart" class="data_total_inner xdata_ytagchart"></div>
                    </div>
                </div>
                <a id="xdataPop1Close" href="javascript:;" class="xdata_pop_close">+</a>
            </div>
            <div id="xdataPop2" class="data_pop data_pop2 xdata_hidden">
                <div class="data_pop_add">
                    <ul>
                        <li><input id="xdataPop2Ipt1" type="text" placeholder="请输入模块名称" /></li>
                        <li><input id="xdataPop2Ipt2" type="text" value="" placeholder="请输入模块的css选择器或以|分隔的ytag"/></li>
                    </ul>
                    <div class="data_control">
                        <a id="xdataPop2Btn1" href="javascript:;" class="data_btn">更新</a>
                        <a id="xdataPop2Btn2" href="javascript:;" class="data_btn data_btn_bg1">删除</a>
                    </p>
                    <div id="xdataPop2Tip" class="xdata_pop2tip xdata_hidden"></div>
                </div>
                <a id="xdataPop2Close" href="javascript:;" class="xdata_pop_close">+</a>
            </div>
        </div>
    */});

    var EVT={
        'DataTypeChange':'onXDataTypeChange',
        'UIReady':'onXDataUIReady',
        'Collapse':'onXDataCollapse',
        'YTagChartReset':'onXDataYTagChartReset'
    };
    pub.EVT=EVT;
    //数据类型切换
    p.dataType = {
        value:"1",
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.dataType._initEvts();
            });
        },
        _initEvts:function(){
            this.$items = $('#xdataType a').bind('click',function(e){
                p.dataType.$items.removeClass('on');
                this.className='on';
                J.$win.trigger(EVT.DataTypeChange,[this.rel]);
            });
        }
    };

    //概要图表
    p.keyChart = {
        dataType:1,
        dateType:'today',
        dateRange:'',
        isLoading:false,
        hasAjaxError:false,
        $tip:null,
        cacheKeyData:{},
        cacheClickData:{},
        keyData:null,
        clickData:null,
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.keyChart.onXDataUIReady();
            }).bind(EVT.DataTypeChange,function(e,t){
                p.keyChart.dataType=(t=parseInt(t));
                p.keyChart.render(t);
            });
        },
        onXDataUIReady:function(){
            p.keyChart.render(1);
            this.$tip = $('#xdataKeyChartTip');
            this.$tipBD=this.$tip.find('.xdata_keycharttip_bd');
            //刷新按钮
            $('#xdataRetweet1').bind('click',function(e){
                if(p.keyChart.isLoading){
                    return;
                };
                p.keyChart.loadData();
            });
        },
        getChartOption:function(dataType){
            dataType = parseInt(dataType);
            var rawData = J.data['CurrentKeyData'],
                niceData = this.parseData(rawData,dataType),
                baseOpts = {
                title: {
                    text: ' '
                },
                xAxis: {
                    type: 'datetime'//datetime
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true,
                    valueSuffix: ''
                },
                legend: {
                },
                series: [{
                    name: '点击量',
                    data: niceData,
                    zIndex: 1,
                    marker: {
                        fillColor: 'white',
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[dataType-1]
                    }
                }]
            };
            rawData.total.click_num=parseInt((rawData.total.click_num+'').replace(/,/gi,''));
            rawData.total.order_num=parseInt((rawData.total.order_num+'').replace(/,/gi,''));
            rawData.total.click_trans_rate = rawData.total.click_num==0?0:(rawData.total.order_num*100/rawData.total.click_num).toFixed(2);
            switch(dataType){
                case 1:
                    baseOpts.series[0].name='点击量';
                    baseOpts.title.text = '共'+rawData.total.click_num+'次';
                break;
                case 2:
                    baseOpts.series[0].name='下单量';
                    baseOpts.title.text = '共'+rawData.total.order_num+'单';
                break;
                case 3:
                    baseOpts.series[0].name='转化率';
                    baseOpts.title.text = '平均'+rawData.total.click_trans_rate+'%';
                break;
            };//switch
            return baseOpts;
        },
        render:function(dataType,updateChart){
            if(!this.$charts){
                this.$charts=$('#xdataKeyCharts').find('.xdata_keychart');
            }
            var $chart = this.$charts.removeClass('xdata_visible').eq(dataType-1).addClass('xdata_visible'),
                chartOpts = this.getChartOption(dataType);
            if(!$chart[0].getAttribute('data-hightcharts')){
                $chart.highcharts(chartOpts);
                $chart[0].setAttribute('data-hightcharts','1');
                return;
            };
            var dateRange0 = $chart[0].getAttribute('data-xdatadaterange'),
                forceUpdate = dateRange0!==this.dateRange;
            if(!updateChart && !forceUpdate){
                return;
            };
            $chart[0].setAttribute('data-xdatadaterange',this.dateRange);
            var chart = $chart.data('xdatachart');
            if(!chart){
                chart=$chart.highcharts();
                $chart.data('xdatachart',chart)
            }
            //console.log(chartOpts);
            chart.series[0].update(chartOpts.series[0]);
            chart.setTitle(chartOpts.title);
        },
        showTip:function(txt){
            if(txt===null){
                this.$tip.addClass('xdata_hidden');
                return;
            };
            txt = txt || '<span class="xdata_loading"></span>';
            txt = txt.indexOf('<span')==0?txt:('<span class="xdata_error">'+txt+'</span>');
            this.$tipBD.html(txt);
            this.$tip.removeClass('xdata_hidden');
        },
        loadData:function(){

            if(this.isLoading){
                J.data.abortKeyAndClickDataRequest();
                this.isLoading=false;
            }

            var me = this,
                dates=[],
                tempDate = null,
                sdate = document.getElementById('xdataKeyChartDate1').value,
                edate = document.getElementById('xdataKeyChartDate2').value,
                cacheId = [me.dataType,sdate,edate].join('-');

            this.dateRange = sdate+'-'+edate;

            if(sdate==''||edate==''){
                me.showTip('开始时间和结束时间不能为空!');
                return;
            };

            sdate = new Date(sdate);
            edate = new Date(edate);
            if(sdate>edate){
                tempDate = sdate;
                sdate=edate;
                edate=tempDate;
            };
            //结束日期往后推一天
            edate.setDate(edate.getDate()+1);
            while(sdate<edate){
                dates.push(new Date(sdate.getFullYear(),sdate.getMonth(),sdate.getDate()));
                sdate.setDate(sdate.getDate()+1);
            };//while

            if(dates.length>15){
                me.showTip('统计时间范围超过15天！服务器亚历山大...');
                return;
            }

            this.showTip();
            this.isLoading=true;
            this.hasAjaxError=false;
            this.clickData=null;
            this.keyData = null;
            //从cache取数据
            if(this.cacheKeyData[cacheId]){
                this.keyData=this.cacheKeyData[cacheId];
                this.clickData = this.cacheClickData[cacheId];
                me.showTip(null);
                me.isLoading=false;
                me.render(me.dataType,true);
                return;
            }
            //从服务器取数据
            this.getDataByDates(dates,function(err,d1,d2){
                me.isLoading=false;
                if(err){
                    me.hasAjaxError=true;
                    me.showTip('服务器错误：'+err.toString());
                    return;
                }
                me.cacheKeyData[cacheId]=d1;
                me.cacheClickData[cacheId]=d2;
                me.keyData=d1;
                me.clickData = d2;
                me.showTip(null);
                me.render(me.dataType,true);
            });
        },
        parseDataByHour:function(d,dataType){
            var len = d.length,
                r =[],
                dataByHour=null,
                tempClickNum=0,
                tempOrderNum=0,
                tempDate=null,
                hour=1,
                today=new Date(),
                yy=today.getFullYear(),
                mm=today.getMonth(),
                dd=today.getDate();
            for(var i=1;i<=len;i++){
                dataByHour=dataByHour||[new Date(yy,mm,dd,hour).getTime(),0];
                if(i%6===0){
                    if(dataType===3){
                        dataByHour[1]=tempClickNum>0?(tempOrderNum*100/tempClickNum).toFixed(2):0;
                        dataByHour[1] = parseFloat(dataByHour[1]);
                    };
                    r.push(dataByHour);
                    hour++;
                    dataByHour=null;
                    tempClickNum=0;
                    tempOrderNum=0;
                    continue;
                };
                switch(dataType){
                    case 1:
                        dataByHour[1]+=d[i].click_num;
                    break;
                    case 2:
                        dataByHour[1]+=d[i].order_num;
                    break;
                    case 3:
                        tempClickNum+=d[i].click_num;
                        tempOrderNum+=d[i].order_num;
                    break;
                };//switch
            };
            return r;
        },
        parseData:function(d,dataType){
            if(this.dateType=='today'){
                d = d.data.today;//144个点，说明是10分钟一个点，我们转换成一个小时一个点
                return this.parseDataByHour(d,dataType);
            };
            d = d.data;
            var len = d.length,
                r =[],
                dataByTime=null,
                tempDate = null;
            for(var i=0;i<len;i++){
                tempDate = new Date(d[i].s_date);
                dataByTime=[new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate()).getTime(),0];
                switch(dataType){
                    case 1:
                        dataByTime[1]=d[i].click_num;
                    break;
                    case 2:
                        dataByTime[1]=d[i].order_num;
                    break;
                    case 3://点击转化率
                        dataByTime[1]=d[i].click_num==0?0:parseFloat( (d[i].order_num*100/d[i].click_num).toFixed() );
                    break;
                };//switch
                r.push(dataByTime);
            };
            return r;
        },
        getDataByDates:function(dates,cbk){
            var dLen = dates.length,
                sdate = J.data.getDateTimeStr(dates[0]),
                edate = J.data.getDateTimeStr(dates[dLen-1]),
                dateType = ( dLen===1 && sdate==J.data.getDateTimeStr(new Date(),{ignoreHMS:true}) )?'today':'custom',
                _params = {
                    date_type:dateType,
                    start_date:sdate,
                    end_date:edate
                },
                me = this;
            this.dateType = dateType;
            J.data.getKeyAndClickData(_params,cbk);
        }//getDataByDates
    };
    //_ytag组-模块
    p.ytagGroup={
        tpl:J.heredoc(function(){/*
            {{#empty}}
            <div class="xdata_alert">无数据</div>
            {{/empty}}
            {{^empty}}
            <ul class="clearfix">
            {{#items}}
            <li><a id="xdataLnk{{id}}" href="javascript:;" data-ytag="{{_ytag}}" data-ytagattr="_ytag">{{selector}}</a></li>
            {{/items}}
            </ul>
            {{/empty}}
        */}),
        _init:function(){
            return;
            J.$win.bind(EVT.UIReady,function(e){
                p.ytagGroup.rockAndRoll();
            });
        },
        rockAndRoll:function(){
            this.$d = $('#xdataMods');
            this.$groups = $('[_ytag]');
            this.data=[];
            var tempObj = null;
            this.$groups.each(function(i,o){
                tempObj = {_ytag:o.getAttribute('_ytag')};
                tempObj.selector='[_ytag="'+tempObj._ytag+'"]';
                tempObj.id='_ytag'+tempObj._ytag;
                p.ytagGroup.data.push(tempObj);
            });
            this.render();

        },
        render:function(){
            this.$d[0].innerHTML = J.toHtml(this.tpl,{empty:(this.data.length==0),items:this.data});
        }
    };
    //主UI框架
    p.main={
        visible:true,
        autoHideTimer:null,
        $startUp:null,
        $ui:null,
        tpl0:'<div id="xdataBootup" class="xdata_bootup xdata_show"><strong class="xdata_c1">C</strong>lick<strong class="xdata_c2">S</strong>tream<span class="xdata_loading"></span></div>',
        _init:function(){
            J.$body.append(this.tpl0);
            if(location.href.indexOf('xdata')>-1){
                J.$body.addClass('xdata_admin');
            }
            this.$startUp = $('#xdataBootup');
            this._initEvts();
        },
        _initEvts:function(){
            J.$win.bind(J.data.EVT.InitKeyData,function(e,err,data){
                if(err){
                    p.main.showError(err);
                    return;
                }
            }).bind(J.data.EVT.InitClickData,function(e,err,data){
                if (err) {
                    p.main.showError(err);
                    return;
                };
                //这里主数据和点击数据已经拿到
                p.main.onDataReady();
            });
        },
        onDataReady:function(){
            this.$startUp.removeClass('xdata_show').onTransitioned(function(){
                p.main.render();
            });
        },
        render:function(){
            this.$startUp.onTransitioned(false);
            J.$body.append(coreTpl);
            this.$ui = $('#xdataWrap');
            this.$uiCore = $('#xdataUI');
            this.$tab = $('#xdataTab');
            this.$hd = $('#xdataUIHD');
            this.$rankList = this.$uiCore.find('.data_list');
            $('#xdataClose').bind('click',function(e){
                p.main[p.main.visible?'hide':'show'].call(p.main);
                return false;
            });
            //排行榜的切换
            $('#xdataRank .xdata_ranktype').bind('click',function(e){
                p.main.$rankList.addClass('xdata_hidden').filter('#xdataList'+this.value).removeClass('xdata_hidden');
            });
            //日期控件设置
            var today=new Date(),
                todayStr = today.toISOString().substring(0, 10);
            p.main.$ui.find('.xdata_date').attr('max',todayStr)
                .end()
                .find('.xdata_sdate').val(todayStr)
                .end()
                .find('.xdata_edate').val(todayStr)
                .end()
                .find('.xdata_sdate1').val(J.data.getDateTimeStr(new Date(),{len:10,dayDiff:-7}))
                .end()
                .bind('mouseenter',function(e){
                    clearTimeout(p.main.autoHideTimer);
                })/*.bind('mouseleave',function(e){
                    p.main.autoHide();
                })*/;
            //autohide after UIReady
            this.autoHide();
            this.$ui.onTransitioned(function(){
                if(p.main.visible){
                    p.main.fixedHD();
                }
            });
            J.$win.trigger(EVT.UIReady);
        },
        fixedHD:function(){
            this.$hd.addClass('xdata_fixed');
        },
        unfixedHD:function(){
            this.$hd.removeClass('xdata_fixed');
        },
        showError:function(txt){
            this.$startUp.html('<span class="xdata_err">'+txt.toString()+'</span>');
        },
        show:function(){
            this.$ui.removeClass('xdata_wrap_hide');
            this.visible=true;
        },
        hide:function(){
            this.unfixedHD();
            this.$ui.addClass('xdata_wrap_hide');
            this.visible=false;
            J.$win.trigger(EVT.Collapse);
        },
        autoHide:function(){
            clearTimeout(this.autoHideTimer);
            this.autoHideTimer = setTimeout(function(){
                p.main.hide();
            },2500);
        }
    };
    //ytag排行榜
    p.rank = {
        dataType:1,
        dataChangedAt:1,
        tpl:J.heredoc(function(){/*
            {{#empty}}
            <div class="xdata_alert">无数据</div>
            {{/empty}}
            {{^empty}}
            {{#items}}
            <div class="data_list_item">
                <div class="data_list_entry">
                    <a class="data_list_lk" id="xdataLnk{{id}}" href="javascript:;" data-ytag="{{ytagid}}" data-href="{{href}}" title="{{title}}">{{text}}<span>{{val}}</span></a>
                </div>
            </div>
            {{/items}}
            {{/empty}}
        */}),
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.rank.render(1);
            }).bind(EVT.DataTypeChange,function(e,t){
                t = parseInt(t);
                p.rank.dataType=t;
                p.rank.render(t);
            }).bind(J.data.EVT.ClickDataChange,function(e,d){
                p.rank.dataChangedAt=p.rank.dataType;
                p.rank.render(p.rank.dataType,true);
            });
        },
        render:function(dataType,forceUpdate){
            if(!this.$objs){
                this.$objs=$('#xdataList2').find('.xdata_rank');
            }
            var $obj = this.$objs.removeClass('xdata_visible').eq(dataType-1).addClass('xdata_visible');
            if(!$obj[0].getAttribute('data-xdata')){
                $obj[0].innerHTML = J.toHtml(this.tpl, this.getData(dataType));
                $obj[0].setAttribute('data-xdata','1');
                return;
            };
            if(forceUpdate||(p.rank.dataChangedAt!=dataType)){
                $obj[0].innerHTML = J.toHtml(this.tpl, this.getData(dataType));
            };
        },
        getData:function(dataType,topCnt){
            var rawData = J.data['CurrentClickData'],
                niceData = this.parseData(rawData,dataType,topCnt);
            return niceData;
        },
        parseData:function(d,dataType,topCnt){
            d = d.data;
            var items = [],tempTag;
            for(var c in d){
                if(typeof(d[c])!=='object')
                {
                    continue;
                }
                tempTag = J.ytag.get(d[c].page_tag);
                if(!tempTag){
                    continue;
                }
                $.extend(d[c],tempTag);
                items.push(d[c]);
            };//for
            items=this.orderDataDescBy(items,dataType);
            topCnt = topCnt||50;
            var len = items.length,
                r = {empty:false,items:[]};
            
            len = len>=topCnt?topCnt:len;
            if(len==0){
                r.empty=true;
                return r;
            };
            for(var i=0;i<len;i++){
                switch(dataType){
                    case 1:
                        items[i].val = items[i].click_num;
                    break;
                    case 2:
                        items[i].val = items[i].order_num;
                    break;
                    case 3:
                        items[i].val = items[i].click_trans_rate;
                    break;
                };//switch
                r.items.push(items[i]);
            };
            return r;
        },
        //降序排列数据
        orderDataDescBy:function(arrData,dataType){
            //new a copy of arrData
            arrData = arrData.slice(0);
            switch(dataType){
                case 1:
                    //do nothing，默认是按点击数排序的
                break;
                case 2:
                    //按下单量排序
                    arrData.sort(function(a,b){
                        return (b.order_num-a.order_num);
                    });
                break;
                case 3:
                    //按转化率排序
                    //按下单量排序
                    arrData.sort(function(a,b){
                        return (parseFloat(b.click_trans_rate)-parseFloat(a.click_trans_rate));
                    });
                break;
            };
            return arrData;
        }
    };
    //自定义单元排行榜
    p.rank2 = {
        $d:null,
        dataType:1,
        dataChangedAt:1,
        dataInited:false,
        tpl:J.heredoc(function(){/*
            {{#empty}}
            <div class="xdata_alert">无数据</div>
            {{/empty}}
            {{#items}}
            <li id="xdataCTag{{id}}" class="data_list_item{{cl1}}" data-oxmenuid="{{id}}">
                <div class="data_list_entry">
                    <a id="xdataLnkCTag{{id}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" class="data_list_lk">{{alias}}<span>{{val}}</span></a>
                    <p class="data_list_control">
                        <a href="javascript:;" class="data_btn_edit" rel="{{id}}">编辑</a>
                    </p>
                    <i class="data_ico_more"></i>
                </div>
            </li>
            {{/items}}
        */}),
        tplSub:J.heredoc(function(){/*
            <div id="xdataListMore{{pid}}" class="data_list data_list_more">
                <ul>
                {{#babies}}
                <li id="xdataCTag{{id}}" class="data_list_item{{cl1}}" data-oxmenuid="{{id}}">
                    {{#hasChildren}}
                        <div class="data_list_entry">
                            <a id="xdataLnkCTag{{id}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" class="data_list_lk">{{alias}}<span>{{val}}</span></a>
                            <p class="data_list_control">
                                <a href="javascript:;" class="data_btn_edit" rel="{{id}}">编辑</a>
                            </p>
                            <i class="data_ico_more"></i>
                        </div>
                        {{>children}}
                    {{/hasChildren}}
                    {{^hasChildren}}
                    <div class="data_list_entry">
                        <a id="xdataLnkCTag{{id}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" class="data_list_lk">{{alias}}<span>{{val}}</span></a>
                        <p class="data_list_control">
                            <a href="javascript:;" class="data_btn_edit" rel="{{id}}">编辑</a>
                        </p>
                        <i class="data_ico_more"></i>
                    </div>
                    {{/hasChildren}}
                </li>
                {{/babies}}
                </ul>
            </div>
        */}),
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.rank2.$d = $('#xdataList1');
                p.rank2.reload();
            }).bind(EVT.DataTypeChange,function(e,t){
                p.rank2.dataType = parseInt(t);
                p.rank2.reload();
            }).bind(J.data.EVT.CTagUpdated,function(e,opType,d){
                p.rank2.onCTagUpdated(opType,d);
            }).bind(J.data.EVT.ClickDataChange,function(e,d){
                p.rank2.dataChangedAt=p.rank2.dataType;
                p.rank2.reload();
            });
        },
        onCTagUpdated:function(opType,d){
            switch(opType){
                case -1:
                    //delete
                    $('#xdataCTag'+d).remove();
                break;
                case 0:
                    //add
                    var items = this.parseData([d]);
                    this.render(items,true);
                break;
                case 1:
                    //update
                    $('#xdataCTag'+d.id).remove();
                    var items = this.parseData([d]);
                    this.render(items,true);
                break;
            };//switch
        },
        getData:function(cbk){
            J.data.getAllCTags(function(items){
                cbk(items);
            });
        },
        parseTreeData:function(ctag,pid){
            ctag.pid = pid;
            ctag = this.parseSingleItem(ctag);
            if ( (!ctag.babies) || (ctag.babies.length===0) ) {
                return ctag;
            };
            var len = ctag.babies.length;
            for(var i =0;i<len;i++){
                this.parseTreeData(ctag.babies[i],ctag.id);
            };//for
            return ctag;
        },
        parseSingleItem:function(tempItem){
            tempItem.id = tempItem.isCustomYTag?tempItem.id:tempItem.ytagSelector;
            tempItem.ytags = [];
            tempItem.click_num=0;
            tempItem.order_num=0;
            tempItem.click_trans_rate=0;
            tempItem.cl1="";
            tempItem.hasChildren = false;
            if(tempItem.isCustomYTag){
                switch(tempItem.type){
                    case 1:
                        //类名
                        tempItem.ytags = J.data.getClickDataBySelector(tempItem.ytagSelector);
                    break;
                    case 2:
                        //id
                        tempItem.ytags = J.data.getClickDataByIds(tempItem.ytagSelector.split('|'));
                    break;
                };//switch
            };
            if(tempItem.readonly){
                tempItem.cl1=' data_list_item1';
            }
            //含子级模块
            if(tempItem.babies&&tempItem.babies.length>0){
                tempItem.cl1+=' data_list_item2';
                tempItem.hasChildren = true;
            }
            ytagLen = tempItem.ytags.length;
            for(var j=0;j<ytagLen;j++){
                tempItem.click_num+=tempItem.ytags[j].click_num;
                tempItem.order_num+=tempItem.ytags[j].order_num;
            };//for
            tempItem.click_trans_rate = tempItem.click_num==0?0:parseFloat( (tempItem.order_num*100/tempItem.click_num).toFixed(2) );
            
            switch(this.dataType){
                case 1:
                    tempItem.val = tempItem.click_num;
                break;
                case 2:
                    tempItem.val = tempItem.order_num;
                break;
                case 3:
                    tempItem.val = tempItem.click_trans_rate;
                break;
            };
            return tempItem;
        },
        parseData:function(items){

            items = items||[];

            var len = items.length,
                tempItem = null,
                cItems = [],
                ytagLen = 0;
            for(var i=0;i<len;i++){
                tempItem = items[i];
                tempItem = this.parseSingleItem(tempItem);
                if(tempItem.isCustomYTag){
                    cItems.push(tempItem);
                };
            };
            return cItems;
        },
        render:function(cItems,isPrepend){
            this.$d.find('.xdata_alert').remove();
            if(!isPrepend){
                this.$d.find('.data_list_item').remove();
            }
            var html = '<ul>'+J.toHtml(this.tpl,{
                    empty:(cItems.length==0),
                    items:cItems
                })+'</ul>';
            this.$d.prepend(html);

            if (!isPrepend) {
                $('#xdataList1').find('.data_list_item2').oxmenu({
                    onShowing:function(id,cbk){
                        p.rank2.onShowingSubMenus(id,cbk);
                    }
                });
            };

        },
        onShowingSubMenus:function(id,cbk){
            //获取子级模块数据
            var rootTag = J.data.getDefaultCTagById(id);
            if ( (!rootTag) || (!rootTag.babies) || (rootTag.babies.length===0) ) {
                cbk('');
                return;
            };
            this.parseTreeData(rootTag,id);
            var html = J.toHtml(this.tplSub,{
                    pid:id,
                    babies:rootTag.babies
                },{children:this.tplSub});
            cbk(html);
        },
        reload:function(){
            this.getData(function(d){
                d = p.rank2.parseData(d);
                p.rank2.render(d);
                if(!p.rank2.dataInited){
                    $('#xdataLoading2').remove();
                    p.rank2.dataInited=true;
                }
            });
        }
    };
    //ytag editor
    p.ytagEditor = {
        $d:null,
        $name:null,
        $value:null,
        $trigger:null,
        tagData:null,
        isVisible:false,
        isCustomYTag:false,
        tipTimer:null,
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.ytagEditor.$d = $('#xdataPop2');
                p.ytagEditor.$name = $('#xdataPop2Ipt1');
                p.ytagEditor.$value = $('#xdataPop2Ipt2');
                p.ytagEditor.$tip = $('#xdataPop2Tip');
                p.ytagEditor.uiOffsetTop = p.main.$ui.position().top;
                //update
                $('#xdataPop2Btn1').bind('click',function(e){
                    var isOk = p.ytagEditor.save(this.rel);
                    if(isOk){
                        p.ytagEditor.hide();
                    }
                });
                //delete
                $('#xdataPop2Btn2').bind('click',function(e){
                    p.ytagEditor.delete(this.rel);
                    p.ytagEditor.hide();
                });

                //add new
                $('#xdataAddCTag').bind('click',function(e){
                    p.ytagEditor.show({
                        id:'',
                        alias:'',
                        ytagSelector:''
                    },$(this),true);
                });

                $('#xdataPop2Close').bind('click',function(e){
                    p.ytagEditor.hide();
                });

            }).bind(EVT.Collapse,function(e){
                p.ytagEditor.hide();
            }).bind('resize.ytagEditor',function(e){
                p.ytagEditor.updatePosition();
            });

            $('.data_btn_edit').live('click',function(e){
                //tagData,$trigger,isCustomYTag
                var $trigger = $(this).parents('.data_list_entry'),
                    isCustomYTag = $trigger.find('.data_list_lk')[0].getAttribute('data-ytagattr')=='ctag';
                p.ytagEditor.show(J.data.getCTag(this.rel),$trigger,isCustomYTag);
                return false;
            });

        },
        showTip:function(txt,duration){
            clearTimeout(this.tipTimer);
            if(!txt){
                this.$tip.addClass('xdata_hidden');
                return;
            };
            this.$tip.removeClass('xdata_hidden');
            this.$tip.html('<span class="xdata_error">'+txt+'</span>');
            if(duration){
                this.tipTimer = setTimeout(function(){
                    p.ytagEditor.showTip(null);
                },duration);
            }
        },
        delete:function(id){
            J.data.deleteCTag(id);
        },
        save:function(id){
            var d = {
                id:id,
                alias:$.trim(this.$name.val()),
                ytagSelector:$.trim(this.$value.val()),
                isCustomYTag:this.isCustomYTag,
                type:1//1为类名，2为id列表
            };
            if(d.alias.length==0||d.ytagSelector.length==0){
                this.showTip('模块名称和ytag选择器均不能为空！',3000);
                return false;
            };
            var $tempDom = null;
            //获取关联的ytag
            if(d.ytagSelector.indexOf('.')!=-1 || d.ytagSelector.indexOf('#')!=-1){
                //css选择器
                $tempDom = $(d.ytagSelector);
                if($tempDom.length===0){
                    this.showTip('ytag选择器必须是有效的css选择器，或则是以|分隔的有效的ytag id！',3000);
                    return false;
                };
                J.data.saveCTag(d);
                return true;
            };
            //ytag id，|分隔
            if( d.ytagSelector.indexOf('|')==-1 && (!/^[0-9]+$/.test(d.ytagSelector)) ){
                this.showTip('ytag选择器必须是有效的css选择器，或则是以|分隔的有效的ytag id！',3000);
                return false;
            };
            var tags = d.ytagSelector.split('|'),
                isValid = true,
                len = tags.length;
            for(var i =0;i<len;i++){
                if(!(/^[0-9]+$/.test(tags[i])) ){
                    isValid=false;
                    break;
                }
            };//for
            if(!isValid){
                this.showTip('ytag选择器必须是有效的css选择器，或则是以|分隔的有效的ytag id！',3000);
                return false;
            };
            d.type=2;
            J.data.saveCTag(d);
            return true;
        },
        show:function(tagData,$trigger,isCustomYTag){
            var clEditOn = 'data_list_entry_editing';
            if(this.$trigger){
                this.$trigger.removeClass(clEditOn);
            }

            this.isCustomYTag = isCustomYTag||false;
            this.tagData=tagData;
            this.$trigger=$trigger.addClass(clEditOn);
            this.$d.removeClass('xdata_hidden');
            this.isVisible=true;
            this.updatePosition();
            this.loadData(tagData);
        },
        hide:function(){
            this.$d.addClass('xdata_hidden');
            this.$name[0].value = '';
            this.$value[0].value = '';
            this.isVisible=false;
            var clEditOn = 'data_list_entry_editing';
            if(this.$trigger){
                this.$trigger.removeClass(clEditOn);
            }
            this.$trigger=null;
        },
        updatePosition:function(){
            if(!this.isVisible){
                return;
            };
            var bottom = 0,
                $trigger = this.$trigger;
            if($trigger){
                bottom = J.$win.height()-($trigger.offset().top-p.main.$ui.offset().top)-29/* 箭头的位置 */-$trigger.outerHeight()/2 - p.ytagEditor.uiOffsetTop;
            }
            this.$d.css({
                bottom:bottom
            });
        },
        loadData:function(tagData){
            this.$name[0].value = tagData.alias;
            this.$value[0].value = tagData.ytagSelector;
            document.getElementById('xdataPop2Btn1').rel = document.getElementById('xdataPop2Btn2').rel = tagData.id;
            if(tagData.readonly){
                this.$d.addClass('xdata_readonly');
            }else{
                this.$d.removeClass('xdata_readonly');
            }
        }
    };
    //ytag chart
    p.ytagChart = {
        $d:null,
        $tip:null,
        $chart:null,
        $trigger:null,
        chart:null,
        isLoading:false,
        isVisible:false,
        hasAjaxError:false,
        data:[],
        tagData:null,
        cache:{},//data cache
        dataType:1,
        jqXHR:null,
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.ytagChart.$d = $('#xdataPop1');
                p.ytagChart.$chart = $('#xdataYTagChart');
                p.ytagChart.$tip = $('#xdataYTagChartTip');
                //make the popup draggable
                new Draggabilly(p.ytagChart.$d[0]);
                //UICOre的scroll事件
                p.main.$uiCore.bind('scroll.ytagChart',function(e){
                    //p.ytagChart.updatePosition();
                });
                //刷新按钮
                $('#xdataRetweet2').bind('click',function(e){
                    if(p.ytagChart.isLoading){
                        return;
                    };
                    p.ytagChart.loadData(p.ytagChart.tagData);
                });
                //滚动条
                $('.xdata_rank,.xdata_mods').bind('scroll.ytagChart',function(e){
                    p.ytagChart.reset();
                });
                //排行榜的切换
                $('#xdataRank .xdata_ranktype').bind('click.ytagChart',function(e){
                    p.ytagChart.reset();
                });
                $('#xdataPop1Close').bind('click',function(e){
                    p.ytagChart.reset();
                });

            }).bind(EVT.DataTypeChange,function(e,t){
                p.ytagChart.dataType=parseInt(t);
                p.ytagChart.reset();
            }).bind('resize.ytagChart',function(e){
                //p.ytagChart.updatePosition();
            }).bind(J.data.EVT.CTagUpdated,function(e,opType,d){
                p.ytagChart.onCTagUpdated(opType,d);
            });
        },
        onCTagUpdated:function(opType,d){
            if(this.isVisible){
                this.reset();
            }
        },
        reset:function(){
            if(this.isLoading&&this.jqXHR&& this.jqXHR.readyState != 4){
                this.jqXHR.abort();
            };
            this.isLoading=false;
            this.hide();
            this.tagData=null;
            this.$trigger=null;
            J.$win.trigger(EVT.YTagChartReset);
        },
        show:function(tagData,$trigger){
            this.tagData=tagData;
            this.$trigger=$trigger;
            this.$d.removeClass('xdata_hidden');
            this.isVisible=true;
            //this.updatePosition();
            this.loadData(tagData);
        },
        hide:function(){
            this.$d.addClass('xdata_hidden');
            this.isVisible=false;
        },
        updatePosition:function(){
            if(!this.isVisible){
                return;
            };
            var bottom = 0,
                $trigger = this.$trigger;
            if($trigger){
                bottom = J.$win.height()-($trigger.offset().top-p.main.$ui.offset().top)-29/* 箭头的位置 */-$trigger.outerHeight()/2;
            }
            this.$d.css({
                bottom:bottom
            });
        },
        showTip:function(txt){
            if(txt===null){
                this.$tip.addClass('xdata_hidden');
                this.$chart.removeClass('xdata_hidden');
                return;
            };
            txt = txt || '<img class="xdata_loading1" src="http://static.gtimg.com/icson/img/common/loading.gif"/>';
            this.$tip.html(txt).removeClass('xdata_hidden');
            this.$chart.addClass('xdata_hidden');
        },
        loadData:function(tagData){

            if(this.isLoading&&this.jqXHR&& this.jqXHR.readyState != 4){
                this.jqXHR.abort();
                this.isLoading=false;
            }

            var me = this,
                dates=[],
                tempDate = null,
                sdate = document.getElementById('xdataPop1Date1').value,
                edate = document.getElementById('xdataPop1Date2').value,
                cacheId = [me.dataType,tagData.ytags.join('-'),sdate,edate].join('-');

            if(sdate==''||edate==''){
                me.showTip('开始时间和结束时间不能为空！');
                return;
            };

            sdate = new Date(sdate);
            edate = new Date(edate);
            if(sdate>edate){
                tempDate = sdate;
                sdate=edate;
                edate=tempDate;
            };
            //结束日期往后推一天
            edate.setDate(edate.getDate()+1);
            while(sdate<edate){
                dates.push(new Date(sdate.getFullYear(),sdate.getMonth(),sdate.getDate()));
                sdate.setDate(sdate.getDate()+1);
            };//while

            if(dates.length>15){
                me.showTip('统计时间范围超过15天！服务器亚历山大...');
                return;
            }

            this.showTip();
            this.isLoading=true;
            this.hasAjaxError=false;
            
            this.data=[];
            //从cache取数据
            if(this.cache[cacheId]){
                this.data=this.cache[cacheId];
                me.showTip(null);
                me.isLoading=false;
                me.render(this.data);
                return;
            }
            //从服务器取数据
            //TODO:需要开发提供一个取多天数据的接口
            this.getDataByDates(tagData.ytags,dates,function(err,d){
                me.isLoading=false;
                me.jqXHR=null;
                if(err){
                    me.showTip('<div class="xdata_error">服务器错误：'+err.toString()+'</div>');
                    return;
                }
                me.cache[cacheId]=d;
                me.showTip(null);
                me.render(d);
            });
        },
        parseData:function(d,dataType){
            var len = d.length,
                r =[],
                dataByTime=null;
            for(var i=0;i<len;i++){
                dataByTime=[d[i].t,0];
                switch(dataType){
                    case 1:
                        dataByTime[1]=d[i].d.status===true?d[i].d.data.data[0].click_num:0;
                    break;
                    case 2:
                        dataByTime[1]=d[i].d.status===true?d[i].d.data.data[0].order_num:0;
                    break;
                    case 3:
                        dataByTime[1]=d[i].d.status===true?parseFloat(d[i].d.data.data[0].click_trans_rate):0;
                    break;
                };//switch
                r.push(dataByTime);
            };
            return r;
        },
        getChartOption:function(rawData,dataType){
            dataType = parseInt(dataType);
            var niceData = this.parseData(rawData,dataType),
                baseOpts = {
                chart:{
                    width:540
                },
                title: {
                    text: ' '
                },
                xAxis: {
                    type: 'datetime'//datetime
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true,
                    valueSuffix: ''
                },
                legend: {
                },
                series: [{
                    name: '点击量',
                    data: niceData,
                    zIndex: 1,
                    marker: {
                        fillColor: 'white',
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[dataType-1]
                    }
                }]
            };
            switch(dataType){
                case 1:
                break;
                case 2:
                    baseOpts.series[0].name='下单量';
                break;
                case 3:
                    baseOpts.series[0].name='转化率';
                break;
            };//switch
            return baseOpts;
        },
        render:function(data){
            //this.$chart.find('.xdata_loading1').remove();
            var chartOpts = this.getChartOption(data,this.dataType);
            if(!this.chart){
                this.$chart.highcharts(chartOpts);
                this.chart=this.$chart.highcharts();
                return;
            };
            this.chart.series[0].update(chartOpts.series[0]);
        },
        getDataByDates:function(tagids,dates,cbk){
            if(dates.length==0){
                cbk(null,this.data);
                return;
            };
            var date = dates.splice(0,1)[0],
                timeStamp = date.getTime(),
                sdate = J.data.getDateTimeStr(date),
                edate = sdate,
                _params = {
                    date_type:'custom',
                    start_date:sdate,
                    end_date:edate,
                    page_tag_ids:tagids.join(',')
                },
                me = this;

            this.jqXHR=J.data.getRangeClickData(_params,function(err,d){
                if(err){
                    me.hasAjaxError=true;
                    cbk(err);
                    return;
                }
                me.data.push({
                    t:timeStamp,
                    d:d
                });
                //递归
                me.getDataByDates(tagids,dates,cbk);
            });
        }
    };
    pub.showYTagChart = function(tagData,$trigger){
        p.ytagChart.show(tagData,$trigger);
    };
});
/* E CoreUI */

/* S YTAG */
J(function($,p,pub){
    pub.id="ytag";
    var cache = {},
    $ytags;
    p.main = {
        coverTpl:J.heredoc(function(){/*
            <div id="xdataCover{{id}}" class="xdata_tagcover">
                <div class="xdata_tagcover_bg"></div>
                <div class="xdata_tagcover_bd">{{coverTip}}</div>
            </div>
        */}),
        covers:{},
        $ytagTrigger:null,
        hideCovers:function(){
            for(var c in this.covers){
                this.covers[c].addClass('xdata_hidden');
            }
        },
        //将单个ytag或_ytag添加到缓存中
        addToCache:function($o,attrName){
            if($o.length===0){
                return null;
            }
            attrName = attrName||'ytag';
            var $parent = $o.parent(),
                off = $o.offset(),
                ytag = $o[0].getAttribute(attrName),
                data = {
                    id:(attrName+ytag),
                    ytagAttr:attrName,
                    ytagid:ytag,
                    $dom:$o,
                    title:$.trim($o[0].title),
                    text:$.trim($o.text()),
                    href:$o[0].href,
                    selector:('[$="'+ytag+'"]').replace('$',attrName)
                };
            $.extend(data,J.data.getItemDimension($o)||{});
            data.text=data.text.length===0?(data.title.length===0?'[!!无标题!!]':data.title):data.text;
            data.ytags=this.getRelatedYTags($o,ytag,attrName);
            cache[data.id] = data;
            return data;
        },
        //将自定义的单元添加到缓存
        addCTagToCache:function(ctag){
            var isCustomTagWithCssSelector = (ctag.indexOf('#')!=-1 || ctag.indexOf('.')!=-1),
                cssSelectors = [],
                cssSelectors1 = [],
                len=0,
                ctagid = this.getCacheKey(ctag,'ctag'),
                data = {
                    id:ctagid,
                    selector:''
                };

            if(isCustomTagWithCssSelector){
                cssSelectors = ctag.split(',');
                len = cssSelectors.length;
                data.selector = ctag;
            }else{
                cssSelectors = ctag.split('|');
                len = cssSelectors.length;
                for(var i =0;i<len;i++){
                    cssSelectors1.push('[ytag="'+cssSelectors[i]+'"]');
                };
                data.selector = cssSelectors1.join(',');
            }
            data.$dom = $(data.selector);//NOTE:发现ytag用的很滥，同一个ytag用在多个链接上
            data.ytags=this.getRelatedYTags(data.$dom,ctag,'ctag',isCustomTagWithCssSelector);
            data.isCustom=true;
            data.top = (data.$dom.offset()||{top:0}).top;

            //获取每个元素的位置、高宽信息
            data.$dom.each(function(i,o){
                o = $(o);
                o.data('xdatadim',J.data.getItemDimension(o));
            });

            cache[data.id] = data;
            return data;
        },
        getRelatedYTags:function($tag,ytag,attrName,isCustomTagWithCssSelector){
            var tags = [],
                isCustomTag = (attrName==='ctag'),
                tempCache={};
            if (attrName==='_ytag') {
                $tag.find('[ytag]').each(function(i1,o1){
                    o1 = o1.getAttribute('ytag');
                    if(!tempCache[o1]){
                        tags.push(o1);
                        tempCache[o1]=true;
                    }
                    
                });
                return tags;
            };
            if(!isCustomTag){
                tags.push(ytag);
                return tags;
            };

            if(!isCustomTagWithCssSelector){
                tags = tags.concat(ytag.split('|'));
                return tags;
            };

            $tag.find('[ytag]').each(function(i1,o1){
                o1 = o1.getAttribute('ytag');
                if(!tempCache[o1]){
                    tags.push(o1);
                    tempCache[o1]=true;
                }
            });
            $tag.each(function(i1,o1){
                o1 = o1.getAttribute('ytag');
                if( o1 && (!tempCache[o1]) ){
                    tags.push(o1);
                    tempCache[o1]=true;
                }
            });
            return tags;
        },
        _init:function(){
            J.$win.bind(J.ui.EVT.YTagChartReset,function(e){
                p.main.reset();
            });
            $('[data-ytag]').live('click',function(e){
                p.main.onClickYTagTrigger(this);
            });
            $ytags = $('[ytag]');
            pub.rockAndRollAll();
        },
        reset:function(t){
            var clOn = 'data_list_entry_on';
            if(this.$ytagTrigger){
                this.$ytagTrigger.parent().removeClass(clOn);
            }
            this.$ytagTrigger=null;
            this.hideCovers();
        },
        onClickYTagTrigger:function(elmTrigger){
            var clOn = 'data_list_entry_on';
            if(this.$ytagTrigger){
                if(this.$ytagTrigger[0].id===elmTrigger.id){
                    return;
                };
                this.$ytagTrigger.parent().removeClass(clOn);
            }
            this.$ytagTrigger = $(elmTrigger);
            this.$ytagTrigger.parent().addClass(clOn);

            var ytagData = J.ytag.get(elmTrigger.getAttribute('data-ytag'),elmTrigger.getAttribute('data-ytagattr'));

            $('body').stop().animate({
                scrollTop:ytagData.top
            },'fast',function(){
                p.main.showCover(ytagData);
                J.ui.showYTagChart(ytagData,p.main.$ytagTrigger);
            });
        },
        _showCover:function(id,dim,hideOthers){
            if(hideOthers){
                this.hideCovers();
            }
            var coverId = '#xdataCover'+id,
                $cover= $(coverId),
                cssProps={
                    position:'fixed',
                    top:0,
                    left:0,
                    right:401,
                    width:'auto',
                    height:'auto',
                    color:'red'
                },
                isHidden = dim.isHidden;
            var coverTip = dim.selector+(isHidden?',当前处于隐藏状态...':'');

            if($cover.length===1){
                $cover.removeClass('xdata_hidden');
                if(isHidden){
                    $cover.css(cssProps).find('.xdata_tagcover_bd').html(coverTip);
                }
                this.covers[id]=$cover;
                return;
            };
            J.$body.append(J.toHtml(this.coverTpl,{id:id,coverTip:coverTip}));
            cssProps = isHidden?cssProps:dim;
            this.covers[id] = $(coverId).css(cssProps);
        },
        showCover:function(tagData){
            if(tagData.isCustom){
                this.showCTagCover(tagData);
                return;
            };

            var coverDim = {
                top:tagData.top,
                left:tagData.left,
                width:(tagData.width>tagData.parentWidth?tagData.parentWidth:tagData.width),
                height:(tagData.height>tagData.parentHeight?tagData.parentHeight:tagData.height),
                isHidden:tagData.$dom.is(':hidden'),
                selector:tagData.selector
            };
            if(coverDim.isHidden){
                pub.removeFromCache(tagData.id);
            }
            this._showCover(tagData.id,coverDim,true);
        },
        showCTagCover:function(tagData){
            this.hideCovers();
            if(tagData.$dom.length==0){
                return;
            };
            var coverDim = null;
            tagData.$dom.each(function(i,o){
                o = $(o);
                coverDim = o.data('xdatadim');
                coverDim.isHidden = o.is(':hidden');
                coverDim.selector = o[0].id||o[0].className||(tagData.id+i);
                p.main._showCover(p.main.getCacheKey(coverDim.selector,'ctag'),coverDim);
            });
        },
        getCacheKey:function(ytag,attrName){
            var isCTag = attrName==='ctag';
            if(!isCTag){
                return (attrName+ytag);
            }
            //将“#,.|空格”全部换成-
            var ctagid = ytag.replace(/[#,\.\| +?]/gi,'-');
            return (attrName+ctagid);
        }
    };
    //caculate all ytag's data
    pub.rockAndRollAll=function(){
        $ytags.each(function(i,o){
            p.main.addToCache($(o));
        });
    };
    //get ytag's data
    pub.get = function(ytag,attrName){
        attrName = attrName||'ytag';
        var isCTag = attrName==='ctag',
            key = p.main.getCacheKey(ytag,attrName),
            data = null;

        if( (data=cache[key]) ){
            return data;
        }
        data = isCTag?p.main.addCTagToCache(ytag):p.main.addToCache($( ('[$="'+ytag+'"]').replace('$',attrName) ),attrName);
        return data;
    };

    pub.reset = function(){
        p.main.reset();
    };

    pub.removeFromCache=function(id){
        cache[id]=null;
    };
});
/* E YTAG */

/* S 热区 */
J(function($,p,pub){
    pub.id="heatmap";
    var $body = J.$body;
    //heatmap
    p.heatmap = {
        isRender:false,
        instance:null,
        _init:function(){
            J.$win.bind(J.ui.EVT.UIReady,function(e){
                $('#xdataBtnHeatmap').bind('click',function(e){
                    if(!p.heatmap.isRender){
                        p.heatmap.render();
                    }
                    p.heatmap.toggleDisplay();
                });
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