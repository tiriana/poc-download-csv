"use strict";

const pre = document.getElementById("console");

const log = (...args) => pre.textContent += args + "\n";

window.alert = log;
console.log = log;

alert("main 3")
console.log(1,2,3,4,5);
