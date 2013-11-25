J('ytagExt',function(M,V,C){

    C.feeling = {
        _init:function(){
            J.$win.bind(J.EVT.uiXData.UIReady,function(e){
                C.feeling.onUIReady();
            });
        },
        onUIReady:function(){
            console.log(J.data.CurrentClickData);
        }
    };

});