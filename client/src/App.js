import React from 'react';
import './App.css';
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
