const csvWriter = require('./csv-writer');
const speedTester = require('./speed-tester');

var cron = require('node-cron');

cron.schedule('* * * * *', () => {
    console.log('Starting consult internet speed to save');

    start().then(e => console.log("Done"));
});

async function start() {
    try {
        let result = await speedTester.getInternetSpeed();

        await csvWriter.writeResultsToFile(result);
    } catch (error) {
        console.error("An error happened, error {0}", error);
    }
}