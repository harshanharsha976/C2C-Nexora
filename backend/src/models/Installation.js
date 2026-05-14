import mongoose from "mongoose";

const installationSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },

    product: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    date: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Assigned", "Completed"],
      default: "Pending",
    },

    // ✅ Technician Assigned
    technician: {
      type: String,
      default: "",
    },

    // ✅ Admin name
    assignedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Installation", installationSchema);
