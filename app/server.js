const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

// default route
app.get('/', function (req, res) {
    return res.send({error: true, message: 'hello'})
});

app.use("", routes);

// set port
app.listen(9000, function () {
    console.log('Node app is running on port 9000');
});

