"use strict";

const elements = require("./elements");
const log = require("./log");
const gen = require("./gen");

const genText = () => {
    const numOfRows = 0|parseInt(elements.rows.value, 10);

    log(`Number of rows: ${numOfRows}`);

    const data = gen(numOfRows);
    const csv = data.map(row => `"${row.join('","')}"\n`).join("");

    elements.textarea.value = csv;

    log(`data size: ${csv.length}`);
};

elements.genData.addEventListener("click", genText);

function downloadCsv(csvString = "", name = "file") {
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${name}.csv`;
    hiddenElement.click();
};

elements.downloadCsv.addEventListener("click", () => {
    downloadCsv(elements.textarea.value, elements.filename.value);
});

elements.rows.value = 100;
elements.filename.value = "sampleFile";
genText();
