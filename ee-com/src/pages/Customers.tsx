import { useEffect, useState } from "react";

type Customer = {
  _id: string;
  name: string;
  phone: string;
  address: string;
};

const API = "http://localhost:5000/api";

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ GET DATA FROM BACKEND
  const fetchCustomers = async () => {
    const res = await fetch(`${API}/customers`);
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ✅ ADD / UPDATE
  const handleAddOrUpdate = async () => {
    if (!name || !phone) {
      alert("Enter name and phone");
      return;
    }

    if (editId) {
      // UPDATE
      await fetch(`${API}/customers/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address }),
      });
      setEditId(null);
    } else {
      // ADD
      await fetch(`${API}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address }),
      });
    }

    setName("");
    setPhone("");
    setAddress("");
    fetchCustomers(); // refresh
  };

  // ✅ EDIT
  const handleEdit = (c: Customer) => {
    setName(c.name);
    setPhone(c.phone);
    setAddress(c.address);
    setEditId(c._id);
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    await fetch(`${API}/customers/${id}`, {
      method: "DELETE",
    });
    fetchCustomers();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👥 Customers</h2>

      {/* FORM */}
      <div className="card shadow p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button
              className={`btn w-100 ${editId ? "btn-warning" : "btn-primary"}`}
              onClick={handleAddOrUpdate}
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow">
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Customers
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.phone}</td>
                    <td>{c.address}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;