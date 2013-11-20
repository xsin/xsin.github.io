/* S CoreUI */
J(function($,p,pub){
    pub.id='ui';
    var coreTpl = J.heredoc(function(){/*
        <div id="dataWrap" class="data_wrap data_wrap_hide">
            <div id="dataUI" class="data_ui data_ui_1">
                <div id="dataUIHD" class="data_ui_hd data_fixed">
                    <div class="data_time">
                        <div class="data_time_col data_drp_input">
                            <input type="text" readonly id="txtDateRange1"/>
                        </div>
                        <button id="dataRetweet1" class="data_btn" data-i18n="com.refresh">刷新</button>
                        <div id="dataDatePicker1" style="display:none"></div>
                    </div>
                </div>
                <div id="dataUIBD" class="data_ui_bd">
                    <div class="data_box data_box1">
                        <div class="data_box_hd">
                            <h3 data-i18n="chart1.title">整体数据</h3>
                            <a href="javascript:;" id="dataBtnHeatmap" class="data_btn data_btn_bg1 data_hidden" data-i18n="com.showHeatmap">显示热区图</a>
                        </div>
                        <div class="data_box_bd">
                            <div id="dataCharttip1" class="data_charttip1"><div class="data_charttip1_bg"></div><div class="data_charttip1_bd"><img class="data_loading1" src="http://static.gtimg.com/icson/img/common/loading.gif"/></div></div>
                            <table class="data_table">
                                <tbody>
                                    <tr><th>PV</th><td><span id="dataPV" class="data_pv"></span></td></tr>
                                    <tr><th>UV</th><td><span id="dataUV" class="data_pv"></span></td></tr>
                                    <tr><th data-i18n="nav.a">点击量</th><td><span id="dataClickNum" class="data_cnum"></span></td></tr>
                                    <tr><th data-i18n="nav.b">下单量</th><td><span id="dataOrderNum" class="data_onum"></span></td></tr>
                                    <tr><th data-i18n="nav.c">转化率</th><td><span id="dataTransRate" class="data_transrate"></span></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div><!--/data_box-->
                    <div class="data_box data_box2">
                        <div class="data_box_hd">
                            <h3 data-i18n="chart2.title">模块趋势</h3>
                            <a id="dataShowChart3" href="javascript:;" class="data_btn data_btn_bg1 data_btn_chart3 data_hidden">模块占比</a>
                            <a id="dataAddCTag" href="javascript:;" class="data_btn data_btn_bg1" data-i18n="chart2.btnAddPrivateMod">新增私有模块</a>
                            <a id="dataCTagAdmin" target="_blank" href="http://oxox.io/tools/oxtree/" class="data_btn data_btn_bg1 data_btn_addmod" data-i18n="chart2.btnAdminMod">模块维护</a>
                        </div>
                        <div class="data_box_bd">
                            <div id="dataChart1Filter" class="data_filter">
                                <label class="on" data-type="1"><span data-i18n="nav.a">点击量</span></label>
                                <label data-type="2"><span data-i18n="nav.b">下单量</span></label>
                                <label data-type="3"><span data-i18n="nav.c">转化率</span></label>
                            </div>
                            <!--默认列表-->
                            <div id="dataList1" class="data_list">
                                <img id="dataLoading2" class="data_loading2" src="http://static.gtimg.com/icson/img/common/loading.gif"/>
                            </div>
                        </div>
                    </div><!--/data_box-->
                </div>
            </div>
            <div class="data_exhaled">
                <a id="dataClose" href="javascript:;" class="data_exhaled_btn"></a>
            </div>
            <div id="dataPop2" class="data_pop data_pop2 data_hidden">
                <div class="data_pop_add">
                    <ul>
                        <li><input id="dataPop2Ipt1" type="text" data-i18n="placeholder=tip.modNameRequired" placeholder="请输入模块名称"/></li>
                        <li><input id="dataPop2Ipt2" type="text" data-i18n="placeholder=tip.modNameValueRule" value="" placeholder="请输入模块的css选择器或以|分隔的ytag"/></li>
                    </ul>
                    <div class="data_control">
                        <a id="dataPop2Btn1" href="javascript:;" class="data_btn" data-i18n="com.update">更新</a>
                        <a id="dataPop2Btn2" href="javascript:;" class="data_btn data_btn_bg1" data-i18n="com.delete">删除</a>
                    </div>
                    <div id="dataPop2Tip" class="data_pop2tip data_hidden"></div>
                </div>
                <a id="dataPop2Close" href="javascript:;" class="data_pop_close">+</a>
            </div>
        </div>
        <div id="dataPop1" class="data_pop data_pop1">
            <div class="data_pop_hd">
                <div class="data_action">
                    <button id="dataTag1" class="data_btn ox_add_link" data-i18n="chart2.btnSetVersion">设置版本点</button>
                    <a id="dataLkTagList" class="data_btn" data-href="http://ecd.oa.com/xdata/timeline/" target="_blank" data-i18n="chart2.btnModHis">版本历史</a>
                </div>
                <div id="dataCrumbs" class="data_crumbs"></div>
                <div class="data_filter1">
                    <div class="data_time clearfix">
                        <div id="dataDateRange2" class="data_fl data_daterange">
                            <div class="drp_date drp_date1" id="div_dataLabelDateRange2">
                                <span class="drp_date_title" id="dataLabelDateRange2"></span>
                                <a class="drp_trigger" id="drp_dataLabelDateRange2Trigger" href="javascript:;">
                                    <i class="drp_trigger_ico"></i>
                                </a>
                            </div>
                        </div>
                        <div class="data_fr data_datepreset">
                            <ul class="clearfix">
                                <li class="data_datepreset_item data_datepreset_item1" id="drpRecentDays1" data-v="1"><a href="javascript:;"><span data-i18n="com.recent">最近</span>7<span data-i18n="com.day">天</span></a></li>
                                <li class="data_datepreset_item" id="drpRecentDays2" data-v="2"><a href="javascript:;"><span data-i18n="com.recent">最近</span>15<span data-i18n="com.day">天</span></a></li>
                                <li class="data_datepreset_item" id="drpRecentDays3" data-v="3"><a href="javascript:;"><span data-i18n="com.recent">最近</span>30<span data-i18n="com.day">天</span></a></li>
                                <li>
                                    <button id="dataBtnMoreFilter" class="data_btnB"><i class="data_ico_chart"></i><span data-i18n="com.moreCondition">更多条件</span></button>
                                    <div id="dataTypes" class="data_types data_hidden">
                                        <label><input id="dataTypeForMod1" class="data_type" type="radio" value="1" name="data_type" checked="checked"/><span data-i18n="nav.a">点击量</span></label>
                                        <label><input id="dataTypeForMod2" class="data_type" type="radio" value="2" name="data_type"/><span data-i18n="nav.b">下单量</span></label>
                                        <label><input id="dataTypeForMod3" class="data_type" type="radio" value="3" name="data_type"/><span data-i18n="nav.c">转化率</span></label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="data_pop_bd">
                <div class="data_pop_inner">
                    <div id="dataModChartTip" class="data_ytagcharttip data_hidden"></div>
                    <!--趋势图-->
                    <div class="data_pop_section data_chart">
                        <h3 class="data_pop_tit" data-i18n="chart2.title">趋势图</h3>
                        <div id="dataModChart" class="data_chart_bd"></div>
                    </div>
                    <!--详细数据-->
                    <div class="data_pop_section data_detail">
                        <h3 class="data_pop_tit" data-i18n="chart2.title1"></h3>
                        <div class="data_detail_bd" id="dataDetailBody">
                        </div>
                    </div>
                </div>
            </div>
            <div class="data_exhaled data_exhaled1">
                <a id="dataPop1Close" href="javascript:;" class="data_exhaled_btn data_exhaled_btn_on"></a>
            </div>
        </div>
    */});

    var EVT={
        'Collapse':'onXDataCollapse',
        'Open':'onXDataOpen',
        'ModChartReset':'onXDataModChartReset',
        'ModChartHidden':'onXDataModChartHidden',
        'UIScroll':'onXDataUIScroll',
        'UIReady':'onXDataUIReady',
        'DataTypeChange':'onXDataTypeChange',
        'DataTypeChangeForPage':'onXDataTypeChangeForPage',
        'ModRankRendered':'onXDataModRankRendered'
    };
    pub.EVT=EVT;
    pub.maxDateRange = 100;
    //主UI框架
    p.main={
        visible:false,
        $ui:null,
        dataType:1,
        tpl0:'',
        _init:function(){
            this.render();
            if(location.href.indexOf('xdata')>-1){
                J.$body.addClass('data_admin');
            };
            if( J.data.isBoss( (J.data.bizInfo||{uid:''}).uid ) ){
                J.$body.addClass('data_boss');
            };
            setTimeout(function(){
                J.$win.trigger(EVT.UIReady);
            },100);

            J.$win.bind(J.ui.EVT.DataTypeChangeForPage,function(e,t){
                p.main.dataType = parseInt(t)||1;
                p.main.$uiCore.removeClass('data_ui_1 data_ui_2 data_ui_3')
                    .addClass('data_ui_'+t);
            });
        },
        render:function(){
            J.$body.append(coreTpl);
            this.$ui = $('#dataWrap').oxi18n();
            this.$uiCore = $('#dataUI');
            this.$hd = $('#dataUIHD');
            this.$bd = $('#dataUIBD');
            $('#dataClose').bind('click',function(e){
                p.main[p.main.visible?'hide':'show'].call(p.main);
                return false;
            });

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

            //双击切换百分比
            this.$uiCore.bind('dblclick',function(e){
                p.main.$uiCore.toggleClass('data_ui_dblclick');
            });

            //将bizInfo打到ui上,方便其他扩展功能使用
            var bizInfo = J.data.bizInfo||{};
            for(var c in bizInfo){
                this.$ui[0].setAttribute('data-'+c,bizInfo[c]);
            };

        },
        fixedHD:function(){
            this.$hd.addClass('data_fixed');
        },
        unfixedHD:function(){
            this.$hd.removeClass('data_fixed');
        },
        show:function(){
            this.$ui.removeClass('data_wrap_hide');
            this.visible=true;
            J.$win.trigger(EVT.Open);
        },
        hide:function(){
            this.unfixedHD();
            this.$ui.addClass('data_wrap_hide');
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