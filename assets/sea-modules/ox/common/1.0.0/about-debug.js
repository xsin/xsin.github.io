define("ox/common/1.0.0/about-debug", [ "./nav-debug", "./han-debug", "han-debug" ], function(require) {
    //导航菜单
    require("./nav-debug");
    //han.js
    require("./han-debug");
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

define("ox/common/1.0.0/han-debug", [ "han-debug" ], function(require) {
    require("han-debug");
});
