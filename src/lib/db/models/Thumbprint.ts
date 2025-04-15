import mongoose, { Schema, Document } from "mongoose";

export interface IThumbprint extends Document {
  fingerprintHash: string;
  components: Record<string, any>;
  userAgent: string;
  device: {
    type: "desktop" | "tablet" | "mobile" | "other";
    brand?: string;
    model?: string;
  };
  location?: {
    country?: string;
    region?: string;
    city?: string;
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
  };
  visits: Array<{
    timestamp: Date;
    page: string;
    duration?: number;
    referrer?: string;
    exitPage?: string;
    interactions?: {
      clicks?: number;
      scrollDepth?: number;
      formInteractions?: boolean;
    };
  }>;
  firstSeen: Date;
  lastSeen: Date;
  visitCount: number;
  conversion?: {
    hasConverted: boolean;
    conversionDate?: Date;
    conversionValue?: number;
    conversionType?: string;
  };
  segments?: string[];
}

const ThumbprintSchema = new Schema<IThumbprint>({
  fingerprintHash: {
    type: String,
    required: true,
    index: true
  },
  components: {
    type: Object,
    required: true
  },
  userAgent: {
    type: String,
    index: true
  },
  device: {
    type: {
      type: String,
      enum: ['desktop', 'tablet', 'mobile', 'other'],
      index: true
    },
    brand: String,
    model: String
  },
  location: {
    country: String,
    region: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  visits: [{
    timestamp: Date,
    page: String,
    duration: Number,
    referrer: String,
    exitPage: String,
    interactions: {
      clicks: Number,
      scrollDepth: Number,
      formInteractions: Boolean
    }
  }],
  firstSeen: {
    type: Date,
    default: Date.now,
    index: true
  },
  lastSeen: {
    type: Date,
    default: Date.now,
    index: true
  },
  visitCount: {
    type: Number,
    default: 1,
    index: true
  },
  conversion: {
    hasConverted: {
      type: Boolean,
      default: false,
      index: true
    },
    conversionDate: Date,
    conversionValue: Number,
    conversionType: String
  },
  segments: {
    type: [String],
    index: true
  }
});

export const Thumbprint = mongoose.models.Thumbprint || 
  mongoose.model<IThumbprint>("Thumbprint", ThumbprintSchema);
