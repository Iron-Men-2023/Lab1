import React, {useEffect, useState} from 'react';
import {onValue, ref, update} from "firebase/database";
import {database} from "../../firebase";
import "./Header.css"
import TextSettings from "./TextSettings";
function Header(props) {
    const [dbData,setDbData] = useState({})
    const [boxIsOn, setBoxIsOn] = useState(true);
    const [tempUnit, setTempUnit] = useState("C");
    const Toggle = require('react-toggle')
    const [serverBtn, setServerBtn] = useState(true);
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
        const {Temperature,Is_On,Is_connected,Server_Button} = dbData;
        if(Server_Button){
            if(!Is_connected)
            {
                return(
                    <h2>Sensor Unplugged</h2>
                )
            }
            else if(tempUnit==="C")
            {
                return(
                    <h2>{Temperature}°C </h2>
                )
            }
            else if(tempUnit==="F") {
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
        setServerBtn(!serverBtn);
        if(boxIsOn){

            updates['/Lab1/Server_Button'] = serverBtn;
        }


        return update(ref(database), updates);
    }
    return (
        <div>
            <div className="row">
                <div className="column2">

                    <div className="row">
                        <div className="column">
                            <h2>Select Temperature Unit:</h2>
                        </div>
                        <div className="radio"> <input type="radio" value="C" name="temp" onClick={()=>setTempUnit('C')}/> </div>
                        <div className="radio">°C </div>
                        <div className="radio"> <input type="radio" value="F" name="temp" onClick={()=>setTempUnit('F')} /></div>
                        <div className="radio">°F </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <h3>{displayTemp()}</h3>
                        </div>
                        <div className="column">
                            <input type="button" className="btn"
                                   value ={boxIsOn? "Turn off":"Turn on" }
                                   onClick={turnOffBox}/>

                        </div>
                    </div>
                </div>
                <div className="column2">
                    <TextSettings/>
                </div>
            </div>

        </div>
    );
}

export default Header;