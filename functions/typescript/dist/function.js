"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.post('/run', function (req, res) {
    var payload = (req.body || {}).value;
    var result = {
        "result": {
            "echo": payload
        }
    };
    res.status(200).json(result);
});
app.post('/init', function (req, res) {
    try {
        res.status(200).send();
    }
    catch (e) {
        res.status(500).send();
    }
});
app.listen(8080, function () { return console.log('Listening on port 8080'); });
//# sourceMappingURL=function.js.map