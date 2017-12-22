//const openwhisk = require('openwhisk') // sample dependency

function main(params) {
    console.log('functionAsynch.js invoked')
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve({ done: true, echo: params })
        }, 1000);
    })
}

exports.main = main // necessary for local debugging