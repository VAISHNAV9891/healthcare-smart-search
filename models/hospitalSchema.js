import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  specialty: { type: String, required: true },
  symptoms: [{ type: String }],
  location: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, default: 100 },
});

hospitalSchema.index({ symptoms: 'text', specialty: 'text' });

export const Hospital = mongoose.model("hospital", hospitalSchema);
