import Customer from "../models/Customer.js";

// GET ALL CUSTOMERS
export const getCustomers = async (req, res) => {
  try {
    const data = await Customer.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD CUSTOMER
export const addCustomer = async (req, res) => {
  try {
    const newData = new Customer(req.body);

    await newData.save();

    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE CUSTOMER
export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE CUSTOMER
export const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
