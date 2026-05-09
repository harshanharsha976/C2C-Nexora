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

  // ✅ FETCH FROM BACKEND
  const fetchServices = async () => {
    try {
      const res = await fetch(`${API}/services`);
      const data = await res.json();
      setServiceList(data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ CALCULATIONS
  const total = serviceList.length;
  const pending = serviceList.filter((s) => s.status === "Pending").length;
  const completed = serviceList.filter((s) => s.status === "Completed").length;

  return (
    <div className="container-fluid">
      <h2 className="mb-4">📊 Service Status</h2>

      {/* DASHBOARD CARDS */}
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
              {serviceList.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    No Services Available
                  </td>
                </tr>
              ) : (
                serviceList.map((s) => (
                  <tr key={s._id}>
                    <td>{s.customer}</td>
                    <td>{s.product}</td>
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

export default StatusView;
