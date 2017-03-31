/**
 * @project enfsaddins
 * @filename addins.js
 * @description Add functions to the fs module
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 18-02-2016.
 * @version 0.1.1
 */

"use strict";

function noop() {
}

function addins(fs) {
    const fnsExist = [["existStat", "stat"], ["existLStat", "lstat"], ["existFStat", "fstat"]];
    fnsExist.forEach((fnE) => {
        fs[fnE[0]] = function(arg, callback) { callback && fs[fnE[1]](arg, (err, stat) => callback(null, !err, err || stat)); }
    });

    const fnExistSync = [["existStatSync", "statSync"], ["existLStatSync", "lstatSync"], ["existFStatSync", "fstatSync"]];
    fnExistSync.forEach((fnE) => {
        fs[fnE[0]] = function(arg) {
            try {
                fs[fnE[1]](arg);
                return true;
            } catch (err) {
                return false;
            }
        }
    });

    fs.existAccess = function (path, mode, callback) {
        callback = callback || noop;
        if (typeof mode === "function") {
            callback = mode;
            mode = null;
        }
        fs.access(path, mode, (err) => {
            callback(null, !err);
        });
    };
    fs.existAccessSync = function (path, mode) {
        try {
            fs.accessSync(path, mode);
            return true;
        } catch (err) {
            return false;
        }
    };
    fs.exists = ((function (exists) {
        return function (path, callback) {
            callback = callback || noop;
            if (exists) {
                exists(path, (e) => {
                    callback(null, e);
                });
            } else {
                fs.existStat(path, callback);
            }
        };
    })(fs.exists));

    fs.existsSync = fs.existsSync || fs.existStatSync;

    const fnsAsync = [
        {name: "existStatIsDirectory", fsFn: "stat", statType: "isDirectory"},
        {name: "existLStatIsDirectory", fsFn: "lstat", statType: "isDirectory"},
        {name: "existFStatIsDirectory", fsFn: "fstat", statType: "isDirectory"},
        {name: "existStatIsFile", fsFn: "stat", statType: "isFile"},
        {name: "existLStatIsFile", fsFn: "lstat", statType: "isFile"},
        {name: "existFStatIsFile", fsFn: "fstat", statType: "isFile"},
        {name: "existIsSymlink", fsFn: "lstat", statType: "isSymbolicLink"}
    ];
    const fnsSync = [
        {name: "existStatIsDirectorySync", fsFn: "statSync", statType: "isDirectory"},
        {name: "existLStatIsDirectorySync", fsFn: "lstatSync", statType: "isDirectory"},
        {name: "existFStatIsDirectorySync", fsFn: "fstatSync", statType: "isDirectory"},
        {name: "existStatIsFileSync", fsFn: "statSync", statType: "isFile"},
        {name: "existLStatIsFileSync", fsFn: "lstatSync", statType: "isFile"},
        {name: "existFStatIsFileSync", fsFn: "fstatSync", statType: "isFile"},
        {name: "existIsSymlinkSync", fsFn: "lstatSync", statType: "isSymbolicLink"}
    ];

    fnsAsync.forEach((fn) => {
        fs[fn.name] = function(path, callback) { callback && fs[fn.fsFn](path, (err, stat) => callback(null, err ? false : !!stat[fn.statType](), err || stat)); }
    });

    fnsSync.forEach((fn) => {
        fs[fn.name] = function(path) {
            try {
                const stat = fs[fn.fsFn](path);
                return !!stat[fn.statType]();
            } catch (err) {
                return false;
            }
        };
    });
    return fs;
}


module.exports = addins;