import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '@/lib/db/models/User';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

// Mock the database connection
jest.mock('@/lib/db/connect', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(null),
}));

// Mock the rate limiter
jest.mock('@/lib/auth/rateLimit', () => ({
  rateLimit: () => ({
    check: jest.fn().mockResolvedValue(null),
  }),
}));

// Login schema - same as in the API
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

describe('Login Functionality', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    
    // Set up environment variable for JWT
    process.env.AUTH_SECRET = 'test-secret-key';
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    delete process.env.AUTH_SECRET;
  });

  beforeEach(async () => {
    await User.deleteMany({});
    jest.clearAllMocks();
  });

  it('should validate login data correctly', () => {
    // Valid data
    const validData = {
      email: 'test@example.com',
      password: 'Password123',
    };
    
    const validResult = loginSchema.safeParse(validData);
    expect(validResult.success).toBe(true);
    
    // Invalid email
    const invalidEmailData = {
      email: 'invalid-email',
      password: 'Password123',
    };
    
    const invalidEmailResult = loginSchema.safeParse(invalidEmailData);
    expect(invalidEmailResult.success).toBe(false);
    if (!invalidEmailResult.success) {
      expect(invalidEmailResult.error.format().email).toBeDefined();
    }
    
    // Empty password
    const emptyPasswordData = {
      email: 'test@example.com',
      password: '',
    };
    
    const emptyPasswordResult = loginSchema.safeParse(emptyPasswordData);
    expect(emptyPasswordResult.success).toBe(false);
    if (!emptyPasswordResult.success) {
      expect(emptyPasswordResult.error.format().password).toBeDefined();
    }
  });

  it('should authenticate a user with valid credentials', async () => {
    // Create a test user
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
      isAdmin: true,
    };

    const user = new User(userData);
    await user.save();

    // Verify the user can be found
    const foundUser = await User.findOne({ email: userData.email });
    expect(foundUser).toBeTruthy();

    // Verify password comparison works
    const isPasswordValid = await foundUser!.comparePassword(userData.password);
    expect(isPasswordValid).toBe(true);

    // Verify JWT token generation
    const token = jwt.sign(
      { 
        id: foundUser!._id,
        email: foundUser!.email,
        isAdmin: foundUser!.isAdmin
      },
      process.env.AUTH_SECRET!,
      { expiresIn: '7d' }
    );
    
    expect(token).toBeTruthy();
    
    // Verify token can be decoded
    const decoded = jwt.verify(token, process.env.AUTH_SECRET!);
    expect(decoded).toBeTruthy();
    expect((decoded as any).email).toBe(userData.email);
    expect((decoded as any).isAdmin).toBe(userData.isAdmin);
  });

  it('should reject authentication with invalid credentials', async () => {
    // Create a test user
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
      isAdmin: true,
    };

    const user = new User(userData);
    await user.save();

    // Test with wrong password
    const foundUser = await User.findOne({ email: userData.email });
    const isWrongPasswordValid = await foundUser!.comparePassword('WrongPassword123');
    expect(isWrongPasswordValid).toBe(false);

    // Test with non-existent user
    const nonExistentUser = await User.findOne({ email: 'nonexistent@example.com' });
    expect(nonExistentUser).toBeNull();
  });
});
