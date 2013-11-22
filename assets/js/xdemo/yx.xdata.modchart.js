J(function($,p,pub){
    pub.id="modchart";
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

            J.$win.bind(J.ui.EVT.DataTypeChange,function(e,t){
                p.modChart.dataType=parseInt(t);
                p.modChart.refresh();
            }).bind(J.data.EVT.CTagUpdated,function(e,opType,d){
                p.modChart.onCTagUpdated(opType,d);
            }).bind(J.ui.EVT.Collapse,function(e){
                p.modChart.reset();
            }).bind(J.ui.EVT.UIReady,function(e){
                p.modChart.onCoreUIReady();
            });
        },
        onCoreUIReady:function(){
            p.modChart.$d = $('#dataPop1').oxi18n();
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
                    J.$win.trigger(J.ui.EVT.DataTypeChange,[this.value]);
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
            J.$win.trigger(J.ui.EVT.ModChartReset);
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
            this.$d.addClass('data_pop1_on');
            J.$html.addClass('data_display');
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
            this.$d.removeClass('data_pop1_on');
            this.isVisible=false;
            J.$html.removeClass('data_display');
            J.$win.trigger(J.ui.EVT.ModChartHidden);
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
                //TODO:DragClickData接口增加uv,pv字段
                pv = J.data.CurrentKeyData.total.pv,
                uv = J.data.CurrentKeyData.total.uv||0,
                rateByPv = 0,
                rateByUv = 0,
                valToday = 0;
            for(var i=0;i<len;i++){
                dataByTime={
                    t:d[i].t,
                    x:d[i].t,
                    y:0,
                    date:J.data.getDateTimeStr(new Date(d[i].t),{len:10}),
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
                    me.data[dateKey].push(tempItem);
                };
                //递归
                me.getDataByDates(tagids,dates,dateKey,cbk,maxDateCountPerTime);
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
                    <th><span data-i18n="chart2.transRateByClick">每点击转化率</span>(ON/CN)</th>
                    <th>{{lblDataPerPV}}</th>
                    <!--<th>{{lblDataPerUV}}</th>-->
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
                        <td>{{rateByPv}}%</td>
                        <!--<td>{{rateByUv}}%</td>-->
                    </tr>
                    {{/childRow}}
                    {{^childRow}}
                    <tr>
                        <td rowspan="{{rowspan}}" class="data_cell_num">{{sn}}</td>
                        <td>{{date}}</td>
                        <td>{{click_num}}</td>
                        <td>{{order_num}}</td>
                        <td>{{click_trans_rate}}%</td>
                        <td>{{rateByPv}}%</td>
                        <!--<td>{{rateByUv}}%</td>-->
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
                    <!--<td>&nbsp;</td>-->
                </tr>
                {{#total}}
                <tr class="data_detail_sum">
                    <td class="hl">{{dateRange}}</td>
                    <td>{{click}}</td>
                    <td>{{order}}</td>
                    <td>{{transRate}}%</td>
                    <td>{{valueByPV}}%</td>
                    <!--<td>{{valueByUV}}%</td>-->
                </tr>
                {{/total}}
            </tfoot>
        </table>
        */}),
        _init:function(){
            J.$win.bind(J.ui.EVT.DataTypeChange,function(e,t){
                p.detail.dataType = parseInt(t);
                p.detail.onDataTypeChange(p.detail.dataType);
            }).bind(J.ui.EVT.UIReady,function(e){
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
                valueByUV:0
            },
            total2={
                click:0,
                order:0,
                transRate:0,
                valueByPV:0,
                valueByUV:0
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
                if(tempItem1){
                    data.items.push(tempItem1);
                    total2.click+=tempItem1.click_num;
                    total2.order+=tempItem1.order_num;
                    total2.transRate+=tempItem1.click_trans_rate;
                    total2.valueByPV+=tempItem1.rateByPv;
                    total2.valueByUV+=tempItem1.rateByUv;
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


    pub.show = function(tagData,$trigger,dataType){
        p.modChart.show(tagData,$trigger,dataType);
    };

    pub.isVisible = function(){
        return p.modChart.isVisible;
    };

    pub.getChartOption = function(){
        return p.modChart.chartOpts;
    };

});