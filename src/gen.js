"use strict";

const { intToExcelCol } = require("excel-column-name");

const gen = (rows = 0, cols = 50) => {
    const data = [];

    const head = [...Array(cols)].map((v,i) => `Header ${i}`);

    data.push([...head]);

    for(let row = 1; row <= rows; row ++) {
        const fakeData = head.map((h, i) => `${intToExcelCol(i + 1)}${row}`);
        data.push(fakeData);
    }

    return data;
}

module.exports = gen;
