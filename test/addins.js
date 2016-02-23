/**
 * @project enfsaddins
 * @filename addins.js
 * @description tests for enfsaddins
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 18-02-2016.
 * @version 0.0.1
 */

/* global describe, require, it, __filename */

"use strict";

//trying not to mess with original fs module
var nodeFs = require("clone")(require("fs"));

describe("enfsaddins", function () {
    var fs = require("../")(nodeFs);
    describe("> existStat", function () {
        describe("> async", function () {
            it("should test true for async __filename", function (done) {
                fs.existStat(__filename, function (err, result) {
                    result.should.be.equal(true);
                    done();
                });
            });
            it("should test false for async non-existent file", function (done) {
                fs.existStat("/not/existent/file", function (err, result) {
                    result.should.be.equal(false);
                    done();
                });
            });
        });
        describe("> sync", function () {
            it("should test true for sync __filename", function (done) {
                fs.existStatSync(__filename).should.be.equal(true);
                done();
            });
            it("should test false for sync non-existent file", function (done) {
                fs.existStatSync("/not/existent/file").should.be.equal(false);
                done();
            });
        });
    });
    describe("> existAccess", function () {
        describe("> async", function () {
            it("should test true for async __filename", function (done) {
                fs.existAccess(__filename, function (err, result) {
                    result.should.be.equal(true);
                    done();
                });
            });
            it("should test false for async non-existent file", function (done) {
                fs.existAccess("/not/existent/file", function (err, result) {
                    result.should.be.equal(false);
                    done();
                });
            });
        });
        describe("> sync", function () {
            it("should test true for sync __filename", function (done) {
                fs.existAccessSync(__filename).should.be.equal(true);
                done();
            });
            it("should test false for sync non-existent file", function (done) {
                fs.existAccessSync("/not/existent/file").should.be.equal(false);
                done();
            });
        });
    });
    describe("> multiple methods of exist and is of type", function () {
        describe("> async", function () {
            var methods = ["existStatIsDirectory", "existLStatIsDirectory", "existFStatIsDirectory",
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
                        (err === null).should.be.equal(true);
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
                var methods = ["existStatIsDirectorySync", "existLStatIsDirectorySync", "existFStatIsDirectorySync",
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
