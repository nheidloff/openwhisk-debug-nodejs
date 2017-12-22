//const openwhisk = require('openwhisk') // sample dependency

function main(params) {
    console.log('functionAsynchReject.js invoked')
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject({ reason: "something bad happened" })
        }, 1000);
    })
}

exports.main = main // necessary for local debugging