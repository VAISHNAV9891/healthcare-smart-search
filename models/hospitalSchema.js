import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  specialty: { type: String, required: true },
  symptoms: [{ type: String }],
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, default: 100 },
});

hospitalSchema.index({ symptoms: 'text', specialty: 'text' });

export const Hospital = mongoose.model("hospital", hospitalSchema);
