import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Review, IReview, ReviewSource } from "@/lib/db/models/Review";

describe("Review Model", () => {
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
    await Review.deleteMany({});
  });

  it("should create a review with valid fields", async () => {
    const reviewData = {
      name: "John Doe",
      rating: 5,
      comment: "Great service! Very professional and timely.",
      source: ReviewSource.GOOGLE,
    };

    const review = await Review.create(reviewData);
    expect(review.name).toBe(reviewData.name);
    expect(review.rating).toBe(reviewData.rating);
    expect(review.comment).toBe(reviewData.comment);
    expect(review.source).toBe(reviewData.source);
    expect(review.createdAt).toBeDefined();
    expect(review.updatedAt).toBeDefined();
  });

  it("should require name field", async () => {
    const reviewData = {
      rating: 5,
      comment: "Great service!",
      source: ReviewSource.GOOGLE,
    };

    await expect(Review.create(reviewData)).rejects.toThrow();
  });

  it("should require rating field", async () => {
    const reviewData = {
      name: "John Doe",
      comment: "Great service!",
      source: ReviewSource.GOOGLE,
    };

    await expect(Review.create(reviewData)).rejects.toThrow();
  });

  it("should require comment field", async () => {
    const reviewData = {
      name: "John Doe",
      rating: 5,
      source: ReviewSource.GOOGLE,
    };

    await expect(Review.create(reviewData)).rejects.toThrow();
  });

  it("should require source field", async () => {
    const reviewData = {
      name: "John Doe",
      rating: 5,
      comment: "Great service!",
    };

    await expect(Review.create(reviewData)).rejects.toThrow();
  });

  it("should validate rating is between 1 and 5", async () => {
    const invalidLowRating = {
      name: "John Doe",
      rating: 0, // Invalid: below 1
      comment: "Great service!",
      source: ReviewSource.GOOGLE,
    };

    const invalidHighRating = {
      name: "John Doe",
      rating: 6, // Invalid: above 5
      comment: "Great service!",
      source: ReviewSource.GOOGLE,
    };

    await expect(Review.create(invalidLowRating)).rejects.toThrow();
    await expect(Review.create(invalidHighRating)).rejects.toThrow();
  });

  it("should validate source is from allowed enum values", async () => {
    const reviewData = {
      name: "John Doe",
      rating: 5,
      comment: "Great service!",
      source: "InvalidSource", // Not in enum
    };

    await expect(Review.create(reviewData)).rejects.toThrow();
  });
});
