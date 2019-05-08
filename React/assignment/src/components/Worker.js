import React from "react"

class Worker extends React.Component{
    //TODO
        //ASSEMBLE CLICK MEGCSINÁLÁSA (isAssembled belerakása a submitOrderbe is)

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


    renderOrderView(orders){
        return (
            <div>
                <h1>FOSTOS</h1>
                <ul>
                    { orders.map(order =>
                        <div>
                            <li key={order.order.customerName}>{order.order.customerName}</li>
                            <li key={order.order.phoneNumber}>{order.order.phoneNumber}</li>
                            <li key={order.order.address}>{order.order.address}</li>
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