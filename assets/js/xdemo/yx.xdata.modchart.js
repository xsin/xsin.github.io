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
            }).bind('resize.modChart',function(e){
                //p.modChart.updatePosition();
            }).bind(J.data.EVT.CTagUpdated,function(e,opType,d){
                p.modChart.onCTagUpdated(opType,d);
            }).bind(J.ui.EVT.Collapse,function(e){
                p.modChart.reset();
            }).bind(J.ui.EVT.UIReady,function(e){
                p.modChart.onCoreUIReady();
            });
        },
        onCoreUIReady:function(){
            p.modChart.$d = $('#xdataPop1').oxi18n();
            p.modChart.$chart = $('#xdataModChart');
            p.modChart.$tip = $('#xdataModChartTip');
            //make the popup draggable
            //new Draggabilly(p.modChart.$d[0]);
            //刷新按钮
            $('#xdataRetweet2').bind('click',function(e){
                if(p.modChart.isLoading){
                    return;
                };
                p.modChart.loadData(p.modChart.tagData);
            });
            //数据类型切换
            $('#xdataTypes .xdata_type').bind('click.modChart',function(e,noTriggerDataTypeEvent){
                if(this.value==(p.modChart.dataType+'')) return;
                if (!noTriggerDataTypeEvent) {
                    J.$win.trigger(J.ui.EVT.DataTypeChange,[this.value]);
                };
                
            });
            //滚动条
            $('.xdata_rank,.xdata_mods').bind('scroll.modChart',function(e){
                p.modChart.reset();
            });
            $('#xdataPop1Close').bind('click',function(e){
                p.modChart.reset();
            });
            //打版本
            p.modChart.$btnTag = $('#xdataTag1');
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
            $('#xdataTypeForMod'+t).trigger('click.modChart',[true]);
        },
        show:function(tagData,$trigger,dataTypeForPage){
            this.tagData=tagData;
            this.todayData = J.modrank.getTodayDataById(tagData.id);
            this.$trigger=$trigger;
            this.$d.addClass('data_pop1_on');
            this.isVisible=true;
            this.renderMenu();

            this.setDataType(dataTypeForPage);

            this.refresh();
            //设置截屏信息
            var tagInfo = J.ytag.get(this.tagData.id),
                dimInfo = tagInfo.$dom.data('xdatadim'),
                ytagData = [],
                len = tagInfo.ytags.length,
                ytagDimData = null;

            for(var i =0;i<len;i++){
                ytagDimData = J.data.getItemDimension($('[ytag="$"]'.replace('$',tagInfo.ytags[i].page_tag)));
                ytagDimData = $.extend(ytagDimData,tagInfo.ytags[i]);
                ytagDimData.x = ytagDimData.left - dimInfo.left;
                ytagDimData.y = ytagDimData.top - dimInfo.top;
                ytagData.push(ytagDimData);
            };

            this.$btnTag.attr('data-x',dimInfo.left)
                .attr('data-y',dimInfo.top)
                .attr('data-width',dimInfo.width)
                .attr('data-height',dimInfo.height)
                .attr('data-version_name',tagInfo.alias+'-'+new Date().getTime())
                .attr('data-mod_name',tagInfo.selector)
                .attr('data-version_mod_wsid',J.data.bizInfo.wsid)
                .attr('data-version_mod_areaid',J.data.bizInfo.areaid)
                .attr('data-version_mod_pageid',J.data.bizInfo.pid)
                .attr('data-version_mod_id',tagInfo.id)
                .attr('data-version_mod_ytag',JSON.stringify(ytagData));

            var lkHis = document.getElementById('xdataLkTagList');
            lkHis.href=lkHis.getAttribute('data-href')+'?'+
                $.param({
                    wsid:J.data.bizInfo.wsid,
                    areaid:J.data.bizInfo.areaid,
                    pageid:J.data.bizInfo.pid,
                    modid:tagInfo.id
                });
        },
        refresh:function(){
            this.loadData(this.tagData);
        },
        hide:function(){
            this.$d.removeClass('data_pop1_on');
            this.isVisible=false;
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
                this.$tip.addClass('xdata_hidden');
                this.$chart.removeClass('xdata_hidden');
                return;
            };
            txt = txt || '<img class="xdata_loading1" src="http://static.gtimg.com/icson/img/common/loading.gif"/>';
            this.$tip.html(txt).removeClass('xdata_hidden');
            this.$chart.addClass('xdata_hidden');
        },
        loadData:function(tagData){
            var dates = [],
                datesCache = {},
                sdate = document.getElementById('xdataPop1Date1').value,
                edate = document.getElementById('xdataPop1Date2').value,
                dateRange1 = this.validateDateRange(sdate,edate);

            p.modCompare.updateDateRange0(sdate,edate);

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
                    //me.showTip('<div class="xdata_error">'+i18n.t('ajax.serverError')+err.toString()+'</div>');
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
                pv = J.data.CurrentKeyData.total.pv,
                rateByPv = 0,
                valToday = 0;
            for(var i=0;i<len;i++){
                dataByTime={
                    x:d[i].t,
                    y:0,
                    rateByPv:0,
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

                r.push(dataByTime);
            };
            return r;
        },
        getChartSerie:function(rawData,dateKey,dataType){
            var niceData = this.parseData(rawData,dateKey,dataType),
                len = niceData.length,
                serieSubTitle = rawData[0].s_date+'~'+( rawData[len-1].s_date||J.data.getDateTimeStr(new Date(),{len:10}) ),
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
                totalValClickNum+=niceData[i].click_num;
                totalValOrderNum+=niceData[i].order_num;
                totalValCORate+=niceData[i].click_trans_rate;
            };
            avgVal = parseFloat(len==0?0:(totalVal/len).toFixed(2));
            avgValClickNum = parseFloat(len==0?0:(totalValClickNum/len).toFixed(2));
            avgValOrderNum = parseFloat(len==0?0:(totalValOrderNum/len).toFixed(2));
            avgValCORate = parseFloat(len==0?0:(totalValCORate/len).toFixed(2));
            for(var i =0;i<len;i++){
                niceData1.push({x:niceData[i].x,y:avgVal});
            };

            //每pv比率
            var niceData2 = [];
            for(var i=0;i<len;i++){
                niceData2.push({
                    x:niceData[i].x,
                    y:niceData[i].rateByPv
                });
            };

            var series = [{
                    name: i18n.t('nav.a')+serieSubTitle,
                    data: niceData,
                    yAxis:0,
                    zIndex: 1,
                    marker: {
                        lineWidth: 2
                    }
                },{
                    name:i18n.t('com.avg')+i18n.t('nav.a')+serieSubTitle,
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
                    name:'PV'+i18n.t('chart2.clickRate')+serieSubTitle,
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
                    series[0].name=i18n.t('nav.b')+serieSubTitle;
                    series[1].name=i18n.t('com.avg')+i18n.t('nav.b')+serieSubTitle;
                    showPVChart && (series[2].name='PV'+i18n.t('chart2.orderRate')+serieSubTitle);
                break;
                case 3:
                    series[0].name=i18n.t('nav.c')+serieSubTitle;
                    series[1].name=i18n.t('com.avg')+i18n.t('nav.c')+serieSubTitle;
                    showPVChart && (series[2].name='PV'+i18n.t('nav.c')+serieSubTitle);
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
                avgData = [];

            for(var c in rawData){
                c = this.getChartSerie(rawData[c],c,dataType);
                series = series.concat(c.serieData);
                avgData.push(c.avgData);
            };

            var baseOpts = {
                avgData:avgData[0],
                credits : {
                  enabled : false
                },
                chart:{
                    type:'line',
                    zoomType: 'xy'
                },
                title: {
                    text: ' '
                },
                xAxis: {
                    type: 'datetime'//datetime
                },
                yAxis: [{
                    title: {
                        text: null
                    },
                    min:0
                },{
                    title:{
                        text:null
                    },
                    min:0,
                    labels:{
                        formatter:function(){
                            return this.value+' %';
                        }
                    },
                    opposite:true
                }],
                tooltip: {
                    xDateFormat: '%Y-%m-%d',
                    crosshairs: true,
                    shared: true,
                    valueSuffix: ''
                },
                legend: {
                    enabled:false,
                    align:'center',
                    verticalAlign:'top',
                    itemStyle:{
                        fontWeight:'bold',
                        fontSize:'13px'
                    }
                },
                series: series
            };
            return baseOpts;
        },
        render:function(data){

            //this.$chart.find('.xdata_loading1').remove();
            var chartOpts = this.getChartOption(data,this.dataType),
                seriesLen = chartOpts.series.length;
            this.chartOpts = chartOpts;

            //更新设置版本点按钮的属性
            this.$btnTag
                .attr('data-version_mod_avg_click',chartOpts.avgData.avgClick)
                .attr('data-version_mod_avg_order',chartOpts.avgData.avgOrder)
                .attr('data-version_mod_avg_corate',chartOpts.avgData.avgCORate);

            if(!this.chart){
                this.$chart.highcharts(chartOpts);
                this.chart=this.$chart.highcharts();
                return;
            };

            while(this.chart.series.length>0){
                this.chart.series[0].remove(false);
            };

            for(var i =0;i<seriesLen;i++){
                this.chart.addSeries(chartOpts.series[i],false);
            };
            this.chart.redraw();
        },
        renderMenu:function(){
            if(this.tagData.norender){
                return false;
            }
            this.tagData.treePath[this.tagData.treePath.length-1].clActive="active";
            var $dataCrumbs = $('#dataCrumbs').empty().html(J.toHtml(this.tplMenu,{items:this.tagData.treePath}));
            var $crumbs = $dataCrumbs.find('a').bind('click.xdata',function(e){
                if(this.className.indexOf('active')!==-1){
                    return false;
                };
                $crumbs.removeClass('active');
                this.className='active';
                $('#xdataLnkCTag'+this.getAttribute('data-id')).trigger('click',[{norender:true}]);
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

                err = err || ( (d&&d.status)?null:'DragClickData数据接口发生错误:'+ (d?d.errmsg:'') );

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
        timerAutoHide:null,
        tplDateRange:J.heredoc(function(){/*
            <li class="data_compare_item">
                <div class="data_time1 clearfix">
                    <div class="data_time_col">
                        <input class="xdata_date xdata_sdate" max={{max}} value={{val1}} type="date" data-datediff="-14"/>
                    </div>
                    <div class="data_time_col">
                        <span class="c_tx3">-</span>
                    </div>
                    <div class="data_time_col">
                        <input class="xdata_date xdata_edate" max={{max}} value={{val2}} type="date" data-datediff="-7"/>
                    </div>
                    <div class="data_time_col">
                        <i class="data_ico data_ico_add">+</i>
                        <i class="data_ico data_ico_minus">-</i>
                    </div>
                </div>
            </li>
        */}),
        _init:function(){
            this.$dom = $('#xdataCompare');
            this.$list = $('#xdataCompareList');
            $('#xdataModCompare').hover(function(e){
                p.modCompare.resetAutoHide();
                p.modCompare.show();
            },function(e){
                p.modCompare.autoHide();
            });
            this.$dom.hover(function(e){
                p.modCompare.resetAutoHide();
            },function(e){
                p.modCompare.autoHide();
            });

            $('.data_ico_add').live('click',function(e){
                p.modCompare.addDateRangeUI();
            });

            $('.data_ico_minus').live('click',function(e){
                $(this).parents('li').remove();
                p.modCompare.assertLastItem();
            });

            $('#btnBeginModCompare').bind('click',function(e){
                p.modChart.refresh();
            });

            J.$win.bind(J.ui.EVT.ModChartHidden,function(e){
                p.modCompare.reset();
            });

        },
        updateDateRange0:function(sdate,edate){
            document.getElementById('iptCompareSDate0').value = sdate;
            document.getElementById('iptCompareEDate0').value = edate;
        },
        assertLastItem:function(){
            if(this.$list.find('li').length==1){
                this.$list.addClass('data_comparelist1');
            }
        },
        addDateRangeUI:function(){
            this.$list.append(J.toHtml(this.tplDateRange,{
                max:J.data.getDateTimeStr(new Date(),{len:10}),
                val1:J.data.getDateTimeStr(new Date(),{len:10,dayDiff:-14}),
                val2:J.data.getDateTimeStr(new Date(),{len:10,dayDiff:-7})
            })).removeClass('data_comparelist1');
        },
        getDateRangeData:function(){
            var d = [];
            this.$list.find('li').each(function(i,o){
                o  = $(o);
                d.push({
                    sdate:o.find('.xdata_sdate').val(),
                    edate:o.find('.xdata_edate').val()
                });
            });
            return d;
        },
        autoHide:function(){
            this.timerAutoHide = setTimeout(function(){
                p.modCompare.hide();
            },200);
        },
        resetAutoHide:function(){
            clearTimeout(this.timerAutoHide);
        },
        hide:function(){
            this.$dom.addClass('xdata_hidden');
        },
        show:function(){
            this.$dom.removeClass('xdata_hidden');
        },
        reset:function(){
            this.$list.find('.data_compare_item').remove();
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