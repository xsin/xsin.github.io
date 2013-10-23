/* S YTAG */
J(function($,p,pub){
    pub.id="ytag";
    var $ytags;
    p.main = {
        coverTpl:J.heredoc(function(){/*
            <div id="xdataCover{{id}}" class="xdata_tagcover">
                <div class="xdata_tagcover_bg"></div>
                <div class="xdata_tagcover_bd">{{coverTip}}</div>
            </div>
        */}),
        covers:{},
        $ytagTrigger:null,
        activeNodeCssSelector:null,
        hideCovers:function(){
            for(var c in this.covers){
                this.covers[c].addClass('xdata_hidden');
            }
        },
        parseData:function(tagObj){
            var ctag = tagObj.ytagSelector,
                isCustomTagWithCssSelector = (ctag.indexOf('#')!=-1 || ctag.indexOf('.')!=-1),
                cssSelectors = [],
                cssSelectors1 = [],
                len=0;

            tagObj.selector = "";

            if(isCustomTagWithCssSelector){
                cssSelectors = ctag.split(',');
                len = cssSelectors.length;
                tagObj.selector = ctag;
            }else{
                cssSelectors = ctag.split('|');
                len = cssSelectors.length;
                for(var i =0;i<len;i++){
                    cssSelectors1.push('[ytag="'+cssSelectors[i]+'"]');
                };
                tagObj.selector = cssSelectors1.join(',');
            }
            tagObj.$dom = $(tagObj.selector);/*NOTE:发现ytag用的很滥，同一个ytag用在多个链接上*/
            tagObj.top = (tagObj.$dom.offset()||{top:0}).top;

            /*获取每个元素的位置、高宽信息*/
            tagObj.$dom.each(function(i,o){
                o = $(o);
                o.data('xdatadim',J.data.getItemDimension(o));
            });
            return tagObj;
        },
        _init:function(){
            J.$win.bind(J.ui.EVT.ModChartReset,function(e){
                p.main.reset();
            }).bind(J.ui.EVT.ModRankRendered,function(e){
                if(p.main.activeNodeCssSelector){
                    $(p.main.activeNodeCssSelector).trigger('click.ytag');
                };
            }).bind(J.ui.EVT.ModChartHidden,function(e){
                p.main.activeNodeCssSelector = null;
            });
            $('[data-ytag]').live('click.ytag',function(e,d){
                p.main.onClickYTagTrigger(this,d);
            }).live('mouseenter.ytag',function(e,d){
                p.main.onHoverIn(this,d);
            });
        },
        reset:function(t){
            var clOn = 'data_list_lk_on';
            if(this.$ytagTrigger){
                this.$ytagTrigger.removeClass(clOn);
            }
            this.$ytagTrigger=null;
            this.hideCovers();
        },
        onHoverIn:function(elmTrigger,d){
            var ytagData = J.ytag.get(elmTrigger.getAttribute('data-id'));

            J.$body.stop().animate({
                scrollTop:ytagData.top
            },'fast',function(){
                p.main.showCover(ytagData);
            });
        },
        onClickYTagTrigger:function(elmTrigger,d){
            var clOn = 'data_list_lk_on';
            if(this.$ytagTrigger){
                this.$ytagTrigger.removeClass(clOn);
            }
            this.$ytagTrigger = $(elmTrigger);
            this.$ytagTrigger.addClass(clOn);
            this.activeNodeCssSelector = '#'+elmTrigger.id;

            var ytagData = J.ytag.get(elmTrigger.getAttribute('data-id'));
            ytagData.treePath = pub.getTreePath();
            $.extend(ytagData,d||{});

            J.modchart.show(ytagData,p.main.$ytagTrigger);
        },
        _showCover:function(id,dim,hideOthers){
            if(hideOthers){
                this.hideCovers();
            }
            var coverId = '#xdataCover'+id,
                $cover= $(coverId),
                cssProps={
                    position:'fixed',
                    top:0,
                    left:300,
                    right:0,
                    width:'auto',
                    height:'auto',
                    color:'red'
                },
                isHidden = dim.isHidden;
            var coverTip = dim.alias+(isHidden?','+i18n.t('tip.hidden'):'');

            if($cover.length===1){
                $cover.removeClass('xdata_hidden');
                if(isHidden){
                    $cover.css(cssProps).find('.xdata_tagcover_bd').html(coverTip);
                }
                this.covers[id]=$cover;
                return;
            };
            J.$body.append(J.toHtml(this.coverTpl,{id:id,coverTip:coverTip}));
            cssProps = isHidden?cssProps:dim;
            this.covers[id] = $(coverId).css(cssProps);
        },
        showCover:function(tagData){
            this.hideCovers();
            if(tagData.$dom.length==0){
                return;
            };
            var coverDim = null;
            tagData.$dom.each(function(i,o){
                o = $(o);
                coverDim = o.data('xdatadim');
                coverDim.isHidden = o.is(':hidden');
                coverDim.alias = tagData.alias;
                p.main._showCover((tagData.id+i),coverDim);
            });
        }
    };
    //get ytag's data
    pub.get = function(id){
        var data = J.modrank.getDataById(id);
        data = p.main.parseData(data);
        return data;
    };

    pub.reset = function(){
        p.main.reset();
    };

    pub.removeFromCache=function(id){
        cache[id]=null;
    };

    pub.getTreePath = function(){
        var path = p.main.$ytagTrigger.data('data-treepath');
        if(path){
            return path;
        };

        var path = [],
            $parents = p.main.$ytagTrigger.parents('.data_list_item'),
            len = $parents.length;

        $parents.each(function(i,o){
            path.splice(0,0,$parents.eq(i).data());
        });
        
        p.main.$ytagTrigger.data('data-treepath',path);
        return path;
    };

});