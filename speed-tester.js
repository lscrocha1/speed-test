const speedTest = require('speedtest-net');

async function getInternetSpeed() {
    let result = await speedTest({ acceptLicense: true, acceptGdpr: true });

    let download = getMbps(result.download.bytes);
    let upload = getMbps(result.upload.bytes);
    let ping = result.ping.latency;
    let packetLoss = result.packetLoss;
    let externalIp = result.interface.externalIp;
    let now = new Date();

    return {
        download: download.toFixed(2),
        upload: upload.toFixed(2),
        ping: ping.toFixed(2),
        packetLoss: packetLoss ? packetLoss.toFixed(2) : 0,
        externalIp,
        collectedAt: now.toString()
    };
}

function getMbps(bytes) {
    return bytes / 1024 / 1024;
}

module.exports = { getInternetSpeed }