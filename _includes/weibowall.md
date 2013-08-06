<!-- S weibowall -->
<div id="qqweiboWall" class="weibowall">
    <iframe id="qqweiboWallFrame" frameborder="0" scrolling="auto" src="javascript:void(0)" width="600" height="400"></iframe>
</div>
<script type="text/javascript">
(function() {
    var url = location.href,
        title='{{ page.title }}',
        src = 'http://wall.v.t.qq.com/index.php?c=wall&a=index&ak=801396726&w=600&h=400&n=&s=undefined&o=39';
        src+="&t="+encodeURIComponent(title)+"&url="+url;

        document.getElementById('qqweiboWallFrame').src=src;
})();
</script>
<!-- E weibowall -->