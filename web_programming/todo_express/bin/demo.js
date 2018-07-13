const express = require('express');
const app = express();
const users = [{ name: 'ric', age: 18 }];

app.get('/users', function (req, res) {
    res.json(users);
});

app.post('/users', function (req, res) {
    users.push(req.body);
    res.status(200).send('ok');
});

// app.put('/users',) // TODO)

// app.delete() // TODO)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});