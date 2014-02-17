/**
 * A jquery plugin implementing modern-ui loading effect
 * @author Levin
 * @created 2/17/14 11:20 AM
 * @version 1.0.1
 */
 /*
 .modern-loading {
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #94c849;
}
.modern-loading-dot {
  position: absolute;
  top: 0;
  right: 100%;
  width: 5px;
  height: 5px;
  background: #FFFFFF;
  transition-property: right;
  transition-timing-function: ease-out;
  -webkit-transition-property: right;
  -webkit-transition-timing-function: ease-out;
}
.modern-loading-ani {
  right: 0;
}
 */
(function($){
    var $win = $(window);
    /**
     * Internal core class for modernui
     * @class modernloading
     * @param {Object} $d jquery dom object for the pager
     * @param {Object} opts0 configuration options
     */
    var model = function ($d,opts0) {
        /**
         * pager's jquery dom object
         * @property $container
         * @type Object
         */
        this.$container = $d;
        /**
         * pager's configuration object
         * @property opts
         * @type Object
         * @default jQuery.fn.modernloading.defaults
         */
        this.opts = opts0;
        this.templateData = [];
        this.timer = null;
        this.isRunning=false;
        this._init();
    };
    model.prototype = {
        _init: function () {
            this.opts.maxAniDuration = (this.opts.minAniDuration+this.opts.cntDot/10);
            this.$container.html(this._getHtml());
            this.$dots = this.$container.find('.'+this.opts.clDot);
            if(this.opts.autoStart){
                this.start();
            }
        },
        _getHtml:function(){
            var html=[],d;
            for(var i=this.opts.cntDot;i>=1;i--){
                d= {
                    'cl':this.opts.clDot,
                    'duration':(this.opts.minAniDuration + i / 10).toFixed(1)
                };
                this.templateData.push(d);
                html.push($.fn.modernloading.evalTpl(this.opts.tplDot,d));
            }
            return html.join('');
        },
        animate:function(){
            this.$dots.toggleClass(this.opts.clAni);
            var me = this;
            clearRequestTimeout(me.timer);
            this.timer=requestTimeout(function(){
                me.animate();
            },this.opts.maxAniDuration*1000);

        },
        start:function(){
            if(this.isRunning){
                return;
            }
            this.animate();
            this.isRunning=true;
        },
        stop:function(){
            clearRequestTimeout(this.timer);
            this.$dots.removeClass(this.opts.clAni);
            this.isRunning=false;
            return this;
        },
        //update the options
        _update: function (opts,reInit) {
            this.opts = opts;
            if (reInit) {
                this.stop()._init();
            }
        }
    };
    /**
     * A jquery plugin implementing modern-ui loading effect
     * @module jQuery.fn.modernloading
     * @author oxox.io
     * @version 1.0
     * @param {Object} opts Several options (see README for documentation)
     * @return {Object} jQuery Object
     */
    $.fn.modernloading = function (opts) {


        // Set the options.
        var optsType = typeof (opts),
            opts1 = optsType !== 'string' ? $.extend(true, {}, $.fn.modernloading.defaults, opts || {}) : $.fn.modernloading.defaults,
            args = arguments;

        return this.each(function () {

            var $me = $(this),
                instance = $me.data("modernloading");
            if (instance) {

                if (instance[opts]) {

                    instance[opts].apply(instance, Array.prototype.slice.call(args, 1));

                } else if (optsType === 'object' || !opts) {

                    instance._update.apply(instance, args);

                } else {
                    console.log('Method ' + opts + ' does not exist in jQuery.fn.modernloading');
                }

            } else {
                $me.data("modernloading", new model($me,opts1));
            }

        });
    };
    /**
     * default configuration
     * @property defaults
     * @type Object
     */
    $.fn.modernloading.defaults = {
        clDot:'modern-loading-dot',
        clAni:'modern-loading-ani',
        cntDot:7,
        autoStart:true,
        tplDot:'<i class="%cl%" style="transition-duration:%duration%s;-webkit-transition-duration:%duration%s;"></i>',
        minAniDuration:.6
    };
    /**
     * simple template utility method
     * @param str template string
     * @param data template data
     * @returns {String}
     */
    $.fn.modernloading.evalTpl = function (str, data) {
        var result;
        var patt = new RegExp("%([a-zA-z0-9]+)%");
        while ((result = patt.exec(str)) != null) {
            var v = data[result[1]] || '';
            str = str.replace(new RegExp(result[0], "g"), v);
        };
        return str;
    };
})(jQuery);

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// Ref:https://gist.github.com/mamboer/8179563
(function(W) {
    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'],
        x,
        length,
        currTime,
        timeToCall,
        requestAnimFrame0,
        cancelAnimFrame0;
 
    for(x = 0, length = vendors.length; x < length && !requestAnimFrame0; ++x) {
        requestAnimFrame0 = W[vendors[x]+'RequestAnimationFrame'];
        cancelAnimFrame0 = 
          W[vendors[x]+'CancelAnimationFrame'] || W[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!requestAnimFrame0){
        W.requestAnimationFrame = function(callback, element) {
            currTime = new Date().getTime();
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            lastTime = currTime + timeToCall;
            return W.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
        };
    } else {
        W.requestAnimationFrame = requestAnimFrame0;
    }
 
    if (!cancelAnimFrame0){
        W.cancelAnimationFrame = function(id) {
            W.clearTimeout(id);
        };
    } else {
        W.cancelAnimationFrame = cancelAnimFrame0;
    }
 
    /**
     * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
     * @param {function} fn The callback function
     * @param {int} delay The delay in milliseconds
     */
    W.requestTimeout = function(fn, delay) {
        if( !requestAnimFrame0)
                return W.setTimeout(fn, delay);
                
        var start = new Date().getTime(),
            handle = new Object();
            
        function loop(){
            var current = new Date().getTime(),
                delta = current - start;
                
            delta >= delay ? fn.call() : handle.value = requestAnimFrame0(loop);
        };
        
        handle.value = requestAnimFrame0(loop);
        return handle;
    };
     
    /**
     * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
     * @param {int|object} fn The callback function
     */
    W.clearRequestTimeout = function(handle) {
        cancelAnimFrame0?cancelAnimFrame0(handle.value):W.clearTimeout(handle);
    };
 
    /**
     * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
     * @param {function} fn The callback function
     * @param {int} delay The delay in milliseconds
     */
    W.requestInterval = function(fn, delay) {
        if( !requestAnimFrame0 )
                return W.setInterval(fn, delay);
                
        var start = new Date().getTime(),
            handle = new Object();
            
        function loop() {
            var current = new Date().getTime(),
                delta = current - start;
                
            if(delta >= delay) {
                fn.call();
                start = new Date().getTime();
            }
     
            handle.value = requestAnimFrame0(loop);
        };
        
        handle.value = requestAnimFrame0(loop);
        return handle;
    }
     
    /**
     * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
     * @param {int|object} fn The callback function
     */
    W.clearRequestInterval = function(handle) {
        cancelAnimFrame0?cancelAnimFrame0(handle.value):W.clearInterval(handle);
    };
 
})(window);