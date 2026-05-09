import { useEffect, useState } from "react";

type Service = {
  _id: string;
  customer: string;
  product: string;
  status: string;
  date: string; // ✅ required for filtering
};

const API = "http://localhost:5000/api";

function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(""); // ✅ NEW

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API}/services`);
        const data = await res.json();

        console.log("HOME DATA:", data);

        if (Array.isArray(data)) {
          setServices(data);
        } else if (data.services) {
          setServices(data.services);
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ✅ DATE FILTER LOGIC
  const filteredServices = selectedDate
    ? services.filter(
        (s) => new Date(s.date).toISOString().split("T")[0] === selectedDate,
      )
    : services;

  // ✅ CALCULATIONS
  const total = filteredServices.length;
  const pending = filteredServices.filter((s) => s.status === "Pending").length;
  const completed = filteredServices.filter(
    (s) => s.status === "Completed",
  ).length;

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard Overview</h2>

      {/* ✅ DATE FILTER */}
      <div className="mb-3">
        <input
          type="date"
          className="form-control w-auto"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="row">
        {/* TOTAL */}
        <div className="col-md-4">
          <div className="card bg-primary text-white p-3 text-center">
            <h5>Total Services</h5>
            <h3>{total}</h3>
          </div>
        </div>

        {/* PENDING */}
        <div className="col-md-4">
          <div className="card bg-warning text-dark p-3 text-center">
            <h5>Pending</h5>
            <h3>{pending}</h3>
          </div>
        </div>

        {/* COMPLETED */}
        <div className="col-md-4">
          <div className="card bg-success text-white p-3 text-center">
            <h5>Completed</h5>
            <h3>{completed}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
