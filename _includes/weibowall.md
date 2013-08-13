<!-- S weibowall -->
<div id="qqweiboWall" class="weibowall">
    <iframe id="qqweiboWallFrame" frameborder="0" scrolling="auto" src="javascript:void(0)" style="display:none;"></iframe>
</div>
<script type="text/javascript">
iScripts.push({
    url:location.href,
    height:400,
    /*o=2 no title,3 has title,4 only input,5.title+input. default 39*/
    o:4,
    css:'545454_FFFFFF_CDFF9C_FFFFFF_007500_333333',
    title:'{{ page.title }}',
    src:'http://wall.v.t.qq.com/index.php?c=wall&a=index&ak=801396726&w=$1&h=$2&n=&s=4&o=$3&cs=$4',
    _onLoad:function(){
        this.src+="&t="+encodeURIComponent(this.title)+"&url="+this.url;
        var $wall = $('#qqweiboWall'),
            $frame = $('#qqweiboWallFrame'),
            w = $wall.width(),
            h = $wall.height();
        h = h<100?this.height:h;
        this.src = this.src.replace('$1',w)
                        .replace('$2',h)
                        .replace('$3',this.o)
                        .replace('$4',this.css);

        $frame[0].src=this.src;
        $frame.css({
            width:w,
            height:h,
            display:'block'
        });
    }
});
</script>
<!-- E weibowall -->