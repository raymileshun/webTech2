
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
        logger.info(`${requests.length} requests were found!`)
        callback(requests)
    })
}

RequestService.prototype.listOneOrder = function(orderId, callback){
    this.requestDAO.getOneOrder(orderId, (requests) =>{
        logger.info(`${requests.length} requests were found!`)
        callback(requests)
    })
}



RequestService.prototype.submitRequest = function(request, success, error){
    this.requestDAO.createRequest(request, ()=>{success()})
}

module.exports = RequestService;