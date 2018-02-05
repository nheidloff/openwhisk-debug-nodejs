import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express()
app.use(bodyParser.json());

app.post('/run', (req, res) => {
    var payload = (req.body || {}).value;

    var result = { 
        "result": {
            "echo": payload
        }
    }
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

app.listen(8080, () => console.log('Listening on port 8080'))