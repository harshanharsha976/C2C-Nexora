import { useEffect, useState } from "react";

type Customer = {
  id: string;
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

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const res = await fetch(`${API}/customers`);

        if (!res.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    loadCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${API}/customers`);

      if (!res.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!name || !phone) {
      alert("Please enter Name and Phone");
      return;
    }

    try {
      if (editId) {
        await fetch(`${API}/customers/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            address,
          }),
        });

        setEditId(null);
      } else {
        await fetch(`${API}/customers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            address,
          }),
        });
      }

      setName("");
      setPhone("");
      setAddress("");

      fetchCustomers();
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  const handleEdit = (customer: Customer) => {
    setName(customer.name);
    setPhone(customer.phone);
    setAddress(customer.address);
    setEditId(customer.id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await fetch(`${API}/customers/${id}`, {
        method: "DELETE",
      });

      fetchCustomers();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👥 Customers</h2>

      <div className="card shadow p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="text"
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

      <div className="card shadow">
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th style={{ width: "180px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Customers Found
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(customer)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(customer.id)}
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
