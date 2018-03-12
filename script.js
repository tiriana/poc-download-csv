(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

module.exports = {
    main: document.getElementById("main"),
    console: document.getElementById("console"),
    textarea: document.getElementById("json"),
    getJson: document.getElementById("get-json-btn")
}

},{}],2:[function(require,module,exports){
const { console } = require("./elements");
const log = (...args) => console.textContent += args + "\n";

// window.alert = log;
// console.log = log;

module.exports = log;

},{"./elements":1}],3:[function(require,module,exports){
"use strict";

const elements = require("./elements");
const log = require("./log");

log("Log will appear here:");

},{"./elements":1,"./log":2}]},{},[3]);
