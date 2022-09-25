import React, {Component, useState} from 'react';
// import Chart from '../Chart'
import './Graph.css'
import * as CanvasJSReact from "canvasjs-react-charts";
import {database} from "../../firebase";
import {getDatabase, ref, onValue} from "firebase/database";
// var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const updateInterval = 1000;

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
        this.updateChart = this.updateChart.bind(this);
    }
    componentDidMount() {
        setInterval(this.updateChart, updateInterval);
    }

    updateChart() {
        const firebaseRef= ref(database,"Lab1");
        onValue(firebaseRef, (snapshot) => {
            this.setState({
                dbData: snapshot.val()
            });
            console.log(this.state.dbData)
        });
        for (let index = 0; index < this.state.dp.length; index++) {
            this.state.dp[index].x = this.state.dp[index].x+1
        }
        this.state.dp.unshift({x: 0, y: 71});
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
            },
            data: [{
                type: "line",
                connectNullData: true,
                dataPoints: val
            }]

        }


        return (
            <div className={"sizable"}>
                <CanvasJSChart options = {options}></CanvasJSChart>
            </div>
        );
    }
}

export default Graph;