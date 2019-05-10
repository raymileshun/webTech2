import React from "react"
import ReactDOM from 'react-dom'

class Manager extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: "1",
            day: "1",
            time:"",
            organizationInProcess: "false"
        };
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    validDay(){
        let daysInMonth =new Date(this.state.year, this.state.month, 0).getDate();
        return this.state.day <= daysInMonth;
    }

    submitOrganization(orderIndex,year,month,day){
        console.log(orderIndex+" "+year+" "+" "+month+" "+day)
        let getDateElement = "date"+orderIndex;
        let getButtonElement="button"+orderIndex;
        let emptyElement="";
        ReactDOM.render(emptyElement, document.getElementById(getDateElement));
        ReactDOM.render(emptyElement, document.getElementById(getButtonElement));
        this.setState({organizationInProcess:"false"})
        this.setState({year:new Date().getFullYear()})
        this.setState({month:"1"})
        this.setState({day:"1"})
    }

    handleOrganization(orderIndex){
        let date=new Date()
        let isDayValid=this.validDay()
        let today=String(date.getDate()).padStart(2, '0')
        let isDayLower=parseInt(this.state.day)<parseInt(today)
        let isMonthEqual=parseInt(this.state.month)===parseInt(date.getMonth()+1)
        if(this.state.year<date.getFullYear())  {
            alert("Normális évet adjon meg!")
            return;
        }
        if(this.state.year===date.getFullYear()) {
            if (this.state.month < date.getMonth()){
                alert("Normális dátumot adjon meg!")
                return;
            }
            if((isMonthEqual&&isDayLower)|| isDayValid==="false" ){
                alert("Normális dátumot adjon meg!")
                return;
            }
        } else{
            if (isDayValid==="false") {
                alert("Normális dátumot adjon meg!")
                return;
            }
        }

        this.submitOrganization(orderIndex,this.state.year,this.state.month,this.state.day)

    }


    datePicking(orderIndex){
        if(this.state.organizationInProcess==="true"){
            alert("Már egy beszerelés szervezése folyamatban van!")
            return;
        }
        this.setState({organizationInProcess:"true"})
        let year = new Date().getFullYear();
        let monthsArray=[];
        for(let i=1;i<13;i++){
                monthsArray.push(i)
        }
        let daysArray=[];
        for(let i=1;i<32;i++){
            daysArray.push(i)
        }

        let dateElement= <div>
            <select name="year" id="organizationYear" onChange={this.handleChange.bind(this)}>
                <option value={year}>{year}</option>
                <option value={year+1}>{year+1}</option>
            </select>
            <select name="month" id="organizationMonth" onChange={this.handleChange.bind(this)}>
                {monthsArray.map(month =>
                    <option value={month}>{month}</option>
                )}
            </select>
            <select name="day" id="organizationDay" onChange={this.handleChange.bind(this)}>
                    {daysArray.map(day =>
                        <option value={day}>{day}</option>
                    )}
            </select>
        </div>

        let buttonElement=<div>
            <button onClick={this.handleOrganization.bind(this,orderIndex)}>SZERVEZÉS</button>
        </div>

        let getDateElement = "date"+orderIndex;
        let getButtonElement="button"+orderIndex;
        ReactDOM.render(dateElement, document.getElementById(getDateElement));
        ReactDOM.render(buttonElement, document.getElementById(getButtonElement));
        // this.setState({organizationInProcess:"false"})
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
                        <div id={"button"+orderIndex}></div>
                    </div>
                )}
            </ul>

        </div>

    }

}

export default Manager