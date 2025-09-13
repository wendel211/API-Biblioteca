const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const prisma = require('../prisma');

const router = express.Router();

// Todas as rotas abaixo exigem autenticação
router.use(authMiddleware);

// Listar livros
router.get('/', async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Criar livro
router.post('/', async (req, res) => {
  const { title, author } = req.body;
  try {
    const book = await prisma.book.create({
      data: { title, author }
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar livro' });
  }
});

// Excluir livro
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir livro' });
  }
});

module.exports = router;
