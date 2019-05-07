
var express = require('express');
var router = express.Router();

var rs = require('./requestService')
const requestService = new rs()


router.get('/listOrders',(req,res) =>{
    if(req.query['customerName'] != undefined){

        requestService.listOrdersOfCustomer(req.query['customerName'], (requests)=>{
            res.status(200).send(requests)
        })
        return;
    }
    requestService.listOrders((requests) =>{
        //console.log(getCurrentOrderId(requests));
        res.status(200).send(requests)
    })
})


router.post('/submitOrder', (req,res) =>{
    if(req.body['order'] == undefined){
        res.status(414).send("Order must be defined");
        return;
    }
    if(req.body['order']['customerName'] == undefined || req.body['order']['customerName'] === ""){
        res.status(414).send("Customer name must be defined");
        return;
    }
    if(req.body['order']['phoneNumber'] == undefined || req.body['order']['phoneNumber'] === ""){
        res.status(414).send("Phone number must be defined");
        return;
    }
    if(req.body['order']['address'] == undefined || req.body['order']['address'] === ""){
        res.status(414).send("Address must be defined");
        return;
    }


    requestService.submitRequest(
        {order : req.body['order']},
        () => {res.status(200).send("Request recorded")},
        (cause) => {res.status(400).send(cause)}
        )
})

function getCurrentJobId(requests){
    if(requests.length==0){
        return '1';
    }
    let max=requests[0].job.jobId;
    for(i=1;i<requests.length;i++){
        if(requests[i].job.jobId>max){
            max=requests[i].job.jobId;
        }
    }
    return parseInt(max)+1;
}

function getCurrentOrderId(requests){
    if(requests.length==0){
        return '1';
    }
    let max=requests[0].order.orderId;
    for(i=1;i<requests.length;i++){
        if(requests[i].order.orderId>max){
            max=requests[i].order.orderId;
        }
    }
    return parseInt(max)+1;
}



module.exports = router;