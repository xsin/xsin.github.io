/**
 * xdata公共接口
 * @author levin
 * @version 1.0.0
 * @module OXAPI
 * @class OXAPI.XData
 * @static
 */
(function($){

    var p={},pub={},today = new Date(),
        maxDateRange = 62,//最大时间范围
        maxDateCountPerTime = 10;//单次服务器请求的时间范围

    /*
     * 获取日期字符串
     * @method OXAPI.XData.getDateTimeStr
     * @param {Date} dObj Date instance
     * @param {Object} cfg formatting configuration
     * @example
            OXAPI.XData.getDateTimeStr(new Date(),{len:10})
     */
    pub.getDateTimeStr=function(dObj,cfg){
        cfg=cfg||{};
        cfg.len=cfg.len||19;
        cfg.dayDiff=cfg.dayDiff||0;
        if(cfg.dayDiff!==0){
            dObj.setDate(dObj.getDate()+cfg.dayDiff);
        };
        var o =[dObj.getFullYear()+'-',(dObj.getMonth()+1)],
        format = function(i){
            return (i<10?('0'+i):i);
        };
        o[1]=format(o[1])+'-';
        o.push(format(dObj.getDate()));

        if(cfg.ignoreHMS){
            o.push(" 00:00:00");
        }else{
            o.push(' ');
            tempObj = dObj.getHours();
            o.push(format(dObj.getHours())+':');
            o.push(format(dObj.getMinutes())+':');
            o.push(format(dObj.getSeconds()));
        }

        return o.join('').substr(0,cfg.len);

    };

    p.clickstream = {
        query : function(_type,_params,_cbk){
            var jqXHR=$.ajax({
                type: "POST",
                url: 'http://statistic.yixun.com/json.php?mod=stat&act='+_type,
                data: _params,
                dataType: 'json'
            }).fail(function(jqXHR1,txtStatus,err){
                _cbk(_type+':'+err);
            }).done(function(data,txtStatus,jqXHR1){
                _cbk(null,data);
            });
            return jqXHR;
        },
        getRangeClickData : function(_params,cbk){
            _params = $.extend({},{
                uid:"6775494", 
                start_date:pub.getDateTimeStr(today,{ignoreHMS:true}), 
                end_date:pub.getDateTimeStr(today), 
                date_type:"today", 
                page_id:"1000", 
                warehouse_id:"1", 
                areasInfo:"S0001_1001",
                page_tag_ids:"-1",
                sumByDate:1
            },_params||{});
            return this.query('DragClickData',_params,cbk);
        }
    };

    //ytag module
    p.ytag = {
        isLoading:false,
        hasAjaxError:false,
        jqXHR:null,
        data:{},
        _getDataByDates:function(params0,cbk,maxDateCountPerTime){
            maxDateCountPerTime = maxDateCountPerTime ||5;
            if(params0.dates.length==0){
                cbk(null,this.data[params0.dateKey]);
                return;
            };
            var tagids = params0.tagids,
                dateKey = params0.dateKey,
                dates1 = params0.dates.splice(0,maxDateCountPerTime),
                sdate = pub.getDateTimeStr(dates1[0]),
                edate = pub.getDateTimeStr(dates1[dates1.length-1]),
                _params = {
                    page_id:params0.pid, 
                    warehouse_id:params0.wsid, 
                    areasInfo:params0.areaid,
                    date_type:'custom',
                    start_date:sdate,
                    end_date:edate,
                    page_tag_ids:tagids.join(',')
                },
                me = this,
                tempItem,tempDate;

            this.jqXHR=p.clickstream.getRangeClickData(_params,function(err,d){

                err = err || ( (d&&d.status)?null:'DragClickData Request Error:'+ (d?d.errmsg:'') );

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
                    tempItem.click_trans_rate = (parseFloat(tempItem.click_trans_rate)||0);
                    me.data[dateKey].push(tempItem);
                };
                //递归
                me._getDataByDates(params0,cbk,maxDateCountPerTime);
            });
        },
        loadData:function(params0,cbk){
            var dates = [],
                dateRange1 = null;
                len = params0.dateArr.length;

            for(var i=0;i<len;i++){
                dateRange1 = this._validateDateRange(params0.dateArr[i].sdate,params0.dateArr[i].edate)
                if (!dateRange1) {
                    cbk('Parameter Error!Check your sdate & edate!');
                    return;
                };
                dates.push(dateRange1);
            };
            params0.dates = dates;
            var me = this;
            //reset data
            this.data={};
            this._loadDateRangeData(params0,function(err,d){
                cbk(err,d);
            });

        },
        //校验开始时间和结束时间
        _validateDateRange:function(sdate,edate){
            if(sdate==''||edate==''){
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
        _loadDateRangeData:function(params0,cbk){

            if(params0.dates.length===0){
                cbk(null,this.data);
                return;
            };

            var dateRangeObj = params0.dates.splice(0,1)[0];

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

            if(dates.length>maxDateRange){
                cbk("Date Range Overflow! The Max Date range is "+maxDateRange);
                return;
            }

            this.isLoading=true;
            this.hasAjaxError=false;
            
            this.data[dateKey]=[];
            //从服务器取数据
            //采用按maxDateCountPerTime天分割轮询查询的方式，提升查询性能
            this._getDataByDates({
                tagids:params0.tagids,
                pid:params0.pid,//pageid
                wsid:params0.wsid,//warehouse id
                areaid:params0.areaid,
                dates:dates,
                dateKey:dateKey
            },function(err,d){
                me.isLoading=false;
                me.jqXHR=null;
                if(err){
                    cbk('Ajax Server Error:'+err.toString());
                    return;
                }
                me._loadDateRangeData(params0,cbk);
            },maxDateCountPerTime);
        }
    };
    /*
     * 获取ytag数据
     * @method OXAPI.XData.getYTagsData
     * @param {Object} params0 request parameters
     * @param {Function} cbk callback function cbk(err,data)
     * @example
            OXAPI.XData.getYTagsData({
                tagids:['10001','10002'],
                pid:'1000',//pageid
                wsid:'1',//warehouse id
                areaid:'S0001_1001',
                dateArr:[{//支持同时查询多个时间段
                    sdate:'2013-10-01',
                    edate:'2013-10-30'
                }]
            },function(err,d){
                console.log('err',err);
                console.log('data',d);
            })
     */
    pub.getYTagsData = function(params0,cbk){
        p.ytag.loadData(params0,cbk);
    };

    window['OXAPI']=window['OXAPI']||{};
    OXAPI.XData = pub;

})(jQuery);