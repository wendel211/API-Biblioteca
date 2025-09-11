const express = require('express');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

module.exports = app;
