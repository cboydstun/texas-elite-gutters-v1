import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Contact, IContact } from "@/lib/db/models/Contact";

describe("Contact Model", () => {
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

  afterEach(async () => {
    await Contact.deleteMany({});
  });

  it("should create a new contact successfully", async () => {
    const contactData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "210-555-1234",
      message: "I need gutter installation",
    };

    const contact = new Contact(contactData);
    const savedContact = await contact.save();

    expect(savedContact._id).toBeDefined();
    expect(savedContact.name).toBe(contactData.name);
    expect(savedContact.email).toBe(contactData.email);
    expect(savedContact.phone).toBe(contactData.phone);
    expect(savedContact.message).toBe(contactData.message);
    expect(savedContact.createdAt).toBeDefined();
  });

  it("should fail validation when required fields are missing", async () => {
    const invalidContact = new Contact({
      name: "John Doe",
      // Missing email, phone, and message
    });

    await expect(invalidContact.save()).rejects.toThrow();
  });

  it("should fail validation with invalid email format", async () => {
    const invalidContact = new Contact({
      name: "John Doe",
      email: "invalid-email",
      phone: "210-555-1234",
      message: "I need gutter installation",
    });

    await expect(invalidContact.save()).rejects.toThrow();
  });

  it("should set status to 'new' by default", async () => {
    const contactData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "210-555-1234",
      message: "I need gutter installation",
    };

    const contact = new Contact(contactData);
    const savedContact = await contact.save();

    expect(savedContact.status).toBe("new");
  });
});
