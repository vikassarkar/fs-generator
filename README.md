# fs-generator

Package to create folder/copy folder updating its filename/contents as per configurations provided to it.

## Contains

- [x] [fs](github.com/npm/security-holder/) 0.0.1-security
- [x] [fs-extra](https://github.com/jprichardson/node-fs-extra/) 3.0.1
- [x] [lodash](https://github.com/lodash/lodash/) 4.17.4
- [x] [q](https://github.com/kriskowal/q/) 1.5.0


## Getting started

Before you start, make sure you have a recent version of [NodeJS](http://nodejs.org/) environment *>=6.0* with NPM 3 or Yarn.

install folder structure generator 
```shell
npm install --save-dev fs-generator
```
## Use

You need to define a refrence directory stucture with contents in it and keys to be updated before copyng it inside destination directory.
Should also define a temporary directory, to process files and folder before copyng it inside destination directory.
And a last thing, Define a destination directory.


NOTE: you need to define a folder name in camelcase format e.g WidgetName for naming folder, files and content.
path of folder should be absolute path.

## Configurations example

```shell
    {
        //type of directory for user 
        "type": "widget",
        //base name of directory passed by command line
        "input": "",
        //base name configuration of root directory 
        "folderName": [
            //font-case
            "lowercaseHyphenSeprated", 
            //name prefix
            "usage-",
            //name suffix
            "-widget"
        ],
        //temporary directory path
        "tempFolderPath": "../build-utils/fs-generator/temp/",
        //refrence directory path
        "refrenceSourcePath": "../build-utils/fs-generator/widget/widget/",
        //destination directory path
        "destinationSourcePath": "../web/widgets/",
        //folder structure with files and its configuration
        "replaceFileName": {
            //sub directory
            "app": {
                //subdirectory file, require no updation
                "index.html": "",
                //subdirectory file, require no updation
                "index.tsx": ""
            },
            //sub directory
            "components": {
                //subdirectory file, require updation, defining configs
                "ComponentName.tsx": [
                    //font-case
                    "camelUpperCase",
                    //prefix
                    "",
                    //suffix
                    ""
                ]
            },
            "models": {
                "ComponentName.ts": [
                    "camelUpperCase",
                    "I",
                    ""
                ]
            },
            "styles": {
                "ComponentName.scss": [
                    "camelLowerCase",
                    "_",
                    ""
                ],
                "main.scss": ""
            },
            "WidgetName.tsx": [
                "camelUpperCase",
                "Usage",
                "Widget"
            ]
        },
        //contents existing in all directories and replacement configs
        "replaceContent": {
            //content key
            "ComponentName": [
                //font-key
                "camelUpperCase",
                //prefix
                "",
                //suffix
                ""
            ],
            "componentName": [
                "camelLowerCase",
                "",
                ""
            ],
            "widget-folder-name": [
                "lowercaseHyphenSeprated",
                "usage-",
                "-widget"
            ],
            "WidgetName": [
                "camelUpperCase",
                "",
                ""
            ],
            "widgetName": [
                "camelLowerCase",
                "",
                ""
            ]
        }
    }, ......
```

## Available font-cases

 - camelLowerCase
 - camelUpperCase
 - lowercaseHyphenSeprated
 - uppercaseHyphenSeprated

## Todo

- [ ] Add a example
- [ ] Add webpack scripts in package.json

