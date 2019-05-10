import React from "react"
import axios from "axios";

class Statistics extends React.Component{

    constructor(props){
        super(props)

        this.state={
            orders:[]
        }
    }


    loadOrders(){
        axios.get(`http://localhost:8090/listOrders`)
            .then(res => {
                this.setState({ orders: res.data});
            })
    }

    loadStatistics() {
        let ordersForCustomer = this.state.orders.filter(order => order.order.orders.shutterMaterial=== "műanyag");
        let shutterMaterials=[]
        this.state.orders.map((order) =>
            order.order.orders.map((shutter)=>
                shutterMaterials.push(shutter.shutterMaterial)
            )
        )
        let plasticShutters=shutterMaterials.filter(shutter=>shutter==="műanyag")
        let steelShutters=shutterMaterials.filter(shutter=>shutter==="acél")
        let woodenShutters=shutterMaterials.filter(shutter=>shutter==="fa")
        console.log(plasticShutters)
        console.log(steelShutters)
        console.log(woodenShutters)
        console.log(shutterMaterials.length)

        return <div>
            {shutterMaterials.length}
        </div>
    }

    componentWillMount() {
        this.loadOrders()
    }

    render(){
        return <div>
            <div>STATISTICS</div>
            {console.log("Statistics.js")}
            {this.loadStatistics()}
        </div>
    }

}

export default Statistics