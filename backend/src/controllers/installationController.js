import Installation from "../models/Installation.js";

// GET ALL INSTALLATIONS
export const getInstallations = async (req, res) => {
  try {
    const data = await Installation.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD INSTALLATION
export const addInstallation = async (req, res) => {
  try {
    const newInstallation = new Installation(req.body);

    await newInstallation.save();

    res.status(201).json(newInstallation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ASSIGN TECHNICIAN
export const assignTechnician = async (req, res) => {
  try {
    const { technician, assignedBy } = req.body;

    const updatedInstallation = await Installation.findByIdAndUpdate(
      req.params.id,
      {
        technician,
        assignedBy,
        status: "Assigned",
      },
      { new: true },
    );

    res.json(updatedInstallation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// COMPLETE INSTALLATION
export const completeInstallation = async (req, res) => {
  try {
    const updated = await Installation.findByIdAndUpdate(
      req.params.id,
      {
        status: "Completed",
      },
      { new: true },
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
