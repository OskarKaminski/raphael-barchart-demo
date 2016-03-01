System.register(['./config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config_1;
    var BarchartComponent;
    return {
        setters:[
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            BarchartComponent = (function () {
                function BarchartComponent(domID, config) {
                    console.log({ "simpleLineAttrs": config_1.simpleLineAttrs });
                    this.config = {};
                    Object.assign(this.config, config_1.defaults, config);
                    this.paper = Raphael(domID, this.config.paperWidth, 1);
                }
                BarchartComponent.prototype.getFullHeight = function () {
                    return this.getInternalHeight() + this.config.axisPadding * 3;
                };
                BarchartComponent.prototype.draw = function (bars) {
                    var _this = this;
                    this.paper.clear();
                    this.bars = bars;
                    this.internalHeight = this.getInternalHeight();
                    this.fullHeight = this.getFullHeight();
                    this.horizontalOffset = this.getHorizontalOffset();
                    this.maxValue = this.getMaxValue();
                    this.paper.setSize(this.config.paperWidth, this.fullHeight);
                    this.drawAxes();
                    this.drawHorizontalAxisLables();
                    _.forEach(this.bars, function (elem, key) {
                        _this.drawBar(elem, key);
                        _this.drawVerticalLabels(elem, key);
                    });
                };
                BarchartComponent.prototype.drawBar = function (elem, index) {
                    var barInstance;
                    this.paper.rect(this.horizontalOffset, this.getBarVerticalPosition(index), this.getBarWidth(elem.value), this.config.barHeight).attr({
                        'stroke-width': this.config.strokeWidth,
                        'fill': this.config.color,
                        'fill-opacity': this.config.fillOpacity
                    });
                };
                BarchartComponent.prototype.drawVerticalLabels = function (elem, index) {
                    var label = this.paper.text(this.getLabelHorizontalPosition(elem.value) + this.horizontalOffset, this.getLabelVerticalPosition(index), elem.value);
                    label.attr({
                        'fill': '#fff',
                        'font-size': 14,
                        'font-family': "'League Gothic', 'Futura-CondensedMedium', 'sans-serif'"
                    });
                    var title = this.paper.text(this.config.labelsWidth / 2, this.getLabelVerticalPosition(index), elem.name);
                    title.attr({
                        'fill': '#000',
                        'font-size': 14,
                        'font-family': "'League Gothic', 'Futura-CondensedMedium', 'sans-serif'"
                    });
                };
                BarchartComponent.prototype.drawHorizontalAxisLables = function () {
                    for (var i = 0; i <= 100; i += 10) {
                        this.paper.text(this.horizontalOffset + (this.config.paperWidth - this.horizontalOffset) * i / 100, this.addAxisPadding(this.internalHeight) + 10, i + "%").attr({
                            'fill': '#000',
                            'font-size': 14,
                            'font-family': "'League Gothic', 'Futura-CondensedMedium', 'sans-serif'"
                        });
                    }
                };
                BarchartComponent.prototype.getBarWidth = function (value) {
                    return value / this.maxValue * (this.config.paperWidth - this.horizontalOffset);
                };
                BarchartComponent.prototype.getBarVerticalPosition = function (index) {
                    return (this.config.barHeight + this.config.barPadding) * index;
                };
                BarchartComponent.prototype.getLabelVerticalPosition = function (index) {
                    return this.getBarVerticalPosition(index) + this.config.barHeight / 2;
                };
                BarchartComponent.prototype.getLabelHorizontalPosition = function (value) {
                    return this.getBarWidth(value) / 2;
                };
                BarchartComponent.prototype.drawAxes = function () {
                    this.drawHorizontalAxis();
                    this.drawVerticalAxis();
                };
                BarchartComponent.prototype.drawHorizontalAxis = function () {
                    this.paper.rect(this.config.labelsWidth, 0, 1, this.addAxisPadding(this.internalHeight)).attr(config_1.simpleLineAttrs);
                };
                BarchartComponent.prototype.drawVerticalAxis = function () {
                    this.paper.rect(this.config.labelsWidth, this.addAxisPadding(this.internalHeight), this.config.paperWidth - this.config.labelsWidth, 1).attr(config_1.simpleLineAttrs);
                };
                BarchartComponent.prototype.addAxisPadding = function (value) {
                    return value + this.config.axisPadding;
                };
                BarchartComponent.prototype.getInternalHeight = function () {
                    return this.bars.length * (this.config.barHeight + this.config.barPadding) - this.config.barPadding;
                };
                BarchartComponent.prototype.getMaxValue = function () {
                    return _.maxBy(this.bars, function (o) {
                        return o.value;
                    }).value;
                };
                BarchartComponent.prototype.getHorizontalOffset = function () {
                    return this.config.labelsWidth + this.config.axisPadding + 1;
                };
                return BarchartComponent;
            }());
            exports_1("default", BarchartComponent);
        }
    }
});
