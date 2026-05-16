import Item from "../models/Item.js";

// GET
export const getItems = async (req, res) => {
  try {
    const data = await Item.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ADD
export const addItem = async (req, res) => {
  try {
    const saved = await Item.create(req.body);

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE
export const deleteItem = async (req, res) => {
  try {
    await Item.destroy({
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
