import { useEffect, useState } from "react";
import { items } from "../store/itemStore";
import { technicians } from "../store/technicianStore";

type Installation = {
  _id: string; // ✅ MongoDB id
  customer: string;
  product: string;
  technician: string;
  date: string;
  status: "Pending" | "Completed";
};

const API = "http://localhost:5000/api";

function Installations() {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [technician, setTechnician] = useState("");
  const [date, setDate] = useState("");

  const [list, setList] = useState<Installation[]>([]);

  // ✅ FETCH FROM BACKEND
  const fetchInstallations = async () => {
    const res = await fetch(`${API}/installations`);
    const data = await res.json();
    setList(data);
  };

  useEffect(() => {
    fetchInstallations();
  }, []);

  // ✅ ADD
  const handleAdd = async () => {
    if (!customer || !product || !technician || !date) {
      alert("Fill all fields");
      return;
    }

    await fetch(`${API}/installations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer,
        product,
        technician,
        date,
        status: "Pending",
      }),
    });

    setCustomer("");
    setProduct("");
    setTechnician("");
    setDate("");

    fetchInstallations();
  };

  // ✅ COMPLETE
  const handleComplete = async (id: string) => {
    await fetch(`${API}/installations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed" }),
    });

    fetchInstallations();
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    await fetch(`${API}/installations/${id}`, {
      method: "DELETE",
    });

    fetchInstallations();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Installations</h2>

      {/* FORM */}
      <div className="row g-2 mb-3">
        {/* CUSTOMER */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>

        {/* PRODUCT */}
        <div className="col-md-2">
          <select
            className="form-select"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value="">Product</option>
            {items.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
        </div>

        {/* TECHNICIAN */}
        <div className="col-md-2">
          <select
            className="form-select"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
          >
            <option value="">Technician</option>
            {technicians.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* DATE */}
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Technician</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No installations yet
              </td>
            </tr>
          ) : (
            list.map((i) => (
              <tr key={i._id}>
                <td>{i.customer}</td>
                <td>{i.product}</td>
                <td>{i.technician}</td>
                <td>{i.date}</td>

                <td>
                  <span
                    className={`badge ${
                      i.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {i.status}
                  </span>
                </td>

                <td>
                  {i.status === "Pending" && (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleComplete(i._id)}
                    >
                      Complete
                    </button>
                  )}

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(i._id)}
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
  );
}

export default Installations;
