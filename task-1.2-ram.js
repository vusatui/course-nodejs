const fs = require("fs");
const { promisify } = require("util");
const csv = require("csvtojson");


const csvFilePath = process.argv[2];
const fileToWritePath = process.argv[3];

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function main() {
    const csvContent = await readFile(csvFilePath);
    csv().fromString(csvContent.toString()).then(async (csvRow) => {
        let res = "";
        csvRow.forEach((value) => {
            res += `${JSON.stringify(value)}\n`;
        });
        await writeFile(fileToWritePath, res);
    });
}

main().catch(console.error);
