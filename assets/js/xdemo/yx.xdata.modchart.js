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
            J.$win.bind(J.ui.EVT.UIReady,function(e){
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
                $('#xdataTypes .xdata_type').bind('click.modChart',function(e){
                    if(this.value==(p.modChart.dataType+'')){
                        return;
                    };
                    J.$win.trigger(J.ui.EVT.DataTypeChange,[this.value]);
                });
                //滚动条
                $('.xdata_rank,.xdata_mods').bind('scroll.modChart',function(e){
                    p.modChart.reset();
                });
                $('#xdataPop1Close').bind('click',function(e){
                    p.modChart.reset();
                });

            }).bind(J.ui.EVT.DataTypeChange,function(e,t){
                p.modChart.dataType=parseInt(t);
                p.modChart.refresh();
            }).bind('resize.modChart',function(e){
                //p.modChart.updatePosition();
            }).bind(J.data.EVT.CTagUpdated,function(e,opType,d){
                p.modChart.onCTagUpdated(opType,d);
            }).bind(J.ui.EVT.Collapse,function(e){
                p.modChart.reset();
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
        show:function(tagData,$trigger){
            this.tagData=tagData;
            this.$trigger=$trigger;
            this.$d.addClass('data_pop1_on');
            this.isVisible=true;
            this.renderMenu();
            this.refresh();
        },
        refresh:function(){
            this.loadData(this.tagData);
        },
        hide:function(){
            this.$d.removeClass('data_pop1_on');
            this.isVisible=false;
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
            //TODO:需要开发提供一个取多天数据的接口
            this.getDataByDates(tagData.ytagIds,dates,function(err,d){
                me.isLoading=false;
                me.jqXHR=null;
                if(err){
                    me.showTip('<div class="xdata_error">'+i18n.t('ajax.serverError')+err.toString()+'</div>');
                    return;
                }
                me.showTip(null);
                me.render(d);
            });
        },
        parseData:function(d,dataType){
            var len = d.length,
                r =[],
                dataByTime=null,
                pv = J.data.CurrentKeyData.total.pv,
                rateByPv = 0;
            for(var i=0;i<len;i++){
                dataByTime={x:d[i].t,y:0,rateByPv:0};
                switch(dataType){
                    case 1:
                        dataByTime.y=d[i].d.status===true?d[i].d.data.data[0].click_num:0;
                    break;
                    case 2:
                        dataByTime.y=d[i].d.status===true?d[i].d.data.data[0].order_num:0;
                    break;
                    case 3://转化率
                        dataByTime.y=d[i].d.status===true?parseFloat(d[i].d.data.data[0].click_trans_rate):0;
                    break;
                };//switch

                //如果最后一天是当天，由于接口没有数据，我们用keyChart的当天数据
                if( ( i==(len-1)) && this.endDateIsToday() ){
                    dataByTime.y = dataType==3?parseFloat(this.tagData.val0):parseInt(this.tagData.val0);
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
                avgVal = 0,
                len = niceData.length;
            for(var i =0;i<len;i++){
                totalVal+=niceData[i].y;
            };
            avgVal = parseFloat(len==0?0:(totalVal/len).toFixed(2));
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
            console.log(niceData2);

            var baseOpts = {
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
                },{
                    name:'PV'+i18n.t('chart2.clickRate'),
                    data:niceData2,
                    yAxis:1,
                    type:'spline',
                    zIndex:1,
                    tooltip:{
                        valueSuffix:' %'
                    }
                }]
            };
            switch(dataType){
                case 1:
                break;
                case 2:
                    baseOpts.series[0].name=i18n.t('nav.b');
                    baseOpts.series[1].name=i18n.t('com.avg')+i18n.t('nav.b');
                    baseOpts.series[2].name='PV'+i18n.t('chart2.orderRate');
                break;
                case 3:
                    baseOpts.series[0].name=i18n.t('nav.c');
                    baseOpts.series[1].name=i18n.t('com.avg')+i18n.t('nav.c');
                    baseOpts.series[2].name='PV'+i18n.t('nav.c');
                break;
            };//switch
            return baseOpts;
        },
        render:function(data){
            //this.$chart.find('.xdata_loading1').remove();
            var chartOpts = this.getChartOption(data,this.dataType),
                seriesLen = chartOpts.series.length;
            this.chartOpts = chartOpts;

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
        },
        endDateIsToday:function(){
            var edateStr = document.getElementById('xdataPop1Date2').value,
                todayStr = J.data.getDateTimeStr(new Date());
            var is = todayStr.indexOf(edateStr)!==-1;
            return is;
        }
    };

    pub.show = function(tagData,$trigger){
        p.modChart.show(tagData,$trigger);
    };

    pub.isVisible = function(){
        return p.modChart.isVisible;
    };

    pub.getChartOption = function(){
        return p.modChart.chartOpts;
    };

});