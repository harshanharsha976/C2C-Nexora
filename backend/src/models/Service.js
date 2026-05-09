import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  customer: String,
  product: String,
  issue: String,
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Service", serviceSchema);
