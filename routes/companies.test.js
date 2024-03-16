const db = require('../db');
const request = require('supertest');
const app = require('../app');

describe('PUT /companies/:code', () => {
  test('updates a company and returns the updated company', async () => {
    const name = 'New Company Name';
    const description = 'New Company Description';
    const code = 'COMP1';

    const response = await request(app)
      .put(`/companies/${code}`)
      .send({ name, description });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      code: expect.any(String),
      name,
      description
    });

    // Verify that the company was updated in the database
    const updatedCompany = await db.query(
      `SELECT code, name, description
       FROM companies
       WHERE code = $1`,
      [code]
    );

    expect(updatedCompany.rows[0]).toEqual({
      code: expect.any(String),
      name,
      description
    });
  });
});const db = require('../db');
const request = require('supertest');
const app = require('../app');

describe('PUT /companies/:code', function() {
  test('updates a company and returns the updated company', async function() {
    const response = await request(app)
      .put('/companies/ABC')
      .send({
        name: 'New Company Name',
        description: 'New Company Description'
      });
      
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      code: 'ABC',
      name: 'New Company Name',
      description: 'New Company Description'
    });
  });
  
  test('returns 404 if company code does not exist', async function() {
    const response = await request(app)
      .put('/companies/XYZ')
      .send({
        name: 'New Company Name',
        description: 'New Company Description'
      });
      
    expect(response.statusCode).toBe(404);
  });
});