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
        dateRangeData:{
            sdate0:null,
            edate0:null
        },
        _init:function(){
            J.$win.bind(J.ui.EVT.DataTypeChangeForPage,function(e,t){
                p.keyChart.dataType=parseInt(t);
                p.keyChart.render(p.keyChart.dataType,true);
            }).bind(J.ui.EVT.Open,function(e,t){//每次打开时刷新一次数据
                p.keyChart.$retweet.trigger('click.data');
            }).bind(J.ui.EVT.UIReady,function(e){
                p.keyChart.onCoreUIReady();
            });
        },
        onCoreUIReady:function(){
            this.$tip = $('#dataCharttip1');
            this.$tipBD=this.$tip.find('.data_charttip1_bd');
            //刷新按钮
            this.$retweet = $('#dataRetweet1').bind('click.data',function(e){
                p.keyChart.loadData();
            });

            this.$filters = $('#dataChart1Filter label').bind('click.data',function(e){
                p.keyChart.$filters.removeClass('on');
                $(this).addClass('on');
                J.$win.trigger(J.ui.EVT.DataTypeChangeForPage,[this.getAttribute('data-type')]);
                return false;
            });

            var today=new Date(),
                todayStr = J.data.getDateTimeStr(today,{len:10});

            this.dateRangeData.sdate0 = todayStr;
            this.dateRangeData.edate0 = todayStr;

            //日期控件设置
            new pickerDateRange('txtDateRange1', {
                startDate: todayStr,
                endDate: todayStr,
                target: 'dataDatePicker1',
                hideOnDocClick:(location.href.indexOf('jiadian.yixun')>0?false:true),
                isTodayValid: true,
                success: function (obj) {
                    p.keyChart.dateRangeData = obj.getValue();
                    p.keyChart.$retweet.trigger('click');
                }
            });

        },
        render:function(dataType){
            var total = this.keyData.status?this.keyData.total:{};
            document.getElementById('dataPV').innerHTML = total.pv||0;
            document.getElementById('dataUV').innerHTML = total.uv||i18n.t('tip.uvTip');
            document.getElementById('dataClickNum').innerHTML = total.click_num||0;
            document.getElementById('dataOrderNum').innerHTML = total.order_num||0;
            document.getElementById('dataTransRate').innerHTML = total.click_trans_rate||0;
        },
        showTip:function(txt){
            if(txt===null){
                this.$tip.addClass('data_hidden');
                return;
            };
            var isLoading = typeof(txt)==='undefined';
            txt = txt || '<img class="data_loading1" src="http://static.gtimg.com/icson/img/common/loading.gif"/>';
            txt = isLoading?txt:(txt.indexOf('<span')==0?txt:('<span class="data_error data_errorB">'+txt+'</span>'));
            this.$tipBD.html(txt);
            this.$tip.removeClass('data_hidden');
        },
        loadData:function(){

            if(this.isLoading){
                J.data.abortKeyAndClickDataRequest();
                this.isLoading=false;
            }

            var me = this,
                dates=[],
                tempDate = null,
                sdate = this.dateRangeData.sdate0,
                edate = this.dateRangeData.edate0;

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
                    err = err.toString();
                    if(err.indexOf('permission deny')>-1){
                        err = i18n.t('tip.permissionDeny');
                    }
                    me.hasAjaxError=true;
                    me.showTip(i18n.t('ajax.serverError')+err);
                    return;
                }
                me.keyData=d1;
                me.clickData = d2;
                me.showTip(null);
                me.render(me.dataType);
            });
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