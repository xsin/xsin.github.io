define(function(require){
    require.async('jquery.tagclound',function(){
        $(document).ready(function(){
            $('#tag_cloud a').tagcloud({
                size: {start: 1, end: 1, unit: 'em'},
                color: {start: '#a9d0f5', end: '#ff3333'}
            });
        });
    });
    
});