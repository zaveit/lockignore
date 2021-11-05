// Import dependencies
import fs from 'fs';

// Constants
const ModulesFolder = 'node_modules/'
const IgnoreFilePath = './.lockignore';
const LockFilePath = './package-lock.json';

const IgnoreFile = fs.readFileSync(IgnoreFilePath).toString().split("\n");
const LockFile = JSON.parse(fs.readFileSync(LockFilePath));

function Remove(IgnoreFile, LockItem, replace = undefined) {
    
    for (const item in LockItem) {
        const search = replace ? item.replace(replace, ''): item ;

        if(IgnoreFile.includes(search)) {
            //console.log(LockItem[item]);
            delete LockItem[item];
        }
    } 
}

Remove(IgnoreFile, LockFile.packages[""].dependencies);
Remove(IgnoreFile, LockFile.dependencies);
Remove(IgnoreFile, LockFile.packages, 'node_modules/');

fs.writeFileSync(LockFilePath, JSON.stringify(LockFile, null, 4), 'utf8');