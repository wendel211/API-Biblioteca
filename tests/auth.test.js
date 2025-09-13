const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/prisma');

describe('Auth API', () => {
  beforeAll(async () => {
    // Limpar usuários de teste
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Deve registrar um usuário', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Usuário Teste',
        email: 'teste@jest.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('teste@jest.com');
  });

  test('Deve logar e retornar um token JWT', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'teste@jest.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
