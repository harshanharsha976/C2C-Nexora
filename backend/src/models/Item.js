import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

export default mongoose.model("Item", itemSchema);
