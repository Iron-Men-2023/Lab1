import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = (props) => {
    return (
        <div className="container">
            {props.label}{" "}
            <div className="toggle-switch">
                <input type="checkbox" className="checkbox"
                       name={props.label} id={props.label} onClick={props.onClick}/>
                <label className="label" htmlFor={props.label}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    );
};

export default ToggleSwitch;