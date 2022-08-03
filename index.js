const express = require('express');

const fs = require('fs');

const bodyParser = require('body-parser');

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

app.listen(PORT, () => {
  console.log('Online');
});
