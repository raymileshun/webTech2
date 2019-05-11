import React from "react"
import SubmitOrder from "./SubmitOrder";
import Statistics from "./Statistics";
import Worker from "./Worker";
import Manager from "./Manager";
import axios from "axios";

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
        super(props)

        this.state={
            Shutter:shutters,
            Colors:colors,
            orderRejected:"",
            orders:[]
        }
    }

    // loadOrders(){
    //     axios.get(`http://localhost:8090/listOrders`)
    //         .then(res => {
    //             this.setState({ orders: res.data});
    //         })
    // }
    //
    // componentDidMount() {
    //     this.loadOrders()
    // }



    render(){
        return(
            <div>
                {console.log("Customer.js")}
                <SubmitOrder shutters={this.state.Shutter} colors={this.state.Colors}/>
                {/*<ListOrders orders={this.props.orders}/>*/}
                <Worker orders={this.props.orders} shutters={this.state.Shutter}/>
                {/*<Manager orders={this.props.orders} />*/}
                {/*<Statistics orders={this.props.orders}/>*/}
            </div>
        )

    }

}

export default Customer