import React from 'react';
import './App.css';
import Customer from "./components/Customer";
import axios from "axios";


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

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.loadOrders()
    // }


    render() {
        return (
            <div>
                {console.log("App.js")}
                <Customer orders={this.state.orders}/>
            </div>

        );
    }
}


// function loadOrders(){
//         axios.get(`http://localhost:8090/listOrders`)
//             .then(res => {
//                 return res.data
//                 // this.setState({ orders: res.data});
//             })
//     }
//
// function App(){
//     let orders=loadOrders()
//     console.log(orders)
//     return(
//         <div>
//             <Customer orders={orders} loadOrders={loadOrders()}/>
//         </div>
//     )
// }

export default App;
