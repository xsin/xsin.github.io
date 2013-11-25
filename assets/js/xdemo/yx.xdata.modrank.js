J(function($,p,pub){
    pub.id="modrank";
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
            J.$win.bind(J.ui.EVT.DataTypeChangeForPage,function(e,t){
                p.modRank.dataType = parseInt(t);
                p.modRank.reload(true);//排序不一样，所以要重新渲染下树形菜单
            }).bind(J.data.EVT.CTagUpdated,function(e,opType,d){
                p.modRank.onCTagUpdated(opType,d);
            }).bind(J.data.EVT.ClickDataChange,function(e,d){
                p.modRank.dataChangedAt=p.modRank.dataType;
                p.modRank.reload();
            }).bind(J.ui.EVT.UIScroll,function(e,sTop){
                //J.$win.trigger('oxmenuPositionNeedUpdating');
            }).bind(J.ui.EVT.UIReady,function(e){
                p.modRank.$d = $('#dataList1').bind('mouseleave',function(e){
                    p.modRank.antiCover=true;
                    J.ytag.hideCovers();
                    //console.log('modRank.mouseleave',new Date().getTime());
                }).bind('mouseenter',function(e){
                    p.modRank.antiCover=false;
                });
            }).bind(J.data.EVT.KeyDataChange,function(e,err,d){
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
                J.$win.trigger(J.ui.EVT.ModRankRendered);
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

    pub.getData = function(){
        return p.modRank.data;
    };

    pub.getDataById = function(id){
        return p.modRank.getDataById(p.modRank.data||[],id);
    };

    pub.getTodayDataById = function(id){
        return p.modRank.todayDataCache[id]||{};
    };

    pub.antiCover = function(){
        return p.modRank.antiCover;
    };

});