import React from 'react';
import { XYPlot ,XAxis, YAxis, LineSeries, VerticalGridLines, HorizontalGridLines, VerticalBarSeries } from 'react-vis'

export class OrderChart extends React.Component{
    constructor(){
        super();
    }
    render(){
        this.data = [
            { x: 1, y: 1 },
            { x: 1, y: 10 },
            { x: 2, y: 4 },
            { x: 3, y: 9 },
            { x: 4, y: 1 },
            { x: 5, y: 7 },
            { x: 6, y: 6 },
            { x: 7, y: 3 },
            { x: 8, y: 2 },
            { x: 9, y: 0 }
        ];
        return(
            <XYPlot height={300} width={300}>
                {/* <LineSeries data={this.data} /> */}
                <VerticalBarSeries data={this.data} />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
            </XYPlot>
        )
    }
}