import React, {useEffect, useState} from 'react';
import ThermometerImage from "../ThermometerImage";
import ProgressBar from "../ProgressBar";
import {database} from "../../firebase";
import {getDatabase, ref, child, push, update, onValue} from "firebase/database";
import Toggle from 'react-toggle'
import "./Home.css"
function Home(props) {

    return (
        <div>
            <ThermometerImage value={3}/>
        </div>
    );
}


export default Home;