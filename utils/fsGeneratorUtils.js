'use strict';

//define all dependencies and variables
var _ = require('lodash');
var alphaOnly = /[^a-zA-Z]/g;

/**
 * regex content for mapping key in files
 * @param {*} input - name provided for folder name 
 */
var regxContent = function(input) {
    var rxArray = [];
    var rxContent = "";
    var rxLength = _.size(input);
    for (var rx in input) {
        rxArray.push(rx);
    }
    rxContent = rxArray.join('|');
    return rxContent;
};

/**
 * capitalize string passed
 * @param {*} string 
 */
var capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/**
 * generate main folder name
 * @param {*} input - name provided for folder name 
 * @param {*} folderName - configs provided for creating folder name 
 */
var folderName = function(input, folderName) {
    var result = input.replace(/([A-Z]+)/g, ",$1").toLowerCase().replace(/^,/, "");
    var resultArray = result.split(",");
    var updatedInput = this[folderName[0]](resultArray, folderName[1], folderName[2])
    return updatedInput;
};

/**
 * convert string passed in uppercase as first letter and camel casing it
 * @param {*} inputArray 
 * @param {*} prefix 
 * @param {*} suffix 
 */
var camelUpperCase = function(inputArray, prefix, suffix) {
    var updatedInput = prefix;
    for (var i in inputArray) {
        updatedInput += capitalize(inputArray[i]);
    }
    updatedInput += suffix;
    return updatedInput;
};

/**
 * convert string passed in lowercase as first letter and camel casing it
 * @param {*} inputArray 
 * @param {*} prefix 
 * @param {*} suffix
 */
var camelLowerCase = function(inputArray, prefix, suffix) {
    var updatedInput = prefix;
    for (var i in inputArray) {
        if (i == 0) {
            updatedInput += inputArray[i].toLowerCase();
        } else {
            updatedInput += capitalize(inputArray[i]);
        }
    }
    updatedInput += suffix;
    return updatedInput;
};

/**
 * convert string passed in lowercase and seprate it by hyphen
 * @param {*} inputArray 
 * @param {*} prefix 
 * @param {*} suffix
 */
var lowercaseHyphenSeprated = function(inputArray, prefix, suffix) {
    var pre = prefix ? (prefix.replace(alphaOnly, '')).toLowerCase() + "-" : "";
    var suf = suffix ? "-" + (suffix.replace(alphaOnly, '')).toLowerCase() : "";
    var updatedInput = pre;
    for (var i in inputArray) {
        if (i != 0) {
            updatedInput += "-" + inputArray[i].toLowerCase();
        } else {
            updatedInput += inputArray[i].toLowerCase();
        }
    }
    updatedInput += suf;
    return updatedInput;
};

/**
 * convert string passed in uppercase and seprate it by hyphen
 * @param {*} inputArray 
 * @param {*} prefix 
 * @param {*} suffix
 */
var uppercaseHyphenSeprated = function(inputArray, prefix, suffix) {
    var pre = prefix ? capitalize(prefix.replace(alphaOnly, '')) + "-" : "";
    var suf = suffix ? "-" + capitalize(suffix.replace(alphaOnly, '')) : "";
    var updatedInput = pre;
    for (var i in inputArray) {
        if (i != 0) {
            updatedInput += "-" + capitalize(inputArray[i]);
        } else {
            updatedInput += capitalize(inputArray[i]);
        }
    }
    updatedInput += suf;
    return updatedInput;
};

/**
 * get base folder name of dir with path
 * @param {*} newPath 
 */
var getBaseFolderName = function(newPath) {
    var pathArray = newPath.split("\\");
    return pathArray[pathArray.length - 1]
};

/**
 * update file name as provided in config
 * @param {*} tempName
 * @param {*} configs
 * @param {*} input 
 */
var getupdatedFileName = function(tempName, configs, input) {
    var result = input.replace(/([A-Z]+)/g, ",$1").toLowerCase().replace(/^,/, "");
    var resultArray = result.split(",");
    if (configs && configs.length > 0) {
        var updatedInput = this[configs[0]](resultArray, configs[1], configs[2]);
        return updatedInput;
    } else {
        return tempName;
    }
};

/**
 * get replacable content tobe replaced on files
 * @param {*} tempName
 * @param {*} contentConfig 
 */
var getReplacableContent = function(tempName, contentConfig) {
    var result = tempName.replace(/([A-Z]+)/g, ",$1").toLowerCase().replace(/^,/, "");
    var resultArray = result.split(",");
    if (contentConfig && contentConfig.length > 0) {
        var updatedInput = this[contentConfig[0]](resultArray, contentConfig[1], contentConfig[2]);
        return updatedInput;
    } else {
        return tempName;
    }
};

/**
 * export all utils method
 */
module.exports = {
    regxContent: regxContent,
    capitalize: capitalize,
    folderName: folderName,
    camelUpperCase: camelUpperCase,
    camelLowerCase: camelLowerCase,
    lowercaseHyphenSeprated: lowercaseHyphenSeprated,
    uppercaseHyphenSeprated: uppercaseHyphenSeprated,
    getBaseFolderName: getBaseFolderName,
    getupdatedFileName: getupdatedFileName,
    getReplacableContent: getReplacableContent
}