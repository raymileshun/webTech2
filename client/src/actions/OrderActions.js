import OrderConstants from '../constants/OrderConstants'
import OrderDispatcher from '../dispatcher/OrderDispatcher';

class OrderActions {

    listOrders(){
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.LIST_ORDERS,
            payload : null
        });
    }

    listShutters(){
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.LIST_SHUTTERS,
            payload : null
        });
    }

    updateOrderWithAssembling(orderId,orderIndex){
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.UPDATE_ASSEMBLE,
            payload : {
                orderId : orderId,
                orderIndex : orderIndex
            }
        });
    }

    updateOrderWithPayment(orderId){
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.UPDATE_PAYMENT,
            payload : {
                orderId : orderId
            }
        });
    }

    submitOrder(orderData){
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.SUBMIT_ORDER,
            payload : {
                orderData : orderData
            }
        });
    }

    listOrdersForOneCustomer(customerName){
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.LIST_ORDERS_FOR_USER,
            payload : {
                customerName: customerName
            }
        });
    }


    updateOrderWithInstallationDate(orderId,date){
        OrderDispatcher.handleViewAction({
            actionType : OrderConstants.UPDATE_DATE,
            payload : {
                orderId: orderId,
                date:date}
        });
    }
}

export default new OrderActions();