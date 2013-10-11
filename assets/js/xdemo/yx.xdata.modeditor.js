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
            J.$win.bind(J.ui.EVT.UIReady,function(e){
                p.modEditor.$d = $('#xdataPop2');
                p.modEditor.$name = $('#xdataPop2Ipt1');
                p.modEditor.$value = $('#xdataPop2Ipt2');
                p.modEditor.$tip = $('#xdataPop2Tip');
                p.modEditor.uiOffsetTop = J.ui.getPosition().top;
                //update
                $('#xdataPop2Btn1').bind('click',function(e){
                    var isOk = p.modEditor.save(this.rel);
                    if(isOk){
                        p.modEditor.hide();
                    }
                });
                //delete
                $('#xdataPop2Btn2').bind('click',function(e){
                    p.modEditor.delete(this.rel);
                    p.modEditor.hide();
                });

                //add new
                $('#xdataAddCTag').bind('click',function(e){
                    p.modEditor.show({
                        id:'',
                        alias:'',
                        ytagSelector:''
                    },$(this),true);
                });

                $('#xdataPop2Close').bind('click',function(e){
                    p.modEditor.hide();
                });

            }).bind(J.ui.EVT.Collapse,function(e){
                p.modEditor.hide();
            }).bind('resize.modEditor',function(e){
                p.modEditor.updatePosition();
            });

            $('.data_btn_edit').live('click',function(e){
                //tagData,$trigger,isCustomYTag
                var $trigger = $(this).parents('.data_list_entry'),
                    isCustomYTag = $trigger.find('.data_list_lk')[0].getAttribute('data-ytagattr')=='ctag';
                p.modEditor.show(J.data.getCTag(this.rel),$trigger,isCustomYTag);
                return false;
            });

        },
        showTip:function(txt,duration){
            clearTimeout(this.tipTimer);
            if(!txt){
                this.$tip.addClass('xdata_hidden');
                return;
            };
            this.$tip.removeClass('xdata_hidden');
            this.$tip.html('<span class="xdata_error">'+txt+'</span>');
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
                this.showTip('模块名称和ytag选择器均不能为空！',3000);
                return false;
            };
            var $tempDom = null;
            //获取关联的ytag
            if(d.ytagSelector.indexOf('.')!=-1 || d.ytagSelector.indexOf('#')!=-1){
                //css选择器
                $tempDom = $(d.ytagSelector);
                if($tempDom.length===0){
                    this.showTip('ytag选择器必须是有效的css选择器，或则是以|分隔的有效的ytag id！',3000);
                    return false;
                };
                J.data.saveCTag(d);
                return true;
            };
            //ytag id，|分隔
            if( d.ytagSelector.indexOf('|')==-1 && (!/^[0-9]+$/.test(d.ytagSelector)) ){
                this.showTip('ytag选择器必须是有效的css选择器，或则是以|分隔的有效的ytag id！',3000);
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
                this.showTip('ytag选择器必须是有效的css选择器，或则是以|分隔的有效的ytag id！',3000);
                return false;
            };
            d.type=2;
            J.data.saveCTag(d);
            return true;
        },
        show:function(tagData,$trigger,isCustomYTag){
            var clEditOn = 'data_list_entry_editing';
            if(this.$trigger){
                this.$trigger.removeClass(clEditOn);
            }

            this.isCustomYTag = isCustomYTag||false;
            this.tagData=tagData;
            this.$trigger=$trigger.addClass(clEditOn);
            this.$d.removeClass('xdata_hidden');
            this.isVisible=true;
            this.updatePosition();
            this.loadData(tagData);
        },
        hide:function(){
            this.$d.addClass('xdata_hidden');
            this.$name[0].value = '';
            this.$value[0].value = '';
            this.isVisible=false;
            var clEditOn = 'data_list_entry_editing';
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
            if($trigger){
                bottom = J.$win.height()-($trigger.offset().top-J.ui.getOffset().top)-29/* 箭头的位置 */-$trigger.outerHeight()/2 - p.modEditor.uiOffsetTop;
            }
            this.$d.css({
                bottom:bottom
            });
        },
        loadData:function(tagData){
            this.$name[0].value = tagData.alias;
            this.$value[0].value = tagData.ytagSelector;
            document.getElementById('xdataPop2Btn1').rel = document.getElementById('xdataPop2Btn2').rel = tagData.id;
            if(tagData.readonly){
                this.$d.addClass('xdata_readonly');
            }else{
                this.$d.removeClass('xdata_readonly');
            }
        }
    };

});