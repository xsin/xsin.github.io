J('ytagExt',function(M,V,C){

	C.feeling = {
		_init:function(){
			J.$win.bind(J.EVT.uiXData.UIReady,function(e){
				C.feeling.onUIReady();
			});
		},

		onUIReady:function(){
			//console.log(J.data.CurrentClickData);
			//J.data.getClickDataById('92000');
			var ytagStatus=false;

			$(".mod_subcate_main").bind({
				dblclick:function(){
					var $target=$(this).find("a");

					if(ytagStatus==false){
						for(var i=0; i<$target.length; i++){
							var $this=$($target[i]);
							var ytag=$this.attr("ytag");
							if(ytag != undefined){
								$this.append("<span>("+J.data.getClickDataById(ytag).click_num+")</span>")
							}
						}
						ytagStatus=true;
					}else{
						$target.find("span").remove();
						ytagStatus=false;
					}
					//for(i in $target){
						//var ytag=$($target[i]).attr("ytag");
						//console.info(ytag);
						//if(ytag != undefined){
							//J.data.getClickDataById("'" + ytag + "'")
						//}
					//}
				},
			});
		}
	};

});