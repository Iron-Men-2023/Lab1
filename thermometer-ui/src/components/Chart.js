import React, {useState} from 'react'
import {CanvasJSChart} from 'canvasjs-react-charts'


const Chart = (props) => {

    return (
        <div className="GraphClass">
            <CanvasJSChart options = {props.options}
                /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    )
}

export default Chart