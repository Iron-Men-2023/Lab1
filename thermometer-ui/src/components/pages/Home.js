import React, {useEffect, useState} from 'react';
import ThermometerImage from "../ThermometerImage";
import ProgressBar from "../ProgressBar";
import {database} from "../../firebase";
import {getDatabase, ref, onValue} from "firebase/database";
import Toggle from 'react-toggle'

function Home(props) {
    const [value, setValue] = useState('0');
    const [dbData,setDbData] = useState({})
    const [tempUnit, setTempUnit] = useState("F");
    const Toggle = require('react-toggle')

    const handleChange = event => {
        setValue(event.target.value);
    };
    useEffect(() => {
        const firebaseRef= ref(database,"Lab1");

        return onValue(firebaseRef, (snapshot) => {
            setDbData(snapshot.val());
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
    return (
        <div>
            <h2>Select Temperature Unit</h2>
            {displayTemp()}
            <ThermometerImage value={value}/>
        </div>
    );
}


export default Home;