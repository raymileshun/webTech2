import React from "react"
import OrderPicture from "./OrderPicture";

class SubmitOrder extends React.Component {
//TODO
    //majd a shutternek is külön collection és endpoint
    //totalPrice-ot átírnia getFinishedPrice() functionben, mert stateket kell beállítani neki

    state = {
        customerName: "",
        phoneNumber: "",
        address: "",
        currentOrder: {
            windowType: "Egyszárnyú",
            windowHeight: "",
            windowWidth: "",
            shutterMaterial: "acél",
            shutterColor: this.props.colors[0],
            numberOfPieces: "1",
            orderPrice: ""
        },
        totalPrice :"",
        orderInProcess: "no",
        orders: []
    }

    handleChange(event) {
        let fieldName = event.target.name
        if(this.state.orderInProcess === "yes"){
            this.setState({[event.target.name]: this.state[fieldName] })
            return;
        }

        this.setState({[event.target.name]: event.target.value});
    }

    handleCurrentOrderChange(event) {
        this.setState({currentOrder: {...this.state.currentOrder, [event.target.name]: event.target.value}});
    }

    matchesPattern(phoneNumber) {
        return (new RegExp(/^[0-9]{11}$/).test(phoneNumber))
    }

    getPriceForCurrentOrder(shutterMaterial){
        switch (shutterMaterial) {
            case "acél": return this.props.shutters[0].price;
            case "műanyag": return this.props.shutters[1].price
            case "fa": return this.props.shutters[2].price
            default: return "2000"
        }
    }

    getFinalPrice(){
        if(this.state.orders.length !==0){
            let currentPrice=parseInt(this.state.currentOrder.numberOfPieces*this.getPriceForCurrentOrder(this.state.currentOrder.shutterMaterial))
            let ordersPrice ="";
            (this.state.orders.map((order) =>
                ordersPrice+=parseInt(order.orderPrice)
            ))
            console.log(ordersPrice)
            return parseInt(currentPrice)+parseInt(ordersPrice)
        } else {
            return parseInt(this.state.currentOrder.numberOfPieces*this.getPriceForCurrentOrder(this.state.currentOrder.shutterMaterial))
        }
    }


    addToCart(event) {
        let errors = [];
        if (this.state.customerName === undefined || this.state.customerName === "") errors.push("Neve");
        if (this.state.phoneNumber === undefined || this.state.phoneNumber === "") {
            errors.push("Telefonszám")
        } else if (!this.matchesPattern(this.state.phoneNumber)) {
            alert("Adjon meg normális telefonszámot!")
            return;
        }

        if (this.state.address === undefined || this.state.address === "") {
            errors.push("Cím")
        }
        if (this.state.currentOrder.windowWidth === undefined || this.state.currentOrder.windowWidth === "") {
            errors.push("Ablak szélessége")
        } else if (this.state.currentOrder.windowWidth < 10) {
            alert("Adjon meg normális ablakszélességet!");
            return;
        }

        if (this.state.currentOrder.windowHeight === undefined || this.state.currentOrder.windowHeight === "") {
            errors.push("Ablak magassága")
        } else if (this.state.currentOrder.windowHeight < 10) {
            alert("Adjon meg normális ablakmagasságot!");
            return;
        }

        if (this.state.currentOrder.numberOfPieces === undefined || this.state.currentOrder.numberOfPieces=== "") {
            errors.push("Rendelés darabszáma")
        } else if (this.state.currentOrder.numberOfPieces < 1) {
            alert("Negatív rendelést nem adhat meg!");
            return;
        }

        if (errors.length !== 0) {
            alert("A következő mezőkkel gondok voltak: \n\n\t" + (errors.join("\n\t")))
            return;
        }

        this.setState({orderInProcess: "yes"})
        this.state.orders.push({
            windowType: this.state.currentOrder.windowType,
            windowHeight: this.state.currentOrder.windowHeight,
            windowWidth: this.state.currentOrder.windowWidth,
            shutterMaterial: this.state.currentOrder.shutterMaterial,
            shutterColor: this.state.currentOrder.shutterColor,
            numberOfPieces: this.state.currentOrder.numberOfPieces,
            orderPrice: this.state.currentOrder.numberOfPieces * this.getPriceForCurrentOrder(this.state.currentOrder.shutterMaterial)
        })
        alert("Added to cart!")

    }


    submit(event) {
        if(this.state.orderInProcess==="no"){
            alert("Először adjon hozzá valamit a kosárhoz")
            return;
        }
        let orderData = {
            order: {
                customerName: this.state.customerName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                orders: this.state.orders
            }
        };


        //alert(orderData.order.customerName);
        this.props.submitOrder(orderData);
        if(this.props.orderRejected==="true" || this.props.orderRejected===""){
            return;
        }
        this.setState({orderInProcess: "no"})
        this.setState({orders: []})
    }


    render() {
        return (
            <div>
                <div>
                    Neve: <input type="text" value={this.state.customerName} onChange={this.handleChange.bind(this)} name="customerName" required/>
                </div>
                <div>
                    Telefonszám: <input type="tel" value={this.state.phoneNumber} onChange={this.handleChange.bind(this)} name="phoneNumber"
                                        pattern="[0-9]{11}" required/>
                </div>
                <div>
                    Lakcím: <input type="text" value={this.state.address} onChange={this.handleChange.bind(this)} name="address" required/>
                </div>
                <div>
                    {this.state.orders.length+1}. rendelés
                </div>
                <div>
                    Ablak típusa:
                    <select name="windowType" value={this.state.currentOrder.windowType} onChange={this.handleCurrentOrderChange.bind(this)}>
                        <option value="Egyszárnyú">Egyszárnyú</option>
                        <option value="Egyszárnyú_bukó">Egyszárnyú bukó</option>
                        <option value="Kétszárnyú">Kétszárnyú</option>
                        <option value="Kétszárnyú_bukó">Kétszárnyú bukó</option>
                    </select>
                </div>
                <div>
                    Ablak szélessége: <input type="number" min="1" value={this.state.currentOrder.windowWidth} onChange={this.handleCurrentOrderChange.bind(this)}
                                             name="windowWidth" required/>
                </div>
                <div>
                    Ablak magassága: <input type="number" min="1" value={this.state.currentOrder.windowHeight} onChange={this.handleCurrentOrderChange.bind(this)}
                                            name="windowHeight" required/>
                </div>
                <div>
                    Redőny anyaga: <select name="shutterMaterial" value={this.state.currentOrder.shutterMaterial} onChange={this.handleCurrentOrderChange.bind(this)}>
                    {this.props.shutters.map((shutter) =>
                        <option value={shutter.material}>{shutter.material}</option>
                    )}
                </select>
                </div>
                <div>
                    Redőny színe: <select name="shutterColor" value={this.state.currentOrder.shutterColor} onChange={this.handleCurrentOrderChange.bind(this)}>
                    {this.props.colors.map((color) =>
                        <option value={color}>{color}</option>
                    )}
                </select>
                </div>
                <div>
                    <OrderPicture shutterMaterial={this.state.currentOrder.shutterMaterial}
                                  shutterColor={this.state.currentOrder.shutterColor}/>
                </div>
                <div>
                    Vásárolni kívánt darabszám: <input type="number" min="1" value={this.state.currentOrder.numberOfPieces} onChange={this.handleCurrentOrderChange.bind(this)}
                                            name="numberOfPieces"/>
                </div>
                <div>
                    Jelenlegi rendelés összege: {this.state.currentOrder.numberOfPieces * this.getPriceForCurrentOrder(this.state.currentOrder.shutterMaterial)} HUF
                </div>
                <div>
                   Végösszeg: {this.getFinalPrice()}
                </div>
                <div>
                    Darabszám: {this.state.currentOrder.numberOfPieces}<br/>
                    <div>
                    {this.state.orders.map((order) =>
                        <div>
                            <h4>{order.windowType}</h4>
                            <h4>{order.windowWidth}</h4>
                            <h4>{order.windowHeight}</h4>
                            <h4>{order.shutterMaterial}</h4>
                            <h4>{order.shutterColor}</h4>
                        </div>
                    )}<br/>
                </div>
                </div>
                <button type="button" onClick={this.addToCart.bind(this)}>Add order to cart.</button>
                <button type="button" onClick={this.submit.bind(this)}>Submit order</button>
            </div>
        )

    }
}

export default SubmitOrder