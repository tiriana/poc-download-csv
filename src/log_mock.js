const pre = document.getElementById("console");
const log = (...args) => pre.textContent += args + "\n";

window.alert = log;
console.log = log;
