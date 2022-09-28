import React from 'react';
import './ProgressBar.css';
const ProgressBar = (props) => {
    const value = parseInt(props.value)+20;
    let root = document.querySelector(':root');
    let rootStyles = getComputedStyle(root);
    let barHeight =rootStyles.getPropertyValue('--barHeight');
    console.log(value)
    root.style.setProperty('--barHeight',String(value)+'vh')
    if(parseInt(value)<40){
        root.style.setProperty('--barColor','rgba(39,106,251,0.8)')
    }
    else if(parseInt(value)>40 && parseInt(value)<=70)
    {
        root.style.setProperty('--barColor','rgba(238,200,83,0.8)')
    }
    else if(parseInt(value)>70){
        root.style.setProperty('--barColor','rgba(243,29,29,0.8)')
    }
    return (
        <div className='bar'>

        </div>
    );
};

export default ProgressBar;
