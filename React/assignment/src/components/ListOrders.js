import React from "react"
import axios from 'axios';

class ListOrders extends React.Component{

    constructor(props){
        super();

        this.state = {
            orders: []
        }
    }


    componentDidMount() {
        axios.get(`http://localhost:8080/listOrders`)
            .then(res => {
                this.setState({ orders: res.data });
            })

    }

    render(){
        return (
            <div>
                <h1>Orders:</h1>
                <ul>
                    { this.state.orders.map(order =>
                        <div>
                        <li key={order.order.customerName}>{order.order.customerName}</li>
                        <li key={order.order.phoneNumber}>{order.order.phoneNumber}</li>
                        <li key={order.order.address}>{order.order.address}</li>
                        </div>
                    )}
                </ul>

            </div>
        )
    }
}

export default ListOrders