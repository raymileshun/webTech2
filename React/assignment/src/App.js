import React from 'react';
import './App.css';
import Customer from "./components/Customer";
import axios from "axios";
import Manager from "./components/Manager";
import Worker from  "./components/Worker"
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import SubmitOrder from "./components/SubmitOrder";

const colors=[
    "fekete",
    "szürke",
    "barna",
    "narancssárga"
]

class App extends React.Component{

    constructor(props){
        super(props);
        this.state={
            Colors:colors
        }

    }


    render() {
        return (
            <div>
                {console.log("App.js")}
                <SubmitOrder colors={this.state.Colors}/>
            </div>

        );
    }
}



export default App;
