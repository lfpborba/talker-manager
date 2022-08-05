const date = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/-]\d{4}$/;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenRegex = /^[a-zA-Z0-9]{16}$/;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

   if (!tokenRegex.test(String(authorization))) {
    return res.status(401).json({ message: 'Token inválido' });
  }
      
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length <= 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || talk === '') {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } if (date.test(watchedAt) === false) {
    return res.status(400)
     .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  
  if (rate < 1 || rate > 5 || rate === '') {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};