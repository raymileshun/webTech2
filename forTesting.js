function testOrder(req){
    var test = JSON.stringify(req);
    var obj = JSON.parse(test);
    var testVal = obj.order;

    if(testVal === undefined){
        return false;
    }
    if(testVal.customerName === undefined || testVal.customerName === ""){
        console.log("Customer name is not correct")
        return false;
    }
    if(testVal.phoneNumber === undefined || testVal.phoneNumber === ""){
        console.log("Phone Number is not correct")
        return false;
    }
    if(testVal.address === undefined || testVal.address === ""){
        console.log("Address is not correct")
        return false;
    }


    return true;
}

module.exports = {
    "testOrder" : testOrder
};