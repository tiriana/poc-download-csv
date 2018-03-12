(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

exports.intToExcelCol = function (number) {
  var colName = '',
    dividend = Math.floor(Math.abs(number)),
    rest;

  while (dividend > 0) {
    rest = (dividend - 1) % 26;
    colName = String.fromCharCode(65 + rest) + colName;
    dividend = parseInt((dividend - rest)/26);
  }
  return colName;
};


exports.excelColToInt = function (colName) {
  var digits = colName.toUpperCase().split(''),
    number = 0;

  for (var i = 0; i < digits.length; i++) {
    number += (digits[i].charCodeAt(0) - 64)*Math.pow(26, digits.length - i - 1);
  }

  return number;    
};

},{}],2:[function(require,module,exports){
(function (global){
"use strict";

/**
 * filesize
 *
 * @copyright 2018 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 3.6.0
 */
(function (global) {
	var b = /^(b|B)$/,
	    symbol = {
		iec: {
			bits: ["b", "Kib", "Mib", "Gib", "Tib", "Pib", "Eib", "Zib", "Yib"],
			bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
		},
		jedec: {
			bits: ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],
			bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
		}
	},
	    fullform = {
		iec: ["", "kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi", "yobi"],
		jedec: ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"]
	};

	/**
  * filesize
  *
  * @method filesize
  * @param  {Mixed}   arg        String, Int or Float to transform
  * @param  {Object}  descriptor [Optional] Flags
  * @return {String}             Readable file size String
  */
	function filesize(arg) {
		var descriptor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var result = [],
		    val = 0,
		    e = void 0,
		    base = void 0,
		    bits = void 0,
		    ceil = void 0,
		    full = void 0,
		    fullforms = void 0,
		    neg = void 0,
		    num = void 0,
		    output = void 0,
		    round = void 0,
		    unix = void 0,
		    separator = void 0,
		    spacer = void 0,
		    standard = void 0,
		    symbols = void 0;

		if (isNaN(arg)) {
			throw new Error("Invalid arguments");
		}

		bits = descriptor.bits === true;
		unix = descriptor.unix === true;
		base = descriptor.base || 2;
		round = descriptor.round !== void 0 ? descriptor.round : unix ? 1 : 2;
		separator = descriptor.separator !== void 0 ? descriptor.separator || "" : "";
		spacer = descriptor.spacer !== void 0 ? descriptor.spacer : unix ? "" : " ";
		symbols = descriptor.symbols || descriptor.suffixes || {};
		standard = base === 2 ? descriptor.standard || "jedec" : "jedec";
		output = descriptor.output || "string";
		full = descriptor.fullform === true;
		fullforms = descriptor.fullforms instanceof Array ? descriptor.fullforms : [];
		e = descriptor.exponent !== void 0 ? descriptor.exponent : -1;
		num = Number(arg);
		neg = num < 0;
		ceil = base > 2 ? 1000 : 1024;

		// Flipping a negative number to determine the size
		if (neg) {
			num = -num;
		}

		// Determining the exponent
		if (e === -1 || isNaN(e)) {
			e = Math.floor(Math.log(num) / Math.log(ceil));

			if (e < 0) {
				e = 0;
			}
		}

		// Exceeding supported length, time to reduce & multiply
		if (e > 8) {
			e = 8;
		}

		// Zero is now a special case because bytes divide by 1
		if (num === 0) {
			result[0] = 0;
			result[1] = unix ? "" : symbol[standard][bits ? "bits" : "bytes"][e];
		} else {
			val = num / (base === 2 ? Math.pow(2, e * 10) : Math.pow(1000, e));

			if (bits) {
				val = val * 8;

				if (val >= ceil && e < 8) {
					val = val / ceil;
					e++;
				}
			}

			result[0] = Number(val.toFixed(e > 0 ? round : 0));
			result[1] = base === 10 && e === 1 ? bits ? "kb" : "kB" : symbol[standard][bits ? "bits" : "bytes"][e];

			if (unix) {
				result[1] = standard === "jedec" ? result[1].charAt(0) : e > 0 ? result[1].replace(/B$/, "") : result[1];

				if (b.test(result[1])) {
					result[0] = Math.floor(result[0]);
					result[1] = "";
				}
			}
		}

		// Decorating a 'diff'
		if (neg) {
			result[0] = -result[0];
		}

		// Applying custom symbol
		result[1] = symbols[result[1]] || result[1];

		// Returning Array, Object, or String (default)
		if (output === "array") {
			return result;
		}

		if (output === "exponent") {
			return e;
		}

		if (output === "object") {
			return { value: result[0], suffix: result[1], symbol: result[1] };
		}

		if (full) {
			result[1] = fullforms[e] ? fullforms[e] : fullform[standard][e] + (bits ? "bit" : "byte") + (result[0] === 1 ? "" : "s");
		}

		if (separator.length > 0) {
			result[0] = result[0].toString().replace(".", separator);
		}

		return result.join(spacer);
	}

	// Partial application for functional programming
	filesize.partial = function (opt) {
		return function (arg) {
			return filesize(arg, opt);
		};
	};

	// CommonJS, AMD, script tag
	if (typeof exports !== "undefined") {
		module.exports = filesize;
	} else if (typeof define === "function" && define.amd) {
		define(function () {
			return filesize;
		});
	} else {
		global.filesize = filesize;
	}
})(typeof window !== "undefined" ? window : global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
"use strict";

const log = require("./log");

const blobCsv = (csvString, fileName) => {
    log("triggering download using blob");
    var blob = new Blob([csvString]);
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveBlob(blob, fileName);
    else {
        const a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
blobCsv.isSupported = () => !!window.Blob;

const uriCsv = (csvString, fileName) => {
    log("triggering download using encodeURI");
    const hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
    hiddenElement.target = "_blank";
    hiddenElement.download = fileName;
    hiddenElement.click();
}
uriCsv.isSupported = () => true;

const downloaders = [blobCsv, uriCsv];

function downloadCsv(csvString = "", name = "file") {
    downloaders.some(downloader => {
        if (downloader.isSupported()) {
            downloader(csvString, `${name}.csv`);
            return true;
        }
    });
};

module.exports = downloadCsv;

},{"./log":6}],4:[function(require,module,exports){
"use strict";

module.exports = {
    console: document.getElementById("console"),
    textarea: document.getElementById("json"),
    genData: document.getElementById("gen-data-btn"),
    downloadCsv: document.getElementById("download-csv"),
    rows: document.getElementById("rows"),
    cols: document.getElementById("cols"),
    filename: document.getElementById("filename")
}

},{}],5:[function(require,module,exports){
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

},{"excel-column-name":1}],6:[function(require,module,exports){
const { console: pre } = require("./elements");
const log = (...args) => {
    pre.textContent = (args + "\n" + pre.textContent).split("\n").slice(0, 4).join("\n");
    console.log(...args);
}

// window.alert = log;
// console.log = log;

module.exports = log;

// module.exports = console.log.bind(console);

},{"./elements":4}],7:[function(require,module,exports){
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

elements.rows.value = 1000;
elements.cols.value = 50;
genData();

},{"./downloadCsv":3,"./elements":4,"./gen":5,"./log":6,"filesize":2}]},{},[7]);
