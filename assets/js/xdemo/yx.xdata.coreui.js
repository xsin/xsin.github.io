/* S CoreUI */
J(function($,p,pub){
    pub.id='ui';
    var coreTpl = J.heredoc(function(){/*
        <div id="xdataWrap" class="xdata_wrap xdata_wrap_hide">
            <div id="xdataUI" class="data_ui data_ui_1">
                <div id="xdataUIHD" class="data_ui_hd xdata_fixed">
                    <div class="data_time">
                        <input class="xdata_date xdata_sdate" id="xdataKeyChartDate1" type="date"/><span class="c_tx3">-</span><input class="xdata_date xdata_edate" id="xdataKeyChartDate2" type="date" />
                        <button id="xdataRetweet1" class="data_btn" data-i18n="com.refresh">刷新</button>
                    </div>
                </div>
                <div id="xdataUIBD" class="data_ui_bd">
                    <div class="data_box">
                        <div class="data_box_hd">
                            <h3 data-i18n="chart1.title">整体数据</h3>
                            <a href="javascript:;" id="xdataBtnHeatmap" class="data_btn data_btn_bg1 xdata_hidden" data-i18n="com.showHeatmap">显示热区图</a>
                        </div>
                        <div class="data_box_bd">
                            <div id="xdataCharttip1" class="xdata_charttip1"><div class="xdata_charttip1_bg"></div><div class="xdata_charttip1_bd"><img class="xdata_loading1" src="http://static.gtimg.com/icson/img/common/loading.gif"/></div></div>
                            <table class="data_table">
                                <tbody>
                                    <tr><th>PV</th><td><span id="xdataPV" class="data_pv"></span></td></tr>
                                    <tr><th>UV</th><td><span id="xdataUV" class="data_pv"></span></td></tr>
                                    <tr><th data-i18n="nav.a">点击量</th><td><span id="xdataClickNum" class="data_cnum"></span></td></tr>
                                    <tr><th data-i18n="nav.b">下单量</th><td><span id="xdataOrderNum" class="data_onum"></span></td></tr>
                                    <tr><th data-i18n="nav.c">转化率</th><td><span id="xdataTransRate" class="data_transrate"></span></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div><!--/data_box-->
                    <div class="data_box">
                        <div class="data_box_hd">
                            <h3 data-i18n="chart2.title">模块趋势</h3>
                            <a id="xdataShowChart3" href="javascript:;" class="data_btn data_btn_bg1 xdata_btn_chart3 xdata_hidden">模块占比</a>
                            <a id="xdataAddCTag" href="javascript:;" class="data_btn data_btn_bg1 xdata_btn_addmod">新增私有模块</a>
                            <a id="xdataCTagAdmin" target="_blank" href="http://oxox.io/tools/oxtree/" class="data_btn data_btn_bg1 xdata_btn_addmod">模块维护</a>
                        </div>
                        <div class="data_box_bd">
                            <div id="xdataChart1Filter" class="data_filter">
                                <label class="on" data-type="1"><span data-i18n="nav.a">点击量</span></label>
                                <label data-type="2"><span data-i18n="nav.b">下单量</span></label>
                                <label data-type="3"><span data-i18n="nav.c">转化率</span></label>
                            </div>
                            <!--默认列表-->
                            <div id="xdataList1" class="data_list">
                                <img id="xdataLoading2" class="xdata_loading2" src="http://static.gtimg.com/icson/img/common/loading.gif"/>
                            </div>
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
                <div class="data_action">
                    <button id="xdataTag2" class="ox_compare_link data_btn" data-i18n="chart2.btnModCompare">添加对比</button>
                    <button id="xdataTag1" class="ox_add_link data_btn" data-i18n="chart2.btnSetVersion">设置版本点</button>
                    <a id="xdataLkTagList" class="data_btn" data-href="http://ecd.oa.com/xdata/timeline/" target="_blank" data-i18n="chart2.btnModHis">版本历史</a>
                </div>
                <div id="dataCrumbs" class="data_crumbs"></div>
                <div class="data_pop_con">
                    <div class="data_total">
                        <div id="xdataModChartTip" class="xdata_ytagcharttip xdata_hidden"></div>
                        <div id="xdataModChart" class="data_total_inner xdata_ytagchart"></div>
                    </div>
                </div>
                <div class="data_pop_filter">
                    <div class="data_time">
                        <input id="xdataPop1Date1" class="xdata_date xdata_sdate1" type="date" /><span class="c_tx3">-</span><input id="xdataPop1Date2" class="xdata_date xdata_edate" type="date" />
                        <button id="xdataRetweet2" class="data_btn" data-i18n="com.refresh">刷新</button>
                        <div id="xdataTypes" class="data_time_col">
                            <label><input id="xdataTypeForMod1" class="xdata_type" type="radio" value="1" name="xdata_type" checked="checked"/><span data-i18n="nav.a">点击量</span></label>
                            <label><input id="xdataTypeForMod2" class="xdata_type" type="radio" value="2" name="xdata_type"/><span data-i18n="nav.b">下单量</span></label>
                            <label><input id="xdataTypeForMod3" class="xdata_type" type="radio" value="3" name="xdata_type"/><span data-i18n="nav.c">转化率</span></label>
                        </div>
                    </div>
                </div>
            </div>
            <a id="xdataPop1Close" href="javascript:;" class="xdata_pop_close">+</a>
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
    pub.maxDateRange = 60;
    //主UI框架
    p.main={
        visible:false,
        $ui:null,
        dataType:1,
        tpl0:'',
        _init:function(){
            this.render();
            if(location.href.indexOf('xdata')>-1){
                J.$body.addClass('xdata_admin');
            }
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
            this.$ui = $('#xdataWrap').oxi18n();
            this.$uiCore = $('#xdataUI');
            this.$hd = $('#xdataUIHD');
            this.$bd = $('#xdataUIBD');
            $('#xdataClose').bind('click',function(e){
                p.main[p.main.visible?'hide':'show'].call(p.main);
                return false;
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

            //双击切换百分比
            this.$uiCore.bind('dblclick',function(e){
                p.main.$uiCore.toggleClass('data_ui_dblclick');
            });

        },
        fixedHD:function(){
            this.$hd.addClass('xdata_fixed');
        },
        unfixedHD:function(){
            this.$hd.removeClass('xdata_fixed');
        },
        show:function(){
            this.$ui.removeClass('xdata_wrap_hide');
            this.visible=true;
            J.$win.trigger(EVT.Open);
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