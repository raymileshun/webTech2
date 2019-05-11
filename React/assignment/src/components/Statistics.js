import React from "react"
import axios from "axios";
import BarChart from 'react-bar-chart';

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
        let plasticShutters=shutterMaterials.filter(shutter=>shutter==="műanyag").length
        let steelShutters=shutterMaterials.filter(shutter=>shutter==="acél").length
        let woodenShutters=shutterMaterials.filter(shutter=>shutter==="fa").length
        console.log(plasticShutters)
        console.log(steelShutters)
        console.log(woodenShutters)
        console.log(shutterMaterials.length)
        let dataForChart = [
            {text: 'műanyag', value: plasticShutters},
            {text: 'fa', value: woodenShutters},
            {text: 'acél',value: steelShutters}
        ];

        let margin = {top: 20, right: 20, bottom: 30, left: 40};

        return <div>
            <table>
                <tbody>
                <tr><td>Összes leadott rendelés: {shutterMaterials.length}</td></tr>
                <tr>
                    <th>Műanyag redőnyre leadott rendelések száma:</th>
                    <th>Fa redőnyre adott rendelések száma:</th>
                    <th>Acél redőny rendelések száma:</th>
                </tr>
                <tr>
                    <td>{plasticShutters}</td>
                    <td>{woodenShutters}</td>
                    <td>{steelShutters}</td>
                </tr>
                </tbody>
            </table>
            <BarChart ylabel='Mennyiség'
                      width={700}
                      height={500}
                      margin={margin}
                      data={dataForChart}/>
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