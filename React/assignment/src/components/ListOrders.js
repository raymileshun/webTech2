import React from "react"
import axios from 'axios';

class ListOrders extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            orders: []
        }
    }


    render(){
        return (
            <div>
                <h1>Orders:</h1>
                <ul>
                    { this.props.orders.map(order =>
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