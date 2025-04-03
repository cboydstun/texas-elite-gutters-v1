import { NextRequest } from "next/server";
import { POST } from "@/app/api/v1/analytics/pageview/route";
import { Thumbprint } from "@/lib/db/models/Thumbprint";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// Mock the database connection
jest.mock("@/lib/db/connect", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true)
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

describe("Pageview API Route", () => {
  beforeEach(async () => {
    await Thumbprint.deleteMany({});
  });

  it("should update an existing visit with duration and interaction data", async () => {
    // Create initial thumbprint with a visit
    const thumbprint = new Thumbprint({
      fingerprintHash: "test-hash-123",
      components: { browser: "Chrome" },
      userAgent: "Mozilla/5.0",
      device: { type: "desktop" },
      visits: [{
        timestamp: new Date(),
        page: "/test-page"
        // No duration set initially
      }]
    });
    
    await thumbprint.save();

    // Create mock request
    const req = new NextRequest("http://localhost:3000/api/v1/analytics/pageview", {
      method: "POST",
      body: JSON.stringify({
        fingerprintHash: "test-hash-123",
        page: "/test-page",
        duration: 120,
        exitPage: "/next-page",
        interactions: {
          clicks: 5,
          scrollDepth: 75,
          formInteractions: true
        }
      })
    });

    // Call the API route
    const response = await POST(req);
    const data = await response.json();

    // Verify response
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe("Page view updated");

    // Verify database record was updated
    const updatedThumbprint = await Thumbprint.findOne({ fingerprintHash: "test-hash-123" });
    expect(updatedThumbprint).not.toBeNull();
    expect(updatedThumbprint?.visits.length).toBe(1);
    expect(updatedThumbprint?.visits[0].duration).toBe(120);
    expect(updatedThumbprint?.visits[0].exitPage).toBe("/next-page");
    expect(updatedThumbprint?.visits[0].interactions?.clicks).toBe(5);
    expect(updatedThumbprint?.visits[0].interactions?.scrollDepth).toBe(75);
    expect(updatedThumbprint?.visits[0].interactions?.formInteractions).toBe(true);
  });

  it("should create a new visit if no matching visit is found", async () => {
    // Create initial thumbprint with a different page visit
    const thumbprint = new Thumbprint({
      fingerprintHash: "test-hash-456",
      components: { browser: "Chrome" },
      userAgent: "Mozilla/5.0",
      device: { type: "desktop" },
      visits: [{
        timestamp: new Date(),
        page: "/home",
        duration: 60 // This visit already has duration set
      }]
    });
    
    await thumbprint.save();

    // Create mock request for a different page
    const req = new NextRequest("http://localhost:3000/api/v1/analytics/pageview", {
      method: "POST",
      body: JSON.stringify({
        fingerprintHash: "test-hash-456",
        page: "/about", // Different page
        duration: 45,
        interactions: {
          clicks: 3,
          scrollDepth: 50,
          formInteractions: false
        }
      })
    });

    // Call the API route
    const response = await POST(req);
    const data = await response.json();

    // Verify response
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe("New page view recorded");

    // Verify database record was updated with a new visit
    const updatedThumbprint = await Thumbprint.findOne({ fingerprintHash: "test-hash-456" });
    expect(updatedThumbprint).not.toBeNull();
    expect(updatedThumbprint?.visits.length).toBe(2);
    expect(updatedThumbprint?.visits[1].page).toBe("/about");
    expect(updatedThumbprint?.visits[1].duration).toBe(45);
    expect(updatedThumbprint?.visits[1].interactions?.clicks).toBe(3);
  });

  it("should return 400 for missing required fields", async () => {
    // Create mock request with missing fields
    const req = new NextRequest("http://localhost:3000/api/v1/analytics/pageview", {
      method: "POST",
      body: JSON.stringify({
        // Missing fingerprintHash
        page: "/test"
      })
    });

    // Call the API route
    const response = await POST(req);
    const data = await response.json();

    // Verify response
    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Missing required fields");
  });

  it("should return 404 if fingerprint not found", async () => {
    // Create mock request with non-existent fingerprint
    const req = new NextRequest("http://localhost:3000/api/v1/analytics/pageview", {
      method: "POST",
      body: JSON.stringify({
        fingerprintHash: "non-existent-hash",
        page: "/test"
      })
    });

    // Call the API route
    const response = await POST(req);
    const data = await response.json();

    // Verify response
    expect(response.status).toBe(404);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Fingerprint not found");
  });
});
