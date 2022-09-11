import logo from './logo.svg'
import React from 'react';
import './App.css';
import Navbar from "./components/pages/Navbar";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./components/pages/Home";
import Graph from "./components/pages/Graph";

function App() {

    return (
    <Router>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='graph' element={<Graph />}/>
        </Routes>
    </Router>

  );
}

export default App;
