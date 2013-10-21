J(function($,p,pub){
    pub.id="modrank";
    //自定义单元排行榜
    p.modRank = {
        $d:null,
        dataType:1,
        dataChangedAt:1,
        dataInited:false,
        todayDataCache:{},
        tpl:J.heredoc(function(){/*
            <ul id="dataList{{pid}}" class="data_list_con">
                {{#babies}}
                <li id="xdataCTag{{id}}" data-pid="{{pid}}" class="data_list_item{{cl1}}" data-id="{{id}}" data-alias="{{alias}}" data-val="{{val}}" data-val0="{{val0}}">
                    {{#hasChildren}}
                        <i class="data_list_ico"></i>
                        <a id="xdataLnkCTag{{id}}" data-id="{{id}}" data-alias="{{alias}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" data-val="{{val}}" data-val0="{{val0}}" class="data_list_lk">{{alias}}<span>{{val}}</span><span>({{click_trans_rate}})</span></a>
                        <p class="data_list_control">
                            <a href="javascript:;" class="data_btn_edit" rel="{{id}}" data-i18n="com.edit">编辑</a>
                        </p>
                        {{>children}}
                    {{/hasChildren}}
                    {{^hasChildren}}
                    <i class="data_list_ico"></i>
                    <a id="xdataLnkCTag{{id}}" data-id="{{id}}" data-alias="{{alias}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" data-val="{{val}}" data-val0="{{val0}}" class="data_list_lk">{{alias}}<span>{{val}}</span><span>({{click_trans_rate}})</span></a>
                    <p class="data_list_control">
                        <a href="javascript:;" class="data_btn_edit" rel="{{id}}" data-i18n="com.edit">编辑</a>
                    </p>
                    {{/hasChildren}}
                </li>
                {{/babies}}
            </ul>
        */}),
        _init:function(){
            J.$win.bind(J.ui.EVT.UIReady,function(e){
                p.modRank.$d = $('#xdataList1');
                p.modRank.reload();
            }).bind(J.ui.EVT.DataTypeChange,function(e,t){
                p.modRank.dataType = parseInt(t);
                p.modRank.reload();
            }).bind(J.data.EVT.CTagUpdated,function(e,opType,d){
                p.modRank.onCTagUpdated(opType,d);
            }).bind(J.data.EVT.ClickDataChange,function(e,d){
                p.modRank.dataChangedAt=p.modRank.dataType;
                p.modRank.reload();
            }).bind(J.ui.EVT.UIScroll,function(e,sTop){
                //J.$win.trigger('oxmenuPositionNeedUpdating');
            });
        },
        onCTagUpdated:function(opType,d){
            switch(opType){
                case -1:
                    //delete
                    $('#xdataCTag'+d).remove();
                break;
                case 0:
                    //add
                    var items = this.parseData([d]);
                    this.render(items,true);
                break;
                case 1:
                    //update
                    $('#xdataCTag'+d.id).remove();
                    var items = this.parseData([d]);
                    this.render(items,true);
                break;
            };//switch
        },
        getData:function(cbk){
            J.data.getAllCTags(function(items){
                cbk(items);
            });
        },
        parseTreeData:function(ctag,pid){
            ctag.pid = pid;
            ctag = this.parseSingleItem(ctag);
            if ( (!ctag.babies) || (ctag.babies.length===0) ) {
                return ctag;
            };
            var len = ctag.babies.length;
            for(var i =0;i<len;i++){
                this.parseTreeData(ctag.babies[i],ctag.id);
            };//for
            return ctag;
        },
        parseSingleItem:function(tempItem){
            tempItem.id = tempItem.isCustomYTag?tempItem.id:tempItem.ytagSelector;
            tempItem.ytags = [];
            tempItem.ytagIds =[];
            tempItem.click_num=0;
            tempItem.order_num=0;
            tempItem.click_trans_rate=0;
            tempItem.cl1="";
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
                ytagLen = 0;
            for(var i=0;i<len;i++){
                tempItem = items[i];
                tempItem = this.parseSingleItem(tempItem);
                tempItem = this.parseSingleItemToday(tempItem);
                if(tempItem.isCustomYTag){
                    cItems.push(tempItem);
                };
            };
            return cItems;
        },
        render:function(cItems,isPrepend){
            this.$d.find('.xdata_alert').remove();
            if(!isPrepend){
                this.$d.find('.data_list_item').remove();
            }
            if(cItems.length===0){
                this.$d.html('<div class="xdata_alert" data-i18n="ajax.noData">无数据</div>').oxi18n();
                return;
            };
            var d = {
                id:'0',
                babies:cItems,
                isCustomYTag:true
            };
            this.parseTreeData(d,"-1");

            var html = J.toHtml(this.tpl,d,{children:this.tpl});

            this.$d.prepend(html);

            if (!isPrepend) {
                this.$d.oxi18n().oxtree({},true);
                J.$win.trigger(J.ui.EVT.ModRankRendered);
            };

        },
        reload:function(){
            this.getData(function(d){
                p.modRank.data = d = p.modRank.parseData(d);
                p.modRank.render(d);
                if(!p.modRank.dataInited){
                    $('#xdataLoading2').remove();
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

});