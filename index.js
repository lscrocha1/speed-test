const speedTest = require('speedtest-net');
const ObjectsToCsv = require('objects-to-csv')

var cron = require('node-cron');

cron.schedule('* * * * *', () => {
    console.log('Starting consult internet speed to save');

    start().then(() => console.log('Done'));
});

async function getInternetSpeed() {
    let result = await speedTest({ acceptLicense: true, acceptGdpr: true });

    let download = getMbps(result.download.bytes);
    let upload = getMbps(result.upload.bytes);
    let ping = result.ping.latency;
    let packetLoss = result.packetLoss;
    let externalIp = result.interface.externalIp;

    return {
        download: download.toFixed(2),
        upload: upload.toFixed(2),
        ping: ping.toFixed(2),
        packetLoss: packetLoss ? packetLoss.toFixed(2) : 0,
        externalIp
    };
}

function getMbps(bytes) {
    return bytes / 1024 / 1024;
}

async function start() {
    try {
        let result = await getInternetSpeed();

        const csv = new ObjectsToCsv([result]);

        await csv.toDisk('./list.csv', { append: true });
    } catch (error) {
        console.error("An error happened, error {0}", error);
    }
}