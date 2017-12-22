const actionFileName = './functions/singleFile/function.js'
const payloadFileName = './payloads/payload.json'

run = () => {
    let openWhiskFunction = require((process.argv[2] || actionFileName))
    let payload = require((process.argv[3] || payloadFileName))

    const mainFunction = openWhiskFunction.main ? openWhiskFunction.main : fallback(actionFileName);
    let promise = mainFunction(payload)

    if (promise.then) {
        promise.then(
            function (response) {
                console.log(JSON.stringify(response, null, 3))
            })
            .catch(
            function (reason) {
                console.error(JSON.stringify(reason, null, 3))
                return {}
            });
    }
    else {
        console.log(JSON.stringify(promise, null, 3))
    }
}

// copied from https://github.com/apache/incubator-openwhisk-devtools/blob/master/node-local/test.js#L65
// this works for running the functions, but not for debugging them
function fallback(action) {
    eval(require("fs").readFileSync(action, "utf-8"));
    if (main) {
        return main;
    } else {
        console.error(action + " has no function main or no exports.main");
        process.exit(1);
    }
}

run()