var fs = require('fs');

function getSettings (callback) {
    fs.readdir('./', (err, files) => {
        console.log(files);
    })
    fs.readFile('./config.json', (err, data) => {
        console.log(data);
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