const express = require('express');                                                

const app = express();

const users = [
  {
    name: 'Johm',
  },
  {
    name: 'joe',
  },
];

app.get('/users', (req, res) => {
  // res.json(users);
  res.send((req).toString());
});

app.listen(3000, () => {
  console.log('hi!!!');
});