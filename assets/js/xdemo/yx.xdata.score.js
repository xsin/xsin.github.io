xData = {};
xData.score = (function(){
    var pub = {};

    /**
     * 威尔逊区间算法
     * （95%置信区间下，常数是1.96）
     * @param {Number} click 点击数
     * @param {Number} order 订单数
     */
    var _calRate = function(click,order){
        CONSTANT = 1.96;
        return (order / click + Math.pow(CONSTANT,2) / (2 * click) - CONSTANT * Math.sqrt( order / click * (1- order / click) / click + Math.pow(CONSTANT,2) / (4 * click * click))) / ( 1 + Math.pow(CONSTANT,2) / click);
    };

    /**
     * 预处理，计算数据最大值和平均值
     * @param {json} data 数据
     */
    var _preParseData = function(data){
        // 初始化变量
        maxRate = minRate = totalClick = totalOrder = avgRate = 0;

        for (var i = data.length - 1; i >= 0; i--) {
            rate = _calRate(data[i]['click_num'], data[i]['order_num']);
            // 获取最大值
            if (rate > maxRate) {
                maxRate = rate;
                maxIndex = i;
            }
            // 统计全部
            totalClick += data[i]['click_num'];
            totalOrder += data[i]['order_num'];
            // 计算平均值
            if (i == 0) {
                avgRate = _calRate(totalClick,totalOrder);
            };
        };
        return {
            // 返回最大值
            "maxRate": maxRate,
            // 返回平均值
            "avgRate": avgRate
        };
    };

    /**
     * 数据计算
     * @param {json} data 数据
     */
    var _parseData = function(data){
        // 数据预处理，获取最大值和平均值
        var preRate = _preParseData(data);
        
        // 初始化变量
        var output = [];

        for (var i = data.length - 1; i >= 0; i--) {
            rate = _calRate(data[i]['click_num'], data[i]['order_num']);
            // 模块健康度（数据平均值设为60分）
            grade60 = 60 / preRate['avgRate'] * rate;
            // 模块健康度（数据最大值设为90分）
            grade90 = 90 / preRate['maxRate'] * rate;
            // 判断id是否存在，不存在时用page_tag赋值
            data[i]["id"] == undefined || data[i]["id"] == "" ? data[i]["id"] = data[i]['page_tag'] : data[i]["id"] = data[i]["id"];
            // 拼装输出内容
            output.push(
                {
                    "id":data[i]['id'],
                    "click":data[i]['click_num'],
                    "order":data[i]['order_num'],
                    "rate":rate,
                    "grade60":grade60,
                    "grade90":grade90
                }
            );
        }
        return output;
    };

    /**
     * 转化率百分比计算
     * @param {number} avgRate 平均转化率
     * @param {number} rate 当前点转化率
     * @param {number} weight 位置权重
     */
    var _calRateSimple = function(avgRate,rate,weight){
        if(avgRate==0){
            return 100;
        };
        weight == undefined || weight == "" ? weight = 1 : weight = weight;
        return 60 / avgRate * rate * weight;
    }

    pub.init = function(avgRate,rate,weight){
        // return _parseData(data);
        return _calRateSimple(avgRate,rate,weight);
    };

    return pub;
})();