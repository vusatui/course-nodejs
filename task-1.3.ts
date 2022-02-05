import {
    createReadStream,
    createWriteStream
} from "fs";
import csv from "csvtojson";
import { pipeline } from "stream";

const csvFilePath = process.argv[2];
const fileToWritePath = process.argv[3];

pipeline(
    createReadStream(csvFilePath),
    csv(),
    createWriteStream(fileToWritePath),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    },
);
