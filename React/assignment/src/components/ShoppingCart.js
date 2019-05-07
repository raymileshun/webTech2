import React from "react"
import ReactDOM from 'react-dom';

class ShoppingCart extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        let i=1;
        return(
            <div>
                Kosár tartalma:
                <ul>
            {this.props.orders.map((order) =>
                    <div>
                        {i++}. rendelés: <br/>
                        <li>Ablak típusa: {order.windowType}</li>
                        <li>Ablak szélessége: {order.windowWidth}</li>
                        <li>Ablak magassága: {order.windowHeight}</li>
                        <li>Redőny anyaga: {order.shutterMaterial}</li>
                        <li> Redőny színe: {order.shutterColor}</li>
                        <li>Rendelt mennyiség: {order.numberOfPieces}</li>
                        <li>Rendelés összege: {order.orderPrice}</li>
                    </div>
                )}
                </ul>
                <br/>
        </div>
         )
    }



}

export default ShoppingCart;