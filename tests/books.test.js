const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/prisma');

let token;

describe('Books API', () => {
  beforeAll(async () => {
    // Limpar base de dados
    await prisma.book.deleteMany({});
    await prisma.user.deleteMany({});

    // Criar usuário e logar
    await request(app).post('/auth/register').send({
      name: 'User Books',
      email: 'books@test.com',
      password: '123456'
    });

    const loginRes = await request(app).post('/auth/login').send({
      email: 'books@test.com',
      password: '123456'
    });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Deve bloquear acesso sem token', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(401);
  });

  test('Deve listar livros (vazio inicialmente)', async () => {
    const res = await request(app)
      .get('/books')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('Deve criar um livro', async () => {
    const res = await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Livro Teste',
        author: 'Autor Teste'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Livro Teste');
  });
});
