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
