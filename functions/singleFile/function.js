//const openwhisk = require('openwhisk') // sample dependency

function main(params) {
    console.log('function.js invoked')
    return {
        firstName: 'Niklas',
        lastName: 'Heidloff',
        id: params.id
    }
}

exports.main = main // necessary for local debugging