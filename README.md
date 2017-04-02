[![Travis Status](https://travis-ci.org/n3okill/enfsaddins.svg)](https://travis-ci.org/n3okill/enfsaddins)
[![Appveyor status](https://ci.appveyor.com/api/projects/status/ng4k20sk93vm04o1?svg=true)](https://ci.appveyor.com/project/n3okill/enfsaddins)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/f564e01b160f403e83bf8d63f50e280a)](https://www.codacy.com/app/n3okill/enfsaddins)
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=64PYTCDH5UNZ6)

[![NPM](https://nodei.co/npm/enfsaddins.png)](https://nodei.co/npm/enfsaddins/)

enfsaddins
=========
Additional methods for node fs module

**enfs** stands for [E]asy [N]ode [fs]

This module is intended to work as a sub-module of [enfspatch](https://www.npmjs.com/package/enfspatch)

Description
-----------
This module will change some behaviors of fs module from node
such as creating a queue for opening files when limit is reached,
catching the error's and proceeding with the process when possible.
- This module will change the behaviour of:
  * exists
  * existsSync
  
Usage
-----
`enfsaddins`


Valid usage but not the better:

```js
    var fs = require("fs");
    var enfs = require("enfsaddins")(fs);
```

It's better to use

```js
    var enfs = require("enfspatch");
```

this will use [enfspatch](https://www.npmjs.com/package/enfspatch) module that implements this module
and allows access to all it's methods



Errors
------
All the methods follows the node culture.
- Async: Every async method returns an Error in the first callback parameter
- Sync: Every sync method throws an Error.


Additional Methods
------------------
- [exists](#exists)
- [existsSync](#exists)
- [existAccess](#existaccess)
- [existAccessSync](#existaccess)
- [existStat](#existstat)
- [existLStat](#existlstat)
- [existFStat](#existfstat)
- [existStatSync](#existstat)
- [existLStatSync](#existlstat)
- [existFStatSync](#existfstat)
- [existStatIsDirectory](#existstatisdirectory)
- [existLStatIsDirectory](#existstatisdirectory)
- [existFStatIsDirectory](#existstatisdirectory)
- [existStatIsDirectorySync](#existstatisdirectory)
- [existLStatIsDirectorySync](#existstatisdirectory)
- [existFStatIsDirectorySync](#existstatisdirectory)
- [existStatIsFile](#existstatisfile)
- [existLStatIsFile](#existstatisfile)
- [existFStatIsFile](#existstatisfile)
- [existStatIsFileSync](#existstatisfile)
- [existLStatIsFileSync](#existstatisfile)
- [existFStatIsFileSync](#existstatisfile)
- [existIsSymlink](#existissymlink)
- [existIsSymlinkSync](#existissymlink)


### exists
  - **exists(path, callback)**

> Change the natural behaviour of fs.exists to the node culture, it will return an error 
in the first callback parameter.
As exists is deprecated if it cease to exist then exists will use (#existStat) instead

Sync: 
  - **existsSync(path)**

```js
    enfs.exists("/etc/passwd", function(err, itemExists){
        console.log(itemExists ? 'it\'s there' : 'no passwd!');
    });
```
check: [fs.exists](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback)

### existAccess
  - **existAccess(path, [mode], callback)**

> Will use fs.access to check if the item exists in the file system and if the process
as access to the item.

Sync: 
  - **existAccessSync(path, [mode])**


```js
    enfs.existAccess("/etc/passwd", function(err,itemExists){
        console.log(itemExists ? "it\'s there and have access" : "don\'t exist or don\'t have access");
    });
```
check: [fs.access](https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback)

### existStat 
### existLStat
- **existStat(path,callback)**
- **existLStat(path,callback)**

> Will use fs.stat to check if the item exists in the file system.

Sync: 
  - **existStatSync(path)**
  - **existLStatSync(path)**

```js
    enfs.existStat("/etc/passwd", function(err,itemExists){
        console.log(itemExists ? "it\'s there" : "don\'t exist");
    });
```
check: [fs.stat](https://nodejs.org/api/fs.html#fs_fs_stat_path_callback)

```js
    enfs.existLStat("/etc/passwd", function(err,itemExists){
        console.log(itemExists ? "it\'s there" : "don\'t exist");
    });
```
check: [fs.lstat](https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback)

### existFStat
  - **existFStat(fd,callback)**

> Will use fs.fstat to check if the item exists in the file system.

Sync: 
  - **existFStatSync(path)**

```js
    enfs.existFStat(enfs.openSync("/etc/passwd","r"), function(err,itemExists){
        console.log(itemExists ? "it\'s there" : "don\'t exist");
    });
```
check: [fs.fstat](https://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback)


### existStatIsDirectory 
### existLStatIsDirectory
### existFStatIsDirectory
- **existStatIsDirectory(path,callback)**
- **existLStatIsDirectory(path,callback)**
- **existFStatIsDirectory(path,callback)**

> Will use fs.stat or fs.lstat or fs.fstat to check if the item exists in the file system,
and if it's a directory.
This method is just a shortcut to check if an item exists in the file system and it's type

Sync: 
  - **existStatIsDirectorySync(path)**
  - **existLStatIsDirectorySync(path)**
  - **existFStatIsDirectorySync(path)**

```js
    enfs.existStatIsDirectory("/etc", function(err,isDirectory,stat){
        console.log(isDirectory ? "it's a directory" : "don\'t exist or it's not a directory.");
    });
```
check: 
[fs.stat](https://nodejs.org/api/fs.html#fs_fs_stat_path_callback)
[fs.lstat](https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback)
[fs.fstat](https://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback)


### existStatIsFile 
### existLStatIsFile
### existFStatIsFile
- **existStatIsFile(path,callback)**
- **existLStatIsFile(path,callback)**
- **existFStatIsFile(path,callback)**

> Will use fs.stat or fs.lstat or fs.fstat to check if the item exists in the file system,
and if it's a file.
This method is just a shortcut to check if an item exists in the file system and it's type

Sync: 
  - **existStatIsFileSync(path)**
  - **existLStatIsFileSync(path)**
  - **existFStatIsFileSync(path)**

```js
    enfs.existStatIsFile("/etc/passwd", function(err,isFile,stat){
        console.log(isFile ? "it's a file" : "don\'t exist or it's not a file.");
    });
```
check: 
[fs.stat](https://nodejs.org/api/fs.html#fs_fs_stat_path_callback)
[fs.lstat](https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback)
[fs.fstat](https://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback)


### existIsSymlink 
- **existIsSymlink(path,callback)**

> Will use fs.lstat to check if the item exists in the file system,
and if it's a symbolic link.
This method is just a shortcut to check if an item exists in the file system and it's type

Sync: 
  - **existIsSymlinkSync(path)**

```js
    enfs.existIsSymlink("/etc/symlink", function(err,isSymlink,stat){
        console.log(isSymlink ? "it's a symlink" : "don\'t exist or it's not a symlink.");
    });
```
check: 
[fs.lstat](https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback)




License
-------

Creative Commons Attribution 4.0 International License

Copyright (c) 2016 Joao Parreira <joaofrparreira@gmail.com> [GitHub](https://github.com/n3okill)

This work is licensed under the Creative Commons Attribution 4.0 International License. 
To view a copy of this license, visit [CCA4](http://creativecommons.org/licenses/by/4.0/).


