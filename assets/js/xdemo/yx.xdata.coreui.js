/* S CoreUI */
J(function($,p,pub){
    pub.id='ui';
    var coreTpl = J.heredoc(function(){/*
        <div id="xdataWrap" class="xdata_wrap xdata_wrap_hide">
            <div id="xdataUI" class="data_ui">
                <div id="xdataUIHD" class="data_ui_hd xdata_fixed">
                    <div id="xdataTab" class="data_tab">
                        <ul id="xdataType">
                            <li><a href="javascript:;" class="on" rel="1" data-i18n="nav.a">点击量</a></li>
                            <li><a href="javascript:;" rel="2" data-i18n="nav.b">下单量</a></li>
                            <li><a href="javascript:;" rel="3" data-i18n="nav.c">转化率</a></li>
                        </ul>
                    </div>
                    <div class="data_time">
                        <input class="xdata_date xdata_sdate" id="xdataKeyChartDate1" type="date"/><span class="c_tx3">-</span><input class="xdata_date xdata_edate" id="xdataKeyChartDate2" type="date" />
                        <button id="xdataRetweet1" class="data_btn" data-i18n="com.refresh">刷新</button>
                    </div>
                </div>
                <div id="xdataUIBD" class="data_ui_bd">
                    <div class="data_box">
                        <div class="data_box_hd">
                            <h3 data-i18n="chart1.title">页面趋势</h3>
                            <a href="javascript:;" id="xdataBtnHeatmap" class="data_btn data_btn_bg1 xdata_hidden" data-i18n="com.showHeatmap">显示热区图</a>
                        </div>
                        <div class="data_box_bd">
                            <div id="xdataKeyCharts" class="data_total">
                                <div id="xdataKeyChartTip" class="xdata_keycharttip xdata_hidden"><div class="xdata_keycharttip_bg"></div><div class="xdata_keycharttip_bd"></div></div>
                                <div id="xdataKeyChart1" class="data_total_inner xdata_keychart xdata_visible"></div>
                                <div id="xdataKeyChart2" class="data_total_inner xdata_keychart"></div>
                                <div id="xdataKeyChart3" class="data_total_inner xdata_keychart"></div>
                            </div>
                        </div>
                    </div><!--/data_box-->
                    <div class="data_box">
                        <div class="data_box_hd">
                            <h3 data-i18n="chart2.title">模块趋势</h3>
                            <a id="xdataAddCTag" href="javascript:;" class="data_btn data_btn_bg1 xdata_btn_addmod">新增私有模块</a>
                            <a id="xdataCTagAdmin" target="_blank" href="http://oxox.io/tools/oxtree/" class="data_btn data_btn_bg1 xdata_btn_addmod">模块维护</a>
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
            <div class="data_exhaled">
                <a id="xdataClose" href="javascript:;" class="data_exhaled_btn"></a>
            </div>
            <div id="xdataPop2" class="data_pop data_pop2 xdata_hidden">
                <div class="data_pop_add">
                    <ul>
                        <li><input id="xdataPop2Ipt1" type="text" data-i18n="placeholder=tip.modNameRequired" placeholder="请输入模块名称"/></li>
                        <li><input id="xdataPop2Ipt2" type="text" data-i18n="placeholder=tip.modNameValueRule" value="" placeholder="请输入模块的css选择器或以|分隔的ytag"/></li>
                    </ul>
                    <div class="data_control">
                        <a id="xdataPop2Btn1" href="javascript:;" class="data_btn" data-i18n="com.update">更新</a>
                        <a id="xdataPop2Btn2" href="javascript:;" class="data_btn data_btn_bg1" data-i18n="com.delete">删除</a>
                    </div>
                    <div id="xdataPop2Tip" class="xdata_pop2tip xdata_hidden"></div>
                </div>
                <a id="xdataPop2Close" href="javascript:;" class="xdata_pop_close">+</a>
            </div>
        </div>
        <div id="xdataPop1" class="data_pop data_pop1">
            <div class="data_pop_bd">
                <div class="data_time">
                    <input id="xdataPop1Date1" class="xdata_date xdata_sdate1" type="date" /><span class="c_tx3">-</span><input id="xdataPop1Date2" class="xdata_date xdata_edate" type="date" />
                    <button id="xdataRetweet2" class="data_btn" data-i18n="com.refresh">刷新</button>
                    <button id="xdataTag1" class="data_btn" data-i18n="chart2.btnSetVersion">设置版本点</button>
                    <a id="xdataLkTagList" class="data_btn" href="http://ecd.oa.com/xdata/timeline.html" target="_blank" data-i18n="chart2.btnModHis">版本历史</a>
                </div>
                <div id="dataCrumbs" class="data_crumbs"></div>
                <div class="data_pop_con">
                    <div class="data_total">
                        <div id="xdataModChartTip" class="xdata_ytagcharttip xdata_hidden"></div>
                        <div id="xdataModChart" class="data_total_inner xdata_ytagchart"></div>
                    </div>
                </div>
            </div>
            <a id="xdataPop1Close" href="javascript:;" class="xdata_pop_close">+</a>
        </div>
    */});

    var EVT={
        'DataTypeChange':'onXDataTypeChange',
        'UIReady':'onXDataUIReady',
        'Collapse':'onXDataCollapse',
        'ModChartReset':'onXDataModChartReset',
        'UIScroll':'onXDataUIScroll'
    };
    pub.EVT=EVT;
    pub.maxDateRange = 30;
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
    //主UI框架
    p.main={
        visible:false,
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
            this.$ui = $('#xdataWrap').oxi18n();
            this.$uiCore = $('#xdataUI');
            this.$tab = $('#xdataTab');
            this.$hd = $('#xdataUIHD');
            this.$bd = $('#xdataUIBD');
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
                todayStr = J.data.getDateTimeStr(today,{len:10});
            $('.xdata_date').attr('max',todayStr)
                .filter('.xdata_sdate').val(todayStr)
                .end()
                .filter('.xdata_edate').val(todayStr)
                .end()
                .filter('.xdata_sdate1').val(J.data.getDateTimeStr(new Date(),{len:10,dayDiff:-7}))
                .end()
                .bind('mouseenter',function(e){
                    clearTimeout(p.main.autoHideTimer);
                })/*.bind('mouseleave',function(e){
                    p.main.autoHide();
                })*/;
            this.$ui.onTransitioned(function(){
                if(p.main.visible){
                    p.main.fixedHD();
                }
            });

            //coreui scrollevent
            //UICOre的scroll事件
            p.main.$bd.bind('scroll.modChart',function(e){
                J.$win.trigger(EVT.UIScroll,[p.main.$bd.scrollTop()]);
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
        }
    };

    pub.getPosition = function(){
        return p.main.$ui.position();
    };

    pub.getOffset = function(){
        return p.main.$ui.offset();
    };

});