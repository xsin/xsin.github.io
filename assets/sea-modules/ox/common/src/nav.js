define(function(require){
    $(document).ready(function(){
        var $items = $('#nav>a'),
            $home = $items.eq(0);
        $items.each(function(i,o){
            if(i===0){
                return;
            }
            if(location.href.indexOf(o.getAttribute('href'))>0){
                o.className='current';
                $home.removeClass('current');
                return false;
            }
        });
    });
});