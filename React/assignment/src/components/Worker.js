import React from "react"
import axios from "axios"

class Worker extends React.Component{
    //TODO
        //ASSEMBLE CLICK MEGCSINÁLÁSA (isAssembled belerakása a submitOrderbe is)
    //Assemblenél majd egy piros gomb ha még nincs összeszerelve, és egy zöld hogyha összevan

    constructor(props){
        super(props)

        this.state={
            ordersForOneCustomer:[],
            searchParameter:"",
            submitSearch:"false"
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

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
        const ordersForCustomer = this.props.orders.filter(order=>order.order.customerName===customerName);
        ordersForCustomer.map((order) =>
            this.state.ordersForOneCustomer.push(order)
        )
        return this.renderOrderView(this.state.ordersForOneCustomer)
    }

    orderHandler(){
        if(this.state.submitSearch==="false"){
            return this.renderOrderView(this.props.orders)
        } else{
            return this.loadOrdersForCustomer(this.state.searchParameter)
        }
    }

    handleSearch(){
        if(this.state.ordersForOneCustomer.length!==0){
            return this.setState({ordersForOneCustomer:[]})
        }
        if(this.state.searchParameter===""){
            return this.setState({submitSearch: "false"})
        }
        return this.setState({submitSearch: "true"})
    }

    handleReset(){
        this.setState({submitSearch: "false"})
        this.setState({searchParameter: ""})
        this.setState({ordersForOneCustomer:[]})
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
        console.log(currentOrderId)
        if(alreadyAssembled==="true"){
            alert("Ez már össze van szerelve!")
            return;
        }
        axios.post(`http://localhost:8090/submitOrder/${fullOrderId}/${currentOrderId}`)
            .then(res => {alert("Összeszerelve!")})
            .catch(e => {alert(e  + "\n\nValami gond volt az összeszereléssel")});

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
                                    <li key={currentOrder.assembled} onClick={this.handleAssembling.bind(this,order._id,orderIndex,currentOrder.assembled)}>{currentOrder.assembled}</li>
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