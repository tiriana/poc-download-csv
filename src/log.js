const { console: pre } = require("./elements");
const log = (...args) => {
    pre.textContent = (args + "\n" + pre.textContent).split("\n").slice(0, 6).join("\n");
    console.log(...args);
}

// window.alert = log;
// console.log = log;

module.exports = log;

// module.exports = console.log.bind(console);
