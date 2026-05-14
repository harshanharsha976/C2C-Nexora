import Installation from "../models/Installation.js";

// GET
export const getInstallations = async (req, res) => {
  const data = await Installation.find();
  res.json(data);
};

// ADD
export const addInstallation = async (req, res) => {
  const inst = new Installation(req.body);
  const saved = await inst.save();
  res.status(201).json(saved);
};

// UPDATE (status)
export const updateInstallation = async (req, res) => {
  const updated = await Installation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.json(updated);
};

// DELETE
export const deleteInstallation = async (req, res) => {
  await Installation.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
