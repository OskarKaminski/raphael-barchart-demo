import _ from '../../bower_components/lodash/lodash'
import {defaults, simpleLineAttrs, labelAttrs} from './config'
import {IBarchartComponent, IBar} from "./Interfaces";

export default class BarchartComponent implements IBarchartComponent {

    paper:any;
    bars:IBar[];
    internalHeight:number;
    fullHeight:number;
    horizontalOffset:number;
    maxValue:number;

    constructor(domID, private config) {
        this.config = {};
        Object.assign(this.config, defaults, config);
        this.paper = Raphael(domID, this.config.paperWidth, 1);
    }

    draw(bars) {
        this.prepareModel(bars);

        this.drawAxes();
        this.drawHorizontalAxisLables();
        _.forEach(this.bars, (elem, key)=> {
            this.drawBar(elem, key);
            this.drawVerticalLabels(elem, key);
        });
    }

    prepareModel(bars) {
        this.paper.clear();
        this.bars = bars;
        this.internalHeight = this.getInternalHeight();
        this.fullHeight = this.getFullHeight();
        this.horizontalOffset = this.getHorizontalOffset();
        this.maxValue = this.getMaxValue();
        this.paper.setSize(this.config.paperWidth, this.fullHeight)
    }

    drawBar(elem, index) {
        this.paper.rect(
            this.horizontalOffset,
            this.getBarVerticalPosition(index),
            this.getBarWidth(elem.value),
            this.config.barHeight
        ).attr({
            'stroke-width': this.config.strokeWidth,
            'fill': this.config.color,
            'fill-opacity': this.config.fillOpacity
        });
    }

    drawVerticalLabels(elem, index) {
        this.paper.text(
            this.getLabelHorizontalPosition(elem.value) + this.horizontalOffset,
            this.getLabelVerticalPosition(index),
            elem.value
        ).attr(labelAttrs).attr({'fill': '#fff'});

        this.paper.text(
            this.config.labelsWidth / 2,
            this.getLabelVerticalPosition(index),
            _.truncate(elem.name, {length: 14})
        ).attr(labelAttrs);
    }

    drawHorizontalAxisLables() {
        for (let i = 0; i <= 100; i += 10) {
            this.paper.text(
                this.horizontalOffset + (this.config.paperWidth - this.horizontalOffset) * i / 100,
                this.addAxisPadding(this.internalHeight) + 10,
                `${i}%`
            ).attr(labelAttrs);
        }
    }

    getBarWidth(value) {
        return value / this.maxValue * (this.config.paperWidth - this.horizontalOffset);
    }

    getBarVerticalPosition(index) {
        return (this.config.barHeight + this.config.barPadding) * index;
    }

    getLabelVerticalPosition(index) {
        return this.getBarVerticalPosition(index) + this.config.barHeight / 2;
    }

    getLabelHorizontalPosition(value) {
        return this.getBarWidth(value) / 2;
    }

    drawAxes() {
        this.drawHorizontalAxis();
        this.drawVerticalAxis();
    }

    drawHorizontalAxis() {
        this.paper.rect(
            this.config.labelsWidth, 0, 1,
            this.addAxisPadding(this.internalHeight)
        ).attr(simpleLineAttrs);
    }

    drawVerticalAxis() {
        this.paper.rect(
            this.config.labelsWidth, this.addAxisPadding(this.internalHeight),
            this.config.paperWidth - this.config.labelsWidth,
            1
        ).attr(simpleLineAttrs);
    }

    addAxisPadding(value) {
        return value + this.config.axisPadding;
    }

    getInternalHeight() {
        return this.bars.length * (this.config.barHeight + this.config.barPadding) - this.config.barPadding;
    }

    getMaxValue() {
        return _.maxBy(this.bars, function (o) {
            return o.value;
        }).value;
    }

    getHorizontalOffset() {
        return this.config.labelsWidth + this.config.axisPadding + 1;
    }

    getFullHeight() {
        return this.getInternalHeight() + this.config.axisPadding * 3;
    }
}
