/**
 * @namespace J
 * @summary 一个简单的js模块管理框架
 * @desc 实现Module Pattern，解决最基本的js代码组织问题。不包含依赖管理，动态加载等功能，如需要推荐使用SeaJS或RequireJS。注：JF假设你使用jQuery，如果您使用别的库，可以针对性改一下代码。
 * @author Levin
 * @version 1.0.2
 * @example 
	J(function($,p,pub){
		p.submodule = {
			_init:function(){
				alert('init submodule');
			}
		};

		pub.hi = function(){
			alert('hi from module'+pub.id);
		};
		pub.id = 'testModule';
	});
 */
var J = (function($){

	return (function(module){
		var type = typeof(module);
		if (type==='undefined') {
			return J;
		};
		if (type==='string') {
			return J[module];
		};
		if (type==='function') {

			var module1 = {_:{}};
			module.call(J,$,module1._,module1);

			if (!module1.id) {
				alert('A J module require a public id property!');
				return;
			};
			if (J[module1.id]) {
				alert('A J module with id "'+module1.id+'" exists!');
				return;
			};
			//add a J module
			J[module1.id]=module1;
			module1=null;
		};
	});
})(jQuery);

(function ($) {
	var p = {},
		pub = {};
	/**
	* @private
	* @desc onLoaded方法,统一管理页面加载完毕后的回调方法
	* 说明:onLoaded方法接管所有页面上注册到$(document).ready(callback)中的callback方法;
	* 如果你要新增一个$(callback)或$(document).ready,请将你的callback方法放在onLoaded方法体内
	*/
	p.onLoaded = function () {
		for (var m in J) {
			if (m==='init'||m==='onLoad') {
				continue;
			};
			m = J[m];
			if ( p.isFunc(m._onLoad) ) {
				m._onLoad.call(m);
				delete m._onLoad;
			};
			if(m._){
				p.loadSub(m._);
				delete m._;
			};
		};
	};
	/**
	* @private
	* @desc initEvents方法
	*	作用:用于为页面dom元素注册各种事件!
	*	说明:Html页面仅用于表现，任何时候应在标签里面直接注册事件。即避免如<a onclick="xx"/>
	*/
	p.initEvents = function (opts) {
		$(document).ready(p.onLoaded);
	};
	//function test
	p.isFunc = function(v){
		return (v && typeof(v)==='function');
	};
	/**
	 * 初始化子模块。如果你的一个模块里面有子模块p.sub1，p.sub1又具有init方法的时候，可以在pub.Init中调用InitSub方法让JF对子模块进行初始化。
	 * @private
	 * @function
	 * @name J#initSub
	 * @param {Object} sub sub module
	 */
	p.initSub = function(sub) {
		for (var c in sub) {
			c = sub[c];
			if (!c) {
				continue;
			};

			if ( p.isFunc(c._init) ) {
				c._init.call(c);
				delete c._init;
			};

			for (var c1 in c) {
				c1 = c[c1];
				if (!c1) continue;

				if (p.isFunc(c1._init)) {
					c1._init.call(c1);
					delete c1._init;
				};
			};
		};
	};
	/**
	* onLoaded之后加载子模块。如果你的一个模块里面有子模块p.sub1，p.sub1又具有onLoad方法的时候，可以在pub.onLoad中调用LoadSub方法让JF在onLoaded之后加载子模块。
	* @private
	* @function
	* @name J#loadSub
	* @param {Object} sub sub module
	*/
	p.loadSub = function (sub) {
		for (var c in sub) {
			c = sub[c];
			if (!c) {
				continue;
			};

			if (p.isFunc(c._onLoad)) {
				c._onLoad.call(c);
				delete c._onLoad;
			};

			for (var c1 in c) {
				c1 = c[c1];
				if (!c1) continue;

				if (p.isFunc(c1._onLoad)) {
					c1._onLoad.call(c1);
					delete c1._onLoad;
				};
			};
		};
	};
	/*public area
	======================*/
	/**
	* 初始化J框架，页面js逻辑的唯一入口。一般至于</body>标签之前，用户向整个app传递参数用
	* @public
	* @function
	* @name J#init
	* @param {Object} opts 配置对象
	* @example
	*
	*	J.init({x:'kk',y:'zz'});
	*
	*/
	pub.init = function (opts) {
		J.opts = p.opts = opts = $.extend(opts || {},J.opts||{});
		for (var m in J) {

			if (m==='init'||m==='onLoad') {
				continue;
			};
			m = J[m];
			if (p.isFunc(m._init)) {
				m._init.call(m);
				delete m._init;
			};
			if(m._){
				p.initSub(m._);
				//delete m._; //p.onLoaded neet it!
			};
		};
		p.initEvents();
	};
	//给外部调用（例如android的webview调用)
	pub.onLoad = p.onLoaded;
	//shadow copy
	for (var m in pub) {
		if (!m) {
			continue;
		};
		J[m]=pub[m];
	};

})(window["jQuery"]);