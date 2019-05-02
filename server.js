var express = require('express')
var app = express();
const port = 8080;
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const studentRequestController = require('./requestController')
app.use('/',studentRequestController)

app.use(express.static('public'))

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})
