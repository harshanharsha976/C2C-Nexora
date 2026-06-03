import { useEffect, useState } from "react";
import { items } from "../store/itemStore";

type Service = {
  id?: number;
  _id?: string;
  customer: string;
  product: string;
  technician: string;
  issue: string;
  date: string;
  status: string;
};

const API = "http://localhost:5000/api";

const technicians = [
  { id: 1, name: "Ravi Kumar senior tech" },
  { id: 2, name: "Arun Kumar field tech" },
  { id: 3, name: "Suresh service tech" },
  { id: 4, name: "Kiran field tech" },
  { id: 5, name: "Punith junior tech" },
];

function Services() {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [technician, setTechnician] = useState("");
  const [issue, setIssue] = useState("");
  const [date, setDate] = useState("");

  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/services`);

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        setServiceList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load services");
        setServiceList([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  
  const refresh = async () => {
    try {
      const res = await fetch(`${API}/services`);
      const data = await res.json();
      setServiceList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };


  const handleAdd = async () => {
    if (!customer || !product || !technician || !issue || !date) {
      alert("Fill all fields");
      return;
    }

    try {
      await fetch(`${API}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          product,
          technician,
          issue,
          date,
          status: "Pending",
        }),
      });

      setCustomer("");
      setProduct("");
      setTechnician("");
      setIssue("");
      setDate("");

      refresh();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  
  const handleComplete = async (id?: number | string) => {
    if (!id) return;

    try {
      await fetch(`${API}/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });

      refresh();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  
  const handleDelete = async (id?: number | string) => {
    if (!id) return;

    try {
      await fetch(`${API}/services/${id}`, {
        method: "DELETE",
      });

      refresh();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  
  const filtered = serviceList
    .filter((s) => (statusFilter === "All" ? true : s.status === statusFilter))
    .filter((s) =>
      `${s.customer} ${s.product} ${s.technician} ${s.issue}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  return (
    <div className="container">
      <h2 className="mb-4">Services</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p className="text-center">Loading...</p>}

      {/* FORM */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-2">
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Customer"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>

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

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>

      
      <div className="d-flex mb-3 gap-2">
        <input
          className="form-control"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      
      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Technician</th>
                <th>Issue</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((s, index) => {
                  const id = s.id ?? s._id;

                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{s.customer}</td>
                      <td>{s.product}</td>
                      <td>{s.technician}</td>
                      <td>{s.issue}</td>
                      <td>{s.date}</td>

                      <td>
                        <span
                          className={`badge ${
                            s.status === "Completed"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>

                      <td>
                        {s.status === "Pending" && (
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleComplete(id)}
                          >
                            Complete
                          </button>
                        )}

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Services;
