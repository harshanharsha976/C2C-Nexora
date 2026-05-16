import { useEffect, useState } from "react";

type Service = {
  id: string;
  customer: string;
  product: string;
  issue: string;
  date: string;
  status: string;
};

const API = "http://localhost:5000/api";

function StatusUpdate() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");

  // ✅ FETCH ONLY PENDING
  const fetchPending = async () => {
    try {
      const res = await fetch(`${API}/services`);
      const data = await res.json();

      const pending = data.filter((s: Service) => s.status === "Pending");

      setServices(pending);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // ✅ UPDATE STATUS
  const handleUpdate = async (id: string) => {
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

      fetchPending();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // ✅ SEARCH
  const filtered = services.filter(
    (s) =>
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.product.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-warning">⚙️ Status Update</h2>

      {/* SEARCH */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search pending services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-warning">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Issue</th>
                <th>Date</th>
                <th>Status</th>
                <th>Update</th>
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

                    <td>
                      {s.date
                        ? new Date(s.date).toISOString().split("T")[0]
                        : ""}
                    </td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        {s.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleUpdate(s.id)}
                      >
                        Mark Completed
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No pending services
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

export default StatusUpdate;
