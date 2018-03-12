"use strict";

const faker = require("faker");

const gen = (rows = 0, fakerKey = "address") => {
    const data = [];

    const head = Object.keys(faker[fakerKey]);

    data.push([...head]);

    while(rows-- > 0) {
        const fakeData = head.map(colHead => faker[fakerKey][colHead]());
        data.push(fakeData);
    }

    return data;
}

module.exports = gen;
