window['xdataCTags']={
    //page id 1000是首页
    "1000":[
        {
            id:"ic_toolbar",                            //模块id，必须唯一，建议和css类名关联
            alias: "Toolbar头部工具条",                 //模块名称
            type: 1,                                    //ytag选择器的类型：1为css选择器，2为多个ytagid以|分隔
            ytagSelector: ".ic_toolbar",                //ytag选择器的值
            readonly:true,
            isCustomYTag:true
        },
        {
            id:"mod_entry",
            alias: "Toolbar头部工具条-左侧入口",
            type: 1,
            ytagSelector: ".mod_entry",
            readonly:true,
            isCustomYTag:true
        },
        {
            id:"mod_sitemap",
            alias: "Toolbar头部工具条-左侧入口",
            type: 1,
            ytagSelector: ".mod_sitemap",
            readonly:true,
            isCustomYTag:true
        },
        {
            id:"mod_logo",
            alias: "网站LOGO",
            type: 1,
            ytagSelector: ".mod_logo",
            readonly:true,
            isCustomYTag:true
        },
        {
            id:"mod_search",
            alias: "搜索框",
            type: 1,
            ytagSelector: ".mod_search",
            readonly:true,
            isCustomYTag:true
        },
        {
            id:"mod_minicart",
            alias: "迷你购物车",
            type: 1,
            ytagSelector: ".mod_minicart",
            readonly:true,
            isCustomYTag:true
        },
        {
            id:"jiadiancheng_zaoshi",
            alias: "主菜单:家电城+早市",
            type: 2,
            ytagSelector: "00802|00803",
            readonly:true,
            isCustomYTag:true
        }
    ]
};