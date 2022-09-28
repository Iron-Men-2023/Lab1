import React from 'react';
import thermometer from '../images/thermometer.png';
import "./ThermometerImage.css";
import ProgressBar from "./ProgressBar";
function ThermometerImage(props) {
    const {value} = props;
    let root = document.querySelector(':root');
    let rootStyles = getComputedStyle(root);
    let bgColor =rootStyles.getPropertyValue('--bgColor');
    if(parseInt(value)+20<40){
        root.style.setProperty('--bgColor','#276afb')
    }
    else if(parseInt(value)+20>40 && parseInt(value)+20<=70)
    {
        root.style.setProperty('--bgColor','#eec853')
    }
    else if(parseInt(value)+20>70){
        root.style.setProperty('--bgColor','#f31d1d')
    }
    return (
        <div className='image-container' >
            <ProgressBar value={value}/>
            <img src={thermometer} className='image' />

        </div>
    );
}

export default ThermometerImage;