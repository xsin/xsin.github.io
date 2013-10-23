/* S 热区 */
J(function($,p,pub){
    pub.id="heatmap";
    var $body = J.$body;
    //heatmap
    p.heatmap = {
        isRender:false,
        instance:null,
        _init:function(){
            J.$win.bind(J.ui.EVT.UIReady,function(e){
                $('#xdataBtnHeatmap').bind('click',function(e){
                    if(!p.heatmap.isRender){
                        p.heatmap.render();
                    }
                    p.heatmap.toggleDisplay();
                });
            });
        },
        toggleDisplay:function(){
            this.instance&&this.instance.toggleDisplay();
        },
        fixPosition:function(){
            var offset = $(this.instance.target).offset(),
                canvasObj = this.instance.get('canvas');
            canvasObj.style.left=offset.left+'px';
            canvasObj.style.top=offset.top+'px';
        },
        getData:function(){

            //max-坐标的最大点击数
            //data-坐标点击数据。
            //data.x - x坐标值
            //data.y - y坐标值
            //data.count - 该坐标的点击数总和

            //注意：由于屏幕分辨率的影响，坐标的x/y必须是相对于主体内容的值
            //例如：首页首屏的点击坐标值应该是相对于grid_c1的

            var d={
                max: 90, 
                data: [
                {x: 100, y: 100, count: 80},
                {x: 120, y: 120, count: 60},
                {x: 100, y: 80, count: 90},
                {x: 111, y: 110, count: 60},
                {x: 201, y: 150, count: 90},
                {x: 311, y: 110, count: 60},
                {x: 121, y: 510, count: 70},
                {x: 511, y: 110, count: 60},
                {x: 211, y: 110, count: 50},
                {x: 191, y: 110, count: 20},
                {x: 511, y: 110, count: 40}
            ]};

            var rdCnt = 1000,
                maxX = 1190,
                maxY = 2000,
                maxCnt=100;

            d.max = maxCnt;

            for(var i=0;i<rdCnt;i++){
                d.data.push({
                    x:Math.floor(Math.random()*maxX+1),
                    y:Math.floor(Math.random()*maxY+1),
                    count:Math.floor(Math.random()*maxCnt+1)
                });
            }
            return d;
        },
        render:function(){
            //cfg
            //由于用户屏幕大小差异，element元素必须是相对于主体内容容器
            var target = $('.ic_content .grid_c1')[0];
            var cfg = {
                "element":target, 
                "radius":25, 
                "visible":false
            };
            //heatmap
            var hm1 = h337.create(cfg);
            hm1.get("canvas").onclick = function(ev){
                var pos = h337.util.mousePosition(ev);
                hm1.store.addDataPoint(pos[0],pos[1]);
            };
            hm1.target=target;
            //demo data
            var data = this.getData();
            // call the heatmap's store's setDataSet method in order to set static data
            hm1.store.setDataSet(data);
            this.isRender=true;
            this.instance=hm1;
            //position fix
            this.fixPosition();
        }
    };

});