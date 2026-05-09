import { useEffect, useState } from "react";

type Service = {
  id: number;
  customer: string;
  product: string;
  issue: string;
  status: "Pending" | "Completed";
  date: string; // ✅ use SAME field as Services page
};

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    const data = localStorage.getItem("services");
    if (data) {
      setServices(JSON.parse(data));
    }
  };

  // 🔥 Filter by selected date
  const filtered = services.filter((s) => {
    if (!selectedDate) return true;
    return s.date === selectedDate; // ✅ FIXED
  });

  // 📊 Stats
  const total = filtered.length;
  const completed = filtered.filter((s) => s.status === "Completed").length;
  const pending = filtered.filter((s) => s.status === "Pending").length;

  return (
    <div className="container mt-4">
      <h2>Home</h2>

      {/* 📅 Date filter */}
      <div className="mb-3">
        <label>Select Date</label>
        <input
          type="date"
          className="form-control"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* 📊 Stats */}
      <div className="row mb-3">
        <div className="col">
          <div className="card p-3 text-center">
            <h5>Total</h5>
            <h3>{total}</h3>
          </div>
        </div>

        <div className="col">
          <div className="card p-3 text-center">
            <h5>Completed</h5>
            <h3 className="text-success">{completed}</h3>
          </div>
        </div>

        <div className="col">
          <div className="card p-3 text-center">
            <h5>Pending</h5>
            <h3 className="text-warning">{pending}</h3>
          </div>
        </div>
      </div>

      {/* 📋 Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Issue</th>
            <th>Date</th> {/* ✅ Added */}
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.customer}</td>
                <td>{s.product}</td>
                <td>{s.issue}</td>
                <td>{s.date}</td> {/* ✅ Show date */}
                <td>
                  <span
                    className={
                      s.status === "Completed"
                        ? "badge bg-success"
                        : "badge bg-warning"
                    }
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}