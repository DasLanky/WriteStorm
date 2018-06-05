var fs = require('fs');

function getSettings(defaults, callback) {
    fs.readFile('./config.json', function (err, data) {
        if (err) {
            fs.writeFile('./config.json', JSON.stringify(defaults, null, "\t"), (err) => {
            });
        }
        else {
            callback(JSON.parse(data));
        }
    })
}

function saveSettings(settings) {
    fs.writeFile('./config.json', JSON.stringify(settings, null, "\t"), (err) => {
    });
}

export default {
    getSettings,
    saveSettings
}