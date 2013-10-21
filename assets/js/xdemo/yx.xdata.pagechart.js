J(function($,p,pub){

    pub.id = "pagechart";

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
        _init:function(){
            J.$win.bind(J.ui.EVT.UIReady,function(e){
                p.keyChart.onXDataUIReady();
            }).bind(J.ui.EVT.DataTypeChange,function(e,t){
                p.keyChart.dataType=parseInt(t);
                p.keyChart.render(p.keyChart.dataType,true);
            }).bind(J.ui.EVT.Open,function(e,t){//每次打开时刷新一次数据
                p.keyChart.$retweet.trigger('click');
            });
        },
        onXDataUIReady:function(){
            p.keyChart.render(1);
            this.$tip = $('#xdataKeyChartTip');
            this.$tipBD=this.$tip.find('.xdata_keycharttip_bd');
            //刷新按钮
            this.$retweet = $('#xdataRetweet1').bind('click',function(e){
                p.keyChart.loadData();
            });
        },
        getChartOption:function(dataType){
            dataType = parseInt(dataType);
            var rawData = J.data['CurrentKeyData'],
                niceData = this.parseData(rawData,dataType),
                baseOpts = {
                credits : {
                  enabled : false
                },
                chart: {
                    type: 'line'
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
                    name: i18n.t('nav.a'),
                    data: niceData,
                    zIndex: 1
                }]
            };
            rawData.total.click_num=parseInt((rawData.total.click_num+'').replace(/,/gi,''));
            rawData.total.order_num=parseInt((rawData.total.order_num+'').replace(/,/gi,''));
            rawData.total.click_trans_rate = rawData.total.click_num==0?0:(rawData.total.order_num*100/rawData.total.click_num).toFixed(2);
            switch(dataType){
                case 1:
                    baseOpts.series[0].name=i18n.t('nav.a');
                    baseOpts.title.text = i18n.t('com.total')+rawData.total.click_num+i18n.t('com.ci');
                break;
                case 2:
                    baseOpts.series[0].name=i18n.t('nav.b');
                    baseOpts.title.text = i18n.t('com.total')+rawData.total.order_num+i18n.t('com.dan');
                break;
                case 3:
                    baseOpts.series[0].name=i18n.t('nav.c');
                    baseOpts.title.text = i18n.t('com.avg')+rawData.total.click_trans_rate+'%';
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
                edate = document.getElementById('xdataKeyChartDate2').value;

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
                    me.hasAjaxError=true;
                    me.showTip(i18n.t('ajax.serverError')+err.toString());
                    return;
                }
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

    pub.isToday = function(){
        return (p.keyChart.dateType==='today');
    };

});