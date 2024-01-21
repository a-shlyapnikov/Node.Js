const fs = require('fs');
const path = require('path');

const pathToCounter = path.join(__dirname, 'counter.json');

function counter(page) {
    let counter;
    if (fs.existsSync(pathToCounter)) {
        counter = JSON.parse(fs.readFileSync(pathToCounter, 'utf-8'));
        if (!counter[page]) {
            counter[page] = 1;
        } else {
            counter[page]++;
        }
    } else {
        counter = {
            [page]: 1
        }
    }
    fs.writeFile(pathToCounter, JSON.stringify(counter, null, 2), 'utf-8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка записи файла');
            return;
        }
    });
    return counter[page];
}


module.exports = counter;