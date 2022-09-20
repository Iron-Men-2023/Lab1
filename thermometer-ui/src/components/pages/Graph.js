import React, {Component, useState} from 'react';
import Chart from '../Chart'
import './Graph.css'
import * as CanvasJSReact from "canvasjs-react-charts";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {

    constructor(props) {
        super(props);
        this.generateDataPoints = this.generateDataPoints.bind(this);
        this.state = {
            dp: [{x:0, y:0}],
            val: ""
        }
    }

    handleChange = event => {
        const {dp, val} = this.state
        const dpLen = dp.length
        console.log(dp)
        console.log(val)
        // this.state.dp = this.state.dp.push({x: this.state.dp[dpLen-1].x + 1,y: event.target.value});
        dp.push({x: dp[dpLen-1].x+1, y: parseInt(val)});
        this.setState(dp)
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
        const options = {
            theme: "light2", // "light1", "dark1", "dark2"
            animationEnabled: true,
            zoomEnabled: true,
            title: {
                text: "Try Zooming and Panning"
            },
            data: [{
                type: "area",
                dataPoints: val
            }]
        }

        return (
            <div>
                <input type="text"
                       id="value"
                       name="value"
                       onChange={this.changeVal}

                />
                <button onClick={this.handleChange}>Click</button>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default Graph;