import Installation from "../models/Installation.js";


export const getInstallations = async (req, res) => {
  try {
    const data = await Installation.findAll();

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


export const addInstallation = async (req, res) => {
  try {
    const saved = await Installation.create(req.body);

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateInstallation = async (req, res) => {
  try {
    await Installation.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const updated = await Installation.findByPk(req.params.id);

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteInstallation = async (req, res) => {
  try {
    await Installation.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
