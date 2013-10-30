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
        data:[],
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

            if(this.isLoading&&this.jqXHR&& this.jqXHR.readyState != 4){
                this.jqXHR.abort();
                this.isLoading=false;
            }

            var me = this,
                dates=[],
                tempDate = null,
                sdate = document.getElementById('xdataPop1Date1').value,
                edate = document.getElementById('xdataPop1Date2').value;

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
            //Note:new Date('2013-10-01')和new Date(2013,9,1)是不等的哦，前者多了8个小时
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
            
            this.data=[];
            //从服务器取数据
            //采用按maxDateCountPerTime天分割轮询查询的方式，提升查询性能
            this.getDataByDates(tagData.ytagIds,dates,function(err,d){
                me.isLoading=false;
                me.jqXHR=null;
                if(err){
                    me.showTip('<div class="xdata_error">'+i18n.t('ajax.serverError')+err.toString()+'</div>');
                    return;
                }
                me.showTip(null);
                me.render(d);
            },8/*maxDateCountPerTime*/);
        },
        parseData:function(d,dataType){
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
                if( ( i==(len-1)) && this.endDateIsToday() ){
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
        getChartOption:function(rawData,dataType){
            dataType = parseInt(dataType);
            var niceData = this.parseData(rawData,dataType);

            //平均线
            var niceData1 = [],
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

            //是否显示pv比率曲线
            var showPVChart = false;

            var baseOpts = {
                avgData:{
                    avgClick:avgValClickNum,
                    avgOrder:avgValOrderNum,
                    avgCORate:avgValCORate
                },
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
                    align:'center',
                    verticalAlign:'top',
                    itemStyle:{
                        fontWeight:'bold',
                        fontSize:'13px'
                    }
                },
                series: [{
                    name: i18n.t('nav.a'),
                    data: niceData,
                    yAxis:0,
                    zIndex: 1,
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[dataType-1]
                    }
                },{
                    name:i18n.t('com.avg')+i18n.t('nav.a'),
                    data:niceData1,
                    yAxis:0,
                    type:'spline',
                    marker:{
                        enabled:false
                    },
                    dashStyle:'shortdot',
                    zIndex:1
                }]
            };

            if(showPVChart){
                baseOpts.series.push({
                    name:'PV'+i18n.t('chart2.clickRate'),
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
                    baseOpts.series[0].name=i18n.t('nav.b');
                    baseOpts.series[1].name=i18n.t('com.avg')+i18n.t('nav.b');
                    showPVChart && (baseOpts.series[2].name='PV'+i18n.t('chart2.orderRate'));
                break;
                case 3:
                    baseOpts.series[0].name=i18n.t('nav.c');
                    baseOpts.series[1].name=i18n.t('com.avg')+i18n.t('nav.c');
                    showPVChart && (baseOpts.series[2].name='PV'+i18n.t('nav.c'));
                break;
            };//switch
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
            for(var i =0;i<seriesLen;i++){
                this.chart.series[i].update(chartOpts.series[i]);
            };
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
        getDataByDates:function(tagids,dates,cbk,maxDateCountPerTime){
            maxDateCountPerTime = maxDateCountPerTime ||5;
            if(dates.length==0){
                cbk(null,this.data);
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
                    me.data.push(tempItem);
                };
                //递归
                me.getDataByDates(tagids,dates,cbk,maxDateCountPerTime);
            });
        },
        endDateIsToday:function(){
            var edateStr = document.getElementById('xdataPop1Date2').value,
                todayStr = J.data.getDateTimeStr(new Date());
            var is = todayStr.indexOf(edateStr)!==-1;
            return is;
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