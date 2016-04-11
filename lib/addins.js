/**
 * @project enfsaddins
 * @filename addins.js
 * @description Add functions to the fs module
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 18-02-2016.
 * @version 0.0.3
 */

"use strict";

module.exports = addins;

function addins(fs) {
    fs.existStat = function(path, callback) {
        fs.stat(path, (err, stat) => {
            callback(null, err ? false : true, err || stat);
        });
    };
    fs.existLStat = function(path, callback) {
        fs.lstat(path, (err, stat) => {
            callback(null, err ? false : true, err || stat);
        });
    };
    fs.existFStat = function(fd, callback) {
        fs.fstat(fd, (err, stat) => {
            callback(null, err ? false : true, err || stat);
        });
    };
    fs.existStatSync = function(path) {
        try {
            fs.statSync(path);
            return true;
        } catch (err) {
            return false;
        }
    };
    fs.existLStatSync = function(path) {
        try {
            fs.lstatSync(path);
            return true;
        } catch (err) {
            return false;
        }
    };
    fs.existSStatSync = function(fd) {
        try {
            fs.fstatSync(fd);
            return true;
        } catch (err) {
            return false;
        }
    };
    fs.existAccess = function(path, mode, callback) {
        if (typeof mode === "function") {
            callback = mode;
            mode = null;
        }
        fs.access(path, mode, (err) => {
            callback(null, err ? false : true);
        });
    };
    fs.existAccessSync = function(path, mode) {
        try {
            fs.accessSync(path, mode);
            return true;
        } catch (err) {
            return false;
        }
    };
    fs.exists = (function(exists) {
        return function(path, callback) {
            if (exists) {
                exists(path, (e) => {
                    callback(null, e);
                });
            } else {
                fs.existStat(path, callback);
            }
        }
    })(fs.exists);

    fs.existsSync = fs.existsSync || fs.existStatSync;

    var fnsAcync = [
        {name: "existStatIsDirectory", fsFn: "stat", statType: "isDirectory"},
        {name: "existLStatIsDirectory", fsFn: "lstat", statType: "isDirectory"},
        {name: "existFStatIsDirectory", fsFn: "fstat", statType: "isDirectory"},
        {name: "existStatIsFile", fsFn: "stat", statType: "isFile"},
        {name: "existLStatIsFile", fsFn: "lstat", statType: "isFile"},
        {name: "existFStatIsFile", fsFn: "fstat", statType: "isFile"},
        {name: "existIsSymlink", fsFn: "lstat", statType: "isSymbolicLink"}
    ];
    var fnsSync = [
        {name: "existStatIsDirectorySync", fsFn: "statSync", statType: "isDirectory"},
        {name: "existLStatIsDirectorySync", fsFn: "lstatSync", statType: "isDirectory"},
        {name: "existFStatIsDirectorySync", fsFn: "fstatSync", statType: "isDirectory"},
        {name: "existStatIsFileSync", fsFn: "statSync", statType: "isFile"},
        {name: "existLStatIsFileSync", fsFn: "lstatSync", statType: "isFile"},
        {name: "existFStatIsFileSync", fsFn: "fstatSync", statType: "isFile"},
        {name: "existIsSymlinkSync", fsFn: "lstatSync", statType: "isSymbolicLink"}
    ];

    fnsAcync.forEach(function(fn) {
        fs[fn.name] = function(path, callback) {
            fs[fn.fsFn](path, (err, stat) => {
                callback(null, err ? false : stat[fn.statType]() ? true : false, err || stat);
            });
        }
    });

    fnsSync.forEach(function(fn) {
        fs[fn.name] = (path) => {
            try {
                var stat = fs[fn.fsFn](path);
                return stat[fn.statType]() ? true : false;
            } catch (err) {
                return false;
            }
        }
    });
    return fs;
}


