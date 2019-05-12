import React from 'react';
import './App.css';
import Customer from "./components/Customer";
import axios from "axios";
import Manager from "./components/Manager";
import Worker from  "./components/Worker"
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'



class App extends React.Component{
    //TODO
    //ENDPOINTOT ADNI A SHUTTEREKNEK
    //MÉG VALAMI PARTSOKAT HOZZÁADNI, VISZONT MAJD A WORKER.JS-BEN IS ÁT KELL ALAKÍTANI A MEGJELENÍTÉST

    //AXIOS HÍVÁST ÁTÍRNI FETCHRE
    //KISZERVEZNI DISPATHERES CUCCRA

    constructor(props){
        super(props);


    }


    render() {
        return (
            <div>
                {console.log("App.js")}

                <Customer/>
            </div>

        );
    }
}



export default App;
