System.register(['./BarchartComponent/BarChartComponent'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BarChartComponent_1;
    return {
        setters:[
            function (BarChartComponent_1_1) {
                BarChartComponent_1 = BarChartComponent_1_1;
            }],
        execute: function() {
            $(function () {
                var defaultData = [
                    {
                        "value": 60,
                        "name": "Face It"
                    },
                    {
                        "value": 100,
                        "name": "ZappiStore"
                    },
                    {
                        "value": 10,
                        "name": "Ocado"
                    }
                ];
                var barchart = new BarChartComponent_1.default('barchart');
                barchart.draw(defaultData);
                $('#bar-data').val(JSON.stringify(defaultData));
                $('#submit-btn').click(function () {
                    var barData = JSON.parse($('#bar-data').val());
                    barchart.draw(barData);
                });
            });
        }
    }
});
