import Service from "../models/Service.js";


export const getServices = async (req, res) => {
  try {
    const data = await Service.findAll({
      order: [["id", "DESC"]],
    });

    res.json(data);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


export const addService = async (req, res) => {
  try {
    const saved = await Service.create(req.body);

    res.status(201).json(saved);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


export const updateService = async (req, res) => {
  try {
    await Service.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const updated = await Service.findByPk(req.params.id);

    res.json(updated);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    await Service.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
