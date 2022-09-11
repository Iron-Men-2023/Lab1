import React, {useState} from 'react';
import Chart from '../Chart'
import './Graph.css'

const Graph = () => {
    // function changeValue
    function setPoint (dataPoints, options) {
        console.log(dataPoints,"test")

        dataPoints.push({x: dataPoints.at(dataPoints.length-1).x + 1, y: 100})

        setData(dataPoints)
        options.dataPoints = {}
        console.log(dataPoints)
        setOptions(options)
    }
    const [dataPoints, setData] = useState([
        { x: 1, y: 64 },
        { x: 2, y: 61 },
        { x: 3, y: 64 },
        { x: 4, y: 62 },
        { x: 5, y: 64 },
        { x: 6, y: 60 }])
    const [options, setOptions] = useState({
        animationEnabled: true,
        exportEnabled: true,
        responsive: true,
        maintainAspectRatio: false,
        dynamic: true,
        layout: {
            padding: {
                top: 0,
                left: 15,
                right: 15,
                bottom: 500
            }
        },
        theme: "light2", // "light1", "dark1", "dark2"
        title:{
            text: "Bounce Rate by Week of Year"
        },
        axisY: {
            title: "Bounce Rate",
            suffix: "%"
        },
        axisX: {
            title: "Week of Year",
            prefix: "W",
            interval: 2
        },
        data: [{
            type: "line",
            toolTipContent: "Week {x}: {y}%",
            dataPoints: dataPoints
        }]

    })
    return (
        <div className="GraphClass">
            <input
                type="text"
                id="value"
                name="value"
            />
            <button onClick={() => setPoint(dataPoints, options)}>Enter Button</button>
            <Chart options={options}/>
        </div>
    )
}

export default Graph