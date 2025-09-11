const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ message: 'Rota de registro funcionando!' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Rota de login funcionando!' });
});

module.exports = router;
