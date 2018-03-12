"use strict";

const elements = require("./elements");
const log = require("./log");
const gen = require("./gen");

elements.genData.addEventListener("click", () => {
    const numOfRows = 0|parseInt(elements.rows.value, 10);

    log(`Number of rows: ${numOfRows}`);

    const data = gen(numOfRows);
    const csv = data.map(row => `"${row.join('","')}"\n`);

    elements.textarea.value = csv;

    log(`data size: ${csv.join("").length}`);
})
