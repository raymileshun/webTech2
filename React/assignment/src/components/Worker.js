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
        this.setState({[event.target.name]: event.target.value});
    }



    loadOrdersForCustomer(customerName) {
        const ordersForCustomer = this.props.orders.filter(order=>order.order.customerName===customerName);
        ordersForCustomer.map((order) =>
            this.state.ordersForOneCustomer.push(order)
        )
        return this.renderOrderView(this.state.ordersForOneCustomer)


        return;
    }

    orderHandler(){
        if(this.state.submitSearch==="false"){
            return this.renderOrderView(this.props.orders)
        } else{
            return this.loadOrdersForCustomer(this.state.searchParameter)
            this.setState({submitSearch:"false"})

        }
    }

    handleSearch(){
        return this.setState({submitSearch: "true"})
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
                Felhasználó keresése: <input type="text" onChange={this.handleChange.bind(this)} name="searchParameter" required/>
                <button onClick={() => this.handleSearch()}>KERESÉS!</button>
            </div>
            <div>
                Rendelések: {this.orderHandler()}
            </div>
            </div>

    }
}

export default Worker