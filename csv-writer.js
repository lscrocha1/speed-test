
const ObjectsToCsv = require('objects-to-csv')

async function writeResultsToFile(result) {

    const csv = new ObjectsToCsv([result]);

    await csv.toDisk('./list.csv', { append: true });
}

module.exports = { writeResultsToFile };