import mongoose from "mongoose";

const installationSchema = new mongoose.Schema({
  customer: String,
  product: String,
  technician: String,
  date: String,
  status: {
    type: String,
    default: "Pending",
  },
});

export default mongoose.model("Installation", installationSchema);
