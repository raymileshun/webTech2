import React from "react"
import SubmitOrder from "./SubmitOrder";
import axios from "axios"
import ListOrders from "./ListOrders";

const shutters=[
    {
        "material":"acel", "parts":[
            "vezetosin", "4 x csavar"
        ]
    },

    {
        "material":"muanyag", "parts":[
            "heveder", "6 x csavar"
        ]
    },

    {
      "material":"fa", "parts":[
          "csicska", "gyasz"
        ]
    }
]
const colors=[
    "black",
    "red",
    "yellow"
]



class Customer extends React.Component{
    constructor(props){
        super()

        this.state={
            Shutter:shutters,
            Colors:colors
        }
    }

    submitOrder = (orderData) => {
        axios.post('http://localhost:8090/submitOrder', orderData)
            .then(res => {alert("Order submitted"); })
            .catch(e => {alert(e  + " order failed.")});
    };

    render(){
        return(
            <div>
                <SubmitOrder submitOrder={this.submitOrder} shutters={this.state.Shutter} colors={this.state.Colors}/>
                <ListOrders/>
            </div>
        )

    }

}

export default Customer