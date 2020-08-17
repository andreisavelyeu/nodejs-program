import fs from 'fs';
import { pipeline } from 'stream';
import { csv } from 'csvtojson';

pipeline(
    fs.createReadStream('src/csv/nodejs-hw1-ex1.csv'),
    csv(),
    fs.createWriteStream('src/output.txt'),
    (err) => {
        if (err) {
        console.error('Pipeline failed.', err);
        } else {
        console.log('Pipeline succeeded.');
        }
    }
);
