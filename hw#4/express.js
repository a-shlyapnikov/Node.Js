const express = require('express');
const fs = require('fs');
const path = require('path');
const { checkBody, checkParams } = require('./validation/validator');
const { idSchema, userSchema, putSchema } = require('./validation/schema');
const getDataFromDb = require('./getData');

const app = express();

const pathToDb = path.join(__dirname, 'users.json');

let uniqueId = 1;

app.use(express.json());

app.get('/users', (req, res) => {
    res.send(getDataFromDb(pathToDb))
})

app.get('/users/:id', checkParams(idSchema), (req, res) => {
    const users = getDataFromDb(pathToDb);
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        res.send({ user })
    } else {
        res.status(404).send({ user: null });
    }

});

app.post('/users', checkBody(userSchema), (req, res) => {

    uniqueId++;
    const users = getDataFromDb(pathToDb);

    users.push({
        id: uniqueId,
        ...req.body
    });

    fs.writeFileSync(pathToDb, JSON.stringify(users, null, 2), 'utf-8');

    res.send({
        id: uniqueId
    });
});

app.put('/users/:id', checkParams(idSchema), checkBody(putSchema), (req, res) => {

    const users = getDataFromDb(pathToDb);
    let user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        user = Object.assign(user, req.body);
        // user = { ...user, ...req.body };
        console.log(user);
        fs.writeFileSync(pathToDb, JSON.stringify(users, null, 2), 'utf-8');
        res.send({ user })
    } else {
        res.status(404).send({ user: null });
    }
});

app.delete('/users/:id', checkParams(idSchema), (req, res) => {
    const users = getDataFromDb(pathToDb);
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        fs.writeFileSync(pathToDb, JSON.stringify(users, null, 2), 'utf-8');
        res.send({ user })
    } else {
        res.status(404).send({ user: null });
    }
});

app.listen(3000, () => {
    console.log('server started on 3000 port');
});