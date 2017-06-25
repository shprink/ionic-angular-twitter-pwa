#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const BUILDFOLDER = path.join(__dirname, '..', 'build/build');
const OUTPUT = path.join(__dirname, '..', 'build/fileSize.csv');

console.log('BUILDFOLDER', BUILDFOLDER)
console.log('OUTPUT', OUTPUT)

const folderData = getFileInfoFromFolder(BUILDFOLDER);

const headers = folderData.map(line => line.name);
var writer = csvWriter({ headers })
writer.pipe(fs.createWriteStream(OUTPUT))
writer.write(folderData.map(line => line.size))
writer.end()

function getFileInfoFromFolder(route) {
    let files = fs.readdirSync(route, 'utf8');
    let response = [];
    let totalSize = 0;
    for (let name of files) {
        const filePath = `${BUILDFOLDER}/${name}`;
        const size = fs.statSync(filePath).size;
        totalSize += size;
        response.push({ name, size });
    }
    response.push({ name: 'Total', size: totalSize });
    return response;
}