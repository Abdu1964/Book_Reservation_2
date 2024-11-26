// tests/app.test.js
const request = require('supertest');
const app = require('../app'); // Assuming app.js starts your Express app

describe('App.js', () => {

  // Test if the server is running
  it('should return a 200 status for the root route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200); // The root route should respond with status 200
  });

  // Test if a GET request to a user route returns the expected response
  it('should return 404 for non-existent route', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.status).toBe(404); // Check for a 404 error on a non-existent route
  });

  // Test if the userController route returns users correctly (assuming route is /users)
  it('should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200); // Assuming this route returns users with status 200
    expect(Array.isArray(res.body)).toBe(true); // Response should be an array
  });

  // Example of POST route for user creation (replace with your actual route)
  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      phoneNumber: '1234567890',
    };

    const res = await request(app)
      .post('/users')
      .send(newUser); // Sending the new user data
    expect(res.status).toBe(201); // Assuming user is created successfully
    expect(res.body.name).toBe(newUser.name); // Response should contain the new user name
    expect(res.body.phoneNumber).toBe(newUser.phoneNumber); // And phone number
  });

});
