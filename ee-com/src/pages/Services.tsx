import { useEffect, useState } from "react";
import { items } from "../store/itemStore";

type Service = {
  id: string;
  customer: string;
  product: string;
  issue: string;
  date: string;
  status: string;
};

const API = "http://localhost:5000/api";

function Services() {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [issue, setIssue] = useState("");
  const [date, setDate] = useState("");

  const [serviceList, setServiceList] = useState<Service[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");

  // ✅ FETCH DATA
  const fetchServices = async () => {
    try {
      const res = await fetch(`${API}/services`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setServiceList(data);
      } else {
        setServiceList([]);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ➕ ADD SERVICE
  const handleAdd = async () => {
    if (!customer || !product || !issue || !date) {
      alert("Fill all fields");
      return;
    }

    try {
      await fetch(`${API}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          product,
          issue,
          date,
          status: "Pending",
        }),
      });

      // ✅ RESET
      setCustomer("");
      setProduct("");
      setIssue("");
      setDate("");

      fetchServices();
    } catch (err) {
      console.error("Error adding service:", err);
    }
  };

  // ✅ COMPLETE SERVICE
  const handleComplete = async (id: string) => {
    try {
      await fetch(`${API}/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      });

      fetchServices();
    } catch (err) {
      console.error("Error updating service:", err);
    }
  };

  // ❌ DELETE SERVICE
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API}/services/${id}`, {
        method: "DELETE",
      });

      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  // 🔍 FILTER
  const filtered = serviceList
    .filter((s) =>
      statusFilter === "All"
        ? true
        : s.status === statusFilter,
    )
    .filter(
      (s) =>
        s.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        s.product
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        s.issue
          .toLowerCase()
          .includes(search.toLowerCase()),
    );

  return (
    <div className="container">
      <h2 className="mb-4">Services</h2>

      {/* FORM */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-2">
          {/* CUSTOMER */}
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Enter Customer Name"
              value={customer}
              onChange={(e) =>
                setCustomer(e.target.value)
              }
            />
          </div>

          {/* PRODUCT */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={product}
              onChange={(e) =>
                setProduct(e.target.value)
              }
            >
              <option value="">Select Product</option>

              {items.map((i) => (
                <option key={i.id} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          {/* ISSUE */}
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Enter issue"
              value={issue}
              onChange={(e) =>
                setIssue(e.target.value)
              }
            />
          </div>

          {/* DATE */}
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />
          </div>

          {/* BUTTON */}
          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="d-flex mb-3 gap-2">
        <input
          className="form-control"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="form-select w-auto"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Issue</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((s, index) => (
                  <tr key={s.id}>
                    <td>{index + 1}</td>

                    <td>{s.customer}</td>

                    <td>{s.product}</td>

                    <td>{s.issue}</td>

                    {/* DATE ONLY */}
                    <td>
                      {s.date
                        ? new Date(s.date)
                            .toISOString()
                            .split("T")[0]
                        : ""}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          s.status === "Pending"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    <td>
                      {s.status ===
                        "Pending" && (
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handleComplete(s.id)
                          }
                        >
                          Complete
                        </button>
                      )}

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(s.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center"
                  >
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
