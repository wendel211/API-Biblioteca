const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, title: 'Livro de Exemplo' }]);
});

module.exports = router;
