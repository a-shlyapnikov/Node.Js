const { error } = require('console');
const fs = require('fs');

function getDataFormDb(path) {
    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send({ error: err.message });
            } else {
                return data;
            }
        }));
    }

}

module.exports = getDataFormDb;