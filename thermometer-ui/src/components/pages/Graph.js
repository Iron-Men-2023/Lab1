import React, {Component, useState} from 'react';
import Chart from '../Chart'
import './Graph.css'
import * as CanvasJSReact from "canvasjs-react-charts";
import {database} from "../../firebase";
import {getDatabase, ref, onValue} from "firebase/database";
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
            dp: this.generateDataPoints(300),
            val: "",
            generated: false,
            reversed: false,
            dbData: {}
        }
    }


    handleChange = event => {
        const {dp, val} = this.state
        const dpLen = dp.length
        if (!this.state.generated)
        {
            this.state.generated = true
            this.state.reversed = true
        }
        if(isNumber(val))
        {
            const firebaseRef= ref(database,"Lab1");
            onValue(firebaseRef, (snapshot) => {
                this.setState({
                    dbData: snapshot.val()
                });
                console.log(this.state.dbData)
            });
            for (let index = 0; index < dpLen; index++) {
                this.state.dp[index].x = this.state.dp[index].x+1
            }
            dp.unshift({x: 0, y: parseInt(val)});
            console.log(this.state.startVal, this.state.endVal, this.state.tmpX)
            this.setState(dp)
        }
        else{
            dp.push({x: this.state.dp[dpLen-1].x + 1, y: null});
            this.setState(dp)
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
            yVal = Math.round(75 + Math.random() *(100-75));
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
            axisY: {
                title: "Temperature Degrees F",
                minimum: 50,
                maximum: 122,
                scale: 1,
                labelAutoFit: true,

            },
            axisX: {
                title: "Seconds Ago",
                minimum: 0,
                maximum: 350,
                scale: 1,
                labelAutoFit: true,
                reversed:  true,
                valueFormatString: "###0.##",
                /*scaleBreaks: {
                    type: "wavy",
                    customBreaks: [{
                        lineThickness: 0,
                        startValue: startVal,
                        endValue: endVal
                    }]
                }*/
            },
            data: [{
                type: "line",
                connectNullData: true,
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