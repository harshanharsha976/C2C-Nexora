import Customer from "../models/Customer.js";

// ✅ GET
export const getCustomers = async (req, res) => {
  const data = await Customer.find();
  res.json(data);
};

// ✅ ADD (THIS IS MISSING IN YOUR FILE)
export const addCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const saved = await customer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE
export const updateCustomer = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// ✅ DELETE
export const deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
