// script for encode to hex the constructor values
var abi = require('ethereumjs-abi')

var parameterTypes = ["uint256", "bool"];
var parameterValues = ["4444", true];

var encoded = abi.rawEncode(parameterTypes, parameterValues);

console.log(encoded.toString('hex'));

/// or try this https://abi.hashex.org/