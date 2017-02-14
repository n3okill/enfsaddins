/**
 * @project enfsaddins
 * @filename addins.js
 * @description tests for enfsaddins
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 18-02-2016.
 * @version 0.1.1
 */

/* global describe, require, it, __filename, should */

"use strict";

//avoid messing with original fs module
const copyFs = require("clone")(require("fs"));

describe("enfsaddins", function () {
    const fs = require("../")(copyFs);
    describe("> existStat", function () {
        describe("> async", function () {
            function existStat(path, result, done) {
                fs.existStat(path, function (err, res) {
                    (err === null).should.be.equal(true);
                    res.should.be.equal(result);
                    done();
                });
            }

            it("should test true for async __filename", function (done) {
                existStat(__filename, true, done);
            });
            it("should test false for async non-existent file", function (done) {
                existStat("/not/existent/file", false, done);
            });
        });
        describe("> sync", function () {
            it("should test true for sync __filename", function () {
                fs.existStatSync(__filename).should.be.equal(true);
            });
            it("should test false for sync non-existent file", function () {
                fs.existStatSync("/not/existent/file").should.be.equal(false);
            });
        });
    });
    describe("> existAccess", function () {
        describe("> async", function () {
            function existAccess(path, result, done) {
                fs.existAccess(path, function (err, res) {
                    (err === null).should.be.equal(true);
                    res.should.be.equal(result);
                    done();
                });
            }

            it("should test true for async __filename", function (done) {
                existAccess(__filename, true, done);
            });
            it("should test false for async non-existent file", function (done) {
                existAccess("/not/existent/file", false, done);
            });
        });
        describe("> sync", function () {
            it("should test true for sync __filename", function () {
                fs.existAccessSync(__filename).should.be.equal(true);
            });
            it("should test false for sync non-existent file", function () {
                fs.existAccessSync("/not/existent/file").should.be.equal(false);
            });
        });
    });
    describe("> multiple methods of exist and is of type", function () {
        describe("> async", function () {
            const methods = ["existStatIsDirectory", "existLStatIsDirectory", "existFStatIsDirectory",
                "existStatIsFile", "existLStatIsFile", "existFStatIsFile",
                "existIsSymlink"];
            it("should test methods existence", function () {
                methods.forEach(function (name) {
                    (typeof fs[name]).should.be.equal("function");
                });
            });
            it("should test stat isDirectory method and it's result", function (done) {
                fs.existStatIsDirectory(__dirname, function (err, result) {
                    (err === null).should.be.equal(true);
                    result.should.be.equal(true);
                    fs.existStatIsDirectory(__filename, function (errFile, resultFile) {
                        (errFile === null).should.be.equal(true);
                        resultFile.should.be.equal(false);
                        done();
                    });
                });
            });
            it("should test stat isFile method and it's result", function (done) {
                fs.existStatIsFile(__filename, function (err, result) {
                    (err === null).should.be.equal(true);
                    result.should.be.equal(true);
                    fs.existStatIsFile(__dirname, function (errDir, resultDir) {
                        (errDir === null).should.be.equal(true);
                        resultDir.should.be.equal(false);
                        done();
                    });
                });
            });
        });
        describe("> sync", function () {
            it("should test methods existence", function () {
                const methods = ["existStatIsDirectorySync", "existLStatIsDirectorySync", "existFStatIsDirectorySync",
                    "existStatIsFileSync", "existLStatIsFileSync", "existFStatIsFileSync",
                    "existIsSymlinkSync"];
                methods.forEach(function (item) {
                    (typeof fs[item]).should.be.equal("function");
                });
            });
            it("should test stat isDirectory method and it's result", function () {
                fs.existStatIsDirectorySync(__dirname).should.be.equal(true);
                fs.existStatIsDirectorySync(__filename).should.be.equal(false);
            });
            it("should test stat isFile method and it's result", function () {
                fs.existStatIsFileSync(__filename).should.be.equal(true);
                fs.existStatIsFileSync(__dirname).should.be.equal(false);
            });
        });
    });
});
