import React, {useEffect, useState} from 'react';
import ThermometerImage from "../ThermometerImage";
import ProgressBar from "../ProgressBar";
import {database} from "../../firebase";
import {getDatabase, ref, child, push, update, onValue} from "firebase/database";
import Toggle from 'react-toggle'
import "./Home.css"
function Home(props) {
    const [value, setValue] = useState('0');
    const [dbData,setDbData] = useState({})
    const [boxIsOn, setBoxIsOn] = useState();
    const [tempUnit, setTempUnit] = useState("F");
    const Toggle = require('react-toggle')

    const handleChange = event => {
        setValue(event.target.value);
    };
    useEffect(() => {
        const firebaseRef= ref(database,"Lab1");

        return onValue(firebaseRef, (snapshot) => {
            setDbData(snapshot.val());
            setBoxIsOn(snapshot.val().Is_On)
        });
    }, []);
    function celcToFar(degCelc){
        return degCelc *9/5 +32
    }
    function displayTemp(){
        const {Temperature,Is_On} = dbData;
        if(Is_On){
            if(tempUnit==="C")
            {
                return(
                    <h2>{Temperature}°C </h2>
                )
            }
            else{
                return(
                    <h2>{celcToFar(Temperature)}°F </h2>
                )
            }
        }
        else{
            return(
                <h2>no data available</h2>
            )
        }
    }
    function turnOffBox(){
        const updates = {};
        boxIsOn? updates['/Lab1/Is_On'] = false:
            updates['/Lab1/Is_On'] = true;

        return update(ref(database), updates);
    }
    return (
        <div>

            <div className="row">
                <div className="column">
                    <h2>Select Temperature Unit:</h2>
                </div>
                <div className="column"> F</div>
                <div className="column"></div>
            </div>
            <div className="row">
                <div className="column">
                    <h3>{displayTemp()}</h3>
                </div>
                <div className="column">
                <input type="button" className="btn"
                       value ={boxIsOn? "Turn off 3rd box":"Turn on 3rd box" }
                       onClick={turnOffBox}/>

                </div>
                <div className="column"></div>
            </div>
            <ThermometerImage value={value}/>
        </div>
    );
}


export default Home;