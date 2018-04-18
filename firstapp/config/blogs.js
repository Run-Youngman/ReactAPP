'use strict';
const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

let fmap = require('../src/articlesHelper/fileMap.json');
let paths = [];
getPath(fmap, 'src/articles');
let pathObj = {};
paths.forEach(
    (p, index) => {
        pathObj['blog' + index] =resolveApp(p);
    }
);
module.exports = pathObj;
function getPath(obj, currentpath) {
    if (typeof obj !== 'object') {
        paths.push(currentpath);
        return;
    }
    Object.keys(obj).map(key => {
        getPath(obj[key], currentpath + '/' + key);
    });
}