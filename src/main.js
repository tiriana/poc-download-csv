"use strict";

const elements = require("./elements");
const log = require("./log");
const gen = require("./gen");
const filesize = require("filesize");
const downloadCsv = require("./downloadCsv");

const genData = () => {
    elements.filename.value = "sampleFile_" + Date.now();

    const numOfRows = 0 | parseInt(elements.rows.value, 10);
    const numOfCols = 0 | parseInt(elements.cols.value, 10);

    log(`generating rows: ${numOfRows}, cols: ${numOfCols}. Please wait...`);

    setTimeout(() => {
        const data = gen(numOfRows, numOfCols);
        const csv = data.map(row => `"${row.join('","')}"\n`).join("");

        elements.textarea.value = csv;

        log(`data size: ${csv.length} (~ ${filesize(csv.length)})`);
    });

};

elements.genData.addEventListener("click", genData);

elements.downloadCsv.addEventListener("click", () => {
    downloadCsv(elements.textarea.value, elements.filename.value);
});

elements.rows.value = 100;
elements.cols.value = 20;
genData();
