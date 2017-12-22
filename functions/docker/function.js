const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/init', function (req, res) {
    try {
        res.status(200).send();
    }
    catch (e) {
        res.status(500).send();
    }
});

app.post('/run', function (req, res) {
    var payload = (req.body || {}).value;

    var result = {
        "result": {
            "echo": payload
        }
    }
    res.status(200).json(result);
});

app.listen(8080, function () {
    console.log('Listening on port 8080')
})