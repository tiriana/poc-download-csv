"use strict";

const elements = require("./elements");
const log = require("./log");
const gen = require("./gen");

let numRows = 20;

elements.genData.addEventListener("click", () => {
    console.log(gen(numRows).map(row => `"${row.join('","')}"\n`));
    elements.textarea.value = gen(numRows).map(row => `"${row.join('","')}"\n`).join("");
})

gen(20).map(log);
