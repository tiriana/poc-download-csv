const { console } = require("./elements");
const log = (...args) => console.textContent += args + "\n";

// window.alert = log;
// console.log = log;

module.exports = log;
