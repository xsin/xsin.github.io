define("ox/common/1.0.0/main-debug", [ "./util-debug", "./nav-debug" ], function(require) {
    var util = require("./util-debug");
    //导航菜单
    require("./nav-debug");
});

define("ox/common/1.0.0/util-debug", [], function(require, exports) {
    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1,
            //month
            "d+": this.getDate(),
            //day
            "h+": this.getHours(),
            //hour
            "m+": this.getMinutes(),
            //minute
            "s+": this.getSeconds(),
            //second
            "q+": Math.floor((this.getMonth() + 3) / 3),
            //quarter
            S: this.getMilliseconds()
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        //for
        return format;
    };
});

define("ox/common/1.0.0/nav-debug", [], function(require) {
    $(document).ready(function() {
        var $items = $("#nav>a"), $home = $items.eq(0);
        $items.each(function(i, o) {
            if (i === 0) {
                return;
            }
            if (location.href.indexOf(o.getAttribute("href")) > 0) {
                o.className = "current";
                $home.removeClass("current");
                return false;
            }
        });
    });
});
