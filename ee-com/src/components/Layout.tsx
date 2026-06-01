import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../store/userStore";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active bg-primary text-white" : "nav-link text-white";

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "260px" }}>
        <h4 className="text-center mb-4">💧 WPMS</h4>

        <ul className="nav flex-column">
          <li>
            <NavLink to="/dashboard/home" className={linkClass}>
              🏠 Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/items" className={linkClass}>
              📦 Products
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/customers" className={linkClass}>
              👥 Customers
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/installations" className={linkClass}>
              🛠️ Installations
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/services" className={linkClass}>
              🔧 Current Services
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/completed-services" className={linkClass}>
              ✅ Completed Services
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/status-update" className={linkClass}>
              🔄 Status Update
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/status-view" className={linkClass}>
              👁️ Status View
            </NavLink>
          </li>
          
        </ul>

        <hr />

        <button className="btn btn-danger w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-grow-1">
        <nav className="navbar bg-light px-3 shadow-sm">
          <span className="fw-bold"> Admin Dashboard</span>
        </nav>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
