import React from "react"
import ReactDOM from 'react-dom'
import axios from "axios";

class Manager extends React.Component {


    constructor(props) {
        super(props);
        let date = new Date();
        let year = date.getFullYear();
        let day = date.getDate().toString().padStart(2, '0')
        let month = String(date.getMonth() + 1)
        if (month.length === 1) {
            month = "0" + month
        }
        if (day.length === 1) {
            day = "0" + day
        }

        let currentDate = year + "-" + month + "-" + day
        this.state = {
            currentDate: currentDate,
            time: "11:00",
            organizationInProcess: "false",
            orders: []
        };
    }

    loadOrders() {
        axios.get(`/listOrders`)
            .then(res => {
                this.setState({orders: res.data});
            })
    }

    componentWillMount() {
        this.loadOrders()
    }


    generateInvoice(orderIndex, orderId, customerName, phoneNumber, address, installationDate, price) {
        let invoice = <div>
            <table>
                <tbody>
                <tr>
                    <td>Vásárló neve: {customerName}</td>
                </tr>
                <tr>
                    <td>Telefonszáma: {phoneNumber}</td>
                    <td>Címe: {address}</td>
                </tr>
                <tr>
                    <td>Beszerelés időpontja: {installationDate}</td>
                </tr>
                <tr>
                    <td>Fizetendő összeg: {price} HUF</td>
                </tr>
                </tbody>
            </table>
        </div>

        let getInvoiceElement = "invoice" + orderIndex;
        ReactDOM.render(invoice, document.getElementById(getInvoiceElement));
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    submitOrganization(orderIndex, orderId, time) {
        let date = this.state.currentDate + "  " + time
        axios.post(`/submitInstallationDate/${orderId}/${date}`)
            .then(res => {
                alert("Megszervezve!");
                this.loadOrders()
            })
            .catch(e => {
                alert(e + "\n\nValami gond volt a megszervezéssel")
            });

        this.setState({time: "11:00"})
    }


    datePicking(orderIndex, orderId) {
        let date = new Date();
        let year = date.getFullYear();
        let day = String(date.getDate()).padStart(2, '0')
        let month = String(date.getMonth() + 1)
        if (month.length === 1) {
            month = "0" + month
        }
        if (day.length === 1) {
            day = "0" + day
        }


        let hoursArray = [];
        for (let i = 11; i < 19; i++) {
            hoursArray.push(i + ":00")
        }

        return <div>
            <input type="date" id="organizationDate" name="currentDate"
                   value={this.state.currentDate}
                   onChange={this.handleChange.bind(this)}
                   min={year + "-" + month + "-" + (day)} max={(year + 1) + "-" + month + "-" + day}/>
            <select name="time" id="organizationHour" onChange={this.handleChange.bind(this)}>
                {hoursArray.map(hour =>
                    <option value={hour}>{hour}</option>
                )}
            </select>
            <button onClick={this.submitOrganization.bind(this, orderIndex, orderId, this.state.time)}>SZERVEZÉS
            </button>
        </div>


        // this.setState({organizationInProcess:"false"})
    }

    renderPaymentState(isPaid){
        if(isPaid===undefined||isPaid==="false"){
            return <tr className="text-danger">Még nincs kifizetve</tr>
        }
        return <tr className="text-success">Kifizetve</tr>
    }


    render() {
        return <div>
            {console.log("Manager.js")}
            {this.state.orders.map((order, orderIndex) =>
                <div>
                    <table className="managerTable">
                        <table className="table table-striped table-bordered table-dark">
                            <td>
                                <tr key={order.order.customerName}>{order.order.customerName}</tr>
                                <tr key={order.order.phoneNumber}>{order.order.phoneNumber}</tr>
                                <tr key={order.order.address}>{order.order.address}</tr>
                            </td>
                            <th>
                                <tr className="text-black-50">Beszerelés időpontja</tr>
                                <tr className="text-success">{order.order.installationDate}</tr>
                            </th>
                            <td>
                                <tr className="text-black-50">Kifizetés állapota</tr>
                                {this.renderPaymentState(order.order.isPaid)}

                            </td>

                            <tr>
                                <th>Ablak típusa</th>
                                <th>Szélessége</th>
                                <th>Magassága</th>
                                <th>Redőny anyaga</th>
                                <th>Redőny színe</th>
                                <th>Rendelt darabszám</th>
                                <th>Összeszerelve?</th>
                            </tr>
                            {order.order.orders.map((currentOrder) =>
                                <tr>
                                    <td key={currentOrder.windowType}>{currentOrder.windowType}</td>
                                    <td key={currentOrder.windowWidth}>{currentOrder.windowWidth}</td>
                                    <td key={currentOrder.windowHeight}>{currentOrder.windowHeight}</td>
                                    <td key={currentOrder.shutterMaterial}>{currentOrder.shutterMaterial}</td>
                                    <td key={currentOrder.shutterColor}>{currentOrder.shutterColor}</td>
                                    <td key={currentOrder.numberOfPieces}>{currentOrder.numberOfPieces}</td>
                                    <td key={currentOrder.assembled}>{currentOrder.assembled}</td>
                                </tr>
                            )}

                        </table>

                        {/*<button className="btn btn-secondary" onClick={this.datePicking.bind(this,orderIndex,order._id)}>Beszerelés megszervezése</button>*/}
                        {this.datePicking(orderIndex, order._id)}
                        <div id={"date" + orderIndex}></div>
                        <div id={"button" + orderIndex}></div>
                        <button className="btn btn-success btn-sm"
                                onClick={this.generateInvoice.bind(this, orderIndex, order._id, order.order.customerName, order.order.phoneNumber, order.order.address, order.order.installationDate, order.order.totalPrice)}>Számla
                            elkészítése
                        </button>
                        <div id={"invoice" + orderIndex}></div>
                    </table>
                </div>
            )}

        </div>

    }

}

export default Manager