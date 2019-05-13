import React from "react"
import SubmitOrder from "./SubmitOrder";


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
            Colors:colors,
            orderRejected:"",
        }
    }



    render(){
        return(
            <div>
                {console.log("Customer.js")}
                <SubmitOrder colors={this.state.Colors}/>
                {/*<Worker/>*/}
                {/*<Manager/>*/}
                {/*<Statistics/>*/}
            </div>
        )

    }

}

export default Customer