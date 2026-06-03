import { useEffect, useState } from "react";
import { items } from "../store/itemStore";

type Installation = {
  id: number;
  customer: string;
  product: string;
  technician: string;
  date: string;
  status: string;
};

const API = "http://localhost:5000/api";


const technicians = [
  { id: 1, name: "Ravi Kumar senior tech" },
  { id: 2, name: "Arun Kumar field tech" },
  { id: 3, name: "Suresh service tech" },
  { id: 4, name: "Kiran fieled tech" },
  { id: 5, name: "punith junior" },
];

function Installations() {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [technician, setTechnician] = useState("");
  const [date, setDate] = useState("");

  const [installationList, setInstallationList] = useState<Installation[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/installations`);
        const data = await res.json();

        setInstallationList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load installations");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  
  const refresh = async () => {
    const res = await fetch(`${API}/installations`);
    const data = await res.json();
    setInstallationList(Array.isArray(data) ? data : []);
  };


  const handleAdd = async () => {
    if (!customer || !product || !technician || !date) {
      alert("Fill all fields");
      return;
    }

    try {
      await fetch(`${API}/installations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      refresh();
    } catch (err) {
      console.error("Add Error:", err);
    }
  };


  const handleComplete = async (id: number) => {
    try {
      await fetch(`${API}/installations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });

      refresh();
    } catch (err) {
      console.error("Update Error:", err);
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API}/installations/${id}`, {
        method: "DELETE",
      });

      refresh();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const filtered = installationList
    .filter((i) => (statusFilter === "All" ? true : i.status === statusFilter))
    .filter(
      (i) =>
        i.customer.toLowerCase().includes(search.toLowerCase()) ||
        i.product.toLowerCase().includes(search.toLowerCase()) ||
        i.technician.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div className="container">
      <h2 className="mb-4">Installations</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-2">
          
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Customer"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>

          
          <div className="col-md-3">
            <select
              className="form-select"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">Select Product</option>
              {items.map((i) => (
                <option key={i.id} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          
          <div className="col-md-3">
            <select
              className="form-select"
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
            >
              <option value="">Select Technician</option>
              {technicians.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          
          <div className="col-md-1">
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
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Technician</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((i, index) => (
                    <tr key={i.id}>
                      <td>{index + 1}</td>
                      <td>{i.customer}</td>
                      <td>{i.product}</td>
                      <td>{i.technician}</td>
                      <td>{i.date}</td>

                      <td>
                        <span
                          className={`badge ${
                            i.status === "Completed"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {i.status}
                        </span>
                      </td>

                      <td>
                        {i.status === "Pending" && (
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleComplete(i.id)}
                          >
                            Complete
                          </button>
                        )}

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(i.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Installations;
