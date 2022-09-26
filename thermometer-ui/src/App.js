import logo from './logo.svg'
import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./components/pages/Navbar";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./components/pages/Home";
import Graph from "./components/pages/Graph";
import TextSettings from "./components/pages/TextSettings";

function App() {

    useEffect(() => {
        document.title = "Ironmen Lab1"
    }, [])

    return (
    <Router>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='graph' element={<Graph />}/>
            <Route path='text' element={<TextSettings />}/>
        </Routes>
    </Router>

  );
}

export default App;
