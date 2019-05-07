import React from "react"
import SubmitOrder from "./SubmitOrder";
import axios from "axios"
import ListOrders from "./ListOrders";

const shutters=[
    {
        "material":"acél", "parts":[{
            "requiredPart": "vezetősin",
            "additionalPart":"csavar",
            "additionalPartPieces":"4"
        }], "price": "12000"
    },

    {
        "material":"műanyag", "parts":[{
            "requiredPart": "heveder",
            "additionalPart":"vastag csavar",
            "additionalPartPieces":"6"
        }], "price": "10000"
    },

    {
      "material":"fa", "parts":[{
            "requiredPart": "fasz",
            "additionalPart":"tudja",
            "additionalPartPieces":"3"
        }], "price": "8000"
    }
]
const colors=[
    "fekete",
    "szürke",
    "barna",
    "narancssárga"
]



class Customer extends React.Component{
    constructor(props){
        super()

        this.state={
            Shutter:shutters,
            Colors:colors,
            orderRejected:""
        }
    }

    submitOrder = (orderData) => {
        axios.post('http://localhost:8090/submitOrder', orderData)
            .then(res => {alert("Order submitted"); })
            .then(res=> {this.setState({orderRejected: "false"})})
            .catch(e => {
                alert(e  + " order failed.");
                this.setState({orderRejected: "true"});
            });
    };

    render(){
        return(
            <div>
                <SubmitOrder submitOrder={this.submitOrder} shutters={this.state.Shutter} colors={this.state.Colors} orderRejected={this.state.orderRejected}/>
                <ListOrders/>
            </div>
        )

    }

}

export default Customer