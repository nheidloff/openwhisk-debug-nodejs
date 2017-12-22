const request = require('request')

const payloadFileName = './payloads/payload.json'

run = () => {
    let payload = {
        "value": require((process.argv[2] || payloadFileName))
    }

    request({
        url: "http://localhost:8080/init",
        method: "POST",
        json: true,
        body: payload
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("/init has been successful")
            request({
                url: "http://localhost:8080/run",
                method: "POST",
                json: true,
                body: payload
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(JSON.stringify(body, null, 3))
                }
                else {
                    console.log("Error invoking /run: " + error)
                }
            })
        }
        else {
            console.log("Error invoking /init: " + error)
        }
    })
}

run()