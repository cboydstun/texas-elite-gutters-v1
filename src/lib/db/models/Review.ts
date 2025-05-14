import mongoose, { Schema, Document } from "mongoose";
import { ReviewSource } from "@/lib/types/ReviewTypes";

export interface IReview extends Document {
  name: string;
  rating: number;
  comment: string;
  source: ReviewSource;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
    },
    source: {
      type: String,
      enum: Object.values(ReviewSource),
      required: [true, "Source is required"],
    },
  },
  { timestamps: true },
);

export const Review =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
