/* S CoreUI */
J(function($,p,pub){
    pub.id='ui';
    var coreTpl = J.heredoc(function(){/*
        <div id="xdataWrap" class="xdata_wrap">
            <a id="xdataClose" href="javascript:;" class="xdata_close">+</a>
            <div id="xdataUI" class="data_ui">
                <div id="xdataUIHD" class="data_ui_hd xdata_fixed">
                    <div id="xdataTab" class="data_tab">
                        <ul id="xdataType">
                            <li><a href="javascript:;" class="on" rel="1">点击量</a></li>
                            <li><a href="javascript:;" rel="2">下单量</a></li>
                            <li><a href="javascript:;" rel="3">转化率</a></li>
                        </ul>
                    </div>
                    <div class="data_time">
                        <input class="xdata_date xdata_sdate" id="xdataKeyChartDate1" type="date"/><span class="c_tx3">-</span><input class="xdata_date xdata_edate" id="xdataKeyChartDate2" type="date" />
                        <button id="xdataRetweet1" class="data_btn">刷新</button>
                    </div>
                </div>

                <div class="data_ui_bd">
                    <div class="data_box">
                        <div class="data_box_hd">
                            <h3>页面趋势</h3>
                            <a href="javascript:;" id="xdataBtnHeatmap" class="data_btn data_btn_bg1">显示热区图</a>
                        </div>
                        <div class="data_box_bd">
                            <div id="xdataKeyCharts" class="data_total">
                                <div id="xdataKeyChartTip" class="xdata_keycharttip xdata_hidden"><div class="xdata_keycharttip_bg"></div><div class="xdata_keycharttip_bd"></div></div>
                                <div id="xdataKeyChart1" class="data_total_inner xdata_keychart xdata_visible"></div>
                                <div id="xdataKeyChart2" class="data_total_inner xdata_keychart"></div>
                                <div id="xdataKeyChart3" class="data_total_inner xdata_keychart"></div>
                            </div>
                        </div>
                        <div class="data_box">
                            <div class="data_box_hd">
                                <h3>模块趋势</h3>
                                <a id="xdataAddCTag" href="javascript:;" class="data_btn data_btn_bg1 xdata_btn_addmod">新增模块</a>
                                <img id="xdataLoading2" class="xdata_loading2" src="http://static.gtimg.com/icson/img/common/loading.gif"/>
                            </div>
                            <div class="data_box_bd">
                                <!--默认列表-->
                                <div id="xdataList1" class="data_list"></div>
                                <!--单个ytag排行榜-->
                                <div id="xdataList2" class="data_list data_listb xdata_hidden">
                                    <div id="xdataRank1" class="xdata_rank xdata_visible"></div>
                                    <div id="xdataRank2" class="xdata_rank"></div>
                                    <div id="xdataRank3" class="xdata_rank"></div>
                                </div>
                                <!--/单个ytag排行榜-->
                            </div>
                        </div><!--/data_box-->
                    </div>
                </div>

            </div>
            <div id="xdataPop1" class="data_pop xdata_hidden">
                <div class="data_time">
                    <input id="xdataPop1Date1" class="xdata_date xdata_sdate1" type="date" /><span class="c_tx3">-</span><input id="xdataPop1Date2" class="xdata_date xdata_edate" type="date" />
                    <button id="xdataRetweet2" class="data_btn">刷新</button>
                </div>
                <div class="data_pop_con">
                    <div class="data_total">
                        <div id="xdataYTagChartTip" class="xdata_ytagcharttip xdata_hidden"></div>
                        <div id="xdataYTagChart" class="data_total_inner xdata_ytagchart"></div>
                    </div>
                </div>
                <a id="xdataPop1Close" href="javascript:;" class="xdata_pop_close">+</a>
            </div>
            <div id="xdataPop2" class="data_pop data_pop2 xdata_hidden">
                <div class="data_pop_add">
                    <ul>
                        <li><input id="xdataPop2Ipt1" type="text" placeholder="请输入模块名称" /></li>
                        <li><input id="xdataPop2Ipt2" type="text" value="" placeholder="请输入模块的css选择器或以|分隔的ytag"/></li>
                    </ul>
                    <div class="data_control">
                        <a id="xdataPop2Btn1" href="javascript:;" class="data_btn">更新</a>
                        <a id="xdataPop2Btn2" href="javascript:;" class="data_btn data_btn_bg1">删除</a>
                    </p>
                    <div id="xdataPop2Tip" class="xdata_pop2tip xdata_hidden"></div>
                </div>
                <a id="xdataPop2Close" href="javascript:;" class="xdata_pop_close">+</a>
            </div>
        </div>
    */});

    var EVT={
        'DataTypeChange':'onXDataTypeChange',
        'UIReady':'onXDataUIReady',
        'Collapse':'onXDataCollapse',
        'YTagChartReset':'onXDataYTagChartReset'
    };
    pub.EVT=EVT;
    //数据类型切换
    p.dataType = {
        value:"1",
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.dataType._initEvts();
            });
        },
        _initEvts:function(){
            this.$items = $('#xdataType a').bind('click',function(e){
                p.dataType.$items.removeClass('on');
                this.className='on';
                J.$win.trigger(EVT.DataTypeChange,[this.rel]);
            });
        }
    };

    //概要图表
    p.keyChart = {
        dataType:1,
        dateType:'today',
        dateRange:'',
        isLoading:false,
        hasAjaxError:false,
        $tip:null,
        cacheKeyData:{},
        cacheClickData:{},
        keyData:null,
        clickData:null,
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.keyChart.onXDataUIReady();
            }).bind(EVT.DataTypeChange,function(e,t){
                p.keyChart.dataType=(t=parseInt(t));
                p.keyChart.render(t);
            });
        },
        onXDataUIReady:function(){
            p.keyChart.render(1);
            this.$tip = $('#xdataKeyChartTip');
            this.$tipBD=this.$tip.find('.xdata_keycharttip_bd');
            //刷新按钮
            $('#xdataRetweet1').bind('click',function(e){
                if(p.keyChart.isLoading){
                    return;
                };
                p.keyChart.loadData();
            });
        },
        getChartOption:function(dataType){
            dataType = parseInt(dataType);
            var rawData = J.data['CurrentKeyData'],
                niceData = this.parseData(rawData,dataType),
                baseOpts = {
                title: {
                    text: ' '
                },
                xAxis: {
                    type: 'datetime'//datetime
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true,
                    valueSuffix: ''
                },
                legend: {
                },
                series: [{
                    name: '点击量',
                    data: niceData,
                    zIndex: 1,
                    marker: {
                        fillColor: 'white',
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[dataType-1]
                    }
                }]
            };
            rawData.total.click_num=parseInt((rawData.total.click_num+'').replace(/,/gi,''));
            rawData.total.order_num=parseInt((rawData.total.order_num+'').replace(/,/gi,''));
            rawData.total.click_trans_rate = rawData.total.click_num==0?0:(rawData.total.order_num*100/rawData.total.click_num).toFixed(2);
            switch(dataType){
                case 1:
                    baseOpts.series[0].name='点击量';
                    baseOpts.title.text = '共'+rawData.total.click_num+'次';
                break;
                case 2:
                    baseOpts.series[0].name='下单量';
                    baseOpts.title.text = '共'+rawData.total.order_num+'单';
                break;
                case 3:
                    baseOpts.series[0].name='转化率';
                    baseOpts.title.text = '平均'+rawData.total.click_trans_rate+'%';
                break;
            };//switch
            return baseOpts;
        },
        render:function(dataType,updateChart){
            if(!this.$charts){
                this.$charts=$('#xdataKeyCharts').find('.xdata_keychart');
            }
            var $chart = this.$charts.removeClass('xdata_visible').eq(dataType-1).addClass('xdata_visible'),
                chartOpts = this.getChartOption(dataType);
            if(!$chart[0].getAttribute('data-hightcharts')){
                $chart.highcharts(chartOpts);
                $chart[0].setAttribute('data-hightcharts','1');
                return;
            };
            var dateRange0 = $chart[0].getAttribute('data-xdatadaterange'),
                forceUpdate = dateRange0!==this.dateRange;
            if(!updateChart && !forceUpdate){
                return;
            };
            $chart[0].setAttribute('data-xdatadaterange',this.dateRange);
            var chart = $chart.data('xdatachart');
            if(!chart){
                chart=$chart.highcharts();
                $chart.data('xdatachart',chart)
            }
            //console.log(chartOpts);
            chart.series[0].update(chartOpts.series[0]);
            chart.setTitle(chartOpts.title);
        },
        showTip:function(txt){
            if(txt===null){
                this.$tip.addClass('xdata_hidden');
                return;
            };
            txt = txt || '<span class="xdata_loading"></span>';
            txt = txt.indexOf('<span')==0?txt:('<span class="xdata_error">'+txt+'</span>');
            this.$tipBD.html(txt);
            this.$tip.removeClass('xdata_hidden');
        },
        loadData:function(){

            if(this.isLoading){
                J.data.abortKeyAndClickDataRequest();
                this.isLoading=false;
            }

            var me = this,
                dates=[],
                tempDate = null,
                sdate = document.getElementById('xdataKeyChartDate1').value,
                edate = document.getElementById('xdataKeyChartDate2').value,
                cacheId = [me.dataType,sdate,edate].join('-');

            this.dateRange = sdate+'-'+edate;

            if(sdate==''||edate==''){
                me.showTip('开始时间和结束时间不能为空!');
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

            if(dates.length>15){
                me.showTip('统计时间范围超过15天！服务器亚历山大...');
                return;
            }

            this.showTip();
            this.isLoading=true;
            this.hasAjaxError=false;
            this.clickData=null;
            this.keyData = null;
            //从cache取数据
            if(this.cacheKeyData[cacheId]){
                this.keyData=this.cacheKeyData[cacheId];
                this.clickData = this.cacheClickData[cacheId];
                me.showTip(null);
                me.isLoading=false;
                me.render(me.dataType,true);
                return;
            }
            //从服务器取数据
            this.getDataByDates(dates,function(err,d1,d2){
                me.isLoading=false;
                if(err){
                    me.hasAjaxError=true;
                    me.showTip('服务器错误：'+err.toString());
                    return;
                }
                me.cacheKeyData[cacheId]=d1;
                me.cacheClickData[cacheId]=d2;
                me.keyData=d1;
                me.clickData = d2;
                me.showTip(null);
                me.render(me.dataType,true);
            });
        },
        parseDataByHour:function(d,dataType){
            var len = d.length,
                r =[],
                dataByHour=null,
                tempClickNum=0,
                tempOrderNum=0,
                tempDate=null,
                hour=1,
                today=new Date(),
                yy=today.getFullYear(),
                mm=today.getMonth(),
                dd=today.getDate();
            for(var i=1;i<=len;i++){
                dataByHour=dataByHour||[new Date(yy,mm,dd,hour).getTime(),0];
                if(i%6===0){
                    if(dataType===3){
                        dataByHour[1]=tempClickNum>0?(tempOrderNum*100/tempClickNum).toFixed(2):0;
                        dataByHour[1] = parseFloat(dataByHour[1]);
                    };
                    r.push(dataByHour);
                    hour++;
                    dataByHour=null;
                    tempClickNum=0;
                    tempOrderNum=0;
                    continue;
                };
                switch(dataType){
                    case 1:
                        dataByHour[1]+=d[i].click_num;
                    break;
                    case 2:
                        dataByHour[1]+=d[i].order_num;
                    break;
                    case 3:
                        tempClickNum+=d[i].click_num;
                        tempOrderNum+=d[i].order_num;
                    break;
                };//switch
            };
            return r;
        },
        parseData:function(d,dataType){
            if(this.dateType=='today'){
                d = d.data.today;//144个点，说明是10分钟一个点，我们转换成一个小时一个点
                return this.parseDataByHour(d,dataType);
            };
            d = d.data;
            var len = d.length,
                r =[],
                dataByTime=null,
                tempDate = null;
            for(var i=0;i<len;i++){
                tempDate = new Date(d[i].s_date);
                dataByTime=[new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate()).getTime(),0];
                switch(dataType){
                    case 1:
                        dataByTime[1]=d[i].click_num;
                    break;
                    case 2:
                        dataByTime[1]=d[i].order_num;
                    break;
                    case 3://点击转化率
                        dataByTime[1]=d[i].click_num==0?0:parseFloat( (d[i].order_num*100/d[i].click_num).toFixed() );
                    break;
                };//switch
                r.push(dataByTime);
            };
            return r;
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
    //_ytag组-模块
    p.ytagGroup={
        tpl:J.heredoc(function(){/*
            {{#empty}}
            <div class="xdata_alert">无数据</div>
            {{/empty}}
            {{^empty}}
            <ul class="clearfix">
            {{#items}}
            <li><a id="xdataLnk{{id}}" href="javascript:;" data-ytag="{{_ytag}}" data-ytagattr="_ytag">{{selector}}</a></li>
            {{/items}}
            </ul>
            {{/empty}}
        */}),
        _init:function(){
            return;
            J.$win.bind(EVT.UIReady,function(e){
                p.ytagGroup.rockAndRoll();
            });
        },
        rockAndRoll:function(){
            this.$d = $('#xdataMods');
            this.$groups = $('[_ytag]');
            this.data=[];
            var tempObj = null;
            this.$groups.each(function(i,o){
                tempObj = {_ytag:o.getAttribute('_ytag')};
                tempObj.selector='[_ytag="'+tempObj._ytag+'"]';
                tempObj.id='_ytag'+tempObj._ytag;
                p.ytagGroup.data.push(tempObj);
            });
            this.render();

        },
        render:function(){
            this.$d[0].innerHTML = Mustache.to_html(this.tpl,{empty:(this.data.length==0),items:this.data});
        }
    };
    //主UI框架
    p.main={
        visible:true,
        autoHideTimer:null,
        $startUp:null,
        $ui:null,
        tpl0:'<div id="xdataBootup" class="xdata_bootup xdata_show"><strong class="xdata_c1">C</strong>lick<strong class="xdata_c2">S</strong>tream<span class="xdata_loading"></span></div>',
        _init:function(){
            J.$body.append(this.tpl0);
            if(location.href.indexOf('xdata')>-1){
                J.$body.addClass('xdata_admin');
            }
            this.$startUp = $('#xdataBootup');
            this._initEvts();
        },
        _initEvts:function(){
            J.$win.bind(J.data.EVT.InitKeyData,function(e,err,data){
                if(err){
                    p.main.showError(err);
                    return;
                }
            }).bind(J.data.EVT.InitClickData,function(e,err,data){
                if (err) {
                    p.main.showError(err);
                    return;
                };
                //这里主数据和点击数据已经拿到
                p.main.onDataReady();
            });
        },
        onDataReady:function(){
            this.$startUp.removeClass('xdata_show').onTransitioned(function(){
                p.main.render();
            });
        },
        render:function(){
            this.$startUp.onTransitioned(false);
            J.$body.append(coreTpl);
            this.$ui = $('#xdataWrap');
            this.$uiCore = $('#xdataUI');
            this.$tab = $('#xdataTab');
            this.$hd = $('#xdataUIHD');
            this.$rankList = this.$uiCore.find('.data_list');
            $('#xdataClose').bind('click',function(e){
                p.main[p.main.visible?'hide':'show'].call(p.main);
                return false;
            });
            //排行榜的切换
            $('#xdataRank .xdata_ranktype').bind('click',function(e){
                p.main.$rankList.addClass('xdata_hidden').filter('#xdataList'+this.value).removeClass('xdata_hidden');
            });
            //日期控件设置
            var today=new Date(),
                todayStr = today.toISOString().substring(0, 10);
            p.main.$ui.find('.xdata_date').attr('max',todayStr)
                .end()
                .find('.xdata_sdate').val(todayStr)
                .end()
                .find('.xdata_edate').val(todayStr)
                .end()
                .find('.xdata_sdate1').val(J.data.getDateTimeStr(new Date(),{len:10,dayDiff:-7}))
                .end()
                .bind('mouseenter',function(e){
                    clearTimeout(p.main.autoHideTimer);
                })/*.bind('mouseleave',function(e){
                    p.main.autoHide();
                })*/;
            //autohide after UIReady
            this.autoHide();
            this.$ui.onTransitioned(function(){
                if(p.main.visible){
                    p.main.fixedHD();
                }
            });
            J.$win.trigger(EVT.UIReady);
        },
        fixedHD:function(){
            this.$hd.addClass('xdata_fixed');
        },
        unfixedHD:function(){
            this.$hd.removeClass('xdata_fixed');
        },
        showError:function(txt){
            this.$startUp.html('<span class="xdata_err">'+txt.toString()+'</span>');
        },
        show:function(){
            this.$ui.removeClass('xdata_wrap_hide');
            this.visible=true;
        },
        hide:function(){
            this.unfixedHD();
            this.$ui.addClass('xdata_wrap_hide');
            this.visible=false;
            J.$win.trigger(EVT.Collapse);
        },
        autoHide:function(){
            clearTimeout(this.autoHideTimer);
            this.autoHideTimer = setTimeout(function(){
                p.main.hide();
            },2500);
        }
    };
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
            J.$win.bind(EVT.UIReady,function(e){
                p.rank.render(1);
            }).bind(EVT.DataTypeChange,function(e,t){
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
                $obj[0].innerHTML = Mustache.to_html(this.tpl, this.getData(dataType));
                $obj[0].setAttribute('data-xdata','1');
                return;
            };
            if(forceUpdate||(p.rank.dataChangedAt!=dataType)){
                $obj[0].innerHTML = Mustache.to_html(this.tpl, this.getData(dataType));
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
    //自定义单元排行榜
    p.rank2 = {
        $d:null,
        dataType:1,
        dataChangedAt:1,
        dataInited:false,
        tpl:J.heredoc(function(){/*
            {{#empty}}
            <div class="xdata_alert">无数据</div>
            {{/empty}}
            {{#items}}
            <div id="xdataCTag{{id}}" class="data_list_item{{cl1}}">
                <div class="data_list_entry">
                    <a id="xdataLnkCTag{{id}}" href="javascript:;" data-ytag="{{ytagSelector}}" data-ytagattr="ctag" class="data_list_lk">{{alias}}<span>{{val}}</span></a>
                    <div class="data_list_control">
                        <a href="javascript:;" class="data_btn_edit" rel="{{id}}">编辑</a>
                        <a href="javascript:;" class="data_btn_more">展开/收起</a>
                    </div>
                </div>
            </div>
            {{/items}}
        */}),
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.rank2.$d = $('#xdataList1');
                p.rank2.reload();
            }).bind(EVT.DataTypeChange,function(e,t){
                p.rank2.dataType = parseInt(t);
                p.rank2.reload();
            }).bind(J.data.EVT.CTagUpdated,function(e,opType,d){
                p.rank2.onCTagUpdated(opType,d);
            }).bind(J.data.EVT.ClickDataChange,function(e,d){
                p.rank2.dataChangedAt=p.rank2.dataType;
                p.rank2.reload();
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
        parseData:function(items){

            items = items||[];

            var len = items.length,
                tempItem = null,
                cItems = [],
                ytagLen = 0;
            for(var i=0;i<len;i++){
                tempItem = items[i];
                tempItem.id = tempItem.isCustomYTag?tempItem.id:tempItem.ytagSelector;
                tempItem.ytags = [];
                tempItem.click_num=0;
                tempItem.order_num=0;
                tempItem.click_trans_rate=0;
                tempItem.cl1="";
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
            this.$d.prepend(Mustache.to_html(this.tpl,{
                    empty:(cItems.length==0),
                    items:cItems
                }));
        },
        reload:function(){
            this.getData(function(d){
                d = p.rank2.parseData(d);
                p.rank2.render(d);
                if(!p.rank2.dataInited){
                    $('#xdataLoading2').remove();
                    p.rank2.dataInited=true;
                }
            });
        }
    };
    //ytag editor
    p.ytagEditor = {
        $d:null,
        $name:null,
        $value:null,
        $trigger:null,
        tagData:null,
        isVisible:false,
        isCustomYTag:false,
        tipTimer:null,
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.ytagEditor.$d = $('#xdataPop2');
                p.ytagEditor.$name = $('#xdataPop2Ipt1');
                p.ytagEditor.$value = $('#xdataPop2Ipt2');
                p.ytagEditor.$tip = $('#xdataPop2Tip');
                //update
                $('#xdataPop2Btn1').bind('click',function(e){
                    var isOk = p.ytagEditor.save(this.rel);
                    if(isOk){
                        p.ytagEditor.hide();
                    }
                });
                //delete
                $('#xdataPop2Btn2').bind('click',function(e){
                    p.ytagEditor.delete(this.rel);
                    p.ytagEditor.hide();
                });

                //add new
                $('#xdataAddCTag').bind('click',function(e){
                    p.ytagEditor.show({
                        id:'',
                        alias:'',
                        ytagSelector:''
                    },$(this),true);
                });

                $('#xdataPop2Close').bind('click',function(e){
                    p.ytagEditor.hide();
                });

            }).bind(EVT.Collapse,function(e){
                p.ytagEditor.hide();
            }).bind('resize.ytagEditor',function(e){
                p.ytagEditor.updatePosition();
            });

            $('.data_btn_edit').live('click',function(e){
                //tagData,$trigger,isCustomYTag
                var $trigger = $(this).parents('.data_list_entry'),
                    isCustomYTag = $trigger.find('.data_list_lk')[0].getAttribute('data-ytagattr')=='ctag';
                p.ytagEditor.show(J.data.getCTag(this.rel),$trigger,isCustomYTag);
                return false;
            });

        },
        showTip:function(txt,duration){
            clearTimeout(this.tipTimer);
            if(!txt){
                this.$tip.addClass('xdata_hidden');
                return;
            };
            this.$tip.removeClass('xdata_hidden');
            this.$tip.html('<span class="xdata_error">'+txt+'</span>');
            if(duration){
                this.tipTimer = setTimeout(function(){
                    p.ytagEditor.showTip(null);
                },duration);
            }
        },
        delete:function(id){
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
                this.showTip('模块名称和ytag选择器均不能为空！',3000);
                return false;
            };
            var $tempDom = null;
            //获取关联的ytag
            if(d.ytagSelector.indexOf('.')!=-1 || d.ytagSelector.indexOf('#')!=-1){
                //css选择器
                $tempDom = $(d.ytagSelector);
                if($tempDom.length===0){
                    this.showTip('ytag选择器必须是有效的css选择器，或则是以|分隔的有效的ytag id！',3000);
                    return false;
                };
                J.data.saveCTag(d);
                return true;
            };
            //ytag id，|分隔
            if( d.ytagSelector.indexOf('|')==-1 && (!/^[0-9]+$/.test(d.ytagSelector)) ){
                this.showTip('ytag选择器必须是有效的css选择器，或则是以|分隔的有效的ytag id！',3000);
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
                this.showTip('ytag选择器必须是有效的css选择器，或则是以|分隔的有效的ytag id！',3000);
                return false;
            };
            d.type=2;
            J.data.saveCTag(d);
            return true;
        },
        show:function(tagData,$trigger,isCustomYTag){

            if(this.$trigger){
                this.$trigger.removeClass('on');
            }

            this.isCustomYTag = isCustomYTag||false;
            this.tagData=tagData;
            this.$trigger=$trigger.addClass('on');
            this.$d.removeClass('xdata_hidden');
            this.isVisible=true;
            this.updatePosition();
            this.loadData(tagData);
        },
        hide:function(){
            this.$d.addClass('xdata_hidden');
            this.$name[0].value = '';
            this.$value[0].value = '';
            this.isVisible=false;
        },
        updatePosition:function(){
            if(!this.isVisible){
                return;
            };
            var bottom = 0,
                $trigger = this.$trigger;
            if($trigger){
                bottom = J.$win.height()-($trigger.offset().top-p.main.$ui.offset().top)-29/* 箭头的位置 */-$trigger.outerHeight()/2;
            }
            this.$d.css({
                bottom:bottom
            });
        },
        loadData:function(tagData){
            this.$name[0].value = tagData.alias;
            this.$value[0].value = tagData.ytagSelector;
            document.getElementById('xdataPop2Btn1').rel = document.getElementById('xdataPop2Btn2').rel = tagData.id;
            if(tagData.readonly){
                this.$d.addClass('xdata_readonly');
            }else{
                this.$d.removeClass('xdata_readonly');
            }
        }
    };
    //ytag chart
    p.ytagChart = {
        $d:null,
        $tip:null,
        $chart:null,
        $trigger:null,
        chart:null,
        isLoading:false,
        isVisible:false,
        hasAjaxError:false,
        data:[],
        tagData:null,
        cache:{},//data cache
        dataType:1,
        jqXHR:null,
        _init:function(){
            J.$win.bind(EVT.UIReady,function(e){
                p.ytagChart.$d = $('#xdataPop1');
                p.ytagChart.$chart = $('#xdataYTagChart');
                p.ytagChart.$tip = $('#xdataYTagChartTip');
                //UICOre的scroll事件
                p.main.$uiCore.bind('scroll.ytagChart',function(e){
                    p.ytagChart.updatePosition();
                });
                //刷新按钮
                $('#xdataRetweet2').bind('click',function(e){
                    if(p.ytagChart.isLoading){
                        return;
                    };
                    p.ytagChart.loadData(p.ytagChart.tagData);
                });
                //滚动条
                $('.xdata_rank,.xdata_mods').bind('scroll.ytagChart',function(e){
                    p.ytagChart.reset();
                });
                //排行榜的切换
                $('#xdataRank .xdata_ranktype').bind('click.ytagChart',function(e){
                    p.ytagChart.reset();
                });
                $('#xdataPop1Close').bind('click',function(e){
                    p.ytagChart.reset();
                });

            }).bind(EVT.DataTypeChange,function(e,t){
                p.ytagChart.dataType=parseInt(t);
                p.ytagChart.reset();
            }).bind('resize.ytagChart',function(e){
                p.ytagChart.updatePosition();
            }).bind(J.data.EVT.CTagUpdated,function(e,opType,d){
                p.ytagChart.onCTagUpdated(opType,d);
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
            J.$win.trigger(EVT.YTagChartReset);
        },
        show:function(tagData,$trigger){
            this.tagData=tagData;
            this.$trigger=$trigger;
            this.$d.removeClass('xdata_hidden');
            this.isVisible=true;
            this.updatePosition();
            this.loadData(tagData);
        },
        hide:function(){
            this.$d.addClass('xdata_hidden');
            this.isVisible=false;
        },
        updatePosition:function(){
            if(!this.isVisible){
                return;
            };
            var bottom = 0,
                $trigger = this.$trigger;
            if($trigger){
                bottom = J.$win.height()-($trigger.offset().top-p.main.$ui.offset().top)-29/* 箭头的位置 */-$trigger.outerHeight()/2;
            }
            this.$d.css({
                bottom:bottom
            });
        },
        showTip:function(txt){
            if(txt===null){
                this.$tip.addClass('xdata_hidden');
                this.$chart.removeClass('xdata_hidden');
                return;
            };
            txt = txt || '<img class="xdata_loading1" src="http://static.gtimg.com/icson/img/common/loading.gif"/>';
            this.$tip.html(txt).removeClass('xdata_hidden');
            this.$chart.addClass('xdata_hidden');
        },
        loadData:function(tagData){

            if(this.isLoading&&this.jqXHR&& this.jqXHR.readyState != 4){
                this.jqXHR.abort();
                this.isLoading=false;
            }

            var me = this,
                dates=[],
                tempDate = null,
                sdate = document.getElementById('xdataPop1Date1').value,
                edate = document.getElementById('xdataPop1Date2').value,
                cacheId = [me.dataType,tagData.ytags.join('-'),sdate,edate].join('-');

            if(sdate==''||edate==''){
                me.showTip('开始时间和结束时间不能为空！');
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

            if(dates.length>15){
                me.showTip('统计时间范围超过15天！服务器亚历山大...');
                return;
            }

            this.showTip();
            this.isLoading=true;
            this.hasAjaxError=false;
            
            this.data=[];
            //从cache取数据
            if(this.cache[cacheId]){
                this.data=this.cache[cacheId];
                me.showTip(null);
                me.isLoading=false;
                me.render(this.data);
                return;
            }
            //从服务器取数据
            //TODO:需要开发提供一个取多天数据的接口
            this.getDataByDates(tagData.ytags,dates,function(err,d){
                me.isLoading=false;
                me.jqXHR=null;
                if(err){
                    me.showTip('<div class="xdata_error">服务器错误：'+err.toString()+'</div>');
                    return;
                }
                me.cache[cacheId]=d;
                me.showTip(null);
                me.render(d);
            });
        },
        parseData:function(d,dataType){
            var len = d.length,
                r =[],
                dataByTime=null;
            for(var i=0;i<len;i++){
                dataByTime=[d[i].t,0];
                switch(dataType){
                    case 1:
                        dataByTime[1]=d[i].d.status===true?d[i].d.data.data[0].click_num:0;
                    break;
                    case 2:
                        dataByTime[1]=d[i].d.status===true?d[i].d.data.data[0].order_num:0;
                    break;
                    case 3:
                        dataByTime[1]=d[i].d.status===true?parseFloat(d[i].d.data.data[0].click_trans_rate):0;
                    break;
                };//switch
                r.push(dataByTime);
            };
            return r;
        },
        getChartOption:function(rawData,dataType){
            dataType = parseInt(dataType);
            var niceData = this.parseData(rawData,dataType),
                baseOpts = {
                chart:{
                    width:540
                },
                title: {
                    text: ' '
                },
                xAxis: {
                    type: 'datetime'//datetime
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true,
                    valueSuffix: ''
                },
                legend: {
                },
                series: [{
                    name: '点击量',
                    data: niceData,
                    zIndex: 1,
                    marker: {
                        fillColor: 'white',
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[dataType-1]
                    }
                }]
            };
            switch(dataType){
                case 1:
                break;
                case 2:
                    baseOpts.series[0].name='下单量';
                break;
                case 3:
                    baseOpts.series[0].name='转化率';
                break;
            };//switch
            return baseOpts;
        },
        render:function(data){
            //this.$chart.find('.xdata_loading1').remove();
            var chartOpts = this.getChartOption(data,this.dataType);
            if(!this.chart){
                this.$chart.highcharts(chartOpts);
                this.chart=this.$chart.highcharts();
                return;
            };
            this.chart.series[0].update(chartOpts.series[0]);
        },
        getDataByDates:function(tagids,dates,cbk){
            if(dates.length==0){
                cbk(null,this.data);
                return;
            };
            var date = dates.splice(0,1)[0],
                timeStamp = date.getTime(),
                sdate = J.data.getDateTimeStr(date),
                edate = sdate,
                _params = {
                    date_type:'custom',
                    start_date:sdate,
                    end_date:edate,
                    page_tag_ids:tagids.join(',')
                },
                me = this;

            this.jqXHR=J.data.getRangeClickData(_params,function(err,d){
                if(err){
                    me.hasAjaxError=true;
                    cbk(err);
                    return;
                }
                me.data.push({
                    t:timeStamp,
                    d:d
                });
                //递归
                me.getDataByDates(tagids,dates,cbk);
            });
        }
    };
    pub.showYTagChart = function(tagData,$trigger){
        p.ytagChart.show(tagData,$trigger);
    };
});
/* E CoreUI */

/* S YTAG */
J(function($,p,pub){
    pub.id="ytag";
    var cache = {},
    $ytags;
    p.main = {
        coverTpl:J.heredoc(function(){/*
            <div id="xdataCover{{id}}" class="xdata_tagcover">
                <div class="xdata_tagcover_bg"></div>
                <div class="xdata_tagcover_bd">{{coverTip}}</div>
            </div>
        */}),
        covers:{},
        $ytagTrigger:null,
        hideCovers:function(){
            for(var c in this.covers){
                this.covers[c].addClass('xdata_hidden');
            }
        },
        //将单个ytag或_ytag添加到缓存中
        addToCache:function($o,attrName){
            if($o.length===0){
                return null;
            }
            attrName = attrName||'ytag';
            var $parent = $o.parent(),
                off = $o.offset(),
                ytag = $o[0].getAttribute(attrName),
                data = {
                    id:(attrName+ytag),
                    ytagAttr:attrName,
                    ytagid:ytag,
                    $dom:$o,
                    title:$.trim($o[0].title),
                    text:$.trim($o.text()),
                    href:$o[0].href,
                    selector:('[$="'+ytag+'"]').replace('$',attrName)
                };
            $.extend(data,J.data.getItemDimension($o)||{});
            data.text=data.text.length===0?(data.title.length===0?'[!!无标题!!]':data.title):data.text;
            data.ytags=this.getRelatedYTags($o,ytag,attrName);
            cache[data.id] = data;
            return data;
        },
        //将自定义的单元添加到缓存
        addCTagToCache:function(ctag){
            var isCustomTagWithCssSelector = (ctag.indexOf('#')!=-1 || ctag.indexOf('.')!=-1),
                cssSelectors = [],
                cssSelectors1 = [],
                len=0,
                ctagid = this.getCacheKey(ctag,'ctag'),
                data = {
                    id:ctagid,
                    selector:''
                };

            if(isCustomTagWithCssSelector){
                cssSelectors = ctag.split(',');
                len = cssSelectors.length;
                data.selector = ctag;
            }else{
                cssSelectors = ctag.split('|');
                len = cssSelectors.length;
                for(var i =0;i<len;i++){
                    cssSelectors1.push('[ytag="'+cssSelectors[i]+'"]');
                };
                data.selector = cssSelectors1.join(',');
            }
            data.$dom = $(data.selector);//NOTE:发现ytag用的很滥，同一个ytag用在多个链接上
            data.ytags=this.getRelatedYTags(data.$dom,ctag,'ctag',isCustomTagWithCssSelector);
            data.isCustom=true;
            data.top = (data.$dom.offset()||{top:0}).top;

            //获取每个元素的位置、高宽信息
            data.$dom.each(function(i,o){
                o = $(o);
                o.data('xdatadim',J.data.getItemDimension(o));
            });

            cache[data.id] = data;
            return data;
        },
        getRelatedYTags:function($tag,ytag,attrName,isCustomTagWithCssSelector){
            var tags = [],
                isCustomTag = (attrName==='ctag'),
                tempCache={};
            if (attrName==='_ytag') {
                $tag.find('[ytag]').each(function(i1,o1){
                    o1 = o1.getAttribute('ytag');
                    if(!tempCache[o1]){
                        tags.push(o1);
                        tempCache[o1]=true;
                    }
                    
                });
                return tags;
            };
            if(!isCustomTag){
                tags.push(ytag);
                return tags;
            };

            if(!isCustomTagWithCssSelector){
                tags = tags.concat(ytag.split('|'));
                return tags;
            };

            $tag.find('[ytag]').each(function(i1,o1){
                o1 = o1.getAttribute('ytag');
                if(!tempCache[o1]){
                    tags.push(o1);
                    tempCache[o1]=true;
                }
            });
            $tag.each(function(i1,o1){
                o1 = o1.getAttribute('ytag');
                if( o1 && (!tempCache[o1]) ){
                    tags.push(o1);
                    tempCache[o1]=true;
                }
            });
            return tags;
        },
        _init:function(){
            J.$win.bind(J.ui.EVT.YTagChartReset,function(e){
                p.main.reset();
            });
            $('[data-ytag]').live('click',function(e){
                p.main.onClickYTagTrigger(this);
            });
            $ytags = $('[ytag]');
            pub.rockAndRollAll();
        },
        reset:function(t){
            var clOn = 'on';
            if(this.$ytagTrigger){
                this.$ytagTrigger.removeClass(clOn);
            }
            this.$ytagTrigger=null;
            this.hideCovers();
        },
        onClickYTagTrigger:function(elmTrigger){
            var clOn = 'on';
            if(this.$ytagTrigger){
                if(this.$ytagTrigger[0].id===elmTrigger.id){
                    return;
                };
                this.$ytagTrigger.removeClass(clOn);
            }
            this.$ytagTrigger = $(elmTrigger).addClass(clOn);

            var ytagData = J.ytag.get(elmTrigger.getAttribute('data-ytag'),elmTrigger.getAttribute('data-ytagattr'));

            $('body').stop().animate({
                scrollTop:ytagData.top
            },'fast',function(){
                p.main.showCover(ytagData);
                J.ui.showYTagChart(ytagData,p.main.$ytagTrigger);
            });
        },
        _showCover:function(id,dim,hideOthers){
            if(hideOthers){
                this.hideCovers();
            }
            var coverId = '#xdataCover'+id,
                $cover= $(coverId),
                cssProps={
                    position:'fixed',
                    top:0,
                    left:0,
                    right:401,
                    width:'auto',
                    height:'auto',
                    color:'red'
                },
                isHidden = dim.isHidden;
            var coverTip = dim.selector+(isHidden?',当前处于隐藏状态...':'');

            if($cover.length===1){
                $cover.removeClass('xdata_hidden');
                if(isHidden){
                    $cover.css(cssProps).find('.xdata_tagcover_bd').html(coverTip);
                }
                this.covers[id]=$cover;
                return;
            };
            J.$body.append(Mustache.to_html(this.coverTpl,{id:id,coverTip:coverTip}));
            cssProps = isHidden?cssProps:dim;
            this.covers[id] = $(coverId).css(cssProps);
        },
        showCover:function(tagData){
            if(tagData.isCustom){
                this.showCTagCover(tagData);
                return;
            };

            var coverDim = {
                top:tagData.top,
                left:tagData.left,
                width:(tagData.width>tagData.parentWidth?tagData.parentWidth:tagData.width),
                height:(tagData.height>tagData.parentHeight?tagData.parentHeight:tagData.height),
                isHidden:tagData.$dom.is(':hidden'),
                selector:tagData.selector
            };
            if(coverDim.isHidden){
                pub.removeFromCache(tagData.id);
            }
            this._showCover(tagData.id,coverDim,true);
        },
        showCTagCover:function(tagData){
            this.hideCovers();
            if(tagData.$dom.length==0){
                return;
            };
            var coverDim = null;
            tagData.$dom.each(function(i,o){
                o = $(o);
                coverDim = o.data('xdatadim');
                coverDim.isHidden = o.is(':hidden');
                coverDim.selector = o[0].id||o[0].className||(tagData.id+i);
                p.main._showCover(p.main.getCacheKey(coverDim.selector,'ctag'),coverDim);
            });
        },
        getCacheKey:function(ytag,attrName){
            var isCTag = attrName==='ctag';
            if(!isCTag){
                return (attrName+ytag);
            }
            //将“#,.|空格”全部换成-
            var ctagid = ytag.replace(/[#,\.\| +?]/gi,'-');
            return (attrName+ctagid);
        }
    };
    //caculate all ytag's data
    pub.rockAndRollAll=function(){
        $ytags.each(function(i,o){
            p.main.addToCache($(o));
        });
    };
    //get ytag's data
    pub.get = function(ytag,attrName){
        attrName = attrName||'ytag';
        var isCTag = attrName==='ctag',
            key = p.main.getCacheKey(ytag,attrName),
            data = null;

        if( (data=cache[key]) ){
            return data;
        }
        data = isCTag?p.main.addCTagToCache(ytag):p.main.addToCache($( ('[$="'+ytag+'"]').replace('$',attrName) ),attrName);
        return data;
    };

    pub.reset = function(){
        p.main.reset();
    };

    pub.removeFromCache=function(id){
        cache[id]=null;
    };
});
/* E YTAG */

/* S 热区 */
J(function($,p,pub){
    pub.id="heatmap";
    var $body = J.$body;
    //heatmap
    p.heatmap = {
        isRender:false,
        instance:null,
        _init:function(){
            J.$win.bind(J.ui.EVT.UIReady,function(e){
                $('#xdataBtnHeatmap').bind('click',function(e){
                    if(!p.heatmap.isRender){
                        p.heatmap.render();
                    }
                    p.heatmap.toggleDisplay();
                });
            });
        },
        toggleDisplay:function(){
            this.instance&&this.instance.toggleDisplay();
        },
        fixPosition:function(){
            var offset = $(this.instance.target).offset(),
                canvasObj = this.instance.get('canvas');
            canvasObj.style.left=offset.left+'px';
            canvasObj.style.top=offset.top+'px';
        },
        getData:function(){

            //max-坐标的最大点击数
            //data-坐标点击数据。
            //data.x - x坐标值
            //data.y - y坐标值
            //data.count - 该坐标的点击数总和

            //注意：由于屏幕分辨率的影响，坐标的x/y必须是相对于主体内容的值
            //例如：首页首屏的点击坐标值应该是相对于grid_c1的

            var d={
                max: 90, 
                data: [
                {x: 100, y: 100, count: 80},
                {x: 120, y: 120, count: 60},
                {x: 100, y: 80, count: 90},
                {x: 111, y: 110, count: 60},
                {x: 201, y: 150, count: 90},
                {x: 311, y: 110, count: 60},
                {x: 121, y: 510, count: 70},
                {x: 511, y: 110, count: 60},
                {x: 211, y: 110, count: 50},
                {x: 191, y: 110, count: 20},
                {x: 511, y: 110, count: 40}
            ]};

            var rdCnt = 1000,
                maxX = 1190,
                maxY = 2000,
                maxCnt=100;

            d.max = maxCnt;

            for(var i=0;i<rdCnt;i++){
                d.data.push({
                    x:Math.floor(Math.random()*maxX+1),
                    y:Math.floor(Math.random()*maxY+1),
                    count:Math.floor(Math.random()*maxCnt+1)
                });
            }
            return d;
        },
        render:function(){
            //cfg
            //由于用户屏幕大小差异，element元素必须是相对于主体内容容器
            var target = $('.ic_content .grid_c1')[0];
            var cfg = {
                "element":target, 
                "radius":25, 
                "visible":false
            };
            //heatmap
            var hm1 = h337.create(cfg);
            hm1.get("canvas").onclick = function(ev){
                var pos = h337.util.mousePosition(ev);
                hm1.store.addDataPoint(pos[0],pos[1]);
            };
            hm1.target=target;
            //demo data
            var data = this.getData();
            // call the heatmap's store's setDataSet method in order to set static data
            hm1.store.setDataSet(data);
            this.isRender=true;
            this.instance=hm1;
            //position fix
            this.fixPosition();
        }
    };

});
/* E 热区 */

/* S 模块运营数据 */
J(function($,p,pub){
    pub.id="xdata_mods";
    var $body = $('body');
    //mods
    p.mods={
        isRender:false,
        _init:function(){
            $body.bind('onXDataMenuClick',function(e,d){
                if(d.rel=="2"){
                    if(!p.mods.isRender){
                        p.mods.render();
                    }
                    p.mods.toggleDisplay();
                }
            });
        },
        render:function(){
            alert('todo by joy');
            
        },
        toggleDisplay:function(){

        }
    };
});
/* E 模块运营数据 */

J.init();
J.data.init();