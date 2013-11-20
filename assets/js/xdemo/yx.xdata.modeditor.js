J(function($,p,pub){

    pub.id= "modeditor";

    //mod editor
    p.modEditor = {
        $d:null,
        $name:null,
        $value:null,
        $trigger:null,
        tagData:null,
        isVisible:false,
        isCustomYTag:false,
        tipTimer:null,
        _init:function(){
            
            p.modEditor.$d = $('#dataPop2');
            p.modEditor.$name = $('#dataPop2Ipt1');
            p.modEditor.$value = $('#dataPop2Ipt2');
            p.modEditor.$tip = $('#dataPop2Tip');
            //update
            $('#dataPop2Btn1').bind('click',function(e){
                var isOk = p.modEditor.save(this.rel);
                if(isOk){
                    p.modEditor.hide();
                }
            });
            //delete
            $('#dataPop2Btn2').bind('click',function(e){
                p.modEditor.delete(this.rel);
                p.modEditor.hide();
            });

            //add new
            $('#dataAddCTag').bind('click',function(e){
                p.modEditor.show({
                    id:'',
                    alias:'',
                    ytagSelector:''
                },$(this),true);
            });

            $('#dataPop2Close').bind('click',function(e){
                p.modEditor.hide();
            });

            J.$win.bind(J.ui.EVT.Collapse,function(e){
                p.modEditor.hide();
            }).bind('resize.modEditor',function(e){
                p.modEditor.updatePosition();
            }).bind(J.ui.EVT.UIScroll,function(e,stop){
                p.modEditor.updatePosition(stop);
            });

            $('.data_btn_edit').live('click',function(e){
                //tagData,$trigger,isCustomYTag
                var $trigger = $('#dataCTag'+this.rel),
                    isCustomYTag = $trigger.find('.data_list_lk')[0].getAttribute('data-ytagattr')=='ctag';
                p.modEditor.show(J.data.getCTag(this.rel),$trigger,isCustomYTag);
                return false;
            });

        },
        showTip:function(txt,duration){
            clearTimeout(this.tipTimer);
            if(!txt){
                this.$tip.addClass('data_hidden');
                return;
            };
            this.$tip.removeClass('data_hidden');
            this.$tip.html('<span class="data_error">'+txt+'</span>');
            if(duration){
                this.tipTimer = setTimeout(function(){
                    p.modEditor.showTip(null);
                },duration);
            }
        },
        delete:function(id){
            J.data.deleteCTag(id);
        },
        save:function(id){
            var d = {
                id:id,
                alias:$.trim(this.$name.val()),
                ytagSelector:$.trim(this.$value.val()),
                isCustomYTag:this.isCustomYTag,
                type:1//1为类名，2为id列表
            };
            if(d.alias.length==0||d.ytagSelector.length==0){
                this.showTip(i18n.t('tip.modNameValueRequired'),3000);
                return false;
            };
            var $tempDom = null;
            //获取关联的ytag
            if(d.ytagSelector.indexOf('.')!=-1 || d.ytagSelector.indexOf('#')!=-1){
                //css选择器
                $tempDom = $(d.ytagSelector);
                if($tempDom.length===0){
                    this.showTip(i18n.t('tip.modNameValueRule'),3000);
                    return false;
                };
                J.data.saveCTag(d);
                return true;
            };
            //ytag id，|分隔
            if( d.ytagSelector.indexOf('|')==-1 && (!/^[0-9]+$/.test(d.ytagSelector)) ){
                this.showTip(i18n.t('tip.modNameValueRule'),3000);
                return false;
            };
            var tags = d.ytagSelector.split('|'),
                isValid = true,
                len = tags.length;
            for(var i =0;i<len;i++){
                if(!(/^[0-9]+$/.test(tags[i])) ){
                    isValid=false;
                    break;
                }
            };//for
            if(!isValid){
                this.showTip(i18n.t('tip.modNameValueRule'),3000);
                return false;
            };
            d.type=2;
            J.data.saveCTag(d);
            return true;
        },
        show:function(tagData,$trigger,isCustomYTag){
            var clEditOn = 'data_list_item_editing';
            if(this.$trigger){
                this.$trigger.removeClass(clEditOn);
            }

            this.isCustomYTag = isCustomYTag||false;
            this.tagData=tagData;
            this.$trigger=$trigger.addClass(clEditOn);
            this.$d.removeClass('data_hidden');
            this.isVisible=true;
            this.updatePosition();
            this.loadData(tagData);
        },
        hide:function(){
            if(!this.isVisible){
                return;
            };
            this.$d.addClass('data_hidden');
            this.$name[0].value = '';
            this.$value[0].value = '';
            this.isVisible=false;
            var clEditOn = 'data_list_item_editing';
            if(this.$trigger){
                this.$trigger.removeClass(clEditOn);
            }
            this.$trigger=null;
        },
        updatePosition:function(){
            if(!this.isVisible){
                return;
            };
            var bottom = 0,
                $trigger = this.$trigger;
            
            bottom = this.getOffsetBottom($trigger);

            if($trigger){
                bottom = bottom-29/* 箭头的位置 */-$trigger.outerHeight()/2 ;
            }
            this.$d.css({
                bottom:bottom
            });
        },
        getOffsetBottom:function($dom){
            if(!$dom){
                return 0;
            };
            var bottom = J.$win.height()-($dom.offset().top - J.$win.scrollTop());
            //console.log(bottom);
            return bottom;
        },
        loadData:function(tagData){
            this.$name[0].value = tagData.alias;
            this.$value[0].value = tagData.ytagSelector;
            document.getElementById('dataPop2Btn1').rel = document.getElementById('dataPop2Btn2').rel = tagData.id;
            if(tagData.readonly){
                this.$d.addClass('data_readonly');
            }else{
                this.$d.removeClass('data_readonly');
            }
        }
    };

});