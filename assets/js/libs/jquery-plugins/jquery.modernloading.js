/**
 * A jquery plugin implementing modern-ui loading effect
 * @author Levin
 * @created 7/14/13 11:20 AM
 * @version 1.0.0
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
            clearTimeout(me.timer);
            this.timer=setTimeout(function(){
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
            clearTimeout(this.timer);
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