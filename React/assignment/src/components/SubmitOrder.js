import React from "react"
import OrderPicture from "./OrderPicture";
import axios from "axios";
import ShoppingCart from "./ShoppingCart";
import CustomerOrders from "./CustomerOrders";

class SubmitOrder extends React.Component {
//TODO
    //customer adattagokat és metódusokat a Customer.js-be átrakni (name, address) és majd a hivatkozásokat is this.state-ről át kell
    //írni this.propsra.

    constructor(props) {
        super(props)

        this.state = {
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
            totalPrice: "",
            orderInProcess: "no",
            orders: [],
            shutters:[],
            orderRejected: "false",
            customerOrders:[]
        }
    }

    loadShutters(){
        axios.get(`/listShutters`)
            .then(res => {
                this.setState({ shutters: res.data});
            })
    }

    componentDidMount() {
        this.loadShutters()
    }

    handleChange(event) {
        let fieldName = event.target.name
        if (this.state.orderInProcess === "yes") {
            this.setState({[event.target.name]: this.state[fieldName]})
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

    getShoppingCart() {
        if (this.state.orders.length === 0) {
            return <h1>A kosár üres!</h1>
        } else {
            return <ShoppingCart orders={this.state.orders}/>
        }

    }

    submitOrder = (orderData) => {
        axios.post('/submitOrder', orderData)
            .then(res => {
                this.setState({orderRejected: "false"});
                alert("Order submitted");
            })
            .catch(e => {
                alert(e + " order failed.");
                this.setState({orderRejected: "true"});
            });
    };

    getPriceForCurrentOrder(shutterMaterial) {
        switch (shutterMaterial) {
            case "acél":
                return this.state.shutters[0].shutter.price;
            case "műanyag":
                return this.state.shutters[1].shutter.price
            case "fa":
                return this.state.shutters[2].shutter.price
            default:
                return "2000"
        }
    }

    getFinalPrice() {
        if (this.state.orders.length !== 0) {
            let currentPrice = parseInt(this.state.currentOrder.numberOfPieces) * parseInt(this.getPriceForCurrentOrder(this.state.currentOrder.shutterMaterial))
            let ordersPrice = 0;
            (this.state.orders.map((order) =>
                ordersPrice += parseInt(order.orderPrice)
            ))
            return parseInt(currentPrice) + parseInt(ordersPrice)
        } else {
            return parseInt(this.state.currentOrder.numberOfPieces) * parseInt(this.getPriceForCurrentOrder(this.state.currentOrder.shutterMaterial))
        }
    }

    //1-es hogy a cutomerNamet is nullázza, kettes hogy csak az orderek mezőit
    resetValues(mode) {
        let values = {
            windowWidth: "",
            windowHeight: "",
            numberOfPieces: 1
        }
        this.setState({currentOrder: {...this.state.currentOrder, values}})
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

        if (this.state.currentOrder.numberOfPieces === undefined || this.state.currentOrder.numberOfPieces === "") {
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
            orderPrice: this.state.currentOrder.numberOfPieces * this.getPriceForCurrentOrder(this.state.currentOrder.shutterMaterial),
            assembled: "false"

        })
        //this.resetValues(2)
        alert("Added to cart!")

    }


    submit(event) {
        if (this.state.orderInProcess === "no") {
            alert("Először adjon hozzá valamit a kosárhoz")
            return;
        }
        let ordersPrice = 0;
        (this.state.orders.map((order) =>
            ordersPrice += parseInt(order.orderPrice)
        ))
        let orderData = {
            order: {
                customerName: this.state.customerName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                orders: this.state.orders,
                totalPrice: parseInt(ordersPrice),
                isPaid:"false",
                installationDate: "Még nincs megadva"
            }
        };


        //alert(orderData.order.customerName);
        this.submitOrder(orderData);
        if (this.state.orderRejected === "true" || this.state.orderRejected === "") {
            return;
        }
        this.setState({orderInProcess: "no"})
        this.setState({orders: []})

    }

    renderOrderButton(){
        if(this.state.orders.length===0){
            return(
                <button type="button" className="btn btn-primary btn-xl btn-danger rounded-pill mt-5"
                           onClick={this.submit.bind(this)}>Rendelés megerősítése
            </button>
            )

        }
        return(
        <button type="button" className="btn btn-primary btn-xl btn-success rounded-pill mt-5"
                onClick={this.submit.bind(this)}>Rendelés megerősítése
        </button>
        )

    }

    renderShoppingCartImage(){

        if(this.state.orders.length===0){
           return <h3 className="shoppingCartOrderNumber"><span className="btn btn-danger rounded-pill mt-5">{this.state.orders.length}</span></h3>
        }
        return(
        <h3 className="shoppingCartOrderNumber"><span className="btn btn-success rounded-pill mt-5">{this.state.orders.length}</span></h3>
        )
    }

    redirectToOrders(){
        this.loadCustomerOrders()
    }

    loadCustomerOrders() {
        axios.get(`/listOrders?customerName=`+this.state.customerName)
            .then(res => {
                this.setState({customerOrders: res.data});
            })
    }


    render() {
        if(this.state.shutters.length===0){
            return <div>Adatok betöltése</div>
        }

        return (
            <div>
                <header className="masthead text-white">
                    <div className="masthead-content">
                        <h2 className="masthead-subheading text-uppercase text-lg-left text-black-50 mb-0">OLCSÓ REDŐNY KFT</h2>
                        <div className="shoppingCartIcon">
                            <a href="#shoppingCartContainer">
                        <i className="fas fa-shopping-cart fa-3x"/>
                        {this.renderShoppingCartImage()}
                            </a>
                        </div>

                        <div className="container">
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <kbd>Neve:</kbd>
                                    </td>
                                </tr>
                                <br/>
                                <tr>
                                    <td className="col-md-2"><input className="form-control" type="text"
                                                                    placeholder="Üsse be a nevét!"
                                                                    value={this.state.customerName}
                                                                    onChange={this.handleChange.bind(this)}
                                                                    name="customerName"
                                                                    required/></td>
                                    <td>
                                        <button className="btn btn-primary" onClick={this.redirectToOrders.bind(this)}>Mutassa a rendeléseit</button>
                                    </td>

                                </tr>
                                <br/>
                                <tr>
                                    <td>
                                        <kbd>Telefonszáma:</kbd>
                                    </td>
                                    <td>
                                        <kbd>Lakcíme:</kbd>
                                    </td>
                                </tr>
                                <br/>
                                <tr>
                                    <td className="col-md-2">
                                        <input type="tel" value={this.state.phoneNumber}
                                               className="form-control"
                                               placeholder="Üsse be a telefonszámát!"
                                               onChange={this.handleChange.bind(this)}
                                               name="phoneNumber"
                                               pattern="[0-9]{11}" required/>
                                    </td>
                                    <td className="col-md-2">
                                        <input type="text" value={this.state.address}
                                               className="form-control"
                                               placeholder="Üsse be a lakcímét!"
                                               onChange={this.handleChange.bind(this)} name="address"
                                               required/>
                                    </td>
                                </tr>
                                <br/>
                                </tbody>

                            </table>
                            <table className="tableForOrders">
                                <tbody>
                                <div>
                                    <h2> {this.state.orders.length + 1}. rendelés </h2>
                                </div>
                                <div>
                                    <h5 className="form-text text-black-50">Ablak típusa:</h5>
                                    <tr>
                                        <td className="col-form-label">
                                            <select name="windowType" value={this.state.currentOrder.windowType}
                                                    className="form-control"
                                                    onChange={this.handleCurrentOrderChange.bind(this)}>
                                                <option value="Egyszárnyú">Egyszárnyú</option>
                                                <option value="Egyszárnyú bukó">Egyszárnyú bukó</option>
                                                <option value="Kétszárnyú">Kétszárnyú</option>
                                                <option value="Kétszárnyú bukó">Kétszárnyú bukó</option>
                                            </select>
                                        </td>
                                    </tr>
                                </div>
                                <tr>
                                    <td>
                                        <h5 className="form-text text-black-50">Ablak szélessége:</h5>
                                    </td>
                                    <td>
                                        <h5 className="form-text text-black-50">Ablak magassága:</h5>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="col-md-2">
                                        <input type="number" min="1"
                                               value={this.state.currentOrder.windowWidth}
                                               className="form-control"
                                               onChange={this.handleCurrentOrderChange.bind(this)}
                                               name="windowWidth" required/>
                                    </td>

                                    <td className="col-md-2">
                                        <input type="number" min="1"
                                               value={this.state.currentOrder.windowHeight}
                                               className="form-control"
                                               onChange={this.handleCurrentOrderChange.bind(this)}
                                               name="windowHeight" required/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h5 className="form-text text-black-50">Anyag:</h5>
                                    </td>
                                    <td>
                                        <h5 className="form-text text-black-50">Szín:</h5>
                                    </td>
                                </tr>


                                <tr>
                                    <td className="col-md-2">
                                        <select name="shutterMaterial"
                                                value={this.state.currentOrder.shutterMaterial}
                                                className="form-control"
                                                onChange={this.handleCurrentOrderChange.bind(this)}>
                                            {this.state.shutters.map((shutter) =>
                                                <option value={shutter.shutter.material}>{shutter.shutter.material}</option>
                                            )}
                                        </select>
                                    </td>
                                    <td className="col-md-2">
                                        <select name="shutterColor"
                                                value={this.state.currentOrder.shutterColor}
                                                className="form-control"
                                                onChange={this.handleCurrentOrderChange.bind(this)}>
                                            {this.props.colors.map((color) =>
                                                <option value={color}>{color}</option>
                                            )}
                                        </select>
                                    </td>
                                </tr>
                                <OrderPicture shutterMaterial={this.state.currentOrder.shutterMaterial}
                                              shutterColor={this.state.currentOrder.shutterColor}/>
                                <br/>
                                <tr>
                                    <td>
                                        <h2>Vásárolni kívánt darabszám:
                                            <input type="number" min="1"
                                                   value={this.state.currentOrder.numberOfPieces}
                                                   onChange={this.handleCurrentOrderChange.bind(this)}
                                                   name="numberOfPieces"/>
                                        </h2>
                                    </td>
                                    <td className="col-md-3">

                                        <h4>Jelenlegi rendelés
                                            összege: <kbd>{this.state.currentOrder.numberOfPieces * this.getPriceForCurrentOrder(this.state.currentOrder.shutterMaterial)} HUF</kbd>
                                        </h4>


                                        <h5 className="form-text text-black-50">Végösszeg: <text
                                            className="btn btn-success">{this.getFinalPrice()} HUF</text></h5>

                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="submitButtons">
                            <table>
                                <tr>
                                    <td>
                                        <button type="button" className="btn btn-primary btn-xl rounded-pill mt-5"
                                                onClick={this.addToCart.bind(this)}>Kosárhoz adás
                                        </button>
                                    </td>

                                    <td>
                                        {this.renderOrderButton()}
                                    </td>
                                </tr>
                            </table>
                        </div>


                    </div>
                    <div className="bg-circle-1 bg-circle"></div>
                    <div className="bg-circle-2 bg-circle"></div>
                    <div className="bg-circle-3 bg-circle"></div>
                    <div className="bg-circle-4 bg-circle"></div>
                </header>


                {console.log("SubmitOrder.js")}

                <div id="shoppingCartContainer">
                    <br/>
                    {this.getShoppingCart()}
                </div>
                <div>

                    <CustomerOrders customerOrders={this.state.customerOrders}/>
                </div>

            </div>
        )

    }
}

export default SubmitOrder