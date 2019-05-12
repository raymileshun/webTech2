
function RequestService(requestDAO){
    winston = require('winston')
    md5 = require('md5.js')
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' })
        ]
    });
    if(requestDAO != undefined && requestDAO!= null){
        this.requestDAO = requestDAO;
    }
    else {
        this.requestDAO = require('./requestDAO')
    }
}



RequestService.prototype.listOrders = function(callback){
    this.requestDAO.getOrders((requests) => {
        //logger.info(`${requests.length} requests were found!`)
        callback(requests)
    })
}

RequestService.prototype.listShutters = function(callback){
    this.requestDAO.getShutters((requests) => {
        //logger.info(`${requests.length} requests were found!`)
        callback(requests)
    })
}

RequestService.prototype.listOrdersOfCustomer = function(customerName, callback){
    this.requestDAO.listOrdersOfCustomer(customerName, (requests) =>{
        //logger.info(`${requests.length} requests were found!`)
        callback(requests)
    })
}


RequestService.prototype.updateOrderWithAssembling = function(ordersId, orderIndex, success){
    this.requestDAO.updateOrderWithAssembling(ordersId, orderIndex, ()=>{success()})
};

RequestService.prototype.updateOrderWithInstallationDate = function(orderId,date, success){
    this.requestDAO.updateOrderWithInstallationDate(orderId,date, ()=>{success()})
};


RequestService.prototype.submitRequest = function(request, success, error){
    this.requestDAO.createRequest(request, ()=>{success()})
}

module.exports = RequestService;