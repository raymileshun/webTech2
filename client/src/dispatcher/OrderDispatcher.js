import {Dispatcher} from 'flux'
import axios from "axios";

import OrderConstants from '../constants/OrderConstants'

import OrderStore from '../store/OrderStore'
import OrderActions from "../actions/OrderActions";


class OrderDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            payload : action
        });
    }
}

const dispatcher = new OrderDispatcher();


dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.LIST_ORDERS){
        return;
    }

    axios.get(`/listOrders`)
        .then(res => {
            OrderStore.orders=res.data;
            OrderStore.emitChange()
        })
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.LIST_SHUTTERS){
        return;
    }
    fetch('/listShutters',{
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    }).then(response =>{ return response.json()})
        .then(result =>{
            OrderStore.shutters = result;
            OrderStore.emitChange();
        });
});



dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.UPDATE_ASSEMBLE){
        return;
    }
    axios.post(`/submitAssembling/${data.payload.payload.orderId}/${data.payload.payload.orderIndex}`)
        .then(res => {
            alert("Összeszerelve!")
            // OrderActions.listOrders();
            OrderStore.emitChange();
        })
        .catch(e => {
            alert(e + "\n\nValami gond volt az összeszereléssel")
        });


});

dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.SUBMIT_ORDER){
        return;
    }

    axios.post('/submitOrder', data.payload.payload.orderData)
        .then(res => {alert("Rendelés felvéve!"); })
        .catch(e => {alert(e  + " order failed.")});
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.UPDATE_PAYMENT){
        return;
    }
    axios.post(`/submitPayment/${data.payload.payload.orderId}`)
        .then(res => {
            alert("Az összeget a beérkezésekor hagyjuk majd jóvá!")
        })
        .catch(e => {
            alert(e + "\n\nValami gond volt a kifuzetéssel")
        });
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.LIST_ORDERS_FOR_USER){
        return;
    }

    axios.get(`/listOrders?customerName=${data.payload.payload.customerName}`)
        .then(res => {
            OrderStore.orders = res.data;
            OrderStore.emitChange();
        })

});


dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.UPDATE_DATE){
        return;
    }
    axios.post(`/submitInstallationDate/${data.payload.payload.orderId}/${data.payload.payload.date}`)
        .then(res => {
            alert("Megszervezve!");
            // OrderActions.listOrders()
            OrderStore.emitChange()
        })
        .catch(e => {
            alert(e + "\n\nValami gond volt a megszervezéssel")
        });


});

export default dispatcher;