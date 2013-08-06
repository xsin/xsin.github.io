define("ox/common/1.0.0/cate-debug", [ "./nav-debug", "./tagcloud-debug" ], function(require) {
    //导航菜单
    require("./nav-debug");
    //标签云
    require("./tagcloud-debug");
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

define("ox/common/1.0.0/tagcloud-debug", [], function(require) {
    require.async("jquery.tagclound", function() {
        $(document).ready(function() {
            $("#tag_cloud a").tagcloud({
                size: {
                    start: 1,
                    end: 1,
                    unit: "em"
                },
                color: {
                    start: "#a9d0f5",
                    end: "#ff3333"
                }
            });
        });
    });
});
