import { NextRequest } from "next/server";
import { POST } from "@/app/api/v1/analytics/fingerprint/route";
import { Thumbprint } from "@/lib/db/models/Thumbprint";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// Mock the database connection
jest.mock("@/lib/db/connect", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true),
}));

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

describe("Fingerprint API Route", () => {
  beforeEach(async () => {
    await Thumbprint.deleteMany({});
  });

  it("should create a new thumbprint record", async () => {
    // Create mock request
    const req = new NextRequest(
      "http://localhost:3000/api/v1/analytics/fingerprint",
      {
        method: "POST",
        body: JSON.stringify({
          fingerprintHash: "test-hash-123",
          components: { browser: "Chrome" },
          userAgent: "Mozilla/5.0",
          device: { type: "desktop" },
          page: "/test",
        }),
      },
    );

    // Call the API route
    const response = await POST(req);
    const data = await response.json();

    // Verify response
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.isNewVisitor).toBe(true);
    expect(data.fingerprintHash).toBe("test-hash-123");

    // Verify database record
    const thumbprint = await Thumbprint.findOne({
      fingerprintHash: "test-hash-123",
    });
    expect(thumbprint).not.toBeNull();
    expect(thumbprint?.components).toEqual({ browser: "Chrome" });
    expect(thumbprint?.userAgent).toBe("Mozilla/5.0");
    expect(thumbprint?.device.type).toBe("desktop");
    expect(thumbprint?.visits.length).toBe(1);
    expect(thumbprint?.visits[0].page).toBe("/test");
    expect(thumbprint?.visitCount).toBe(1);
  });

  it("should update an existing thumbprint record", async () => {
    // Create initial thumbprint
    const thumbprint = new Thumbprint({
      fingerprintHash: "test-hash-456",
      components: { browser: "Chrome" },
      userAgent: "Mozilla/5.0",
      device: { type: "desktop" },
      visits: [
        {
          timestamp: new Date(),
          page: "/home",
        },
      ],
    });

    await thumbprint.save();

    // Create mock request for update
    const req = new NextRequest(
      "http://localhost:3000/api/v1/analytics/fingerprint",
      {
        method: "POST",
        body: JSON.stringify({
          fingerprintHash: "test-hash-456",
          components: { browser: "Chrome", version: "100" },
          userAgent: "Mozilla/5.0 (Updated)",
          device: { type: "tablet" },
          page: "/about",
        }),
      },
    );

    // Call the API route
    const response = await POST(req);
    const data = await response.json();

    // Verify response
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.isNewVisitor).toBe(false);

    // Verify database record was updated
    const updatedThumbprint = await Thumbprint.findOne({
      fingerprintHash: "test-hash-456",
    });
    expect(updatedThumbprint).not.toBeNull();
    expect(updatedThumbprint?.userAgent).toBe("Mozilla/5.0 (Updated)");
    expect(updatedThumbprint?.device.type).toBe("tablet");
    expect(updatedThumbprint?.visits.length).toBe(2);
    expect(updatedThumbprint?.visits[1].page).toBe("/about");
    expect(updatedThumbprint?.visitCount).toBe(2);
  });

  it("should return 400 for missing required fields", async () => {
    // Create mock request with missing fields
    const req = new NextRequest(
      "http://localhost:3000/api/v1/analytics/fingerprint",
      {
        method: "POST",
        body: JSON.stringify({
          // Missing fingerprintHash
          components: { browser: "Chrome" },
        }),
      },
    );

    // Call the API route
    const response = await POST(req);
    const data = await response.json();

    // Verify response
    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Missing required fields");
  });
});
