import { csv } from 'csvtojson';
import fs from 'fs';

const errorCb = err => {
    console.error(err);
};

const successCb = () => {
    console.log('Converted successfully');
};

const writeStream = fs.createWriteStream('src/output.txt');

csv()
    .fromFile('src/csv/nodejs-hw1-ex1.csv')
    .subscribe(data => {
        writeStream.write(`${JSON.stringify(data)}\n`);
    }, errorCb, successCb)