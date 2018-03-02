# Debugging Node.js OpenWhisk Functions in VS Code

This [project](https://github.com/nheidloff/openwhisk-debug-nodejs) shows how [Apache OpenWhisk](http://openwhisk.org/) functions can be developed and debugged locally via [Visual Studio Code](https://code.visualstudio.com/).

This project doesn't contain a new tool or OpenWhisk extension. Instead it contains sample functions and configurations of VS Code that explain how to debug your own OpenWhisk functions.

You don't need to use Docker to debug functions unless you want to write your functions in Docker containers. In the simplest case clone the repo, overwrite the samples in functions/singleFile with your own code and run the debug configurations.

Five different scenarios are supported:

* Single file JavaScript functions (synch and asynch)
* Zipped JavaScript functions with additional npm dependencies
* JavaScript functions running in Docker containers
* Dockerized JavaScript functions running in the local Node.js runtime
* TypeScript functions running in Docker containers

Watch the [video](https://www.youtube.com/watch?v=P9hpcOqQ3hw) to see this in action.

The following screenshot shows how functions that run in Docker can be debugged from Visual Studio Code. In order to do this, a volume is used to share the files between the IDE and the container and VS Code attaches a remote debugger to the Docker container. The functions can be changed in the IDE without having to restart the container. [nodemon](https://github.com/remy/nodemon) restarts the Node application in the container automatically when files change.

![alt text](https://github.com/nheidloff/openwhisk-debug-nodejs/raw/master/images/debugging-docker-3.png "Debugging")


## Prerequisites and Setup

In order to run the code you need the following prerequisites and you need to set up your system.

**Prerequisites**

Make sure you have the following tools installed:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Node](https://nodejs.org/en/download/)
* [Docker](https://docs.docker.com/engine/installation/)
* [git](https://git-scm.com/downloads)
* [IBM Cloud account](https://ibm.biz/nheidloff)


**Setup**

Run the following commands:

```sh
$ git clone https://github.com/nheidloff/openwhisk-debug-nodejs.git
$ cd openwhisk-debug-nodejs
$ npm install
$ code .
```

**Debugging from Visual Studio Code**

There are two ways to start the debugger in VS Code:

* From the [debug page](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/start-debugger-ui.png) choose the specific launch configuration
* Open the [command palette](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/start-debugger-palette-1.png) (⇧⌘P) and search for 'Debug: Select and Start Debugging' or enter 'debug se'. After this select the specific [launch configuration](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/start-debugger-palette-2.png)


## Debugging Single File Functions

There are three sample functions:

* [function.js](functions/singleFile/function.js)
* [functionAsynch.js](functions/singleFile/functionAsynch.js)
* [functionAsychReject.js](functions/singleFile/functionAsychReject.js)

**Debugging**

To run and debug the functions, you can define the input as JSON in [payload.json](payloads/payload.json). In order to debug the functions, set breakpoints in the code.

Run the launch configurations 'function.js', 'functionAsynch.js' and 'functionAsychReject.js' to run and debug the functions - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-single-file-1.png).

**Deployment and Invocation**

In order to deploy the functions to IBM Cloud Functions, replace 'your-ibm-cloud-organization' and 'your-ibm-cloud-space' and run the following commands:

```sh
$ bx login -a api.ng.bluemix.net
$ bx target -o <your-ibm-cloud-organization> -s <your-ibm-cloud-space>
$ bx plugin install Cloud-Functions -r Bluemix
$ cd openwhisk-debug-nodejs/functions/singleFile
$ bx wsk action create function function.js
$ bx wsk action invoke --blocking function --param name Niklas
$ bx wsk action create functionAsynch functionAsynch.js
$ bx wsk action invoke --blocking functionAsynch --param name Niklas
$ bx wsk action create functionAsynchReject functionAsynchReject.js
$ bx wsk action invoke --blocking functionAsynchReject --param name Niklas
```

After you've changed the functions and created them on IBM Cloud Functions, use 'bx wsk action update' instead of 'bx wsk action create'.


## Debugging Zipped Functions

There is a sample function [functionAsynch.js](functions/zip/functionAsynch.js) that shows how to use a npm module which is not supported by the standard [OpenWhisk Node runtime](https://hub.docker.com/r/openwhisk/nodejs6action/~/dockerfile/).

**Debugging**

To run and debug the function, you can define the input as JSON in [payload.json](payloads/payload.json). In order to debug the function, set breakpoints in [functionAsynch.js](functions/zip/functionAsynch.js).

Install the npm modules:

```sh
$ cd openwhisk-debug-nodejs/functions/zip
$ npm install
```

Run the launch configurations 'zip' to run and debug the function - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-zip.png).

**Deployment and Invocation**

In order to deploy the functions to IBM Cloud Functions, replace 'your-ibm-cloud-organization' and 'your-ibm-cloud-space' and run the following commands:

```sh
$ bx login -a api.ng.bluemix.net
$ bx target -o <your-ibm-cloud-organization> -s <your-ibm-cloud-space>
$ bx plugin install Cloud-Functions -r Bluemix
$ cd openwhisk-debug-nodejs/functions/zip
$ sh deploy.sh
$ bx wsk action invoke --blocking zippedFunctionAsynch --param name Niklas
```

After you've changed the function and created it on IBM Cloud Functions, use 'bx wsk action update' instead of 'bx wsk action create' in [deploy.sh](functions/zip/deploy.sh).


## Debugging Functions in Docker Containers

There is a sample function [function.js](functions/docker/function.js) that shows how to write an OpenWhisk function running in a container by implementing the endpoints '/init' and '/run'.

The function can be changed in the IDE without having to restart the container after every change. Instead a mapped volume is used to share the files between the IDE and the container and [nodemon](https://github.com/remy/nodemon) restarts the Node application in the container automatically when files change.

**Debugging**

Run the following commands in a terminal to run the container - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-docker-1.png):

```sh
$ cd openwhisk-debug-nodejs/functions/docker
$ docker-compose up --build
```

Run the launch configurations 'function in container' to attach the debugger - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-docker-2.png).

You can define the input as JSON in [payload.json](payloads/payload.json). Set breakpoints in [function.js](functions/docker/function.js). After this invoke the endpoints in the container by running these commands from a second terminal - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-docker-3.png).

```sh
$ cd openwhisk-debug-nodejs
$ node runDockerFunction.js
```

You'll see the output of the function in the terminal - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-docker-4.png).

After you're done stop the container via these commands in the first terminal - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-docker-5.png):

```sh
$ cd openwhisk-debug-nodejs/functions/docker
$ docker-compose down
```

**Deployment and Invocation**

In order to deploy the functions to IBM Cloud Functions, replace 'your-ibm-cloud-organization', 'your-ibm-cloud-space' and 'dockerhub-name' and run the following commands:

```sh
$ bx login -a api.ng.bluemix.net
$ bx target -o <your-ibm-cloud-organization> -s <your-ibm-cloud-space>
$ bx plugin install Cloud-Functions -r Bluemix
$ cd openwhisk-debug-nodejs/functions/docker
$ docker build -t <dockerhub-name>/openwhisk-docker-nodejs-debug:latest .
$ docker push <dockerhub-name>/openwhisk-docker-nodejs-debug
$ bx wsk action create actionDocker --docker <dockerhub-name>/openwhisk-docker-nodejs-debug:latest
$ bx wsk action invoke --blocking actionDocker --param name Niklas
```


## Debugging dockerized Functions

You can run and debug the same dockerized function [function.js](functions/docker/function.js) in your local Node.js runtime without Docker.

**Debugging**

Run these commands to install the dependencies:

```sh
$ cd openwhisk-debug-nodejs/functions/docker
$ npm install
```

Run the launch configurations 'dockerized function' to launch the debugger - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-dockerized-1.png).

You can define the input as JSON in [payload.json](payloads/payload.json). Set breakpoints in [function.js](functions/docker/function.js). After this invoke the endpoints in the container by running these commands from a terminal - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-dockerized-3.png).

```sh
$ cd openwhisk-debug-nodejs
$ node runDockerFunction.js
```

**Deployment and Invocation**

See above. This is identical to 'Debugging Functions in Docker Containers'.


## Debugging TypeScript Functions in Docker Containers

There is a sample function [function.ts](functions/typescript/src/function.ts) that shows how to write an OpenWhisk function in TypeScript running in a container by implementing the endpoints '/init' and '/run'.

The function can be changed in the IDE without having to restart the container after every change. Instead a mapped volume is used to share the files between the IDE and the container and [nodemon](https://github.com/remy/nodemon) restarts the Node application in the container automatically when files change.

**Debugging**

Run the launch configurations 'typescript function' to start the container and to attach the debugger - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-typescript.png).

You can define the input as JSON in [payload.json](payloads/payload.json). Set breakpoints in [function.ts](functions/typescript/src/function.ts). After this invoke the endpoints in the container by running these commands from a second terminal.

```sh
$ cd openwhisk-debug-nodejs
$ node runDockerFunction.js
```

You'll see the output of the function in the terminal.

After you're done stop the container via these commands in the first terminal.

```sh
$ cd openwhisk-debug-nodejs/functions/typescript
$ docker-compose down
```

**Deployment and Invocation**

In order to deploy the functions to IBM Cloud Functions, replace 'your-ibm-cloud-organization', 'your-ibm-cloud-space' and 'dockerhub-name' and run the following commands:

```sh
$ bx login -a api.ng.bluemix.net
$ bx target -o <your-ibm-cloud-organization> -s <your-ibm-cloud-space>
$ bx plugin install Cloud-Functions -r Bluemix
$ cd openwhisk-debug-nodejs/functions/typescript
$ docker build -t <dockerhub-name>/openwhisk-docker-typescript-debug:latest .
$ docker push <dockerhub-name>/openwhisk-docker-typescript-debug
$ bx wsk action create actionTypeScript --docker <dockerhub-name>/openwhisk-docker-typescript-debug:latest
$ bx wsk action invoke --blocking actionTypeScript --param name Niklas
```


## Resources

To find out more about how to develop OpenWhisk functions locally, check out the following resources:

* [Advanced debugging of OpenWhisk actions](https://medium.com/openwhisk/advanced-debugging-of-openwhisk-actions-518414636932)
* [wskdb: The OpenWhisk Debugger](https://github.com/apache/incubator-openwhisk-debugger)
* [Testing node.js functions locally](https://github.com/apache/incubator-openwhisk-devtools/tree/master/node-local)