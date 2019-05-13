import React from "react"
import axios from "axios";
import ReactDOM from "react-dom"

class CustomerOrders extends React.Component{

    constructor(props) {
        super(props);

    }

    submitPayment(orderId,isPaid){
        if(isPaid==="true"){
            alert("Ez már ki van fizetve")
            return;
        }
        axios.post(`/submitPayment/${orderId}`)
            .then(res => {
                alert("Az összeget a beérkezésekor hagyjuk majd jóvá!")
            })
            .catch(e => {
                alert(e + "\n\nValami gond volt a kifuzetéssel")
            });
    }

    renderPaymentButton(orderId,isPaid){
        if(isPaid ===undefined||isPaid==="false"){
            return <button className="btn btn-danger ali" onClick={this.submitPayment.bind(this,orderId,isPaid)}>Kifizetés</button>
        }
        return <button className="btn btn-success" onClick={this.submitPayment.bind(this,orderId,isPaid)}>Kifizetve</button>
    }



    render() {
        if(this.props.customerOrders.length===0){
            return <div>
                <h2>NINCSENEK EHHEZ A NÉVHEZ RENDELÉSEK</h2>
            </div>
        }
        return<div>
            <h4>Rendelések:</h4>
                {this.props.customerOrders.map((currentOrder) =>
                    <div>
                    <table className="oneCustomerOrdersTable table-striped table-bordered">
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
                        {this.renderPaymentButton(currentOrder._id, currentOrder.order.isPaid)}
                    </table>
                    </div>

                )}

            <br/>
        </div>

    }

}

export default CustomerOrders