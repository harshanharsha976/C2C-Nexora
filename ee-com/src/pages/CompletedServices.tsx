import { useEffect, useState } from "react";

type Service = {
  _id: string;
  customer: string;
  product: string;
  issue: string;
  date: string;
  status: string;
};

const API = "http://localhost:5000/api";

function CompletedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");

  // ✅ FETCH ONLY COMPLETED
  const fetchCompletedServices = async () => {
    try {
      const res = await fetch(`${API}/services`);
      const data = await res.json();

      // 🔥 filter only completed
      const completed = data.filter((s: Service) => s.status === "Completed");

      setServices(completed);
    } catch (err) {
      console.error("Error fetching completed services:", err);
    }
  };

  useEffect(() => {
    fetchCompletedServices();
  }, []);

  // ❌ DELETE
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API}/services/${id}`, {
        method: "DELETE",
      });

      fetchCompletedServices();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // 🔍 SEARCH FILTER
  const filtered = services.filter(
    (s) =>
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.product.toLowerCase().includes(search.toLowerCase()) ||
      s.issue.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-success">✅ Completed Services</h2>

      {/* SEARCH */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search completed services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Issue</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s, index) => (
                <tr key={s._id}>
                  <td>{index + 1}</td>
                  <td>{s.customer}</td>
                  <td>{s.product}</td>
                  <td>{s.issue}</td>

                  {/* ✅ DATE ONLY */}
                  <td>
                    {s.date ? new Date(s.date).toISOString().split("T")[0] : ""}
                  </td>

                  <td>
                    <span className="badge bg-success">{s.status}</span>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center">
                    No completed services found
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

export default CompletedServices;
