// ref: https://www.youtube.com/watch?v=pKd0Rpw7O48&ab_channel=ProgrammingwithMosh

const express = require('express');

const fs = require('fs');

const bodyParser = require('body-parser');
const crypto = require('crypto');
const talkers = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  fs.readFile('./talker.json', (err, data) => {
   const talker = JSON.parse(data);
   if (err) return res.status(404).json(talker);
   res.status(HTTP_OK_STATUS).json(talker);
  });
 });

 app.get('/talker/:id', (req, res) => {
  const talkerID = talkers.find((t) => t.id === parseInt(req.params.id, 10));
  if (!talkerID) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(talkerID);
});

app.post('/login', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
