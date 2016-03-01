import BarchartComponent from './BarchartComponent/BarChartComponent'

$(function(){
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

    var barchart = new BarchartComponent('barchart');
    barchart.draw(defaultData);

    $('#bar-data').val(JSON.stringify(defaultData));

    $('#submit-btn').click(function(){
        var barData = JSON.parse($('#bar-data').val());
        barchart.draw(barData);
    })
});