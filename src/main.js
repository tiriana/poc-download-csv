"use strict";

const elements = require("./elements");
const log = require("./log");
const gen = require("./gen");


gen(20).map(log);
