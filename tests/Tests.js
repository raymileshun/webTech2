
var assert = require('assert');
var requestTesting = require('../forTesting');



describe('Testing response with correct order format', function(){
    it('should return succesfully',function(){
        var order = {order: {

            customerName: "Mákos",
            phoneNumber: "11111111111",
            address: "qwrqwerw",
            orders: [
                {
                    windowType: "Egyszárnyú",
                    windowHeight: "130",
                    windowWidth: "100",
                    shutterMaterial: "acél",
                    shutterColor: "fekete",
                    numberOfPieces: "1",
                    orderPrice: 12000,
                    assembled: "false"
                }
            ],
            totalPrice: 12000,
            isPaid: "false",
            installationDate: "Még nincs megadva"

        }};
        assert.equal(requestTesting.testOrder(order),true)
        console.log("Test succesful")
    })
});


describe('Testing response with incorrect order format', function(){
    it('should fail',function(){
        var order = {order: {

                customerName: "",
                phoneNumber: "11111111111",
                address: "qwrqwerw",
                orders: [
                    {
                        windowType: "Egyszárnyú",
                        windowHeight: "130",
                        windowWidth: "100",
                        shutterMaterial: "acél",
                        shutterColor: "fekete",
                        numberOfPieces: "1",
                        orderPrice: 12000,
                        assembled: "false"
                    }
                ],
                totalPrice: 12000,
                isPaid: "false",
                installationDate: "Még nincs megadva"

            }};
        assert.equal(requestTesting.testOrder(order),false)
    })
});


