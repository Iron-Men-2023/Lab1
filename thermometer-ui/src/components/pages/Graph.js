import React, {Component, useState} from 'react';
// import Chart from '../Chart'
import './Graph.css'
import * as CanvasJSReact from "canvasjs-react-charts";
import {database} from "../../firebase";
import {getDatabase, ref, onValue} from "firebase/database";
// var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const updateInterval = 1000;
const firebaseRef = ref(database, "Lab1");

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
            // dbData: {Is_On: true, Is_connected: true, Server_Button: false, Temp_History: '100,123,122,null,null,98,23,55', Temperature: '34.12'}
            dbData: {}
        }
        this.updateChart = this.updateChart.bind(this);
    }
    componentDidMount() {
        setInterval(this.updateChart, updateInterval);
    }

    updateChart() {
        onValue(firebaseRef, (snapshot) => {
            this.setState({
                dbData: snapshot.val()
            });
            console.log(this.state.dbData)
        });

        function timeout(delay: number) {
            return new Promise(res => setTimeout(res, delay));
        }
        /*
        if (this.state.generated === false) {
            // await timeout(10000); //for 1 sec delay
            // console.log()
            let newDp = []
            let s = this.state.dbData.Temp_History
            console.log(s)
            let splitS = s.split(",")
            console.log(splitS)
            for (let index = 0; index < this.state.dbData.Temp_History.length; index++) {
                if (splitS[index] !== "null") {
                    newDp.push(Number(splitS[index]))
                } else {
                    newDp.push(null)
                }
            }
            for (let index = 0; index < newDp.length; index++) {
                this.state.dp.push(newDp[index])
            }
            this.state.generated = true
        }

         */
        for (let index = 0; index < this.state.dp.length; index++) {
            this.state.dp[index].x = this.state.dp[index].x + 1
        }
        // TODO - Will change this to true when its actually connected to device
        if (this.state.dbData.Server_Button === false) {
            this.state.dp.unshift({x: 0, y: parseInt(this.state.dbData.Temperature)});
        } else {
            this.state.dp.unshift({x: 0, y: null});
        }
        // console.log(this.state.dbData.Temperature)
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