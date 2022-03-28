const fs = require("fs");
const csv = require("csvtojson");
const { pipeline } = require("stream");

const csvFilePath = process.argv[2];
const fileToWritePath = process.argv[3];

// Classic approach
//
//
// const write$ = fs.createWriteStream(fileToWritePath);
//
// csv()
//     .fromFile(csvFilePath, "utf-8")
//     .on("data", (data) => {
//         write$.write(data);
//     })
//     .on("end", () => {
//         write$.close();
//     })


// Pipeline approach
pipeline(
    fs.createReadStream(csvFilePath),
    csv(),
    fs.createWriteStream(fileToWritePath),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);
