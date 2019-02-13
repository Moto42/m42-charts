const request = require('supertest');
let app;

const OLD_ENV = process.env;

beforeEach(() => {
  process.env = { ...OLD_ENV };
  app = require('./server');
});

afterEach(() => {
  process.env = OLD_ENV;
  app.close();
});

describe('Static content delivery', () => {
  test('status 200 for content found and delivered', async () => {
    await request(app)
      .get('/')
      .expect(200);
  });
  test('status 404 for content not found', async () => {
    await request(app)
      .get('/404')
      .expect(404);
  });
});
