// tests/userController.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming you have an app.js to start your Express app
const User = require('../models/User');
const mockingoose = require('mockingoose');  // For mocking mongoose queries

describe('User Controller', () => {
  
  // Test getUser function
  it('should return a user by ID', async () => {
    const userId = mongoose.Types.ObjectId();
    const mockUser = {
      _id: userId,
      name: 'John Doe',
      phoneNumber: '1234567890',
    };

    // Mock the MongoDB User findById method
    mockingoose(User).toReturn(mockUser, 'findOne');

    const res = await request(app).get(`/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(mockUser.name);
    expect(res.body.phoneNumber).toBe(mockUser.phoneNumber);
  });

  // Test updateUser function
  it('should update a user', async () => {
    const userId = mongoose.Types.ObjectId();
    const mockUser = {
      _id: userId,
      name: 'John Doe',
      phoneNumber: '1234567890',
    };

    // Mock the User model to simulate findById, update, and save
    mockingoose(User).toReturn(mockUser, 'findOne');

    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ name: 'Jane Doe', phoneNumber: '0987654321' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Jane Doe');
    expect(res.body.phoneNumber).toBe('0987654321');
  });

  // Test approveUser function
  it('should approve a user', async () => {
    const userId = mongoose.Types.ObjectId();
    const mockUser = { _id: userId, isApproved: false };

    // Mock the User model to simulate findById
    mockingoose(User).toReturn(mockUser, 'findOne');

    const res = await request(app).patch(`/users/approve/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User approved successfully');
  });

  // Test getAllUsers function
  it('should return all users', async () => {
    const mockUsers = [
      { _id: mongoose.Types.ObjectId(), name: 'John Doe' },
      { _id: mongoose.Types.ObjectId(), name: 'Jane Doe' },
    ];

    // Mock the User model to simulate the find method
    mockingoose(User).toReturn(mockUsers, 'find');

    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe(mockUsers[0].name);
    expect(res.body[1].name).toBe(mockUsers[1].name);
  });

});

