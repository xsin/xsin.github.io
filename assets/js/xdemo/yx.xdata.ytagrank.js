//ytag排行榜
J(function($,p,pub){
    pub.id = "ytagrank";
    //ytag排行榜
    p.rank = {
        dataType:1,
        dataChangedAt:1,
        tpl:J.heredoc(function(){/*
            {{#empty}}
            <div class="xdata_alert">无数据</div>
            {{/empty}}
            {{^empty}}
            {{#items}}
            <div class="data_list_item">
                <div class="data_list_entry">
                    <a class="data_list_lk" id="xdataLnk{{id}}" href="javascript:;" data-ytag="{{ytagid}}" data-href="{{href}}" title="{{title}}">{{text}}<span>{{val}}</span></a>
                </div>
            </div>
            {{/items}}
            {{/empty}}
        */}),
        _init:function(){
            //Notice:Temporay shut down!
            return;

            J.$win.bind(J.ui.EVT.UIReady,function(e){
                p.rank.render(1);
            }).bind(J.ui.EVT.DataTypeChange,function(e,t){
                t = parseInt(t);
                p.rank.dataType=t;
                p.rank.render(t);
            }).bind(J.data.EVT.ClickDataChange,function(e,d){
                p.rank.dataChangedAt=p.rank.dataType;
                p.rank.render(p.rank.dataType,true);
            });
        },
        render:function(dataType,forceUpdate){
            if(!this.$objs){
                this.$objs=$('#xdataList2').find('.xdata_rank');
            }
            var $obj = this.$objs.removeClass('xdata_visible').eq(dataType-1).addClass('xdata_visible');
            if(!$obj[0].getAttribute('data-xdata')){
                $obj[0].innerHTML = J.toHtml(this.tpl, this.getData(dataType));
                $obj[0].setAttribute('data-xdata','1');
                return;
            };
            if(forceUpdate||(p.rank.dataChangedAt!=dataType)){
                $obj[0].innerHTML = J.toHtml(this.tpl, this.getData(dataType));
            };
        },
        getData:function(dataType,topCnt){
            var rawData = J.data['CurrentClickData'],
                niceData = this.parseData(rawData,dataType,topCnt);
            return niceData;
        },
        parseData:function(d,dataType,topCnt){
            d = d.data;
            var items = [],tempTag;
            for(var c in d){
                if(typeof(d[c])!=='object')
                {
                    continue;
                }
                tempTag = J.ytag.get(d[c].page_tag);
                if(!tempTag){
                    continue;
                }
                $.extend(d[c],tempTag);
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
        //降序排列数据
        orderDataDescBy:function(arrData,dataType){
            //new a copy of arrData
            arrData = arrData.slice(0);
            switch(dataType){
                case 1:
                    //do nothing，默认是按点击数排序的
                break;
                case 2:
                    //按下单量排序
                    arrData.sort(function(a,b){
                        return (b.order_num-a.order_num);
                    });
                break;
                case 3:
                    //按转化率排序
                    //按下单量排序
                    arrData.sort(function(a,b){
                        return (parseFloat(b.click_trans_rate)-parseFloat(a.click_trans_rate));
                    });
                break;
            };
            return arrData;
        }
    };
});