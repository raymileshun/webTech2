import React from "react"
import ReactDOM from 'react-dom'

class Manager extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            year: new Date(),
            picking: "false"
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }


    datePicking(orderIndex){
        let date=new Date()
        var day = String(date.getDate()).padStart(2, '0');
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var year = date.getFullYear();
        var time = date.getHours()+":"+date.getMinutes()
        console.log(year+" "+month+" "+day+"  -  "+time)
        let element= <div>
            <select name="windowType">
                <option value={year}>{year}</option>
                <option value={year+1}>{year+1}</option>
            </select>
        </div>
        let getElement = "date"+orderIndex;
        console.log(getElement);
        ReactDOM.render(element, document.getElementById(getElement));

    }

    render() {
        return <div>
            <h1>MANAGER</h1>
            <ul>
                { this.props.orders.map((order,orderIndex) =>
                    <div>
                        <li key={order.order.customerName}>{order.order.customerName}</li>
                        <li key={order.order.phoneNumber}>{order.order.phoneNumber}</li>
                        <li key={order.order.address}>{order.order.address}</li>
                        <ul>
                            { order.order.orders.map((currentOrder) =>
                                <div>
                                    <li key={currentOrder.windowType}>{currentOrder.windowType}</li>
                                    <li key={currentOrder.windowWidth}>{currentOrder.windowWidth}</li>
                                    <li key={currentOrder.windowHeight}>{currentOrder.windowHeight}</li>
                                    <li key={currentOrder.shutterMaterial}>{currentOrder.shutterMaterial}</li>
                                    <li key={currentOrder.shutterColor}>{currentOrder.shutterColor}</li>
                                    <li key={currentOrder.numberOfPieces}>{currentOrder.numberOfPieces}</li>
                                    <li key={currentOrder.assembled}>{currentOrder.assembled}</li>
                                </div>
                            )}
                        </ul>
                        <button onClick={this.datePicking.bind(this,orderIndex)}>Beszerelés megszervezése</button>
                        <div id={"date"+orderIndex}></div>
                    </div>
                )}
            </ul>

        </div>

    }

}

export default Manager