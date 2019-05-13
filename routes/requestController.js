
var express = require('express');
var router = express.Router();

var rs = require('../service/requestService')
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

router.get('/listShutters',(req,res) =>{
    requestService.listShutters((requests) =>{
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

router.post('/submitOrder/:orderId/:currentOrderIndex', (req,res) =>{
    requestService.updateOrderWithAssembling(req.params.orderId,req.params.currentOrderIndex,() => {res.status(200).send("Összeszerelve")})
});

router.post('/submitInstallationDate/:orderId/:installationDate', (req,res) =>{
    requestService.updateOrderWithInstallationDate(req.params.orderId,req.params.installationDate,() => {res.status(200).send("Szerelési időpont feljegyezve!")})
});

router.post('/submitPayment/:orderId', (req,res) =>{
    requestService.updateOrderWithPayment(req.params.orderId,() => {res.status(200).send("Kifizetés beérkezett!")})
});




module.exports = router;