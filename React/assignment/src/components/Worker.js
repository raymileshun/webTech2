import React from "react"
import axios from "axios"

class Worker extends React.Component{
    //TODO
    //Assemblenél majd egy piros gomb ha még nincs összeszerelve, és egy zöld hogyha összevan

    //COMPONENT UPDATET MEG KELL OLDANI
    //Pár dolog lehet hogy ReactDOM.renderrel jobb lesz

    constructor(props){
        super(props)

        this.state={
            searchParameter:"",
            submitSearch:"false"
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    // loadOrders(){
    //     axios.get(`http://localhost:8090/listOrders`)
    //         .then(res => {
    //             this.setState({ orders: res.data});
    //         })
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.loadOrders()
    // }


    handleChange(event) {
        if(this.state.submitSearch === "true"){
            this.setState({[event.target.name]: this.state[event.target.name] })
            return;
        }
        this.setState({[event.target.name]: event.target.value});
    }




    loadOrdersForCustomer(customerName) {
        if(customerName===undefined||customerName===""){
            return this.renderOrderView(this.props.orders)
        }
        let ordersForCustomer = this.props.orders.filter(order=>order.order.customerName===customerName);
        return this.renderOrderView(ordersForCustomer)
    }

    orderHandler(){
        if(this.state.submitSearch==="false"){
            return this.renderOrderView(this.props.orders)
        } else{
            return this.loadOrdersForCustomer(this.state.searchParameter)
        }
    }

    handleSearch(){
        if(this.state.searchParameter===""){
            this.setState({submitSearch: "false"})
        }
        this.setState({submitSearch: "true"})
    }

    handleReset(){
        this.setState({submitSearch: "false"})
        this.setState({searchParameter: ""})
    }

    listParts(shutterMaterial, numberOfOrderedPieces){
        const shutters = this.props.shutters.filter(shutter=>shutter.material===shutterMaterial);
        return(
         <ul>
             {shutters.map((shutter) =>
                 <div>
                <li key={shutter.parts[0].requiredPart}>{shutter.parts[0].requiredPart}</li>
                <li key={shutter.parts[0].additionalPart}>{shutter.parts[0].additionalPartPieces} X {numberOfOrderedPieces} {shutter.parts[0].additionalPart}</li>
                     {/*<li key={shutter.parts[0].additionalPart}>{shutter.parts[0].additionalPartPieces * numberOfOrderedPieces} {shutter.parts[0].additionalPart}</li>*/}
                 </div>
            )}
         </ul>
        )
    }


    handleAssembling(fullOrderId,currentOrderId, alreadyAssembled){
        if(alreadyAssembled==="true"){
            alert("Ez már össze van szerelve!")
            return;
        }
        axios.post(`http://localhost:8090/submitOrder/${fullOrderId}/${currentOrderId}`)
            .then(res => {alert("Összeszerelve!")})
            .catch(e => {alert(e  + "\n\nValami gond volt az összeszereléssel")});

    }

    renderAssembleButton(orderId,orderIndex,isAssembled){
        if(isAssembled==="true"){
            return <li key={orderId+isAssembled} className="btn btn-success assembleButton" onClick={this.handleAssembling.bind(this,orderId,orderIndex,isAssembled)}>Összeszerelve</li>
        }
        return <li key={orderId+isAssembled} className="btn btn-danger assembleButton" onClick={this.handleAssembling.bind(this,orderId,orderIndex,isAssembled)}>Még nincs összeszerelve!</li>
    }


    renderOrderView(orders){
        if(this.props.orders.length===0){
            return <div>NINCSENEK MEGRENDELÉSEK</div>
        }

        return (
            <div>
                <h1>FOSTOS</h1>
                <ul>
                    { orders.map(order =>
                        <div>
                            <li key={order.order.customerName}>{order.order.customerName}</li>
                            <li key={order.order.phoneNumber}>{order.order.phoneNumber}</li>
                            <li key={order.order.address}>{order.order.address}</li>
                            <ul>
                            { order.order.orders.map((currentOrder,orderIndex) =>
                                <div>
                                    <li key={currentOrder.windowType}>{currentOrder.windowType}</li>
                                    <li key={currentOrder.windowWidth}>{currentOrder.windowWidth}</li>
                                    <li key={currentOrder.windowHeight}>{currentOrder.windowHeight}</li>
                                    <li key={currentOrder.shutterMaterial}>{currentOrder.shutterMaterial}</li>
                                    <li key={currentOrder.shutterColor}>{currentOrder.shutterColor}</li>
                                    <li key={currentOrder.numberOfPieces}>{currentOrder.numberOfPieces}</li>
                                    {this.renderAssembleButton(order._id,orderIndex,currentOrder.assembled)}
                                    {this.listParts(currentOrder.shutterMaterial,currentOrder.numberOfPieces) }
                                </div>
                            )}
                            </ul>
                        </div>
                    )}
                </ul>

            </div>
        )
    }



    render() {
        return <div>
            {console.log("Worker.js")}
            <h1>WORKER</h1>
            <div>
                Felhasználó keresése: <input type="text" value={this.state.searchParameter} onChange={this.handleChange.bind(this)} name="searchParameter" required/>
                <button onClick={() => this.handleSearch()}>KERESÉS!</button>
                <button onClick={() => this.handleReset()}>VISSZAÁLLÍTÁS</button>
            </div>
            <div>
                Rendelések: {this.orderHandler()}
            </div>
            </div>

    }
}

export default Worker