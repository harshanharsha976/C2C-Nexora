import Customer from "../models/Customer.js";


export const getCustomers = async (req, res) => {
  try {
    const data = await Customer.findAll();

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


export const addCustomer = async (req, res) => {
  try {
    const saved = await Customer.create(req.body);

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


export const updateCustomer = async (req, res) => {
  try {
    await Customer.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const updated = await Customer.findByPk(req.params.id);

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


export const deleteCustomer = async (req, res) => {
  try {
    await Customer.destroy({
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
