var fs = require('fs');

function getSettings (callback) {
    fs.readFile('./config.json', (err, data) => {
        callback(err, JSON.parse(data));
    })
};

function saveSettings (settings, callback) {
    fs.writeFile('./config.json', JSON.stringify(settings, null, "\t"), function(err) {
        if (err) {
            callback(err);
        }
    });
}

export {
    getSettings,
    saveSettings
}