import mongoose, { Document, Schema } from "mongoose";

// Define the properties for the Application model
export interface IApplication extends Document {
  userId: string;
  brandId: mongoose.Schema.Types.ObjectId;
  brandName: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  name: string;
  mobile: string;
  socialCount: string | number;
  socialLink: string;
  createdAt: Date;
  userImage?: string;
  role: string;
  description: string;
  requirements: string[];
  compensation: string;
  updatedAt: Date;
}

// Create the Application schema
const applicationSchema: Schema<IApplication> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: "Brand", // Assuming the Brand model is already defined
  },
  brandName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  socialCount: {
    type: Schema.Types.Mixed, // Allow both string and number
    required: true,
  },
  socialLink: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [{
    type: String,
  }],
  compensation: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Pre-save middleware to ensure brandName is set even if brandId is provided
applicationSchema.pre('save', async function(next) {
  if (this.brandId && !this.brandName) {
    try {
      const Brand = mongoose.model('Brand');
      const brand = await Brand.findById(this.brandId);
      if (brand) {
        this.brandName = brand.name;
      }
    } catch (error) {
      console.error('Error fetching brand name:', error);
    }
  }
  next();
});

// Create the Application model
const Application = mongoose.models.Application || mongoose.model<IApplication>("Application", applicationSchema);

export default Application;