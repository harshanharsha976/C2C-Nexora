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

function CompletedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadCompletedServices = async () => {
      try {
        const res = await fetch(`${API}/services`);

        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await res.json();

        const completed = data.filter((s: Service) => s.status === "Completed");

        setServices(completed);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    loadCompletedServices();
  }, []);

  const fetchCompletedServices = async () => {
    try {
      const res = await fetch(`${API}/services`);

      if (!res.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await res.json();

      const completed = data.filter((s: Service) => s.status === "Completed");

      setServices(completed);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this completed service?")) return;

    try {
      await fetch(`${API}/services/${id}`, {
        method: "DELETE",
      });

      fetchCompletedServices();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const filtered = services.filter(
    (s) =>
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.product.toLowerCase().includes(search.toLowerCase()) ||
      s.issue.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-success">✅ Completed Services</h2>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search completed services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No completed services found
                  </td>
                </tr>
              ) : (
                filtered.map((service, index) => (
                  <tr key={service.id}>
                    <td>{index + 1}</td>
                    <td>{service.customer}</td>
                    <td>{service.product}</td>
                    <td>{service.issue}</td>

                    <td>
                      {service.date
                        ? new Date(service.date).toISOString().split("T")[0]
                        : ""}
                    </td>

                    <td>
                      <span className="badge bg-success">{service.status}</span>
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(service.id)}
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

export default CompletedServices;
