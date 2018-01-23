'use strict';

//define dependencies
var fs = require('fs');
var path = require('path');
var Q = require('q');
var fse = require('fs-extra')
var utils = require('./utils/fsGeneratorUtils.js');

/**
 * folder structure generator class
 * @param {*} configs 
 */
function fsGenerator(configs) {

    var deferred = Q.defer();
    var dirName = "";
    var destDir = "";
    var tmpDir = "";
    var refSrcDir = "";
    var destFolderDir = "";
    var dirType = "";
    var tempFolderName = "";
    var contentReplaceRegx = new RegExp("", 'g');

    /**
     * initilize create directory process
     */
    var init = function() {
        for (var fls in configs) {
            dirName = utils.folderName(configs[fls]['input'], configs[fls]['folderName']);
            dirType = configs[fls]['type'];
            destFolderDir = path.join(configs[fls]['destinationSourcePath'], dirName);
            destDir = configs[fls]['destinationSourcePath'];
            tmpDir = configs[fls]['tempFolderPath'];
            tempFolderName = utils.getBaseFolderName(tmpDir);
            refSrcDir = configs[fls]['refrenceSourcePath'];
            contentReplaceRegx = new RegExp(utils.regxContent(configs[fls]['replaceContent']), 'g');
            console.log(':::~~'+fls+':::~~')
            folderSync(configs[fls])
        }
    };

    /**
     * sync folder to create new directories with provided Configurations
     * @param {*} fls 
     */
    var folderSync = function(fls) {
        if (fs.existsSync(destFolderDir)) {
            console.log(':::~~' + dirName + ' exists, please pick another name or delete previous to create new~~:::')
            deferred.reject(fls.type + ' exists, please pick another name.');
        } else {
            console.log(':::~~' + dirName + ' does not exists, creating new~~:::');
            if (!fs.existsSync(destFolderDir)) {
                fse.ensureDirSync(destFolderDir);
                console.log(':::~~Created new directory:' + fls.type + "/" + dirName + '~~:::');
            }
            //copy refrence directroy data in temporry directory folder
            copyRefToTemp();
            //update folder names, file names and file content in temp folder
            updateTempSubDirNames(fls);
            //copy temporary directroy data in destination directory folder
            copyTempToDest();
            // add tasks to create folder 
            // addWebpackTasks();
            deferred.resolve('successfuly created directory');
        }
        return deferred.promise;
    };

    /**
     * Copy refrence directory in temporary directory
     */
    var copyRefToTemp = function() {
        fse.emptyDirSync(tmpDir);
        fse.copySync(refSrcDir, tmpDir, { overwrite: true }, err => {
            if (err) {
                console.log(':::~~error in copying to temp directory:' + err + '~~:::');
                fse.removeSync(destFolderDir);
                fse.emptyDirSync(tmpDir);
                deferred.reject('Error in copying to temp directory');
            }
            console.log(':::~~ temp directory created~~:::');
        });
    };

    /**
     * Process temp directory recently copied
     * @param {*} fls 
     */
    var updateTempSubDirNames = function(fls) {
        fs.readdirSync(tmpDir).map(function(dir) {

            var tempFolderPath = path.join(tmpDir, dir);
            if (fs.statSync(tempFolderPath).isDirectory()) {
                // Process files in tmpDir.
                fs.readdirSync(tempFolderPath).map(function(file) {
                    processTempFolder(path.join(tempFolderPath, file), fls);
                });
            } else {
                // This is a file - just process it.
                processTempFolder(tempFolderPath, fls);
            }

        });
    };

    /**
     * Process files that were recently copied in temp directory
     * @param {*} oldPath 
     * @param {*} fls 
     */
    var processTempFolder = function(oldPath, fls) {
        console.log(":::~~processing your temp folder and file~~:::");
        var parsedPath = updateFileNamePath(path.parse(oldPath), fls);
        var newPath = path.format(parsedPath);
        fs.renameSync(oldPath, newPath);
        var oldContent = fs.readFileSync(newPath, 'utf8');
        var newContent = updateFileContent(oldContent, fls.replaceContent, fls);
        fs.writeFileSync(newPath, newContent);
    }

    /**
     * update refrence directory files names as per config provided by replaceFileName key
     * @param {*} parsedPath 
     * @param {*} fls 
     */
    var updateFileNamePath = function(parsedPath, fls) {
        // parsedPath.dir, parsedPath.base, parsedPath.ext, parsedPath.name
        var newName = "";
        var fileConfigs = "";
        parsedPath['folderName'] = utils.getBaseFolderName(parsedPath.dir) != tempFolderName ? utils.getBaseFolderName(parsedPath.dir) : "";
        fileConfigs = parsedPath.folderName ? fls.replaceFileName[parsedPath.folderName][parsedPath.base] : fls.replaceFileName[parsedPath.base];
        newName = utils.getupdatedFileName(parsedPath.name, fileConfigs, fls.input);
        parsedPath.base = newName + parsedPath.ext;
        parsedPath.name = newName;
        return parsedPath;
    };

    /**
     * update content of refrence directory files as per config provided by replaceContent key
     * @param {*} oldContent 
     * @param {*} replaceConfig 
     * @param {*} fls 
     */
    var updateFileContent = function(oldContent, replaceConfig, fls) {
        var newContent = oldContent.replace(contentReplaceRegx, function(e) {
            for (var cont in replaceConfig) {
                var contRegex = new RegExp(cont, 'g');
                if (e.match(contRegex)) {
                    var replaceValue = utils.getReplacableContent(fls.input, replaceConfig[cont]);
                    return replaceValue;
                }
            }
        });
        return newContent;
    };

    /**
     * copy data from writed temp directory to destination drive
     */
    var copyTempToDest = function() {
        fse.emptyDirSync(destFolderDir);
        fse.copySync(tmpDir, destFolderDir, { overwrite: true }, err => {
            if (err) {
                console.log(':::~~error in copying to destination directory:' + err + '~~:::');
                fse.removeSync(destFolderDir);
                fse.emptyDirSync(tmpDir);
                deferred.reject('Error in copying to destination directory');
            }
            console.log(':::~~ destination directory created:' + dirName + '~~:::');
        });
        fse.emptyDirSync(tmpDir);
        console.log(':::~~Created new ' + dirType + " / " + dirName + ':::~~');
    };
    
    /**
     * Call fsGEnerator init
     */
    init(configs);
};

module.exports = fsGenerator;