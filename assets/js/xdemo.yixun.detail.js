G.ABTest = (function($){
    var pub = {},cache={};
    
    //概率分布预处理计算结果。预处理过程涉及循环运算，在数量巨大的概率执行过程中，将预处理结果缓存有助于提升性能
    var _randomExecProbasAssert = function(probas){
        var key = probas.join('_'),ar;
        if( (ar=cache[key]) ){
            return ar;
        };
        ar = [];
        var i,sum = 0;

        for (i=0 ; i<probas.length-1 ; i++) // notice the '-1'
        {
          sum += (probas[i] / 100.0);
          ar[i] = sum;
        };
        cache[key]=ar;
        return ar;
    };

    /**
     * 随机概率执行函数
     * @param {Array} probas 概率分布数组如:[20,80]
     * @param {Array} funcs 概率回调函数数组，如[function(){return 0;},function(){return 1;}]
     */
    pub.randomExec = function(probas,funcs){
        var ar = _randomExecProbasAssert(probas);
        var i= 0,
            len=ar.length;
        // Then we get a random number and finds where it sits inside the probabilities 
        // defined earlier
        var r = Math.random(); // returns [0,1]
        for (i=0 ; i<len && r>=ar[i] ; i++);

        // Finally execute the function and return its result
        return (funcs[i])();
    };
    /**
     * Test for randomExec
     */
    pub.randomExecTest = function(repeatCnt){
        repeatCnt = repeatCnt||50000;
        //define
        function a () { return 0; }
        function b () { return 1; }
        function c () { return 2; }

        var probas = [ 20, 70, 10 ]; // 20%, 70% and 10%
        var funcs = [ a, b, c ]; // the functions array

        var count = [ 0, 0, 0 ];

        for (var i=0 ; i<repeatCnt ; i++)
        {
            count[pub.randomExec(probas,funcs)]++;
        }

        var s = [];
        var f = [ "a", "b", "c" ];

        probas.push('');
        s.push('概率：'+probas.join('%,'));
        s.push('测试次数：'+repeatCnt);
        s.push('测试结果：');

        for (var i=0 ; i<3 ; i++)
            s.push( (f[i] + ' = ' + count[i]+'['+ (count[i]*100/repeatCnt).toFixed(2) +'%]' ) );


        alert(s.join('\r\n'));

    };
    return pub;
})(jQuery);


/**
 *实际应用测试
 * 1.yixun.com首页的每日抢购模块-默认是现实当天抢购，用户点击后显示第二天抢购
 * 我们可以模拟做一个ABTest：30%的概率显示当天抢购，70%显示第二天抢购
 * 2.商详产品介绍楼层：默认30%是边栏在右，70%在左边
 */
G.ABTest.randomExec([30,70],[function(){
    //默认：30%的概率显示当天抢购
    //$('#j_daily_hd,.daily_hd_next').hide().eq(0).fadeIn();
},function(){
    //首页：70%显示第二天抢购
    $('#j_daily_hd,.daily_hd_next').hide().eq(1).fadeIn();
    $('.daily_goods').hide().eq(1).fadeIn().find('img').each(function(i,o){
        o.src = o.getAttribute('_src')||o.src;
    });
    //商详：70%边栏在左边
    $('.xcontent_row4').removeClass('grid_c2b').addClass('grid_c2a');
}]);