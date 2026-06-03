import { useEffect, useState } from "react";

type Service = {
  _id: string;
  customer: string;
  product: string;
  status: string;
};

const API = "http://localhost:5000/api";

function StatusView() {
  const [serviceList, setServiceList] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API}/services`);
        const json = await res.json();

        
        const list = Array.isArray(json)
          ? json
          : json.data || json.services || [];

        setServiceList(list);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  
  const total = serviceList.length;

  const pending = serviceList.filter(
    (s) => s.status?.toLowerCase().trim() === "pending",
  ).length;

  const completed = serviceList.filter(
    (s) => s.status?.toLowerCase().trim() === "completed",
  ).length;

  return (
    <div className="container-fluid">
      <h2 className="mb-4">📊 Service Status</h2>

      {/* CARDS */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h6>Total Services</h6>
            <h3>{total}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h6>Pending</h6>
            <h3 className="text-warning">{pending}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h6>Completed</h6>
            <h3 className="text-success">{completed}</h3>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow">
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {serviceList.length > 0 ? (
                serviceList.map((s) => (
                  <tr key={s._id}>
                    <td>{s.customer}</td>
                    <td>{s.product}</td>
                    <td>
                      <span
                        className={`badge ${
                          s.status?.toLowerCase() === "completed"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    No Services Available
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

export default StatusView;