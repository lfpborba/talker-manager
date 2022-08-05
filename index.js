// ref: https://www.youtube.com/watch?v=pKd0Rpw7O48&ab_channel=ProgrammingwithMosh

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const getTalker = require('./talker.json');

const { validateEmail, validatePassword } = require('./middlewares/loginValidations.js');
const { validateToken, validateName, validateAge, validateTalk, validateWatchedAt, validateRate,
} = require('./middlewares/talkerValidations.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const PATH_file = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(PATH_file, (err, data) => {
   const talker = JSON.parse(data);
   if (err) return res.status(404).json(talker);
   res.status(HTTP_OK_STATUS).json(talker);
  });
});
 
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkerID = getTalker.find((t) => t.id === Number(id));
  if (!talkerID) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(talkerID);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  res.status(HTTP_OK_STATUS).send({ email, password, token });
});

app.post('/talker', validateToken, validateName, validateAge, validateTalk, validateWatchedAt,
validateRate, (req, res) => {
  const data = fs.readFileSync('./talker.json', 'utf8');
  const talker = JSON.parse(data);
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const id = talker.length + 1;
  const newTalker = { id, name, age, talk: { watchedAt, rate } };
  talker.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(talker));
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', validateToken, validateName, validateAge, validateTalk, validateWatchedAt,
validateRate, (req, res) => {
  const data = fs.readFileSync('./talker.json', 'utf8');
  const talker = JSON.parse(data);
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const talkerID = talker.filter((t) => t.id !== Number(id));
  const newTalker = { name, age, id: Number(id), talk: { watchedAt, rate } };
  
  talkerID.push(newTalker);

  fs.writeFileSync('./talker.json', JSON.stringify(talkerID));

  return res.status(HTTP_OK_STATUS).send(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
