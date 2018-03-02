const sst = require('string-to-stream'); // sample dependency

function main(params) {
    console.log('zip functionAsynch.js invoked')
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve({ done: true, echo: params })
        }, 1000);
    })
}

exports.main = main