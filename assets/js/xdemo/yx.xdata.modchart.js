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
        cache:{},//data cache
        dataType:1,
        jqXHR:null,
        _init:function(){
            J.$win.bind(J.ui.EVT.UIReady,function(e){
                p.modChart.$d = $('#xdataPop1');
                p.modChart.$chart = $('#xdatamodChart');
                p.modChart.$tip = $('#xdatamodChartTip');
                //make the popup draggable
                new Draggabilly(p.modChart.$d[0]);
                //刷新按钮
                $('#xdataRetweet2').bind('click',function(e){
                    if(p.modChart.isLoading){
                        return;
                    };
                    p.modChart.loadData(p.modChart.tagData);
                });
                //滚动条
                $('.xdata_rank,.xdata_mods').bind('scroll.modChart',function(e){
                    p.modChart.reset();
                });
                //排行榜的切换
                $('#xdataRank .xdata_ranktype').bind('click.modChart',function(e){
                    p.modChart.reset();
                });
                $('#xdataPop1Close').bind('click',function(e){
                    p.modChart.reset();
                });

            }).bind(J.ui.EVT.DataTypeChange,function(e,t){
                p.modChart.dataType=parseInt(t);
                p.modChart.reset();
            }).bind('resize.modChart,'+J.ui.EVT.UIScroll,function(e){
                //p.modChart.updatePosition();
            }).bind(J.data.EVT.CTagUpdated,function(e,opType,d){
                p.modChart.onCTagUpdated(opType,d);
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
            J.$win.trigger(J.ui.EVT.modChartReset);
        },
        show:function(tagData,$trigger){
            this.tagData=tagData;
            this.$trigger=$trigger;
            this.$d.removeClass('xdata_hidden');
            this.isVisible=true;
            //this.updatePosition();
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

    pub.show = function(tagData,$trigger){
        p.modChart.show(tagData,$trigger);
    };

});