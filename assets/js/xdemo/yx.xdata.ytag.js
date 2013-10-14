/* S YTAG */
J(function($,p,pub){
    pub.id="ytag";
    var cache = {},
    $ytags;
    p.main = {
        coverTpl:J.heredoc(function(){/*
            <div id="xdataCover{{id}}" class="xdata_tagcover">
                <div class="xdata_tagcover_bg"></div>
                <div class="xdata_tagcover_bd">{{coverTip}}</div>
            </div>
        */}),
        covers:{},
        $ytagTrigger:null,
        hideCovers:function(){
            for(var c in this.covers){
                this.covers[c].addClass('xdata_hidden');
            }
        },
        //将单个ytag或_ytag添加到缓存中
        addToCache:function($o,attrName){
            if($o.length===0){
                return null;
            }
            attrName = attrName||'ytag';
            var $parent = $o.parent(),
                off = $o.offset(),
                ytag = $o[0].getAttribute(attrName),
                data = {
                    id:(attrName+ytag),
                    ytagAttr:attrName,
                    ytagid:ytag,
                    $dom:$o,
                    title:$.trim($o[0].title),
                    text:$.trim($o.text()),
                    href:$o[0].href,
                    selector:('[$="'+ytag+'"]').replace('$',attrName)
                };
            $.extend(data,J.data.getItemDimension($o)||{});
            data.text=data.text.length===0?(data.title.length===0?'[!!无标题!!]':data.title):data.text;
            data.ytags=this.getRelatedYTags($o,ytag,attrName);
            cache[data.id] = data;
            return data;
        },
        //将自定义的单元添加到缓存
        addCTagToCache:function(ctag){
            var isCustomTagWithCssSelector = (ctag.indexOf('#')!=-1 || ctag.indexOf('.')!=-1),
                cssSelectors = [],
                cssSelectors1 = [],
                len=0,
                ctagid = this.getCacheKey(ctag,'ctag'),
                data = {
                    id:ctagid,
                    selector:''
                };

            if(isCustomTagWithCssSelector){
                cssSelectors = ctag.split(',');
                len = cssSelectors.length;
                data.selector = ctag;
            }else{
                cssSelectors = ctag.split('|');
                len = cssSelectors.length;
                for(var i =0;i<len;i++){
                    cssSelectors1.push('[ytag="'+cssSelectors[i]+'"]');
                };
                data.selector = cssSelectors1.join(',');
            }
            data.$dom = $(data.selector);//NOTE:发现ytag用的很滥，同一个ytag用在多个链接上
            data.ytags=this.getRelatedYTags(data.$dom,ctag,'ctag',isCustomTagWithCssSelector);
            data.isCustom=true;
            data.top = (data.$dom.offset()||{top:0}).top;

            //获取每个元素的位置、高宽信息
            data.$dom.each(function(i,o){
                o = $(o);
                o.data('xdatadim',J.data.getItemDimension(o));
            });

            cache[data.id] = data;
            return data;
        },
        getRelatedYTags:function($tag,ytag,attrName,isCustomTagWithCssSelector){
            var tags = [],
                isCustomTag = (attrName==='ctag'),
                tempCache={};
            if (attrName==='_ytag') {
                $tag.find('[ytag]').each(function(i1,o1){
                    o1 = o1.getAttribute('ytag');
                    if(!tempCache[o1]){
                        tags.push(o1);
                        tempCache[o1]=true;
                    }
                    
                });
                return tags;
            };
            if(!isCustomTag){
                tags.push(ytag);
                return tags;
            };

            if(!isCustomTagWithCssSelector){
                tags = tags.concat(ytag.split('|'));
                return tags;
            };

            $tag.find('[ytag]').each(function(i1,o1){
                o1 = o1.getAttribute('ytag');
                if(!tempCache[o1]){
                    tags.push(o1);
                    tempCache[o1]=true;
                }
            });
            $tag.each(function(i1,o1){
                o1 = o1.getAttribute('ytag');
                if( o1 && (!tempCache[o1]) ){
                    tags.push(o1);
                    tempCache[o1]=true;
                }
            });
            return tags;
        },
        _init:function(){
            J.$win.bind(J.ui.EVT.ModChartReset,function(e){
                p.main.reset();
            });
            $('[data-ytag]').live('click',function(e,d){
                p.main.onClickYTagTrigger(this,d);
            }).live('mouseenter.ytag',function(e,d){
                p.main.onHoverIn(this,d);
            });
            $ytags = $('[ytag]');
            pub.rockAndRollAll();
        },
        reset:function(t){
            var clOn = 'data_list_entry_on';
            if(this.$ytagTrigger){
                this.$ytagTrigger.parent().removeClass(clOn);
            }
            this.$ytagTrigger=null;
            this.hideCovers();
        },
        onHoverIn:function(elmTrigger,d){
            var ytagData = J.ytag.get(elmTrigger.getAttribute('data-ytag'),elmTrigger.getAttribute('data-ytagattr'));

            J.$body.stop().animate({
                scrollTop:ytagData.top
            },'fast',function(){
                p.main.showCover(ytagData);
            });
        },
        onClickYTagTrigger:function(elmTrigger,d){
            var clOn = 'data_list_entry_on';
            if(this.$ytagTrigger){
                if(this.$ytagTrigger[0].id===elmTrigger.id){
                    return;
                };
                this.$ytagTrigger.parent().removeClass(clOn);
            }
            this.$ytagTrigger = $(elmTrigger);
            this.$ytagTrigger.parent().addClass(clOn);

            var ytagData = J.ytag.get(elmTrigger.getAttribute('data-ytag'),elmTrigger.getAttribute('data-ytagattr'));
            ytagData.val = elmTrigger.getAttribute("data-val");
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
                    left:0,
                    right:401,
                    width:'auto',
                    height:'auto',
                    color:'red'
                },
                isHidden = dim.isHidden;
            var coverTip = dim.selector+(isHidden?',当前处于隐藏状态...':'');

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
            if(tagData.isCustom){
                this.showCTagCover(tagData);
                return;
            };

            var coverDim = {
                top:tagData.top,
                left:tagData.left,
                width:(tagData.width>tagData.parentWidth?tagData.parentWidth:tagData.width),
                height:(tagData.height>tagData.parentHeight?tagData.parentHeight:tagData.height),
                isHidden:tagData.$dom.is(':hidden'),
                selector:tagData.selector
            };
            if(coverDim.isHidden){
                pub.removeFromCache(tagData.id);
            }
            this._showCover(tagData.id,coverDim,true);
        },
        showCTagCover:function(tagData){
            this.hideCovers();
            if(tagData.$dom.length==0){
                return;
            };
            var coverDim = null;
            tagData.$dom.each(function(i,o){
                o = $(o);
                coverDim = o.data('xdatadim');
                coverDim.isHidden = o.is(':hidden');
                coverDim.selector = o[0].id||o[0].className||(tagData.id+i);
                p.main._showCover(p.main.getCacheKey(coverDim.selector,'ctag'),coverDim);
            });
        },
        getCacheKey:function(ytag,attrName){
            var isCTag = attrName==='ctag';
            if(!isCTag){
                return (attrName+ytag);
            }
            //将“#,.|空格”全部换成-
            var ctagid = ytag.replace(/[#,\.\| +?]/gi,'-');
            return (attrName+ctagid);
        }
    };
    //caculate all ytag's data
    pub.rockAndRollAll=function(){
        $ytags.each(function(i,o){
            p.main.addToCache($(o));
        });
    };
    //get ytag's data
    pub.get = function(ytag,attrName){
        attrName = attrName||'ytag';
        var isCTag = attrName==='ctag',
            key = p.main.getCacheKey(ytag,attrName),
            data = null;

        if( (data=cache[key]) ){
            return data;
        }
        data = isCTag?p.main.addCTagToCache(ytag):p.main.addToCache($( ('[$="'+ytag+'"]').replace('$',attrName) ),attrName);
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
            len = $parents.length,
            $rootLi = null,
            rootLiData=null,
            pid=null;

        //最后一个li是否一级菜单，如果不是需要获取一级菜单
        pid = $parents.eq(len-1)[0].getAttribute('data-pid');
        if(pid){
            $rootLi = $('#xdataCTag'+pid);
        };

        $parents.each(function(i,o){
            path.splice(0,0,$parents.eq(i).data());
        });
        if($rootLi){
            rootLiData = $rootLi.data();
            rootLiData.isRoot = true;
            path.splice(0,0,rootLiData);
        };
        
        p.main.$ytagTrigger.data('data-treepath',path);
        return path;
    };

});