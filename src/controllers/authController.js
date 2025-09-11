const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    // Verificar se já existe usuário com esse email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário no banco
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    // Retornar sem a senha
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error('Erro no login:', err); 
    return res.status(500).json({ error: 'Erro interno no login' });
  }
}

module.exports = { register, login };
