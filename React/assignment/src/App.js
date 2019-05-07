import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from "./components/Customer";
import axios from "axios";
import Worker from "./components/Worker";

class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8090/listOrders`)
            .then(res => {
                this.setState({ orders: res.data});
            })

    }

    render() {
        return (
            <div>
                <Customer orders={this.state.orders}/>
                <Worker/>
            </div>

        );
    }
}

export default App;
