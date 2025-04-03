import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Thumbprint, IThumbprint } from "@/lib/db/models/Thumbprint";

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

describe("Thumbprint Model", () => {
  beforeEach(async () => {
    await Thumbprint.deleteMany({});
  });

  it("should create a new thumbprint successfully", async () => {
    const thumbprintData = {
      fingerprintHash: "test-hash-123",
      components: {
        browser: { name: "Chrome", version: "100.0" },
        os: "Windows",
        screen: { width: 1920, height: 1080 }
      },
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36",
      device: {
        type: "desktop"
      },
      visits: [{
        timestamp: new Date(),
        page: "/home",
        referrer: "https://google.com"
      }]
    };

    const thumbprint = new Thumbprint(thumbprintData);
    const savedThumbprint = await thumbprint.save();

    expect(savedThumbprint._id).toBeDefined();
    expect(savedThumbprint.fingerprintHash).toBe(thumbprintData.fingerprintHash);
    expect(savedThumbprint.components).toEqual(thumbprintData.components);
    expect(savedThumbprint.userAgent).toBe(thumbprintData.userAgent);
    expect(savedThumbprint.device.type).toBe(thumbprintData.device.type);
    expect(savedThumbprint.visits.length).toBe(1);
    expect(savedThumbprint.visits[0].page).toBe(thumbprintData.visits[0].page);
    expect(savedThumbprint.firstSeen).toBeDefined();
    expect(savedThumbprint.lastSeen).toBeDefined();
    expect(savedThumbprint.visitCount).toBe(1);
  });

  it("should require fingerprintHash", async () => {
    const thumbprintData = {
      components: {
        browser: { name: "Chrome", version: "100.0" }
      },
      userAgent: "Mozilla/5.0",
      device: {
        type: "desktop"
      }
    };

    const thumbprint = new Thumbprint(thumbprintData);
    
    await expect(thumbprint.save()).rejects.toThrow();
  });

  it("should update visit count and add new visit", async () => {
    // Create initial thumbprint
    const thumbprint = new Thumbprint({
      fingerprintHash: "test-hash-456",
      components: { browser: "Chrome" },
      userAgent: "Mozilla/5.0",
      device: { type: "desktop" },
      visits: [{
        timestamp: new Date(),
        page: "/home"
      }]
    });
    
    await thumbprint.save();
    
    // Update with a new visit
    const savedThumbprint = await Thumbprint.findOne({ fingerprintHash: "test-hash-456" });
    if (!savedThumbprint) throw new Error("Thumbprint not found");
    
    savedThumbprint.visits.push({
      timestamp: new Date(),
      page: "/about"
    });
    savedThumbprint.lastSeen = new Date();
    savedThumbprint.visitCount += 1;
    
    await savedThumbprint.save();
    
    // Verify updates
    const updatedThumbprint = await Thumbprint.findOne({ fingerprintHash: "test-hash-456" });
    expect(updatedThumbprint?.visitCount).toBe(2);
    expect(updatedThumbprint?.visits.length).toBe(2);
    expect(updatedThumbprint?.visits[1].page).toBe("/about");
  });

  it("should handle conversion tracking", async () => {
    // Create initial thumbprint
    const thumbprint = new Thumbprint({
      fingerprintHash: "test-hash-789",
      components: { browser: "Chrome" },
      userAgent: "Mozilla/5.0",
      device: { type: "desktop" },
      visits: [{
        timestamp: new Date(),
        page: "/home"
      }]
    });
    
    await thumbprint.save();
    
    // Update with conversion
    const savedThumbprint = await Thumbprint.findOne({ fingerprintHash: "test-hash-789" });
    if (!savedThumbprint) throw new Error("Thumbprint not found");
    
    savedThumbprint.conversion = {
      hasConverted: true,
      conversionDate: new Date(),
      conversionValue: 100,
      conversionType: "purchase"
    };
    
    await savedThumbprint.save();
    
    // Verify conversion
    const updatedThumbprint = await Thumbprint.findOne({ fingerprintHash: "test-hash-789" });
    expect(updatedThumbprint?.conversion?.hasConverted).toBe(true);
    expect(updatedThumbprint?.conversion?.conversionValue).toBe(100);
    expect(updatedThumbprint?.conversion?.conversionType).toBe("purchase");
  });
});
