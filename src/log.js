const { console: pre } = require("./elements");
const log = (...args) => pre.textContent += args + "\n";

// window.alert = log;
// console.log = log;

// module.exports = log;

module.exports = console.log.bind(console);
