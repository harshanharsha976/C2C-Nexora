import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../store/userStore";

function TechnicianLayout() {
  const navigate = useNavigate();

  const logout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "list-group-item list-group-item-action bg-primary text-white border-0 mb-2 rounded"
      : "list-group-item list-group-item-action bg-dark text-white border-0 mb-2 rounded";

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* SIDEBAR */}
        <div className="col-md-2 bg-dark text-white min-vh-100 d-flex flex-column p-3">
          {/* LOGO */}
          <h2 className="mb-4 fw-bold text-center">💧 WPMS</h2>

          {/* MENU */}
          <div className="list-group">
            <NavLink to="/technician/customers" className={linkClass}>
              👥 Customers
            </NavLink>

            <NavLink to="/technician/installations" className={linkClass}>
              🛠 Installations
            </NavLink>

            <NavLink to="/technician/services" className={linkClass}>
              🔧 Current Services
            </NavLink>

            <NavLink to="/technician/status" className={linkClass}>
              🔄 Status Update
            </NavLink>
          </div>

          {/* LOGOUT BUTTON */}
          <div className="mt-4">
            <button onClick={logout} className="btn btn-danger w-100 mt-4">
              Logout
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-md-10 bg-light min-vh-100 p-4">
          {/* TOP HEADER */}
          <div className="bg-white shadow-sm rounded p-3 mb-4">
            <h3 className="fw-bold mb-0">Technician Dashboard</h3>
          </div>

          {/* PAGE CONTENT */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default TechnicianLayout;
