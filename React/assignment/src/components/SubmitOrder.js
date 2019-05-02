import React from "react"

class SubmitOrder extends React.Component{

    state={
            customerName: "",
            phoneNumber: "",
            address: "",
            currentOrder: {
                windowType: "Sima",
                windowHeight: "",
                windowWidth: "",
                shutterMaterial: "Acel",
                shutterColor: "Fekete",
                totalPrice: ""
            }

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleCurrentOrderChange(event){
        this.setState({ currentOrder:{...this.state.currentOrder,[event.target.name]: event.target.value}});
    }

    submit(event){
        let orderData = { order : {
                customerName: this.state.customerName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                currentOrder: {
                    windowType: this.state.currentOrder.windowType,
                    windowHeight: this.state.currentOrder.windowHeight,
                    windowWidth: this.state.currentOrder.windowWidth,
                    shutterMaterial: this.state.currentOrder.shutterMaterial,
                    shutterColor: this.state.currentOrder.shutterColor,
                    totalPrice: ""
                }
            }};
        //alert(orderData.order.customerName);
        this.props.submitOrder(orderData);
    }



        render(){
            return(
                <div>
                    <div>
                        Neve: <input type="text" onChange={this.handleChange.bind(this)} name="customerName" required/>
                    </div>
                    <div>
                        Telefonszam: <input type="tel" onChange={this.handleChange.bind(this)} name="phoneNumber" pattern="[0-9]{10}" required/>
                    </div>
                    <div>
                        Lakcim: <input type="text" onChange={this.handleChange.bind(this)} name="address" required/>
                    </div>
                    <select name="shutterMaterial" onChange={this.handleCurrentOrderChange.bind(this)}>
                        {this.props.shutters.map((shutter)=>
                            <option value={shutter.material}>{shutter.material}</option>
                        )}
                    </select>
                    <select name="shutterColor" onChange={this.handleCurrentOrderChange.bind(this)}>
                        {this.props.colors.map((color)=>
                            <option value={color}>{color}</option>
                        )}
                    </select>
                    <div>
                        {this.state.customerName}<br/>
                        {this.state.phoneNumber}<br/>
                        {this.state.address}<br/>
                        {this.state.currentOrder.shutterMaterial}<br/>
                        {this.state.currentOrder.shutterColor}<br/>
                    </div>
                    <button type="button" onClick={this.submit.bind(this)}>Submit order</button>
                    <div>csicska</div>
                </div>
            )

        }
}

export default SubmitOrder