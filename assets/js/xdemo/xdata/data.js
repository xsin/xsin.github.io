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
});