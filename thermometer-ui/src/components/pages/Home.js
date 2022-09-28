import React, {useEffect, useState} from 'react';
import ThermometerImage from "../ThermometerImage";
import ProgressBar from "../ProgressBar";
import {database} from "../../firebase";
import {getDatabase, ref, child, push, update, onValue} from "firebase/database";
import Toggle from 'react-toggle'
import "./Home.css"

function Home(props) {
    const [dbData,setDbData] = useState({})
    useEffect(() => {
        const firebaseRef= ref(database,"Lab1");

        return onValue(firebaseRef, (snapshot) => {
            setDbData(snapshot.val());
        });
    }, []);
    const {Temperature} = dbData
    return (
        <div>
            <ThermometerImage value={Temperature}/>
        </div>
    );
}


export default Home;