xData = {};
xData.score = (function(){
    var pub = {};

    /**
     * 威尔逊区间算法
     * （95%置信区间下，常数是1.96）
     * @param {Number} click 点击数
     * @param {Number} order 订单数
     */
    var _calRate = function(click,order){
        CONSTANT = 1.96;
        return (order / click + Math.pow(CONSTANT,2) / (2 * click) - CONSTANT * Math.sqrt( order / click * (1- order / click) / click + Math.pow(CONSTANT,2) / (4 * click * click))) / ( 1 + Math.pow(CONSTANT,2) / click);
    };

    /**
     * 预处理，计算数据最大值和平均值
     * @param {json} data 数据
     */
    var _preParseData = function(data){
        // 初始化变量
        maxRate = minRate = totalClick = totalOrder = avgRate = 0;

        for (var i = data.length - 1; i >= 0; i--) {
            rate = _calRate(data[i]['click_num'], data[i]['order_num']);
            // 获取最大值
            if (rate > maxRate) {
                maxRate = rate;
                maxIndex = i;
            }
            // 统计全部
            totalClick += data[i]['click_num'];
            totalOrder += data[i]['order_num'];
            // 计算平均值
            if (i == 0) {
                avgRate = _calRate(totalClick,totalOrder);
            };
        };
        return {
            // 返回最大值
            "maxRate": maxRate,
            // 返回平均值
            "avgRate": avgRate
        };
    };

    /**
     * 数据计算
     * @param {json} data 数据
     */
    var _parseData = function(data){
        // 数据预处理，获取最大值和平均值
        var preRate = _preParseData(data);
        
        // 初始化变量
        var output = [];

        for (var i = data.length - 1; i >= 0; i--) {
            rate = _calRate(data[i]['click_num'], data[i]['order_num']);
            // 模块健康度（数据平均值设为60分）
            grade60 = 60 / preRate['avgRate'] * rate;
            // 模块健康度（数据最大值设为90分）
            grade90 = 90 / preRate['maxRate'] * rate;
            // 判断id是否存在，不存在时用page_tag赋值
            data[i]["id"] == undefined || data[i]["id"] == "" ? data[i]["id"] = data[i]['page_tag'] : data[i]["id"] = data[i]["id"];
            // 拼装输出内容
            output.push(
                {
                    "id":data[i]['id'],
                    "click":data[i]['click_num'],
                    "order":data[i]['order_num'],
                    "rate":rate,
                    "grade60":grade60,
                    "grade90":grade90
                }
            );
        }
        return output;
    };

    /**
     * 转化率百分比计算
     * @param {number} avgRate 平均转化率
     * @param {number} rate 当前点转化率
     * @param {number} weight 位置权重
     */
    var _calRateSimple = function(avgRate,rate,weight){
        if(avgRate==0){
            return 100;
        };
        weight == undefined || weight == "" ? weight = 1 : weight = weight;
        return 60 / avgRate * rate * weight;
    }

    pub.init = function(avgRate,rate,weight){
        // return _parseData(data);
        return _calRateSimple(avgRate,rate,weight);
    };

    return pub;
})();;
window['yx_xdata_i18n']=window['yx_xdata_i18n']||{};
yx_xdata_i18n['zh-CN'] = {
    com:{
        "refresh":"\u5237\u65B0",
        "update":"\u66F4\u65B0",
        "edit":"\u7F16\u8F91",
        "delete":"\u5220\u9664",
        "showHeatmap":"\u663E\u793A\u70ED\u533A\u56FE",
        "avg":"\u5E73\u5747",//平均
        "avgValue":"\u5E73\u5747\u503C",//平均值
        "total":"\u5171",//共
        "ci":"\u6B21",//次
        "dan":"\u5355",//单
        "n1":"\u4E00",//一
        "n2":"\u4E8C",
        "n3":"\u4E09",
        "n4":"\u56DB",
        "n5":"\u4E94",
        "n6":"\u516D",
        "n7":"\u4E03",
        "n8":"\u516B",
        "n9":"\u4E5D",
        "n10":"\u5341",
        "n11":"\u5341\u4E00",
        "n12":"\u5341\u4E8C",
        "month":"\u6708",
        "week":"\u661F\u671F",
        "day":"\u5929",//天
        "day1":"\u65E5",//日
        "date":"\u65E5\u671F",//日期
        "recent":"\u6700\u8FD1",//最近
        "moreCondition":"\u66F4\u591A\u6761\u4EF6",//更多条件
        "actFloor":"\u6D3B\u52A8\u697C\u5C42",//活动楼层
        "actHead":"\u6D3B\u52A8\u9996\u5C4F",//活动首屏
        "actSidenavRight":"\u6D3B\u52A8\u53F3\u8FB9\u5BFC\u822A",//活动右边导航
        "actSidenavLeft":"\u6D3B\u52A8\u5DE6\u8FB9\u5BFC\u822A",//活动左边导航
        "viewMore":"\u67E5\u770B\u66F4\u591A"
    },
    nav:{
        "a":"\u70B9\u51FB\u91CF",
        "b":"\u4E0B\u5355\u91CF",
        "c":"\u8F6C\u5316\u7387"
    },
    chart:{
        resetZoom: '\u67E5\u770B\u5168\u56FE',
        downloadPNG: '\u4E0B\u8F7DPNG',
        downloadJPEG: '\u4E0B\u8F7DJPEG',
        downloadPDF: '\u4E0B\u8F7DPDF',
        downloadSVG: '\u4E0B\u8F7DSVG',
        exportButtonTitle: '\u5BFC\u51FA\u6210\u56FE\u7247',
        printChart: '\u6253\u5370\u56FE\u8868',
        loading: '\u6570\u636E\u52A0\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u5019...'
    },
    chart1:{
        "title":"\u6574\u4F53\u6570\u636E"/*整体数据*/
    },
    chart2:{
        "title":"\u6A21\u5757\u8D8B\u52BF",/*模块趋势*/
        "title1":"\u8BE6\u7EC6\u6570\u636E",/*详细数据*/
        "btnAddPrivateMod":"\u65B0\u589E\u79C1\u6709\u6A21\u5757",
        "btnAdminMod":"\u6A21\u5757\u7EF4\u62A4",
        "btnSetVersion":"\u8BBE\u7F6E\u7248\u672C\u70B9",
        "btnModHis":"\u7248\u672C\u5386\u53F2",
        "btnModCompare":"\u6DFB\u52A0\u5BF9\u6BD4",
        "btnBeginCompare":"\u5F00\u59CB\u5BF9\u6BD4",
        "clickRate":"\u70B9\u51FB\u7387",
        "orderRate":"\u8BA2\u5355\u7387",
        "transRateByClick":"\u8F6C\u5316\u7387",//转化率
        "transRateByPV":"\u6BCFPV\u8F6C\u5316\u7387",//每PV转化率
        "clickNumByPV":"\u6BCFPV\u70B9\u51FB\u7387",//每PV点击率
        "orderNumByPV":"\u6BCFPV\u4E0B\u5355\u7387",//每PV订单率
        "transRateByUV":"\u6BCFUV\u8F6C\u5316\u7387",//每UV转化率
        "clickNumByUV":"\u6BCFUV\u70B9\u51FB\u7387",//每UV点击率
        "orderNumByUV":"\u6BCFUV\u4E0B\u5355\u7387",//每UV订单率
        "summary":"\u5168\u90E8\u6C47\u603B"//全部汇总
    },
    tip:{
        modNameRequired:"\u8BF7\u8F93\u5165\u6A21\u5757\u540D\u79F0",
        modNameValueRule:"\u8BF7\u8F93\u5165\u6A21\u5757\u7684css\u9009\u62E9\u5668\u6216\u4EE5|\u5206\u9694\u7684ytag",
        modNameValueRequired:"\u6A21\u5757\u540D\u79F0\u548Cytag\u9009\u62E9\u5668\u5747\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
        beginDateEndDateRequired:"\u5F00\u59CB\u65F6\u95F4\u548C\u7ED3\u675F\u65F6\u95F4\u4E0D\u80FD\u4E3A\u7A7A\uFF01",
        dateRangeOvertop:"\u7EDF\u8BA1\u65F6\u95F4\u8303\u56F4\u8D85\u8FC7$\u5929\uFF01\u670D\u52A1\u5668\u4E9A\u5386\u5C71\u5927...",
        hidden:"\u5F53\u524D\u5904\u4E8E\u9690\u85CF\u72B6\u6001...",
        uvTip:"\u4ECA\u5929\u7684UV\u8981\u660E\u5929\u624D\u80FD\u770B\u54E6",
        "noDataAdvice":"\u5F53\u524D\u9875\u9762\u53EA\u6709\u5168\u7AD9\u516C\u5171\u6A21\u5757,\u8FD8\u6CA1\u6709\u9875\u9762\u79C1\u6709\u6A21\u5757\u6570\u636E,\u53EF\u8054\u7CFBjoyma\u6216levinhuang\u6DFB\u52A0\u79C1\u6709\u6A21\u5757\u6570\u636E",/*当前页面只有全站公共模块,还没有页面私有模块数据,可联系joyma或levinhuang添加私有模块数据*/
        "permissionDeny":"\u60A8\u6CA1\u6709\u767B\u5F55\u6216\u8005\u6CA1\u6709clickstream\u6743\u9650,\u7533\u8BF7\u6743\u9650\u8BF7RTX\u8054\u7CFB\u4F55\u8FEA(Dihe)."/*您没有登录或者没有clickstream权限,申请权限请RTX联系何迪(Dihe).*/
    },
    ajax:{
        paramError:"\u83B7\u53D6\u7EDF\u8BA1\u53C2\u6570\u5931\u8D25\uFF01",
        noData:"\u65E0\u6570\u636E",
        presetModError:"\u9884\u8BBE\u6A21\u5757\u8BFB\u53D6\u51FA\u9519!",
        serverError:"\u670D\u52A1\u5668\u9519\u8BEF\uFF01"
    },
    xbar:{
        notLogin:"\u672A\u767B\u5F55",//未登录
        order:"\u8BA2\u5355",//订单
        myOrder:"\u6211\u7684\u8BA2\u5355",//我的订单
        cart:"\u8D2D\u7269\u8F66",//购物车
        myCart:"\u6211\u7684\u8D2D\u7269\u8F66",//我的购物车
        viewed:"\u770B\u8FC7",//看过
        myViewed:"\u6700\u8FD1\u6D4F\u89C8\u8FC7",//最近浏览过
        like:"\u731C\u559C\u6B22",//猜喜欢
        myLike:"\u731C\u4F60\u559C\u6B22",//猜你喜欢
        coupon:"\u4F18\u60E0\u5238",//优惠券
        guang:"\u901B\u901B",//逛逛
        xdata:"\u6613\u6570\u636E",//易数据
        myFav:"\u6211\u7684\u6536\u85CF\u5939",//我的收藏夹
        fav:"\u6536\u85CF\u5939",//收藏夹
        myInfo:"\u6211\u7684\u4FE1\u606F",//我的信息
    }
};;
/* S 数据 */
J("data",function(p){
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
        areaid=ck.split('areasInfo=');/*11/03 areaid 不再使用,为了保证接口完整性使用默认的S0001_1001*/
        areaid = areaid.length>1?(areaid[1].split(';')[0]||"S0001_1001"):"S0001_1001";
        this.bizInfo={
            uid:uid,
            wsid:wsid,
            pid:pid,
            areaid:areaid
        };
        this.boss = ['6775494','8657580','765578'];
        isParamsReady=true;
    }catch(e){
        J.log(i18n.t("ajax.paramError")+e.toString());
    };
    var clickStreamData = function(_type,_params,_cbk){
        if (!isParamsReady) {
            _cbk(i18n.t("ajax.paramError"));
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
    this.getDateTimeStr=function(dObj,cfg){
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
    this.getKeyData = function(_params,cbk){
        _params = $.extend({},{
            uid:uid, 
            start_date:J.data.getDateTimeStr(today,{ignoreHMS:true}), 
            end_date:J.data.getDateTimeStr(today), 
            date_type:"today", 
            page_id:pid, 
            warehouse_id:wsid, 
            areasInfo:areaid
        },_params||{});
        return clickStreamData('PageKeyData',_params,cbk);
    };
    //获取点击数据
    this.getClickData = function(_params,cbk){
        _params = $.extend({},{
            uid:uid, 
            start_date:J.data.getDateTimeStr(today,{ignoreHMS:true}), 
            end_date:J.data.getDateTimeStr(today), 
            date_type:"today", 
            page_id:pid, 
            warehouse_id:wsid, 
            areasInfo:areaid
        },_params||{});
        return clickStreamData('PageClickData',_params,cbk);
    };
    //根据css选择器获取该选择器下ytag的数据
    this.getClickDataBySelector = function(cssSelector){
        var ids = [],tempCache={},id,
            addTag = function(o){
                id = o.getAttribute('ytag');
                if( id && (!tempCache[id]) ){
                    ids.push(id);
                    tempCache[id]=true;
                };
            };
        $(cssSelector).find('[ytag]').each(function(i,o){
            addTag(o);
        }).end().each(function(i,o){
            addTag(o);
        });
        //console.log(ids);
        return J.data.getClickDataByIds(ids);
    };
    //根据id获取多个ytag的点击数据
    this.getClickDataByIds = function(ids){
        var len =0,
            obj = null,
            clickData = J.data['CurrentClickData'].data,
            items=[],found=false;
        if( (len=ids.length)==0){
            return items;
        };
        for(var i=0;i<len;i++){
            found = false;
            for(var c in clickData){
                obj = clickData[c];
                if(obj.page_tag===ids[i]){
                    items.push(obj);
                    found = true;
                    break;
                }
            };
            if(!found){
                //ytag not found,we add a empty one!
                items.push({
                    click_num:0,
                    click_trans_rate:0,
                    order_num:0,
                    page_tag:ids[i]
                });
            };
        };//for
        return items;
    };
    //获取单个ytag的点击数据
    this.getClickDataById = function(id){
        var obj = null,noData = i18n.t('ajax.noData');
        for(var c in J.data['CurrentClickData'].data){
            obj = J.data['CurrentClickData'].data[c];
            if(obj.page_tag===id){
                break;
            }
        };
        return obj||{'click_num':noData,'click_trans_rate':noData,'order_num':noData};
    };
    //获取指定YTag的数据
    this.getRangeClickData = function(_params,cbk){
        _params = $.extend({},{
            uid:uid, 
            start_date:J.data.getDateTimeStr(today,{ignoreHMS:true}), 
            end_date:J.data.getDateTimeStr(today), 
            date_type:"today", 
            page_id:pid, 
            warehouse_id:wsid, 
            areasInfo:areaid,
            page_tag_ids:"-1",
            sumByDate:1
        },_params||{});
        return clickStreamData('DragClickData',_params,cbk);
    };
    this.getItemDimension = function($o){
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
    this.getKeyAndClickData = function(_params,cbk){
        //获取当天主数据和点击数据
        //TODO: cached by dateRange id
        J.data['jqXHRKeyData']=J.data.getKeyData(_params,function(err,data){
            //console.log(data.total.pv);
            if(data&&data.status){
                data.total.pv = parseInt((data.total.pv+'').replace(/,/g,''));
                data.total.uv = parseInt((data.total.uv+'').replace(/,/g,''));
                data.total.click_num=parseInt((data.total.click_num+'').replace(/,/gi,''));
                data.total.order_num=parseInt((data.total.order_num+'').replace(/,/gi,''));
                data.total.click_trans_rate = data.total.click_num==0?0:(data.total.order_num*100/data.total.click_num).toFixed(2);
                data.total.click_trans_rate = parseFloat(data.total.click_trans_rate);
            };
            J.data["CurrentKeyData"] = data;
            if(_params.date_type==='today'){
                J.data["TodayKeyData"] = data;
            };
            J.data['jqXHRKeyData'] = null;
            J.$win.trigger(J.EVT.data.KeyDataChange,[err,data]);
            if(err){
                cbk&&cbk(err);
                return;
            }
            J.data['jqXHRClickData']=J.data.getClickData(_params,function(err1,data1){
                J.data['CurrentClickData']=data1;
                J.data['jqXHRClickData']=null;
                J.$win.trigger(J.EVT.data.ClickDataChange,[err1,data1]);
                if(err1){
                    cbk&&cbk(err1);
                    return;
                }
                cbk&&cbk(null,data,data1);
            });
        });
    };
    /**
     * 获取公共模块信息
     */
    this.getPublicMods = function(cbk){
        var _params = {
            "act":"query",
            "xn":"xdata",
            "xk":"mods_-J8cz2Qpn7_rKE2jiImK",
            "t":new Date().getTime()
        };
        var url = 'http://log.oxox.io/api.php',
            xhr;

        xhr = $.ajax({
            url:url,
            dataType:'json',
            data:_params
        });
        xhr.done(function(d,txtStatus,jqXhr){
            if(d.code!=="1"){
                cbk(d.info);
                return;
            }
            J.data.publicMods = d.info.xv;
            cbk(null,J.data.publicMods);
        }).fail(function(jqXhr,txtStatus,err){
            cbk(err);
        });
    };
    /**
     * 根据页面样式选择器规范获取公共模块信息
     * 注：该方法用于活动页面
     */
    this.getPrivateModsByCssSelector = function(){

        if(location.hostname!=='event.yixun.com'){
            return ({});
        };

        var cssList = {
                "floor":".evt_floor,.act_sec",//活动楼层
                "header":".evt_head,.act_head",//活动首屏
                "sideNavRight":".act_sidenav,.evt_nav_right",//活动右边导航
                "sideNavLeft":".act_sidenav1,.evt_nav_left"//活动左边导航
            },
            txtList = {
                "floor":i18n.t("com.actFloor"),//活动楼层
                "header":i18n.t("com.actHead"),//活动首屏
                "sideNavRight":i18n.t("com.actSidenavRight"),//活动右边导航
                "sideNavLeft":i18n.t("com.actSidenavLeft")//活动左边导航
            },
            mods = {},
            tempId = "",
            tempClasses0 = null,
            tempClasses1 = null,
            len=null;

        for(var c in cssList){
            $(cssList[c]).each(function(i,o){
                tempClasses0 = o.className.split(' ');
                tempClasses1 = [];
                len = tempClasses0.length;
                for(var j=0;j<len;j++){
                    if(tempClasses0[j]==="") continue;
                    tempClasses1.push(tempClasses0[j]);
                };//for
                tempId = tempClasses1.join('_')+'_'+(i+1);
                mods[tempId] = {
                    "id":tempId,
                    "alias":txtList[c]+(i+1),
                    "ytagSelector":'.'+tempClasses1.join('.'),
                    "isCustomYTag":true,
                    "type":1
                };
            });
        };//for
        return mods;
    };
    /**
     * 获取页面配置信息
     */
    this.getPageConfigs = function(cbk){
        var _params = {
            "act":"query",
            "xn":"xdata",
            "xk":"pages",
            "t":new Date().getTime()
        };
        var url = 'http://log.oxox.io/api.php',
            xhr;

        //获取所有页面
        xhr = $.ajax({
            url:url,
            dataType:'json',
            data:_params
        });
        xhr.done(function(d,txtStatus,jqXhr){
            if(d.code!=="1"){
                cbk(d.info);
                return;
            }
            J.data.pages = d.info.xv;
            cbk(null,J.data.pages);
        }).fail(function(jqXhr,txtStatus,err){
            cbk(err);
        });
    };
    /**
     * 获取预配置的tag信息
     */
    this.getDefaultCTags = function(cbk){
        /*
        var xhr = $.getScript('http://oxox.io/assets/js/xdemo.yixun.xdata.ctags.js?t'+(new Date()).getTime());
        xhr.done(function(script, textStatus, jqxhr){
            cbk(null,(window['xdataCTags']||{})[J.data.bizInfo.pid]);
        }).fail(function(jqxhr, cfgs, err){
            cbk(err);
        });
        */
        var _params = {
            "act":"query",
            "xn":"xdata",
            "t":new Date().getTime()
        };
        var url = 'http://log.oxox.io/api.php',
            xhr;

        //获取所有页面
        J.data.getPageConfigs(function(err,msg){
            if(err){
                cbk('getPageConfigs error:'+err);
                return;
            };
            //获取当前页面的mods
            var page = J.data.getPageConfigByUrl(location.href);
            if(!page){
                console.log('getPageConfigByUrl no data',location.href);
            };
            //获取公共模块
            J.data.getPublicMods(function(err1,msg1){
                if(err1){
                    cbk('getPublicMods error:'+err1);
                    return;
                }
                //获取当前页面的模块
                J.data.privateMods = [];
                if(!page){
                    //没有私有页面配置数据，直接使用公共模块
                    cbk(null,msg1);
                    return;
                }
                xhr = $.ajax({
                    url:url,
                    dataType:'json',
                    data:$.extend({},_params,{xk:'mods_'+page.$id})
                });
                xhr.done(function(d2,txtStatus2,jqXhr2){
                    if(d2.code!=="1"){
                        cbk(d2.info);
                        return;
                    }
                    J.data.privateMods = d2.info.xv;
                    cbk(null,msg1.concat(d2.info.xv));
                }).fail(function(jqXhr2,txtStatus2,err2){
                    cbk(err2);
                });
            });
        });
    };
    /**
     * 获取指定URL的页面配置数据
     */
    this.getPageConfigByUrl = function(url){
        var len =0,tempPage,page;
        if(!this.pages || (len=this.pages.length)==0){
            return null;
        }
        for(var i=0;i<len;i++){
            tempPage = this.pages[i];
            //console.log(tempPage.url);
            //new RegExp(tempPage.url,'i').test(url)
            if(url.toLowerCase().indexOf(tempPage.url)>-1){
                page = tempPage;
                //break;//不加break，使用最后一个匹配项
            }
        };
        return page;
    };
    /**
     * 获取指定编号的预设tag
     */
    this.getDefaultCTagById = function(id){
        var pageCTags = (J.data.defaultCTags||[]),
            len = pageCTags.length,
            obj = null;
        for(var i =0 ;i<len;i++){
            if(pageCTags[i].id.toString()===id){
                obj = pageCTags[i];
                break;
            }
        };
        return obj;
    };
    this.getAllCTags = function(cbk){
        var items = J.data.getCTags()||[];
        if(!J.data.defaultCTags){
            J.data.getDefaultCTags(function(err,d){
                if(err){
                    console.log(i18n.t('ajax.presetModError'),err);
                    cbk(items);
                    return;
                };
                J.data.defaultCTags = d||[];
                items = items.concat(J.data.defaultCTags);
                cbk(items);
            });
            return;
        };
        items = items.concat(J.data.defaultCTags);
        cbk(items);
    };
    /**
     * 获取自定义tag信息
     */
    this.getCTags = function(rawForm){
        rawForm=rawForm||false;
        var key = 'xdata_ctags_'+J.data.bizInfo.pid,
            rawData = localStorage[key],
            rawData1 = J.data.getPrivateModsByCssSelector(),
            isRawData1Empty = Object.getOwnPropertyNames(rawData1).length==0;
        if(!rawData){
            if(isRawData1Empty){
                return null;
            }
            rawData = '{}';
        };
        rawData = JSON.parse(rawData);
        $.extend(rawData,rawData1);
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
    this.getCTag = function(id){
        var d = J.data.getCTags(true)||{};
        d = d[id]||J.data.getDefaultCTagById(id);
        return d;
    };
    /**
     * 保存自定义tag数据
     * @params {Object} tagData tag数据
     */
    this.saveCTag = function(tagData){
        var d = J.data.getCTags(true)||{},
            isNew = false;
        if(tagData.id==''){
            tagData.id = new Date().getTime();
        };
        if(!J.data.getCTag(tagData.id)){
            isNew = true;
        };
        d[tagData.id]=tagData;
        var key = 'xdata_ctags_'+J.data.bizInfo.pid;
        localStorage[key]=JSON.stringify(d);
        J.$win.trigger(J.EVT.data.CTagUpdated,[(isNew?0:1),tagData]);
        return d;
    };
    /**
     * 删除自定义tag数据
     * @params {String} id tag id
     */
    this.deleteCTag = function(id){
        var d = J.data.getCTags(true);
        if(!d){
            return null;
        };
        if(!d[id]){
            return d;
        };
        delete d[id];
        var key = 'xdata_ctags_'+J.data.bizInfo.pid;
        localStorage[key]=JSON.stringify(d);
        J.$win.trigger(J.EVT.data.CTagUpdated,[-1,id]);
        return d;
    };
    /**
     * 停止主数据和点击数据的ajax请求
     */
    this.abortKeyAndClickDataRequest = function(){
        var jqXHR = J.data['jqXHRKeyData'];
        if(jqXHR&&jqXHR.readyState != 4){
            jqXHR.abort();
        };
        jqXHR = J.data['jqXHRClickData'];
        if(jqXHR&&jqXHR.readyState != 4){
            jqXHR.abort();
        };
    };

    this.getSafeCurrentKeyData = function(dataType){
        var item = {
            id:'-1',
            click_num:0,
            order_num:0,
            click_trans_rate:0,
            val:0
        };

        var total = (J.data.CurrentKeyData&&J.data.CurrentKeyData.status)?J.data.CurrentKeyData.total:item;
        $.extend(item,total);

        switch(dataType){
            case 1:
                item.val = item.click_num;
            break;
            case 2:
                item.val = item.order_num;
            break;
            case 3:
                item.val = item.click_trans_rate;
            break;
        };
        return item;
    };
    /**
     * 指定uid是否超级管理员
     * @param {String} uid userid
     */
    this.isBoss = function(uid){
        var bossList = J.data.boss||[];
        return ($.inArray(uid,bossList)!==-1);
    };

    /**
     * ytag相关的数据
     */
    this.ytag = (function(){

        var p1 = {
            getData:function(dataType,topCnt){
                var rawData = J.data['CurrentClickData'],
                    niceData = this.parseData(rawData,dataType,topCnt);
                return niceData;
            },
            parseData:function(d,dataType,topCnt){
                d = d.data;
                var items = [];
                for(var c in d){
                    if(typeof(d[c])!=='object')
                    {
                        continue;
                    }
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
            /*降序排列数据*/
            orderDataDescBy:function(arrData,dataType){
                //new a copy of arrData
                arrData = arrData.slice(0);
                switch(dataType){
                    case 1:
                        /*do nothing，默认是按点击数排序的*/
                    break;
                    case 2:
                        /*按下单量排序*/
                        arrData.sort(function(a,b){
                            return (b.order_num-a.order_num);
                        });
                    break;
                    case 3:
                        /*/按转化率排序
                        //按下单量排序*/
                        arrData.sort(function(a,b){
                            return (parseFloat(b.click_trans_rate)-parseFloat(a.click_trans_rate));
                        });
                    break;
                };
                return arrData;
            }
        };

        var pub1 = {
            getTopList:function(dataType,topCnt){
                return p1.getData(dataType,topCnt);
            }
        };

        return pub1;

    })();
    /**
     * 页面配置数据
     */
    this.pages = [];
    /**
     * 公共模块
     */
    this.publicMods = [];
    /**
     * 当前页面私有模块
     */
    this.privateMods = [];

    /**
     * 初始化数据
    this.init = function(){
        this.getKeyAndClickData(null);
    };
    */
    //Register public events
    this.EVT([
        'KeyDataChange',
        'ClickDataChange',
        'CTagUpdated'
    ]);
});;
J("ui",function(M,V,C){

    V.tpl0 = J.heredoc(function(){/*
        <div id="xbar" class="xbar"> 
            <div class="xbar_hd"> 
                <div id="xbarList" class="xbar_lists"> 
                    <a data-xbarid="mine" href="javascript:;" class="xbar_lk xbar_mine"><img src="http://ecd.oa.com/30x30" class="xbar_avatar"><span class="xbar_name" data-i18n="xbar.notLogin">未登录</span></a>
                    <a data-xbarid="order" href="javascript:;" class="xbar_lk xbar_order"><i class="xbar_ico_guang"></i><span class="xbar_name" data-i18n="xbar.order">订单</span></a>
                    <a data-xbarid="cart" href="javascript:;" class="xbar_lk xbar_cart"><i class="xbar_ico_cart"></i><span class="xbar_name" data-i18n="xbar.cart">购物车</span></a>
                    <a data-xbarid="fav" href="javascript:;" class="xbar_lk xbar_fav"><i class="xbar_ico_fav"></i><span class="xbar_name" data-i18n="xbar.fav">收藏夹</span></a>
                    <a data-xbarid="view" href="javascript:;" class="xbar_lk xbar_view"><i class="xbar_ico_view"></i><span class="xbar_name" data-i18n="xbar.viewed">看过</span></a>
                    <a data-xbarid="like" href="javascript:;" class="xbar_lk xbar_like"><i class="xbar_ico_like"></i><span class="xbar_name" data-i18n="xbar.like">猜喜欢</span></a>
                    <a data-xbarid="coupon" href="javascript:;" class="xbar_lk xbar_coupon"><i class="xbar_ico_coupon"></i><span class="xbar_name" data-i18n="xbar.coupon">优惠券</span></a>
                    <a data-xbarid="guang" href="javascript:;" class="xbar_lk xbar_guang"><i class="xbar_ico_guang"></i><span class="xbar_name" data-i18n="xbar.guang">逛逛</span></a>
                    <a data-xbarid="data" href="javascript:;" class="xbar_lk xbar_data"><i class="xbar_ico_data"></i><span class="xbar_name" data-i18n="xbar.xdata">易数据</span></a>
                </div> 
            </div> 
            <div id="xbarBD" class="xbar_bd">
                <!--注意：每个xbar菜单对应一个面板(xpanel)，面板的id为xpanel_{xbar菜单的data-xbarid属性}-->
                <div class="xpanel xpanelA" id="xpanel_coupon">
                    <a href="javascript:;" class="xbar_close" rel="xpanel_coupon">&larr;</a>
                    <div class="xpanel_tit" data-i18n="xbar.coupon">优惠券</div> 
                    <div class="xpanel_bd">
                        <div class="xpanel_inner">
                            <ul class="Xcoupon_list clearfix" id="xbarCoupon"></ul>
                            <a href="#" class="xbar_morecoupon" id="J_moreCoupon"><span data-i18n="com.viewMore">查看更多</span>&gt;&gt;</a>
                        </div>
                    </div>
                </div>
                <div class="xpanel xpanelA" id="xpanel_data">
                    <a href="javascript:;" class="xbar_close" rel="xpanel_data">&larr;</a>
                    <div class="xpanel_tit" data-i18n="xbar.xdata">易数据</div> 
                    <div class="xpanel_bd">
                        <div class="xpanel_inner" id="xpanel_uiXData"></div>
                    </div> 
                </div>
                <div class="xpanel xpanelA" id="xpanel_order">
                    <a href="javascript:;" class="xbar_close" rel="xpanel_order">&larr;</a>
                    <div class="xpanel_tit" data-i18n="xbar.myOrder">我的订单</div> 
                    <div class="xpanel_bd">
                        <div class="xpanel_inner"></div>
                    </div> 
                </div>
                <div class="xpanel xpanelA" id="xpanel_cart">
                    <a href="javascript:;" class="xbar_close" rel="xpanel_cart">&larr;</a>
                    <div class="xpanel_tit" data-i18n="xbar.myCart">我的购物车</div> 
                    <div class="xpanel_bd">
                        <div class="xpanel_inner"></div>
                    </div> 
                </div>
                <div class="xpanel xpanelA" id="xpanel_view">
                    <a href="javascript:;" class="xbar_close" rel="xpanel_view">&larr;</a>
                    <div class="xpanel_tit" data-i18n="xbar.myViewed">最近浏览过</div> 
                    <div class="xpanel_bd">
                        <div class="xpanel_inner"></div>
                    </div> 
                </div>
                <div class="xpanel xpanelA" id="xpanel_fav">
                    <a href="javascript:;" class="xbar_close" rel="xpanel_fav">&larr;</a>
                    <div class="xpanel_tit" data-i18n="xbar.myFav">我的收藏夹</div>
                    <div class="xpanel_bd">
                        <div class="xpanel_inner"></div>
                    </div> 
                </div>
                <div class="xpanel xpanelA" id="xpanel_like">
                    <a href="javascript:;" class="xbar_close" rel="xpanel_like">&larr;</a>
                    <div class="xpanel_tit" data-i18n="xbar.myLike">猜你喜欢</div> 
                    <div class="xpanel_bd">
                        <div class="xpanel_inner"></div>
                    </div> 
                </div>
                <div class="xpanel xpanelA" id="xpanel_mine">
                    <a href="javascript:;" class="xbar_close" rel="xpanel_mine">&larr;</a>
                    <div class="xpanel_tit" data-i18n="xbar.myInfo">我的信息</div> 
                    <div class="xpanel_bd">
                        <div class="xpanel_inner"></div>
                    </div> 
                </div>
            </div>
        </div>
    */});

    this.EVT([
        'onClickXbarMenu',
        'onHideAllXPanel',
        'onShowXPanel',
        'onHideXPanel'
    ]);

    C.xbar = {
        clCur:'xbar_lk_current',
        $cur:null,
        _init:function(){
            this.$items = $("#xbarList a").bind('click',function(e){
                if(this.className.indexOf(C.xbar.clCur)!=-1){
                    return false;
                }
                J.$win.trigger(J.EVT.ui.onClickXbarMenu,[this.getAttribute('data-xbarid')]);
                C.xbar.$items.removeClass(C.xbar.clCur);
                C.xbar.$cur=$(this).addClass(C.xbar.clCur);
                return false;
            });
            J.$win.bind(J.EVT.ui.onHideAllXPanel,function(e){
                C.xbar.reset();
            });
        },
        reset:function(){
            this.$cur&&this.$cur.removeClass(this.clCur);
        }
    };

    C.xpanel = {
        curId:null,
        clShow:'xpanel_ani_show',
        clWrapShow:'xbar_bd_show',
        _init:function(){
            this.$wrap = $('#xbarBD');
            J.$win.bind(J.EVT.ui.onClickXbarMenu,function(e,d){
                C.xpanel.hide(C.xpanel.curId);
                C.xpanel.show(d);
            });
            $('.xbar .xbar_close').live('click',function(e){
                C.xpanel.hideAll(this.rel);
                return false;
            });
        },
        show:function(id){
            var me  = this,
                onShow = function(){
                    $('#xpanel_'+id).addClass(me.clShow);
                    me.curId = id;
                    me.$wrap.onTransitioned(false);
                    J.$win.trigger(J.EVT.ui.onShowXPanel,[id]);
                };
            if(this.$wrap.hasClass(this.clWrapShow)){
                onShow();
            }else{
                this.$wrap.addClass(this.clWrapShow).onTransitioned(function(){
                    onShow();
                });
            };
        },
        hide:function(id){
            var me = this;
            $('#xpanel_'+id).removeClass(this.clShow);
            J.$win.trigger(J.EVT.ui.onHideXPanel,[id]);
        },
        hideAll:function(panelId){
            var me = this;
            this.$wrap.removeClass(this.clWrapShow).onTransitioned(function(){
                me.$wrap.find('.xpanel').removeClass(me.clShow);
                J.$win.trigger(J.EVT.ui.onHideAllXPanel,[{"rel":panelId}]);
                me.$wrap.onTransitioned(false);
            });
            //隐藏子面板
            $('[data-xpanel_parent="'+panelId+'"]').find('.xbar_close').trigger('click');
        }
    };

    this._init = function(){
        //menu
        J.$body.append(V.tpl0);
        $('#xbar').oxi18n();
    };

});;
J("uiXData",function(M,V,C){

    V.tpl0 = J.heredoc(function(){/*
        <div id="dataWrap" class="data_wrap">
            <div id="dataUI" class="data_ui data_ui_1">
                <div id="dataUIHD" class="data_ui_hd data_fixed">
                    <div class="data_time">
                        <div class="data_time_col data_drp_input">
                            <input type="text" readonly id="txtDateRange1"/>
                        </div>
                        <button id="dataRetweet1" class="data_btn" data-i18n="com.refresh">刷新</button>
                        <div id="dataDatePicker1" style="display:none"></div>
                    </div>
                </div>
                <div id="dataUIBD" class="data_ui_bd">
                    <div class="data_box data_box1">
                        <div class="data_box_hd">
                            <h3 data-i18n="chart1.title">整体数据</h3>
                            <a href="javascript:;" id="dataBtnHeatmap" class="data_btn data_btn_bg1 data_hidden" data-i18n="com.showHeatmap">显示热区图</a>
                        </div>
                        <div class="data_box_bd">
                            <div id="dataCharttip1" class="data_charttip1"><div class="data_charttip1_bg"></div><div class="data_charttip1_bd"><img class="data_loading1" src="http://static.gtimg.com/icson/img/common/loading.gif"/></div></div>
                            <table class="data_table">
                                <tbody>
                                    <tr><th>PV</th><td><span id="dataPV" class="data_pv"></span></td></tr>
                                    <tr><th>UV</th><td><span id="dataUV" class="data_pv"></span></td></tr>
                                    <tr><th data-i18n="nav.a">点击量</th><td><span id="dataClickNum" class="data_cnum"></span></td></tr>
                                    <tr><th data-i18n="nav.b">下单量</th><td><span id="dataOrderNum" class="data_onum"></span></td></tr>
                                    <tr><th data-i18n="nav.c">转化率</th><td><span id="dataTransRate" class="data_transrate"></span></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div><!--/data_box-->
                    <div class="data_box data_box2">
                        <div class="data_box_hd">
                            <h3 data-i18n="chart2.title">模块趋势</h3>
                            <a id="dataShowChart3" href="javascript:;" class="data_btn data_btn_bg1 data_btn_chart3 data_hidden">模块占比</a>
                            <a id="dataAddCTag" href="javascript:;" class="data_btn data_btn_bg1" data-i18n="chart2.btnAddPrivateMod">新增私有模块</a>
                            <a id="dataCTagAdmin" target="_blank" href="http://oxox.io/tools/oxtree/" class="data_btn data_btn_bg1 data_btn_addmod" data-i18n="chart2.btnAdminMod">模块维护</a>
                        </div>
                        <div class="data_box_bd">
                            <div id="dataChart1Filter" class="data_filter">
                                <label class="on" data-type="1"><span data-i18n="nav.a">点击量</span></label>
                                <label data-type="2"><span data-i18n="nav.b">下单量</span></label>
                                <label data-type="3"><span data-i18n="nav.c">转化率</span></label>
                            </div>
                            <!--默认列表-->
                            <div id="dataList1" class="data_list">
                                <img id="dataLoading2" class="data_loading2" src="http://static.gtimg.com/icson/img/common/loading.gif"/>
                            </div>
                        </div>
                    </div><!--/data_box-->
                </div>
            </div>
            <div id="dataPop2" class="data_pop data_pop2 data_hidden">
                <div class="data_pop_add">
                    <ul>
                        <li><input id="dataPop2Ipt1" type="text" data-i18n="placeholder=tip.modNameRequired" placeholder="请输入模块名称"/></li>
                        <li><input id="dataPop2Ipt2" type="text" data-i18n="placeholder=tip.modNameValueRule" value="" placeholder="请输入模块的css选择器或以|分隔的ytag"/></li>
                    </ul>
                    <div class="data_control">
                        <a id="dataPop2Btn1" href="javascript:;" class="data_btn" data-i18n="com.update">更新</a>
                        <a id="dataPop2Btn2" href="javascript:;" class="data_btn data_btn_bg1" data-i18n="com.delete">删除</a>
                    </div>
                    <div id="dataPop2Tip" class="data_pop2tip data_hidden"></div>
                </div>
                <a id="dataPop2Close" href="javascript:;" class="data_pop_close">+</a>
            </div>
        </div>
    */});

    V.tpl1 = J.heredoc(function(){/*
        <div id="xdataPop1" data-xpanel_parent="xpanel_data" class="xpanel xpanelB">
            <a id="dataPop1Close" href="javascript:;" class="xbar_close">&larr;</a> 
            <div class="xpanel_bd">
                <div class="xpanel_inner">

                    <div id="dataPop1" class="data_pop data_pop1">
                        <div class="data_pop_hd">
                            <div class="data_action">
                                <button id="dataTag1" class="data_btn ox_add_link" data-i18n="chart2.btnSetVersion">设置版本点</button>
                                <a id="dataLkTagList" class="data_btn" data-href="http://ecd.oa.com/xdata/timeline/" target="_blank" data-i18n="chart2.btnModHis">版本历史</a>
                            </div>
                            <div id="dataCrumbs" class="data_crumbs"></div>
                            <div class="data_filter1">
                                <div class="data_time clearfix">
                                    <div id="dataDateRange2" class="data_fl data_daterange">
                                        <div class="drp_date drp_date1" id="div_dataLabelDateRange2">
                                            <span class="drp_date_title" id="dataLabelDateRange2"></span>
                                            <a class="drp_trigger" id="drp_dataLabelDateRange2Trigger" href="javascript:;">
                                                <i class="drp_trigger_ico"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="data_fr data_datepreset">
                                        <ul class="clearfix">
                                            <li class="data_datepreset_item data_datepreset_item1" id="drpRecentDays1" data-v="1"><a href="javascript:;"><span data-i18n="com.recent">最近</span>7<span data-i18n="com.day">天</span></a></li>
                                            <li class="data_datepreset_item" id="drpRecentDays2" data-v="2"><a href="javascript:;"><span data-i18n="com.recent">最近</span>15<span data-i18n="com.day">天</span></a></li>
                                            <li class="data_datepreset_item" id="drpRecentDays3" data-v="3"><a href="javascript:;"><span data-i18n="com.recent">最近</span>30<span data-i18n="com.day">天</span></a></li>
                                            <li>
                                                <button id="dataBtnMoreFilter" class="data_btnB"><i class="data_ico_chart"></i><span data-i18n="com.moreCondition">更多条件</span></button>
                                                <div id="dataTypes" class="data_types data_hidden">
                                                    <label><input id="dataTypeForMod1" class="data_type" type="radio" value="1" name="data_type" checked="checked"/><span data-i18n="nav.a">点击量</span></label>
                                                    <label><input id="dataTypeForMod2" class="data_type" type="radio" value="2" name="data_type"/><span data-i18n="nav.b">下单量</span></label>
                                                    <label><input id="dataTypeForMod3" class="data_type" type="radio" value="3" name="data_type"/><span data-i18n="nav.c">转化率</span></label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="data_pop_bd">
                            <div class="data_pop_inner">
                                <div id="dataModChartTip" class="data_ytagcharttip data_hidden"></div>
                                <!--趋势图-->
                                <div class="data_pop_section data_chart">
                                    <h3 class="data_pop_tit" data-i18n="chart2.title">趋势图</h3>
                                    <div id="dataModChart" class="data_chart_bd"></div>
                                </div>
                                <!--详细数据-->
                                <div class="data_pop_section data_detail">
                                    <h3 class="data_pop_tit" data-i18n="chart2.title1"></h3>
                                    <div class="data_detail_bd" id="dataDetailBody">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div><!--xpanel_inner-->
            </div>
        </div>
    */});

    V._init = function(){
        J.$body.append(V.tpl1);
    };
    this.EVT([
        'Collapse',
        'Open',
        'ModChartReset',
        'ModChartHidden',
        'UIScroll',
        'UIReady',
        'DataTypeChange',
        'DataTypeChangeForPage',
        'ModRankRendered'
    ]);

    this.maxDateRange = 100;
    //主UI框架
    C.main={
        visible:false,
        isRendered:false,
        $ui:null,
        dataType:1,
        _init:function(){
            if(location.href.indexOf('xdata')>-1){
                J.$body.addClass('data_admin');
            };
            if( J.data.isBoss( (J.data.bizInfo||{uid:''}).uid ) ){
                J.$body.addClass('data_boss');
            };
            J.$win.bind(J.EVT.uiXData.DataTypeChangeForPage,function(e,t){
                C.main.dataType = parseInt(t)||1;
                C.main.$uiCore.removeClass('data_ui_1 data_ui_2 data_ui_3')
                    .addClass('data_ui_'+t);
            }).bind(J.EVT.ui.onShowXPanel,function(e,panelId){
                if(panelId!=='data'||C.main.isRendered) return;
                C.main.render();
            }).bind(J.EVT.ui.onHideXPanel,function(e,panelId){
                if(panelId!=='data') return;
                C.main.hide();
            }).bind(J.EVT.ui.onHideAllXPanel,function(e,obj){
                if(obj.rel!=='data') return;
                C.main.hide();
            });
        },
        render:function(){
            
            document.getElementById('xpanel_'+J.uiXData.id).innerHTML += V.tpl0;
            this.$ui = $('#dataWrap').oxi18n();
            this.$uiCore = $('#dataUI');
            this.$hd = $('#dataUIHD');
            this.$bd = $('#dataUIBD');

            //coreui scrollevent
            //UICOre的scroll事件
            C.main.$bd.bind('scroll.modChart',function(e){
                J.$win.trigger(J.EVT.uiXData.UIScroll,[C.main.$bd.scrollTop()]);
            });

            //双击切换百分比
            this.$uiCore.bind('dblclick',function(e){
                C.main.$uiCore.toggleClass('data_ui_dblclick');
            });

            //将bizInfo打到ui上,方便其他扩展功能使用
            var bizInfo = J.data.bizInfo||{};
            for(var c in bizInfo){
                this.$ui[0].setAttribute('data-'+c,bizInfo[c]);
            };

            setTimeout(function(){
                J.$win.trigger(J.EVT.uiXData.UIReady);
                C.main.show();
                C.main.isRendered = true;
            },50);

        },
        fixedHD:function(){
            this.$hd.addClass('data_fixed');
        },
        unfixedHD:function(){
            this.$hd.removeClass('data_fixed');
        },
        show:function(){
            this.fixedHD();
            this.visible=true;
            J.$win.trigger(J.EVT.uiXData.Open);
        },
        hide:function(){
            this.unfixedHD();
            this.visible=false;
            J.$win.trigger(J.EVT.uiXData.Collapse);
        }
    };

    this.getPosition = function(){
        return C.main.$ui.position();
    };

    this.getOffset = function(){
        return C.main.$ui.offset();
    };

    this.isRendered = function(){
        return C.main.isRendered;
    };

});;
J("modchart",function(p){
    //mod chart
    p.modChart = {
        $d:null,
        $tip:null,
        $chart:null,
        $trigger:null,
        chart:null,
        isLoading:false,
        isVisible:false,
        hasAjaxError:false,
        data:{},
        keyData:{},
        tagData:null,
        dataType:1,
        chartOpts:null,
        dateRangeData:null,
        dataTypesTimer:null,
        jqXHR:null,
        tplMenu:J.heredoc(function(){/*
            <div class="data_breadcrumb data_breadcrumb_flat">
                {{#items}}
                <a href="javascript:;" data-id="{{id}}" class="{{clActive}}">{{alias}}</a>
                {{/items}}
            </div>
        */}),
        _init:function(){

            J.$win.bind(J.EVT.uiXData.DataTypeChange,function(e,t){
                p.modChart.dataType=parseInt(t);
                p.modChart.refresh();
            }).bind(J.EVT.data.CTagUpdated,function(e,opType,d){
                p.modChart.onCTagUpdated(opType,d);
            }).bind(J.EVT.uiXData.Collapse,function(e){
                p.modChart.reset();
            }).bind(J.EVT.uiXData.UIReady,function(e){
                p.modChart.onCoreUIReady();
            });
        },
        onCoreUIReady:function(){
            p.modChart.$d = $('#xdataPop1').oxi18n();
            p.modChart.$chart = $('#dataModChart');
            p.modChart.$tip = $('#dataModChartTip');
            this.$dataTypes = $('#dataTypes');
            //make the popup draggable
            //new Draggabilly(p.modChart.$d[0]);
            //刷新按钮
            $('#dataRetweet2').bind('click',function(e){
                if(p.modChart.isLoading){
                    return;
                };
                p.modChart.loadData(p.modChart.tagData);
            });
            //数据类型切换
            $('#dataTypes .data_type').bind('click.modChart',function(e,noTriggerDataTypeEvent){
                if(this.value==(p.modChart.dataType+'')) return;
                if (!noTriggerDataTypeEvent) {
                    J.$win.trigger(J.EVT.uiXData.DataTypeChange,[this.value]);
                };
                
            });
            //滚动条
            $('.data_rank,.data_mods').bind('scroll.modChart',function(e){
                p.modChart.reset();
            });
            $('#dataPop1Close').bind('click',function(e){
                p.modChart.reset();
            });
            //更多条件
            $('#dataBtnMoreFilter').hover(function(e){
                clearTimeout(p.modChart.dataTypesTimer);
                p.modChart.$dataTypes.removeClass('data_hidden');
            },function(e){
                p.modChart.dataTypesTimer = setTimeout(function(){
                    p.modChart.$dataTypes.addClass('data_hidden');
                },200);
            });
            this.$dataTypes.hover(function(e){
                clearTimeout(p.modChart.dataTypesTimer);
            },function(e){
                p.modChart.dataTypesTimer = setTimeout(function(){
                    p.modChart.$dataTypes.addClass('data_hidden');
                },200);
            });
            //打版本
            p.modChart.$btnTag = $('#dataTag1');

            var langMonth = [1+i18n.t('com.month'), 2+i18n.t('com.month'), 3+i18n.t('com.month'), 4+i18n.t('com.month'), 5+i18n.t('com.month'), 6+i18n.t('com.month'), 7+i18n.t('com.month'), 8+i18n.t('com.month'), 9+i18n.t('com.month'), 10+i18n.t('com.month'), 11+i18n.t('com.month'), 12+i18n.t('com.month')];

            Highcharts.setOptions({
                lang: {
                    months: langMonth,
                    shortMonths: langMonth,
                    weekdays: [i18n.t('com.week')+i18n.t('com.day'), i18n.t('com.week')+i18n.t('com.n1'), i18n.t('com.week')+i18n.t('com.n2'), i18n.t('com.week')+i18n.t('com.n3'), i18n.t('com.week')+i18n.t('com.n4'), i18n.t('com.week')+i18n.t('com.n5'), i18n.t('com.week')+i18n.t('com.n6')],
                    resetZoom: i18n.t('chart.resetZoom'),
                    resetZoomTitle: i18n.t('chart.resetZoom'),
                    downloadPNG: i18n.t('chart.downloadPNG'),
                    downloadJPEG: i18n.t('chart.downloadJPEG'),
                    downloadPDF: i18n.t('chart.downloadPDF'),
                    downloadSVG: i18n.t('chart.downloadSVG'),
                    exportButtonTitle: i18n.t('chart.exportButtonTitle'),
                    printChart: i18n.t('chart.printChart'),
                    loading: i18n.t('chart.loading')
                }
            });

            //日期组件
            var now = new Date(),
                now_7 = new Date(now.getFullYear(),now.getMonth(),now.getDate()-5);
            this.dateRangeData = {
                sdate0:now_7.toJSON().substr(0,10),
                edate0:now.toJSON().substr(0,10)
            };
            new pickerDateRange('dataLabelDateRange2', {
                startDate: this.dateRangeData.sdate0,
                endDate: this.dateRangeData.edate0,
                startCompareDate: '',
                endCompareDate: '',
                needCompare: true,
                target: 'dataDateRange2',
                isTodayValid: true,
                hideOnDocClick:(location.href.indexOf('jiadian.yixun')>0?false:true),
                periodObj:{
                    drpRecentDays1: 6,//最近7天
                    drpRecentDays2: 14,//最近15天
                    drpRecentDays3: 29//最近30天
                },
                clPeriodActive:'data_datepreset_item1',
                // isSingleDay: false,
                success: function (obj) {
                    p.modChart.dateRangeData = obj.getValue();
                    p.modChart.loadData(p.modChart.tagData);
                    //console.log('dateRangeData',p.modChart.dateRangeData);
                }
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
            J.$win.trigger(J.EVT.uiXData.ModChartReset);
        },
        setDataType:function(t){
            if(!t) return;
            this.dataType = t;
            $('#dataTypeForMod'+t).trigger('click.modChart',[true]);
        },
        //设置截屏数据
        setCapturingData:function(){
            //设置截屏信息
            var me = this,
                tagInfo = J.ytag.get(this.tagData.id),
                dimInfo = tagInfo.$dom.data('datadim'),
                ytagData = [],
                len = tagInfo.ytags.length,
                ytagDimData = null,
                i=0,
                attrs = null,
                onDataReady = function(){
                    attrs = {
                        "data-x":dimInfo.left,
                        "data-y":dimInfo.top,
                        "data-width":dimInfo.width,
                        "data-height":dimInfo.height,
                        "data-version_name":tagInfo.alias,
                        "data-mod_name":tagInfo.selector,
                        "data-version_mod_wsid":J.data.bizInfo.wsid,
                        "data-version_mod_areaid":J.data.bizInfo.areaid,
                        "data-version_mod_pageid":J.data.bizInfo.pid,
                        "data-version_mod_id":tagInfo.id,
                        "data-version_mod_ytag":JSON.stringify(ytagData)
                    };
                    me.$btnTag.attr(attrs)[0].removeAttribute('disabled');

                    var lkHis = document.getElementById('dataLkTagList');
                    lkHis.href=lkHis.getAttribute('data-href')+'?'+
                        $.param({
                            wsid:J.data.bizInfo.wsid,
                            areaid:J.data.bizInfo.areaid,
                            pageid:J.data.bizInfo.pid,
                            modid:tagInfo.id
                        });
                },
                rockYTagData = function(){
                    /* 同步设置在for循环次数大时导致ui线程堵塞
                    for(var i =0;i<len;i++){
                        ytagDimData = J.data.getItemDimension($('[ytag="$"]'.replace('$',tagInfo.ytags[i].page_tag)));
                        ytagDimData = $.extend(ytagDimData,tagInfo.ytags[i]);
                        ytagDimData.x = ytagDimData.left - dimInfo.left;
                        ytagDimData.y = ytagDimData.top - dimInfo.top;
                        ytagData.push(ytagDimData);
                    };
                    */
                    ytagDimData = J.data.getItemDimension($('[ytag="$"]'.replace('$',tagInfo.ytags[i].page_tag)));
                    ytagDimData = $.extend(ytagDimData,tagInfo.ytags[i]);
                    ytagDimData.x = ytagDimData.left - dimInfo.left;
                    ytagDimData.y = ytagDimData.top - dimInfo.top;
                    ytagData.push(ytagDimData);
                    if(len - i === 1){
                        onDataReady();
                        return;
                    }
                    if(i < len){
                        i++;
                        setTimeout(rockYTagData,0);//Prevent UI blocking
                    }
                };
            this.$btnTag.attr("disabled","disabled");
            rockYTagData();
        },
        show:function(tagData,$trigger,dataTypeForPage){
            this.tagData=tagData;
            this.todayData = J.modrank.getTodayDataById(tagData.id);
            this.$trigger=$trigger;
            this.$d.addClass('xpanel_ani_show');
            //J.$html.addClass('data_display');
            this.isVisible=true;
            this.renderMenu();

            this.setDataType(dataTypeForPage);

            this.refresh();
            this.setCapturingData();
        },
        refresh:function(){
            this.loadData(this.tagData);
        },
        hide:function(){
            this.$d.removeClass('xpanel_ani_show');
            this.isVisible=false;
            //J.$html.removeClass('data_display');
            J.$win.trigger(J.EVT.uiXData.ModChartHidden);
        },
        updatePosition:function(){
            if(!this.isVisible){
                return;
            };
            var bottom = 0,
                $trigger = this.$trigger;
            if($trigger){
                bottom = J.$win.height()-($trigger.offset().top-J.ui.getOffset().top)-29/* 箭头的位置 */-$trigger.outerHeight()/2;
            }
            this.$d.css({
                bottom:bottom
            });
        },
        showTip:function(txt){
            if(txt===null){
                this.$tip.addClass('data_hidden');
                this.$d.removeClass('data_pop1_loading');
                return;
            };
            txt = txt || '<img class="data_loading1" src="http://static.gtimg.com/icson/img/common/loading.gif"/>';
            this.$tip.html(txt).removeClass('data_hidden');
            this.$d.addClass('data_pop1_loading');
        },
        loadData:function(tagData){
            var dates = [],
                datesCache = {},
                sdate = this.dateRangeData.sdate0,
                edate = this.dateRangeData.edate0,
                dateRange1 = this.validateDateRange(sdate,edate);

            if (!dateRange1) {
                return;
            };
            dates.push(dateRange1);
            datesCache[dateRange1.id] = true;

            //获取对比时间段
            var dates1 = p.modCompare.getDateRangeData(),
                len = dates1.length;
            for(var i=0;i<len;i++){
                dateRange1 = this.validateDateRange(dates1[i].sdate,dates1[i].edate);
                if( (!dateRange1) || datesCache[dateRange1.id] ){
                    continue;
                }
                dates.push(dateRange1);
            };
            var me = this;
            //reset data
            this.data={};
            this.keyData={};
            this.loadDateRangeData(tagData,dates,function(err,d){

                if(err){
                    me.showTip(err);
                    return;
                };
                me.render(d);
            });

        },
        //校验开始时间和结束时间
        validateDateRange:function(sdate,edate){
            if(sdate==''||edate==''){
                this.showTip(i18n.t('tip.beginDateEndDateRequired'));
                return false;
            };
            var tempDate = null;
            sdate = new Date(sdate);
            edate = new Date(edate);
            if(sdate>edate){
                tempDate = sdate;
                sdate=edate;
                edate=tempDate;
            };
            //结束日期往后推一天
            //Note:new Date('2013-10-01')和new Date(2013,9,1)是不等的哦，前者多了8个小时
            edate.setDate(edate.getDate()+1);
            return ({sdate:sdate,edate:edate,id:(sdate.getTime()+'-'+edate.getTime())});
        },
        loadDateRangeData:function(tagData,dateRanges,cbk){

            if(dateRanges.length===0){
                //console.log(this.keyData);
                cbk(null,this.data);
                return;
            };

            var dateRangeObj = dateRanges.splice(0,1)[0];

            if(this.isLoading&&this.jqXHR&& this.jqXHR.readyState != 4){
                this.jqXHR.abort();
                this.isLoading=false;
            }

            var me = this,
                sdate = dateRangeObj.sdate,
                edate = dateRangeObj.edate,
                dateKey = dateRangeObj.id,
                dates=[];

            while(sdate<edate){
                dates.push(new Date(sdate.getFullYear(),sdate.getMonth(),sdate.getDate()));
                sdate.setDate(sdate.getDate()+1);
            };//while

            if(dates.length>J.ui.maxDateRange){
                //me.showTip(i18n.t('tip.dateRangeOvertop').replace('$',J.ui.maxDateRange));
                cbk(i18n.t('tip.dateRangeOvertop').replace('$',J.ui.maxDateRange));
                return;
            }

            this.showTip();
            this.isLoading=true;
            this.hasAjaxError=false;
            
            this.data[dateKey]=[];
            this.keyData[dateKey]=[];
            //从服务器取数据
            //采用按maxDateCountPerTime天分割轮询查询的方式，提升查询性能
            this.getDataByDates(tagData.ytagIds,dates,dateKey,function(err,d){
                me.isLoading=false;
                me.jqXHR=null;
                if(err){
                    cbk(i18n.t('ajax.serverError')+err.toString());
                    //me.showTip('<div class="data_error">'+i18n.t('ajax.serverError')+err.toString()+'</div>');
                    return;
                }
                me.showTip(null);
                me.loadDateRangeData(tagData,dateRanges,cbk);
            },8/*maxDateCountPerTime*/);
        },
        parseData:function(d,dateKey,dataType){
            var len = d.length,
                r =[],
                dataByTime=null,
                dataByTime1 = null,
                keyData = this.keyData[dateKey],
                pv = 0,
                uv = 0,
                rateByPv = 0,
                rateByUv = 0,
                valToday = 0;
            for(var i=0;i<len;i++){
                dataByTime1 = keyData[i];
                pv = (dataByTime1&&dataByTime1.pv)||0;
                uv = (dataByTime1&&dataByTime1.uv)||0;
                dataByTime={
                    t:d[i].t,
                    x:d[i].t,
                    y:0,
                    date:J.data.getDateTimeStr(new Date(d[i].t),{len:10}),
                    pv:pv,
                    uv:uv,
                    rateByPv:0,
                    rateByUv:0,
                    click_num:d[i].click_num,
                    order_num:d[i].order_num,
                    click_trans_rate:(parseFloat(d[i].click_trans_rate)||0)
                };
                switch(dataType){
                    case 1:
                        dataByTime.y=d[i].click_num;
                    break;
                    case 2:
                        dataByTime.y=d[i].order_num;
                    break;
                    case 3://转化率
                        dataByTime.y=dataByTime.click_trans_rate;
                    break;
                };//switch

                //如果最后一天是当天，由于接口没有数据，我们用keyChart的当天数据
                if( ( i==(len-1)) && this.endDateIsToday(dateKey) ){
                    switch(dataType){
                        case 1:
                            valToday = this.todayData.click_num||0;
                        break;
                        case 2:
                            valToday = this.todayData.order_num||0;
                        break;
                        case 3:
                            valToday = this.todayData.click_trans_rate||0;
                        break;
                    };
                    dataByTime.y = dataType==3?parseFloat(valToday):parseInt(valToday);
                    dataByTime.click_num = this.todayData.click_num;
                    dataByTime.order_num = this.todayData.order_num;
                    dataByTime.click_trans_rate = parseFloat(this.todayData.click_trans_rate)||0;
                };

                //每pv的比率
                rateByPv = pv==0?0:dataByTime.y/pv;
                rateByPv = parseFloat( (rateByPv*100).toFixed(4));
                dataByTime.rateByPv = rateByPv;

                //每uv的比率
                rateByUv = uv==0?0:dataByTime.y/uv;
                rateByUv = parseFloat( (rateByUv*100).toFixed(4));
                dataByTime.rateByUv = rateByUv;

                r.push(dataByTime);
            };
            return r;
        },
        getChartSerie:function(rawData,dateKey,dataType){
            var niceData = this.parseData(rawData,dateKey,dataType),
                len = niceData.length,
                serieSubTitle = rawData[0].s_date+'\u81F3'+( rawData[len-1].s_date||J.data.getDateTimeStr(new Date(),{len:10}) ),
                niceData1 = [],//平均线
                totalVal = 0,
                totalValClickNum=0,
                totalValOrderNum=0,
                totalValCORate = 0,
                avgVal = 0,
                avgValClickNum = 0,
                avgValOrderNum = 0,
                avgValCORate = 0,
                len = niceData.length;
            for(var i =0;i<len;i++){
                totalVal+=niceData[i].y;
                niceData[i].dateRange = serieSubTitle;
                totalValClickNum+=niceData[i].click_num;
                totalValOrderNum+=niceData[i].order_num;
                totalValCORate+=niceData[i].click_trans_rate;
            };
            avgVal = parseFloat(len==0?0:(totalVal/len).toFixed(2));
            avgValClickNum = parseFloat(len==0?0:(totalValClickNum/len).toFixed(2));
            avgValOrderNum = parseFloat(len==0?0:(totalValOrderNum/len).toFixed(2));
            avgValCORate = parseFloat(len==0?0:(totalValCORate/len).toFixed(2));
            for(var i =0;i<len;i++){
                niceData1.push({
                    x:niceData[i].x,
                    y:avgVal,
                    dateRange:serieSubTitle
                });
            };

            //每pv比率
            var niceData2 = [];
            for(var i=0;i<len;i++){
                niceData2.push({
                    x:niceData[i].x,
                    y:niceData[i].rateByPv,
                    dateRange:serieSubTitle
                });
            };

            var series = [{
                    name: i18n.t('nav.a'),
                    dateRange:serieSubTitle,
                    data: niceData,
                    yAxis:0,
                    zIndex: 1,
                    marker: {
                        lineWidth: 2
                    }
                },{
                    name:i18n.t('com.avg')+i18n.t('nav.a'),
                    dateRange:serieSubTitle,
                    data:niceData1,
                    yAxis:0,
                    type:'spline',
                    marker:{
                        enabled:false
                    },
                    dashStyle:'shortdot',
                    zIndex:1
                }];

            //是否显示pv比率曲线
            var showPVChart = false;
            if(showPVChart){
                series.push({
                    name:'PV'+i18n.t('chart2.clickRate'),
                    dateRange:serieSubTitle,
                    data:niceData2,
                    yAxis:1,
                    type:'spline',
                    zIndex:1,
                    tooltip:{
                        valueSuffix:' %'
                    }
                });
            };

            switch(dataType){
                case 1:
                break;
                case 2:
                    series[0].name=i18n.t('nav.b');
                    series[1].name=i18n.t('com.avg')+i18n.t('nav.b');
                    showPVChart && (series[2].name='PV'+i18n.t('chart2.orderRate'));
                break;
                case 3:
                    series[0].name=i18n.t('nav.c');
                    series[1].name=i18n.t('com.avg')+i18n.t('nav.c');
                    showPVChart && (series[2].name='PV'+i18n.t('nav.c'));
                break;
            };//switch

            return ({
                serieData:series,
                avgData:{
                    avgClick:avgValClickNum,
                    avgOrder:avgValOrderNum,
                    avgCORate:avgValCORate
                }
            });

        },
        getChartOption:function(rawData,dataType){
            dataType = parseInt(dataType);

            var series = [],
                avgData = [],
                colors = ['#1bd0dc', '#f9b700', '#eb6100', '#009944', '#eb6877', '#5674b9', '#a98fc2', '#9999ff', '#1c95bd', '#9dd30d'],
                cnt=1,len;

            for(var c in rawData){
                c = this.getChartSerie(rawData[c],c,dataType);
                c.serieData[0].color=colors[cnt-1];
                c.serieData[1].color=J.colorLighten(colors[cnt-1],0.1);
                //对比的数据，时间轴以第一组数据为准
                if(cnt>1){
                    len = c.serieData[0].data.length;
                    for(var i=0;i<len;i++){
                        c.serieData[0].data[i].x=series[0].data[i].x;
                        //平均线
                        c.serieData[1]&&(c.serieData[1].data[i].x=series[0].data[i].x);
                    };
                };
                series = series.concat(c.serieData);
                avgData.push(c.avgData);
                cnt++;
            };

            var baseOpts = {
                avgData:avgData[0],
                colors: colors,
                credits : {
                    enabled : false,
                    href: 'http://oxox.io',
                    text: 'oxox.io',
                    position: {
                        align: 'right',
                        x: -10,
                        verticalAlign: 'bottom',
                        y: 0
                    }
                },
                chart:{
                    marginBottom: 60,
                    type:'area',
                    zoomType: 'xy',
                    selectionMarkerFill: 'rgba(122, 201, 67, 0.25)',
                    resetZoomButton: {
                        theme: {
                            fill: 'white',
                            stroke: 'silver',
                            r: 0,
                            states: {
                                hover: {
                                    fill: '#41739D',
                                    style: {
                                        color: 'white'
                                    }
                                }
                            }
                        }
                    }
                },
                title: {
                    text: ' '
                },
                xAxis: {
                    startOnTick: false,
                    lineColor: '#6a7791',
                    lineWidth: 1,
                    //tickPixelInterval: 140,
                    tickmarkPlacement: 'on',
                    type: 'datetime',//datetime
                    minTickInterval: 24 * 3600 * 1000,
                    dateTimeLabelFormats: {
                        day: '%b%e'+i18n.t('com.day1')
                    },
                    labels:{
                        overflow:"justify"
                    }
                },
                yAxis: [{
                    title: {
                        text: null
                    },
                    min:0,
                    gridLineColor: '#eae9e9',
                    showFirstLabel: false
                },{
                    title:{
                        text:null
                    },
                    min:0,
                    gridLineColor: '#eae9e9',
                    showFirstLabel: false,
                    labels:{
                        formatter:function(){
                            return this.value+' %';
                        }
                    },
                    opposite:true
                }],
                tooltip: {
                    xDateFormat: '%Y-%m-%d',
                    useHTML: true,
                    crosshairs: {
                        color: '#7ac943',
                        dashStyle: 'shortdot'
                    },
                    borderRadius: 0,
                    shared: true,
                    headerFormat:'<table style="text-align:right;width:190px;">',
                    footerFormat:'</table>',
                    pointFormat:'<tr>'+
                                    '<th rowspan="2" style="padding:3px 5px;">{point.date}</span></th>'+
                                '</tr>'+
                                '<tr style="border-bottom:1px solid #e8e8e8;"><td style="padding:1px 5px;width:90px;"><span style="color:{series.color}">{series.name}</td>'+
                                    '<td style="padding:1px 5px;width:90px;text-align:left">{point.y}</td>'+
                                '</tr>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        innerSize: '45%',
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            color: '#000000',
                            connectorColor: '#000000'
                        }
                    },
                    series: {
                        fillOpacity: 0.1,
                        shadow: false,
                        marker: {
                            enabled: true,
                            fillColor: null,
                            lineColor: '#FCFCFC',
                            //radius: 4,
                            //lineWidth: 2,
                            //symbol:'square',
                            radius:6,
                            lineWidth:1,
                            symbol:'diamond',
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                legend: {
                    enabled:true,
                    borderWidth: 0,
                    align: 'center',
                    verticalAlign: 'bottom',
                    labelFormatter:function(){
                        var name = this.name;
                        //如果是平均xx，则显示平均值
                        //console.log(this);
                        if(this.name.indexOf(i18n.t('com.avg'))===0){
                            name=i18n.t('com.avgValue');//+' ('+this.userOptions.dateRange+')';
                        }else{
                            //name+=' ('+this.userOptions.dateRange+')';
                        }
                        return name;
                    }
                },
                series: series
            };
            return baseOpts;
        },
        render:function(data){

            //this.$chart.find('.data_loading1').remove();
            var chartOpts = this.getChartOption(data,this.dataType),
                seriesLen = chartOpts.series.length;
            this.chartOpts = chartOpts;

            //更新设置版本点按钮的属性
            this.$btnTag
                .attr('data-version_mod_avg_click',chartOpts.avgData.avgClick)
                .attr('data-version_mod_avg_order',chartOpts.avgData.avgOrder)
                .attr('data-version_mod_avg_corate',chartOpts.avgData.avgCORate);

            if(!this.chart){
                //明细图表
                p.detail.render(chartOpts.series);
                this.$chart.highcharts(chartOpts);
                this.chart=this.$chart.highcharts();
                //平均线默认隐藏
                this.unselectAvgSeries();
                //触发一次resize事件，防止出现滚动条时highchart没有做自适应resize
                //J.$win.trigger('resize.modChart');
                return;
            };
            //明细图表
            p.detail.render(chartOpts.series);

            var seriesLen0 = this.chart.series.length,
                seriesToBeRemoved = [];
            //移除多余的图表
            if(seriesLen0>seriesLen){
                for(var i=(seriesLen0-seriesLen);i<seriesLen0;i++){
                    seriesToBeRemoved.push(this.chart.series[i]);
                }
            }
            while(seriesToBeRemoved.length>0){
                seriesToBeRemoved.splice(0,1)[0].remove(true);
            };//while
            seriesLen0=seriesLen0-1;
            for(var i =0;i<seriesLen;i++){
                if (i<=seriesLen0) {
                    this.chart.series[i].update(chartOpts.series[i]);
                }else{
                    this.chart.addSeries(chartOpts.series[i]);
                };
            };
            //平均线默认隐藏
            this.unselectAvgSeries();
            //触发一次resize事件，防止出现滚动条时highchart没有做自适应resize
            J.$win.trigger('resize.modChart');
            
        },
        unselectAvgSeries:function(){
            var len = this.chart.series.length,
                serie;
            for(var i=0;i<len;i++){
                serie=this.chart.series[i];
                if(serie.name.indexOf(i18n.t('com.avg'))===0){
                    serie.hide();
                }
            };//for
        },
        renderMenu:function(){
            if(this.tagData.norender){
                return false;
            }
            this.tagData.treePath[this.tagData.treePath.length-1].clActive="active";
            var $dataCrumbs = $('#dataCrumbs').empty().html(J.toHtml(this.tplMenu,{items:this.tagData.treePath}));
            var $crumbs = $dataCrumbs.find('a').bind('click.data',function(e){
                if(this.className.indexOf('active')!==-1){
                    return false;
                };
                $crumbs.removeClass('active');
                this.className='active';
                $('#dataLnkCTag'+this.getAttribute('data-id')).trigger('click',[{norender:true}]);
                return false;
            });
            //reset the active state
            this.tagData.treePath[this.tagData.treePath.length-1].clActive="";
            return true;
        },
        //获取页面总体数据如pv/uv数据
        getPageKeyData:function(dateRangeObj,cbk){
            var sdate = dateRangeObj.sdate,
                edate = dateRangeObj.edate,
                dateKey = 'PageKeyData-'+dateRangeObj.id+"_"+J.data.bizInfo.pid+'_'+J.data.bizInfo.wsid,
                _params = {
                    date_type:'custom',
                    start_date:sdate,
                    end_date:edate
                },
                todayStr = J.data.getDateTimeStr(new Date(),{len:10}),
                len,
                tempItem,
                tempItem1,
                cacheStr;

            //已经统计过
            if( (cacheStr=localStorage[dateKey]) ){
                cbk(null,JSON.parse(cacheStr));
                return;
            }
            this.jqXHR = J.data.getKeyData(_params,function(err,data){
                if(err){
                    cbk(err);
                    return;
                }
                if(!data.status){
                    cbk('getPageKeyData:'+i18n.t('ajax.serverError')+","+data.errmsg);
                    return;
                }
                //如果最后一天是今天
                len = data.data.length;
                if(todayStr===edate.substr(0,10)){
                    tempItem = data.data[len-1];
                    tempItem1 = J.data.TodayKeyData||{total:{click_num:0,click_trans_rate:0,order_num:0,pv:0,uv:0}};
                    tempItem.click_num = tempItem1.total.click_num;
                    tempItem.click_trans_rate=tempItem1.total.click_trans_rate;
                    tempItem.order_num = tempItem1.total.order_num;
                    tempItem.pv = tempItem1.total.pv;
                    tempItem.uv =tempItem1.total.uv||0;
                    data.data[len-1] = tempItem;
                }
                localStorage[dateKey]=JSON.stringify(data);
                cbk(null,data);
            });

        },
        getDataByDates:function(tagids,dates,dateKey,cbk,maxDateCountPerTime){
            maxDateCountPerTime = maxDateCountPerTime ||5;
            if(dates.length==0){
                cbk(null,this.data[dateKey]);
                return;
            };
            var dates1 = dates.splice(0,maxDateCountPerTime),
                sdate = J.data.getDateTimeStr(dates1[0]),
                edate = J.data.getDateTimeStr(dates1[dates1.length-1]),
                _params = {
                    date_type:'custom',
                    start_date:sdate,
                    end_date:edate,
                    page_tag_ids:tagids.join(',')
                },
                me = this,
                dateKey1 = sdate.substr(0,10)+'-'+edate.substr(0,10),
                tempItem,tempDate;

            this.jqXHR=J.data.getRangeClickData(_params,function(err,d){

                err = err || ( (d&&d.status)?null:'DragClickData:'+i18n.t('ajax.serverError')+ (d?d.errmsg:'') );

                if (err){
                    me.hasAjaxError=true;
                    cbk(err);
                    return;
                }

                for(var c in d.data.data){
                    tempItem = d.data.data[c];
                    tempDate = new Date(c);
                    tempDate = new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate());
                    tempItem.t = tempDate.getTime();
                    tempItem.s_date = tempItem.s_date||J.data.getDateTimeStr(tempDate,{len:10});
                    me.data[dateKey].push(tempItem);
                };
                //获取页面整体数据
                me.getPageKeyData({
                    sdate:sdate,
                    edate:edate,
                    id:dateKey1
                },function(err1,d1){
                    if(err1){
                        me.hasAjaxError=true;
                        cbk(err1);
                        return;
                    }
                    me.keyData[dateKey]=me.keyData[dateKey].concat(d1.data);
                    //递归
                    me.getDataByDates(tagids,dates,dateKey,cbk,maxDateCountPerTime);
                });
                
            });
        },
        endDateIsToday:function(dateKey){
            //请参考validateDateRange
            var today = new Date(J.data.getDateTimeStr(new Date(),{len:10})),
                todayStr;
                
            today.setDate(today.getDate()+1);
                //today0 = new Date(today.getFullYear(),today.getMonth(),today.getDate()),
            todayStr = today.getTime()+'';
            var is = dateKey.indexOf(todayStr)!==-1;
            return is;
        }
    };

    //对比模块
    p.modCompare = {
        getDateRangeData:function(){
            var d = [];
            if(p.modChart.dateRangeData.sdate1&&p.modChart.dateRangeData.sdate1.length>0){
                d.push({
                    sdate:p.modChart.dateRangeData.sdate1,
                    edate:p.modChart.dateRangeData.edate1
                });
            };
            return d;
        }
    };

    //详细数据模块
    p.detail = {
        dataType:1,
        lblDataPerPV:null,
        lblDataPerUV:null,
        tplTable:J.heredoc(function(){/*
        <table id="dataSorter" class="tablesorter data_tableB">
            <thead>
                <tr>
                    <th></th>
                    <th><span data-i18n="com.date">日期</span></th>
                    <th><span data-i18n="nav.a">点击量</span>(CN)</th>
                    <th><span data-i18n="nav.b">下单量</span>(ON)</th>
                    <th><span data-i18n="chart2.transRateByClick">转化率</span>(ON/CN)</th>
                    <th>PV</th>
                    <th>UV</th>
                    <th>{{lblDataPerPV}}</th>
                    <th>{{lblDataPerUV}}</th>
                </tr>
            </thead>
            <tbody>
                {{#items}}
                    {{#childRow}}
                    <tr class="tablesorter-childRow">
                        <td>{{date}}</td>
                        <td>{{click_num}}</td>
                        <td>{{order_num}}</td>
                        <td>{{click_trans_rate}}%</td>
                        <td>{{pv}}</td>
                        <td>{{uv}}</td>
                        <td>{{rateByPv}}%</td>
                        <td>{{rateByUv}}%</td>
                    </tr>
                    {{/childRow}}
                    {{^childRow}}
                    <tr>
                        <td rowspan="{{rowspan}}" class="data_cell_num">{{sn}}</td>
                        <td>{{date}}</td>
                        <td>{{click_num}}</td>
                        <td>{{order_num}}</td>
                        <td>{{click_trans_rate}}%</td>
                        <td>{{pv}}</td>
                        <td>{{uv}}</td>
                        <td>{{rateByPv}}%</td>
                        <td>{{rateByUv}}%</td>
                    </tr>
                    {{/childRow}}
                {{/items}}
            </tbody>
            <tfoot>
                <tr class="data_detail_sum">
                    <td rowspan="{{rowspanSum}}">&nbsp;</td>
                    <td class="hl" data-i18n="chart2.summary">全部汇总</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                {{#total}}
                <tr class="data_detail_sum">
                    <td class="hl">{{dateRange}}</td>
                    <td>{{click}}</td>
                    <td>{{order}}</td>
                    <td>{{transRate}}%</td>
                    <td>{{pv}}</td>
                    <td>{{uv}}</td>
                    <td>{{valueByPV}}%</td>
                    <td>{{valueByUV}}%</td>
                </tr>
                {{/total}}
            </tfoot>
        </table>
        */}),
        _init:function(){
            J.$win.bind(J.EVT.uiXData.DataTypeChange,function(e,t){
                p.detail.dataType = parseInt(t);
                p.detail.onDataTypeChange(p.detail.dataType);
            }).bind(J.EVT.uiXData.UIReady,function(e){
                p.detail.onCoreUIReady();
            });
        },
        onDataTypeChange:function(t){
            //更新表格最后2列的表头
            var txtTH = i18n.t('chart2.clickNumByPV'),
                txtTH1 = i18n.t('chart2.clickNumByUV');
            switch(t){
                case 1:
                    //default,do nothing
                break;
                case 2:
                    txtTH = i18n.t('chart2.orderNumByPV');
                    txtTH1 = i18n.t('chart2.orderNumByUV');
                break;
                case 3:
                    txtTH = i18n.t('chart2.transRateByPV');
                    txtTH1 = i18n.t('chart2.transRateByUV');
                break;
            };
            this.lblDataPerPV = txtTH;
            this.lblDataPerUV = txtTH1;
        },
        onCoreUIReady:function(){
            this.$body = $('#dataDetailBody');
            this.lblDataPerPV = i18n.t('chart2.clickNumByPV');
            this.lblDataPerUV = i18n.t('chart2.clickNumByUV');
        },
        render:function(series){
            this.$body.empty();
            var data = this.parseData(series),
                html = J.toHtml(this.tplTable,data);
            this.$body.html(html).oxi18n({},true);
            $('#dataSorter').tablesorter();
        },
        parseData:function(series){
            var data = {
                lblDataPerPV:this.lblDataPerPV,
                lblDataPerUV:this.lblDataPerUV,
                rowspanSum:2,
                items:[]
            },
            hasCompare = series.length>2,
            len = series[0].data.length,
            tempItem,tempItem1,
            total1={
                dateRange:series[0].dateRange,
                click:0,
                order:0,
                transRate:0,
                valueByPV:0,
                valueByUV:0,
                pv:0,
                uv:0
            },
            total2={
                click:0,
                order:0,
                transRate:0,
                valueByPV:0,
                valueByUV:0,
                pv:0,
                uv:0
            };

            for(var i=0;i<len;i++){
                tempItem = series[0].data[i];
                tempItem.rowspan=1;
                tempItem.childRow=false;
                tempItem.sn = i+1;
                if(hasCompare){
                    tempItem.rowspan=2;
                    tempItem1 = series[2].data[i];
                    tempItem1.childRow=true;
                }else{
                    tempItem1=null;
                }
                data.items.push(tempItem);
                total1.click+=tempItem.click_num;
                total1.order+=tempItem.order_num;
                total1.transRate+=tempItem.click_trans_rate;
                total1.valueByPV+=tempItem.rateByPv;
                total1.valueByUV+=tempItem.rateByUv;
                total1.pv+=tempItem.pv;
                total1.uv+=tempItem.uv;
                if(tempItem1){
                    data.items.push(tempItem1);
                    total2.click+=tempItem1.click_num;
                    total2.order+=tempItem1.order_num;
                    total2.transRate+=tempItem1.click_trans_rate;
                    total2.valueByPV+=tempItem1.rateByPv;
                    total2.valueByUV+=tempItem1.rateByUv;
                    total2.pv+=tempItem1.pv;
                    total2.uv+=tempItem1.uv;
                }
            };//for


            //转化率要转换成平均值
            total1.transRate = len==0?0:parseFloat( (total1.transRate/len).toFixed(2) );
            total1.valueByPV = len==0?0:parseFloat( (total1.valueByPV/len).toFixed(2) );
            total1.valueByUV = len==0?0:parseFloat( (total1.valueByUV/len).toFixed(2) );
            if(hasCompare){
                total2.transRate = len==0?0:parseFloat( (total2.transRate/len).toFixed(2) );
                total2.valueByPV = len==0?0:parseFloat( (total2.valueByPV/len).toFixed(2) );
                total2.valueByUV = len==0?0:parseFloat( (total2.valueByUV/len).toFixed(2) );
            }
            data.total=[total1];
            if(hasCompare){
                total2.dateRange = series[2].dateRange;
                data.total.push(total2);
                data.rowspanSum=3;
            }

            return data;

        }
    };


    this.show = function(tagData,$trigger,dataType){
        p.modChart.show(tagData,$trigger,dataType);
    };

    this.isVisible = function(){
        return p.modChart.isVisible;
    };

    this.getChartOption = function(){
        return p.modChart.chartOpts;
    };

});;
J("pagechart",function(p){

    //概要图表
    p.keyChart = {
        dataType:1,
        dateType:'today',
        dateRange:'',
        isLoading:false,
        hasAjaxError:false,
        $tip:null,
        keyData:null,
        clickData:null,
        dateRangeData:{
            sdate0:null,
            edate0:null
        },
        _init:function(){
            J.$win.bind(J.EVT.uiXData.DataTypeChangeForPage,function(e,t){
                p.keyChart.dataType=parseInt(t);
                p.keyChart.render(p.keyChart.dataType,true);
            }).bind(J.EVT.uiXData.Open,function(e,t){//每次打开时刷新一次数据
                p.keyChart.$retweet.trigger('click.data');
            }).bind(J.EVT.uiXData.UIReady,function(e){
                p.keyChart.onCoreUIReady();
            }).bind(J.EVT.ui.onShowXPanel,function(e,panelId){
                if(panelId!=='data') return;
                if(J.uiXData.isRendered()){
                    p.keyChart.loadData();
                }
            });
        },
        onCoreUIReady:function(){
            this.$tip = $('#dataCharttip1');
            this.$tipBD=this.$tip.find('.data_charttip1_bd');
            //刷新按钮
            this.$retweet = $('#dataRetweet1').bind('click.data',function(e){
                p.keyChart.loadData();
            });

            this.$filters = $('#dataChart1Filter label').bind('click.data',function(e){
                p.keyChart.$filters.removeClass('on');
                $(this).addClass('on');
                J.$win.trigger(J.EVT.uiXData.DataTypeChangeForPage,[this.getAttribute('data-type')]);
                return false;
            });

            var today=new Date(),
                todayStr = J.data.getDateTimeStr(today,{len:10});

            this.dateRangeData.sdate0 = todayStr;
            this.dateRangeData.edate0 = todayStr;

            //日期控件设置
            new pickerDateRange('txtDateRange1', {
                startDate: todayStr,
                endDate: todayStr,
                target: 'dataDatePicker1',
                hideOnDocClick:(location.href.indexOf('jiadian.yixun')>0?false:true),
                isTodayValid: true,
                success: function (obj) {
                    p.keyChart.dateRangeData = obj.getValue();
                    p.keyChart.$retweet.trigger('click');
                }
            });

            //INIT DATA LOAD
            //this.loadData();

        },
        render:function(dataType){
            var total = this.keyData.status?this.keyData.total:{};
            document.getElementById('dataPV').innerHTML = total.pv||0;
            document.getElementById('dataUV').innerHTML = total.uv||i18n.t('tip.uvTip');
            document.getElementById('dataClickNum').innerHTML = total.click_num||0;
            document.getElementById('dataOrderNum').innerHTML = total.order_num||0;
            document.getElementById('dataTransRate').innerHTML = total.click_trans_rate||0;
        },
        showTip:function(txt){
            if(txt===null){
                this.$tip.addClass('data_hidden');
                return;
            };
            var isLoading = typeof(txt)==='undefined';
            txt = txt || '<img class="data_loading1" src="http://static.gtimg.com/icson/img/common/loading.gif"/>';
            txt = isLoading?txt:(txt.indexOf('<span')==0?txt:('<span class="data_error data_errorB">'+txt+'</span>'));
            this.$tipBD.html(txt);
            this.$tip.removeClass('data_hidden');
        },
        loadData:function(){

            if(this.isLoading){
                J.data.abortKeyAndClickDataRequest();
                this.isLoading=false;
            }

            var me = this,
                dates=[],
                tempDate = null,
                sdate = this.dateRangeData.sdate0,
                edate = this.dateRangeData.edate0;

            this.dateRange = sdate+'-'+edate;

            if(sdate==''||edate==''){
                me.showTip(i18n.t('tip.beginDateEndDateRequired'));
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

            if(dates.length>J.ui.maxDateRange){
                me.showTip(i18n.t('tip.dateRangeOvertop').replace('$',J.ui.maxDateRange));
                return;
            }

            this.showTip();
            this.isLoading=true;
            this.hasAjaxError=false;
            this.clickData=null;
            this.keyData = null;
            //从服务器取数据
            this.getDataByDates(dates,function(err,d1,d2){
                me.isLoading=false;
                if(err){
                    err = err.toString();
                    if(err.indexOf('permission deny')>-1){
                        err = i18n.t('tip.permissionDeny');
                    }
                    me.hasAjaxError=true;
                    me.showTip(i18n.t('ajax.serverError')+err);
                    return;
                }
                me.keyData=d1;
                me.clickData = d2;
                me.showTip(null);
                me.render(me.dataType);
            });
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

    this.isToday = function(){
        return (p.keyChart.dateType==='today');
    };

});;
J("modeditor",function(p){

    //mod editor
    p.modEditor = {
        $d:null,
        $name:null,
        $value:null,
        $trigger:null,
        tagData:null,
        isVisible:false,
        isCustomYTag:false,
        tipTimer:null,
        _init:function(){
            J.$win.bind(J.EVT.uiXData.Collapse,function(e){
                p.modEditor.hide();
            }).bind('resize.modEditor',function(e){
                p.modEditor.updatePosition();
            }).bind(J.EVT.uiXData.UIScroll,function(e,stop){
                p.modEditor.updatePosition(stop);
            }).bind(J.EVT.uiXData.UIReady,function(e){
                p.modEditor.onCoreUIReady();
            });

            $('.data_btn_edit').live('click',function(e){
                //tagData,$trigger,isCustomYTag
                var $trigger = $('#dataCTag'+this.rel),
                    isCustomYTag = $trigger.find('.data_list_lk')[0].getAttribute('data-ytagattr')=='ctag';
                p.modEditor.show(J.data.getCTag(this.rel),$trigger,isCustomYTag);
                return false;
            });

        },
        onCoreUIReady:function(){
            this.$d = $('#dataPop2');
            this.$name = $('#dataPop2Ipt1');
            this.$value = $('#dataPop2Ipt2');
            this.$tip = $('#dataPop2Tip');
            //update
            $('#dataPop2Btn1').bind('click',function(e){
                var isOk = p.modEditor.save(this.rel);
                if(isOk){
                    p.modEditor.hide();
                }
            });
            //del
            $('#dataPop2Btn2').bind('click',function(e){
                p.modEditor.del(this.rel);
                p.modEditor.hide();
            });

            //add new
            $('#dataAddCTag').bind('click',function(e){
                p.modEditor.show({
                    id:'',
                    alias:'',
                    ytagSelector:''
                },$(this),true);
            });

            $('#dataPop2Close').bind('click',function(e){
                p.modEditor.hide();
            });
        },
        showTip:function(txt,duration){
            clearTimeout(this.tipTimer);
            if(!txt){
                this.$tip.addClass('data_hidden');
                return;
            };
            this.$tip.removeClass('data_hidden');
            this.$tip.html('<span class="data_error">'+txt+'</span>');
            if(duration){
                this.tipTimer = setTimeout(function(){
                    p.modEditor.showTip(null);
                },duration);
            }
        },
        del:function(id){
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
                this.showTip(i18n.t('tip.modNameValueRequired'),3000);
                return false;
            };
            var $tempDom = null;
            //获取关联的ytag
            if(d.ytagSelector.indexOf('.')!=-1 || d.ytagSelector.indexOf('#')!=-1){
                //css选择器
                $tempDom = $(d.ytagSelector);
                if($tempDom.length===0){
                    this.showTip(i18n.t('tip.modNameValueRule'),3000);
                    return false;
                };
                J.data.saveCTag(d);
                return true;
            };
            //ytag id，|分隔
            if( d.ytagSelector.indexOf('|')==-1 && (!/^[0-9]+$/.test(d.ytagSelector)) ){
                this.showTip(i18n.t('tip.modNameValueRule'),3000);
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
                this.showTip(i18n.t('tip.modNameValueRule'),3000);
                return false;
            };
            d.type=2;
            J.data.saveCTag(d);
            return true;
        },
        show:function(tagData,$trigger,isCustomYTag){
            var clEditOn = 'data_list_item_editing';
            if(this.$trigger){
                this.$trigger.removeClass(clEditOn);
            }

            this.isCustomYTag = isCustomYTag||false;
            this.tagData=tagData;
            this.$trigger=$trigger.addClass(clEditOn);
            this.$d.removeClass('data_hidden');
            this.isVisible=true;
            this.updatePosition();
            this.loadData(tagData);
        },
        hide:function(){
            if(!this.isVisible){
                return;
            };
            this.$d.addClass('data_hidden');
            this.$name[0].value = '';
            this.$value[0].value = '';
            this.isVisible=false;
            var clEditOn = 'data_list_item_editing';
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
            
            bottom = this.getOffsetBottom($trigger);

            if($trigger){
                bottom = bottom-29/* 箭头的位置 */-$trigger.outerHeight()/2 ;
            }
            this.$d.css({
                bottom:bottom
            });
        },
        getOffsetBottom:function($dom){
            if(!$dom){
                return 0;
            };
            var bottom = J.$win.height()-($dom.offset().top - J.$win.scrollTop());
            //console.log(bottom);
            return bottom;
        },
        loadData:function(tagData){
            this.$name[0].value = tagData.alias;
            this.$value[0].value = tagData.ytagSelector;
            document.getElementById('dataPop2Btn1').rel = document.getElementById('dataPop2Btn2').rel = tagData.id;
            if(tagData.readonly){
                this.$d.addClass('data_readonly');
            }else{
                this.$d.removeClass('data_readonly');
            }
        }
    };

});;
/* S YTAG */
J("ytag",function(p){
    var $ytags;
    p.main = {
        coverTpl:J.heredoc(function(){/*
            <div id="dataCover{{id}}" class="data_tagcover">
                <div class="data_tagcover_bg"></div>
                <div class="data_tagcover_bd">{{coverTip}}</div>
            </div>
        */}),
        covers:{},
        $ytagTrigger:null,
        activeNodeCssSelector:null,
        timeoutHoverIn:null,
        dataType:1,
        hideCovers:function(){
            for(var c in this.covers){
                this.covers[c].addClass('data_hidden');
            }
        },
        parseData:function(tagObj){
            var ctag = tagObj.ytagSelector,
                isCustomTagWithCssSelector = (ctag.indexOf('#')!=-1 || ctag.indexOf('.')!=-1),
                cssSelectors = [],
                cssSelectors1 = [],
                len=0;

            tagObj.selector = "";

            if(isCustomTagWithCssSelector){
                cssSelectors = ctag.split(',');
                len = cssSelectors.length;
                tagObj.selector = ctag;
            }else{
                cssSelectors = ctag.split('|');
                len = cssSelectors.length;
                for(var i =0;i<len;i++){
                    cssSelectors1.push('[ytag="'+cssSelectors[i]+'"]');
                };
                tagObj.selector = cssSelectors1.join(',');
            }
            tagObj.$dom = $(tagObj.selector);/*NOTE:发现ytag用的很滥，同一个ytag用在多个链接上*/
            tagObj.top = (tagObj.$dom.offset()||{top:0}).top;

            /*获取每个元素的位置、高宽信息*/
            tagObj.$dom.each(function(i,o){
                o = $(o);
                o.data('datadim',J.data.getItemDimension(o));
            });
            return tagObj;
        },
        _init:function(){
            J.$win.bind(J.EVT.uiXData.ModChartReset,function(e){
                p.main.reset();
            }).bind(J.EVT.uiXData.ModRankRendered,function(e){
                if(p.main.activeNodeCssSelector){
                    $(p.main.activeNodeCssSelector).trigger('click.ytag');
                };
            }).bind(J.EVT.uiXData.ModChartHidden,function(e){
                p.main.activeNodeCssSelector = null;
            }).bind(J.EVT.uiXData.DataTypeChangeForPage,function(e,t){
                p.main.dataType = parseInt(t);
            });
            $('[data-ytag]').live('click.ytag',function(e,d){
                p.main.onClickYTagTrigger(this,d);
            }).live('mouseenter.ytag',function(e,d){
                clearTimeout(p.main.timeoutHoverIn);
                var _this = this;
                p.main.timeoutHoverIn = setTimeout(function(){
                    p.main.onHoverIn(_this,d);
                },130);
                return false;
            });
        },
        reset:function(t){
            var clOn = 'data_list_lk_on';
            if(this.$ytagTrigger){
                this.$ytagTrigger.removeClass(clOn);
            }
            this.$ytagTrigger=null;
            this.hideCovers();
        },
        onHoverIn:function(elmTrigger,d){
            //console.log('ytag.mouseenter',new Date().getTime());
            if(J.modrank.antiCover()) return false;
            var ytagData = J.ytag.get(elmTrigger.getAttribute('data-id'));

            J.$body.stop().animate({
                scrollTop:ytagData.top
            },'fast',function(){
                p.main.showCover(ytagData);
            });
            return false;
        },
        onClickYTagTrigger:function(elmTrigger,d){
            var clOn = 'data_list_lk_on';
            if(this.$ytagTrigger){
                this.$ytagTrigger.removeClass(clOn);
            }
            this.$ytagTrigger = $(elmTrigger);
            this.$ytagTrigger.addClass(clOn);
            this.activeNodeCssSelector = '#'+elmTrigger.id;

            var ytagData = J.ytag.get(elmTrigger.getAttribute('data-id'));
            ytagData.treePath = J.ytag.getTreePath();
            $.extend(ytagData,d||{});

            J.modchart.show(ytagData,p.main.$ytagTrigger,this.dataType);
        },
        _showCover:function(id,dim,hideOthers){
            if(hideOthers){
                this.hideCovers();
            }
            var coverId = '#dataCover'+id,
                $cover= $(coverId),
                cssProps={
                    position:'fixed',
                    top:0,
                    left:300,
                    right:0,
                    width:'auto',
                    height:'auto',
                    color:'red'
                },
                isHidden = dim.isHidden;
            var coverTip = dim.alias+(isHidden?','+i18n.t('tip.hidden'):'');

            if($cover.length===1){
                $cover.removeClass('data_hidden');
                if(isHidden){
                    $cover.css(cssProps).find('.data_tagcover_bd').html(coverTip);
                }
                this.covers[id]=$cover;
                return;
            };
            J.$body.append(J.toHtml(this.coverTpl,{id:id,coverTip:coverTip}));
            cssProps = isHidden?cssProps:dim;
            this.covers[id] = $(coverId).css(cssProps);
        },
        showCover:function(tagData){
            this.hideCovers();
            if(tagData.$dom.length==0){
                return;
            };
            var coverDim = null;
            tagData.$dom.each(function(i,o){
                o = $(o);
                coverDim = o.data('datadim');
                coverDim.isHidden = o.is(':hidden');
                coverDim.alias = tagData.alias;
                p.main._showCover((tagData.id+i),coverDim);
            });
        }
    };
    //get ytag's data
    this.get = function(id){
        var data = J.modrank.getDataById(id);
        data = p.main.parseData(data);
        return data;
    };

    this.reset = function(){
        p.main.reset();
    };

    this.hideCovers = function(){
        p.main.hideCovers();
    };

    this.removeFromCache=function(id){
        cache[id]=null;
    };

    this.getTreePath = function(){
        var path = p.main.$ytagTrigger.data('data-treepath');
        if(path){
            return path;
        };

        var path = [],
            $parents = p.main.$ytagTrigger.parents('.data_list_item'),
            len = $parents.length;

        $parents.each(function(i,o){
            path.splice(0,0,$parents.eq(i).data());
        });
        
        p.main.$ytagTrigger.data('data-treepath',path);
        return path;
    };

});;
J('ytagExt',function(M,V,C){

	C.feeling = {
		_init:function(){
			J.$win.bind(J.EVT.uiXData.UIReady,function(e){
				C.feeling.onUIReady();
			});
		},

		onUIReady:function(){
			//console.log(J.data.CurrentClickData);
			//J.data.getClickDataById('92000');
			var ytagStatus=false;

			$(".mod_subcate_main").bind({
				dblclick:function(){
					var $target=$(this).find("a");

					if(ytagStatus==false){
						for(var i=0; i<$target.length; i++){
							var $this=$($target[i]);
							var ytag=$this.attr("ytag");
							if(ytag != undefined){
								$this.append("<span>("+J.data.getClickDataById(ytag).click_num+")</span>")
							}
						}
						ytagStatus=true;
					}else{
						$target.find("span").remove();
						ytagStatus=false;
					}
					//for(i in $target){
						//var ytag=$($target[i]).attr("ytag");
						//console.info(ytag);
						//if(ytag != undefined){
							//J.data.getClickDataById("'" + ytag + "'")
						//}
					//}
				},
			});
		}
	};

});;
J("modrank",function(p){
    //自定义单元排行榜
    p.modRank = {
        $d:null,
        dataType:1,
        dataChangedAt:1,
        dataInited:false,
        todayDataCache:{},
        antiCover:false,
        tpl:J.heredoc(function(){/*
            <ul id="dataList{{id}}" class="data_list_con{{clListSub}}">
                {{#babies}}
                <li id="dataCTag{{id}}" data-pid="{{pid}}" class="data_list_item{{cl1}}" data-id="{{id}}" data-alias="{{alias}}" data-val="{{val}}" data-val0="{{val0}}">
                    {{#hasChildren}}
                        <i class="data_list_ico"></i>
                        <a id="dataLnkCTag{{id}}" data-id="{{id}}" data-alias="{{alias}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" data-val="{{val}}" data-val0="{{val0}}" class="data_list_lk">
                            <span class="data_txt">{{alias}}</span>
                            <span class="data_val data_val1">{{val1}}</span>
                            <span class="data_val data_val2">{{percent}}%</span>
                        </a>
                        <p class="data_list_control">
                            <a href="javascript:;" class="data_btn_edit" rel="{{id}}" data-i18n="com.edit">编辑</a>
                        </p>
                        {{>children}}
                    {{/hasChildren}}
                    {{^hasChildren}}
                    <i class="data_list_ico"></i>
                    <a id="dataLnkCTag{{id}}" data-id="{{id}}" data-alias="{{alias}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" data-val="{{val}}" data-val0="{{val0}}" class="data_list_lk">
                        <span class="data_txt">{{alias}}</span>
                        <span class="data_val data_val1">{{val1}}</span>
                        <span class="data_val data_val2">{{percent}}%</span>
                    </a>
                    <p class="data_list_control">
                        <a href="javascript:;" class="data_btn_edit" rel="{{id}}" data-i18n="com.edit">编辑</a>
                    </p>
                    {{/hasChildren}}
                </li>
                {{/babies}}
            </ul>
        */}),
        _init:function(){
            J.$win.bind(J.EVT.uiXData.DataTypeChangeForPage,function(e,t){
                p.modRank.dataType = parseInt(t);
                p.modRank.reload(true);//排序不一样，所以要重新渲染下树形菜单
            }).bind(J.EVT.data.CTagUpdated,function(e,opType,d){
                p.modRank.onCTagUpdated(opType,d);
            }).bind(J.EVT.data.ClickDataChange,function(e,d){
                p.modRank.dataChangedAt=p.modRank.dataType;
                p.modRank.reload();
            }).bind(J.EVT.uiXData.UIScroll,function(e,sTop){
                //J.$win.trigger('oxmenuPositionNeedUpdating');
            }).bind(J.EVT.uiXData.UIReady,function(e){
                p.modRank.$d = $('#dataList1').bind('mouseleave',function(e){
                    p.modRank.antiCover=true;
                    J.ytag.hideCovers();
                    //console.log('modRank.mouseleave',new Date().getTime());
                }).bind('mouseenter',function(e){
                    p.modRank.antiCover=false;
                });
            }).bind(J.EVT.data.KeyDataChange,function(e,err,d){
                if(err){
                    p.modRank.$d.html('');
                }
            });
        },
        onCTagUpdated:function(opType,d){
            switch(opType){
                case -1:
                    //delete
                    $('#dataCTag'+d).remove();
                break;
                case 0:
                    //add
                    //var items = this.parseData([d]);
                    //this.render(items,true);
                    this.reload();
                break;
                case 1:
                    //update
                    //$('#dataCTag'+d.id).remove();
                    //var items = this.parseData([d]);
                    //this.render(items,true);
                    this.reload();
                break;
            };//switch
        },
        getData:function(cbk){
            J.data.getAllCTags(function(items){
                cbk(items);
            });
        },
        parseTreeData:function(ctag,ptag){
            ctag.pid = ptag.id;
            ctag = this.parseSingleItem(ctag,ptag);
            if ( (!ctag.babies) || (ctag.babies.length===0) ) {
                return ctag;
            };
            var len = ctag.babies.length;
            for(var i =0;i<len;i++){
                this.parseTreeData(ctag.babies[i],ctag);
            };//for
            return ctag;
        },
        parseSingleItem:function(tempItem,parentItem){
            tempItem.id = tempItem.isCustomYTag?tempItem.id:tempItem.ytagSelector;
            tempItem.ytags = [];
            tempItem.ytagIds =[];
            tempItem.click_num=0;
            tempItem.order_num=0;
            tempItem.click_trans_rate=0;
            tempItem.cl1="";
            tempItem.clListSub = "";
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
                tempItem.cl1+=' data_list_child';
                tempItem.clListSub =tempItem.id=='0'?'':' data_list_con1';
                tempItem.hasChildren = true;
            }
            ytagLen = tempItem.ytags.length;
            for(var j=0;j<ytagLen;j++){
                tempItem.ytagIds.push(tempItem.ytags[j].page_tag);
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
            tempItem = this.parseSingleItemToday(tempItem);

            //根节点
            if(tempItem.isRoot){
                delete parentItem['id'];
                $.extend(tempItem,parentItem);
            };

            //格式化
            tempItem.val1 = this.dataType===3?tempItem.val:J.formatNum(tempItem.val+'');

            //比例
            tempItem.percent = (parentItem.val==0?0:tempItem.val*100/parentItem.val).toFixed(2);

            //综合分值
            tempItem.grade = xData.score.init(J.data.CurrentKeyData.total.click_trans_rate,tempItem.click_trans_rate,1).toFixed(1);
            return tempItem;
        },
        parseSingleItemToday:function(tempItem){
            if(J.pagechart.isToday()){
                this.todayDataCache[tempItem.id] = {
                    click_num:tempItem.click_num,
                    order_num:tempItem.order_num,
                    click_trans_rate:tempItem.click_trans_rate
                };
            };
            var todayItem = this.todayDataCache[tempItem.id];
            switch(this.dataType){
                case 1:
                    tempItem.val0 = todayItem.click_num;
                break;
                case 2:
                    tempItem.val0 = todayItem.order_num;
                break;
                case 3:
                    tempItem.val0 = todayItem.click_trans_rate;
                break;
            };
            return tempItem;
        },
        parseData:function(items){//TODO:挪到J.data中去

            items = items||[];
            

            var len = items.length,
                tempItem = null,
                cItems = [],
                ytagLen = 0,
                parentItem = J.data.getSafeCurrentKeyData(this.dataType);

            for(var i=0;i<len;i++){
                tempItem = items[i];
                tempItem = this.parseSingleItem(tempItem,parentItem);
                if(tempItem.isCustomYTag){
                    cItems.push(tempItem);
                };
            };
            return cItems;
        },
        sort:function(items,asc){
            asc = asc || false;
            items.sort(function(a,b){
                return (asc?(a.val-b.val):(b.val-a.val));
            });
            var len = items.length;
            for(var i=0;i<len;i++){
                if(items[i].babies&&items[i].babies.length>0){
                    this.sort(items[i].babies,asc);
                };
            };
        },
        render:function(cItems,isPrepend){
            var emptyHtml = '<div id="dataList1Tip" class="data_alert data_alertB" data-i18n="tip.noDataAdvice">无数据</div>';
            $('#dataList1Tip').remove();
            if(!isPrepend){
                this.$d.find('.data_list_item').remove();
            }
            //console.log('cItems',cItems);
            if(cItems.length===0){
                this.$d.empty().html(emptyHtml).oxi18n({},true);
                return;
            };

            var d0= J.data.getSafeCurrentKeyData(this.dataType),
                d = {
                id:'0',
                babies:cItems,
                isCustomYTag:true,
                isRoot:true
            };
            this.parseTreeData(d,d0);

            //排序
            this.sort(d.babies,false);

            var html = J.toHtml(this.tpl,d,{children:this.tpl});

            this.$d.prepend(html);

            if (!isPrepend) {
                this.$d.oxi18n().oxtree({},true);
                J.$win.trigger(J.EVT.uiXData.ModRankRendered);
                //如果私有模块为空,提示用户模块维护接口人
                if(J.data.privateMods.length===0){
                    this.$d.append(emptyHtml).oxi18n({},true);
                }
            }else{
                $('#dataList1Tip').remove();
            };

        },
        reload:function(fromCache){
            if(fromCache){
                this.render(this.data);
                return;
            };
            this.getData(function(d){
                p.modRank.data = d = p.modRank.parseData(d);
                p.modRank.render(d);
                if(!p.modRank.dataInited){
                    $('#dataLoading2').remove();
                    p.modRank.dataInited=true;
                }
            });
        },
        getDataById:function(items,id){
            id+='';
            var item = null,
                tempItem = null,
                len = items.length;
            for(var i=0;i<len;i++){
                tempItem = items[i];
                if( id == (tempItem.id+'') ){
                    item = tempItem;
                    break;
                };
                if(tempItem.babies&&tempItem.babies.length>0){
                    item = this.getDataById(tempItem.babies,id);
                };
                if(item){
                    break;
                };
            };
            return item;
        }
    };

    this.getData = function(){
        return p.modRank.data;
    };

    this.getDataById = function(id){
        return p.modRank.getDataById(p.modRank.data||[],id);
    };

    this.getTodayDataById = function(id){
        return p.modRank.todayDataCache[id]||{};
    };

    this.antiCover = function(){
        return p.modRank.antiCover;
    };

});;
J('dataXCoupon',function(M,V,C){
    M.URL_MyCoupon = 'http://ic_fd_pc-pc0.tencent.com:8080/xcoupon/admin_icson.php';
    M.URL_HotCoupon='http://log.oxox.io/api.php?xn=xcoupon&xk=coupons&act=query';
    
    //事件接口
    this.EVT([
        'onGetMyCoupon',
        'onGetHotCoupon',
        'onGetAllCoupon'
    ]);

    M._init = function(){
        var ck =(document.cookie||''),
            uid = ck.split('yx_uid=')[1].split(';')[0],
            pid = window['yPageId']||'1000',
            wsid=ck.split('wsid=')[1].split(';')[0];

        this.bizInfo={
            uid:uid,
            wsid:wsid,
            pid:pid
        };
    }
    C.ajax = function(url,_params,_cbk,type){
        type = type||'GET';
        var jqXHR=$.ajax({
            type: type,
            url: url,
            data: _params,
            dataType: 'json'
        }).fail(function(jqXHR1,txtStatus1,err1){
            _cbk(err1);
        }).done(function(data,txtStatus2,jqXHR2){
            _cbk(null,data);
        });
        return jqXHR;
    };

    this.getBizData = function(){
        return M.bizInfo;
    };
    /**
     * 获取我的优惠券
     * @param {string} uid 用户id
     */
    this.getMyCoupon = function(uid,cbk){
        var bizInfo = this.getBizData();
        uid = uid||bizInfo.uid;
        return C.ajax(M.URL_MyCoupon,{uid:uid},function(err,data){
            J.$win.trigger(J.EVT.dataXCoupon.onGetMyCoupon,[err,data]);
            cbk(err,data);
        });
    };
    /**
     * 获取热门优惠券
     * @param {Function} cbk 回调函数
     */
    this.getHotCoupon = function(cbk){
        return C.ajax(M.URL_HotCoupon,null,function(err,data){
            J.$win.trigger(J.EVT.dataXCoupon.onGetHotCoupon,[err,data]);
            cbk(err,data);
        });
    };

    this.getAllCoupon = function(){
        J.dataXCoupon.getMyCoupon(M.bizInfo.uid,function(err,data){
            console.log('getMyCoupon'+M.bizInfo.uid,err,data);
            /*
            if(!err){
                me.getHotCoupon(function(err1,data1){
                    J.$win.trigger(J.EVT.data.onGetAllCoupon,[err1,data,data1]);
                });
            }
            */
            J.dataXCoupon.getHotCoupon(function(err1,data1){
                console.log('getHotCoupon',err1,data1);
                J.$win.trigger(J.EVT.dataXCoupon.onGetAllCoupon,[err1,data,data1]);
            });
        });
    };

});;
/**
 * module description
 */
J('joy',function(M,V,C){
    // 获取用户uid
    M.userID = G.header.common.getCookie("yx_uid");
    // 获取用户qq
    M.userQQ = G.header.common.getCookie("yx_uin");

    // 获取用户名称
    M.getUserName  = function(data){
        var d = data;
        if(d.account.toString().indexOf('Login_QQ_') == 0 || 'true' === G.util.cookie.get('__BINDQQACCOUNT')){//QQ用户
            var cps_msg = G.util.cookie.get("cps_msg").split('|');
            if (cps_msg.length >= 2 && cps_msg[0] == d.uid) {
                cps_msg.shift();
                return G.util.parse.encodeHtml(cps_msg.join('|'));
            }
            else{
                var qq_nick = G.util.cookie.get("qq_nick").split('|');
                if (qq_nick.length >= 2 && qq_nick[0] == d.uid) {
                    qq_nick.shift();
                    return G.logic.login.cutString(G.util.parse.encodeHtml(qq_nick.join('|')), G.logic.login._loginNameCutLen);
                }
            }
        }
        else if(d.account.toString().indexOf('Login_Alipay_') == 0){//支付宝
            return G.logic.login.cutString(G.util.parse.encodeHtml(d.name || d.account), G.logic.login._loginNameCutLen);
        }
        else if (/^\d+@51fanli$/.test(d.account.toString())) {//51fanli
            var cps_msg = G.util.cookie.get("cps_msg").split('|');
            if (cps_msg.length >= 2 && cps_msg[0] == d.uid) {
                return cps_msg[1];
            }
        }
        else if (d.account.toString().indexOf('Login_SHAuto_') == 0) {//安悦用户
            return G.logic.login.cutString(G.util.parse.encodeHtml(d.account.substr(13)), G.logic.login._loginNameCutLen);
        }
        //易迅帐号
        return G.logic.login.cutString(G.util.parse.encodeHtml(d.name || d.account), G.logic.login._loginNameCutLen);
    };

    // G.util.token方法（global.js）
    M.token = {
        //给连接加上token
        addToken : function(url,type){
            //type标识请求的方式,jq标识jquery，lk标识普通链接,fr标识form表单,ow打开新窗口
            var token=this.getToken();
            //只支持http和https协议，当url中无协议头的时候，应该检查当前页面的协议头
            if(url=="" || (url.indexOf("://")<0?location.href:url).indexOf("http")!=0){
                return url;
            }
            if(url.indexOf("#")!=-1){
                var f1=url.match(/\?.+\#/);
                 if(f1){
                    var t=f1[0].split("#"),newPara=[t[0],"&g_tk=",token,"&g_ty=",type,"#",t[1]].join("");
                    return url.replace(f1[0],newPara);
                 }else{
                    var t=url.split("#");
                    return [t[0],"?g_tk=",token,"&g_ty=",type,"#",t[1]].join("");
                 }
            }
            //无论如何都把g_ty带上，用户服务器端判断请求的类型
            return token==""?(url+(url.indexOf("?")!=-1?"&":"?")+"g_ty="+type):(url+(url.indexOf("?")!=-1?"&":"?")+"g_tk="+token+"&g_ty="+type);
        },
        //获取转换后的token
        getToken : function(){
            var skey=G.util.cookie.get("skey"),
                token=skey==null?"":this.time33(skey);
                return token;
        },
        //skey转token
        time33 : function(str){
            //哈希time33算法
            for(var i = 0, len = str.length,hash = 5381; i < len; ++i){
               hash += (hash << 5) + str.charAt(i).charCodeAt();
            };
            return hash & 0x7fffffff;
        }
    }

    // 错误信息 模板
    V.errTemplate = J.heredoc(function(){/*
        <div class="xbar_tips_error">
            请登录或刷新页面。
        </div>
    */});

    // 加载中 模板
    V.loadingTemplate = J.heredoc(function(){/*
        <div class="xbar_tips_loading">
            数据加载中
        </div>
    */});

    // 个人中心 模板
    V.mineTemplate = J.heredoc(function(){/*
        <div class="xbar_mineinfo" id="xbarMine">
            <div class="xbar_mineinfo_info">
                <img src="{{img}}" alt="">
                <p><b>{{name}}</b></p>
                <p>{{level_name}}</p>
            </div>
            <div class="xbar_mineinfo_detail">
                <p class="xbar_mineinfo_item">
                    <span class="xbar_mineinfo_tit">我的积分：</span>
                    <span class="xbar_mineinfo_cnt">{{jifen}}</span>
                </p>
                <p class="xbar_mineinfo_item">
                    <span class="xbar_mineinfo_tit">消费金额：</span>
                    <span class="xbar_mineinfo_cnt">&yen; {{fee}}</span>
                </p>
            </div>
        </div>
    */});

    // 购物车 模板
    V.cartTemplate = J.heredoc(function(){/*
        <div class="xbar_goods clearfix xbar_cartinfo" id="xbarCart">
            <ul class=" xbar_cartinfo_list">
            {{#data}}
                <li>
                    <a href="{{url}}" class="xbar_goods_img" target="_blank">
                        <img src="{{img}}" alt="">
                    </a>
                    <div class="xbar_goods_info">
                        <p class="xbar_goods_name">
                            <a href="{{url}}" target="_blank">{{name}}</a>
                        </p>
                        <p class="xbar_goods_price">
                            <span><i>&yen;</i>{{price}}</span><i>&times;</i><span>{{count}}</span>
                        </p>
                    </div>
                </li>
                {{/data}}
            </ul>
            <div class="xbar_cartinfo_total">
                {{#total}}
                <p>共<b>{{count}}</b>件商品，总计：<b>{{price}}</b></p>
                <p>满29元免运费</p>
                <a href="http://buy.yixun.com/showcart.html" class="mod_btn mod_btn_bg2 mod_btn_large" target="_blank">去结算<i></i></a>
                {{/total}}
            </div>
        </div>

    */});

    // 最近浏览 模板
    V.viewTemplate = J.heredoc(function(){/*
        <ul class="xbar_goods clearfix" id="xbarView">
            {{#data}}
            <li>
                <a href="{{url}}" class="xbar_goods_img" target="_blank">
                    <img src="{{img}}" alt="">
                </a>
                <div class="xbar_goods_info">
                    <p class="xbar_goods_name">
                        <a href="{{url}}" target="_blank">{{name}}</a>
                    </p>
                    <p class="xbar_goods_price">
                        <i>&yen;</i><span>{{price}}</span>
                    </p>
                </div>
            </li>
            {{/data}}
        </ul>
    */});

    // 猜你喜欢 模板
    V.likeTemplate = J.heredoc(function(){/*
        <ul class="xbar_goods clearfix" id="xbarLike">
            {{#data}}
            <li>
                <a href="{{url}}" class="xbar_goods_img" target="_blank">
                    <img src="{{img}}" alt="">
                </a>
                <div class="xbar_goods_info">
                    <p class="xbar_goods_name">
                        <a href="{{url}}" target="_blank">{{name}}</a>
                    </p>
                    <p class="xbar_goods_price">
                        <i>&yen;</i><span>{{price}}</span>
                    </p>
                </div>
            </li>
            {{/data}}
        </ul>
    */});

    // 订单 模板
    V.orderTemplate = J.heredoc(function(){/*
        <div class="xbar_orderinfo_wrap">
            {{#data}}
            <div class="xbar_orderinfo">
                <div class="xbar_orderinfo_hd">
                    <a href="http://base.yixun.com/orderdetail-{{businessDealId}}-html" target="_blank" class="xbar_orderinfo_num">订单：{{businessDealId}}</a><!-- <span class="xbar_orderinfo_count">共1件</span> --><span class="xbar_orderinfo_state">{{bdealGenTime}}</span>
                </div>
                <div class="xbar_orderinfo_bd">
                    {{#dealList}}
                    <div class="xbar_orderinfo_item">
                        <div class="xbar_orderinfo_title">
                            共计：<span class="xbar_orderinfo_title_num">&yen;{{dealPayment}}</span><span class="xbar_orderinfo_title_status">{{dealStateStr}}</span>
                        </div>
                        <div class="xbar_orderinfo_pic">
                            <ul>
                                {{#productList}}
                                <li>
                                    <a href="http://item.yixun.com/item-{{productId}}.html" target="_blank" title="{{itemTitle}}"><img src="{{itemUrl}}" alt=""></a>
                                </li>
                                {{/productList}}
                            </ul>
                        </div>
                    </div>
                    {{/dealList}}
                </div>
                <!-- <div class="xbar_orderinfo_info">
                    <p class="xbar_orderinfo_row">
                        <span class="xbar_orderinfo_row_tit">总额：</span>
                        <span class="xbar_orderinfo_row_cnt"><span class="xbar_orderinfo_price">¥9999.00</span>（微信支付）</span>
                    </p>
                    <p class="xbar_orderinfo_row">
                        <span class="xbar_orderinfo_row_tit">时间：</span>
                        <span class="xbar_orderinfo_row_cnt">2013-8-22</span>
                    </p>
                    <div class="xbar_orderinfo_btn">
                        <a href="#" class="mod_btn mod_btn_large">去支付</a>
                    </div>
                </div> -->
            </div>
            {{/data}}
        </div>
    */});

    // 收藏夹 模板
    V.favTemplate = J.heredoc(function(){/*
        <ul class="xbar_goods clearfix" id="xbarFav">
            {{#data}}
            <li>
                <a href="{{url}}" class="xbar_goods_img" target="_blank">
                    <img src="{{img}}" alt="">
                </a>
                <div class="xbar_goods_info">
                    <p class="xbar_goods_name">
                        <a href="{{url}}" target="_blank">{{name}}</a>
                    </p>
                    <p class="xbar_goods_price">
                        <i>&yen;</i><span>{{price}}</span>
                    </p>
                </div>
            </li>
            {{/data}}
        </ul>
    */});

    M.showTemplate = function(name){
        switch(name){
            case "mine":
                $.ajax({
                     url:'http://base.yixun.com/json.php?mod=vip&act=getVipInfo&uid='+M.userID,
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_mine .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        console.log(result);
                        if (result.errno == 0) {
                            // console.log(result);
                            var info = result.data;
                            var _mineInfo = [];
                            _mineInfo.push({
                                img : "http://qlogo2.store.qq.com/qzone/"+info.qq+"/"+info.qq+"/100",
                                name : M.userName,
                                level_name : info.levelDesc,
                                jifen : info.point,
                                fee : info.experience+info.virtualExpPoints
                            });
                            console.log(_mineInfo);
                            $("#xpanel_mine .xpanel_inner").html(J.toHtml(V.mineTemplate,_mineInfo[0]));
                        }else{
                            $("#xpanel_mine .xpanel_inner").html(V.errTemplate);
                        }
                     }
                });
                // $("#xpanel_mine .xpanel_inner").html(J.toHtml(V.mineTemplate,""));
                break;
            case "cart":
                $.ajax({
                     url:'http://cart.buy.yixun.com/minicart/minilistislogincmem?uid='+M.userID+'&pnum=10',
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_cart .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        console.log(result);
                        if (result.errno == 0) {
                            var _goodsInfo = {
                                data : [],
                                total : []
                            };
                            var data = result.data,
                                totalCount = 0,
                                totalPrice = 0;
                            // console.log(data);
                            $.each(data, function(i, item) {
                                _goodsInfo.data.push({
                                    url : 'http://item.'+G.header.domain+'/item-' + item.product_id + '.html',
                                    name : item.name,
                                    img : G.header.common._getPicUrl(item.product_char_id,"middle", 0),
                                    price : (item.price / 100).toFixed(2),
                                    count : item.buy_count
                                });
                                totalCount += parseInt(item.buy_count),
                                totalPrice += (parseInt(item.price)*parseInt(item.buy_count));
                            });
                            _goodsInfo.total.push({
                                price : (totalPrice / 100).toFixed(2),
                                count : totalCount
                            });
                            // console.log();
                            $("#xpanel_cart .xpanel_inner").html(J.toHtml(V.cartTemplate,_goodsInfo));
                        }else{
                            $("#xpanel_cart .xpanel_inner").html(V.errTemplate);
                        }
                     }
                });
                break;
            case "fav":
                $.ajax({
                     url:'http://base.yixun.com/json.php?mod=favor&act=getlist&uid='+M.userID+'&page=1&perpage=100',
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_fav .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        console.log(result);
                        if (result.errno == 0) {
                            var _goodsInfo = {
                                data : []
                            };
                            var data = result.data;
                            // console.log(data);
                            $.each(data, function(i, item) {
                                _goodsInfo.data.push({
                                    url : 'http://item.'+G.header.domain+'/item-' + item.product_id + '.html',
                                    name : item.name,
                                    img : G.header.common._getPicUrl(item.product_char_id,"middle", 0),
                                    price : (item.price / 100).toFixed(1),
                                    count : item.buy_count
                                });
                            });
                            // console.log();
                            $("#xpanel_fav .xpanel_inner").html(J.toHtml(V.favTemplate,_goodsInfo));
                        }else{
                            $("#xpanel_fav .xpanel_inner").html(V.errTemplate);
                        }
                     }
                });
                break;
            case "view":
                $.ajax({
                     url:'http://s6.smart.yixun.com/w/tf/gettfx?tfid=100004&type=jsonp',
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_view .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        // console.log(result);
                        var _goodsInfo = {
                            data : []
                        };
                        var data = result.data.POS_HISTORY;
                        console.log(data);
                        $.each(data, function(i, item) {
                            _goodsInfo.data.push({
                                url : item.URL,
                                name : item.TITLE,
                                img : item.IMG,
                                price : item.PRICE,
                                count : 0
                            });
                        });
                        // console.log();
                        $("#xpanel_view .xpanel_inner").html(J.toHtml(V.viewTemplate,_goodsInfo));
                     }
                });
                break;
            case "like":
                // console.log(M.userQQ);
                var tfids = 100001; //未知参数
                $.ajax({
                     url:'http://s1.smart.yixun.com/w/tf/gettfxs?tfids='+tfids+'&uin='+M.userQQ,
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_like .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        console.log(result);
                        var _goodsInfo = {
                            data : []
                        };
                        var data = result[tfids].data.POS_1;
                        console.log(data);
                        $.each(data, function(i, item) {
                            _goodsInfo.data.push({
                                url : item.URL,
                                name : item.TITLE,
                                img : item.IMG,
                                price : item.PRICE,
                                count : 0
                            });
                        });
                        // console.log();
                        $("#xpanel_like .xpanel_inner").html(J.toHtml(V.likeTemplate,_goodsInfo));
                     }
                });
                break;
            case "order":
                // console.log(M.userQQ);
                $.ajax({
                     url:'http://buy.yixun.com/json.php?mod=showorder&act=getUserOrders&pageIndex=1',
                     dataType:"jsonp",
                     jsonp:"callback",
                     beforeSend:function(){
                        $("#xpanel_order .xpanel_inner").html(V.loadingTemplate);
                     },
                     success:function(result){
                        console.log(result);
                        if (result.errno == 0) {
                            // var _goodsInfo = {
                            //     data : []
                            // };
                            // var data = result.data;
                            // console.log(data);
                            // $.each(data, function(i, item) {
                            //     _goodsInfo.data.push({
                            //         url : "http://base.yixun.com/orderdetail-"+item.businessDealId+"-html",
                            //         name : item.dealList[0]["productList"][0]["itemTitle"],
                            //         img : item.dealList[0]["productList"][0]["itemUrl"],
                            //         price : item.payScore,
                            //         count : 0
                            //     });
                            // });
                            // console.log();
                            result.data.reverse();

                            $("#xpanel_order .xpanel_inner").html(J.toHtml(V.orderTemplate,result));
                        }else{
                            $("#xpanel_order .xpanel_inner").html(V.errTemplate);
                        }
                     }
                });
                break;
            case "coupon":
                
                break;
            default: 
                console.log("none panel");
        }
    };

    M.renderPersonalInfo = function(){
        G.logic.login.getLoginUser(function(o){
            console.log(o);
            if(o && o.errno == 0){//已登录
                var self = o.data;
                M.userName = self.name;
                $('.xbar_mine .xbar_name').html(self.name);
                $('.xbar_avatar').attr('src','http://qlogo2.store.qq.com/qzone/'+self.qq+'/'+self.qq+'/50')
            }
            else{//未登录
                // $(".xbar_mine").attr("href","https://base.yixun.com/login.html?url="+location.href);
                $(".xbar_mine .xbar_name").html("未登录");
                $(".xbar_order").hide();
                $(".xbar_cart").hide();

            }
        });
    };



    C._init = function(){
        M.renderPersonalInfo();
        J.$win.bind(J.EVT.ui.onShowXPanel,function(e,panelId){
            // alert('面板显示:'+panelId);
            //接下来写面板显示后的各种应用逻辑
            M.showTemplate(panelId);
        }); 
    };

});
;
/**
 * module description
 */
J('lv',function(M,V,C){
    M.isSearchex = location.href.indexOf('searchex.yixun.com')>-1;
    
    M.quan = {};
    V.quan = {
        tplHD:J.heredoc(function(){/*
            <a class="goods_more_tag xcoupon_lnk"gtagtype="he">可用券<i></i><span></span></a>
        */}),
        tplBD:J.heredoc(function(){/*
            {{#cnt1}}
            <h4>可用券：</h4>
            <ul class="xcoupon_list xcoupon_list1">
                {{#items1}}
                <li><a href="{{url}}" target="_blank" title="{{name}}">{{name}}</a></li>
                {{/items1}}
            </ul>
            {{/cnt1}}
            <h4>可领券：</h4>
            <ul class="xcoupon_list xcoupon_list2">
                {{#items2}}
                <li><a href="{{url}}" target="_blank" title="{{title}}">{{title}}</a></li>
                {{/items2}}
            </ul>
        */}),
        _init:function(){
            if(!M.isSearchex) return;
            this.$items = $('#itemList').find('li');
            M.cnt = this.$items.length;

            
        },
        render:function(myCoupons,hotCoupons){
            var cnt =8 ,idx;
            while(cnt>0){
                idx = Math.floor(Math.random()*cnt);
                if(idx<M.cnt){
                    this.addQuanUI(idx,myCoupons,hotCoupons);
                }
                cnt--;
            };
        },
        addQuanUI:function(idx,myCoupons,hotCoupons){
            if(M.quan[idx+'']){
                return;
            }
            M.quan[idx+'']=true;
            var $hd = this.$items.eq(idx).find('.goods_more_hd').append(this.tplHD);
            var data = {
                cnt1:0,
                cnt2:0,
                items1:[],
                items2:[]
            };
            if(myCoupons.total>0){
                data.items1.push({
                    url:"http://base.yixun.com/mycoupon.html",
                    name:myCoupons.coupons[0].coupon_name
                });
                data.cnt1=1;
            }
            if(hotCoupons.xv.length>0){
                data.items2.push({
                    url:hotCoupons.xv[0].url,
                    name:hotCoupons.xv[0].coupon_name
                });
                data.cnt2=1;
            }
            var html = J.toHtml(this.tplBD,data),
                $bd = this.$items.eq(idx).find('.goods_more_bd');
            if($bd.length>0){
                $bd.append(html);
            }else{
                $hd.after('<div class="goods_more_bd">'+html+'</div>');
            }
        }
    };

    C.quan = {
        _init:function(){
            if(!M.isSearchex) return;
            J.$win.bind(J.EVT.dataXCoupon.onGetAllCoupon,function(e,err,myCoupons,hotCoupons){
                if(err){
                    return;
                }
                //TEST:
                myCoupons = myCoupons||{errCode:0,data:{total:0}}
                //数据二次处理
                if(myCoupons.errCode!==0){
                    J.log(myCoupons.errMsg);
                    //获取我的优惠券报错
                    return;
                }
                myCoupons = myCoupons.data;
                if(hotCoupons.code!=="1"){
                    //获取热门优惠券报错
                    J.log(hotCoupons.info);
                    return;
                }
                hotCoupons = hotCoupons.info;

                if(!err){
                    M.quan.myCoupons = myCoupons;
                    M.quan.hotCoupons = hotCoupons;
                    V.quan.render(myCoupons,hotCoupons);
                }
                
            });

            //取券数据
            J.dataXCoupon.getAllCoupon();

        }
    };

});;
/**
 * module description
 */
J('aron',function(M,V,C){


    

     V.couponPopupTpl = J.heredoc(function(){/*
        <div class="Xmod_popup" id="J_coupon_popup" style="display:none;">
            <div class="Xmod_popup_hd">
                <h3>优惠券</h3>
                <span class="Xmod_popup_close" id="J_popup_close">关闭</span>
            </div>
            <div class="Xmod_popup_bd">
                <div class="Xcoupon_container">
                    <div class="Xcoupon">
                        <div class="Xcoupon_sec my_coupon">
                            <h2 class="Xcoupon_sec_tit">我的优惠券</h2>
                            <div class="Xcoupon_sec_bd">
                                <ul class="Xcoupon_list clearfix" id="myCoupon">
                                </ul>
                            </div>
                        </div>

                        <div class="Xcoupon_sec">
                            <h2 class="Xcoupon_sec_tit">热门优惠券</h2>
                            <div class="Xcoupon_sec_bd">
                                <ul class="Xcoupon_list clearfix" id="availableCoupon">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
        <div id="J_mask" class="Xmod_popup_mask" style="display:none;"></div>
    */});

    V.renderCoupon = function(obj, data, isOwned, num){
        var html = [];
        var count = 0;
        if (data.length == 0) {
            html.push('<p class="tips_none">暂时没有可用的优惠券哦！</p>');
        } else {
            $.each(data, function(){
                count++;
                var row = this;
                var rowHtml;
                if (isOwned) {
                    rowHtml = [
                        '<li>',
                            '<a class="Xcoupon_item" title="'+ row.coupon_name+'" href="http://base.yixun.com/mycoupon.html" title="查看我的优惠券" target="_blank">',
                            '<div class="col col1"><div class="Xcoupon_val"><i>&yen;</i><span>' + row.coupon_amt/100 + '</span></div></div>',
                            '<div class="col col2"><div class="Xcoupon_desc">' + row.coupon_name + '</div><div class="Xcoupou_expired">有效期至：' + M.formatTime(row.valid_time_to*1000) + '</div></div>',
                            '</a>',
                        '</li>'
                    ].join(''); 
                } else {
                    rowHtml = [
                        '<li>',
                            '<a class="Xcoupon_item" href="' + row.url + '" target="_blank" title="'+ row.coupon_name+'">',
                            '<div class="col col1"><div class="Xcoupon_val"><i>&yen;</i><span>' + row.coupon_amt + '</span></div></div>',
                            '<div class="col col2"><div class="Xcoupon_desc">' + row.coupon_name + '</div><div class="Xcoupou_expired">有效期至：' + M.formatTime(row.valid_time_to) + '</div></div>',
                            /*'<div class="Xcoupou_btn Xmod_btn">立即领取</div></a>',*/
                        '</li>'
                    ].join(''); 
                } 
                html.push(rowHtml);
                if (num && count == num) {
                    return false;
                }
            });
        }
        $(obj).html(html.join(''));
    }

    V.showCouponPopup = function(){
        $('#J_coupon_popup').show();
        $('#J_mask').show();
    }


    V.hideCouponPopup = function(){
       $('#J_coupon_popup').hide();
       $('#J_mask').hide(); 
    }


    M.formatTime = function(timestamp){
        var date = new Date(timestamp);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }



    C._init = function(){
        J.$body.append(V.couponPopupTpl);
        J.$win.bind(J.EVT.dataXCoupon.onGetAllCoupon,function(e,err,myCoupons,hotCoupons){
            if (err) {
                return
            }
            console.log(myCoupons);
            myCoupons = myCoupons.data.coupons;
            hotCoupons = hotCoupons.info.xv;
            V.renderCoupon($('#xbarCoupon'), myCoupons, true, 5);
            V.renderCoupon($('#availableCoupon'), hotCoupons, false);
            V.renderCoupon($('#myCoupon'), myCoupons, true);
        }); 


        $('#J_popup_close').bind('click', function(e){
            e.preventDefault();
            V.hideCouponPopup();
        });

         $('#J_moreCoupon').bind('click', function(e){
            e.preventDefault();
            V.showCouponPopup();
        });

         J.dataXCoupon.getAllCoupon();

        
    };





    /*V.tpl0 = J.heredoc(function(){/*
        <div class="mod_pop" style="left:-400px; top:200px; left: 50%; width:800px;">
            <div class="mod_pop_hd">
                <h3 class="mod_pop_tit">优惠券</h3>
                <button type="button" class="mod_pop_close" data-dismiss="model">关闭</button>
            </div>
            <div class="mod_pop_bd">
                <div class="mod_pop_con">
                    <iframe frameborder="0" border="0" id="preview_frame" width="188" height="225" scrolling="no" allowtransparency="true" src="http://chong.qq.com/tws/entra/getpanel?id=306&amp;vb2ctag=3_1007_1_1346&amp;width=188&amp;height=225"></iframe>
                </div>
            </div>
        </div>
    });

    /*V.render = function(data){
        $('#list').append(J.toHtml(this.tpl0,data));
        if(M.isDataLoaded){

        }
    };

    M.isDataLoaded = false;

    C._init = function(){
        J.$win.bind(J.EVT.data.onGetAllCoupon,function(e,err,myCoupons,hotCoupons){
            console.log(hotCoupons)
            M.isDataLoaded = true;
        }); 
    };

    C.xxx = {
        _init:function(){
           J.$win.bind(J.EVT.data.onGetAllCoupon,function(e,err,myCoupons,hotCoupons){
                console.log(hotCoupons)
            });  
        }
    };
    
    C=>V
    C=>M
    V=>M





    */


});;
