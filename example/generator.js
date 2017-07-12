/**
 * Created By Vikas Sarkar
 * Date : 2017-07-09
 */

/**
 * Available commands
 * npm run create WidgetName
 */

//define all dependencies
const fsGenerator = require('fs-generator');
const path = require('path');

//get generators configuration
const genConfig = require('./generator.config.json');

//get orignal params passes in npm run create command
const createConfig = (JSON.parse(process.env.npm_config_argv)).original || null;

/**
 * @param createConfig - all data passes in create command
 * generator functionpassing relevent data for folder creation
 */
var generator = function(createConfig) {
    var folderCreateName = createConfig[2];

    if (folderCreateName) {
        var genData = genConfig;
        genData.app.input = folderCreateName;
        genData.app.tempFolderPath = path.resolve(__dirname, genData.app.tempFolderPath);
        genData.app.refrenceSourcePath = path.resolve(__dirname, genData.app.refrenceSourcePath);
        genData.app.destinationSourcePath = path.resolve(__dirname, genData.app.destinationSourcePath);

        //it could be multiple folders as well as per configs provided
        fsGenerator(genData); //thats it ...........
    } else {
        console.log("\x1b[33m%s\x1b[0m", "~~~~~~please try running again by proper command ~~~~~~");
        console.log("\x1b[43m%s\x1b[0m", "~~~~~~npm run create WidgetName~~~~~~");
    }
}(createConfig)