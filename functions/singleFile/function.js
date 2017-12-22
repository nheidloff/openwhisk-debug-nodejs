//const openwhisk = require('openwhisk') // sample dependency

function main(params) {
    console.log('function.js invoked adsf')
    return {
        result: params
    }
}

exports.main = main // necessary for local debugging