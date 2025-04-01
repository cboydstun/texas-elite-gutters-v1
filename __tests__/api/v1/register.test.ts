import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "@/lib/db/models/User";
import { z } from "zod";

// Mock the database connection
jest.mock("@/lib/db/connect", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(null),
}));

// Password validation schema - same as in the API
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/^(?=.*[A-Z])(?=.*\d)/, {
    message: "Password must contain at least 1 uppercase letter and 1 number",
  });

// Registration schema - same as in the API
const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: passwordSchema,
});

describe("Registration Functionality", () => {
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
    jest.clearAllMocks();
  });

  it("should validate registration data correctly", () => {
    // Valid data
    const validData = {
      name: "Test User",
      email: "test@example.com",
      password: "Password123",
    };

    const validResult = registerSchema.safeParse(validData);
    expect(validResult.success).toBe(true);

    // Invalid email
    const invalidEmailData = {
      name: "Test User",
      email: "invalid-email",
      password: "Password123",
    };

    const invalidEmailResult = registerSchema.safeParse(invalidEmailData);
    expect(invalidEmailResult.success).toBe(false);
    if (!invalidEmailResult.success) {
      expect(invalidEmailResult.error.format().email).toBeDefined();
    }

    // Invalid password (no uppercase)
    const invalidPasswordData1 = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };

    const invalidPasswordResult1 =
      registerSchema.safeParse(invalidPasswordData1);
    expect(invalidPasswordResult1.success).toBe(false);
    if (!invalidPasswordResult1.success) {
      expect(invalidPasswordResult1.error.format().password).toBeDefined();
    }

    // Invalid password (no number)
    const invalidPasswordData2 = {
      name: "Test User",
      email: "test@example.com",
      password: "Password",
    };

    const invalidPasswordResult2 =
      registerSchema.safeParse(invalidPasswordData2);
    expect(invalidPasswordResult2.success).toBe(false);
    if (!invalidPasswordResult2.success) {
      expect(invalidPasswordResult2.error.format().password).toBeDefined();
    }

    // Invalid password (too short)
    const invalidPasswordData3 = {
      name: "Test User",
      email: "test@example.com",
      password: "Pass1",
    };

    const invalidPasswordResult3 =
      registerSchema.safeParse(invalidPasswordData3);
    expect(invalidPasswordResult3.success).toBe(false);
    if (!invalidPasswordResult3.success) {
      expect(invalidPasswordResult3.error.format().password).toBeDefined();
    }
  });

  it("should create a new user with valid data", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "Password123",
      isAdmin: true,
    };

    const user = new User(userData);
    await user.save();

    // Verify user was saved to database
    const savedUser = await User.findOne({ email: "test@example.com" });
    expect(savedUser).toBeTruthy();
    expect(savedUser?.name).toBe(userData.name);
    expect(savedUser?.email).toBe(userData.email);
    expect(savedUser?.isAdmin).toBe(userData.isAdmin);

    // Password should be hashed
    expect(savedUser?.password).not.toBe(userData.password);
  });

  it("should not allow duplicate emails", async () => {
    // Create first user
    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "Password123",
    };

    await new User(userData).save();

    // Try to create duplicate user
    const duplicateUser = new User(userData);

    // Should throw error
    await expect(duplicateUser.save()).rejects.toThrow();
  });
});
