export interface IBarchartComponent{
    config: any
    paper: any;
    bars: IBar[];

    draw(bars: IBar[]): void;
    prepareModel(bars: IBar[]): void;
    drawBar(elem: IBar, index: number): void;
    drawVerticalLabels(elem: IBar, index: number): void;
    drawHorizontalAxisLables(): void;
    getBarWidth(barValue: number): number;
    getLabelVerticalPosition(index: number): number;
    getLabelHorizontalPosition(barValue: number): number;
    drawAxes(): void;
    drawHorizontalAxis(): void;
    drawVerticalAxis(): void;
    addAxisPadding(padding: number): number;
    getInternalHeight(): number;
    getMaxValue(): number;
    getHorizontalOffset(): number;
}

export interface IBar{
    name: string,
    value: number,
}
