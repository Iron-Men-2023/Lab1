import React, {Component, useState} from 'react';
import Chart from '../Chart'
import './Graph.css'
import * as CanvasJSReact from "canvasjs-react-charts";
import ResizePanel from "react-resize-panel";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function isNumber(str) {
    if (str.trim() === '') {
        return false;
    }

    return !isNaN(str);
}

class Graph extends Component {

    constructor(props) {
        super(props);
        this.generateDataPoints = this.generateDataPoints.bind(this);
        this.state = {
            dp: this.generateDataPoints(50),
            val: "",
            startVal: 0,
            endVal: 0,
            currX: 0,
            currY: 0,
            tmpX: 0,
            generated: false
        }
    }

    handleChange = event => {
        const {dp, val, startVal, endVal, currX, currY, tmpX} = this.state
        const dpLen = dp.length
        // console.log(dp)
        console.log(val)
        if (!this.state.generated)
        {
            let dpTemp = this.state.dp[this.state.dp.length-1].x+1
            this.state.tmpX = dpTemp
            this.state.currX = dpTemp
            // this.state.startVal = dpTemp
            this.state.generated = true
        }
        if(isNumber(val))
        {
            this.state.tmpX += 1
            this.state.currX = this.state.tmpX-1
            dp.push({x: this.state.currX, y: parseInt(val)});
            console.log(this.state.startVal, this.state.endVal, this.state.tmpX)
            this.setState(dp)
        }
        else{
            // this.state.dp = this.state.dp.push({x: this.state.dp[dpLen-1].x + 1,y: event.target.value});
            this.state.startVal = this.state.currX
            this.state.tmpX += 1
            this.state.endVal = this.state.tmpX
            console.log(this.state.startVal, this.state.endVal, this.state.tmpX)
        }
    };

    changeVal = event => {
        this.setState({val:event.target.value});
    }

    generateDataPoints(noOfDps) {
        let xVal = 1, yVal = 100;
        const dps = [];
        for(let i = 0; i < noOfDps; i++) {
            yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
            dps.push({x: xVal,y: yVal});
            xVal++;
        }
        return dps;
    }

    render() {
        let val = this.state.dp
        let endVal = this.state.endVal
        let startVal = this.state.startVal
        const options = {
            theme: "light2", // "light1", "dark1", "dark2"
            zoomEnabled: true,
            zoomAndPan: true,
            maintainAspectRatio: false,
            title: {
                text: "Try Zooming and Panning"
            },
            axisX: {
                title: "Temp",
                minimum: 0,
                maximum: 100,
                scale: 1,
                labelAutoFit: false,
                valueFormatString: "###0.##",
                scaleBreaks: {
                    type: "wavy",
                    customBreaks: [{
                        lineThickness: (endVal - startVal),
                        startValue: startVal,
                        endValue: endVal
                    }]
                }
            },
            data: [{
                type: "line",
                dataPoints: val
            }]
        }

        return (
            <div className={"sizable"}>
                <button onClick={this.handleChange}>Click</button>
                <input type="text"
                       id="value"
                       name="value"
                       onChange={this.changeVal}

                />
                <CanvasJSChart options = {options}></CanvasJSChart>

            </div>
            /*<div className={"resize"}>
                <input type="text"
                       id="value"
                       name="value"
                       onChange={this.changeVal}

                />
                <button onClick={this.handleChange}>Click</button>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                // />
                //{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            //</div>
        );
    }
}

export default Graph;