import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from "./components/Customer";
import axios from "axios";
import Worker from "./components/Worker";

class App extends React.Component{
    //TODO
    //ENDPOINTOT ADNI A SHUTTEREKNEK
    //MÉG VALAMI PARTSOKAT HOZZÁADNI, VISZONT MAJD A WORKER.JS-BEN IS ÁT KELL ALAKÍTANI A MEGJELENÍTÉST

    //AXIOS HÍVÁST ÁTÍRNI FETCHRE
    //KISZERVEZNI DISPATHERES CUCCRA

    constructor(props){
        super(props);

        this.state = {
            orders: []
        }
    }

    loadOrders(){
        axios.get(`http://localhost:8090/listOrders`)
            .then(res => {
                this.setState({ orders: res.data});
            })
    }

    componentDidMount() {
        this.loadOrders()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadOrders()
    }


    render() {
        return (
            <div>
                <Customer orders={this.state.orders}/>

            </div>

        );
    }
}

export default App;
