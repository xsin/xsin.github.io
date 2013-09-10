// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name default.js
// @code_url https://raw.github.com/janl/mustache.js/master/mustache.js
// @code_url http://oxox.io/assets/highcharts/3.0.5/highcharts.js
// @code_url http://oxox.io/assets/highcharts/3.0.5/highcharts-more.js
// @code_url http://oxox.io/assets/highcharts/3.0.5/modules/exporting.js
// @code_url https://raw.github.com/mamboer/j/master/src/j.core.js
// @code_url https://raw.github.com/mamboer/j/master/src/j.jq.onTransitioned.js
// ==/ClosureCompiler==
(function(n,w){if("object"===typeof exports&&exports)w(exports);else{var y={};w(y);"function"===typeof define&&define.amd?define(y):n.Mustache=y}})(this,function(n){function w(g){return g.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function y(g){this.tail=this.string=g;this.pos=0}function Q(g,n){this.view=g||{};this.parent=n;this._cache={}}function z(){this.clearCache()}function N(g,G,p,w){for(var s="",C,B,y=0,t=g.length;y<t;++y)switch(C=g[y],B=C[1],C[0]){case "#":B=p.lookup(B);if("object"===typeof B)if(S(B))for(var F=
0,z=B.length;F<z;++F)s+=N(C[4],G,p.push(B[F]),w);else B&&(s+=N(C[4],G,p.push(B),w));else"function"===typeof B?(C=null==w?null:w.slice(C[3],C[5]),B=B.call(p.view,C,function(g){return G.render(g,p)}),null!=B&&(s+=B)):B&&(s+=N(C[4],G,p,w));break;case "^":B=p.lookup(B);if(!B||S(B)&&0===B.length)s+=N(C[4],G,p,w);break;case ">":B=G.getPartial(B);"function"===typeof B&&(s+=B(p));break;case "&":B=p.lookup(B);null!=B&&(s+=B);break;case "name":B=p.lookup(B);null!=B&&(s+=n.escape(B));break;case "text":s+=B}return s}
function M(g){return[RegExp(w(g[0])+"\\s*"),RegExp("\\s*"+w(g[1]))]}var V=/\s*/,ca=/\s+/,O=/\S/,s=/\s*=/,F=/\s*\}/,ga=/#|\^|\/|>|\{|&|=|!/,g=RegExp.prototype.test,t=Object.prototype.toString,S=Array.isArray||function(g){return"[object Array]"===t.call(g)},ja={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};y.prototype.eos=function(){return""===this.tail};y.prototype.scan=function(g){return(g=this.tail.match(g))&&0===g.index?(this.tail=this.tail.substring(g[0].length),this.pos+=
g[0].length,g[0]):""};y.prototype.scanUntil=function(g){var n=this.tail.search(g);switch(n){case -1:g=this.tail;this.pos+=this.tail.length;this.tail="";break;case 0:g="";break;default:g=this.tail.substring(0,n),this.tail=this.tail.substring(n),this.pos+=n}return g};Q.make=function(g){return g instanceof Q?g:new Q(g)};Q.prototype.push=function(g){return new Q(g,this)};Q.prototype.lookup=function(g){var n=this._cache[g];if(!n){if("."==g)n=this.view;else for(var p=this;p;){if(0<g.indexOf("."))for(var n=
p.view,s=g.split("."),w=0;n&&w<s.length;)n=n[s[w++]];else n=p.view[g];if(null!=n)break;p=p.parent}this._cache[g]=n}"function"===typeof n&&(n=n.call(this.view));return n};z.prototype.clearCache=function(){this._cache={};this._partialCache={}};z.prototype.compile=function(g,p){var s=this._cache[g];s||(s=n.parse(g,p),s=this._cache[g]=this.compileTokens(s,g));return s};z.prototype.compilePartial=function(g,n,p){n=this.compile(n,p);return this._partialCache[g]=n};z.prototype.getPartial=function(g){g in
this._partialCache||!this._loadPartial||this.compilePartial(g,this._loadPartial(g));return this._partialCache[g]};z.prototype.compileTokens=function(g,n){var p=this;return function(s,w){if(w)if("function"===typeof w)p._loadPartial=w;else for(var C in w)p.compilePartial(C,w[C]);return N(g,p,Q.make(s),n)}};z.prototype.render=function(g,n,p){return this.compile(g)(n,p)};n.name="mustache.js";n.version="0.7.2";n.tags=["{{","}}"];n.Scanner=y;n.Context=Q;n.Writer=z;n.parse=function(p,G){p=p||"";G=G||n.tags;
"string"===typeof G&&(G=G.split(ca));if(2!==G.length)throw Error("Invalid tags: "+G.join(", "));for(var R=M(G),t=new y(p),z=[],C=[],B=[],N=!1,Q=!1,$,T,ea,U;!t.eos();){$=t.pos;if(ea=t.scanUntil(R[0])){U=0;for(var h=ea.length;U<h;++U)if(T=ea.charAt(U),g.call(O,T)?Q=!0:B.push(C.length),C.push(["text",T,$,$+1]),$+=1,"\n"==T){if(N&&!Q)for(;B.length;)delete C[B.pop()];else B=[];Q=N=!1}}if(!t.scan(R[0]))break;N=!0;T=t.scan(ga)||"name";t.scan(V);"="===T?(ea=t.scanUntil(s),t.scan(s),t.scanUntil(R[1])):"{"===
T?(ea=t.scanUntil(RegExp("\\s*"+w("}"+G[1]))),t.scan(F),t.scanUntil(R[1]),T="&"):ea=t.scanUntil(R[1]);if(!t.scan(R[1]))throw Error("Unclosed tag at "+t.pos);U=[T,ea,$,t.pos];C.push(U);if("#"===T||"^"===T)z.push(U);else if("/"===T){if(0===z.length)throw Error('Unopened section "'+ea+'" at '+$);T=z.pop();if(T[1]!==ea)throw Error('Unclosed section "'+T[1]+'" at '+$);}else if("name"===T||"{"===T||"&"===T)Q=!0;else if("="===T){G=ea.split(ca);if(2!==G.length)throw Error("Invalid tags at "+$+": "+G.join(", "));
R=M(G)}}if(T=z.pop())throw Error('Unclosed section "'+T[1]+'" at '+t.pos);for(var R=C,t=[],l,C=0,B=R.length;C<B;++C)if(z=R[C])"text"===z[0]&&l&&"text"===l[0]?(l[1]+=z[1],l[3]=z[3]):(l=z,t.push(z));l=t;t=R=[];z=[];B=0;for(N=l.length;B<N;++B)switch(C=l[B],C[0]){case "#":case "^":z.push(C);t.push(C);t=C[4]=[];break;case "/":z.pop()[5]=C[2];t=0<z.length?z[z.length-1][4]:R;break;default:t.push(C)}return R};n.escape=function(g){return String(g).replace(/[&<>"'\/]/g,function(g){return ja[g]})};var p=new z;
n.clearCache=function(){return p.clearCache()};n.compile=function(g,n){return p.compile(g,n)};n.compilePartial=function(g,n,s){return p.compilePartial(g,n,s)};n.compileTokens=function(g,n){return p.compileTokens(g,n)};n.render=function(g,n,s){return p.render(g,n,s)};n.to_html=function(g,p,s,w){g=n.render(g,p,s);if("function"===typeof w)w(g);else return g}});(function(){function n(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a}function w(){var a,b=arguments.length,c={},d=function(a,b){var c,m;"object"!==typeof a&&(a={});for(m in b)b.hasOwnProperty(m)&&(c=b[m],a[m]=c&&"object"===typeof c&&"[object Array]"!==Object.prototype.toString.call(c)&&"number"!==typeof c.nodeType?d(a[m]||{},c):b[m]);return a};for(a=0;a<b;a++)c=d(c,arguments[a]);return c}function y(a,b){return parseInt(a,b||10)}function Q(a){return"string"===typeof a}function z(a){return"object"===
typeof a}function N(a){return"[object Array]"===Object.prototype.toString.call(a)}function M(a){return"number"===typeof a}function V(a){return ua.log(a)/ua.LN10}function ca(a){return ua.pow(10,a)}function O(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function s(a){return a!==K&&null!==a}function F(a,b,c){var d,e;if(Q(b))s(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(s(b)&&z(b))for(d in b)a.setAttribute(d,b[d]);return e}function ga(a){return N(a)?a:[a]}
function g(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],"undefined"!==typeof c&&null!==c)return c}function t(a,b){Ia&&b&&b.opacity!==K&&(b.filter="alpha(opacity="+100*b.opacity+")");n(a.style,b)}function S(a,b,c,d,e){a=X.createElement(a);b&&n(a,b);e&&t(a,{padding:0,border:va,margin:0});c&&t(a,c);d&&d.appendChild(a);return a}function ja(a,b){var c=function(){};c.prototype=new a;n(c.prototype,b);return c}function p(a,b,c,d){var e=qa.lang;a=+a||0;var f=-1===b?(a.toString().split(".")[1]||
"").length:isNaN(b=ha(b))?2:b;b=void 0===c?e.decimalPoint:c;d=void 0===d?e.thousandsSep:d;e=0>a?"-":"";c=String(y(a=ha(a).toFixed(f)));var k=3<c.length?c.length%3:0;return e+(k?c.substr(0,k)+d:"")+c.substr(k).replace(/(\d{3})(?=\d)/g,"$1"+d)+(f?b+ha(a-c).toFixed(f).slice(2):"")}function Z(a,b){return Array((b||2)+1-String(a).length).join(0)+a}function G(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);return c.apply(this,a)}}function R(a,b){for(var c="{",
d=!1,e,f,k,m,r,x=[];-1!==(c=a.indexOf(c));){e=a.slice(0,c);if(d){f=e.split(":");k=f.shift().split(".");r=k.length;e=b;for(m=0;m<r;m++)e=e[k[m]];f.length&&(f=f.join(":"),k=/\.([0-9])/,m=qa.lang,/f$/.test(f)?(r=(r=f.match(k))?r[1]:-1,e=p(e,r,m.decimalPoint,-1<f.indexOf(",")?m.thousandsSep:"")):e=db(f,e))}x.push(e);a=a.slice(c+1);c=(d=!d)?"}":"{"}x.push(a);return x.join("")}function ia(a){return ua.pow(10,ra(ua.log(a)/ua.LN10))}function pa(a,b,c,d){var e;c=g(c,1);e=a/c;b||(b=[1,2,2.5,5,10],d&&!1===d.allowDecimals&&
(1===c?b=[1,2,5,10]:0.1>=c&&(b=[1/c])));for(d=0;d<b.length&&!(a=b[d],e<=(b[d]+(b[d+1]||b[d]))/2);d++);return a*c}function C(a,b){var c=b||[[Cb,[1,2,5,10,20,25,50,100,200,500]],[pb,[1,2,5,10,15,30]],[eb,[1,2,5,10,15,30]],[Xa,[1,2,3,4,6,8,12]],[Ja,[1,2]],[fb,[1,2]],[Ya,[1,2,3,4,6]],[Ka,null]],d=c[c.length-1],e=aa[d[0]],f=d[1],k;for(k=0;k<c.length&&!(d=c[k],e=aa[d[0]],f=d[1],c[k+1]&&a<=(e*f[f.length-1]+aa[c[k+1][0]])/2);k++);e===aa[Ka]&&a<5*e&&(f=[1,2,5]);e===aa[Ka]&&a<5*e&&(f=[1,2,5]);c=pa(a/e,f,d[0]===
Ka?ia(a/e):1);return{unitRange:e,count:c,unitName:d[0]}}function B(a,b,c,d){var e=[],f={},k=qa.global.useUTC,m,r=new Date(b),x=a.unitRange,D=a.count;if(s(b)){x>=aa[pb]&&(r.setMilliseconds(0),r.setSeconds(x>=aa[eb]?0:D*ra(r.getSeconds()/D)));if(x>=aa[eb])r[Db](x>=aa[Xa]?0:D*ra(r[qb]()/D));if(x>=aa[Xa])r[Eb](x>=aa[Ja]?0:D*ra(r[rb]()/D));if(x>=aa[Ja])r[sb](x>=aa[Ya]?1:D*ra(r[Za]()/D));x>=aa[Ya]&&(r[Fb](x>=aa[Ka]?0:D*ra(r[gb]()/D)),m=r[hb]());x>=aa[Ka]&&(m-=m%D,r[Gb](m));if(x===aa[fb])r[sb](r[Za]()-r[tb]()+
g(d,1));b=1;m=r[hb]();d=r.getTime();for(var da=r[gb](),h=r[Za](),ka=k?0:(864E5+6E4*r.getTimezoneOffset())%864E5;d<c;)e.push(d),x===aa[Ka]?d=ib(m+b*D,0):x===aa[Ya]?d=ib(m,da+b*D):k||x!==aa[Ja]&&x!==aa[fb]?d+=x*D:d=ib(m,da,h+b*D*(x===aa[Ja]?1:7)),b++;e.push(d);A(vb(e,function(a){return x<=aa[Xa]&&a%aa[Ja]===ka}),function(a){f[a]=Ja})}e.info=n(a,{higherRanks:f,totalRange:x*D});return e}function cb(){this.symbol=this.color=0}function Da(a,b){var c=a.length,d,e;for(e=0;e<c;e++)a[e].ss_i=e;a.sort(function(a,
c){d=b(a,c);return 0===d?a.ss_i-c.ss_i:d});for(e=0;e<c;e++)delete a[e].ss_i}function $(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function T(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);return c}function ea(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function U(a){jb||(jb=S(Oa));a&&jb.appendChild(a);jb.innerHTML=""}function h(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw c;na.console&&console.log(c)}function l(a){return parseFloat(a.toPrecision(14))}
function q(a,b){Pa=g(a,b.animation)}function v(){var a=qa.global.useUTC,b=a?"getUTC":"get",c=a?"setUTC":"set";ib=a?Date.UTC:function(a,b,c,k,m,r){return(new Date(a,b,g(c,1),g(k,0),g(m,0),g(r,0))).getTime()};qb=b+"Minutes";rb=b+"Hours";tb=b+"Day";Za=b+"Date";gb=b+"Month";hb=b+"FullYear";Db=c+"Minutes";Eb=c+"Hours";sb=c+"Date";Fb=c+"Month";Gb=c+"FullYear"}function P(){}function I(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;c||d||this.addLabel()}function u(a,b){this.axis=a;b&&(this.options=
b,this.id=b.id)}function Y(a,b,c,d,e,f){var k=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.total=null;this.points={};this.stack=e;this.percent="percent"===f;this.alignOptions={align:b.align||(k?c?"left":"right":"center"),verticalAlign:b.verticalAlign||(k?"middle":c?"bottom":"top"),y:g(b.y,k?4:c?14:-6),x:g(b.x,k?c?-6:6:0)};this.textAlign=b.textAlign||(k?c?"right":"left":"center")}function Ta(){this.init.apply(this,arguments)}function oa(){this.init.apply(this,arguments)}
function sa(a,b){this.init(a,b)}function wb(a,b){this.init(a,b)}function xb(){this.init.apply(this,arguments)}var K,X=document,na=window,ua=Math,L=ua.round,ra=ua.floor,La=ua.ceil,H=ua.max,W=ua.min,ha=ua.abs,wa=ua.cos,Ea=ua.sin,Ua=ua.PI,$a=2*Ua/360,Qa=navigator.userAgent,Hb=na.opera,Ia=/msie/i.test(Qa)&&!Hb,kb=8===X.documentMode,lb=/AppleWebKit/.test(Qa),mb=/Firefox/.test(Qa),Ib=/(Mobile|Android|Windows Phone)/.test(Qa),Ma="http://www.w3.org/2000/svg",za=!!X.createElementNS&&!!X.createElementNS(Ma,
"svg").createSVGRect,Ob=mb&&4>parseInt(Qa.split("Firefox/")[1],10),Aa=!za&&!Ia&&!!X.createElement("canvas").getContext,ab,nb=X.documentElement.ontouchstart!==K,Jb={},yb=0,jb,qa,db,Pa,zb,aa,Na=function(){},Ra=[],Oa="div",va="none",Kb="rgba(192,192,192,"+(za?1E-4:0.002)+")",Cb="millisecond",pb="second",eb="minute",Xa="hour",Ja="day",fb="week",Ya="month",Ka="year",Lb="stroke-width",ib,qb,rb,tb,Za,gb,hb,Db,Eb,sb,Fb,Gb,Ba={};na.Highcharts=na.Highcharts?h(16,!0):{};db=function(a,b,c){if(!s(b)||isNaN(b))return"Invalid date";
a=g(a,"%Y-%m-%d %H:%M:%S");var d=new Date(b),e,f=d[rb](),k=d[tb](),m=d[Za](),r=d[gb](),x=d[hb](),D=qa.lang,da=D.weekdays,d=n({a:da[k].substr(0,3),A:da[k],d:Z(m),e:m,b:D.shortMonths[r],B:D.months[r],m:Z(r+1),y:x.toString().substr(2,2),Y:x,H:Z(f),I:Z(f%12||12),l:f%12||12,M:Z(d[qb]()),p:12>f?"AM":"PM",P:12>f?"am":"pm",S:Z(d.getSeconds()),L:Z(L(b%1E3),3)},Highcharts.dateFormats);for(e in d)for(;-1!==a.indexOf("%"+e);)a=a.replace("%"+e,"function"===typeof d[e]?d[e](b):d[e]);return c?a.substr(0,1).toUpperCase()+
a.substr(1):a};cb.prototype={wrapColor:function(a){this.color>=a&&(this.color=0)},wrapSymbol:function(a){this.symbol>=a&&(this.symbol=0)}};aa=function(){for(var a=0,b=arguments,c=b.length,d={};a<c;a++)d[b[a++]]=b[a];return d}(Cb,1,pb,1E3,eb,6E4,Xa,36E5,Ja,864E5,fb,6048E5,Ya,26784E5,Ka,31556952E3);zb={init:function(a,b,c){b=b||"";var d=a.shift,e=-1<b.indexOf("C"),f=e?7:3,k;b=b.split(" ");c=[].concat(c);var m,r,x=function(a){for(k=a.length;k--;)"M"===a[k]&&a.splice(k+1,0,a[k+1],a[k+2],a[k+1],a[k+2])};
e&&(x(b),x(c));a.isArea&&(m=b.splice(b.length-6,6),r=c.splice(c.length-6,6));if(d<=c.length/f)for(;d--;)c=[].concat(c).splice(0,f).concat(c);a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=[].concat(b).splice(b.length-f,f),e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),b=b.concat(d);m&&(b=b.concat(m),c=c.concat(r));return[b,c]},step:function(a,b,c,d){var e=[],f=a.length;if(1===c)e=d;else if(f===b.length&&1>c)for(;f--;)d=parseFloat(a[f]),e[f]=isNaN(d)?a[f]:c*parseFloat(b[f]-d)+d;else e=b;return e}};(function(a){na.HighchartsAdapter=
na.HighchartsAdapter||a&&{init:function(b){var c=a.fx,d=c.step,e,f=a.Tween,k=f&&f.propHooks;e=a.cssHooks.opacity;a.extend(a.easing,{easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c}});a.each(["cur","_default","width","height","opacity"],function(a,b){var e=d,D,da;"cur"===b?e=c.prototype:"_default"===b&&f&&(e=k[b],b="set");(D=e[b])&&(e[b]=function(c){c=a?c:this;da=c.elem;return da.attr?da.attr(c.prop,"cur"===b?K:c.now):D.apply(this,arguments)})});G(e,"get",function(a,b,c){return b.attr?b.opacity||
0:a.call(this,b,c)});e=function(a){var c=a.elem,d;a.started||(d=b.init(c,c.d,c.toD),a.start=d[0],a.end=d[1],a.started=!0);c.attr("d",b.step(a.start,a.end,a.pos,c.toD))};f?k.d={set:e}:d.d=e;this.each=Array.prototype.forEach?function(a,b){return Array.prototype.forEach.call(a,b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(!1===b.call(a[c],a[c],c,a))return c};a.fn.highcharts=function(){var a="Chart",b=arguments,c,d;Q(b[0])&&(a=b[0],b=Array.prototype.slice.call(b,1));c=b[0];c!==K&&(c.chart=c.chart||
{},c.chart.renderTo=this[0],new Highcharts[a](c,b[1]),d=this);c===K&&(d=Ra[F(this[0],"data-highcharts-chart")]);return d}},getScript:a.getScript,inArray:a.inArray,adapterRun:function(b,c){return a(b)[c]()},grep:a.grep,map:function(a,c){for(var d=[],e=0,f=a.length;e<f;e++)d[e]=c.call(a[e],a[e],e,a);return d},offset:function(b){return a(b).offset()},addEvent:function(b,c,d){a(b).bind(c,d)},removeEvent:function(b,c,d){var e=X.removeEventListener?"removeEventListener":"detachEvent";X[e]&&b&&!b[e]&&(b[e]=
function(){});a(b).unbind(c,d)},fireEvent:function(b,c,d,e){var f=a.Event(c),k="detached"+c,m;!Ia&&d&&(delete d.layerX,delete d.layerY);n(f,d);b[c]&&(b[k]=b[c],b[c]=null);a.each(["preventDefault","stopPropagation"],function(a,b){var c=f[b];f[b]=function(){try{c.call(f)}catch(a){"preventDefault"===b&&(m=!0)}}});a(b).trigger(f);b[k]&&(b[c]=b[k],b[k]=null);e&&!f.isDefaultPrevented()&&!m&&e(f)},washMouseEvent:function(a){var c=a.originalEvent||a;c.pageX===K&&(c.pageX=a.pageX,c.pageY=a.pageY);return c},
animate:function(b,c,d){var e=a(b);b.style||(b.style={});c.d&&(b.toD=c.d,c.d=1);e.stop();c.opacity!==K&&b.attr&&(c.opacity+="px");e.animate(c,d)},stop:function(b){a(b).stop()}}})(na.jQuery);var xa=na.HighchartsAdapter,fa=xa||{};xa&&xa.init.call(xa,zb);var ob=fa.adapterRun,Pb=fa.getScript,Ga=fa.inArray,A=fa.each,vb=fa.grep,Qb=fa.offset,Va=fa.map,la=fa.addEvent,Ca=fa.removeEvent,ba=fa.fireEvent,Mb=fa.washMouseEvent,Ab=fa.animate,bb=fa.stop,fa={enabled:!0,x:0,y:15,style:{color:"#666",cursor:"default",
fontSize:"11px",lineHeight:"14px"}};qa={colors:"#2f7ed8 #0d233a #8bbc21 #910000 #1aadce #492970 #f28f43 #77a1e5 #c42525 #a6c96a".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",
numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:!0,canvasToolsURL:"http://code.highcharts.com/3.0.5/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/3.0.5/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:5,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacingTop:10,spacingRight:10,spacingBottom:15,spacingLeft:10,style:{fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
fontSize:"12px"},backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#274b6d",fontSize:"16px"}},subtitle:{text:"",align:"center",style:{color:"#4d759e"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,marker:{enabled:!0,lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0},select:{fillColor:"#FFFFFF",
lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:w(fa,{align:"center",enabled:!1,formatter:function(){return null===this.y?"":p(this.y,-1)},verticalAlign:"bottom",y:0}),cropThreshold:300,pointRange:0,showInLegend:!0,states:{hover:{marker:{}},select:{marker:{}}},stickyTracking:!0}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderWidth:1,borderColor:"#909090",borderRadius:5,navigation:{activeColor:"#274b6d",
inactiveColor:"#CCC"},shadow:!1,itemStyle:{cursor:"pointer",color:"#274b6d",fontSize:"12px"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolWidth:16,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"1em"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:za,
backgroundColor:"rgba(255, 255, 255, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',shadow:!0,snap:Ib?25:10,style:{color:"#333333",cursor:"default",
fontSize:"12px",padding:"8px",whiteSpace:"nowrap"}},credits:{enabled:!0,text:"Highcharts.com",href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};var ya=qa.plotOptions,xa=ya.line;v();var Ha=function(a){var b=[],c,d;(function(a){a&&a.stops?d=Va(a.stops,function(a){return Ha(a[1])}):(c=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a))?b=[y(c[1]),y(c[2]),
y(c[3]),parseFloat(c[4],10)]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))?b=[y(c[1],16),y(c[2],16),y(c[3],16),1]:(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))&&(b=[y(c[1]),y(c[2]),y(c[3]),1])})(a);return{get:function(c){var f;d?(f=w(a),f.stops=[].concat(f.stops),A(d,function(a,b){f.stops[b]=[f.stops[b][0],a.get(c)]})):f=b&&!isNaN(b[0])?"rgb"===c?"rgb("+b[0]+","+b[1]+","+b[2]+")":"a"===c?b[3]:"rgba("+b.join(",")+")":a;return f},brighten:function(a){if(d)A(d,
function(b){b.brighten(a)});else if(M(a)&&0!==a){var c;for(c=0;3>c;c++)b[c]+=y(255*a),0>b[c]&&(b[c]=0),255<b[c]&&(b[c]=255)}return this},rgba:b,setOpacity:function(a){b[3]=a;return this}}};P.prototype={init:function(a,b){this.element="span"===b?S(b):X.createElementNS(Ma,b);this.renderer=a;this.attrSetters={}},opacity:1,animate:function(a,b,c){b=g(b,Pa,!0);bb(this);b?(b=w(b),c&&(b.complete=c),Ab(this,a,b)):(this.attr(a),c&&c())},attr:function(a,b){var c,d,e,f,k=this.element,m=k.nodeName.toLowerCase(),
r=this.renderer,x,D=this.attrSetters,da=this.shadows,h,ka,E=this;Q(a)&&s(b)&&(c=a,a={},a[c]=b);if(Q(a))c=a,"circle"===m?c={x:"cx",y:"cy"}[c]||c:"strokeWidth"===c&&(c="stroke-width"),E=F(k,c)||this[c]||0,"d"!==c&&"visibility"!==c&&(E=parseFloat(E));else{for(c in a)if(x=!1,d=a[c],e=D[c]&&D[c].call(this,d,c),!1!==e){e!==K&&(d=e);if("d"===c)d&&d.join&&(d=d.join(" ")),/(NaN| {2}|^$)/.test(d)&&(d="M 0 0");else if("x"===c&&"text"===m)for(e=0;e<k.childNodes.length;e++)f=k.childNodes[e],F(f,"x")===F(k,"x")&&
F(f,"x",d);else if(!this.rotation||"x"!==c&&"y"!==c)if("fill"===c)d=r.color(d,k,c);else if("circle"!==m||"x"!==c&&"y"!==c)if("rect"===m&&"r"===c)F(k,{rx:d,ry:d}),x=!0;else if("translateX"===c||"translateY"===c||"rotation"===c||"verticalAlign"===c||"scaleX"===c||"scaleY"===c)x=ka=!0;else if("stroke"===c)d=r.color(d,k,c);else if("dashstyle"===c)if(c="stroke-dasharray",d=d&&d.toLowerCase(),"solid"===d)d=va;else{if(d){d=d.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot",
"1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(e=d.length;e--;)d[e]=y(d[e])*g(a["stroke-width"],this["stroke-width"]);d=d.join(",")}}else"width"===c?d=y(d):"align"===c?(c="text-anchor",d={left:"start",center:"middle",right:"end"}[d]):"title"===c&&((e=k.getElementsByTagName("title")[0])||(e=X.createElementNS(Ma,"title"),k.appendChild(e)),e.textContent=d);else c={x:"cx",y:"cy"}[c]||c;else ka=!0;"strokeWidth"===
c&&(c="stroke-width");if("stroke-width"===c||"stroke"===c)this[c]=d,this.stroke&&this["stroke-width"]?(F(k,"stroke",this.stroke),F(k,"stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===c&&0===d&&this.hasStroke&&(k.removeAttribute("stroke"),this.hasStroke=!1),x=!0;this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c)&&(h||(this.symbolAttr(a),h=!0),x=!0);if(da&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c))for(e=da.length;e--;)F(da[e],
c,"height"===c?H(d-(da[e].cutHeight||0),0):d);("width"===c||"height"===c)&&"rect"===m&&0>d&&(d=0);this[c]=d;"text"===c?(d!==this.textStr&&delete this.bBox,this.textStr=d,this.added&&r.buildText(this)):x||F(k,c,d)}ka&&this.updateTransform()}return E},addClass:function(a){var b=this.element,c=F(b,"class")||"";-1===c.indexOf(a)&&F(b,"class",c+" "+a);return this},symbolAttr:function(a){var b=this;A("x y r start end width height innerR anchorX anchorY".split(" "),function(c){b[c]=g(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,
b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":va)},crisp:function(a,b,c,d,e){var f,k={},m={},r;a=a||this.strokeWidth||this.attr&&this.attr("stroke-width")||0;r=L(a)%2/2;m.x=ra(b||this.x||0)+r;m.y=ra(c||this.y||0)+r;m.width=ra((d||this.width||0)-2*r);m.height=ra((e||this.height||0)-2*r);m.strokeWidth=a;for(f in m)this[f]!==m[f]&&(this[f]=k[f]=m[f]);return k},css:function(a){var b=this.element,c=a&&a.width&&"text"===b.nodeName.toLowerCase(),
d,e="",f=function(a,b){return"-"+b.toLowerCase()};a&&a.color&&(a.fill=a.color);this.styles=a=n(this.styles,a);Aa&&c&&delete a.width;if(Ia&&!za)c&&delete a.width,t(this.element,a);else{for(d in a)e+=d.replace(/([A-Z])/g,f)+":"+a[d]+";";F(b,"style",e)}c&&this.added&&this.renderer.buildText(this);return this},on:function(a,b){var c=this.element;nb&&"click"===a&&(c.ontouchstart=function(a){a.preventDefault();b.call(c,a)});c["on"+a]=b;return this},setRadialReference:function(a){this.element.radialReference=
a;return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();this.styles=n(this.styles,a);t(this.element,a);return this},htmlGetBBox:function(){var a=this.element,b=this.bBox;b||("text"===a.nodeName&&(a.style.position="absolute"),b=this.bBox={x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,
height:a.offsetHeight});return b},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,e=this.x||0,f=this.y||0,k=this.textAlign||"left",m={left:0,center:0.5,right:1}[k],r=k&&"left"!==k,x=this.shadows;t(b,{marginLeft:c,marginTop:d});x&&A(x,function(a){t(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&A(b.childNodes,function(c){a.invertChild(c,b)});if("SPAN"===b.tagName){var D,da,x=this.rotation,h;D=0;var ka=1,E=0,l;h=y(this.textWidth);
var q=this.xCorr||0;l=this.yCorr||0;var v=[x,k,b.innerHTML,this.textWidth].join();v!==this.cTT&&(s(x)&&(D=x*$a,ka=wa(D),E=Ea(D),this.setSpanRotation(x,E,ka)),D=g(this.elemWidth,b.offsetWidth),da=g(this.elemHeight,b.offsetHeight),D>h&&/[ \-]/.test(b.textContent||b.innerText)&&(t(b,{width:h+"px",display:"block",whiteSpace:"normal"}),D=h),h=a.fontMetrics(b.style.fontSize).b,l=0>ka*E,q=(0>ka&&-D)+E*h*(l?1-m:m),l=(0>E&&-da)-ka*h*(x?l?m:1-m:1),r&&(q-=D*m*(0>ka?-1:1),x&&(l-=da*m*(0>E?-1:1)),t(b,{textAlign:k})),
this.xCorr=q,this.yCorr=l);t(b,{left:e+q+"px",top:f+l+"px"});lb&&(da=b.offsetHeight);this.cTT=v}}else this.alignOnAdd=!0},setSpanRotation:function(a){var b={};b[Ia?"-ms-transform":lb?"-webkit-transform":mb?"MozTransform":Hb?"-o-transform":""]=b.transform="rotate("+a+"deg)";t(this.element,b)},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,c=this.scaleX,d=this.scaleY,e=this.inverted,f=this.rotation;e&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];
e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+(this.x||0)+" "+(this.y||0)+")");(s(c)||s(d))&&a.push("scale("+g(c,1)+" "+g(d,1)+")");a.length&&F(this.element,"transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){var d,e,f,k,m={};e=this.renderer;f=e.alignedObjects;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!c||Q(c))this.alignTo=d=c||"renderer",O(f,this),f.push(this),c=null}else a=this.alignOptions,b=this.alignByTranslate,
d=this.alignTo;c=g(c,e[d],e);d=a.align;e=a.verticalAlign;f=(c.x||0)+(a.x||0);k=(c.y||0)+(a.y||0);if("right"===d||"center"===d)f+=(c.width-(a.width||0))/{right:1,center:2}[d];m[b?"translateX":"x"]=L(f);if("bottom"===e||"middle"===e)k+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||1);m[b?"translateY":"y"]=L(k);this[this.placed?"animate":"attr"](m);this.placed=!0;this.alignAttr=m;return this},getBBox:function(){var a=this.bBox,b=this.renderer,c,d=this.rotation;c=this.element;var e=this.styles,f=
d*$a;if(!a){if(c.namespaceURI===Ma||b.forExport){try{a=c.getBBox?n({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight}}catch(k){}if(!a||0>a.width)a={width:0,height:0}}else a=this.htmlGetBBox();b.isSVG&&(b=a.width,c=a.height,Ia&&e&&"11px"===e.fontSize&&"22.7"===c.toPrecision(3)&&(a.height=c=14),d&&(a.width=ha(c*Ea(f))+ha(b*wa(f)),a.height=ha(c*wa(f))+ha(b*Ea(f))));this.bBox=a}return a},show:function(){return this.attr({visibility:"visible"})},hide:function(){return this.attr({visibility:"hidden"})},
fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.hide()}})},add:function(a){var b=this.renderer,c=a||b,d=c.element||b.box,e=d.childNodes,f=this.element,k=F(f,"zIndex"),m;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&b.buildText(this);k&&(c.handleZ=!0,k=y(k));if(c.handleZ)for(c=0;c<e.length;c++)if(a=e[c],b=F(a,"zIndex"),a!==f&&(y(b)>k||!s(k)&&s(b))){d.insertBefore(f,a);m=!0;break}m||d.appendChild(f);this.added=!0;ba(this,
"add");return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&"SPAN"===b.nodeName&&b.parentNode,e,f;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;bb(a);a.clipPath&&(a.clipPath=a.clipPath.destroy());if(a.stops){for(f=0;f<a.stops.length;f++)a.stops[f]=a.stops[f].destroy();a.stops=null}a.safeRemoveChild(b);for(c&&A(c,function(b){a.safeRemoveChild(b)});d&&0===d.childNodes.length;)b=
d.parentNode,a.safeRemoveChild(d),d=b;a.alignTo&&O(a.renderer.alignedObjects,a);for(e in a)delete a[e];return null},shadow:function(a,b,c){var d=[],e,f,k=this.element,m,r,x,D;if(a){r=g(a.width,3);x=(a.opacity||0.15)/r;D=this.parentInverted?"(-1,-1)":"("+g(a.offsetX,1)+", "+g(a.offsetY,1)+")";for(e=1;e<=r;e++)f=k.cloneNode(0),m=2*r+1-2*e,F(f,{isShadow:"true",stroke:a.color||"black","stroke-opacity":x*e,"stroke-width":m,transform:"translate"+D,fill:va}),c&&(F(f,"height",H(F(f,"height")-m,0)),f.cutHeight=
m),b?b.element.appendChild(f):k.parentNode.insertBefore(f,k),d.push(f);this.shadows=d}return this}};var Sa=function(){this.init.apply(this,arguments)};Sa.prototype={Element:P,init:function(a,b,c,d){var e=location,f,k;f=this.createElement("svg").attr({version:"1.1"});k=f.element;a.appendChild(k);-1===a.innerHTML.indexOf("xmlns")&&F(k,"xmlns",Ma);this.isSVG=!0;this.box=k;this.boxWrapper=f;this.alignedObjects=[];this.url=(mb||lb)&&X.getElementsByTagName("base").length?e.href.replace(/#.*?$/,"").replace(/([\('\)])/g,
"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(X.createTextNode("Created with Highcharts 3.0.5"));this.defs=this.createElement("defs").add();this.forExport=d;this.gradients={};this.setSize(b,c,!1);var m;mb&&a.getBoundingClientRect&&(this.subPixelFix=b=function(){t(a,{left:0,top:0});m=a.getBoundingClientRect();t(a,{left:La(m.left)-m.left+"px",top:La(m.top)-m.top+"px"})},b(),la(na,"resize",b))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=
this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();ea(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.subPixelFix&&Ca(na,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:function(){},buildText:function(a){for(var b=a.element,c=this,d=c.forExport,e=g(a.textStr,"").toString().replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,
"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g),f=b.childNodes,k=/style="([^"]+)"/,m=/href="(http[^"]+)"/,r=F(b,"x"),x=a.styles,D=x&&x.width&&y(x.width),da=x&&x.lineHeight,h=f.length;h--;)b.removeChild(f[h]);D&&!a.added&&this.box.appendChild(b);""===e[e.length-1]&&e.pop();A(e,function(e,f){var h,ub=0;e=e.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");h=e.split("|||");A(h,function(e){if(""!==e||1===h.length){var g={},l=X.createElementNS(Ma,"tspan"),ka;k.test(e)&&
(ka=e.match(k)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),F(l,"style",ka));m.test(e)&&!d&&(F(l,"onclick",'location.href="'+e.match(m)[1]+'"'),t(l,{cursor:"pointer"}));e=(e.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");if(" "!==e&&(l.appendChild(X.createTextNode(e)),ub?g.dx=0:g.x=r,F(l,g),!ub&&f&&(!za&&d&&t(l,{display:"block"}),F(l,"dy",da||c.fontMetrics(/px$/.test(l.style.fontSize)?l.style.fontSize:x.fontSize).h,lb&&l.offsetHeight)),b.appendChild(l),ub++,D)){e=e.replace(/([^\^])-/g,
"$1- ").split(" ");for(var q,v=[];e.length||v.length;)delete a.bBox,q=a.getBBox().width,(g=q>D)&&1!==e.length?(l.removeChild(l.firstChild),v.unshift(e.pop())):(e=v,v=[],e.length&&(l=X.createElementNS(Ma,"tspan"),F(l,{dy:da||16,x:r}),ka&&F(l,"style",ka),b.appendChild(l),q>D&&(D=q))),e.length&&l.appendChild(X.createTextNode(e.join(" ").replace(/- /g,"-")))}}})})},button:function(a,b,c,d,e,f,k,m){var r=this.label(a,b,c,null,null,null,null,null,"button"),x=0,D,da,h,l,E,g;a={x1:0,y1:0,x2:0,y2:1};e=w({"stroke-width":1,
stroke:"#CCCCCC",fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},e);h=e.style;delete e.style;f=w(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},f);l=f.style;delete f.style;k=w(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},k);E=k.style;delete k.style;m=w(e,{style:{color:"#CCC"}},m);g=m.style;delete m.style;la(r.element,Ia?"mouseover":"mouseenter",function(){3!==x&&r.attr(f).css(l)});la(r.element,Ia?
"mouseout":"mouseleave",function(){3!==x&&(D=[e,f,k][x],da=[h,l,E][x],r.attr(D).css(da))});r.setState=function(a){(r.state=x=a)?2===a?r.attr(k).css(E):3===a&&r.attr(m).css(g):r.attr(e).css(h)};return r.on("click",function(){3!==x&&d.call(r)}).attr(e).css(n({cursor:"default"},h))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=L(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=L(a[2])+b%2/2);return a},path:function(a){var b={fill:va};N(a)?b.d=a:z(a)&&n(b,a);return this.createElement("path").attr(b)},circle:function(a,
b,c){a=z(a)?a:{x:a,y:b,r:c};return this.createElement("circle").attr(a)},arc:function(a,b,c,d,e,f){z(a)&&(b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x);a=this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:e||0,end:f||0});a.r=c;return a},rect:function(a,b,c,d,e,f){e=z(a)?a.r:e;e=this.createElement("rect").attr({rx:e,ry:e,fill:va});return e.attr(z(a)?a:e.crisp(f,a,b,H(c,0),H(d,0)))},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[g(c,
!0)?"animate":"attr"]({width:a,height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");return s(a)?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,e){var f={preserveAspectRatio:va};1<arguments.length&&n(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e,f){var k,m=this.symbols[a],m=m&&m(L(b),
L(c),d,e,f),r=/^url\((.*?)\)$/,x,D;m?(k=this.path(m),n(k,{symbolName:a,x:b,y:c,width:d,height:e}),f&&n(k,f)):r.test(a)&&(D=function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(L((d-b[0])/2),L((e-b[1])/2)))},x=a.match(r)[1],a=Jb[x],k=this.image(x).attr({x:b,y:c}),k.isImg=!0,a?D(k,a):(k.attr({width:0,height:0}),S("img",{onload:function(){D(k,Jb[x]=[this.width,this.height])},src:x})));return k},symbols:{circle:function(a,b,c,d){var e=0.166*c;return["M",a+c/2,b,"C",
a+c+e,b,a+c+e,b+d,a+c/2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"]},arc:function(a,b,c,d,e){var f=e.start;c=e.r||c||d;var k=e.end-0.001;d=e.innerR;var m=e.open,r=wa(f),x=Ea(f),D=wa(k),k=Ea(k);e=e.end-f<Ua?0:1;return["M",
a+c*r,b+c*x,"A",c,c,0,e,1,a+c*D,b+c*k,m?"M":"L",a+d*D,b+d*k,"A",d,d,0,e,0,a+d*r,b+d*x,m?"":"Z"]}},clipRect:function(a,b,c,d){var e="highcharts-"+yb++,f=this.createElement("clipPath").attr({id:e}).add(this.defs);a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;return a},color:function(a,b,c){var d=this,e,f=/^rgba/,k,m,r,x,D,h,l,g=[];a&&a.linearGradient?k="linearGradient":a&&a.radialGradient&&(k="radialGradient");if(k){c=a[k];m=d.gradients;x=a.stops;b=b.radialReference;N(c)&&(a[k]=c={x1:c[0],y1:c[1],
x2:c[2],y2:c[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===k&&b&&!s(c.gradientUnits)&&(c=w(c,{cx:b[0]-b[2]/2+c.cx*b[2],cy:b[1]-b[2]/2+c.cy*b[2],r:c.r*b[2],gradientUnits:"userSpaceOnUse"}));for(l in c)"id"!==l&&g.push(l,c[l]);for(l in x)g.push(x[l]);g=g.join(",");m[g]?a=m[g].id:(c.id=a="highcharts-"+yb++,m[g]=r=d.createElement(k).attr(c).add(d.defs),r.stops=[],A(x,function(a){f.test(a[1])?(e=Ha(a[1]),D=e.get("rgb"),h=e.get("a")):(D=a[1],h=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":D,
"stop-opacity":h}).add(r);r.stops.push(a)}));return"url("+d.url+"#"+a+")"}return f.test(a)?(e=Ha(a),F(b,c+"-opacity",e.get("a")),e.get("rgb")):(b.removeAttribute(c+"-opacity"),a)},text:function(a,b,c,d){var e=qa.chart.style,f=Aa||!za&&this.forExport;if(d&&!this.forExport)return this.html(a,b,c);b=L(g(b,0));c=L(g(c,0));a=this.createElement("text").attr({x:b,y:c,text:a}).css({fontFamily:e.fontFamily,fontSize:e.fontSize});f&&a.css({position:"absolute"});a.x=b;a.y=c;return a},html:function(a,b,c){var d=
qa.chart.style,e=this.createElement("span"),f=e.attrSetters,k=e.element,m=e.renderer;f.text=function(a){a!==k.innerHTML&&delete this.bBox;k.innerHTML=a;return!1};f.x=f.y=f.align=function(a,b){"align"===b&&(b="textAlign");e[b]=a;e.htmlUpdateTransform();return!1};e.attr({text:a,x:L(b),y:L(c)}).css({position:"absolute",whiteSpace:"nowrap",fontFamily:d.fontFamily,fontSize:d.fontSize});e.css=e.htmlCss;m.isSVG&&(e.add=function(a){var b,c=m.box.parentNode,d=[];if(a){if(b=a.div,!b){for(;a;)d.push(a),a=a.parentGroup;
A(d.reverse(),function(a){var d;b=a.div=a.div||S(Oa,{className:F(a.element,"class")},{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px"},b||c);d=b.style;n(a.attrSetters,{translateX:function(a){d.left=a+"px"},translateY:function(a){d.top=a+"px"},visibility:function(a,b){d[b]=a}})})}}else b=c;b.appendChild(k);e.added=!0;e.alignOnAdd&&e.htmlUpdateTransform();return e});return e},fontMetrics:function(a){a=y(a||11);a=24>a?a+4:L(1.2*a);var b=L(0.8*a);return{h:a,b:b}},label:function(a,
b,c,d,e,f,k,m,r){function x(){var a,b;a=q.element.style;p=(void 0===B||void 0===Y||E.styles.textAlign)&&q.getBBox();E.width=(B||p.width||0)+2*I+t;E.height=(Y||p.height||0)+2*I;sa=I+g.fontMetrics(a&&a.fontSize).b;H&&(v||(a=L(-u*I),b=m?-sa:0,E.box=v=d?g.symbol(d,a,b,E.width,E.height):g.rect(a,b,E.width,E.height,0,C[Lb]),v.add(E)),v.isImg||v.attr(w({width:E.width,height:E.height},C)),C=null)}function D(){var a=E.styles,a=a&&a.textAlign,b=t+I*(1-u),c;c=m?0:sa;!s(B)||"center"!==a&&"right"!==a||(b+={center:0.5,
right:1}[a]*(B-p.width));b===q.x&&c===q.y||q.attr({x:b,y:c});q.x=b;q.y=c}function h(a,b){v?v.attr(a,b):C[a]=b}function l(){q.add(E);E.attr({text:a,x:b,y:c});v&&s(e)&&E.attr({anchorX:e,anchorY:f})}var g=this,E=g.g(r),q=g.text("",0,0,k).attr({zIndex:1}),v,p,u=0,I=3,t=0,B,Y,Bb,z,G=0,C={},sa;k=E.attrSetters;var H;la(E,"add",l);k.width=function(a){B=a;return!1};k.height=function(a){Y=a;return!1};k.padding=function(a){s(a)&&a!==I&&(I=a,D());return!1};k.paddingLeft=function(a){s(a)&&a!==t&&(t=a,D());return!1};
k.align=function(a){u={left:0,center:0.5,right:1}[a];return!1};k.text=function(a,b){q.attr(b,a);x();D();return!1};k[Lb]=function(a,b){H=!0;G=a%2/2;h(b,a);return!1};k.stroke=k.fill=k.r=function(a,b){"fill"===b&&(H=!0);h(b,a);return!1};k.anchorX=function(a,b){e=a;h(b,a+G-Bb);return!1};k.anchorY=function(a,b){f=a;h(b,a-z);return!1};k.x=function(a){E.x=a;a-=u*((B||p.width)+I);Bb=L(a);E.attr("translateX",Bb);return!1};k.y=function(a){z=E.y=L(a);E.attr("translateY",z);return!1};var y=E.css;return n(E,{css:function(a){if(a){var b=
{};a=w(a);A("fontSize fontWeight fontFamily color lineHeight width textDecoration textShadow".split(" "),function(c){a[c]!==K&&(b[c]=a[c],delete a[c])});q.css(b)}return y.call(E,a)},getBBox:function(){return{width:p.width+2*I,height:p.height+2*I,x:p.x-I,y:p.y-I}},shadow:function(a){v&&v.shadow(a);return E},destroy:function(){Ca(E,"add",l);Ca(E.element,"mouseenter");Ca(E.element,"mouseleave");q&&(q=q.destroy());v&&(v=v.destroy());P.prototype.destroy.call(E);E=g=x=D=h=l=null}})}};ab=Sa;var ma;if(!za&&
!Aa){Highcharts.VMLElement=ma={init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],e=b===Oa;("shape"===b||e)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",e?"hidden":"visible");c.push(' style="',d.join(""),'"/>');b&&(c=e||"span"===b||"img"===b?c.join(""):a.prepVML(c),this.element=S(c));this.renderer=a;this.attrSetters={}},add:function(a){var b=this.renderer,c=this.element,d=b.box,d=a?a.element||a:d;a&&a.inverted&&b.invertChild(c,d);d.appendChild(c);
this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();ba(this,"add");return this},updateTransform:P.prototype.htmlUpdateTransform,setSpanRotation:function(a,b,c){t(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",c,", M12=",-b,", M21=",b,", M22=",c,", sizingMethod='auto expand')"].join(""):va})},pathToVML:function(a){for(var b=a.length,c=[],d;b--;)M(a[b])?c[b]=L(10*a[b])-5:"Z"===a[b]?c[b]="x":(c[b]=a[b],!a.isArc||"wa"!==a[b]&&"at"!==a[b])||(d="wa"===
a[b]?1:-1,c[b+5]===c[b+7]&&(c[b+7]-=d),c[b+6]===c[b+8]&&(c[b+8]-=d));return c.join(" ")||"x"},attr:function(a,b){var c,d,e,f=this.element||{},k=f.style,m=f.nodeName,r=this.renderer,x=this.symbolName,D,h=this.shadows,l,g=this.attrSetters,q=this;Q(a)&&s(b)&&(c=a,a={},a[c]=b);if(Q(a))c=a,q="strokeWidth"===c||"stroke-width"===c?this.strokeweight:this[c];else for(c in a)if(d=a[c],l=!1,e=g[c]&&g[c].call(this,d,c),!1!==e&&null!==d){e!==K&&(d=e);if(x&&/^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(c))D||
(this.symbolAttr(a),D=!0),l=!0;else if("d"===c){d=d||[];this.d=d.join(" ");f.path=d=this.pathToVML(d);if(h)for(e=h.length;e--;)h[e].path=h[e].cutOff?this.cutOffPath(d,h[e].cutOff):d;l=!0}else if("visibility"===c){if(h)for(e=h.length;e--;)h[e].style[c]=d;"DIV"===m&&(d="hidden"===d?"-999em":0,kb||(k[c]=d?"visible":"hidden"),c="top");k[c]=d;l=!0}else"zIndex"===c?(d&&(k[c]=d),l=!0):-1!==Ga(c,["x","y","width","height"])?(this[c]=d,"x"===c||"y"===c?c={x:"left",y:"top"}[c]:d=H(0,d),this.updateClipping?(this[c]=
d,this.updateClipping()):k[c]=d,l=!0):"class"===c&&"DIV"===m?f.className=d:"stroke"===c?(d=r.color(d,f,c),c="strokecolor"):"stroke-width"===c||"strokeWidth"===c?(f.stroked=d?!0:!1,c="strokeweight",this[c]=d,M(d)&&(d+="px")):"dashstyle"===c?((f.getElementsByTagName("stroke")[0]||S(r.prepVML(["<stroke/>"]),null,null,f))[c]=d||"solid",this.dashstyle=d,l=!0):"fill"===c?"SPAN"===m?k.color=d:"IMG"!==m&&(f.filled=d!==va?!0:!1,d=r.color(d,f,c,this),c="fillcolor"):"opacity"===c?l=!0:"shape"===m&&"rotation"===
c?(this[c]=f.style[c]=d,f.style.left=-L(Ea(d*$a)+1)+"px",f.style.top=L(wa(d*$a))+"px"):"translateX"===c||"translateY"===c||"rotation"===c?(this[c]=d,this.updateTransform(),l=!0):"text"===c&&(this.bBox=null,f.innerHTML=d,l=!0);l||(kb?f[c]=d:F(f,c,d))}return q},clip:function(a){var b=this,c;a?(c=a.members,O(c,b),c.push(b),b.destroyClip=function(){O(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:kb?"inherit":"rect(auto)"});return b.css(a)},css:P.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&
U(a)},destroy:function(){this.destroyClip&&this.destroyClip();return P.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=na.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var c;a=a.split(/[ ,]/);c=a.length;if(9===c||11===c)a[c-4]=a[c-2]=y(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],e,f=this.element,k=this.renderer,m,r=f.style,x,D=f.path,h,l,q,E;D&&"string"!==typeof D.value&&(D="x");l=D;if(a){q=g(a.width,3);E=(a.opacity||
0.15)/q;for(e=1;3>=e;e++)h=2*q+1-2*e,c&&(l=this.cutOffPath(D.value,h+0.5)),x=['<shape isShadow="true" strokeweight="',h,'" filled="false" path="',l,'" coordsize="10 10" style="',f.style.cssText,'" />'],m=S(k.prepVML(x),null,{left:y(r.left)+g(a.offsetX,1),top:y(r.top)+g(a.offsetY,1)}),c&&(m.cutOff=h+1),x=['<stroke color="',a.color||"black",'" opacity="',E*e,'"/>'],S(k.prepVML(x),null,null,m),b?b.element.appendChild(m):f.parentNode.insertBefore(m,f),d.push(m);this.shadows=d}return this}};ma=ja(P,ma);
var Fa={Element:ma,isIE8:-1<Qa.indexOf("MSIE 8.0"),init:function(a,b,c){var d,e;this.alignedObjects=[];d=this.createElement(Oa);e=d.element;e.style.position="relative";a.appendChild(d.element);this.isVML=!0;this.box=e;this.boxWrapper=d;this.setSize(b,c,!1);X.namespaces.hcv||(X.namespaces.add("hcv","urn:schemas-microsoft-com:vml"),X.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ")},isHidden:function(){return!this.box.offsetWidth},
clipRect:function(a,b,c,d){var e=this.createElement(),f=z(a);return n(e,{members:[],left:(f?a.x:a)+1,top:(f?a.y:b)+1,width:(f?a.width:c)-1,height:(f?a.height:d)-1,getCSS:function(a){var b=a.element,c=b.nodeName;a=a.inverted;var d=this.top-("shape"===c?b.offsetTop:0),e=this.left,b=e+this.width,f=d+this.height,d={clip:"rect("+L(a?e:d)+"px,"+L(a?f:b)+"px,"+L(a?b:f)+"px,"+L(a?d:e)+"px)"};!a&&kb&&"DIV"===c&&n(d,{width:b+"px",height:f+"px"});return d},updateClipping:function(){A(e.members,function(a){a.css(e.getCSS(a))})}})},
color:function(a,b,c,d){var e=this,f,k=/^rgba/,m,r,x=va;a&&a.linearGradient?r="gradient":a&&a.radialGradient&&(r="pattern");if(r){var D,h,l=a.linearGradient||a.radialGradient,g,q,v,n,p,I="";a=a.stops;var u,P=[],s=function(){m=['<fill colors="'+P.join(",")+'" opacity="',v,'" o:opacity2="',q,'" type="',r,'" ',I,'focus="100%" method="any" />'];S(e.prepVML(m),null,null,b)};g=a[0];u=a[a.length-1];0<g[0]&&a.unshift([0,g[1]]);1>u[0]&&a.push([1,u[1]]);A(a,function(a,b){k.test(a[1])?(f=Ha(a[1]),D=f.get("rgb"),
h=f.get("a")):(D=a[1],h=1);P.push(100*a[0]+"% "+D);b?(v=h,n=D):(q=h,p=D)});if("fill"===c)if("gradient"===r)c=l.x1||l[0]||0,a=l.y1||l[1]||0,g=l.x2||l[2]||0,l=l.y2||l[3]||0,I='angle="'+(90-180*ua.atan((l-a)/(g-c))/Ua)+'"',s();else{var x=l.r,w=2*x,t=2*x,B=l.cx,Y=l.cy,z=b.radialReference,C,x=function(){z&&(C=d.getBBox(),B+=(z[0]-C.x)/C.width-0.5,Y+=(z[1]-C.y)/C.height-0.5,w*=z[2]/C.width,t*=z[2]/C.height);I='src="'+qa.global.VMLRadialGradientURL+'" size="'+w+","+t+'" origin="0.5,0.5" position="'+B+","+
Y+'" color2="'+p+'" ';s()};d.added?x():la(d,"add",x);x=n}else x=D}else k.test(a)&&"IMG"!==b.tagName?(f=Ha(a),m=["<",c,' opacity="',f.get("a"),'"/>'],S(this.prepVML(m),null,null,b),x=f.get("rgb")):(x=b.getElementsByTagName(c),x.length&&(x[0].opacity=1,x[0].type="solid"),x=a);return x},prepVML:function(a){var b=this.isIE8;a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=-1===a.indexOf('style="')?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):
a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:Sa.prototype.html,path:function(a){var b={coordsize:"10 10"};N(a)?b.d=a:z(a)&&n(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var d=this.symbol("circle");z(a)&&(c=a.r,b=a.y,a=a.x);d.isCircle=!0;return d.attr({x:a,y:b,width:2*c,height:2*c})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(Oa).attr(b)},
image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});1<arguments.length&&f.attr({x:b,y:c,width:d,height:e});return f},rect:function(a,b,c,d,e,f){var k=this.symbol("rect");k.r=z(a)?a.r:e;return k.attr(z(a)?a:k.crisp(f,a,b,H(c,0),H(d,0)))},invertChild:function(a,b){var c=b.style;t(a,{flip:"x",left:y(c.width)-1,top:y(c.height)-1,rotation:-90})},symbols:{arc:function(a,b,c,d,e){var f=e.start,k=e.end,m=e.r||c||d;c=e.innerR;d=wa(f);var r=Ea(f),x=wa(k),D=Ea(k);if(0===k-f)return["x"];f=
["wa",a-m,b-m,a+m,b+m,a+m*d,b+m*r,a+m*x,b+m*D];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*x,b+c*D,a+c*d,b+c*r,"x","e");f.isArc=!0;return f},circle:function(a,b,c,d,e){e&&e.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){var f=a+c,k=b+d,m;s(e)&&e.r?(m=W(e.r,c,d),f=["M",a+m,b,"L",f-m,b,"wa",f-2*m,b,f,b+2*m,f-m,b,f,b+m,"L",f,k-m,"wa",f-2*m,k-2*m,f,k,f,k-m,f-m,k,"L",a+m,k,"wa",a,k-2*m,a+2*m,k,a+m,k,a,k-m,"L",a,b+m,"wa",a,b,a+2*
m,b+2*m,a,b+m,a+m,b,"x","e"]):f=Sa.prototype.symbols.square.apply(0,arguments);return f}}};Highcharts.VMLRenderer=ma=function(){this.init.apply(this,arguments)};ma.prototype=w(Sa.prototype,Fa);ab=ma}var Nb;Aa&&(Highcharts.CanVGRenderer=ma=function(){Ma="http://www.w3.org/1999/xhtml"},ma.prototype.symbols={},Nb=function(){function a(){var a=b.length,d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){0===b.length&&Pb(d,a);b.push(c)}}}(),ab=ma);I.prototype={addLabel:function(){var a=this.axis,
b=a.options,c=a.chart,d=a.horiz,e=a.categories,f=a.series[0]&&a.series[0].names,k=this.pos,m=b.labels,r=a.tickPositions,d=d&&e&&!m.step&&!m.staggerLines&&!m.rotation&&c.plotWidth/r.length||!d&&(c.optionsMarginLeft||0.33*c.chartWidth),x=k===r[0],D=k===r[r.length-1],f=e?g(e[k],f&&f[k],k):k,e=this.label,r=r.info,h;a.isDatetimeAxis&&r&&(h=b.dateTimeLabelFormats[r.higherRanks[k]||r.unitName]);this.isFirst=x;this.isLast=D;b=a.labelFormatter.call({axis:a,chart:c,isFirst:x,isLast:D,dateTimeLabelFormat:h,
value:a.isLog?l(ca(f)):f});k=d&&{width:H(1,L(d-2*(m.padding||10)))+"px"};k=n(k,m.style);s(e)?e&&e.attr({text:b}).css(k):(d={align:a.labelAlign},M(m.rotation)&&(d.rotation=m.rotation),this.label=s(b)&&m.enabled?c.renderer.text(b,0,0,m.useHTML).attr(d).css(k).add(a.labelGroup):null)},getLabelSize:function(){var a=this.label,b=this.axis;return a?(this.labelBBox=a.getBBox())[b.horiz?"height":"width"]:0},getLabelSides:function(){var a=this.axis,b=this.labelBBox.width,a=b*{left:0,center:0.5,right:1}[a.labelAlign]-
a.options.labels.x;return[-a,b-a]},handleOverflow:function(a,b){var c=!0,d=this.axis,e=d.chart,f=this.isFirst,k=this.isLast,m=b.x,r=d.reversed,x=d.tickPositions;if(f||k){var D=this.getLabelSides(),h=D[0],D=D[1],e=e.plotLeft,l=e+d.len,x=(d=d.ticks[x[a+(f?1:-1)]])&&d.label.xy&&d.label.xy.x+d.getLabelSides()[f?0:1];f&&!r||k&&r?m+h<e&&(m=e-h,d&&m+D>x&&(c=!1)):m+D>l&&(m=l-D,d&&m+h<x&&(c=!1));b.x=m}return c},getPosition:function(a,b,c,d){var e=this.axis,f=e.chart,k=d&&f.oldChartHeight||f.chartHeight;return{x:a?
e.translate(b+c,null,null,d)+e.transB:e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-e.left:0),y:a?k-e.bottom+e.offset-(e.opposite?e.height:0):k-e.translate(b+c,null,null,d)-e.transB}},getLabelPosition:function(a,b,c,d,e,f,k,m){var r=this.axis,x=r.transA,D=r.reversed,h=r.staggerLines,l=r.chart.renderer.fontMetrics(e.style.fontSize).b,g=e.rotation;a=a+e.x-(f&&d?f*x*(D?-1:1):0);b=b+e.y-(f&&!d?f*x*(D?1:-1):0);g&&2===r.side&&(b-=l-l*wa(g*$a));s(e.y)||g||(b+=l-c.getBBox().height/
2);h&&(b+=k/(m||1)%h*(r.labelOffset/h));return{x:a,y:b}},getMarkPath:function(a,b,c,d,e,f){return f.crispLine(["M",a,b,"L",a+(e?0:-c),b+(e?c:0)],d)},render:function(a,b,c){var d=this.axis,e=d.options,f=d.chart.renderer,k=d.horiz,m=this.type,r=this.label,x=this.pos,D=e.labels,h=this.gridLine,l=m?m+"Grid":"grid",q=m?m+"Tick":"tick",E=e[l+"LineWidth"],v=e[l+"LineColor"],n=e[l+"LineDashStyle"],p=e[q+"Length"],l=e[q+"Width"]||0,I=e[q+"Color"],u=e[q+"Position"],q=this.mark,P=D.step,A=!0,s=d.tickmarkOffset,
w=this.getPosition(k,x,s,b),t=w.x,w=w.y,B=k&&t===d.pos+d.len||!k&&w===d.pos?-1:1,z=d.staggerLines;this.isActive=!0;if(E&&(x=d.getPlotLinePath(x+s,E*B,b,!0),h===K&&(h={stroke:v,"stroke-width":E},n&&(h.dashstyle=n),m||(h.zIndex=1),b&&(h.opacity=0),this.gridLine=h=E?f.path(x).attr(h).add(d.gridGroup):null),!b&&h&&x))h[this.isNew?"attr":"animate"]({d:x,opacity:c});l&&p&&("inside"===u&&(p=-p),d.opposite&&(p=-p),b=this.getMarkPath(t,w,p,l*B,k,f),q?q.animate({d:b,opacity:c}):this.mark=f.path(b).attr({stroke:I,
"stroke-width":l,opacity:c}).add(d.axisGroup));r&&!isNaN(t)&&(r.xy=w=this.getLabelPosition(t,w,r,k,D,s,a,P),this.isFirst&&!this.isLast&&!g(e.showFirstLabel,1)||this.isLast&&!this.isFirst&&!g(e.showLastLabel,1)?A=!1:!z&&k&&"justify"===D.overflow&&!this.handleOverflow(a,w)&&(A=!1),P&&a%P&&(A=!1),A&&!isNaN(w.y)?(w.opacity=c,r[this.isNew?"attr":"animate"](w),this.isNew=!1):r.attr("y",-9999))},destroy:function(){ea(this,this.axis)}};u.prototype={render:function(){var a=this,b=a.axis,c=b.horiz,d=(b.pointRange||
0)/2,e=a.options,f=e.label,k=a.label,m=e.width,r=e.to,x=e.from,h=s(x)&&s(r),l=e.value,q=e.dashStyle,v=a.svgElem,E=[],p,n=e.color,I=e.zIndex,u=e.events,P=b.chart.renderer;b.isLog&&(x=V(x),r=V(r),l=V(l));if(m){if(E=b.getPlotLinePath(l,m),d={stroke:n,"stroke-width":m},q)d.dashstyle=q}else if(h){if(x=H(x,b.min-d),r=W(r,b.max+d),E=b.getPlotBandPath(x,r,e),d={fill:n},e.borderWidth)d.stroke=e.borderColor,d["stroke-width"]=e.borderWidth}else return;s(I)&&(d.zIndex=I);if(v)E?v.animate({d:E},null,v.onGetPath):
(v.hide(),v.onGetPath=function(){v.show()});else if(E&&E.length&&(a.svgElem=v=P.path(E).attr(d).add(),u))for(p in e=function(b){v.on(b,function(c){u[b].apply(a,[c])})},u)e(p);f&&s(f.text)&&E&&E.length&&0<b.width&&0<b.height?(f=w({align:c&&h&&"center",x:c?!h&&4:10,verticalAlign:!c&&h&&"middle",y:c?h?16:10:h?6:-4,rotation:c&&!h&&90},f),k||(a.label=k=P.text(f.text,0,0,f.useHTML).attr({align:f.textAlign||f.align,rotation:f.rotation,zIndex:I}).css(f.style).add()),b=[E[1],E[4],g(E[6],E[1])],E=[E[2],E[5],
g(E[7],E[2])],c=$(b),h=$(E),k.align(f,!1,{x:c,y:h,width:T(b)-c,height:T(E)-h}),k.show()):k&&k.hide();return a},destroy:function(){O(this.axis.plotLinesAndBands,this);delete this.axis;ea(this)}};Y.prototype={destroy:function(){ea(this,this.axis)},setTotal:function(a){this.cum=this.total=a},addValue:function(a){this.setTotal(l(this.total+a))},render:function(a){var b=this.options,c=b.format,c=c?R(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,
0,0,b.useHTML).css(b.style).attr({align:this.textAlign,rotation:b.rotation,visibility:"hidden"}).add(a)},cacheExtremes:function(a,b){this.points[a.index]=b},setOffset:function(a,b){var c=this.axis,d=c.chart,e=d.inverted,f=this.isNegative,k=c.translate(this.percent?100:this.total,0,0,0,1),c=c.translate(0),c=ha(k-c),m=d.xAxis[0].translate(this.x)+a,r=d.plotHeight,f={x:e?f?k:k-c:m,y:e?r-m-b:f?r-k-c:r-k,width:e?c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e.attr({visibility:!1===
this.options.crop||d.isInsidePlot(f.x,f.y)?za?"inherit":"visible":"hidden"})}};Ta.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#C0C0C0",labels:fa,lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,
startOnTick:!1,tickColor:"#C0D0E0",tickLength:5,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{align:"middle",style:{color:"#4d759e",fontWeight:"bold"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:!0,tickWidth:0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return p(this.total,-1)},style:fa.style}},
defaultLeftAxisOptions:{labels:{x:-8,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:8,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{x:0,y:14},title:{rotation:0}},defaultTopAxisOptions:{labels:{x:0,y:-5},title:{rotation:0}},init:function(a,b){var c=b.isX;this.horiz=a.inverted?!c:c;this.xOrY=(this.isXAxis=c)?"x":"y";this.opposite=b.opposite;this.side=this.horiz?this.opposite?0:2:this.opposite?1:3;this.setOptions(b);var d=this.options,e=d.type;this.labelFormatter=d.labels.formatter||
this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.chart=a;this.reversed=d.reversed;this.zoomEnabled=!1!==d.zoomEnabled;this.categories=d.categories||"category"===e;this.isLog="logarithmic"===e;this.isDatetimeAxis="datetime"===e;this.isLinked=s(d.linkedTo);this.tickmarkOffset=this.categories&&"between"===d.tickmarkPlacement?0.5:0;this.ticks={};this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;
this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stackExtremes={};this.min=this.max=null;var f,d=this.options.events;-1===Ga(this,a.axes)&&(a.axes.push(this),a[c?"xAxis":"yAxis"].push(this));this.series=this.series||[];a.inverted&&c&&this.reversed===K&&(this.reversed=!0);this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(f in d)la(this,f,d[f]);this.isLog&&(this.val2lin=V,this.lin2val=ca)},setOptions:function(a){this.options=w(this.defaultOptions,
this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],w(qa[this.isXAxis?"xAxis":"yAxis"],a))},update:function(a,b){var c=this.chart;a=c.options[this.xOrY+"Axis"][this.options.index]=w(this.userOptions,a);this.destroy(!0);this._addedPlotLB=!1;this.init(c,n(a,{events:K}));c.isDirtyBox=!0;g(b,!0)&&c.redraw()},remove:function(a){var b=this.chart,c=this.xOrY+"Axis";A(this.series,function(a){a.remove(!1)});
O(b.axes,this);O(b[c],this);b.options[c].splice(this.options.index,1);A(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;g(a,!0)&&b.redraw()},defaultLabelFormatter:function(){var a=this.axis,b=this.value,c=a.categories,d=this.dateTimeLabelFormat,e=qa.lang.numericSymbols,f=e&&e.length,k,m=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(m)k=R(m,this);else if(c)k=b;else if(d)k=db(d,b);else if(f&&1E3<=a)for(;f--&&k===K;)c=Math.pow(1E3,f+1),a>=c&&null!==e[f]&&(k=p(b/c,-1)+e[f]);
k===K&&(k=1E3<=b?p(b,0):p(b,-1));return k},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=null;a.stackExtremes={};a.buildStacks();A(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries){var d=c.options,e;e=d.threshold;a.hasVisibleSeries=!0;a.isLog&&0>=e&&(e=null);if(a.isXAxis){if(e=c.xData,e.length)a.dataMin=W(g(a.dataMin,e[0]),$(e)),a.dataMax=H(g(a.dataMax,e[0]),T(e))}else d=d.stacking,a.usePercentage="percent"===d,a.usePercentage&&(a.dataMin=
0,a.dataMax=99),c.getExtremes(),d=c.dataMax,c=c.dataMin,!a.usePercentage&&s(c)&&s(d)&&(a.dataMin=W(g(a.dataMin,c),c),a.dataMax=H(g(a.dataMax,d),d)),s(e)&&(a.dataMin>=e?(a.dataMin=e,a.ignoreMinPadding=!0):a.dataMax<e&&(a.dataMax=e,a.ignoreMaxPadding=!0))}})},translate:function(a,b,c,d,e,f){var k=this.len,m=1,r=0,x=d?this.oldTransA:this.transA;d=d?this.oldMin:this.min;var h=this.minPixelPadding;e=(this.options.ordinal||this.isLog&&e)&&this.lin2val;x||(x=this.transA);c&&(m*=-1,r=k);this.reversed&&(m*=
-1,r-=m*k);b?(a=a*m+r,a-=h,a=a/x+d,e&&(a=this.lin2val(a))):(e&&(a=this.val2lin(a)),"between"===f&&(f=0.5),a=m*(a-d)*x+r+m*h+(M(f)?x*f*this.pointRange:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d){var e=this.chart,f=this.left,k=this.top,m,r,x;a=this.translate(a,null,null,c);var h=c&&e.oldChartHeight||e.chartHeight,l=c&&e.oldChartWidth||
e.chartWidth,g;m=this.transB;c=r=L(a+m);m=x=L(h-a-m);if(isNaN(a))g=!0;else if(this.horiz){if(m=k,x=h-this.bottom,c<f||c>f+this.width)g=!0}else if(c=f,r=l-this.right,m<k||m>k+this.height)g=!0;return g&&!d?null:e.renderer.crispLine(["M",c,m,"L",r,x],b||0)},getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b),d=this.getPlotLinePath(a);d&&c?d.push(c[4],c[5],c[1],c[2]):d=null;return d},getLinearTickPositions:function(a,b,c){var d;b=l(ra(b/a)*a);c=l(La(c/a)*a);for(var e=[];b<=c;){e.push(b);b=l(b+
a);if(b===d)break;d=b}return e},getLogTickPositions:function(a,b,c,d){var e=this.options,f=this.len,k=[];d||(this._minorAutoInterval=null);if(0.5<=a)a=L(a),k=this.getLinearTickPositions(a,b,c);else if(0.08<=a)for(var f=ra(b),m,r,x,h,l,e=0.3<a?[1,2,4]:0.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!l;f++)for(r=e.length,m=0;m<r&&!l;m++)x=V(ca(f)*e[m]),x>b&&(!d||h<=c)&&k.push(h),h>c&&(l=!0),h=x;else(b=ca(b),c=ca(c),a=e[d?"minorTickInterval":"tickInterval"],a=g("auto"===a?null:a,this._minorAutoInterval,
(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=pa(a,null,ia(a)),k=Va(this.getLinearTickPositions(a,b,c),V),d)||(this._minorAutoInterval=a/5);d||(this.tickInterval=a);return k},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],e;if(this.isLog)for(e=b.length,a=1;a<e;a++)d=d.concat(this.getLogTickPositions(c,b[a-1],b[a],!0));else if(this.isDatetimeAxis&&"auto"===a.minorTickInterval)d=d.concat(B(C(c),this.min,this.max,
a.startOfWeek)),d[0]<this.min&&d.shift();else for(b=this.min+(b[0]-this.min)%c;b<=this.max;b+=c)d.push(b);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,e=this.dataMax-this.dataMin>=this.minRange,f,k,m,r;this.isXAxis&&this.minRange===K&&!this.isLog&&(s(a.min)||s(a.max)?this.minRange=null:(A(this.series,function(a){r=a.xData;for(k=a.xIncrement?1:r.length-1;0<k;k--)if(m=r[k]-r[k-1],f===K||m<f)f=m}),this.minRange=W(5*f,this.dataMax-this.dataMin)));if(c-b<this.minRange){var x=
this.minRange;d=(x-c+b)/2;d=[b-d,g(a.min,b-d)];e&&(d[2]=this.dataMin);b=T(d);c=[b+x,g(a.max,b+x)];e&&(c[2]=this.dataMax);c=$(c);c-b<x&&(d[0]=c-x,d[1]=g(a.min,c-x),b=T(d))}this.min=b;this.max=c},setAxisTranslation:function(a){var b=this.max-this.min,c=0,d,e=0,f=0,k=this.linkedParent,m=this.transA;this.isXAxis&&(k?(e=k.minPointOffset,f=k.pointRangePadding):A(this.series,function(a){var k=a.pointRange,m=a.options.pointPlacement,h=a.closestPointRange;k>b&&(k=0);c=H(c,k);e=H(e,Q(m)?0:k/2);f=H(f,"on"===
m?0:k);!a.noSharedTooltip&&s(h)&&(d=s(d)?W(d,h):h)}),k=this.ordinalSlope&&d?this.ordinalSlope/d:1,this.minPointOffset=e*=k,this.pointRangePadding=f*=k,this.pointRange=W(c,b),this.closestPointRange=d);a&&(this.oldTransA=m);this.translationSlope=this.transA=m=this.len/(b+f||1);this.transB=this.horiz?this.left:this.bottom;this.minPixelPadding=m*e},setTickPositions:function(a){var b=this,c=b.chart,d=b.options,e=b.isLog,f=b.isDatetimeAxis,k=b.isXAxis,m=b.isLinked,r=b.options.tickPositioner,x=d.maxPadding,
D=d.minPadding,q=d.tickInterval,v=d.minTickInterval,ka=d.tickPixelInterval,E=b.categories;m?(b.linkedParent=c[k?"xAxis":"yAxis"][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=g(c.min,c.dataMin),b.max=g(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&h(11,1)):(b.min=g(b.userMin,d.min,b.dataMin),b.max=g(b.userMax,d.max,b.dataMax));e&&(!a&&0>=W(b.min,g(b.dataMin,b.min))&&h(10,1),b.min=l(V(b.min)),b.max=l(V(b.max)));b.range&&(b.userMin=b.min=H(b.min,b.max-b.range),b.userMax=b.max,a)&&(b.range=
null);b.beforePadding&&b.beforePadding();b.adjustForMinRange();!E&&!b.usePercentage&&!m&&s(b.min)&&s(b.max)&&(c=b.max-b.min)&&(s(d.min)||s(b.userMin)||!D||!(0>b.dataMin)&&b.ignoreMinPadding||(b.min-=c*D),s(d.max)||s(b.userMax)||!x||!(0<b.dataMax)&&b.ignoreMaxPadding||(b.max+=c*x));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:m&&!q&&ka===b.linkedParent.options.tickPixelInterval?b.linkedParent.tickInterval:g(q,E?1:(b.max-b.min)*ka/(b.len||1));k&&!a&&A(b.series,function(a){a.processData(b.min!==
b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&(b.tickInterval=H(b.pointRange,b.tickInterval));!q&&b.tickInterval<v&&(b.tickInterval=v);f||e||q||(b.tickInterval=pa(b.tickInterval,null,ia(b.tickInterval),d));b.minorTickInterval="auto"===d.minorTickInterval&&b.tickInterval?b.tickInterval/5:d.minorTickInterval;b.tickPositions=a=d.tickPositions?
[].concat(d.tickPositions):r&&r.apply(b,[b.min,b.max]);a||((b.max-b.min)/b.tickInterval>2*b.len&&h(19,!0),a=f?(b.getNonLinearTimeTicks||B)(C(b.tickInterval,d.units),b.min,b.max,d.startOfWeek,b.ordinalPositions,b.closestPointRange,!0):e?b.getLogTickPositions(b.tickInterval,b.min,b.max):b.getLinearTickPositions(b.tickInterval,b.min,b.max),b.tickPositions=a);m||(e=a[0],f=a[a.length-1],m=b.minPointOffset||0,d.startOnTick?b.min=e:b.min-m>e&&a.shift(),d.endOnTick?b.max=f:b.max+m<f&&a.pop(),1===a.length&&
(b.min-=0.001,b.max+=0.001))},setMaxTicks:function(){var a=this.chart,b=a.maxTicks||{},c=this.tickPositions,d=this._maxTicksKey=[this.xOrY,this.pos,this.len].join("-");!this.isLinked&&!this.isDatetimeAxis&&c&&c.length>(b[d]||0)&&!1!==this.options.alignTicks&&(b[d]=c.length);a.maxTicks=b},adjustTickAmount:function(){var a=this._maxTicksKey,b=this.tickPositions,c=this.chart.maxTicks;if(c&&c[a]&&!this.isDatetimeAxis&&!this.categories&&!this.isLinked&&!1!==this.options.alignTicks){var d=this.tickAmount,
e=b.length;this.tickAmount=a=c[a];if(e<a){for(;b.length<a;)b.push(l(b[b.length-1]+this.tickInterval));this.transA*=(e-1)/(a-1);this.max=b[b.length-1]}s(d)&&a!==d&&(this.isDirty=!0)}},setScale:function(){var a=this.stacks,b,c,d,e;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();e=this.len!==this.oldAxisLength;A(this.series,function(a){if(a.isDirtyData||a.isDirty||a.xAxis.isDirty)d=!0});if(e||d||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||
this.userMax!==this.oldUserMax){if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].total=null;this.forceRedraw=!1;this.getSeriesExtremes();this.setTickPositions();this.oldUserMin=this.userMin;this.oldUserMax=this.userMax;this.isDirty||(this.isDirty=e||this.min!==this.oldMin||this.max!==this.oldMax)}else if(!this.isXAxis)for(b in this.oldStacks&&(a=this.stacks=this.oldStacks),a)for(c in a[b])a[b][c].cum=a[b][c].total;this.setMaxTicks()},setExtremes:function(a,b,c,d,e){var f=this,k=f.chart;c=g(c,!0);
e=n(e,{min:a,max:b});ba(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.isDirtyExtremes=!0;c&&k.redraw(d)})},zoom:function(a,b){this.allowZoomOutside||(s(this.dataMin)&&a<=this.dataMin&&(a=K),s(this.dataMax)&&b>=this.dataMax&&(b=K));this.displayBtn=a!==K||b!==K;this.setExtremes(a,b,!1,K,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=b.offsetRight||0,e=this.horiz,f,k;this.left=k=g(b.left,a.plotLeft+c);this.top=f=g(b.top,a.plotTop);this.width=
c=g(b.width,a.plotWidth-c+d);this.height=b=g(b.height,a.plotHeight);this.bottom=a.chartHeight-b-f;this.right=a.chartWidth-c-k;this.len=H(e?c:b,0);this.pos=e?k:f},getExtremes:function(){var a=this.isLog;return{min:a?l(ca(this.min)):this.min,max:a?l(ca(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=b?ca(this.min):this.min,b=b?ca(this.max):this.max;c>a||null===a?a=c:b<a&&(a=b);return this.translate(a,
0,1,0,1)},addPlotBand:function(a){this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(a,b){var c=(new u(this,a)).render(),d=this.userOptions;b&&(d[b]=d[b]||[],d[b].push(a));this.plotLinesAndBands.push(c);return c},autoLabelAlign:function(a){a=(g(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.tickPositions,f=a.ticks,
k=a.horiz,m=a.side,r=b.inverted?[1,0,3,2][m]:m,x,h=0,l,q=0,v=d.title,E=d.labels,p=0,n=b.axisOffset,u=b.clipOffset,P=[-1,1,1,-1][m],w,t=1,B=g(E.maxStaggerLines,5),z,C,Y,sa;a.hasData=x=a.hasVisibleSeries||s(a.min)&&s(a.max)&&!!e;a.showAxis=b=x||g(d.showEmpty,!0);a.staggerLines=a.horiz&&E.staggerLines;a.axisGroup||(a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(),a.labelGroup=c.g("axis-labels").attr({zIndex:E.zIndex||7}).add());if(x||
a.isLinked){a.labelAlign=g(E.align||a.autoLabelAlign(E.rotation));A(e,function(b){f[b]?f[b].addLabel():f[b]=new I(a,b)});if(a.horiz&&!a.staggerLines&&B&&!E.rotation){for(w=a.reversed?[].concat(e).reverse():e;t<B;){x=[];z=!1;for(E=0;E<w.length;E++)C=w[E],Y=(Y=f[C].label&&f[C].label.bBox)?Y.width:0,sa=E%t,Y&&(C=a.translate(C),x[sa]!==K&&C<x[sa]&&(z=!0),x[sa]=C+Y);if(z)t++;else break}1<t&&(a.staggerLines=t)}A(e,function(b){if(0===m||2===m||{1:"left",3:"right"}[m]===a.labelAlign)p=H(f[b].getLabelSize(),
p)});a.staggerLines&&(p*=a.staggerLines,a.labelOffset=p)}else for(w in f)f[w].destroy(),delete f[w];v&&v.text&&!1!==v.enabled&&(a.axisTitle||(a.axisTitle=c.text(v.text,0,0,v.useHTML).attr({zIndex:7,rotation:v.rotation||0,align:v.textAlign||{low:"left",middle:"center",high:"right"}[v.align]}).css(v.style).add(a.axisGroup),a.axisTitle.isNew=!0),b&&(h=a.axisTitle.getBBox()[k?"height":"width"],q=g(v.margin,k?5:10),l=v.offset),a.axisTitle[b?"show":"hide"]());a.offset=P*g(d.offset,n[m]);a.axisTitleMargin=
g(l,p+q+(2!==m&&p&&P*d.labels[k?"y":"x"]));n[m]=H(n[m],a.axisTitleMargin+h+P*a.offset);u[r]=H(u[r],2*ra(d.lineWidth/2))},getLinePath:function(a){var b=this.chart,c=this.opposite,d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d;this.lineTop=d=b.chartHeight-this.bottom-(c?this.height:0)+d;c&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:f,e?d:this.top,"L",e?b.chartWidth-this.right:f,e?d:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,
d=this.len,e=this.options.title,f=a?b:c,k=this.opposite,m=this.offset,r=y(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(k?-1:1)*this.axisTitleMargin+(2===this.side?r:0);return{x:a?d:b+(k?this.width:0)+m+(e.x||0),y:a?b-(k?this.height:0)+m:d+(e.y||0)}},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.isLog,f=a.isLinked,k=a.tickPositions,m=a.axisTitle,r=a.stacks,x=a.ticks,h=a.minorTicks,l=a.alternateBands,g=d.stackLabels,
q=d.alternateGridColor,E=a.tickmarkOffset,v=d.lineWidth,p,n=b.hasRendered&&s(a.oldMin)&&!isNaN(a.oldMin);p=a.hasData;var P=a.showAxis,w,t;A([x,h,l],function(a){for(var b in a)a[b].isActive=!1});if(p||f)(a.minorTickInterval&&!a.categories&&A(a.getMinorTickPositions(),function(b){h[b]||(h[b]=new I(a,b,"minor"));n&&h[b].isNew&&h[b].render(null,!0);h[b].render(null,!1,1)}),k.length&&(A(k.slice(1).concat([k[0]]),function(b,c){c=c===k.length-1?0:c+1;if(!f||b>=a.min&&b<=a.max)x[b]||(x[b]=new I(a,b)),n&&
x[b].isNew&&x[b].render(c,!0),x[b].render(c,!1,1)}),E&&0===a.min&&(x[-1]||(x[-1]=new I(a,-1,null,!0)),x[-1].render(-1))),q&&A(k,function(b,c){0===c%2&&b<a.max&&(l[b]||(l[b]=new u(a)),w=b+E,t=k[c+1]!==K?k[c+1]+E:a.max,l[b].options={from:e?ca(w):w,to:e?ca(t):t,color:q},l[b].render(),l[b].isActive=!0)}),a._addedPlotLB)||(A((d.plotLines||[]).concat(d.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0);A([x,h,l],function(a){var c,d,e=[],f=Pa?Pa.duration||500:0,k=function(){for(d=e.length;d--;)a[e[d]]&&
!a[e[d]].isActive&&(a[e[d]].destroy(),delete a[e[d]])};for(c in a)a[c].isActive||(a[c].render(c,!1,0),a[c].isActive=!1,e.push(c));a!==l&&b.hasRendered&&f?f&&setTimeout(k,f):k()});v&&(p=a.getLinePath(v),a.axisLine?a.axisLine.animate({d:p}):a.axisLine=c.path(p).attr({stroke:d.lineColor,"stroke-width":v,zIndex:7}).add(a.axisGroup),a.axisLine[P?"show":"hide"]());m&&P&&(m[m.isNew?"attr":"animate"](a.getTitlePosition()),m.isNew=!1);if(g&&g.enabled){var B,C,d=a.stackTotalGroup;d||(a.stackTotalGroup=d=c.g("stack-labels").attr({visibility:"visible",
zIndex:6}).add());d.translate(b.plotLeft,b.plotTop);for(B in r)for(C in c=r[B],c)c[C].render(d)}a.isDirty=!1},removePlotBandOrLine:function(a){for(var b=this.plotLinesAndBands,c=this.options,d=this.userOptions,e=b.length;e--;)b[e].id===a&&b[e].destroy();A([c.plotLines||[],d.plotLines||[],c.plotBands||[],d.plotBands||[]],function(b){for(e=b.length;e--;)b[e].id===a&&O(b,b[e])})},setTitle:function(a,b){this.update({title:a},b)},redraw:function(){var a=this.chart.pointer;a.reset&&a.reset(!0);this.render();
A(this.plotLinesAndBands,function(a){a.render()});A(this.series,function(a){a.isDirty=!0})},buildStacks:function(){this.isXAxis||A(this.series,function(a){a.setStackedPoints()})},setCategories:function(a,b){this.update({categories:a},b)},destroy:function(a){var b=this,c=b.stacks,d,e=b.plotLinesAndBands;a||Ca(b);for(d in c)ea(c[d]),c[d]=null;A([b.ticks,b.minorTicks,b.alternateBands],function(a){ea(a)});for(a=e.length;a--;)e[a].destroy();A("stackTotalGroup axisLine axisGroup gridGroup labelGroup axisTitle".split(" "),
function(a){b[a]&&(b[a]=b[a].destroy())})}};oa.prototype={init:function(a,b){var c=b.borderWidth,d=b.style,e=y(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape,null,null,b.useHTML,null,"tooltip").attr({padding:e,fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).hide().add();Aa||this.label.shadow(b.shadow);this.shared=b.shared},destroy:function(){A(this.crosshairs,function(a){a&&
a.destroy()});this.label&&(this.label=this.label.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,c,d){var e=this,f=e.now,k=!1!==e.options.animation&&!e.isHidden;n(f,{x:k?(2*f.x+a)/3:a,y:k?(f.y+b)/2:b,anchorX:k?(2*f.anchorX+c)/3:c,anchorY:k?(f.anchorY+d)/2:d});e.label.attr(f);k&&(1<ha(a-f.x)||1<ha(b-f.y))&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,b,c,d)},32))},hide:function(){var a=this,b;clearTimeout(this.hideTimer);
this.isHidden||(b=this.chart.hoverPoints,this.hideTimer=setTimeout(function(){a.label.fadeOut();a.isHidden=!0},g(this.options.hideDelay,500)),b&&A(b,function(a){a.setState()}),this.chart.hoverPoints=null)},hideCrosshairs:function(){A(this.crosshairs,function(a){a&&a.hide()})},getAnchor:function(a,b){var c,d=this.chart,e=d.inverted,f=d.plotTop,k=0,m=0,r;a=ga(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===K&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-f]);c||(A(a,function(a){r=
a.series.yAxis;k+=a.plotX;m+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&r?r.top-f:0)}),k/=a.length,m/=a.length,c=[e?d.plotWidth-m:k,this.shared&&!e&&1<a.length&&b?b.chartY-f:e?d.plotHeight-k:m]);return Va(c,L)},getPosition:function(a,b,c){var d=this.chart,e=d.plotLeft,f=d.plotTop,k=d.plotWidth,m=d.plotHeight,r=g(this.options.distance,12),h=c.plotX;c=c.plotY;var d=h+e+(d.inverted?r:-a-r),l=c-b+f+15,q;7>d&&(d=e+H(h,0)+r);d+a>e+k&&(d-=d+a-(e+k),l=c-b+f-r,q=!0);l<f+5&&(l=f+5,q&&c>=l&&c<=l+b&&(l=
c+f+r));l+b>f+m&&(l=H(f,f+m-b-r));return{x:d,y:l}},defaultFormatter:function(a){var b=this.points||ga(this),c=b[0].series,d;d=[c.tooltipHeaderFormatter(b[0])];A(b,function(a){c=a.series;d.push(c.tooltipFormatter&&c.tooltipFormatter(a)||a.point.tooltipFormatter(c.tooltipOptions.pointFormat))});d.push(a.options.footerFormat||"");return d.join("")},refresh:function(a,b){var c=this.chart,d=this.label,e=this.options,f,k,m={},r,h=[];r=e.formatter||this.defaultFormatter;var m=c.hoverPoints,l,q=e.crosshairs,
v=this.shared;clearTimeout(this.hideTimer);this.followPointer=ga(a)[0].series.tooltipOptions.followPointer;k=this.getAnchor(a,b);f=k[0];k=k[1];!v||a.series&&a.series.noSharedTooltip?m=a.getLabelConfig():(c.hoverPoints=a,m&&A(m,function(a){a.setState()}),A(a,function(a){a.setState("hover");h.push(a.getLabelConfig())}),m={x:a[0].category,y:a[0].y},m.points=h,a=a[0]);r=r.call(m,this);m=a.series;!1===r?this.hide():(this.isHidden&&(bb(d),d.attr("opacity",1).show()),d.attr({text:r}),l=e.borderColor||a.color||
m.color||"#606060",d.attr({stroke:l}),this.updatePosition({plotX:f,plotY:k}),this.isHidden=!1);if(q)for(q=ga(q),d=q.length;d--;)if(v=a.series,e=v[d?"yAxis":"xAxis"],q[d]&&e)(m=d?g(a.stackY,a.y):a.x,e.isLog&&(m=V(m)),v.modifyValue&&(m=v.modifyValue(m)),e=e.getPlotLinePath(m,1),this.crosshairs[d])?this.crosshairs[d].attr({d:e,visibility:"visible"}):(m={"stroke-width":q[d].width||1,stroke:q[d].color||"#C0C0C0",zIndex:q[d].zIndex||2},q[d].dashStyle&&(m.dashstyle=q[d].dashStyle),this.crosshairs[d]=c.renderer.path(e).attr(m).add());
ba(c,"tooltipRefresh",{text:r,x:f+c.plotLeft,y:k+c.plotTop,borderColor:l})},updatePosition:function(a){var b=this.chart,c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(L(c.x),L(c.y),a.plotX+b.plotLeft,a.plotY+b.plotTop)}};sa.prototype={init:function(a,b){var c=Aa?"":b.chart.zoomType,d=a.inverted,e;this.options=b;this.chart=a;this.zoomX=e=/x/.test(c);this.zoomY=c=/y/.test(c);this.zoomHor=e&&!d||c&&d;this.zoomVert=c&&!d||e&&d;this.pinchDown=[];this.lastValidTouch=
{};b.tooltip.enabled&&(a.tooltip=new oa(a,b.tooltip));this.setDOMEvents()},normalize:function(a){var b,c,d;a=a||na.event;a.target||(a.target=a.srcElement);a=Mb(a);d=a.touches?a.touches.item(0):a;this.chartPosition=b=Qb(this.chart.container);d.pageX===K?(c=H(a.x,a.clientX-b.left),b=a.y):(c=d.pageX-b.left,b=d.pageY-b.top);return n(a,{chartX:L(c),chartY:L(b)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};A(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?
"chartX":"chartY"])})});return b},getIndex:function(a){var b=this.chart;return b.inverted?b.plotHeight+b.plotTop-a.chartY:a.chartX-b.plotLeft},runPointActions:function(a){var b=this.chart,c=b.series,d=b.tooltip,e,f=b.hoverPoint,k=b.hoverSeries,m,r,h=b.chartWidth,l=this.getIndex(a);if(d&&this.options.tooltip.shared&&(!k||!k.noSharedTooltip)){e=[];m=c.length;for(r=0;r<m;r++)c[r].visible&&!1!==c[r].options.enableMouseTracking&&!c[r].noSharedTooltip&&c[r].tooltipPoints.length&&(b=c[r].tooltipPoints[l],
b.series)&&(b._dist=ha(l-b.clientX),h=W(h,b._dist),e.push(b));for(m=e.length;m--;)e[m]._dist>h&&e.splice(m,1);e.length&&e[0].clientX!==this.hoverX&&(d.refresh(e,a),this.hoverX=e[0].clientX)}if(k&&k.tracker){if((b=k.tooltipPoints[l])&&b!==f)b.onMouseOver(a)}else d&&d.followPointer&&!d.isHidden&&(a=d.getAnchor([{}],a),d.updatePosition({plotX:a[0],plotY:a[1]}))},reset:function(a){var b=this.chart,c=b.hoverSeries,d=b.hoverPoint,e=b.tooltip,b=e&&e.shared?b.hoverPoints:d;(a=a&&e&&b)&&ga(b)[0].plotX===K&&
(a=!1);if(a)e.refresh(b);else{if(d)d.onMouseOut();if(c)c.onMouseOut();e&&(e.hide(),e.hideCrosshairs());this.hoverX=null}},scaleGroups:function(a,b){var c=this.chart,d;A(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},pinchTranslateDirection:function(a,b,c,d,e,f,k){var m=this.chart,r=a?"x":"y",h=a?"X":"Y",
l="chart"+h,q=a?"width":"height",g=m["plot"+(a?"Left":"Top")],v,E,p=1,n=m.inverted,I=m.bounds[a?"h":"v"],u=1===b.length,P=b[0][l],A=c[0][l],w=!u&&b[1][l],s=!u&&c[1][l],t;c=function(){!u&&20<ha(P-w)&&(p=ha(A-s)/ha(P-w));E=(g-A)/p+P;v=m["plot"+(a?"Width":"Height")]/p};c();b=E;b<I.min?(b=I.min,t=!0):b+v>I.max&&(b=I.max-v,t=!0);t?(A-=0.8*(A-k[r][0]),u||(s-=0.8*(s-k[r][1])),c()):k[r]=[A,s];n||(f[r]=E-g,f[q]=v);f=n?1/p:p;e[q]=v;e[r]=b;d[n?a?"scaleY":"scaleX":"scale"+h]=p;d["translate"+h]=f*g+(A-f*P)},pinch:function(a){var b=
this,c=b.chart,d=b.pinchDown,e=c.tooltip&&c.tooltip.options.followTouchMove,f=a.touches,k=f.length,m=b.lastValidTouch,r=b.zoomHor||b.pinchHor,h=b.zoomVert||b.pinchVert,l=r||h,q=b.selectionMarker,g={},v={};(e||l)&&a.preventDefault();Va(f,function(a){return b.normalize(a)});"touchstart"===a.type?(A(f,function(a,b){d[b]={chartX:a.chartX,chartY:a.chartY}}),m.x=[d[0].chartX,d[1]&&d[1].chartX],m.y=[d[0].chartY,d[1]&&d[1].chartY],A(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,
e=a.toPixels(a.dataMin),f=a.toPixels(a.dataMax),k=W(e,f),e=H(e,f);b.min=W(a.pos,k-d);b.max=H(a.pos+a.len,e+d)}})):d.length&&(q||(b.selectionMarker=q=n({destroy:Na},c.plotBox)),r&&b.pinchTranslateDirection(!0,d,f,g,q,v,m),h&&b.pinchTranslateDirection(!1,d,f,g,q,v,m),b.hasPinched=l,b.scaleGroups(g,v),!l&&e&&1===k&&this.runPointActions(b.normalize(a)))},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},
drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,e=a.chartY,f=this.zoomHor,k=this.zoomVert,m=b.plotLeft,r=b.plotTop,h=b.plotWidth,l=b.plotHeight,q,g=this.mouseDownX,v=this.mouseDownY;d<m?d=m:d>m+h&&(d=m+h);e<r?e=r:e>r+l&&(e=r+l);this.hasDragged=Math.sqrt(Math.pow(g-d,2)+Math.pow(v-e,2));10<this.hasDragged&&(q=b.isInsidePlot(g-m,v-r),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&q&&!this.selectionMarker&&(this.selectionMarker=b.renderer.rect(m,r,f?1:h,k?1:l,0).attr({fill:c.selectionMarkerFill||
"rgba(69,114,167,0.25)",zIndex:7}).add()),this.selectionMarker&&f&&(d-=g,this.selectionMarker.attr({width:ha(d),x:(0<d?0:d)+g})),this.selectionMarker&&k&&(d=e-v,this.selectionMarker.attr({height:ha(d),y:(0<d?0:d)+v})),q&&!this.selectionMarker&&c.panning&&b.pan(a,c.panning))},drop:function(a){var b=this.chart,c=this.hasPinched;if(this.selectionMarker){var d={xAxis:[],yAxis:[],originalEvent:a.originalEvent||a},e=this.selectionMarker,f=e.x,k=e.y,m;if(this.hasDragged||c)A(b.axes,function(a){if(a.zoomEnabled){var b=
a.horiz,c=a.toValue(b?f:k),b=a.toValue(b?f+e.width:k+e.height);!isNaN(c)&&!isNaN(b)&&(d[a.xOrY+"Axis"].push({axis:a,min:W(c,b),max:H(c,b)}),m=!0)}}),m&&ba(b,"selection",d,function(a){b.zoom(n(a,c?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();c&&this.scaleGroups()}b&&(t(b.container,{cursor:b._cursor}),b.cancelClick=10<this.hasDragged,b.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);a.preventDefault&&
a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(a){this.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition,d=b.hoverSeries;a=Mb(a);c&&d&&!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.pageX-c.left-b.plotLeft,a.pageY-c.top-b.plotTop)&&this.reset()},onContainerMouseLeave:function(){this.reset();this.chartPosition=null},onContainerMouseMove:function(a){var b=this.chart;a=this.normalize(a);a.returnValue=!1;"mousedown"===b.mouseIsDown&&this.drag(a);
(this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop))&&!b.openMenu&&this.runPointActions(a)},inClass:function(a,b){for(var c;a;){if(c=F(a,"class")){if(-1!==c.indexOf(b))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;if(b&&!b.options.stickyTracking&&!this.inClass(a.toElement||a.relatedTarget,"highcharts-tooltip"))b.onMouseOut()},onContainerClick:function(a){var b=
this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop,f=b.inverted,k,m,r;a=this.normalize(a);a.cancelBubble=!0;b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(k=this.chartPosition,m=c.plotX,r=c.plotY,n(c,{pageX:k.left+d+(f?b.plotWidth-r:m),pageY:k.top+e+(f?b.plotHeight-m:r)}),ba(c.series,"click",n(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(n(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&ba(b,"click",a)))},onContainerTouchStart:function(a){var b=this.chart;
1===a.touches.length?(a=this.normalize(a),b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)?(this.runPointActions(a),this.pinch(a)):this.reset()):2===a.touches.length&&this.pinch(a)},onContainerTouchMove:function(a){1!==a.touches.length&&2!==a.touches.length||this.pinch(a)},onDocumentTouchEnd:function(a){this.drop(a)},setDOMEvents:function(){var a=this,b=a.chart.container,c;this._events=c=[[b,"onmousedown","onContainerMouseDown"],[b,"onmousemove","onContainerMouseMove"],[b,"onclick","onContainerClick"],
[b,"mouseleave","onContainerMouseLeave"],[X,"mousemove","onDocumentMouseMove"],[X,"mouseup","onDocumentMouseUp"]];nb&&c.push([b,"ontouchstart","onContainerTouchStart"],[b,"ontouchmove","onContainerTouchMove"],[X,"touchend","onDocumentTouchEnd"]);A(c,function(b){a["_"+b[2]]=function(c){a[b[2]](c)};0===b[1].indexOf("on")?b[0][b[1]]=a["_"+b[2]]:la(b[0],b[1],a["_"+b[2]])})},destroy:function(){var a=this;A(a._events,function(b){0===b[1].indexOf("on")?b[0][b[1]]=null:Ca(b[0],b[1],a["_"+b[2]])});delete a._events;
clearInterval(a.tooltipTimeout)}};wb.prototype={init:function(a,b){var c=this,d=b.itemStyle,e=g(b.padding,8),f=b.itemMarginTop||0;this.options=b;b.enabled&&(c.baseline=y(d.fontSize)+3+f,c.itemStyle=d,c.itemHiddenStyle=w(d,b.itemHiddenStyle),c.itemMarginTop=f,c.padding=e,c.initialItemX=e,c.initialItemY=e-5,c.maxItemWidth=0,c.chart=a,c.itemHeight=0,c.lastLineHeight=0,c.render(),la(c.chart,"endResize",function(){c.positionCheckboxes()}))},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,
e=a.legendLine,f=a.legendSymbol,k=this.itemHiddenStyle.color,c=b?c.itemStyle.color:k,m=b?a.color:k,k=a.options&&a.options.marker,r={stroke:m,fill:m},h;d&&d.css({fill:c,color:c});e&&e.attr({stroke:m});if(f){if(k&&f.isMarker)for(h in k=a.convertAttribs(k),k)d=k[h],d!==K&&(r[h]=d);f.attr(r)}},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;a.legendGroup&&a.legendGroup.translate(b?e:this.legendWidth-e-2*c-4,d);f&&(f.x=e,f.y=d)},destroyItem:function(a){var b=
a.checkbox;A(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&U(a.checkbox)},destroy:function(){var a=this.group,b=this.box;b&&(this.box=b.destroy());a&&(this.group=a.destroy())},positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||this.legendHeight;b&&(c=b.translateY,A(this.allItems,function(e){var f=e.checkbox,k;f&&(k=c+f.y+(a||0)+3,t(f,{left:b.translateX+e.legendItemWidth+f.x-20+"px",top:k+"px",display:k>c-6&&k<c+d-
6?"":va}))}))},renderTitle:function(){var a=this.padding,b=this.options.title,c=0;b.text&&(this.title||(this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group)),a=this.title.getBBox(),c=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:c}));this.titleHeight=c},renderItem:function(a){var b=this,c=b.chart,d=c.renderer,e=b.options,f="horizontal"===e.layout,k=e.symbolWidth,m=e.symbolPadding,r=b.itemStyle,
h=b.itemHiddenStyle,l=b.padding,q=f?g(e.itemDistance,8):0,v=!e.rtl,p=e.width,E=e.itemMarginBottom||0,n=b.itemMarginTop,I=b.initialItemX,u=a.legendItem,P=a.series||a,A=P.options,s=A.showCheckbox,t=e.useHTML;!u&&(a.legendGroup=d.g("legend-item").attr({zIndex:1}).add(b.scrollGroup),P.drawLegendSymbol(b,a),a.legendItem=u=d.text(e.labelFormat?R(e.labelFormat,a):e.labelFormatter.call(a),v?k+m:-m,b.baseline,t).css(w(a.visible?r:h)).attr({align:v?"left":"right",zIndex:2}).add(a.legendGroup),(t?u:a.legendGroup).on("mouseover",
function(){a.setState("hover");u.css(b.options.itemHoverStyle)}).on("mouseout",function(){u.css(a.visible?r:h);a.setState()}).on("click",function(b){var c=function(){a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):ba(a,"legendItemClick",b,c)}),b.colorizeItem(a,a.visible),A&&s)&&(a.checkbox=S("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},e.itemCheckboxStyle,c.container),la(a.checkbox,"click",function(b){ba(a,"checkboxClick",{checked:b.target.checked},
function(){a.select()})}));d=u.getBBox();e=a.legendItemWidth=e.itemWidth||k+m+d.width+q+(s?20:0);b.itemHeight=k=d.height;f&&b.itemX-I+e>(p||c.chartWidth-2*l-I)&&(b.itemX=I,b.itemY+=n+b.lastLineHeight+E,b.lastLineHeight=0);b.maxItemWidth=H(b.maxItemWidth,e);b.lastItemY=n+b.itemY+E;b.lastLineHeight=H(k,b.lastLineHeight);a._legendItemPos=[b.itemX,b.itemY];f?b.itemX+=e:(b.itemY+=n+k+E,b.lastLineHeight=k);b.offsetWidth=p||H((f?b.itemX-I-q:e)+l,b.offsetWidth)},render:function(){var a=this,b=a.chart,c=b.renderer,
d=a.group,e,f,k,m,r=a.box,h=a.options,l=a.padding,q=h.borderWidth,g=h.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;d||(a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup));a.renderTitle();e=[];A(b.series,function(a){var b=a.options;b.showInLegend&&!s(b.linkedTo)&&(e=e.concat(a.legendItems||("point"===b.legendType?a.data:a)))});Da(e,function(a,b){return(a.options&&a.options.legendIndex||
0)-(b.options&&b.options.legendIndex||0)});h.reversed&&e.reverse();a.allItems=e;a.display=f=!!e.length;A(e,function(b){a.renderItem(b)});k=h.width||a.offsetWidth;m=a.lastItemY+a.lastLineHeight+a.titleHeight;m=a.handleOverflow(m);if(q||g)k+=l,m+=l,r?0<k&&0<m&&(r[r.isNew?"attr":"animate"](r.crisp(null,null,null,k,m)),r.isNew=!1):(a.box=r=c.rect(0,0,k,m,h.borderRadius,q||0).attr({stroke:h.borderColor,"stroke-width":q||0,fill:g||va}).add(d).shadow(h.shadow),r.isNew=!0),r[f?"show":"hide"]();a.legendWidth=
k;a.legendHeight=m;A(e,function(b){a.positionItem(b)});f&&d.align(n({width:k,height:m},h),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+("top"===e.verticalAlign?-f:f)-this.padding,k=e.maxHeight,m=this.clipRect,r=e.navigation,h=g(r.animation,!0),l=r.arrowSize||12,q=this.nav;"horizontal"===e.layout&&(f/=2);k&&(f=W(f,k));a>f&&!e.useHTML?(this.clipHeight=c=f-20-this.titleHeight,this.pageCount=
La(a/c),this.currentPage=g(this.currentPage,1),this.fullHeight=a,m||(m=b.clipRect=d.clipRect(0,0,9999,0),b.contentGroup.clip(m)),m.attr({height:c}),q||(this.nav=q=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,l,l).on("click",function(){b.scroll(-1,h)}).add(q),this.pager=d.text("",15,10).css(r.style).add(q),this.down=d.symbol("triangle-down",0,0,l,l).on("click",function(){b.scroll(1,h)}).add(q)),b.scroll(0),a=f):q&&(m.attr({height:c.chartHeight}),q.hide(),this.scrollGroup.attr({translateY:1}),
this.clipHeight=0);return a},scroll:function(a,b){var c=this.pageCount,d=this.currentPage+a,e=this.clipHeight,f=this.options.navigation,k=f.activeColor,m=f.inactiveColor,f=this.pager,r=this.padding;d>c&&(d=c);0<d&&(b!==K&&q(b,this.chart),this.nav.attr({translateX:r,translateY:e+7+this.titleHeight,visibility:"visible"}),this.up.attr({fill:1===d?m:k}).css({cursor:1===d?"default":"pointer"}),f.attr({text:d+"/"+this.pageCount}),this.down.attr({x:18+this.pager.getBBox().width,fill:d===c?m:k}).css({cursor:d===
c?"default":"pointer"}),e=-W(e*(d-1),this.fullHeight-e+r)+1,this.scrollGroup.animate({translateY:e}),f.attr({text:d+"/"+c}),this.currentPage=d,this.positionCheckboxes(e))}};xb.prototype={init:function(a,b){var c,d=a.series;a.series=null;c=w(qa,a);c.series=a.series=d;var d=c.chart,e=d.margin,e=z(e)?e:[e,e,e,e];this.optionsMarginTop=g(d.marginTop,e[0]);this.optionsMarginRight=g(d.marginRight,e[1]);this.optionsMarginBottom=g(d.marginBottom,e[2]);this.optionsMarginLeft=g(d.marginLeft,e[3]);e=d.events;
this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var f=this,k;f.index=Ra.length;Ra.push(f);!1!==d.reflow&&la(f,"load",function(){f.initReflow()});if(e)for(k in e)la(f,k,e[k]);f.xAxis=[];f.yAxis=[];f.animation=Aa?!1:g(d.animation,!0);f.pointCount=0;f.counters=new cb;f.firstRender()},initSeries:function(a){var b=this.options.chart;(b=Ba[a.type||b.type||b.defaultSeriesType])||h(17,!0);b=new b;b.init(this,a);return b},
addSeries:function(a,b,c){var d,e=this;a&&(b=g(b,!0),ba(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();b&&e.redraw(c)}));return d},addAxis:function(a,b,c,d){var e=b?"xAxis":"yAxis",f=this.options;new Ta(this,w(a,{index:this[e].length,isX:b}));f[e]=ga(f[e]||{});f[e].push(a);g(c,!0)&&this.redraw(d)},isInsidePlot:function(a,b,c){var d=c?b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},adjustTickAmounts:function(){!1!==this.options.chart.alignTicks&&
A(this.axes,function(a){a.adjustTickAmount()});this.maxTicks=null},redraw:function(a){var b=this.axes,c=this.series,d=this.pointer,e=this.legend,f=this.isDirtyLegend,k,m,r=this.isDirtyBox,h=c.length,l=h,g=this.renderer,v=g.isHidden(),p=[];q(a,this);v&&this.cloneRenderTo();for(this.layOutTitles();l--;)if(a=c[l],a.options.stacking&&(k=!0,a.isDirty)){m=!0;break}if(m)for(l=h;l--;)if(a=c[l],a.options.stacking)a.isDirty=!0;A(c,function(a){a.isDirty&&"point"===a.options.legendType&&(f=!0)});f&&e.options.enabled&&
(e.render(),this.isDirtyLegend=!1);k&&this.getStacks();this.hasCartesianSeries&&(this.isResizing||(this.maxTicks=null,A(b,function(a){a.setScale()})),this.adjustTickAmounts(),this.getMargins(),A(b,function(a){a.isDirty&&(r=!0)}),A(b,function(a){a.isDirtyExtremes&&(a.isDirtyExtremes=!1,p.push(function(){ba(a,"afterSetExtremes",a.getExtremes())}));(r||k)&&a.redraw()}));r&&this.drawChartBox();A(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset&&d.reset(!0);g.draw();
ba(this,"redraw");v&&this.cloneRenderTo(!0);A(p,function(a){a.call()})},showLoading:function(a){var b=this.options,c=this.loadingDiv,d=b.loading;c||(this.loadingDiv=c=S(Oa,{className:"highcharts-loading"},n(d.style,{zIndex:10,display:va}),this.container),this.loadingSpan=S("span",null,d.labelStyle,c));this.loadingSpan.innerHTML=a||b.lang.loading;this.loadingShown||(t(c,{opacity:0,display:"",left:this.plotLeft+"px",top:this.plotTop+"px",width:this.plotWidth+"px",height:this.plotHeight+"px"}),Ab(c,
{opacity:d.style.opacity},{duration:d.showDuration||0}),this.loadingShown=!0)},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&Ab(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){t(b,{display:va})}});this.loadingShown=!1},get:function(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++)if(b[d].options.id===a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++)for(e=c[d].points||[],b=0;b<e.length;b++)if(e[b].id===
a)return e[b];return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=ga(b.xAxis||{}),b=b.yAxis=ga(b.yAxis||{});A(c,function(a,b){a.index=b;a.isX=!0});A(b,function(a,b){a.index=b});c=c.concat(b);A(c,function(b){new Ta(a,b)});a.adjustTickAmounts()},getSelectedPoints:function(){var a=[];A(this.series,function(b){a=a.concat(vb(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return vb(this.series,function(a){return a.selected})},getStacks:function(){var a=
this;A(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});A(a.series,function(b){!b.options.stacking||!0!==b.visible&&!1!==a.options.chart.ignoreHiddenSeries||(b.stackKey=b.type+g(b.options.stack,""))})},showResetZoom:function(){var a=this,b=qa.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,
!1,f)},zoomOut:function(){var a=this;ba(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?A(this.axes,function(a){b=a.zoom()}):A(a.xAxis.concat(a.yAxis),function(a){var e=a.axis,m=e.isXAxis;if(c[m?"zoomX":"zoomY"]||c[m?"pinchX":"pinchY"])b=e.zoom(a.min,a.max),e.displayBtn&&(d=!0)});e=this.resetZoomButton;d&&!e?this.showResetZoom():!d&&z(e)&&(this.resetZoomButton=e.destroy());b&&this.redraw(g(this.options.chart.animation,a&&a.animation,
100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&A(d,function(a){a.setState()});A("xy"===b?[1,0]:[1],function(b){var d=a[b?"chartX":"chartY"],m=c[b?"xAxis":"yAxis"][0],r=c[b?"mouseDownX":"mouseDownY"],h=(m.pointRange||0)/2,l=m.getExtremes(),q=m.toValue(r-d,!0)+h,r=m.toValue(r+c[b?"plotWidth":"plotHeight"]-d,!0)-h;m.series.length&&q>W(l.dataMin,l.min)&&r<H(l.dataMax,l.max)&&(m.setExtremes(q,r,!1,!1,{trigger:"pan"}),e=!0);c[b?"mouseDownX":"mouseDownY"]=d});e&&c.redraw(!1);t(c.container,
{cursor:"move"})},setTitle:function(a,b){var c=this,d=c.options,e;e=d.title=w(d.title,a);d=d.subtitle=w(d.subtitle,b);A([["title",a,e],["subtitle",b,d]],function(a){var b=a[0],d=c[b],e=a[1];a=a[2];d&&e&&(c[b]=d=d.destroy());a&&a.text&&!d&&(c[b]=c.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add())});c.layOutTitles()},layOutTitles:function(){var a=0,b=this.title,c=this.subtitle,d=this.options,e=d.title,d=d.subtitle,f=this.spacingBox.width-
44;!b||(b.css({width:(e.width||f)+"px"}).align(n({y:15},e),!1,"spacingBox"),e.floating||e.verticalAlign)||(a=b.getBBox().height,18<=a&&25>=a&&(a=15));c&&(c.css({width:(d.width||f)+"px"}).align(n({y:a+e.margin},d),!1,"spacingBox"),!d.floating&&!d.verticalAlign&&(a=La(a+c.getBBox().height)));this.titleOffset=a},getChartSize:function(){var a=this.options.chart,b=this.renderToClone||this.renderTo;this.containerWidth=ob(b,"width");this.containerHeight=ob(b,"height");this.chartWidth=H(0,a.width||this.containerWidth||
600);this.chartHeight=H(0,g(a.height,19<this.containerHeight?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),U(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),t(b,{position:"absolute",top:"-9999px",display:"block"}),X.body.appendChild(b),c&&b.appendChild(c))},getContainer:function(){var a,b=this.options.chart,c,d,e;this.renderTo=
a=b.renderTo;e="highcharts-"+yb++;Q(a)&&(this.renderTo=a=X.getElementById(a));a||h(13,!0);c=y(F(a,"data-highcharts-chart"));!isNaN(c)&&Ra[c]&&Ra[c].destroy();F(a,"data-highcharts-chart",this.index);a.innerHTML="";a.offsetWidth||this.cloneRenderTo();this.getChartSize();c=this.chartWidth;d=this.chartHeight;this.container=a=S(Oa,{className:"highcharts-container"+(b.className?" "+b.className:""),id:e},n({position:"relative",overflow:"hidden",width:c+"px",height:d+"px",textAlign:"left",lineHeight:"normal",
zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},b.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=b.forExport?new Sa(a,c,d,!0):new ab(a,c,d);Aa&&this.renderer.create(this,a,c,d)},getMargins:function(){var a=this.options.chart,b=a.spacingTop,c=a.spacingRight,d=a.spacingBottom,a=a.spacingLeft,e,f=this.legend,k=this.optionsMarginTop,m=this.optionsMarginLeft,r=this.optionsMarginRight,h=this.optionsMarginBottom,l=this.options.legend,q=g(l.margin,10),v=l.x,p=l.y,n=l.align,
u=l.verticalAlign,I=this.titleOffset;this.resetMargins();e=this.axisOffset;I&&!s(k)&&(this.plotTop=H(this.plotTop,I+this.options.title.margin+b));f.display&&!l.floating&&("right"===n?s(r)||(this.marginRight=H(this.marginRight,f.legendWidth-v+q+c)):"left"===n?s(m)||(this.plotLeft=H(this.plotLeft,f.legendWidth+v+q+a)):"top"===u?s(k)||(this.plotTop=H(this.plotTop,f.legendHeight+p+q+b)):"bottom"!==u||s(h)||(this.marginBottom=H(this.marginBottom,f.legendHeight-p+q+d)));this.extraBottomMargin&&(this.marginBottom+=
this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);this.hasCartesianSeries&&A(this.axes,function(a){a.getOffset()});s(m)||(this.plotLeft+=e[3]);s(k)||(this.plotTop+=e[0]);s(h)||(this.marginBottom+=e[2]);s(r)||(this.marginRight+=e[1]);this.setChartSize()},initReflow:function(){function a(a){var k=c.width||ob(d,"width"),m=c.height||ob(d,"height");a=a?a.target:na;if(!b.hasUserSize&&k&&m&&(a===na||a===X)){if(k!==b.containerWidth||m!==b.containerHeight)clearTimeout(e),b.reflowTimeout=
e=setTimeout(function(){b.container&&(b.setSize(k,m,!1),b.hasUserSize=null)},100);b.containerWidth=k;b.containerHeight=m}}var b=this,c=b.options.chart,d=b.renderTo,e;la(na,"resize",a);la(b,"destroy",function(){Ca(na,"resize",a)})},setSize:function(a,b,c){var d=this,e,f,k;d.isResizing+=1;k=function(){d&&ba(d,"endResize",null,function(){d.isResizing-=1})};q(c,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;s(a)&&(d.chartWidth=e=H(0,L(a)),d.hasUserSize=!!e);s(b)&&(d.chartHeight=f=H(0,
L(b)));t(d.container,{width:e+"px",height:f+"px"});d.setChartSize(!0);d.renderer.setSize(e,f,c);d.maxTicks=null;A(d.axes,function(a){a.isDirty=!0;a.setScale()});A(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.getMargins();d.redraw(c);d.oldChartHeight=null;ba(d,"resize");!1===Pa?k():setTimeout(k,Pa&&Pa.duration||500)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,f=this.options.chart,k=f.spacingTop,m=f.spacingRight,r=f.spacingBottom,
h=f.spacingLeft,l=this.clipOffset,q,g,v,p;this.plotLeft=q=L(this.plotLeft);this.plotTop=g=L(this.plotTop);this.plotWidth=v=H(0,L(d-q-this.marginRight));this.plotHeight=p=H(0,L(e-g-this.marginBottom));this.plotSizeX=b?p:v;this.plotSizeY=b?v:p;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:h,y:k,width:d-h-m,height:e-k-r};this.plotBox=c.plotBox={x:q,y:g,width:v,height:p};d=2*ra(this.plotBorderWidth/2);b=La(H(d,l[3])/2);c=La(H(d,l[0])/2);this.clipBox={x:b,y:c,width:ra(this.plotSizeX-
H(d,l[1])/2-b),height:ra(this.plotSizeY-H(d,l[2])/2-c)};a||A(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this.options.chart,b=a.spacingRight,c=a.spacingBottom,d=a.spacingLeft;this.plotTop=g(this.optionsMarginTop,a.spacingTop);this.marginRight=g(this.optionsMarginRight,b);this.marginBottom=g(this.optionsMarginBottom,c);this.plotLeft=g(this.optionsMarginLeft,d);this.axisOffset=[0,0,0,0];this.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,
b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,k=this.plotBorder,m=this.plotBGImage,r=a.borderWidth||0,h=a.backgroundColor,l=a.plotBackgroundColor,q=a.plotBackgroundImage,g=a.plotBorderWidth||0,v,p=this.plotLeft,n=this.plotTop,u=this.plotWidth,I=this.plotHeight,P=this.plotBox,A=this.clipRect,w=this.clipBox;v=r+(a.shadow?8:0);if(r||h)e?e.animate(e.crisp(null,null,null,c-v,d-v)):(e={fill:h||va},r&&(e.stroke=a.borderColor,e["stroke-width"]=r),this.chartBackground=
b.rect(v/2,v/2,c-v,d-v,a.borderRadius,r).attr(e).add().shadow(a.shadow));l&&(f?f.animate(P):this.plotBackground=b.rect(p,n,u,I,0).attr({fill:l}).add().shadow(a.plotShadow));q&&(m?m.animate(P):this.plotBGImage=b.image(q,p,n,u,I).add());A?A.animate({width:w.width,height:w.height}):this.clipRect=b.clipRect(w);g&&(k?k.animate(k.crisp(null,p,n,u,I)):this.plotBorder=b.rect(p,n,u,I,0,-g).attr({stroke:a.plotBorderColor,"stroke-width":g,zIndex:1}).add());this.isDirtyBox=!1},propFromSeries:function(){var a=
this,b=a.options.chart,c,d=a.options.series,e,f;A(["inverted","angular","polar"],function(k){c=Ba[b.type||b.defaultSeriesType];f=a[k]||b[k]||c&&c.prototype[k];for(e=d&&d.length;!f&&e--;)(c=Ba[d[e].type])&&c.prototype[k]&&(f=!0);a[k]=f})},linkSeries:function(){var a=this,b=a.series;A(b,function(a){a.linkedSeries.length=0});A(b,function(b){var d=b.options.linkedTo;Q(d)&&(d=":previous"===d?a.series[b.index-1]:a.get(d))&&(d.linkedSeries.push(b),b.linkedParent=d)})},render:function(){var a=this,b=a.axes,
c=a.renderer,d=a.options,e=d.labels,f=d.credits,k;a.setTitle();a.legend=new wb(a,d.legend);a.getStacks();A(b,function(a){a.setScale()});a.getMargins();a.maxTicks=null;A(b,function(a){a.setTickPositions(!0);a.setMaxTicks()});a.adjustTickAmounts();a.getMargins();a.drawChartBox();a.hasCartesianSeries&&A(b,function(a){a.render()});a.seriesGroup||(a.seriesGroup=c.g("series-group").attr({zIndex:3}).add());A(a.series,function(a){a.translate();a.setTooltipPoints();a.render()});e.items&&A(e.items,function(b){var d=
n(e.style,b.style),f=y(d.left)+a.plotLeft,k=y(d.top)+a.plotTop+12;delete d.left;delete d.top;c.text(b.html,f,k).attr({zIndex:2}).css(d).add()});f.enabled&&!a.credits&&(k=f.href,a.credits=c.text(f.text,0,0).on("click",function(){k&&(location.href=k)}).attr({align:f.position.align,zIndex:8}).css(f.style).add().align(f.position));a.hasRendered=!0},destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;ba(a,"destroy");Ra[a.index]=K;a.renderTo.removeAttribute("data-highcharts-chart");
Ca(a);for(e=b.length;e--;)b[e]=b[e].destroy();for(e=c.length;e--;)c[e]=c[e].destroy();A("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer scroller rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});d&&(d.innerHTML="",Ca(d),f&&U(d));for(e in a)delete a[e]},isReadyToRender:function(){var a=this;return!za&&na==na.top&&"complete"!==X.readyState||Aa&&!na.canvg?(Aa?Nb.push(function(){a.firstRender()},
a.options.global.canvasToolsURL):X.attachEvent("onreadystatechange",function(){X.detachEvent("onreadystatechange",a.firstRender);"complete"===X.readyState&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options,c=a.callback;a.isReadyToRender()&&(a.getContainer(),ba(a,"init"),a.resetMargins(),a.setChartSize(),a.propFromSeries(),a.getAxes(),A(b.series||[],function(b){a.initSeries(b)}),a.linkSeries(),ba(a,"beforeRender"),a.pointer=new sa(a,b),a.render(),a.renderer.draw(),c&&c.apply(a,
[a]),A(a.callbacks,function(b){b.apply(a,[a])}),a.cloneRenderTo(!0),ba(a,"load"))}};xb.prototype.callbacks=[];var Wa=function(){};Wa.prototype={init:function(a,b,c){this.series=a;this.applyOptions(b,c);this.pointAttr={};a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter++],a.colorCounter===b.length)&&(a.colorCounter=0);a.chart.pointCount++;return this},applyOptions:function(a,b){var c=this.series,d=c.pointValKey;a=Wa.prototype.optionsToObject.call(this,
a);n(this,a);this.options=this.options?n(this.options,a):a;d&&(this.y=this[d]);this.x===K&&c&&(this.x=b===K?c.autoIncrement():b);return this},optionsToObject:function(a){var b,c=this.series,d=c.pointArrayMap||["y"],e=d.length,f=0,k=0;if("number"===typeof a||null===a)b={y:a};else if(N(a))for(b={},a.length>e&&(c=typeof a[0],"string"===c?b.name=a[0]:"number"===c&&(b.x=a[0]),f++);k<e;)b[d[k++]]=a[f++];else"object"===typeof a&&(b=a,a.dataLabels&&(c._hasPointLabels=!0),a.marker&&(c._hasPointMarkers=!0));
return b},destroy:function(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;b&&(this.setState(),O(b,this),!b.length)&&(a.hoverPoints=null);if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)Ca(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(c in this)this[c]=null},destroyElements:function(){for(var a="graphic dataLabel dataLabelUpper group connector shadowGroup".split(" "),b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,
y:this.y,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},select:function(a,b){var c=this,d=c.series,e=d.chart;a=g(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[Ga(c,d.data)]=c.options;c.setState(a&&"select");b||A(e.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,d.options.data[Ga(a,d.data)]=a.options,a.setState(""),
a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series,c=b.chart,d=c.tooltip,e=c.hoverPoint;if(e&&e!==this)e.onMouseOut();this.firePointEvent("mouseOver");d&&(!d.shared||b.noSharedTooltip)&&d.refresh(this,a);this.setState("hover");c.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;b&&-1!==Ga(this,b)||(this.firePointEvent("mouseOut"),this.setState(),a.hoverPoint=null)},tooltipFormatter:function(a){var b=this.series,c=b.tooltipOptions,d=g(c.valueDecimals,
""),e=c.valuePrefix||"",f=c.valueSuffix||"";A(b.pointArrayMap||["y"],function(b){b="{point."+b;if(e||f)a=a.replace(b+"}",e+b+"}"+f);a=a.replace(b+"}",b+":,."+d+"f}")});return R(a,{point:this,series:this.series})},update:function(a,b,c){var d=this,e=d.series,f=d.graphic,k,m=e.data,r=e.chart,h=e.options;b=g(b,!0);d.firePointEvent("update",{options:a},function(){d.applyOptions(a);z(a)&&(e.getAttribs(),f)&&(a.marker&&a.marker.symbol?d.graphic=f.destroy():f.attr(d.pointAttr[e.state]));k=Ga(d,m);e.xData[k]=
d.x;e.yData[k]=e.toYData?e.toYData(d):d.y;e.zData[k]=d.z;h.data[k]=d.options;e.isDirty=e.isDirtyData=r.isDirtyBox=!0;"point"===h.legendType&&r.legend.destroyItem(d);b&&r.redraw(c)})},remove:function(a,b){var c=this,d=c.series,e=d.chart,f,k=d.data;q(b,e);a=g(a,!0);c.firePointEvent("remove",null,function(){f=Ga(c,k);k.splice(f,1);d.options.data.splice(f,1);d.xData.splice(f,1);d.yData.splice(f,1);d.zData.splice(f,1);c.destroy();d.isDirty=!0;d.isDirtyData=!0;a&&e.redraw()})},firePointEvent:function(a,
b,c){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();"click"===a&&e.allowPointSelect&&(c=function(a){d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});ba(this,a,b,c)},importEvents:function(){if(!this.hasImportedEvents){var a=w(this.series.options.point,this.options).events,b;this.events=a;for(b in a)la(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a){var b=this.plotX,c=this.plotY,d=this.series,e=d.options.states,
f=ya[d.type].marker&&d.options.marker,k=f&&!f.enabled,m=f&&f.states[a],r=m&&!1===m.enabled,h=d.stateMarkerGraphic,l=this.marker||{},q=d.chart,g=this.pointAttr;a=a||"";if(!(a===this.state||this.selected&&"select"!==a||e[a]&&!1===e[a].enabled||a&&(r||k&&!m.enabled))){if(this.graphic)e=f&&this.graphic.symbolName&&g[a].r,this.graphic.attr(w(g[a],e?{x:b-e,y:c-e,width:2*e,height:2*e}:{}));else if(a&&m&&(e=m.radius,l=l.symbol||d.symbol,h&&h.currentSymbol!==l&&(h=h.destroy()),h?h.attr({x:b-e,y:c-e}):(d.stateMarkerGraphic=
h=q.renderer.symbol(l,b-e,c-e,2*e,2*e).attr(g[a]).add(d.markerGroup),h.currentSymbol=l)),h)h[a&&q.isInsidePlot(b,c)?"show":"hide"]();this.state=a}}};var ta=function(){};ta.prototype={isCartesian:!0,type:"line",pointClass:Wa,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},colorCounter:0,init:function(a,b){var c,d,e=a.series;this.chart=a;this.options=b=this.setOptions(b);this.linkedSeries=[];this.bindAxes();n(this,{name:b.name,
state:"",pointAttr:{},visible:!1!==b.visible,selected:!0===b.selected});Aa&&(b.animation=!1);d=b.events;for(c in d)la(this,c,d[c]);if(d&&d.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;this.getColor();this.getSymbol();this.setData(b.data,!1);this.isCartesian&&(a.hasCartesianSeries=!0);e.push(this);this._i=e.length-1;Da(e,function(a,b){return g(a.options.index,a._i)-g(b.options.index,a._i)});A(e,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},
bindAxes:function(){var a=this,b=a.options,c=a.chart,d;a.isCartesian&&A(["xAxis","yAxis"],function(e){A(c[e],function(c){d=c.options;if(b[e]===d.index||b[e]!==K&&b[e]===d.id||b[e]===K&&0===d.index)c.series.push(a),a[e]=c,c.isDirty=!0});a[e]||h(18,!0)})},autoIncrement:function(){var a=this.options,b=this.xIncrement,b=g(b,a.pointStart,0);this.pointInterval=g(this.pointInterval,a.pointInterval,1);this.xIncrement=b+this.pointInterval;return b},getSegments:function(){var a=-1,b=[],c,d=this.points,e=d.length;
if(e)if(this.options.connectNulls){for(c=e;c--;)null===d[c].y&&d.splice(c,1);d.length&&(b=[d])}else A(d,function(c,k){null===c.y?(k>a+1&&b.push(d.slice(a+1,k)),a=k):k===e-1&&b.push(d.slice(a+1,k+1))});this.segments=b},setOptions:function(a){var b=this.chart.options,c=b.plotOptions,d=c[this.type];this.userOptions=a;a=w(d,c.series,a);this.tooltipOptions=w(b.tooltip,a.tooltip);null===d.marker&&delete a.marker;return a},getColor:function(){var a=this.options,b=this.userOptions,c=this.chart.options.colors,
d=this.chart.counters,e;e=a.color||ya[this.type].color;e||a.colorByPoint||(s(b._colorIndex)?a=b._colorIndex:(b._colorIndex=d.color,a=d.color++),e=c[a]);this.color=e;d.wrapColor(c.length)},getSymbol:function(){var a=this.userOptions,b=this.options.marker,c=this.chart,d=c.options.symbols,c=c.counters;this.symbol=b.symbol;this.symbol||(s(a._symbolIndex)?a=a._symbolIndex:(a._symbolIndex=c.symbol,a=c.symbol++),this.symbol=d[a]);/^url/.test(this.symbol)&&(b.radius=0);c.wrapSymbol(d.length)},drawLegendSymbol:function(a){var b=
this.options,c=b.marker,d=a.options,e;e=d.symbolWidth;var f=this.chart.renderer,k=this.legendGroup;a=a.baseline-L(0.3*f.fontMetrics(d.itemStyle.fontSize).b);b.lineWidth&&(d={"stroke-width":b.lineWidth},b.dashStyle&&(d.dashstyle=b.dashStyle),this.legendLine=f.path(["M",0,a,"L",e,a]).attr(d).add(k));c&&c.enabled&&(b=c.radius,this.legendSymbol=e=f.symbol(this.symbol,e/2-b,a-b,2*b,2*b).add(k),e.isMarker=!0)},addPoint:function(a,b,c,d){var e=this.options,f=this.data,k=this.graph,m=this.area,r=this.chart,
h=this.xData,l=this.yData,v=this.zData,p=this.names,n=k&&k.shift||0,u=e.data;q(d,r);c&&A([k,m,this.graphNeg,this.areaNeg],function(a){a&&(a.shift=n+1)});m&&(m.isArea=!0);b=g(b,!0);d={series:this};this.pointClass.prototype.applyOptions.apply(d,[a]);h.push(d.x);l.push(this.toYData?this.toYData(d):d.y);v.push(d.z);p&&(p[d.x]=d.name);u.push(a);"point"===e.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),h.shift(),l.shift(),v.shift(),u.shift()));this.isDirtyData=this.isDirty=
!0;b&&(this.getAttribs(),r.redraw())},setData:function(a,b){var c=this.points,d=this.options,e=this.chart,f=null,k=this.xAxis,m=k&&k.categories&&!k.categories.length?[]:null,r;this.xIncrement=null;this.pointRange=k&&k.categories?1:d.pointRange;this.colorCounter=0;var l=[],q=[],v=[],p=a?a.length:[];r=g(d.turboThreshold,1E3);var n=this.pointArrayMap,n=n&&n.length,u=!!this.toYData;if(r&&p>r){for(r=0;null===f&&r<p;)f=a[r],r++;if(M(f)){f=g(d.pointStart,0);d=g(d.pointInterval,1);for(r=0;r<p;r++)l[r]=f,
q[r]=a[r],f+=d;this.xIncrement=f}else if(N(f))if(n)for(r=0;r<p;r++)d=a[r],l[r]=d[0],q[r]=d.slice(1,n+1);else for(r=0;r<p;r++)d=a[r],l[r]=d[0],q[r]=d[1];else h(12)}else for(r=0;r<p;r++)a[r]!==K&&(d={series:this},this.pointClass.prototype.applyOptions.apply(d,[a[r]]),l[r]=d.x,q[r]=u?this.toYData(d):d.y,v[r]=d.z,m&&d.name)&&(m[d.x]=d.name);Q(q[0])&&h(14,!0);this.data=[];this.options.data=a;this.xData=l;this.yData=q;this.zData=v;this.names=m;for(r=c&&c.length||0;r--;)c[r]&&c[r].destroy&&c[r].destroy();
k&&(k.minRange=k.userMinRange);this.isDirty=this.isDirtyData=e.isDirtyBox=!0;g(b,!0)&&e.redraw(!1)},remove:function(a,b){var c=this,d=c.chart;a=g(a,!0);c.isRemoving||(c.isRemoving=!0,ba(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;d.linkSeries();a&&d.redraw(b)}));c.isRemoving=!1},processData:function(a){var b=this.xData,c=this.yData,d=b.length,e;e=0;var f,k,m=this.xAxis,r=this.options,l=r.cropThreshold,q=this.isCartesian;if(q&&!(this.isDirty||m.isDirty||this.yAxis.isDirty||
a))return!1;if(q&&this.sorted&&(!l||d>l||this.forceCrop))if(a=m.min,m=m.max,b[d-1]<a||b[0]>m)b=[],c=[];else if(b[0]<a||b[d-1]>m)e=this.cropData(this.xData,this.yData,a,m),b=e.xData,c=e.yData,e=e.start,f=!0;for(m=b.length-1;0<=m;m--)d=b[m]-b[m-1],0<d&&(k===K||d<k)?k=d:0>d&&this.requireSorting&&h(15);this.cropped=f;this.cropStart=e;this.processedXData=b;this.processedYData=c;null===r.pointRange&&(this.pointRange=k||1);this.closestPointRange=k},cropData:function(a,b,c,d){var e=a.length,f=0,k=e,m;for(m=
0;m<e;m++)if(a[m]>=c){f=H(0,m-1);break}for(;m<e;m++)if(a[m]>d){k=m+1;break}return{xData:a.slice(f,k),yData:b.slice(f,k),start:f,end:k}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,k=d.length,m=this.cropStart||0,h,l=this.hasGroupedData,q,g=[],v;b||l||(b=[],b.length=a.length,b=this.data=b);for(v=0;v<k;v++)h=m+v,l?g[v]=(new f).init(this,[d[v]].concat(ga(e[v]))):(b[h]?q=b[h]:a[h]!==K&&(b[h]=q=(new f).init(this,a[h],d[v])),
g[v]=q);if(b&&(k!==(c=b.length)||l))for(v=0;v<c;v++)if(v===m&&!l&&(v+=k),b[v])b[v].destroyElements(),b[v].plotX=K;this.data=b;this.points=g},setStackedPoints:function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var a=this.processedXData,b=this.processedYData,c=b.length,d=this.options,e=d.threshold,f=d.stack,d=d.stacking,k=this.stackKey,m="-"+k,h=this.yAxis,l=h.stacks,q=h.oldStacks,g=h.stackExtremes,v,p,n,u,I;for(n=0;n<c;n++)u=a[n],I=b[n],p=(v=
this.negStacks&&I<e)?m:k,"number"===typeof I&&!g[k]&&(g[k]={dataMin:I,dataMax:I}),l[p]||(l[p]={}),l[p][u]||(q[p]&&q[p][u]?(l[p][u]=q[p][u],l[p][u].total=null):l[p][u]=new Y(h,h.options.stackLabels,v,u,f,d)),p=l[p][u],v=p.total,p.addValue(I||0),p.cacheExtremes(this,[v,v+(I||0)]),"number"===typeof I&&(g[k].dataMin=W(g[k].dataMin,p.total,I),g[k].dataMax=H(g[k].dataMax,p.total,I));h.oldStacks={}}},getExtremes:function(){var a=this.yAxis,b=this.stackKey,c,d,e=this.options,f=a.isLog?null:e.threshold,k=
this.processedXData,m=this.processedYData,h=m.length,l=[],q=0,v=this.xAxis.getExtremes(),p=v.min,v=v.max,n;e.stacking&&(c=a.stackExtremes[b],d=c.dataMin,c=c.dataMax,d=W(d,g(f,d)),c=H(c,g(f,c)));if(!s(d)||!s(c)){for(b=0;b<h;b++)if(n=k[b],f=m[b],e=null!==f&&f!==K&&(!a.isLog||f.length||0<f),n=this.getExtremesFromAll||this.cropped||(k[b+1]||n)>=p&&(k[b-1]||n)<=v,e&&n)if(e=f.length)for(;e--;)null!==f[e]&&(l[q++]=f[e]);else l[q++]=f;d=g(d,$(l));c=g(c,T(l))}this.dataMin=d;this.dataMax=c},translate:function(){this.processedXData||
this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,k=f.length,m=!!this.modifyValue,h=a.pointPlacement,l="between"===h||M(h),q=a.threshold,a=0;a<k;a++){var v=f[a],p=v.x,n=v.y,u=v.low,I=e.stacks[(this.negStacks&&n<q?"-":"")+this.stackKey],P;e.isLog&&0>=n&&(v.y=n=null);v.plotX=c.translate(p,0,0,0,1,h);b&&this.visible&&I&&I[p]&&(I=I[p],P=I.total,I.cum=u=I.cum-n,n=u+n,0===I.cum&&(u=g(q,e.min)),e.isLog&&0>=u&&(u=null),"percent"===
b&&(u=P?100*u/P:0,n=P?100*n/P:0),v.percentage=P?100*v.y/P:0,v.total=v.stackTotal=P,v.stackY=n,I.setOffset(this.pointXOffset||0,this.barW||0));v.yBottom=s(u)?e.translate(u,0,1,0,1):null;m&&(n=this.modifyValue(n,v));v.plotY="number"===typeof n&&Infinity!==n?e.translate(n,0,1,0,1):K;v.clientX=l?c.translate(p,0,0,0,1):v.plotX;v.negative=v.y<(q||0);v.category=d&&d[v.x]!==K?d[v.x]:v.x}this.getSegments()},setTooltipPoints:function(a){var b=[],c,d,e=(c=this.xAxis)?c.tooltipLen||c.len:this.chart.plotSizeX,
f,k,m,h=[];if(!1!==this.options.enableMouseTracking){a&&(this.tooltipPoints=null);A(this.segments||this.points,function(a){b=b.concat(a)});c&&c.reversed&&(b=b.reverse());this.orderTooltipPoints&&this.orderTooltipPoints(b);a=b.length;for(m=0;m<a;m++)for(f=b[m],k=b[m+1],c=b[m-1]?d+1:0,d=b[m+1]?W(H(0,ra((f.clientX+(k?k.wrappedClientX||k.clientX:e))/2)),e):e;0<=c&&c<=d;)h[c++]=f;this.tooltipPoints=h}},tooltipHeaderFormatter:function(a){var b=this.tooltipOptions,c=b.xDateFormat,d=b.dateTimeLabelFormats,
e=this.xAxis,f=e&&"datetime"===e.options.type,b=b.headerFormat,e=e&&e.closestPointRange,k;if(f&&!c)if(e)for(k in aa){if(aa[k]>=e){c=d[k];break}}else c=d.day;f&&c&&M(a.key)&&(b=b.replace("{point.key}","{point.key:"+c+"}"));return R(b,{point:a,series:this})},onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&ba(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,
d=b.hoverPoint;if(d)d.onMouseOut();this&&a.events.mouseOut&&ba(this,"mouseOut");!c||a.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState();b.hoverSeries=null},animate:function(a){var b=this,c=b.chart,d=c.renderer,e;e=b.options.animation;var f=c.clipBox,k=c.inverted,m;e&&!z(e)&&(e=ya[b.type].animation);m="_sharedClip"+e.duration+e.easing;if(a)a=c[m],e=c[m+"m"],a||(c[m]=a=d.clipRect(n(f,{width:0})),c[m+"m"]=e=d.clipRect(-99,k?-c.plotLeft:-c.plotTop,99,k?c.chartWidth:c.chartHeight)),
b.group.clip(a),b.markerGroup.clip(e),b.sharedClipKey=m;else{if(a=c[m])a.animate({width:c.plotSizeX},e),c[m+"m"].animate({width:c.plotSizeX+99},e);b.animate=null;b.animationTimeout=setTimeout(function(){b.afterAnimate()},e.duration)}},afterAnimate:function(){var a=this.chart,b=this.sharedClipKey,c=this.group;c&&!1!==this.options.clip&&(c.clip(a.clipRect),this.markerGroup.clip());setTimeout(function(){b&&a[b]&&(a[b]=a[b].destroy(),a[b+"m"]=a[b+"m"].destroy())},100)},drawPoints:function(){var a,b=this.points,
c=this.chart,d,e,f,k,m,h,l,q,v=this.options.marker,p,u=this.markerGroup;if(v.enabled||this._hasPointMarkers)for(f=b.length;f--;)(k=b[f],d=ra(k.plotX),e=k.plotY,q=k.graphic,h=k.marker||{},a=v.enabled&&h.enabled===K||h.enabled,p=c.isInsidePlot(L(d),e,c.inverted),a&&e!==K&&!isNaN(e)&&null!==k.y)?(a=k.pointAttr[k.selected?"select":""],m=a.r,h=g(h.symbol,this.symbol),l=0===h.indexOf("url"),q)?q.attr({visibility:p?za?"inherit":"visible":"hidden"}).animate(n({x:d-m,y:e-m},q.symbolName?{width:2*m,height:2*
m}:{})):p&&(0<m||l)&&(k.graphic=c.renderer.symbol(h,d-m,e-m,2*m,2*m).attr(a).add(u)):q&&(k.graphic=q.destroy())},convertAttribs:function(a,b,c,d){var e=this.pointAttrToOptions,f,k,m={};a=a||{};b=b||{};c=c||{};d=d||{};for(f in e)k=e[f],m[f]=g(a[k],b[f],c[f],d[f]);return m},getAttribs:function(){var a=this,b=a.options,c=ya[a.type].marker?b.marker:b,d=c.states,e=d.hover,f,k=a.color,m={stroke:k,fill:k},h=a.points||[],l=[],q,v=a.pointAttrToOptions,g=b.negativeColor,p;b.marker?(e.radius=e.radius||c.radius+
2,e.lineWidth=e.lineWidth||c.lineWidth+1):e.color=e.color||Ha(e.color||k).brighten(e.brightness).get();l[""]=a.convertAttribs(c,m);A(["hover","select"],function(b){l[b]=a.convertAttribs(d[b],l[""])});a.pointAttr=l;for(k=h.length;k--;){m=h[k];(c=m.options&&m.options.marker||m.options)&&!1===c.enabled&&(c.radius=0);m.negative&&g&&(m.color=m.fillColor=g);f=b.colorByPoint||m.color;if(m.options)for(p in v)s(c[v[p]])&&(f=!0);f?(c=c||{},q=[],d=c.states||{},f=d.hover=d.hover||{},b.marker||(f.color=Ha(f.color||
m.color).brighten(f.brightness||e.brightness).get()),q[""]=a.convertAttribs(n({color:m.color},c),l[""]),q.hover=a.convertAttribs(d.hover,l.hover,q[""]),q.select=a.convertAttribs(d.select,l.select,q[""]),m.negative&&b.marker&&g&&(q[""].fill=q.hover.fill=q.select.fill=a.convertAttribs({fillColor:g}).fill)):q=l;m.pointAttr=q}},update:function(a,b){var c=this.chart,d=this.type;a=w(this.userOptions,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1);n(this,
Ba[a.type||d].prototype);this.init(c,a);g(b,!0)&&c.redraw(!1)},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(Qa),d,e,f=a.data||[],k,m,h;ba(a,"destroy");Ca(a);A(["xAxis","yAxis"],function(b){if(h=a[b])O(h.series,a),h.isDirty=h.forceRedraw=!0});a.legendItem&&a.chart.legend.destroyItem(a);for(e=f.length;e--;)(k=f[e])&&k.destroy&&k.destroy();a.points=null;clearTimeout(a.animationTimeout);A("area graph dataLabelsGroup group markerGroup tracker graphNeg areaNeg posClip negClip".split(" "),
function(b){a[b]&&(d=c&&"group"===b?"hide":"destroy",a[b][d]())});b.hoverSeries===a&&(b.hoverSeries=null);O(b.series,a);for(m in a)delete a[m]},drawDataLabels:function(){var a=this,b=a.options.dataLabels,c=a.points,d,e,f,k;if(b.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(b),k=a.plotGroup("dataLabelsGroup","data-labels",a.visible?"visible":"hidden",b.zIndex||6),e=b,A(c,function(c){var h,l=c.dataLabel,q,v,p=c.connector,n=!0;d=c.options&&c.options.dataLabels;h=e.enabled||d&&d.enabled;
if(l&&!h)c.dataLabel=l.destroy();else if(h){b=w(e,d);h=b.rotation;q=c.getLabelConfig();f=b.format?R(b.format,q):b.formatter.call(q,b);b.style.color=g(b.color,b.style.color,a.color,"black");if(l)if(s(f))l.attr({text:f}),n=!1;else{if(c.dataLabel=l=l.destroy(),p)c.connector=p.destroy()}else if(s(f)){l={fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,r:b.borderRadius||0,rotation:h,padding:b.padding,zIndex:1};for(v in l)l[v]===K&&delete l[v];l=c.dataLabel=a.chart.renderer[h?"text":
"label"](f,0,-999,null,null,null,b.useHTML).attr(l).css(b.style).add(k).shadow(b.shadow)}l&&a.alignDataLabel(c,l,b,null,n)}})},alignDataLabel:function(a,b,c,d,e){var f=this.chart,k=f.inverted,m=g(a.plotX,-999),h=g(a.plotY,-999);a=b.getBBox();d=n({x:k?f.plotWidth-h:m,y:L(k?f.plotHeight-m:h),width:0,height:0},d);n(c,{width:a.width,height:a.height});c.rotation?(d={align:c.align,x:d.x+c.x+d.width/2,y:d.y+c.y+d.height/2},b[e?"attr":"animate"](d)):(b.align(c,null,d),d=b.alignAttr);b.attr({visibility:!1===
c.crop||f.isInsidePlot(d.x,d.y)&&f.isInsidePlot(d.x+a.width,d.y+a.height)?f.renderer.isSVG?"inherit":"visible":"hidden"})},getSegmentPath:function(a){var b=this,c=[],d=b.options.step;A(a,function(e,f){var k=e.plotX,m=e.plotY,h;b.getPointSpline?c.push.apply(c,b.getPointSpline(a,e,f)):(c.push(f?"L":"M"),d&&f&&(h=a[f-1],"right"===d?c.push(h.plotX,m):"center"===d?c.push((h.plotX+k)/2,h.plotY,(h.plotX+k)/2,m):c.push(k,h.plotY)),c.push(e.plotX,e.plotY))});return c},getGraphPath:function(){var a=this,b=
[],c,d=[];A(a.segments,function(e){c=a.getSegmentPath(e);1<e.length?b=b.concat(c):d.push(e[0])});a.singlePoints=d;return a.graphPath=b},drawGraph:function(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color]],d=b.lineWidth,e=b.dashStyle,f=this.getGraphPath(),k=b.negativeColor;k&&c.push(["graphNeg",k]);A(c,function(c,k){var h=c[0],l=a[h];l?(bb(l),l.animate({d:f})):d&&f.length&&(l={stroke:c[1],"stroke-width":d,zIndex:1},e&&(l.dashstyle=e),a[h]=a.chart.renderer.path(f).attr(l).add(a.group).shadow(!k&&
b.shadow))})},clipNeg:function(){var a=this.options,b=this.chart,c=b.renderer,d=a.negativeColor||a.negativeFillColor,e,f=this.graph,k=this.area,m=this.posClip,h=this.negClip;e=b.chartWidth;var l=b.chartHeight,q=H(e,l),v=this.yAxis;d&&(f||k)&&(d=L(v.toPixels(a.threshold||0,!0)),a={x:0,y:0,width:q,height:d},q={x:0,y:d,width:q,height:q},b.inverted&&(a.height=q.y=b.plotWidth-d,c.isVML&&(a={x:b.plotWidth-d-b.plotLeft,y:0,width:e,height:l},q={x:d+b.plotLeft-e,y:0,width:b.plotLeft+d,height:e})),v.reversed?
(b=q,e=a):(b=a,e=q),m?(m.animate(b),h.animate(e)):(this.posClip=m=c.clipRect(b),this.negClip=h=c.clipRect(e),f&&this.graphNeg&&(f.clip(m),this.graphNeg.clip(h)),k&&(k.clip(m),this.areaNeg.clip(h))))},invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};A(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;b.xAxis&&(la(c,"resize",a),la(b,"destroy",function(){Ca(c,"resize",a)}),a(),b.invertGroups=a)},plotGroup:function(a,b,c,d,e){var f=
this[a],k=!f;k&&(this[a]=f=this.chart.renderer.g(b).attr({visibility:c,zIndex:d||0.1}).add(e));f[k?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){return{translateX:this.xAxis?this.xAxis.left:this.chart.plotLeft,translateY:this.yAxis?this.yAxis.top:this.chart.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this.chart,b,c=this.options,d=c.animation&&!!this.animate&&a.renderer.isSVG,e=this.visible?"visible":"hidden",f=c.zIndex,k=this.hasRendered,m=a.seriesGroup;b=this.plotGroup("group",
"series",e,f,m);this.markerGroup=this.plotGroup("markerGroup","markers",e,f,m);d&&this.animate(!0);this.getAttribs();b.inverted=this.isCartesian?a.inverted:!1;this.drawGraph&&(this.drawGraph(),this.clipNeg());this.drawDataLabels();this.drawPoints();!1!==this.options.enableMouseTracking&&this.drawTracker();a.inverted&&this.invertGroups();!1===c.clip||this.sharedClipKey||k||b.clip(a.clipRect);d?this.animate():k||this.afterAnimate();this.isDirty=this.isDirtyData=!1;this.hasRendered=!0},redraw:function(){var a=
this.chart,b=this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:g(d&&d.left,a.plotLeft),translateY:g(e&&e.top,a.plotTop)}));this.translate();this.setTooltipPoints(!0);this.render();b&&ba(this,"updatedData")},setState:function(a){var b=this.options,c=this.graph,d=this.graphNeg,e=b.states,b=b.lineWidth;a=a||"";this.state!==a&&(this.state=a,e[a]&&!1===e[a].enabled||(a&&(b=e[a].lineWidth||b+1),c&&!c.dashstyle&&
(a={"stroke-width":b},c.attr(a),d&&d.attr(a))))},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,k=d.options.chart.ignoreHiddenSeries,m=c.visible;f=(c.visible=a=c.userOptions.visible=a===K?!m:a)?"show":"hide";A(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&A(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});A(c.linkedSeries,function(b){b.setVisible(a,
!1)});k&&(d.isDirtyBox=!0);!1!==b&&d.redraw();ba(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=a===K?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);ba(this,a?"select":"unselect")},drawTracker:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,k=f.pointer,m=f.renderer,h=f.options.tooltip.snap,l=a.tracker,q=b.cursor,v=q&&{cursor:q},q=a.singlePoints,g,p=function(){if(f.hoverSeries!==
a)a.onMouseOver()};if(e&&!c)for(g=e+1;g--;)"M"===d[g]&&d.splice(g+1,0,d[g+1]-h,d[g+2],"L"),(g&&"M"===d[g]||g===e)&&d.splice(g,0,"L",d[g-2]+h,d[g-1]);for(g=0;g<q.length;g++)e=q[g],d.push("M",e.plotX-h,e.plotY,"L",e.plotX+h,e.plotY);l?l.attr({d:d}):(a.tracker=m.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:Kb,fill:c?Kb:va,"stroke-width":b.lineWidth+(c?0:2*h),zIndex:2}).add(a.group),A([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",
p).on("mouseout",function(a){k.onTrackerMouseOut(a)}).css(v);if(nb)a.on("touchstart",p)}))}};fa=ja(ta);Ba.line=fa;ya.area=w(xa,{threshold:0});fa=ja(ta,{type:"area",getSegments:function(){var a=[],b=[],c=[],d=this.xAxis,e=this.yAxis,f=e.stacks[this.stackKey],k={},m,h,l=this.points,q,g,v;if(this.options.stacking&&!this.cropped){for(g=0;g<l.length;g++)k[l[g].x]=l[g];for(v in f)c.push(+v);c.sort(function(a,b){return a-b});A(c,function(a){k[a]?b.push(k[a]):(m=d.translate(a),q=f[a].percent?f[a].total?100*
f[a].cum/f[a].total:0:f[a].cum,h=e.toPixels(q,!0),b.push({y:null,plotX:m,clientX:m,plotY:h,yBottom:h,onMouseOver:Na}))});b.length&&a.push(b)}else ta.prototype.getSegments.call(this),a=this.segments;this.segments=a},getSegmentPath:function(a){var b=ta.prototype.getSegmentPath.call(this,a),c=[].concat(b),d,e=this.options;3===b.length&&c.push("L",b[1],b[2]);if(e.stacking&&!this.closedStacks)for(d=a.length-1;0<=d;d--)d<a.length-1&&e.step&&c.push(a[d+1].plotX,a[d].yBottom),c.push(a[d].plotX,a[d].yBottom);
else this.closeSegment(c,a);this.areaPath=this.areaPath.concat(c);return b},closeSegment:function(a,b){var c=this.yAxis.getThreshold(this.options.threshold);a.push("L",b[b.length-1].plotX,c,"L",b[0].plotX,c)},drawGraph:function(){this.areaPath=[];ta.prototype.drawGraph.apply(this);var a=this,b=this.areaPath,c=this.options,d=c.negativeColor,e=c.negativeFillColor,f=[["area",this.color,c.fillColor]];(d||e)&&f.push(["areaNeg",d,e]);A(f,function(d){var e=d[0],f=a[e];f?f.animate({d:b}):a[e]=a.chart.renderer.path(b).attr({fill:g(d[2],
Ha(d[1]).setOpacity(g(c.fillOpacity,0.75)).get()),zIndex:0}).add(a.group)})},drawLegendSymbol:function(a,b){b.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,a.options.symbolWidth,12,2).attr({zIndex:3}).add(b.legendGroup)}});Ba.area=fa;ya.spline=w(xa);ma=ja(ta,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],k=a[c+1],m,h,l,q;if(f&&k){a=f.plotY;l=k.plotX;var k=k.plotY,g;m=(1.5*d+f.plotX)/2.5;h=(1.5*e+a)/2.5;l=(1.5*d+l)/2.5;q=(1.5*e+k)/2.5;g=(q-h)*(l-d)/(l-m)+e-q;
h+=g;q+=g;h>a&&h>e?(h=H(a,e),q=2*e-h):h<a&&h<e&&(h=W(a,e),q=2*e-h);q>k&&q>e?(q=H(k,e),h=2*e-q):q<k&&q<e&&(q=W(k,e),h=2*e-q);b.rightContX=l;b.rightContY=q}c?(b=["C",f.rightContX||f.plotX,f.rightContY||f.plotY,m||d,h||e,d,e],f.rightContX=f.rightContY=null):b=["M",d,e];return b}});Ba.spline=ma;ya.areaspline=w(ya.area);Fa=fa.prototype;ma=ja(ma,{type:"areaspline",closedStacks:!0,getSegmentPath:Fa.getSegmentPath,closeSegment:Fa.closeSegment,drawGraph:Fa.drawGraph,drawLegendSymbol:Fa.drawLegendSymbol});
Ba.areaspline=ma;ya.column=w(xa,{borderColor:"#FFFFFF",borderWidth:1,borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},stickyTracking:!1,threshold:0});ma=ja(ta,{type:"column",pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",r:"borderRadius"},trackerGroups:["group",
"dataLabelsGroup"],negStacks:!0,init:function(){ta.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&A(b.series,function(b){b.type===a.type&&(b.isDirty=!0)})},getColumnMetrics:function(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,e=c.reversed,f,k={},m,h=0;!1===b.grouping?h=1:A(a.chart.series,function(b){var c=b.options,e=b.yAxis;b.type===a.type&&b.visible&&d.len===e.len&&d.pos===e.pos&&(c.stacking?(f=b.stackKey,k[f]===K&&(k[f]=h++),m=k[f]):!1!==c.grouping&&(m=h++),b.columnIndex=
m)});var c=W(ha(c.transA)*(c.ordinalSlope||b.pointRange||c.closestPointRange||1),c.len),l=c*b.groupPadding,q=(c-2*l)/h,v=b.pointWidth,b=s(v)?(q-v)/2:q*b.pointPadding,v=g(v,q-2*b);return a.columnMetrics={width:v,offset:b+(l+((e?h-(a.columnIndex||0):a.columnIndex)||0)*q-c/2)*(e?-1:1)}},translate:function(){var a=this.chart,b=this.options,c=b.borderWidth,d=this.yAxis,e=this.translatedThreshold=d.getThreshold(b.threshold),f=g(b.minPointLength,5),b=this.getColumnMetrics(),k=b.width,m=this.barW=La(H(k,
1+2*c)),h=this.pointXOffset=b.offset,l=-(c%2?0.5:0),q=c%2?0.5:1;a.renderer.isVML&&a.inverted&&(q+=1);ta.prototype.translate.apply(this);A(this.points,function(a){var b=W(H(-999,a.plotY),d.len+999),c=g(a.yBottom,e),v=a.plotX+h,p=m,n=W(b,c),u,b=H(b,c)-n;ha(b)<f&&f&&(b=f,n=L(ha(n-e)>f?c-f:e-(d.translate(a.y,0,1,0,1)<=e?f:0)));a.barX=v;a.pointWidth=k;c=0.5>ha(v);p=L(v+p)+l;v=L(v)+l;p-=v;u=0.5>ha(n);b=L(n+b)+q;n=L(n)+q;b-=n;c&&(v+=1,p-=1);u&&(n-=1,b+=1);a.shapeType="rect";a.shapeArgs={x:v,y:n,width:p,
height:b}})},getSymbol:Na,drawLegendSymbol:fa.prototype.drawLegendSymbol,drawGraph:Na,drawPoints:function(){var a=this,b=a.options,c=a.chart.renderer,d;A(a.points,function(e){var f=e.plotY,k=e.graphic;f===K||isNaN(f)||null===e.y?k&&(e.graphic=k.destroy()):(d=e.shapeArgs,k?(bb(k),k.animate(w(d))):e.graphic=c[e.shapeType](d).attr(e.pointAttr[e.selected?"select":""]).add(a.group).shadow(b.shadow,null,b.stacking&&!b.borderRadius))})},drawTracker:function(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,
e=d&&{cursor:d},f=function(c){var d=c.target,e;if(b.hoverSeries!==a)a.onMouseOver();for(;d&&!e;)e=d.point,d=d.parentNode;if(e!==K&&e!==b.hoverPoint)e.onMouseOver(c)};A(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.element.point=a)});a._hasTracking||(A(a.trackerGroups,function(b){if(a[b]&&(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){c.onTrackerMouseOut(a)}).css(e),nb))a[b].on("touchstart",f)}),a._hasTracking=!0)},alignDataLabel:function(a,
b,c,d,e){var f=this.chart,k=f.inverted,h=a.dlBox||a.shapeArgs,l=a.below||a.plotY>g(this.translatedThreshold,f.plotSizeY),q=g(c.inside,!!this.options.stacking);h&&(d=w(h),k&&(d={x:f.plotWidth-d.y-d.height,y:f.plotHeight-d.x-d.width,width:d.height,height:d.width}),!q)&&(k?(d.x+=l?0:d.width,d.width=0):(d.y+=l?d.height:0,d.height=0));c.align=g(c.align,!k||q?"center":l?"right":"left");c.verticalAlign=g(c.verticalAlign,k||q?"middle":l?"top":"bottom");ta.prototype.alignDataLabel.call(this,a,b,c,d,e)},animate:function(a){var b=
this.yAxis,c=this.options,d=this.chart.inverted,e={};za&&(a?(e.scaleY=0.001,a=W(b.pos+b.len,H(b.pos,b.toPixels(c.threshold))),d?e.translateX=a-b.len:e.translateY=a,this.group.attr(e)):(e.scaleY=1,e[d?"translateX":"translateY"]=b.pos,this.group.animate(e,this.options.animation),this.animate=null))},remove:function(){var a=this,b=a.chart;b.hasRendered&&A(b.series,function(b){b.type===a.type&&(b.isDirty=!0)});ta.prototype.remove.apply(a,arguments)}});Ba.column=ma;ya.bar=w(ya.column);Fa=ja(ma,{type:"bar",
inverted:!0});Ba.bar=Fa;ya.scatter=w(xa,{lineWidth:0,tooltip:{headerFormat:'<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",followPointer:!0},stickyTracking:!1});Fa=ja(ta,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["markerGroup"],drawTracker:ma.prototype.drawTracker,setTooltipPoints:Na});Ba.scatter=Fa;ya.pie=w(xa,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,
colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.name}},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});xa={type:"pie",isCartesian:!1,pointClass:ja(Wa,{init:function(){Wa.prototype.init.apply(this,arguments);var a=this,b;0>a.y&&(a.y=null);n(a,{visible:!1!==a.visible,name:g(a.name,"Slice")});b=function(b){a.slice("select"===
b.type)};la(a,"select",b);la(a,"unselect",b);return a},setVisible:function(a){var b=this,c=b.series,d=c.chart,e;b.visible=b.options.visible=a=a===K?!b.visible:a;c.options.data[Ga(b,c.data)]=b.options;e=a?"show":"hide";A(["graphic","dataLabel","connector","shadowGroup"],function(a){if(b[a])b[a][e]()});b.legendItem&&d.legend.colorizeItem(b,a);!c.isDirty&&c.options.ignoreHiddenPoint&&(c.isDirty=!0,d.redraw())},slice:function(a,b,c){var d=this.series;q(c,d.chart);g(b,!0);this.sliced=this.options.sliced=
a=s(a)?a:!this.sliced;d.options.data[Ga(this,d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)}}),requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},getColor:Na,animate:function(a){var b=this,c=b.points,d=b.startAngleRad;a||(A(c,function(a){var c=a.graphic;a=a.shapeArgs;c&&(c.attr({r:b.center[3]/
2,start:d,end:d}),c.animate({r:a.r,start:a.start,end:a.end},b.options.animation))}),b.animate=null)},setData:function(a,b){ta.prototype.setData.call(this,a,!1);this.processData();this.generatePoints();g(b,!0)&&this.chart.redraw()},generatePoints:function(){var a,b=0,c,d,e,f=this.options.ignoreHiddenPoint;ta.prototype.generatePoints.call(this);c=this.points;d=c.length;for(a=0;a<d;a++)e=c[a],b+=f&&!e.visible?0:e.y;this.total=b;for(a=0;a<d;a++)e=c[a],e.percentage=0<b?100*(e.y/b):0,e.total=b},getCenter:function(){var a=
this.options,b=this.chart,c=2*(a.slicedOffset||0),d,e=b.plotWidth-2*c,f=b.plotHeight-2*c,b=a.center,a=[g(b[0],"50%"),g(b[1],"50%"),a.size||"100%",a.innerSize||0],k=W(e,f),h;return Va(a,function(a,b){h=/%$/.test(a);d=2>b||2===b&&h;return(h?[e,f,k,k][b]*y(a)/100:a)+(d?c:0)})},translate:function(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,k,h,l=this.startAngleRad=Ua/180*((c.startAngle||0)%360-90),q=this.points,v=2*Ua,g=c.dataLabels.distance,c=c.ignoreHiddenPoint,
p,n=q.length,u;a||(this.center=a=this.getCenter());this.getX=function(b,c){h=ua.asin((b-a[1])/(a[2]/2+g));return a[0]+(c?-1:1)*wa(h)*(a[2]/2+g)};for(p=0;p<n;p++){u=q[p];f=L(1E3*(l+b*v))/1E3;if(!c||u.visible)b+=u.percentage/100;k=L(1E3*(l+b*v))/1E3;u.shapeType="arc";u.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:f,end:k};h=(k+f)/2;h>0.75*v&&(h-=2*Ua);u.slicedTranslation={translateX:L(wa(h)*d),translateY:L(Ea(h)*d)};f=wa(h)*a[2]/2;k=Ea(h)*a[2]/2;u.tooltipPos=[a[0]+0.7*f,a[1]+0.7*k];u.half=
h<v/4?0:1;u.angle=h;e=W(e,g/2);u.labelPos=[a[0]+f+wa(h)*g,a[1]+k+Ea(h)*g,a[0]+f+wa(h)*e,a[1]+k+Ea(h)*e,a[0]+f,a[1]+k,0>g?"center":u.half?"right":"left",h]}this.setTooltipPoints()},drawGraph:null,drawPoints:function(){var a=this,b=a.chart.renderer,c,d,e=a.options.shadow,f,k;e&&!a.shadowGroup&&(a.shadowGroup=b.g("shadow").add(a.group));A(a.points,function(h){d=h.graphic;k=h.shapeArgs;f=h.shadowGroup;e&&!f&&(f=h.shadowGroup=b.g("shadow").add(a.shadowGroup));c=h.sliced?h.slicedTranslation:{translateX:0,
translateY:0};f&&f.attr(c);d?d.animate(n(k,c)):h.graphic=d=b.arc(k).setRadialReference(a.center).attr(h.pointAttr[h.selected?"select":""]).attr({"stroke-linejoin":"round"}).attr(c).add(a.group).shadow(e,f);!1===h.visible&&h.setVisible(!1)})},drawDataLabels:function(){var a=this,b=a.data,c,d=a.chart,e=a.options.dataLabels,f=g(e.connectorPadding,10),k=g(e.connectorWidth,1),h=d.plotWidth,d=d.plotHeight,l,q,v=g(e.softConnector,!0),p=e.distance,n=a.center,u=n[2]/2,I=n[1],P=0<p,w,s,t,B,C=[[],[]],z,Y,sa,
G,y,F=[0,0,0,0],Z=function(a,b){return b.y-a.y},Ta=function(a,b){a.sort(function(a,c){return void 0!==a.angle&&(c.angle-a.angle)*b})};if(a.visible&&(e.enabled||a._hasPointLabels)){ta.prototype.drawDataLabels.apply(a);A(b,function(a){a.dataLabel&&C[a.half].push(a)});for(G=0;!B&&b[G];)B=b[G]&&b[G].dataLabel&&(b[G].dataLabel.getBBox().height||21),G++;for(G=2;G--;){var b=[],R=[],K=C[G],N=K.length,oa;Ta(K,G-0.5);if(0<p){for(y=I-u-p;y<=I+u+p;y+=B)b.push(y);s=b.length;if(N>s){c=[].concat(K);c.sort(Z);for(y=
N;y--;)c[y].rank=y;for(y=N;y--;)K[y].rank>=s&&K.splice(y,1);N=K.length}for(y=0;y<N;y++){c=K[y];t=c.labelPos;c=9999;var X,O;for(O=0;O<s;O++)X=ha(b[O]-t[1]),X<c&&(c=X,oa=O);if(oa<y&&null!==b[y])oa=y;else for(s<N-y+oa&&null!==b[y]&&(oa=s-N+y);null===b[oa];)oa++;R.push({i:oa,y:b[oa]});b[oa]=null}R.sort(Z)}for(y=0;y<N;y++){c=K[y];t=c.labelPos;w=c.dataLabel;sa=!1===c.visible?"hidden":"visible";c=t[1];if(0<p){if(s=R.pop(),oa=s.i,Y=s.y,c>Y&&null!==b[oa+1]||c<Y&&null!==b[oa-1])Y=c}else Y=c;z=e.justify?n[0]+
(G?-1:1)*(u+p):a.getX(0===oa||oa===b.length-1?c:Y,G);w._attr={visibility:sa,align:t[6]};w._pos={x:z+e.x+({left:f,right:-f}[t[6]]||0),y:Y+e.y-10};w.connX=z;w.connY=Y;null===this.options.size&&(s=w.width,z-s<f?F[3]=H(L(s-z+f),F[3]):z+s>h-f&&(F[1]=H(L(z+s-h+f),F[1])),0>Y-B/2?F[0]=H(L(-Y+B/2),F[0]):Y+B/2>d&&(F[2]=H(L(Y+B/2-d),F[2])))}}if(0===T(F)||this.verifyDataLabelOverflow(F))this.placeDataLabels(),P&&k&&A(this.points,function(b){l=b.connector;t=b.labelPos;(w=b.dataLabel)&&w._pos?(sa=w._attr.visibility,
z=w.connX,Y=w.connY,q=v?["M",z+("left"===t[6]?5:-5),Y,"C",z,Y,2*t[2]-t[4],2*t[3]-t[5],t[2],t[3],"L",t[4],t[5]]:["M",z+("left"===t[6]?5:-5),Y,"L",t[2],t[3],"L",t[4],t[5]],l?(l.animate({d:q}),l.attr("visibility",sa)):b.connector=l=a.chart.renderer.path(q).attr({"stroke-width":k,stroke:e.connectorColor||b.color||"#606060",visibility:sa}).add(a.group)):l&&(b.connector=l.destroy())})}},verifyDataLabelOverflow:function(a){var b=this.center,c=this.options,d=c.center,e=c=c.minSize||80,f;null!==d[0]?e=H(b[2]-
H(a[1],a[3]),c):(e=H(b[2]-a[1]-a[3],c),b[0]+=(a[3]-a[1])/2);null!==d[1]?e=H(W(e,b[2]-H(a[0],a[2])),c):(e=H(W(e,b[2]-a[0]-a[2]),c),b[1]+=(a[0]-a[2])/2);e<b[2]?(b[2]=e,this.translate(b),A(this.points,function(a){a.dataLabel&&(a.dataLabel._pos=null)}),this.drawDataLabels()):f=!0;return f},placeDataLabels:function(){A(this.points,function(a){a=a.dataLabel;var b;a&&((b=a._pos)?(a.attr(a._attr),a[a.moved?"animate":"attr"](b),a.moved=!0):a&&a.attr({y:-999}))})},alignDataLabel:Na,drawTracker:ma.prototype.drawTracker,
drawLegendSymbol:fa.prototype.drawLegendSymbol,getSymbol:Na};xa=ja(ta,xa);Ba.pie=xa;n(Highcharts,{Axis:Ta,Chart:xb,Color:Ha,Legend:wb,Pointer:sa,Point:Wa,Tick:I,Tooltip:oa,Renderer:ab,Series:ta,SVGElement:P,SVGRenderer:Sa,arrayMin:$,arrayMax:T,charts:Ra,dateFormat:db,format:R,pathAnim:zb,getOptions:function(){return qa},hasBidiBug:Ob,isTouchDevice:Ib,numberFormat:p,seriesTypes:Ba,setOptions:function(a){qa=w(qa,a);v();return qa},addEvent:la,removeEvent:Ca,createElement:S,discardElement:U,css:t,each:A,
extend:n,map:Va,merge:w,pick:g,splat:ga,extendClass:ja,pInt:y,wrap:G,svg:za,canvas:Aa,vml:!za&&!Aa,product:"Highcharts",version:"3.0.5"})})();(function(n,w){function y(h,l,q){this.init.call(this,h,l,q)}function Q(h,l,q){h.call(this,l,q);this.chart.polar&&(this.closeSegment=function(h){var l=this.xAxis.center;h.push("L",l[0],l[1])},this.closedStacks=!0)}function z(h,l){var q=this.chart,v=this.options.animation,g=this.group,p=this.markerGroup,n=this.xAxis.center,t=q.plotLeft,w=q.plotTop;if(q.polar){if(q.renderer.isSVG)if(!0===v&&(v={}),l){if(q={translateX:n[0]+t,translateY:n[1]+w,scaleX:0.001,scaleY:0.001},g.attr(q),p)p.attrSetters=g.attrSetters,
p.attr(q)}else q={translateX:t,translateY:w,scaleX:1,scaleY:1},g.animate(q,v),p&&p.animate(q,v),this.animate=null}else h.call(this,l)}var N=n.arrayMin,M=n.arrayMax,V=n.each,ca=n.extend,O=n.merge,s=n.map,F=n.pick,ga=n.pInt,g=n.getOptions().plotOptions,t=n.seriesTypes,S=n.extendClass,ja=n.splat,p=n.wrap,Z=n.Axis,G=n.Tick,R=n.Series,ia=t.column.prototype,pa=Math,C=pa.round,B=pa.floor,cb=pa.max,Da=function(){};ca(y.prototype,{init:function(h,l,q){var g=this,p=g.defaultOptions;g.chart=l;l.angular&&(p.background=
{});g.options=h=O(p,h);(h=h.background)&&V([].concat(ja(h)).reverse(),function(h){var l=h.backgroundColor;h=O(g.defaultBackgroundOptions,h);l&&(h.backgroundColor=l);h.color=h.backgroundColor;q.options.plotBands.unshift(h)})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"silver",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#FFF"],[1,"#DDD"]]},from:Number.MIN_VALUE,innerRadius:0,to:Number.MAX_VALUE,
outerRadius:"105%"}});var $=Z.prototype,G=G.prototype,T={getOffset:Da,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:Da,setCategories:Da,setTitle:Da},ea={isRadial:!0,defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,plotBands:[],tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,
distance:15,x:0,y:null},maxPadding:0,minPadding:0,plotBands:[],showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},plotBands:[],showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(h){this.options=O(this.defaultOptions,this.defaultRadialOptions,h)},getOffset:function(){$.getOffset.call(this);this.chart.axisOffset[this.side]=0;this.center=this.pane.center=t.pie.prototype.getCenter.call(this.pane)},getLinePath:function(h,
l){var q=this.center;l=F(l,q[2]/2-this.offset);return this.chart.renderer.symbols.arc(this.left+q[0],this.top+q[1],l,l,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0})},setAxisTranslation:function(){$.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.isXAxis)&&(this.minPixelPadding=this.transA*this.minPointOffset+(this.reversed?(this.endAngleRad-this.startAngleRad)/
4:0))},beforeSetTickPositions:function(){this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange)},setAxisSize:function(){$.setAxisSize.call(this);this.center&&(this.len=this.width=this.height=this.isCircular?this.center[2]*(this.endAngleRad-this.startAngleRad)/2:this.center[2]/2)},getPosition:function(h,l){this.isCircular||(l=this.translate(h),h=this.min);return this.postTranslate(this.translate(h),F(l,this.center[2]/2)-this.offset)},postTranslate:function(h,l){var q=
this.chart,g=this.center;h=this.startAngleRad+h;return{x:q.plotLeft+g[0]+Math.cos(h)*l,y:q.plotTop+g[1]+Math.sin(h)*l}},getPlotBandPath:function(h,l,q){var g=this.center,p=this.startAngleRad,n=g[2]/2,u=[F(q.outerRadius,"100%"),q.innerRadius,F(q.thickness,10)],t=/%$/,w,B=this.isCircular;"polygon"===this.options.gridLineInterpolation?g=this.getPlotLinePath(h).concat(this.getPlotLinePath(l,!0)):(B||(u[0]=this.translate(h),u[1]=this.translate(l)),u=s(u,function(h){t.test(h)&&(h=ga(h,10)*n/100);return h}),
"circle"!==q.shape&&B?(h=p+this.translate(h),l=p+this.translate(l)):(h=-Math.PI/2,l=1.5*Math.PI,w=!0),g=this.chart.renderer.symbols.arc(this.left+g[0],this.top+g[1],u[0],u[0],{start:h,end:l,innerR:F(u[1],u[0]-u[2]),open:w}));return g},getPlotLinePath:function(h,l){var q=this.center,g=this.chart,p=this.getPosition(h),n,u,t;this.isCircular?t=["M",q[0]+g.plotLeft,q[1]+g.plotTop,"L",p.x,p.y]:"circle"===this.options.gridLineInterpolation?(h=this.translate(h))&&(t=this.getLinePath(0,h)):(n=g.xAxis[0],t=
[],h=this.translate(h),q=n.tickPositions,n.autoConnect&&(q=q.concat([q[0]])),l&&(q=[].concat(q).reverse()),V(q,function(l,q){u=n.getPosition(l,h);t.push(q?"L":"M",u.x,u.y)}));return t},getTitlePosition:function(){var h=this.center,l=this.chart,q=this.options.title;return{x:l.plotLeft+h[0]+(q.x||0),y:l.plotTop+h[1]-{high:0.5,middle:0.25,low:0}[q.align]*h[2]+(q.y||0)}}};p($,"init",function(h,l,q){var g,p=l.angular,n=l.polar,u=q.isX,t=p&&u,s,B;B=l.options;var z=q.pane||0;if(p){if(ca(this,t?T:ea),s=!u)this.defaultRadialOptions=
this.defaultRadialGaugeOptions}else n&&(ca(this,ea),this.defaultRadialOptions=(s=u)?this.defaultRadialXOptions:O(this.defaultYAxisOptions,this.defaultRadialYOptions));h.call(this,l,q);t||!p&&!n||(h=this.options,l.panes||(l.panes=[]),this.pane=(g=l.panes[z]=l.panes[z]||new y(ja(B.pane)[z],l,this),z=g),z=z.options,l.inverted=!1,B.chart.zoomType=null,this.startAngleRad=l=(z.startAngle-90)*Math.PI/180,this.endAngleRad=B=(F(z.endAngle,z.startAngle+360)-90)*Math.PI/180,this.offset=h.offset||0,(this.isCircular=
s)&&q.max===w&&B-l===2*Math.PI&&(this.autoConnect=!0))});p(G,"getPosition",function(h,l,q,g,p){var n=this.axis;return n.getPosition?n.getPosition(q):h.call(this,l,q,g,p)});p(G,"getLabelPosition",function(h,l,q,g,p,n,u,t,w){var s=this.axis,B=n.y,z=n.align,C=180*((s.translate(this.pos)+s.startAngleRad+Math.PI/2)/Math.PI)%360;s.isRadial?(h=s.getPosition(this.pos,s.center[2]/2+F(n.distance,-25)),"auto"===n.rotation?g.attr({rotation:C}):null===B&&(B=0.9*ga(g.styles.lineHeight)-g.getBBox().height/2),null===
z&&(z=s.isCircular?20<C&&160>C?"left":200<C&&340>C?"right":"center":"center",g.attr({align:z})),h.x+=n.x,h.y+=B):h=h.call(this,l,q,g,p,n,u,t,w);return h});p(G,"getMarkPath",function(h,l,q,g,p,n,u){var t=this.axis;t.isRadial?(h=t.getPosition(this.pos,t.center[2]/2+g),l=["M",l,q,"L",h.x,h.y]):l=h.call(this,l,q,g,p,n,u);return l});g.arearange=O(g.area,{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
trackByArea:!0,dataLabels:{verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}});t.arearange=n.extendClass(t.area,{type:"arearange",pointArrayMap:["low","high"],toYData:function(h){return[h.low,h.high]},pointValKey:"low",getSegments:function(){var h=this;V(h.points,function(l){h.options.connectNulls||null!==l.low&&null!==l.high?null===l.low&&null!==l.high&&(l.y=l.high):l.y=null});R.prototype.getSegments.call(this)},translate:function(){var h=this.yAxis;t.area.prototype.translate.apply(this);V(this.points,
function(l){var q=l.low,g=l.high,p=l.plotY;null===g&&null===q?l.y=null:null===q?(l.plotLow=l.plotY=null,l.plotHigh=h.translate(g,0,1,0,1)):null===g?(l.plotLow=p,l.plotHigh=null):(l.plotLow=p,l.plotHigh=h.translate(g,0,1,0,1))})},getSegmentPath:function(h){var l,q=[],g=h.length,p=R.prototype.getSegmentPath,n,u;u=this.options;var t=u.step;for(l=HighchartsAdapter.grep(h,function(h){return null!==h.plotLow});g--;)n=h[g],null!==n.plotHigh&&q.push({plotX:n.plotX,plotY:n.plotHigh});h=p.call(this,l);t&&(!0===
t&&(t="left"),u.step={left:"right",center:"center",right:"left"}[t]);q=p.call(this,q);u.step=t;u=[].concat(h,q);q[0]="L";this.areaPath=this.areaPath.concat(h,q);return u},drawDataLabels:function(){var h=this.data,l=h.length,q,g=[],p=R.prototype,n=this.options.dataLabels,u,t=this.chart.inverted;if(n.enabled||this._hasPointLabels){for(q=l;q--;)u=h[q],u.y=u.high,u.plotY=u.plotHigh,g[q]=u.dataLabel,u.dataLabel=u.dataLabelUpper,u.below=!1,t?(n.align="left",n.x=n.xHigh):n.y=n.yHigh;p.drawDataLabels.apply(this,
arguments);for(q=l;q--;)u=h[q],u.dataLabelUpper=u.dataLabel,u.dataLabel=g[q],u.y=u.low,u.plotY=u.plotLow,u.below=!0,t?(n.align="right",n.x=n.xLow):n.y=n.yLow;p.drawDataLabels.apply(this,arguments)}},alignDataLabel:t.column.prototype.alignDataLabel,getSymbol:t.column.prototype.getSymbol,drawPoints:Da});g.areasplinerange=O(g.arearange);t.areasplinerange=S(t.arearange,{type:"areasplinerange",getPointSpline:t.spline.prototype.getPointSpline});g.columnrange=O(g.column,g.arearange,{lineWidth:1,pointRange:null});
t.columnrange=S(t.arearange,{type:"columnrange",translate:function(){var h=this,l=h.yAxis,q;ia.translate.apply(h);V(h.points,function(g){var p=g.shapeArgs,n=h.options.minPointLength,u;g.plotHigh=q=l.translate(g.high,0,1,0,1);g.plotLow=g.plotY;u=q;g=g.plotY-q;g<n&&(n-=g,g+=n,u-=n/2);p.height=g;p.y=u})},trackerGroups:["group","dataLabels"],drawGraph:Da,pointAttrToOptions:ia.pointAttrToOptions,drawPoints:ia.drawPoints,drawTracker:ia.drawTracker,animate:ia.animate,getColumnMetrics:ia.getColumnMetrics});
g.gauge=O(g.line,{dataLabels:{enabled:!0,y:15,borderWidth:1,borderColor:"silver",borderRadius:3,style:{fontWeight:"bold"},verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1});G={type:"gauge",pointClass:n.extendClass(n.Point,{setState:function(h){this.state=h}}),angular:!0,drawGraph:Da,trackerGroups:["group","dataLabels"],translate:function(){var h=this.yAxis,l=this.options,q=h.center;this.generatePoints();V(this.points,function(g){var p=O(l.dial,g.dial),n=ga(F(p.radius,
80))*q[2]/200,u=ga(F(p.baseLength,70))*n/100,t=ga(F(p.rearLength,10))*n/100,s=p.baseWidth||3,w=p.topWidth||1,B=h.startAngleRad+h.translate(g.y,null,null,null,!0);!1===l.wrap&&(B=Math.max(h.startAngleRad,Math.min(h.endAngleRad,B)));B=180*B/Math.PI;g.shapeType="path";g.shapeArgs={d:p.path||["M",-t,-s/2,"L",u,-s/2,n,-w/2,n,w/2,u,s/2,-t,s/2,"z"],translateX:q[0],translateY:q[1],rotation:B};g.plotX=q[0];g.plotY=q[1]})},drawPoints:function(){var h=this,l=h.yAxis.center,q=h.pivot,g=h.options,p=g.pivot,n=
h.chart.renderer;V(h.points,function(l){var q=l.graphic,p=l.shapeArgs,t=p.d,s=O(g.dial,l.dial);q?(q.animate(p),p.d=t):l.graphic=n[l.shapeType](p).attr({stroke:s.borderColor||"none","stroke-width":s.borderWidth||0,fill:s.backgroundColor||"black",rotation:p.rotation}).add(h.group)});q?q.animate({translateX:l[0],translateY:l[1]}):h.pivot=n.circle(0,0,F(p.radius,5)).attr({"stroke-width":p.borderWidth||0,stroke:p.borderColor||"silver",fill:p.backgroundColor||"black"}).translate(l[0],l[1]).add(h.group)},
animate:function(h){var l=this;h||(V(l.points,function(h){var g=h.graphic;g&&(g.attr({rotation:180*l.yAxis.startAngleRad/Math.PI}),g.animate({rotation:h.shapeArgs.rotation},l.options.animation))}),l.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);t.pie.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:t.pie.prototype.setData,drawTracker:t.column.prototype.drawTracker};t.gauge=
n.extendClass(t.line,G);g.boxplot=O(g.column,{fillColor:"#FFFFFF",lineWidth:1,medianWidth:2,states:{hover:{brightness:-0.3}},threshold:null,tooltip:{pointFormat:'<span style="color:{series.color};font-weight:bold">{series.name}</span><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},whiskerLength:"50%",whiskerWidth:2});t.boxplot=S(t.column,{type:"boxplot",pointArrayMap:["low","q1","median","q3","high"],
toYData:function(h){return[h.low,h.q1,h.median,h.q3,h.high]},pointValKey:"high",pointAttrToOptions:{fill:"fillColor",stroke:"color","stroke-width":"lineWidth"},drawDataLabels:Da,translate:function(){var h=this.yAxis,l=this.pointArrayMap;t.column.prototype.translate.apply(this);V(this.points,function(g){V(l,function(l){null!==g[l]&&(g[l+"Plot"]=h.translate(g[l],0,1,0,1))})})},drawPoints:function(){var h=this,l=h.points,g=h.options,p=h.chart.renderer,n,t,u,s,z,y,G,Z,R,K,N,O,T,L,Q,$,H,W,M,U,ea,S,pa=
!1!==h.doQuartiles,ia=parseInt(h.options.whiskerLength,10)/100;V(l,function(l){R=l.graphic;ea=l.shapeArgs;N={};L={};$={};S=l.color||h.color;l.plotY!==w&&((n=l.pointAttr[l.selected?"selected":""],H=ea.width,W=B(ea.x),M=W+H,U=C(H/2),t=B(pa?l.q1Plot:l.lowPlot),u=B(pa?l.q3Plot:l.lowPlot),s=B(l.highPlot),z=B(l.lowPlot),N.stroke=l.stemColor||g.stemColor||S,N["stroke-width"]=F(l.stemWidth,g.stemWidth,g.lineWidth),N.dashstyle=l.stemDashStyle||g.stemDashStyle,L.stroke=l.whiskerColor||g.whiskerColor||S,L["stroke-width"]=
F(l.whiskerWidth,g.whiskerWidth,g.lineWidth),$.stroke=l.medianColor||g.medianColor||S,$["stroke-width"]=F(l.medianWidth,g.medianWidth,g.lineWidth),G=N["stroke-width"]%2/2,Z=W+U+G,K=["M",Z,u,"L",Z,s,"M",Z,t,"L",Z,z,"z"],pa&&(G=n["stroke-width"]%2/2,Z=B(Z)+G,t=B(t)+G,u=B(u)+G,W+=G,M+=G,O=["M",W,u,"L",W,t,"L",M,t,"L",M,u,"L",W,u,"z"]),ia&&(G=L["stroke-width"]%2/2,s+=G,z+=G,T=["M",Z-U*ia,s,"L",Z+U*ia,s,"M",Z-U*ia,z,"L",Z+U*ia,z]),G=$["stroke-width"]%2/2,y=C(l.medianPlot)+G,Q=["M",W,y,"L",M,y,"z"],R)?
(l.stem.animate({d:K}),ia&&l.whiskers.animate({d:T}),pa&&l.box.animate({d:O}),l.medianShape.animate({d:Q})):(l.graphic=R=p.g().add(h.group),l.stem=p.path(K).attr(N).add(R),ia&&(l.whiskers=p.path(T).attr(L).add(R)),pa&&(l.box=p.path(O).attr(n).add(R)),l.medianShape=p.path(Q).attr($).add(R)))})}});g.errorbar=O(g.boxplot,{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:g.arearange.tooltip.pointFormat},whiskerWidth:null});t.errorbar=S(t.boxplot,{type:"errorbar",pointArrayMap:["low",
"high"],toYData:function(h){return[h.low,h.high]},pointValKey:"high",doQuartiles:!1,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||t.column.prototype.getColumnMetrics.call(this)}});g.waterfall=O(g.column,{lineWidth:1,lineColor:"#333",dashStyle:"dot",borderColor:"#333"});t.waterfall=S(t.column,{type:"waterfall",upColorProp:"fill",pointArrayMap:["low","y"],pointValKey:"y",init:function(h,l){l.stacking=!0;t.column.prototype.init.call(this,h,l)},translate:function(){var h=
this.options,l=this.yAxis,g,p,n,s,u,w,B,z,G;g=h.threshold;h=h.borderWidth%2/2;t.column.prototype.translate.apply(this);z=g;n=this.points;p=0;for(g=n.length;p<g;p++)s=n[p],u=s.shapeArgs,w=this.getStack(p),G=w.points[this.index],isNaN(s.y)&&(s.y=this.yData[p]),B=cb(z,z+s.y)+G[0],u.y=l.translate(B,0,1),s.isSum||s.isIntermediateSum?(u.y=l.translate(G[1],0,1),u.height=l.translate(G[0],0,1)-u.y):z+=w.total,0>u.height&&(u.y+=u.height,u.height*=-1),s.plotY=u.y=C(u.y)-h,u.height=C(u.height),s.yBottom=u.y+
u.height},processData:function(h){var l=this.yData,g=this.points,p,n=l.length,t=this.options.threshold||0,u,s,w,B,z,G;s=u=w=B=t;for(G=0;G<n;G++)z=l[G],p=g?g[G]:{},"sum"===z||p.isSum?l[G]=s:"intermediateSum"===z||p.isIntermediateSum?(l[G]=u,u=t):(s+=z,u+=z),w=Math.min(s,w),B=Math.max(s,B);R.prototype.processData.call(this,h);this.dataMin=w;this.dataMax=B},toYData:function(h){return h.isSum?"sum":h.isIntermediateSum?"intermediateSum":h.y},getAttribs:function(){t.column.prototype.getAttribs.apply(this,
arguments);var h=this.options,l=h.states,g=h.upColor||this.color,h=n.Color(g).brighten(0.1).get(),p=O(this.pointAttr),s=this.upColorProp;p[""][s]=g;p.hover[s]=l.hover.upColor||h;p.select[s]=l.select.upColor||g;V(this.points,function(h){0<h.y&&!h.color&&(h.pointAttr=p,h.color=g)})},getGraphPath:function(){var h=this.data,l=h.length,g=C(this.options.lineWidth+this.options.borderWidth)%2/2,p=[],n,s,u;for(u=1;u<l;u++)s=h[u].shapeArgs,n=h[u-1].shapeArgs,s=["M",n.x+n.width,n.y+g,"L",s.x,n.y+g],0>h[u-1].y&&
(s[2]+=n.height,s[5]+=n.height),p=p.concat(s);return p},getExtremes:Da,getStack:function(h){var l=this.yAxis.stacks,g=this.stackKey;this.processedYData[h]<this.options.threshold&&(g="-"+g);return l[g][h]},drawGraph:R.prototype.drawGraph});g.bubble=O(g.scatter,{dataLabels:{inside:!0,style:{color:"white",textShadow:"0px 0px 3px black"},verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1},minSize:8,maxSize:"20%",tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,
zThreshold:0});t.bubble=S(t.scatter,{type:"bubble",pointArrayMap:["y","z"],trackerGroups:["group","dataLabelsGroup"],pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor"},applyOpacity:function(h){var l=this.options.marker,g=F(l.fillOpacity,0.5);h=h||l.fillColor||this.color;1!==g&&(h=n.Color(h).setOpacity(g).get("rgba"));return h},convertAttribs:function(){var h=R.prototype.convertAttribs.apply(this,arguments);h.fill=this.applyOpacity(h.fill);return h},getRadii:function(h,
l,g,p){var n,s,u,t=this.zData,w=[];s=0;for(n=t.length;s<n;s++)u=l-h,u=0<u?(t[s]-h)/(l-h):0.5,w.push(pa.ceil(g+u*(p-g))/2);this.radii=w},animate:function(h){var l=this.options.animation;h||(V(this.points,function(h){var g=h.graphic;h=h.shapeArgs;g&&h&&(g.attr("r",1),g.animate({r:h.r},l))}),this.animate=null)},translate:function(){var h,l=this.data,g,p,n=this.radii;t.scatter.prototype.translate.call(this);for(h=l.length;h--;)g=l[h],p=n?n[h]:0,g.negative=g.z<(this.options.zThreshold||0),p>=this.minPxSize/
2?(g.shapeType="circle",g.shapeArgs={x:g.plotX,y:g.plotY,r:p},g.dlBox={x:g.plotX-p,y:g.plotY-p,width:2*p,height:2*p}):g.shapeArgs=g.plotY=g.dlBox=w},drawLegendSymbol:function(h,l){var g=ga(h.itemStyle.fontSize)/2;l.legendSymbol=this.chart.renderer.circle(g,h.baseline-g,g).attr({zIndex:3}).add(l.legendGroup);l.legendSymbol.isMarker=!0},drawPoints:t.column.prototype.drawPoints,alignDataLabel:t.column.prototype.alignDataLabel});Z.prototype.beforePadding=function(){var h=this,l=this.len,g=this.chart,
p=0,n=l,s=this.isXAxis,u=s?"xData":"yData",t=this.min,B={},z=pa.min(g.plotWidth,g.plotHeight),G=Number.MAX_VALUE,C=-Number.MAX_VALUE,y=this.max-t,Z=l/y,R=[];this.tickPositions&&(V(this.series,function(l){var g=l.options;"bubble"===l.type&&l.visible&&(h.allowZoomOutside=!0,R.push(l),s)&&(V(["minSize","maxSize"],function(h){var l=g[h],p=/%$/.test(l),l=ga(l);B[h]=p?z*l/100:l}),l.minPxSize=B.minSize,l=l.zData,l.length&&(G=pa.min(G,pa.max(N(l),!1===g.displayNegative?g.zThreshold:-Number.MAX_VALUE)),C=
pa.max(C,M(l))))}),V(R,function(h){var l=h[u],g=l.length,q;s&&h.getRadii(G,C,B.minSize,B.maxSize);if(0<y)for(;g--;)q=h.radii[g],p=Math.min((l[g]-t)*Z-q,p),n=Math.max((l[g]-t)*Z+q,n)}),0<y&&F(this.options.min,this.userMin)===w&&F(this.options.max,this.userMax)===w&&(n-=l,Z*=(l+p-n)/l,this.min+=p/Z,this.max+=n/Z))};var U=R.prototype,g=n.Pointer.prototype;U.toXY=function(h){var l,g=this.chart;l=h.plotX;var p=h.plotY;h.rectPlotX=l;h.rectPlotY=p;h.clientX=(180*(l/Math.PI)+this.xAxis.pane.options.startAngle)%
360;l=this.xAxis.postTranslate(h.plotX,this.yAxis.len-p);h.plotX=h.polarPlotX=l.x-g.plotLeft;h.plotY=h.polarPlotY=l.y-g.plotTop};U.orderTooltipPoints=function(h){this.chart.polar&&(h.sort(function(h,g){return h.clientX-g.clientX}),h[0])&&(h[0].wrappedClientX=h[0].clientX+360,h.push(h[0]))};p(t.area.prototype,"init",Q);p(t.areaspline.prototype,"init",Q);p(t.spline.prototype,"getPointSpline",function(h,l,g,p){var n,s,u,t,w,B,z;this.chart.polar?(n=g.plotX,s=g.plotY,h=l[p-1],u=l[p+1],this.connectEnds&&
(h||(h=l[l.length-2]),u||(u=l[1])),h&&u&&(t=h.plotX,w=h.plotY,l=u.plotX,B=u.plotY,t=(1.5*n+t)/2.5,w=(1.5*s+w)/2.5,u=(1.5*n+l)/2.5,z=(1.5*s+B)/2.5,l=Math.sqrt(Math.pow(t-n,2)+Math.pow(w-s,2)),B=Math.sqrt(Math.pow(u-n,2)+Math.pow(z-s,2)),t=Math.atan2(w-s,t-n),w=Math.atan2(z-s,u-n),z=Math.PI/2+(t+w)/2,Math.abs(t-z)>Math.PI/2&&(z-=Math.PI),t=n+Math.cos(z)*l,w=s+Math.sin(z)*l,u=n+Math.cos(Math.PI+z)*B,z=s+Math.sin(Math.PI+z)*B,g.rightContX=u,g.rightContY=z),p?(g=["C",h.rightContX||h.plotX,h.rightContY||
h.plotY,t||n,w||s,n,s],h.rightContX=h.rightContY=null):g=["M",n,s]):g=h.call(this,l,g,p);return g});p(U,"translate",function(h){h.call(this);if(this.chart.polar&&!this.preventPostTranslate){h=this.points;for(var l=h.length;l--;)this.toXY(h[l])}});p(U,"getSegmentPath",function(h,l){var g=this.points;this.chart.polar&&!1!==this.options.connectEnds&&l[l.length-1]===g[g.length-1]&&null!==g[0].y&&(this.connectEnds=!0,l=[].concat(l,[g[0]]));return h.call(this,l)});p(U,"animate",z);p(ia,"animate",z);p(U,
"setTooltipPoints",function(h,l){this.chart.polar&&ca(this.xAxis,{tooltipLen:360});return h.call(this,l)});p(ia,"translate",function(h){var l=this.xAxis,g=this.yAxis.len,p=l.center,n=l.startAngleRad,s=this.chart.renderer,u,t;this.preventPostTranslate=!0;h.call(this);if(l.isRadial)for(l=this.points,t=l.length;t--;)u=l[t],h=u.barX+n,u.shapeType="path",u.shapeArgs={d:s.symbols.arc(p[0],p[1],g-u.plotY,null,{start:h,end:h+u.pointWidth,innerR:g-F(u.yBottom,g)})},this.toXY(u)});p(ia,"alignDataLabel",function(h,
l,g,p,n,s){this.chart.polar?(h=180*(l.rectPlotX/Math.PI),null===p.align&&(p.align=20<h&&160>h?"left":200<h&&340>h?"right":"center"),null===p.verticalAlign&&(p.verticalAlign=45>h||315<h?"bottom":135<h&&225>h?"top":"middle"),U.alignDataLabel.call(this,l,g,p,n,s)):h.call(this,l,g,p,n,s)});p(g,"getIndex",function(h,l){var g,p=this.chart,n;p.polar?(n=p.xAxis[0].center,g=l.chartX-n[0]-p.plotLeft,p=l.chartY-n[1]-p.plotTop,g=180-Math.round(180*(Math.atan2(g,p)/Math.PI))):g=h.call(this,l);return g});p(g,"getCoordinates",
function(h,l){var g=this.chart,p={xAxis:[],yAxis:[]};g.polar?V(g.axes,function(h){var n=h.isXAxis,s=h.center,t=l.chartX-s[0]-g.plotLeft,s=l.chartY-s[1]-g.plotTop;p[n?"xAxis":"yAxis"].push({axis:h,value:h.translate(n?Math.PI-Math.atan2(t,s):Math.sqrt(Math.pow(t,2)+Math.pow(s,2)),!0)})}):p=h.call(this,l);return p})})(Highcharts);(function(n){var w=n.Chart,y=n.addEvent,Q=n.removeEvent,z=n.createElement,N=n.discardElement,M=n.css,V=n.merge,ca=n.each,O=n.extend,s=Math.max,F=document,ga=window,g=n.isTouchDevice,t=n.Renderer.prototype.symbols,S=n.getOptions(),ja;O(S.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});S.navigation={menuStyle:{border:"1px solid #A0A0A0",
background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:g?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};S.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{symbol:"menu",
_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};n.post=function(g,n){var s,t;t=z("form",{method:"post",action:g,enctype:"multipart/form-data"},
{display:"none"},F.body);for(s in n)z("input",{type:"hidden",name:s,value:n[s]},null,t);t.submit();N(t)};O(w.prototype,{getSVG:function(g){var s=this,t,w,y,M,C=V(s.options,g);F.createElementNS||(F.createElementNS=function(g,p){return F.createElement(p)});g=z("div",null,{position:"absolute",top:"-9999em",width:s.chartWidth+"px",height:s.chartHeight+"px"},F.body);w=s.renderTo.style.width;M=s.renderTo.style.height;w=C.exporting.sourceWidth||C.chart.width||/px$/.test(w)&&parseInt(w,10)||600;M=C.exporting.sourceHeight||
C.chart.height||/px$/.test(M)&&parseInt(M,10)||400;O(C.chart,{animation:!1,renderTo:g,forExport:!0,width:w,height:M});C.exporting.enabled=!1;C.series=[];ca(s.series,function(g){y=V(g.options,{animation:!1,showCheckbox:!1,visible:g.visible});y.isInternal||C.series.push(y)});t=new n.Chart(C,s.callback);ca(["xAxis","yAxis"],function(g){ca(s[g],function(p,n){var s=t[g][n],w=p.getExtremes(),z=w.userMin,w=w.userMax;s&&(void 0!==z||void 0!==w)&&s.setExtremes(z,w,!0,!1)})});w=t.container.innerHTML;C=null;
t.destroy();N(g);w=w.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,
'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(g){return g.toLowerCase()});return w=w.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},exportChart:function(g,s){g=g||{};var t=this.options.exporting,t=this.getSVG(V({chart:{borderRadius:0}},t.chartOptions,s,{exporting:{sourceWidth:g.sourceWidth||t.sourceWidth,sourceHeight:g.sourceHeight||
t.sourceHeight}}));g=V(this.options.exporting,g);n.post(g.url,{filename:g.filename||"chart",type:g.type,width:g.width||0,scale:g.scale||2,svg:t})},print:function(){var g=this,n=g.container,s=[],t=n.parentNode,w=F.body,z=w.childNodes;g.isPrinting||(g.isPrinting=!0,ca(z,function(g,p){1===g.nodeType&&(s[p]=g.style.display,g.style.display="none")}),w.appendChild(n),ga.focus(),ga.print(),setTimeout(function(){t.appendChild(n);ca(z,function(g,p){1===g.nodeType&&(g.style.display=s[p])});g.isPrinting=!1},
1E3))},contextMenu:function(g,n,t,w,F,N,C){var B=this,Q=B.options.navigation,V=Q.menuItemStyle,$=B.chartWidth,T=B.chartHeight,S="cache-"+g,U=B[S],h=s(F,N),l,q,v;U||(B[S]=U=z("div",{className:"highcharts-"+g},{position:"absolute",zIndex:1E3,padding:h+"px"},B.container),l=z("div",null,O({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},Q.menuStyle),U),q=function(){M(U,{display:"none"});C&&C.setState(0);B.openMenu=!1},y(U,"mouseleave",function(){v=setTimeout(q,
500)}),y(U,"mouseenter",function(){clearTimeout(v)}),ca(n,function(h){if(h){var g=h.separator?z("hr",null,null,l):z("div",{onmouseover:function(){M(this,Q.menuItemHoverStyle)},onmouseout:function(){M(this,V)},onclick:function(){q();h.onclick.apply(B,arguments)},innerHTML:h.text||B.options.lang[h.textKey]},O({cursor:"pointer"},V),l);B.exportDivElements.push(g)}}),B.exportDivElements.push(l,U),B.exportMenuWidth=U.offsetWidth,B.exportMenuHeight=U.offsetHeight);g={display:"block"};t+B.exportMenuWidth>
$?g.right=$-t-F-h+"px":g.left=t-h+"px";w+N+B.exportMenuHeight>T&&"top"!==C.alignOptions.verticalAlign?g.bottom=T-w-h+"px":g.top=w+N-h+"px";M(U,g);B.openMenu=!0},addButton:function(g){var s=this,t=s.renderer;g=V(s.options.navigation.buttonOptions,g);var w=g.onclick,z=g.menuItems,y,C,B={stroke:g.symbolStroke,fill:g.symbolFill},F=g.symbolSize||12;s.btnCount||(s.btnCount=0);s.btnCount++;s.exportDivElements||(s.exportDivElements=[],s.exportSVGElements=[]);if(!1!==g.enabled){var N=g.theme,M=N.states,Q=
M&&M.hover,M=M&&M.select,S;delete N.states;w?S=function(){w.apply(s,arguments)}:z&&(S=function(){s.contextMenu("contextmenu",z,C.translateX,C.translateY,C.width,C.height,C);C.setState(2)});g.text&&g.symbol?N.paddingLeft=n.pick(N.paddingLeft,25):g.text||O(N,{width:g.width,height:g.height,padding:0});C=t.button(g.text,0,0,S,N,Q,M).attr({title:s.options.lang[g._titleKey],"stroke-linecap":"round"});g.symbol&&(y=t.symbol(g.symbol,g.symbolX-F/2,g.symbolY-F/2,F,F).attr(O(B,{"stroke-width":g.symbolStrokeWidth||
1,zIndex:1})).add(C));C.add().align(O(g,{width:C.width,x:n.pick(g.x,ja)}),!0,"spacingBox");ja+=(C.width+g.buttonSpacing)*("right"===g.align?-1:1);s.exportSVGElements.push(C,y)}},destroyExport:function(g){g=g.target;var n,s;for(n=0;n<g.exportSVGElements.length;n++)if(s=g.exportSVGElements[n])s.onclick=s.ontouchstart=null,g.exportSVGElements[n]=s.destroy();for(n=0;n<g.exportDivElements.length;n++)s=g.exportDivElements[n],Q(s,"mouseleave"),g.exportDivElements[n]=s.onmouseout=s.onmouseover=s.ontouchstart=
s.onclick=null,N(s)}});t.menu=function(g,n,s,t){return["M",g,n+2.5,"L",g+s,n+2.5,"M",g,n+t/2+0.5,"L",g+s,n+t/2+0.5,"M",g,n+t-1.5,"L",g+s,n+t-1.5]};w.prototype.callbacks.push(function(g){var n,s=g.options.exporting,t=s.buttons;ja=0;if(!1!==s.enabled){for(n in t)g.addButton(t[n]);y(g,"destroy",g.destroyExport)}})})(Highcharts);var J=function(n){return function(w){var y=typeof w;if("undefined"===y)return J;if("string"===y)return J[w];"function"===y&&(y={_:{}},w.call(J,n,y._,y),y.id?J[y.id]?alert('A J module with id "'+y.id+'" exists!'):J[y.id]=y:alert("A J module require a public id property!"))}}(jQuery);
(function(n){var w={},y={};w.onLoaded=function(){for(var n in J)"init"!==n&&"onLoad"!==n&&(n=J[n],w.isFunc(n._onLoad)&&(n._onLoad.call(n),delete n._onLoad),n._&&(w.loadSub(n._),delete n._))};w.initEvents=function(z){n(document).ready(w.onLoaded)};w.isFunc=function(n){return n&&"function"===typeof n};w.initSub=function(n){for(var y in n)if(y=n[y]){w.isFunc(y._init)&&(y._init.call(y),delete y._init);for(var M in y)(M=y[M])&&w.isFunc(M._init)&&(M._init.call(M),delete M._init)}};w.loadSub=function(n){for(var y in n)if(y=
n[y]){w.isFunc(y._onLoad)&&(y._onLoad.call(y),delete y._onLoad);for(var M in y)(M=y[M])&&w.isFunc(M._onLoad)&&(M._onLoad.call(M),delete M._onLoad)}};y.init=function(z){J.opts=w.opts=n.extend(z||{},J.opts||{});for(var y in J)"init"!==y&&"onLoad"!==y&&(y=J[y],w.isFunc(y._init)&&(y._init.call(y),delete y._init),y._&&w.initSub(y._));w.initEvents()};y.onLoad=w.onLoaded;for(var Q in y)Q&&(J[Q]=y[Q])})(window.jQuery);(function(n){n.fn.onTransitioned=function(w){return this.each(function(){!1===w?n(this).unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"):n(this).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",w)})}})(jQuery);J.heredoc = function(fn){return (fn.toString().split('\n').slice(1,-1).join('\n') + '\n');};
J.log = function(obj){(window['console']||{log:function(x){alert(x);}}).log(obj);};
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
        'ClickDataChange':'onXDataClickDataChanged'
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
                <div class="data_tab">
                    <ul id="xdataType">
                        <li><a href="javascript:;" class="on" rel="1">点击量</a></li>
                        <li><a href="javascript:;" rel="2">下单量</a></li>
                        <li><a href="javascript:;" rel="3">转化率</a></li>
                    </ul>
                </div>

                <div class="data_show">
                    <div class="data_time">
                        <input class="xdata_date xdata_sdate" id="xdataKeyChartDate1" type="date"/><span class="c_tx3">-</span><input class="xdata_date xdata_edate" id="xdataKeyChartDate2" type="date" />
                        <a id="xdataRetweet1" href="javascript:;" class="xdata_btn_retweet"><i class="xdata_icon xdata_icon_retweet"><b>刷新</b></i></a>
                    </div>

                    <div id="xdataKeyCharts" class="data_total">
                        <div id="xdataKeyChartTip" class="xdata_keycharttip xdata_hidden"><div class="xdata_keycharttip_bg"></div><div class="xdata_keycharttip_bd"></div></div>
                        <div id="xdataKeyChart1" class="data_total_inner xdata_keychart xdata_visible"></div>
                        <div id="xdataKeyChart2" class="data_total_inner xdata_keychart"></div>
                        <div id="xdataKeyChart3" class="data_total_inner xdata_keychart"></div>
                    </div>

                    <div class="data_rank">
                        <div class="data_rank_btn">
                            <a href="javascript:;">显示热区图</a>
                            <a href="javascript:;">新增统计单元</a>
                        </div>

                        <div class="data_rank_list">
                            <h3>自定义单元</h3>
                            <div id="xdataMods" class="xdata_mods"></div>
                        </div>
                        
                        <div id="xdataRankList" class="data_rank_list">
                            <h3>按ytag排行</h3>
                            <div id="xdataRank1" class="xdata_rank xdata_visible"></div>
                            <div id="xdataRank2" class="xdata_rank"></div>
                            <div id="xdataRank3" class="xdata_rank"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="xdataPop1" class="data_pop xdata_hidden">
                <div class="data_time">
                    <input id="xdataPop1Date1" class="xdata_date xdata_sdate1" type="date" /><span class="c_tx3">-</span><input id="xdataPop1Date2" class="xdata_date xdata_edate" type="date" />
                    <a id="xdataRetweet2" href="javascript:;" class="xdata_btn_retweet"><i class="xdata_icon xdata_icon_retweet"><b>刷新</b></i></a>
                </div>
                <div class="data_pop_con">
                    <div id="xdataYTagChartTip" class="xdata_ytagcharttip xdata_hidden"></div>
                    <div id="xdataYTagChart" class="xdata_ytagchart"></div>
                </div>
            </div>
        </div>
    */});

    var EVT={
        'DataTypeChange':'onXDataTypeChange',
        'UIReady':'onXDataUIReady'
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
            rawData.total.click_num=parseInt((rawData.total.click_num+'').replace(',',''));
            rawData.total.order_num=parseInt((rawData.total.order_num+'').replace(',',''));
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
                dateType = ( dLen===1 && sdate==J.data.getDateTimeStr(new Date()) )?'today':'custom',
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
                p.ytagGroup.data.push(tempObj);
            });
            this.render();

        },
        render:function(){
            this.$d[0].innerHTML = Mustache.to_html(this.tpl,{empty:(this.data.length==0),items:this.data});
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
            p.main.$startUp.onTransitioned(false);
            J.$body.append(coreTpl);
            p.main.$ui = $('#xdataWrap');
            p.main.$uiCore = $('#xdataUI');
            $('#xdataClose').bind('click',function(e){
                p.main[p.main.visible?'hide':'show'].call(p.main);
                return false;
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
            J.$win.trigger(EVT.UIReady);
        },
        showError:function(txt){
            this.$startUp.html('<span class="xdata_err">'+txt.toString()+'</span>');
        },
        show:function(){
            this.$ui.removeClass('xdata_wrap_hide');
            this.visible=true;
        },
        hide:function(){
            this.$ui.addClass('xdata_wrap_hide');
            this.visible=false;
        },
        autoHide:function(){
            clearTimeout(this.autoHideTimer);
            this.autoHideTimer = setTimeout(function(){
                p.main.hide();
            },2500);
        }
    };
    //排行榜
    p.rank = {
        dataType:1,
        dataChangedAt:1,
        tpl:J.heredoc(function(){/*
            {{#empty}}
            <div class="xdata_alert">无数据</div>
            {{/empty}}
            {{^empty}}
            <ol>
            {{#items}}
            <li><a id="xdataLnk{{id}}" href="javascript:;" data-ytag="{{ytagid}}" data-href="{{href}}" title="{{title}}">{{text}}</a><sup>{{val}}</sup></li>
            {{/items}}
            </ol>
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
                this.$objs=$('#xdataRankList').find('.xdata_rank');
            }
            var $obj = this.$objs.removeClass('xdata_visible').eq(dataType-1).addClass('xdata_visible');
            if(!$obj[0].getAttribute('data-xdata')){
                $obj[0].innerHTML = Mustache.to_html(this.tpl, this.getData(dataType));
                $obj[0].setAttribute('data-xdata','1');
                return;
            };
            if(forceUpdate||(p.rank.dataChangedAt!=dataType)){
                $obj[0].innerHTML = Mustache.to_html(this.tpl, this.getData(dataType));
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
                //UICOre的scroll事件
                p.main.$uiCore.bind('scroll.ytagChart',function(e){
                    p.ytagChart.updatePosition();
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

            }).bind(EVT.DataTypeChange,function(e,t){
                p.ytagChart.dataType=parseInt(t);
                p.ytagChart.reset();
            }).bind('resize.ytagChart',function(e){
                p.ytagChart.updatePosition();
            });
        },
        reset:function(){
            if(this.isLoading&&this.jqXHR&& this.jqXHR.readyState != 4){
                this.jqXHR.abort();
            };
            this.isLoading=false;
            this.hide();
            this.tagData=null;
            this.$trigger=null;
        },
        show:function(tagData,$trigger){
            this.tagData=tagData;
            this.$trigger=$trigger;
            this.$d.removeClass('xdata_hidden');
            this.isVisible=true;
            this.updatePosition();
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
                        dataByTime[1]=d[i].d.data.data[0].click_num;
                    break;
                    case 2:
                        dataByTime[1]=d[i].d.data.data[0].order_num;
                    break;
                    case 3:
                        dataByTime[1]=parseFloat(d[i].d.data.data[0].click_trans_rate);
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
                    height:250,
                    width:600
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
                edate = J.data.getDateTimeStr(date,{dayDiff:1}),
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
        $cover:null,
        $ytagTrigger:null,
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
                    left:off.left,
                    top:off.top,
                    title:$.trim($o[0].title),
                    text:$.trim($o.text()),
                    href:$o[0].href,
                    selector:('[$="'+ytag+'"]').replace('$',attrName),
                    width:$o.outerWidth(),
                    height:$o.outerHeight(),
                    parentWidth:$parent.outerWidth(),
                    parentHeight:$parent.outerHeight()
                };
            data.text=data.text.length===0?(data.title.length===0?'[!!无标题!!]':data.title):data.text;
            data.ytags=this.getRelatedYTags($o,ytag,attrName);
            cache[data.id] = data;
            return data;
        },
        getRelatedYTags:function($tag,ytag,attrName){
            var tags = [];
            if (attrName==='_ytag') {
                $tag.find('[ytag]').each(function(i1,o1){
                    tags.push(o1.getAttribute('ytag'));
                });
            }else{
                tags.push(ytag);
            };
            return tags;
        },
        _init:function(){
            J.$win.bind(J.ui.EVT.DataTypeChange,function(e,t){
                p.main.reset(t);
            }).bind(J.ui.EVT.UIReady,function(e){
                //滚动条
                $('.xdata_rank,.xdata_mods').bind('scroll.ytag',function(e){
                    p.main.reset();
                });
            });
            $('[data-ytag]').live('click',function(e){
                p.main.onClickYTagTrigger(this);
            });
            $ytags = $('[ytag]');
            pub.rockAndRollAll();
        },
        reset:function(t){
            var clOn = 'xdata_ytagtrigger_on';
            if(this.$ytagTrigger){
                this.$ytagTrigger.removeClass(clOn);
            }
            this.$ytagTrigger=null;
            if(this.$cover){
                this.$cover.addClass('xdata_hidden');
            }
            this.$cover=null;
        },
        onClickYTagTrigger:function(elmTrigger){
            var clOn = 'xdata_ytagtrigger_on';
            if(this.$ytagTrigger){
                if(this.$ytagTrigger[0].id===elmTrigger.id){
                    return;
                };
                this.$ytagTrigger.removeClass(clOn);
            }
            this.$ytagTrigger = $(elmTrigger).addClass(clOn);

            var ytagData = J.ytag.get(elmTrigger.getAttribute('data-ytag'),elmTrigger.getAttribute('data-ytagattr'));
            $('body').stop().animate({
                scrollTop:ytagData.top
            },'fast',function(){
                p.main.showCover(ytagData);
                J.ui.showYTagChart(ytagData,p.main.$ytagTrigger);
            });
        },
        showCover:function(tagData){
            if(this.$cover){
                this.$cover.addClass('xdata_hidden');
            }
            var coverId = '#xdataCover'+tagData.id,
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
                isHidden = tagData.$dom.is(':hidden');
            tagData.coverTip = tagData.selector+(isHidden?'当前处于隐藏状态...':'');
            if(isHidden){
                pub.removeFromCache(tagData.ytagid,tagData.ytagAttr);
            }

            if($cover.length===1){
                this.$cover=$cover.removeClass('xdata_hidden');
                if(isHidden){
                    this.$cover.css(cssProps).find('.xdata_tagcover_bd').html(tagData.coverTip);
                }
                return;
            };
            J.$body.append(Mustache.to_html(this.coverTpl,tagData));
            cssProps = isHidden?cssProps:({
                top:tagData.top,
                left:tagData.left,
                width:(tagData.width>tagData.parentWidth?tagData.parentWidth:tagData.width),
                height:(tagData.height>tagData.parentHeight?tagData.parentHeight:tagData.height)
            });
            this.$cover = $(coverId).css(cssProps);
        }
    };
    //caculate all ytag's data
    pub.rockAndRollAll=function(){
        $ytags.each(function(i,o){
            p.main.addToCache($(o));
        });
    };

    //get a ytag's data
    pub.get=function(ytag,attrName){
        attrName = attrName||'ytag';
        ytag = cache[(attrName+ytag)]||p.main.addToCache($( ('[$="'+ytag+'"]').replace('$',attrName) ),attrName);
        return ytag;
    };
    pub.removeFromCache=function(ytag,attrName){
        attrName = attrName||'ytag';
        cache[(attrName+ytag)]=null;
    };
});
/* E YTAG */

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