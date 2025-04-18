import mongoose, { Document, Schema } from "mongoose";

// Define the properties for the Brand model
export interface IBrand extends Document {
  name: string;
  description: string;
  logo?: string;
  website?: string;
  industry?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Brand schema
const brandSchema: Schema<IBrand> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  industry: {
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
});

// Update the updatedAt field on save
brandSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create the Brand model
const Brand = mongoose.models.Brand || mongoose.model<IBrand>("Brand", brandSchema);

export default Brand; 