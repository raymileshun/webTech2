import React from "react"
import axios from "axios"
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore"

class Worker extends React.Component {
    //TODO


    constructor(props) {
        super(props)

        this.state = {
            searchParameter: "",
            submitSearch: "false",
            orders:[],
            shutters:[]
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    loadOrders(){
        axios.get(`/listOrders`)
            .then(res => {
                this.setState({ orders: res.data});
            })
    }

    onChange(){
        this.setState({orders : OrderStore.orders});
        // this.setState({shutters : OrderStore.shutters});

    }

    componentWillMount() {
        OrderStore.addChangeListener(this.onChange.bind(this));
        OrderActions.listOrders();
        // OrderActions.listShutters();
        //this.loadOrders()
        //this.loadShutters()
    }

    componentWillUnmount(){
        OrderStore.removeChangeListener(this.onChange);
    }


    handleChange(event) {
        if (this.state.submitSearch === "true") {
            this.setState({[event.target.name]: this.state[event.target.name]})
            return;
        }
        this.setState({[event.target.name]: event.target.value});
    }


    loadOrdersForCustomer(customerName) {
        if (customerName === undefined || customerName === "") {
            this.setState({submitSearch:"false"})
            return this.renderOrderView(this.state.orders)
        }
        let ordersForCustomer = this.state.orders.filter(order => order.order.customerName.toUpperCase() === customerName.toUpperCase());
        return this.renderOrderView(ordersForCustomer)
    }

    orderHandler() {
        if (this.state.submitSearch === "false") {
            return this.renderOrderView(this.state.orders)
        } else {
            return this.loadOrdersForCustomer(this.state.searchParameter)
        }
    }

    handleSearch() {
        if (this.state.searchParameter === "") {
            this.setState({submitSearch: "false"})
        }
        this.setState({submitSearch: "true"})
    }

    handleReset() {
        this.setState({submitSearch: "false"})
        this.setState({searchParameter: ""})
    }

    listParts(shutterMaterial, numberOfOrderedPieces) {
        const shutters = this.props.shutters.filter(shutter => shutter.shutter.material.toUpperCase() === shutterMaterial.toUpperCase());
        return (
            <ul>
                {shutters.map((shutter) =>
                    <div>
                        <li key={shutter.shutter.parts[0].requiredPart}>{shutter.shutter.parts[0].requiredPart}</li>
                        <li key={shutter.shutter.parts[0].additionalPart}>{shutter.shutter.parts[0].additionalPartPieces} X {numberOfOrderedPieces} {shutter.shutter.parts[0].additionalPart}</li>
                        {/*<li key={shutter.parts[0].additionalPart}>{shutter.parts[0].additionalPartPieces * numberOfOrderedPieces} {shutter.parts[0].additionalPart}</li>*/}
                    </div>
                )}
            </ul>
        )
    }


    handleAssembling(fullOrderId, currentOrderId, alreadyAssembled) {
        if (alreadyAssembled === "true") {
            alert("Ez már össze van szerelve!")
            return;
        }
        OrderActions.updateOrderWithAssembling(fullOrderId,currentOrderId)

    }

    renderAssembleButton(orderId, orderIndex, isAssembled) {
        if (isAssembled === "true") {
            return <li key={orderId + isAssembled} className="btn btn-success assembleButton"
                       onClick={this.handleAssembling.bind(this, orderId, orderIndex, isAssembled)}>Összeszerelve</li>
        }
        return <li key={orderId + isAssembled} className="btn btn-danger assembleButton"
                   onClick={this.handleAssembling.bind(this,orderId,orderIndex,isAssembled)}>Még nincs
            összeszerelve!</li>
    }


    renderOrderView(orders) {
        if (this.state.orders.length === 0) {
            return <div>MÉG NINCSENEK MEGRENDELÉSEK</div>
        }

        return (
            <div>
                {orders.map(order =>

                    <div>
                        <div className="workerTableSpace">
                        <h5 key={order.order.customerName} className="text-center text-black-50">{order.order.customerName}</h5>
                        <h5 key={order.order.phoneNumber} className="text-center">{order.order.phoneNumber}</h5>
                        <h5 key={order.order.address} className="text-center text-black-50">{order.order.address}</h5>
                        </div>

                        <table className="table table-striped table-bordered text-center ">
                            <tr>
                                <th>Ablak típusa</th>
                                <th>Ablak szélessége</th>
                                <th>Ablak magassága</th>
                                <th>Redőny anyaga</th>
                                <th>Redőny színe</th>
                                <th>Rendelt darabszám</th>
                                <th>Szükséges alkatrészek</th>
                                <th>Összeszerelés állapota</th>
                            </tr>

                            {order.order.orders.map((currentOrder, orderIndex) =>
                                <tr>
                                    <td key={currentOrder.windowType}>{currentOrder.windowType}</td>
                                    <td key={currentOrder.windowWidth}>{currentOrder.windowWidth}</td>
                                    <td key={currentOrder.windowHeight}>{currentOrder.windowHeight}</td>
                                    <td key={currentOrder.shutterMaterial}>{currentOrder.shutterMaterial}</td>
                                    <td key={currentOrder.shutterColor}>{currentOrder.shutterColor}</td>
                                    <td key={currentOrder.numberOfPieces}>{currentOrder.numberOfPieces}</td>
                                    <td>{this.listParts(currentOrder.shutterMaterial, currentOrder.numberOfPieces)}</td>
                                    <td>{this.renderAssembleButton(order._id, orderIndex, currentOrder.assembled)}</td>
                                </tr>
                            )}
                        </table>

                    </div>
                )}


            </div>
        )
    }


    render() {
        return <div>
            {console.log("Worker.js")}
            <div className="searchUserForm">
                <h6 className="text-success">Felhasználó keresése:</h6>

                <input type="text" value={this.state.searchParameter}
                                            className="form-control-sm"
                                             onChange={this.handleChange.bind(this)} name="searchParameter" required/>
                <button className="btn btn-info" onClick={() => this.handleSearch()}>KERESÉS!</button>
                <button className="btn btn-warning" onClick={() => this.handleReset()}>VISSZAÁLLÍTÁS</button>
            </div>
            <div>
               <kbd>Rendelések:</kbd>  {this.orderHandler()}
            </div>
        </div>

    }
}

export default Worker