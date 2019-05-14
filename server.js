var express = require('express')
var path = require('path')
var app = express();
const port = 8090;
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const requestController = require('./routes/requestController')
app.use('/',requestController)

// app.use(express.static('client/build'))
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})
module.exports=app
