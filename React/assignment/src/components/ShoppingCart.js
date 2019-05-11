import React from "react"

class ShoppingCart extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        let i=1;
        return(
            <div>
                <h4>Kosár tartalma:</h4>
                <table className="shoppingCartTable">
            {this.props.orders.map((order) =>
                    <div>
                        <tr>
                            <th rowSpan="2" className="text-center">{i++}. rendelés</th>
                            <th>
                                Ablak típusa
                            </th>
                            <th>
                                Ablak szélessége
                            </th>
                            <th>
                                Ablak magassága
                            </th>
                            <th>
                                Redőny anyaga
                            </th>
                            <th>
                                Redőny színe
                            </th>
                            <th>
                                Rendelt mennyiség
                            </th>
                            <th>
                                Rendelés összege
                            </th>
                        </tr>

                        <tr>
                            <td>
                                {order.windowType}
                            </td>
                            <td>
                                {order.windowWidth}
                            </td>
                            <td>
                                {order.windowHeight}
                            </td>
                            <td>
                                {order.shutterMaterial}
                            </td>
                            <td>
                                {order.shutterColor}
                            </td>
                            <td>
                                {order.numberOfPieces}
                            </td>
                            <td>
                                {order.orderPrice}
                            </td>
                        </tr>
                        {/*<li>Ablak típusa: {order.windowType}</li>*/}
                        {/*<li>Ablak szélessége: {order.windowWidth}</li>*/}
                        {/*<li>Ablak magassága: {order.windowHeight}</li>*/}
                        {/*<li>Redőny anyaga: {order.shutterMaterial}</li>*/}
                        {/*<li> Redőny színe: {order.shutterColor}</li>*/}
                        {/*<li>Rendelt mennyiség: {order.numberOfPieces}</li>*/}
                        {/*<li>Rendelés összege: {order.orderPrice}</li>*/}
                    </div>
                )}
                </table>
                <br/>
        </div>
         )
    }



}

export default ShoppingCart;