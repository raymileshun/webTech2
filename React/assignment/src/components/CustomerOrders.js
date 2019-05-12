import React from "react"
import axios from "axios";
import ReactDOM from "react-dom"

class CustomerOrders extends React.Component{

    constructor(props) {
        super(props);

    }



    render() {
        if(this.props.customerOrders.length===0){
            return <div>
                <h2>NINCSENEK EHHEZ A NÉVHEZ RENDELÉSEK</h2>
            </div>
        }
        return<div>
            <h4>Rendelések:</h4>
            <table className="shoppingCartTable">
                {this.props.customerOrders.map((currentOrder) =>
                    <div>
                        {currentOrder.order.orders.map((order)=>
                            <div>
                        <tr className="table-dark">
                            <th>
                                Ablak típusa
                            </th>
                            <th>
                                Ablak szélessége
                            </th>
                            <th>
                                Ablak magassága
                            </th>
                            <th>
                                Redőny anyaga
                            </th>
                            <th>
                                Redőny színe
                            </th>
                            <th>
                                Rendelt mennyiség
                            </th>
                            <th>
                                Rendelés összege
                            </th>
                        </tr>

                        <tr className="table-danger">
                            <td>
                                {order.windowType}
                            </td>
                            <td>
                                {order.windowWidth}
                            </td>
                            <td>
                                {order.windowHeight}
                            </td>
                            <td>
                                {order.shutterMaterial}
                            </td>
                            <td>
                                {order.shutterColor}
                            </td>
                            <td>
                                {order.numberOfPieces}
                            </td>
                            <td>
                                {order.orderPrice}
                            </td>
                        </tr>
                            </div>
                            )}
                    </div>
                )}
            </table>
            <br/>
        </div>

    }

}

export default CustomerOrders