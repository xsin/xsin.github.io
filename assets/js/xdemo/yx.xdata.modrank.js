J(function($,p,pub){
    pub.id="modrank";
    //自定义单元排行榜
    p.modRank = {
        $d:null,
        dataType:1,
        dataChangedAt:1,
        dataInited:false,
        tpl:J.heredoc(function(){/*
            {{#empty}}
            <div class="xdata_alert">无数据</div>
            {{/empty}}
            {{#items}}
            <li id="xdataCTag{{id}}" class="data_list_item{{cl1}}" data-oxmenuid="{{id}}" data-alias="{{alias}}" data-val="{{val}}">
                <div class="data_list_entry">
                    <a id="xdataLnkCTag{{id}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" data-val="{{val}}" class="data_list_lk">{{alias}}<span>{{val}}</span></a>
                    <p class="data_list_control">
                        <a href="javascript:;" class="data_btn_edit" rel="{{id}}">编辑</a>
                    </p>
                    <i class="data_ico_more"></i>
                </div>
            </li>
            {{/items}}
        */}),
        tplSub:J.heredoc(function(){/*
            <div id="xdataListMore{{pid}}" class="data_list data_list_more">
                <ul>
                {{#babies}}
                <li id="xdataCTag{{id}}" data-pid="{{pid}}" class="data_list_item{{cl1}}" data-oxmenuid="{{id}}" data-alias="{{alias}}" data-val="{{val}}">
                    {{#hasChildren}}
                        <div class="data_list_entry">
                            <a id="xdataLnkCTag{{id}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" data-val="{{val}}" class="data_list_lk">{{alias}}<span>{{val}}</span></a>
                            <p class="data_list_control">
                                <a href="javascript:;" class="data_btn_edit" rel="{{id}}">编辑</a>
                            </p>
                            <i class="data_ico_more"></i>
                        </div>
                        {{>children}}
                    {{/hasChildren}}
                    {{^hasChildren}}
                    <div class="data_list_entry">
                        <a id="xdataLnkCTag{{id}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" data-val="{{val}}" class="data_list_lk">{{alias}}<span>{{val}}</span></a>
                        <p class="data_list_control">
                            <a href="javascript:;" class="data_btn_edit" rel="{{id}}">编辑</a>
                        </p>
                        <i class="data_ico_more"></i>
                    </div>
                    {{/hasChildren}}
                </li>
                {{/babies}}
                </ul>
            </div>
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
                J.$win.trigger('oxmenuPositionNeedUpdating');
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
                tempItem.cl1+=' data_list_item2';
                tempItem.hasChildren = true;
            }
            ytagLen = tempItem.ytags.length;
            for(var j=0;j<ytagLen;j++){
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
        parseData:function(items){//TODO:挪到J.data中去

            items = items||[];

            var len = items.length,
                tempItem = null,
                cItems = [],
                ytagLen = 0;
            for(var i=0;i<len;i++){
                tempItem = items[i];
                tempItem = this.parseSingleItem(tempItem);
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
            var html = '<ul>'+J.toHtml(this.tpl,{
                    empty:(cItems.length==0),
                    items:cItems
                })+'</ul>';
            this.$d.prepend(html);

            if (!isPrepend) {
                $('#xdataList1').find('.data_list_item2').oxmenu({
                    onShowing:function(id,cbk){
                        p.modRank.onShowingSubMenus(id,cbk);
                    },
                    hideDelay:0,
                    showDelay:0,
                    showSpeed:0
                });
            };

        },
        onShowingSubMenus:function(id,cbk){
            //获取子级模块数据
            var rootTag = J.data.getDefaultCTagById(id);
            if ( (!rootTag) || (!rootTag.babies) || (rootTag.babies.length===0) ) {
                cbk('');
                return;
            };
            this.parseTreeData(rootTag,id);
            var html = J.toHtml(this.tplSub,{
                    pid:id,
                    babies:rootTag.babies
                },{children:this.tplSub});
            cbk(html);
        },
        reload:function(){
            this.resetSubMenus();
            this.getData(function(d){
                p.modRank.data = d = p.modRank.parseData(d);
                p.modRank.render(d);
                if(!p.modRank.dataInited){
                    $('#xdataLoading2').remove();
                    p.modRank.dataInited=true;
                }
            });
        },
        resetSubMenus:function(){
            $('#xdataWrap').find('.data_list_more').remove();
        }
    };

});