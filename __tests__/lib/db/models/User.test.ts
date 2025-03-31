import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcrypt';
import { User } from '@/lib/db/models/User';

describe('User Model', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a new user with valid data', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
      isAdmin: true
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.isAdmin).toBe(userData.isAdmin);
    // Password should be hashed
    expect(savedUser.password).not.toBe(userData.password);
  });

  it('should hash the password before saving', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
      isAdmin: true
    };

    const user = new User(userData);
    await user.save();

    // Password should be hashed
    expect(user.password).not.toBe(userData.password);
    
    // Verify that the hashed password can be compared correctly
    const isMatch = await bcrypt.compare(userData.password, user.password);
    expect(isMatch).toBe(true);
  });

  it('should not save user without required fields', async () => {
    const userWithoutName = new User({
      email: 'test@example.com',
      password: 'Password123'
    });

    const userWithoutEmail = new User({
      name: 'Test User',
      password: 'Password123'
    });

    const userWithoutPassword = new User({
      name: 'Test User',
      email: 'test@example.com'
    });

    await expect(userWithoutName.save()).rejects.toThrow();
    await expect(userWithoutEmail.save()).rejects.toThrow();
    await expect(userWithoutPassword.save()).rejects.toThrow();
  });

  it('should not save user with invalid email', async () => {
    const userWithInvalidEmail = new User({
      name: 'Test User',
      email: 'invalid-email',
      password: 'Password123'
    });

    await expect(userWithInvalidEmail.save()).rejects.toThrow();
  });

  it('should not save user with duplicate email', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123'
    };

    await new User(userData).save();
    
    const duplicateUser = new User(userData);
    await expect(duplicateUser.save()).rejects.toThrow();
  });

  it('should correctly compare passwords', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
      isAdmin: true
    };

    const user = new User(userData);
    await user.save();

    // Correct password
    const isMatch = await user.comparePassword('Password123');
    expect(isMatch).toBe(true);

    // Incorrect password
    const isNotMatch = await user.comparePassword('WrongPassword');
    expect(isNotMatch).toBe(false);
  });
});
