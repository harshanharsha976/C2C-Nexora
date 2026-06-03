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

function Dashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetch(`${API}/services`);

        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await res.json();

        setServices(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    loadServices();
  }, []);

  const filtered = services.filter((service) => {
    if (!selectedDate) return true;

    const serviceDate = service.date
      ? new Date(service.date).toISOString().split("T")[0]
      : "";

    return serviceDate === selectedDate;
  });

  const total = filtered.length;

  const completed = filtered.filter(
    (service) => service.status === "Completed",
  ).length;

  const pending = filtered.filter(
    (service) => service.status === "Pending",
  ).length;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🏠 Dashboard</h2>

      <div className="card shadow-sm p-3 mb-4">
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Filter By Date</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Total Services</h5>
              <h2>{total}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Completed</h5>
              <h2 className="text-success">{completed}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Pending</h5>
              <h2 className="text-warning">{pending}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Issue</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    No Services Found
                  </td>
                </tr>
              ) : (
                filtered.map((service, index) => (
                  <tr key={service._id}>
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
                      <span
                        className={
                          service.status === "Completed"
                            ? "badge bg-success"
                            : "badge bg-warning"
                        }
                      >
                        {service.status}
                      </span>
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

export default Dashboard;
