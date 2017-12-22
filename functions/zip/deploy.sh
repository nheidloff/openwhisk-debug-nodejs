#!/bin/bash
zip -rq function.zip functionAsynch.js package.json node_modules
bx wsk action create zippedFunctionAsynch --kind nodejs:8 function.zip
#bx wsk action update zippedFunctionAsynch --kind nodejs:8 function.zip
rm function.zip