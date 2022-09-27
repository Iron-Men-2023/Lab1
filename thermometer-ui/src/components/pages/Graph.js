import React, {Component, useState} from 'react';
// import Chart from '../Chart'
import './Graph.css'
import * as CanvasJSReact from "canvasjs-react-charts";
import {database} from "../../firebase";
import {getDatabase, ref, onValue} from "firebase/database";
import ToggleSwitch from "../ToggleSwitch";
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

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}




class Graph extends Component {

    constructor(props) {
        super(props);
        this.generateDataPoints = this.generateDataPoints.bind(this);
        this.state = {
            dp: [], //this.generateDataPoints(300),
            val: "",
            generated: false,
            reversed: false,
            // dbData: {Is_On: true, Is_connected: true, Server_Button: false, Temp_History: '100,123,122,null,null,98,23,55', Temperature: '34.12'}
            dbData: {},
            tempTitle: "Temperature Degrees C",
            tempMin: 0,
            tempMax: 50,
            currTempC: false
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
        let test = this.state.dbData.Is_On

        if (test !== undefined && this.state.generated !== true) {
            console.log("Waiting")
            // await timeout(3500); //for 1 sec delay
            console.log("Done")
            let newDp = []
            let s = this.state.dbData.Temp_History
            console.log(s)
            let splitS = s.split(",")
            console.log(splitS)
            for (let index = 0; index < splitS.length; index++) {
                if (splitS[index] !== "null") {
                    newDp.push(Number(splitS[index]))
                } else {
                    newDp.push(null)
                }
            }
            let newX = newDp.length-1
            for (let index = 0; index < newDp.length; index++) {
                this.state.dp.unshift({x:newX, y:newDp[index]})
                newX -= 1
            }

            console.log("here")
            this.state.generated = true
            this.conversion()
        }
        else if (this.state.generated === true){

            for (let index = 0; index < this.state.dp.length; index++) {
                this.state.dp[index].x = this.state.dp[index].x + 1
            }
            // TODO - Will change this to true when its actually connected to device
            if (this.state.dbData.Server_Button === true) {
                let tmpTemp = this.conversionOnce(Number(this.state.dbData.Temperature).toFixed(2))
                this.state.dp.unshift({x: 0, y: tmpTemp});
            } else {
                this.state.dp.unshift({x: 0, y: null});
            }
            // console.log(this.state.dbData.Temperature)
        }
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

    conversion() {
        if (this.state.tempTitle.charAt(this.state.tempTitle.length-1) === "C")
        {
            for(let i = 0; i < this.state.dp.length; i++)
            {
                if (this.state.dp[i].y !== null){
                    let temp = this.state.dp[i].y
                    this.state.dp[i].y = (temp-32) * (5.0/9.0)
                }
            }
            this.state.currTempC = true
            this.state.tempTitle = "Temperature Degrees C"
            this.state.tempMin = 0
            this.state.tempMax = 50
        }
        else{
            for(let i = 0; i < this.state.dp.length; i++)
            {
                if (this.state.dp[i].y !== null){
                    let temp = this.state.dp[i].y
                    this.state.dp[i].y = (temp*(9.0/5.0)) + 32.0
                }
            }
            this.state.currTempC = false
            this.state.tempTitle = "Temperature Degrees F"
            this.state.tempMin = 50
            this.state.tempMax = 122

        }
    }

    conversionOnce(num) {
        if (this.state.tempTitle.charAt(this.state.tempTitle.length-1) === "C")
        {
            num = (num-32) * (5.0/9.0)
        }
        // TODO - this might need to be changed depending on how we store values
        /*else{
            num = (num*(9.0/5.0)) + 32.0
        }*/
        return num
    }

    render() {
        let val = this.state.dp

        const toggleTemp = () => {
            this.state.currTempC = this.state.currTempC !== true;
            if (this.state.currTempC === true){
                this.state.tempTitle = "Temperature Degrees C"
            }
            else{
                this.state.tempTitle = "Temperature Degrees F"
            }
            this.conversion()
            console.log("Bennnn")
        };

        const options = {
            theme: "light2", // "light1", "dark1", "dark2"
            zoomEnabled: true,
            zoomAndPan: true,
            maintainAspectRatio: false,
            title: {
                text: "Temp Vs Time Graph"
            },
            axisY: {
                title: this.state.tempTitle,
                minimum: this.state.tempMin,
                maximum: this.state.tempMax,
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
                connectNullData: false,
                dataPoints: val
            }]

        }


        return (
            <div className={"GraphPage"}>
                <div className={"Switch"}>
                    <React.Fragment >
                        <ToggleSwitch label="Temperature" onClick={toggleTemp}/>
                    </React.Fragment>
                </div>
                <div className={"Graph"}>
                    <CanvasJSChart options = {options}></CanvasJSChart>
                </div>
            </div>
        );
    }
}

export default Graph;